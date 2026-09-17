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
    const message = text.trim();

    if (!message || loading) {
      return;
    }

    onSend(message);
    setText("");
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        editable={!loading}
        style={styles.input}
        returnKeyType="send"
        onSubmitEditing={handleSend}
      />

      <TouchableOpacity
        onPress={handleSend}
        disabled={loading || !text.trim()}
        style={[
          styles.button,
          (!text.trim() || loading) &&
            styles.disabledButton,
        ]}
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
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },

  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    borderRadius: 22,
    paddingHorizontal: 16,
    marginRight: 8,
    backgroundColor: "#F8F8F8",
  },

  button: {
    minWidth: 65,
    height: 45,
    borderRadius: 22,
    backgroundColor: "#0A84FF",
    alignItems: "center",
    justifyContent: "center",
  },

  disabledButton: {
    opacity: 0.5,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});