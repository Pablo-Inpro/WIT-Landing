"use client";

import { useRef } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageAtmosphere } from "@/components/layout/PageAtmosphere";
import { ProgressNav } from "@/components/layout/ProgressNav";
import { SceneAwakening } from "@/components/scenes/SceneAwakening";
import { SceneClosing } from "@/components/scenes/SceneClosing";
import { SceneConversation } from "@/components/scenes/SceneConversation";
import { SceneConvergence } from "@/components/scenes/SceneConvergence";
import { SceneDocument } from "@/components/scenes/SceneDocument";
import { SceneEcosystem } from "@/components/scenes/SceneEcosystem";
import { SceneNucleus } from "@/components/scenes/SceneNucleus";
import { SceneVoice } from "@/components/scenes/SceneVoice";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { getGsap } from "@/lib/gsap";

function setupHeroIntro(gsap: ReturnType<typeof getGsap>["gsap"]) {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.set("[data-hero-glow]", { opacity: 0 })
    .set("[data-hero-logo-img]", { autoAlpha: 0, y: 16 })
    .set("[data-hero-title]", { autoAlpha: 0, y: 28 })
    .set("[data-hero-sub]", { autoAlpha: 0, y: 18 })
    .set("[data-hero-scroll]", { autoAlpha: 0 })
    .to("[data-hero-glow]", { opacity: 1, duration: 1.1 }, 0)
    .to("[data-hero-logo-img]", { autoAlpha: 1, y: 0, duration: 0.9 }, 0.1)
    .to(
      "[data-hero-title]",
      { autoAlpha: 1, y: 0, duration: 0.75 },
      "-=0.15",
    )
    .to(
      "[data-hero-sub]",
      { autoAlpha: 1, y: 0, duration: 0.65 },
      "-=0.4",
    )
    .to("[data-hero-scroll]", { autoAlpha: 1, duration: 0.45 }, "-=0.2");

  return tl;
}

function setupScrollNarrative(
  gsap: ReturnType<typeof getGsap>["gsap"],
  ScrollTrigger: ReturnType<typeof getGsap>["ScrollTrigger"],
  root: HTMLElement,
) {
  const q = gsap.utils.selector(root);

  const hero = root.querySelector("#escena-despertar");
  const canPin = window.matchMedia("(min-width: 768px)").matches;
  if (hero) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: canPin ? "+=85%" : "bottom top",
          scrub: 1.1,
          pin: canPin,
          anticipatePin: 1,
        },
      })
      .to(q("[data-hero-title]"), { autoAlpha: 0.12, y: -48, scale: 0.94 }, 0)
      .to(q("[data-hero-sub]"), { autoAlpha: 0, y: -24 }, 0)
      .to(q("[data-hero-scroll]"), { autoAlpha: 0 }, 0)
      .to(q("[data-hero-glow]"), { opacity: 0, scale: 1.5 }, 0)
      .to(
        q("[data-hero-logo]"),
        { scale: 1.08, rotateY: 14, rotateX: 4, transformPerspective: 900 },
        0,
      )
      .to(
        q("[data-hero-logo-img]"),
        { autoAlpha: 0.55, filter: "brightness(0.85)" },
        0.25,
      );
  }

  // On mobile, scrub + autoAlpha:0 leaves tall demos invisible but still in
  // flow — huge empty gaps. Keep content visible; reserve cinematic scrub for desktop.
  if (!canPin) {
    ScrollTrigger.refresh();
    return;
  }

  const eco = root.querySelector("#escena-ecosistema");
  if (eco) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: eco,
          start: "top 70%",
          end: "center center",
          scrub: 1,
        },
      })
      .from(q("[data-eco-copy]"), { autoAlpha: 0, y: 40 }, 0);
  }

  const voice = root.querySelector("#escena-voz");
  if (voice) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: voice,
          start: "top 65%",
          end: "center 40%",
          scrub: 1,
        },
      })
      .from(q("[data-voice-copy]"), { autoAlpha: 0, x: -30 }, 0)
      .from(q("[data-demo='call']"), { autoAlpha: 0, y: 50, scale: 0.96 }, 0.05)
      .from(q("[data-call-line]"), { autoAlpha: 0, y: 16, stagger: 0.12 }, 0.2)
      .from(q("[data-call-ticket]"), { autoAlpha: 0, y: 24 }, 0.45);
  }

  const chat = root.querySelector("#escena-conversacion");
  if (chat) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: chat,
          start: "top 65%",
          end: "center 40%",
          scrub: 1,
        },
      })
      .from(q("[data-chat-copy]"), { autoAlpha: 0, x: 30 }, 0)
      .from(q("[data-demo='chat']"), { autoAlpha: 0, y: 40 }, 0.05)
      .from(q("[data-chat-user]"), { autoAlpha: 0, y: 20 }, 0.15)
      .from(q("[data-chat-typing]"), { autoAlpha: 0 }, 0.28)
      .from(q("[data-chat-assistant]"), { autoAlpha: 0, y: 16 }, 0.4)
      .from(q("[data-chat-doc]"), { autoAlpha: 0, y: 20, scale: 0.97 }, 0.55);
  }

  const doc = root.querySelector("#escena-documento");
  if (doc) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: doc,
          start: "top 70%",
          end: "center 35%",
          scrub: 1,
        },
      })
      .from(q("[data-doc-copy]"), { autoAlpha: 0, y: 30 }, 0)
      .from(q("[data-agenda-item]"), { autoAlpha: 0, x: -20, stagger: 0.06 }, 0.1)
      .from(q("[data-doc-draft]"), { autoAlpha: 0, y: 30, scale: 0.97 }, 0.25)
      .from(q("[data-agreement]"), { autoAlpha: 0, y: 16, stagger: 0.08 }, 0.4);
  }

  const nucleus = root.querySelector("#escena-nucleo");
  if (nucleus) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: nucleus,
          start: "top 70%",
          end: "center center",
          scrub: 1,
        },
      })
      .from(q("[data-nucleus-copy]"), { autoAlpha: 0, y: 28 }, 0)
      .from(q("[data-nucleus-canvas]"), { autoAlpha: 0, scale: 0.94 }, 0.12);
  }

  const close = root.querySelector("#escena-cierre");
  if (close) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: close,
          start: "top 75%",
          end: "center 50%",
          scrub: 0.9,
        },
      })
      .from(q("[data-close-logo]"), { autoAlpha: 0, y: 16 }, 0)
      .from(q("[data-close-title]"), { autoAlpha: 0, y: 28 }, 0.1)
      .from(q("[data-close-sub]"), { autoAlpha: 0, y: 16 }, 0.25)
      .from(q("[data-close-ctas]"), { autoAlpha: 0, y: 12 }, 0.35);
  }

  ScrollTrigger.refresh();
}

export function CinematicExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(
          [
            "[data-hero-glow]",
            "[data-hero-logo-img]",
            "[data-hero-title]",
            "[data-hero-sub]",
            "[data-hero-scroll]",
          ],
          { clearProps: "all", autoAlpha: 1 },
        );
        return;
      }

      setupHeroIntro(gsap);
      setupScrollNarrative(gsap, ScrollTrigger, root);
    }, root);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="relative isolate">
      <PageAtmosphere />
      <Header />
      <ProgressNav />

      <main className="relative z-10">
        <SceneAwakening />
        <SceneEcosystem />
        <SceneVoice />
        <SceneConversation />
        <SceneDocument />
        <SceneNucleus />
        <SceneConvergence />
        <SceneClosing />
      </main>

      <Footer />
    </div>
  );
}
