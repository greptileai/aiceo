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
    })
});
