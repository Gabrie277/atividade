"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";

export default function GoldChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "gold", text: "Olá! Eu sou o Gabriel, seu assistente virtual. Em que posso ajudar?" }
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0); // controla a fase da conversa
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput("");

    setTimeout(() => {
      if (step === 0) {
        setMessages((prev) => [
          ...prev,
          { from: "gold", text: "Legal! Qual é o seu nome?" }
        ]);
        setStep(1);
      } else if (step === 1) {
        setMessages((prev) => [
          ...prev,
          { from: "gold", text: `Prazer, ${userInput}! E onde você mora?` }
        ]);
        setStep(2);
      } else if (step === 2) {
        setMessages((prev) => [
          ...prev,
          { from: "gold", text: `Ótimo! Você gostaria de falar com alguém da equipe?` }
        ]);
        setStep(3);
      } else {
        setMessages((prev) => [
          ...prev,
          { from: "gold", text: "Entendi! Em breve alguém pode entrar em contato com você." }
        ]);
      }
    }, 800);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 transition"
        >
          <MessageCircle />
        </button>
      ) : (
        <div className="bg-white w-80 h-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-yellow-300">
          {/* Header com avatar */}
          <div className="bg-yellow-500 text-white flex items-center px-4 py-2 gap-3">
            <img
              src="/gold.jpg"
              alt="Avatar do assistente Gold"
              className="w-8 h-8 rounded-full object-cover border border-white"
            />
            <span className="font-semibold">Assistente Gold</span>
            <button onClick={() => setOpen(false)} className="ml-auto">
              <X />
            </button>
          </div>

          {/* Mensagens */}
          <div className="flex-1 p-4 space-y-2 overflow-y-auto text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.from === "user" ? "text-right" : "text-left"}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.from === "user"
                      ? "bg-blue-100 text-gray-800"
                      : "bg-yellow-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-2 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escreva aqui..."
              className="flex-1 border rounded px-3 py-2 text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-yellow-500 text-white px-4 rounded hover:bg-yellow-600 text-sm"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
