import { useState, useEffect } from "react";
import SetGame from "./components/Set/SetGame";
import { ThemeProvider } from "./components/theme-provider";
import { socket } from "./client";

export default function App() {
  const [connected, setConnected] = useState(false);
  
  useEffect(() => {
    function onConnect() {
      console.log("connected to server");
      setConnected(true);
    }

    function onDisconnect() {
      console.log("disconnected from server");
      setConnected(false);
    }

    if (socket.connected) {
      onConnect();
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden px-2">
        {connected ? <div>Connected</div> : <div>Websocket is not connected</div>}
        <SetGame />
      </div>
    </ThemeProvider>
  );
}
