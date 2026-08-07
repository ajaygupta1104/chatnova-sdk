import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

interface ChatInputProps {
  placeholder?: string;
  loading?: boolean;
  onSend: (message: string) => void;
}

export function ChatInput({
  placeholder = "Type a message...",
  loading = false,
  onSend,
}: ChatInputProps) {
  const [text, setText] = useState("");

  function handleSend() {
    if (!text.trim()) return;

    onSend(text);
    setText("");
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSend}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "..." : "Send"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    height: 45,
  },

  button: {
    backgroundColor: "#0A84FF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});