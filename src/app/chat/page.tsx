'use client'

import { useChat } from 'ai/react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ChatPage() {
  const [isTyping, setIsTyping] = useState(false)
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    onFinish: () => {
      setIsTyping(false)
    }
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsTyping(true)
    handleSubmit(e)
  }

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Talk To the CEO</h1>
      
      <ScrollArea className="flex-grow mb-4">
        <div className="space-y-4 p-4">
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <Avatar className={`h-8 w-8 ${m.role === 'user' ? 'ml-2' : 'mr-2'}`}>
                  <AvatarImage src={m.role === 'user' ? "/user-avatar.png" : "/ai-avatar.png"} />
                  <AvatarFallback>{m.role === 'user' ? 'U' : 'AI'}</AvatarFallback>
                </Avatar>
                <div className={`rounded-lg p-4 ${m.role === 'user' ? 'bg-white border' : 'bg-gray-100'}`}>
                  {m.content}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%]">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/ai-avatar.png" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="rounded-lg p-4 bg-gray-100">
                  <span className="animate-pulse">AI is typing...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={onSubmit} className="flex gap-2 p-4 border-t">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-grow"
        />
        <Button type="submit" disabled={isTyping}>
          Send
        </Button>
      </form>
    </div>
  )
}
