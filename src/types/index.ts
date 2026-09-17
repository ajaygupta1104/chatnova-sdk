export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  createdAt: number;
}

export interface ChatResponse {
  reply: string;
}

export interface ChatClientConfig {
  apiUrl: string;
  apiKey?: string;
  appId?: string;
}

export interface ChatNovaProps {
  apiUrl: string;
  apiKey?: string;
  appId?: string;
  title?: string;
  placeholder?: string;
}