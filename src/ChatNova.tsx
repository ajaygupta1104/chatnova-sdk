import React, { useEffect, useMemo, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

import { ChatClient } from "./services/ChatClient";
import { useChat, Message } from "./hooks/useChat";
import { ChatBubble } from "./components/ChatBubble";
import { ChatInput } from "./components/ChatInput";
import { TypingIndicator } from "./components/TypingIndicator";
import { ChatStorage } from "./storage/ChatStorage";

import type {
  ChatMessage,
  ChatNovaProps,
} from "./types";

export function ChatNova({
  apiUrl,
  apiKey,
  appId,
  title = "ChatNova AI",
  placeholder = "Type a message...",
}: ChatNovaProps) {
  const client = useMemo(
    () =>
      new ChatClient({
        apiUrl,
        apiKey,
        appId,
      }),
    [apiUrl, apiKey, appId]
  );

  const {
    messages,
    setMessages,
    loading,
    sendMessage,
  } = useChat({ client });

  const listRef = useRef<FlatList<any>>(null);

  // Load saved chat ONCE on mount
  useEffect(() => {
    async function loadHistory() {
      const history = await ChatStorage.load();

      if (history && history.length > 0) {
        // Fix: ChatMessage ko Message interface format me map karke pass kiya hai
        const formattedMessages: Message[] = history.map((msg: any) => ({
          id: msg.id || Date.now().toString(),
          content: msg.content || msg.text || "",
          text: msg.text || msg.content || "",
          role: msg.role || (msg.sender === "user" ? "user" : "assistant"),
          sender: msg.sender || "bot",
          createdAt: msg.createdAt || Date.now(),
        }));

        setMessages(formattedMessages);
      }
    }

    loadHistory();
  }, []); // Empty dependency array
  
  // Save chat
  useEffect(() => {
    if (messages.length > 0) {
      ChatStorage.save(messages);
    }
  }, [messages]);

  // Auto scroll
  useEffect(() => {
    const timer = setTimeout(() => {
      listRef.current?.scrollToEnd({
        animated: true,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [messages, loading]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.statusDot} />

        <View>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.status}>
            {loading ? "Typing..." : "Online"}
          </Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: { item: any }) => (
          <ChatBubble message={item} />
        )}
        contentContainerStyle={styles.messageList}
        keyboardShouldPersistTaps="handled"
      />

      {/* Typing */}
      {loading && <TypingIndicator />}

      {/* Input */}
      <ChatInput
        placeholder={placeholder}
        loading={loading}
        onSend={sendMessage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  header: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A84FF",
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#42FF75",
    marginRight: 10,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  status: {
    color: "#E5F0FF",
    fontSize: 12,
    marginTop: 2,
  },

  messageList: {
    paddingVertical: 12,
    flexGrow: 1,
  },
});