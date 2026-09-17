import { ChatNova } from "chatnova-sdk";

export default function App() {
  return (
    <ChatNova
      apiUrl="YOUR_API"
      apiKey="123"
      appId="demo"
    />
  );
}