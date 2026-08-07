import { useState } from "react";
import { ChatClient } from "../services/ChatClient";
import type { ChatMessage } from "../types";

interface UseChatProps {
  client: ChatClient;
}

export function useChat({ client }: UseChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(text: string) {
    if (!text.trim()) return;

    // User message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: "user",
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // API call
      const response = await client.sendMessage(text);

      // Bot message
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response.reply,
        sender: "bot",
        createdAt: Date.now(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        text: "Something went wrong.",
        sender: "bot",
        createdAt: Date.now(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }

  return {
    messages,
    loading,
    sendMessage,
  };
}