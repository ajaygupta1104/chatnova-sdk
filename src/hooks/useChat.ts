// src/hooks/useChat.ts
import { useState } from "react";

export interface Message {
  id: string;
  content: string;
  text?: string;
  role: "user" | "assistant" | "system";
  sender?: string;
  createdAt?: number;
}

export function useChat({ client }: { client: any }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // 1. Temporary unique ID for User Message
    const userMsgId = Date.now().toString();
    const userMsg: Message = {
      id: userMsgId,
      content: text,
      text: text,
      role: "user",
      sender: "user",
      createdAt: Date.now(),
    };

    // UI me instantly User Message Append Karein
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await client.sendMessage(text);

      const botReply = res.reply || res.message || res.text || res.response || "";
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: botReply,
        text: botReply,
        role: "assistant",
        sender: "bot",
        createdAt: Date.now(),
      };

      // 2. Previous Messages me Bot Message Append Karein (Overwrite hone se bachayega)
      setMessages((prev) => {
        // Double check ki kahi duplicate messages append na hon
        return [...prev, botMsg];
      });

    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    setMessages,
    loading,
    sendMessage,
  };
}