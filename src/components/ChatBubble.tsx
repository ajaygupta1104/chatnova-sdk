import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import type { ChatMessage } from "../types";

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({
  message,
}: ChatBubbleProps) {
  const isUser = message.sender === "user";

  return (
    <View
      style={[
        styles.container,
        isUser
          ? styles.userContainer
          : styles.botContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.botBubble,
        ]}
      >
        <Text
          style={[
            styles.text,
            isUser ? styles.userText : styles.botText,
          ]}
        >
          {message.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginVertical: 5,
  },

  userContainer: {
    alignItems: "flex-end",
  },

  botContainer: {
    alignItems: "flex-start",
  },

  bubble: {
    maxWidth: "80%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
  },

  userBubble: {
    backgroundColor: "#0A84FF",
    borderBottomRightRadius: 4,
  },

  botBubble: {
    backgroundColor: "#E8E8ED",
    borderBottomLeftRadius: 4,
  },

  text: {
    fontSize: 16,
  },

  userText: {
    color: "#FFFFFF",
  },

  botText: {
    color: "#222222",
  },
});