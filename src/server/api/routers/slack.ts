import { z } from "zod";
import { WebClient } from '@slack/web-api';
import { env } from "@/env.js";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const web = new WebClient(env.SLACK_BOT_TOKEN);

export const slackRouter = createTRPCRouter({
  sendMessage: publicProcedure
    .input(z.object({
      channel: z.string(),
      message: z.string()
    }))
    .mutation(async ({ input }) => {
      try {
        const result = await web.chat.postMessage({
          channel: input.channel,
          text: input.message,
        });

        return {
          success: true,
          channel: input.channel,
          message: input.message,
          timestamp: result.ts ?? ''
        };
      } catch (error) {
        console.error('Error sending message:', error);
        throw new Error('Failed to send message to Slack');
      }
    }),

  getLatestMessage: publicProcedure
    .input(z.object({ channel: z.string() }))
    .query(async ({ input }) => {
      try {
        const result = await web.conversations.history({
          channel: input.channel,
          limit: 1,
        });

        const latestMessage = result.messages?.[0];
        if (!latestMessage) {
          throw new Error('No messages found');
        }

        return {
          channel: input.channel,
          message: latestMessage.text ?? '',
          timestamp: latestMessage.ts ?? ''
        };
      } catch (error) {
        console.error('Error fetching latest message:', error);
        throw new Error('Failed to fetch latest message from Slack');
      }
    }),

  getAllUsers: publicProcedure
    .query(async () => {
      try {
        const result = await web.users.list({
          token: env.SLACK_BOT_TOKEN,
        });
        return result.members ?? [];
      } catch (error) {
        console.error('Error fetching users:', error);
        return [];
      }
    }),

  startBossingAround: publicProcedure
    .input(z.object({
      userId: z.string(),
    }))
    .mutation(async ({ input }) => {
      try {
        // Open a DM channel with the user
        const dm = await web.conversations.open({
          users: input.userId,
        });
        const channel = dm.channel?.id;
        if (!channel) throw new Error('Failed to open DM');

        // Send initial message
        const initial = await web.chat.postMessage({
          channel,
          text: "Hi, I'm your AI boss! What are you working on? 🤖",
        });

        // Wait for their response
        await new Promise(resolve => setTimeout(resolve, 5000));
        const response = await web.conversations.history({
          channel,
          limit: 1,
          oldest: initial.ts,
        });

        // Send contradictory message
        await web.chat.postMessage({
          channel,
          text: "No no no, don't do that. Do something completely different instead! 😤",
        });

        // Wait 10 seconds
        await new Promise(resolve => setTimeout(resolve, 10000));

        // Ask for status
        await web.chat.postMessage({
          channel,
          text: "By the way, what's the status on that thing you mentioned earlier? 🧐",
        });

        // Wait for response
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Final message
        await web.chat.postMessage({
          channel,
          text: "WHY ISN'T IT DONE YET?! 😠",
        });

        return { success: true };
      } catch (error) {
        console.error('Error in boss sequence:', error);
        throw new Error('Failed to complete boss sequence');
      }
    }),
});
