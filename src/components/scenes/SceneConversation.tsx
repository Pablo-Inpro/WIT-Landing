"use client";

import { ChatDemo } from "@/components/demos/ChatDemo";
import { getProduct } from "@/config/products";

import { SceneShell } from "./SceneShell";

const product = getProduct("neighbor-assistant");

export function SceneConversation() {
  return (
    <SceneShell id={product.sceneId} aria-labelledby="chat-title">
      <div className="container-page grid items-center gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <ChatDemo className="order-2 w-full min-w-0 lg:order-1" />

        <div className="order-1 min-w-0 lg:order-2" data-chat-copy>
          <p className="text-eyebrow text-gold">{product.name}</p>
          <h2
            id="chat-title"
            className="mt-3 font-display text-scene font-semibold text-ivory md:mt-4"
          >
            {product.subtitle}
          </h2>
          <p className="mt-3 max-w-md text-sub text-muted md:mt-5">
            {product.shortDescription}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted md:mt-6">
            {product.features.slice(0, 4).map((feature) => (
              <li key={feature} className="flex gap-2">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-gold" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SceneShell>
  );
}
