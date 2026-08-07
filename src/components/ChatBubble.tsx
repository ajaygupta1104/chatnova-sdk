import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { ChatMessage } from "../types";

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.sender === "user";

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.botContainer,
      ]}
    >
      <View style={[styles.bubble, isUser ? styles.user : styles.bot]}>
        <Text style={isUser ? styles.userText : styles.botText}>
          {message.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    paddingHorizontal: 10,
  },

  userContainer: {
    alignItems: "flex-end",
  },

  botContainer: {
    alignItems: "flex-start",
  },

  bubble: {
    maxWidth: "80%",
    borderRadius: 12,
    padding: 10,
  },

  user: {
    backgroundColor: "#0A84FF",
  },

  bot: {
    backgroundColor: "#E9E9EB",
  },

  userText: {
    color: "#fff",
    fontSize: 16,
  },

  botText: {
    color: "#000",
    fontSize: 16,
  },
});