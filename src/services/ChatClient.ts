import { ChatResponse } from "../types";

export interface ChatClientConfig {
  apiUrl: string;
  apiKey: string;
  appId: string;
  timeout?: number;
}

export class ChatClient {
  private apiUrl: string;
  private apiKey: string;
  private appId: string;
  private timeout: number;

  constructor(config: ChatClientConfig) {
    this.apiUrl = config.apiUrl;
    this.apiKey = config.apiKey;
    this.appId = config.appId;
    this.timeout = config.timeout ?? 30000;
  }

  async sendMessage(message: string): Promise<ChatResponse> {
    const controller = new AbortController();

    const timer = setTimeout(() => {
      controller.abort();
    }, this.timeout);

    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.apiKey,
          "x-app-id": this.appId,
        },
        body: JSON.stringify({
          message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }

      const data: ChatResponse = await response.json();

      return data;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Request timeout");
      }

      throw error;
    } finally {
      clearTimeout(timer);
    }
  }
}