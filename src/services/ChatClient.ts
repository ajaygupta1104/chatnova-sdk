import type {
  ChatClientConfig,
  ChatResponse,
} from "../types";

export class ChatClient {
  private apiUrl: string;
  private apiKey?: string;
  private appId?: string;

  constructor(config: ChatClientConfig) {
    this.apiUrl = config.apiUrl;
    this.apiKey = config.apiKey;
    this.appId = config.appId;
  }

  async sendMessage(message: string): Promise<ChatResponse> {
    const response = await fetch(this.apiUrl, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        ...(this.apiKey
          ? {
              Authorization: `Bearer ${this.apiKey}`,
            }
          : {}),
      },

      body: JSON.stringify({
        message,
        appId: this.appId,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Chat API error: ${response.status}`
      );
    }

    const data = await response.json();

    return data;
  }
}