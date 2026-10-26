"use client";

import { FileText } from "lucide-react";

import { chatDemo } from "@/config/demos";

type ChatDemoProps = {
  className?: string;
};

export function ChatDemo({ className = "" }: ChatDemoProps) {
  return (
    <div className={`demo-panel overflow-hidden ${className}`} data-demo="chat">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3 md:px-5">
        <div>
          <p className="text-sm font-medium text-ivory">Ariadna</p>
          <p className="text-xs text-muted">{chatDemo.community}</p>
        </div>
        <span className="demo-badge">{chatDemo.document.badge}</span>
      </div>

      <div className="space-y-4 p-4 md:p-5" data-chat-messages>
        <div
          data-chat-user
          className="ml-auto max-w-[92%] rounded-2xl rounded-br-md bg-petroleum/50 px-4 py-3 text-sm text-ivory md:max-w-[80%]"
        >
          {chatDemo.messages[0]?.text}
        </div>

        <div
          data-chat-typing
          className="flex items-center gap-1.5 px-1 text-stone"
          aria-hidden
        >
          <span className="size-1.5 rounded-full bg-stone animate-soft-pulse" />
          <span
            className="size-1.5 rounded-full bg-stone animate-soft-pulse"
            style={{ animationDelay: "0.2s" }}
          />
          <span
            className="size-1.5 rounded-full bg-stone animate-soft-pulse"
            style={{ animationDelay: "0.4s" }}
          />
        </div>

        <div
          data-chat-assistant
          className="max-w-[95%] rounded-2xl rounded-bl-md border border-border bg-elevated/80 px-4 py-3 text-sm leading-relaxed text-ivory/95 md:max-w-[85%]"
        >
          {chatDemo.messages[1]?.text}
        </div>

        <aside
          data-chat-doc
          className="flex gap-3 rounded-lg border border-gold/20 bg-deep/70 p-3 md:p-4"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-gold/15 text-gold">
            <FileText className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-medium text-ivory">
              {chatDemo.document.title}
            </p>
            <p className="mt-0.5 text-xs text-gold">{chatDemo.document.reference}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              {chatDemo.document.excerpt}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
