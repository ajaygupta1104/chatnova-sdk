// src/index.ts
export * from "./ChatNova";
export * from "./services/ChatClient";
export { useChat } from "./hooks/useChat"; // Direct hook export
export * from "./components/ChatBubble";
export * from "./components/ChatInput";
export * from "./components/TypingIndicator";
export * from "./storage/ChatStorage";
export * from "./types"; // types/ folder ki index.ts auto pick ho jayegi