import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Send, Sparkles, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/coach")({
  component: Coach,
});

const SUGGESTIONS = [
  "Quelle filière choisir avec un BAC D ?",
  "Puis-je devenir Data Scientist ?",
  "Quelle différence entre EPAC et IFRI ?",
  "Quels métiers recrutent actuellement au Bénin ?",
];

function Coach() {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (e) => toast.error(e.message),
  });
  const loading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    setInput("");
    await sendMessage({ text });
  }

  return (
    <div className="h-[calc(100vh-3.5rem)] lg:h-screen flex flex-col">
      <header className="px-6 lg:px-10 py-5 border-b border-border bg-card flex items-center gap-3">
        <div className="h-11 w-11 rounded-2xl gradient-primary grid place-items-center text-primary-foreground"><Bot className="h-5 w-5" /></div>
        <div className="min-w-0 flex-1">
          <div className="font-display font-bold flex items-center gap-2">ALITCHÉ Coach <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-success/15 text-success"><span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> en ligne</span></div>
          <div className="text-xs text-muted-foreground">Ton guide d'orientation IA, 24/7.</div>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
        <div className="max-w-3xl mx-auto space-y-5">
          {messages.length === 0 && (
            <div className="text-center py-10">
              <div className="h-16 w-16 rounded-3xl gradient-primary grid place-items-center text-primary-foreground mx-auto"><Sparkles className="h-7 w-7" /></div>
              <h2 className="mt-4 text-xl font-display font-bold">Comment puis-je t'aider ?</h2>
              <p className="text-sm text-muted-foreground mt-1">Pose-moi tes questions d'orientation.</p>
              <div className="mt-6 grid sm:grid-cols-2 gap-2.5 max-w-xl mx-auto">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} className="text-left p-3 rounded-2xl bg-card border border-border hover:border-primary hover:bg-accent transition text-sm">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m) => {
            const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
            const isUser = m.role === "user";
            return (
              <div key={m.id} className={`flex gap-3 ${isUser ? "justify-end" : ""}`}>
                {!isUser && <div className="h-8 w-8 rounded-xl gradient-primary grid place-items-center text-primary-foreground shrink-0"><Bot className="h-4 w-4" /></div>}
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${isUser ? "gradient-primary text-primary-foreground" : "bg-card border border-border"}`}>
                  {isUser ? <div className="text-sm whitespace-pre-wrap">{text}</div> : <div className="prose prose-sm max-w-none text-foreground"><ReactMarkdown>{text}</ReactMarkdown></div>}
                </div>
                {isUser && <div className="h-8 w-8 rounded-xl bg-muted grid place-items-center shrink-0"><User className="h-4 w-4" /></div>}
              </div>
            );
          })}
          {status === "submitted" && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-xl gradient-primary grid place-items-center text-primary-foreground"><Bot className="h-4 w-4" /></div>
              <div className="rounded-2xl px-4 py-3 bg-card border border-border">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); send(input); }}
        className="border-t border-border bg-card px-4 sm:px-8 py-4"
      >
        <div className="max-w-3xl mx-auto flex gap-2.5">
          <input
            autoFocus value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Pose ta question..."
            className="flex-1 h-12 px-4 rounded-2xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            disabled={loading}
          />
          <Button type="submit" size="lg" disabled={loading || !input.trim()} className="gradient-primary text-primary-foreground border-0 h-12 w-12 p-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
