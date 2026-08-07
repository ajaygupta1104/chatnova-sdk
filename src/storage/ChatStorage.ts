import AsyncStorage from "@react-native-async-storage/async-storage";
import type { ChatMessage } from "../types";

const STORAGE_KEY = "chatnova_messages";

export class ChatStorage {
  static async save(messages: ChatMessage[]) {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(messages)
    );
  }

  static async load(): Promise<ChatMessage[]> {
    const data = await AsyncStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  }

  static async clear() {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }
}