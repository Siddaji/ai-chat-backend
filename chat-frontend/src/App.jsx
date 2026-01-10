import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setError("");

    setMessages(prev => [...prev, { role: "user", text: message }]);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      setMessages(prev => [...prev, { role: "ai", text: data.reply }]);
    } catch (err) {
      setError("Failed to connect to AI");
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>AI Chat</h2>

      {messages.map((msg, index) => (
        <p key={index}>
          <b>{msg.role === "user" ? "You" : "AI"}:</b> {msg.text}
        </p>
      ))}

      {loading && <p>AI is typing...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;