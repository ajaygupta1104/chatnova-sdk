import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export function TypingIndicator() {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.text}>
          ● ● ●
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    paddingHorizontal: 12,
    marginVertical: 5,
  },

  bubble: {
    backgroundColor: "#E8E8ED",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
  },

  text: {
    color: "#777777",
    fontSize: 12,
    letterSpacing: 3,
  },
});