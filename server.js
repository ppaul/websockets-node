import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

let messages = ["Initial message 1", "Initial message 2"];

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log("Message: ", message.toString());
    messages.push(message.toString());
    if (message.toString() === "exit") {
      ws.close();
    } else {
      wss.clients.forEach(client => client.send(message.toString()));
    }
  });

  ws.on("close", () => {
    console.log("user disconnected");
  });

  console.log("New socket connection established");

  ws.send("Welcome to Live Chat!");

  if (messages.length) {
    ws.send("Chat currently in session");
    messages.forEach(message => ws.send(message.toString()));
  }
});

console.log("Server waiting for connections on ws://localhost:3000");