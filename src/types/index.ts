export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  createdAt: number;
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  reply: string;
}

export interface ChatNovaProps {
  apiUrl: string;
  apiKey: string;
  appId: string;

  title?: string;

  primaryColor?: string;

  placeholder?: string;
}