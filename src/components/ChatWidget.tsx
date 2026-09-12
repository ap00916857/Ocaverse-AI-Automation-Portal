import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Msg = { from: "bot" | "user"; text: string };

const getSessionId = () => {
  let id = localStorage.getItem("chat_session_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("chat_session_id", id);
  }
  return id;
};

const DEFAULT_AI_GATEWAY_URL = "https://yftxjpgxnmxwsgtbpvfn.supabase.co/functions/v1/chat-ai";
const DEFAULT_AI_GATEWAY_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmdHhqcGd4bm14d3NndGJwdmZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4Nzg0MDgsImV4cCI6MjA5MzQ1NDQwOH0.Lwb7HyvKiXtvn-ClxOBDM3ZnClxYO1AK9GyfA1exTIw";

const CHAT_AI_URL = (import.meta.env.VITE_CHAT_AI_URL as string) || DEFAULT_AI_GATEWAY_URL;
const CHAT_AI_KEY = (import.meta.env.VITE_CHAT_AI_KEY as string) || DEFAULT_AI_GATEWAY_KEY;

const getFallbackReply = (userInput: string): string => {
  const q = userInput.toLowerCase();
  if (q.includes("price") || q.includes("cost") || q.includes("rate") || q.includes("plan") || q.includes("fee") || q.includes("subscription")) {
    return "Our AI automation solutions start with our Early Bird offer at ₹10,000/month (standard ₹15,000/month). For customized enterprise software and bespoke lead pipelines, pricing is tailored to your scope. Would you like to share your project requirements or connect directly on WhatsApp?";
  }
  if (q.includes("lead") || q.includes("software") || q.includes("tool") || q.includes("product") || q.includes("crm") || q.includes("app")) {
    return "OcaVerse offers high-performance AI lead automation tools and custom SaaS solutions designed to maximize conversions and eliminate manual work. You can leave your details below or chat with us on WhatsApp for a personalized demo!";
  }
  if (q.includes("service") || q.includes("feature") || q.includes("build") || q.includes("custom") || q.includes("develop")) {
    return "We specialize in end-to-end AI automation, custom CRM/lead systems, automated marketing workflows, and responsive web platforms. Tell us about your workflow goals, or reach out on WhatsApp for a quick consultation!";
  }
  if (q.includes("contact") || q.includes("email") || q.includes("call") || q.includes("phone") || q.includes("number") || q.includes("support")) {
    return "You can reach out to our team at support@ocaverse.com, or use the 'Leave your details' form right here in this chat window. We typically respond within minutes!";
  }
  if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("namaste") || q.includes("good morning") || q.includes("good evening")) {
    return "Hello! 👋 Welcome to OcaVerse. I'm here to answer any questions about our AI tools, automation services, or pricing plans. How can I help you today?";
  }
  return "Thanks for reaching out! Our team is dedicated to building state-of-the-art AI automation for your business. Feel free to leave your contact info below or connect with us on WhatsApp for instant assistance.";
};

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(1);
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "Hi 👋 I'm here to help. Ask about pricing, services, or leave your details." },
  ]);
  const [input, setInput] = useState("");
  const [showLead, setShowLead] = useState(false);
  const [lead, setLead] = useState({ name: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [typing, setTyping] = useState(false);
  const sessionIdRef = useRef<string>(getSessionId());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await (supabase as any)
          .from("chatbot_messages")
          .select("role, content, created_at")
          .eq("session_id", sessionIdRef.current)
          .order("created_at", { ascending: true });
        if (error) {
          console.warn("Chat history load skipped:", error.message);
          return;
        }
        if (data && data.length) {
          setMessages((prev) => [
            prev[0],
            ...data.map((r: any) => ({ from: r.role === "user" ? "user" : "bot", text: r.content } as Msg)),
          ]);
        }
      } catch (e) {
        console.warn("Chat history load failed", e);
      }
    })();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, showLead, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || typing) return;
    setInput("");
    const next: Msg[] = [...messages, { from: "user", text }];
    setMessages(next);
    setTyping(true);
    const sessionId = sessionIdRef.current;
    let reply = "";

    try {
      const apiMessages = next
        .filter((m, i) => !(i === 0 && m.from === "bot"))
        .map((m) => ({ role: m.from === "user" ? "user" : "assistant", content: m.text }));

      // Call the AI edge function gateway with an abort timeout
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);

        const resp = await fetch(CHAT_AI_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: CHAT_AI_KEY,
            Authorization: `Bearer ${CHAT_AI_KEY}`,
          },
          body: JSON.stringify({ messages: apiMessages, sessionId }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (resp.ok) {
          const data = await resp.json();
          if (data && typeof data.reply === "string" && data.reply.trim()) {
            reply = data.reply.trim();
          }
        } else {
          console.warn("Chat AI gateway non-200 status:", resp.status);
        }
      } catch (fetchErr) {
        console.warn("Chat AI gateway fetch failed, falling back to local responder:", fetchErr);
      }

      // If remote AI was unavailable or timed out, use intelligent fallback
      if (!reply) {
        reply = getFallbackReply(text);
      }

      setMessages((m) => [...m, { from: "bot", text: reply }]);

      // Persist conversation client-side to the user's own Supabase project.
      // Wrapped so schema mismatches never break the chat UX.
      try {
        const { error: insertError } = await (supabase as any)
          .from("chatbot_messages")
          .insert([
            { session_id: sessionId, role: "user", content: text.slice(0, 4000) },
            { session_id: sessionId, role: "assistant", content: String(reply).slice(0, 4000) },
          ]);
        if (insertError) {
          console.warn("Chat save notice:", insertError.message);
        }
      } catch (saveErr) {
        console.warn("Chat save notice:", saveErr);
      }
    } catch (e: any) {
      console.error("Chat send failed", e);
      if (!reply) {
        reply = getFallbackReply(text);
        setMessages((m) => [...m, { from: "bot", text: reply }]);
      }
    } finally {
      setTyping(false);
    }
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = lead.name.trim();
    const phone = lead.phone.trim();
    const message = lead.message.trim();
    if (!name || !phone || !message) {
      toast.error("Please fill all fields");
      return;
    }
    setSubmitting(true);

    let saved = false;
    try {
      // 1. Primary insert to chat_leads
      const { error: chatLeadErr } = await (supabase as any)
        .from("chat_leads")
        .insert({ name, phone, message });

      if (!chatLeadErr) {
        saved = true;
      } else {
        console.warn("chat_leads insert RLS restriction, falling back to contacts:", chatLeadErr);
        // 2. Resilient fallback: save to contacts table so lead is never lost
        const { error: contactErr } = await (supabase as any)
          .from("contacts")
          .insert({
            name,
            phone,
            message: `[Chat Lead] ${message}`,
            status: "New",
          });

        if (!contactErr) {
          saved = true;
        } else {
          console.error("Fallback contact save failed:", contactErr);
        }
      }
    } catch (err) {
      console.error("Failed to submit lead", err);
    } finally {
      setSubmitting(false);
    }

    if (!saved) {
      toast.error("Couldn't send. Please try again or message us on WhatsApp.");
      return;
    }

    setShowLead(false);
    setLead({ name: "", phone: "", message: "" });
    setMessages((m) => [
      ...m,
      { from: "bot", text: "Thanks for contacting us. Our team will connect with you shortly." },
    ]);
    toast.success("Message received!");
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-gradient-primary text-primary-foreground shadow-glow flex items-center justify-center transition-shadow hover:shadow-[0_0_40px_-4px_hsl(var(--primary)/0.8)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center ring-2 ring-background">
            {unread}
          </span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed z-50 bottom-24 right-4 left-4 sm:left-auto sm:right-5 sm:bottom-24 sm:w-[380px] max-h-[80vh] flex flex-col rounded-2xl glass-strong border border-white/10 shadow-glow overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-primary text-primary-foreground flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">Live Support</p>
                <p className="text-xs opacity-80 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  We typically reply in minutes
                </p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1.5 hover:bg-white/10 transition">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-background/40">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                      m.from === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-muted text-foreground rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: "120ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: "240ms" }} />
                  </div>
                </motion.div>
              )}

              {showLead && (
                <motion.form
                  onSubmit={submitLead}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-border bg-card p-3 space-y-2"
                >
                  <p className="text-xs font-medium text-muted-foreground">Leave your details</p>
                  <Input
                    placeholder="Your name"
                    value={lead.name}
                    onChange={(e) => setLead({ ...lead, name: e.target.value })}
                    maxLength={100}
                    required
                  />
                  <Input
                    placeholder="Phone number"
                    value={lead.phone}
                    onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                    maxLength={30}
                    required
                  />
                  <Textarea
                    placeholder="How can we help?"
                    value={lead.message}
                    onChange={(e) => setLead({ ...lead, message: e.target.value })}
                    maxLength={1000}
                    rows={2}
                    required
                  />
                  <div className="flex gap-2">
                    <Button type="submit" size="sm" className="flex-1" disabled={submitting}>
                      {submitting ? "Sending..." : "Submit"}
                    </Button>
                    <Button type="button" size="sm" variant="ghost" onClick={() => setShowLead(false)}>
                      Cancel
                    </Button>
                  </div>
                </motion.form>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border bg-background/60 p-2.5">
              {!showLead && (
                <button
                  onClick={() => setShowLead(true)}
                  className="text-xs text-primary hover:underline mb-2 ml-1"
                >
                  + Leave your contact details
                </button>
              )}
              <div className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button size="icon" onClick={send} aria-label="Send" disabled={!input.trim() || typing}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
