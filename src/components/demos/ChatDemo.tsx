"use client";

import { FileText } from "lucide-react";

import { chatDemo } from "@/config/demos";

type ChatDemoProps = {
  className?: string;
};

export function ChatDemo({ className = "" }: ChatDemoProps) {
  return (
    <div className={`demo-panel overflow-hidden ${className}`} data-demo="chat">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 px-3 py-3 sm:px-4 md:px-5">
        <div className="min-w-0">
          <p className="text-sm font-medium text-ivory">Ariadna</p>
          <p className="truncate text-xs text-muted">{chatDemo.community}</p>
        </div>
        <span className="demo-badge max-w-[40%] shrink-0 truncate sm:max-w-none">
          {chatDemo.document.badge}
        </span>
      </div>

      <div className="space-y-3 p-3 sm:space-y-4 sm:p-4 md:p-5" data-chat-messages>
        <div
          data-chat-user
          className="ml-auto max-w-[95%] rounded-2xl rounded-br-md bg-petroleum/50 px-3 py-2.5 text-[0.8125rem] leading-relaxed text-ivory sm:max-w-[92%] sm:px-4 sm:py-3 sm:text-sm md:max-w-[80%]"
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
          className="max-w-[95%] rounded-2xl rounded-bl-md border border-border bg-elevated/80 px-3 py-2.5 text-[0.8125rem] leading-relaxed text-ivory/95 sm:px-4 sm:py-3 sm:text-sm md:max-w-[85%]"
        >
          {chatDemo.messages[1]?.text}
        </div>

        <aside
          data-chat-doc
          className="flex gap-2.5 rounded-lg border border-gold/20 bg-deep/70 p-3 sm:gap-3 md:p-4"
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
