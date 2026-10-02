"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useLocalizer } from "@/i18n/use-localizer";
import { isLocale } from "@/i18n/config";
import { Icon } from "./icon";
import type { AuthMode } from "./auth-preview";

const AuthPreview = dynamic(() => import("./auth-preview").then(module => module.AuthPreview));

function AuthDialog({ mode, onClose }: { mode: AuthMode; onClose: () => void }) {
  const localize = useLocalizer();
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog ref={dialog} className="auth-dialog" aria-label={localize.text(mode === "sign-up" ? "Create your account" : mode === "sign-in" ? "Sign in" : "Reset your password")}
      onCancel={onClose} onClose={() => { if (!dialog.current?.open) onClose(); }}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="auth-dialog-surface">
        <button type="button" className="auth-dialog-close" aria-label={localize.text("Close")} onClick={onClose}><Icon name="close" /></button>
        <AuthPreview key={mode} mode={mode} embedded />
      </div>
    </dialog>
  );
}

/** Real auth links remain usable without JS and for opening in another tab. */
export function HomeAuthLayer({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AuthMode | null>(null);
  function captureAuthLink(event: MouseEvent<HTMLDivElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
    if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) return;
    const segments = url.pathname.split("/").filter(Boolean);
    if (isLocale(segments[0] ?? "")) segments.shift();
    if (mode && segments.length === 0 && link.closest(".auth-dialog")) {
      event.preventDefault();
      event.stopPropagation();
      setMode(null);
      return;
    }
    if (segments.length !== 1) return;
    const destination = segments[0];
    if (destination !== "sign-in" && destination !== "sign-up" && destination !== "forgot-password") return;
    event.preventDefault();
    event.stopPropagation();
    setMode(destination);
  }
  return <div className="home-auth-layer" onClickCapture={captureAuthLink}>
    {children}
    {mode && <AuthDialog mode={mode} onClose={() => setMode(null)} />}
  </div>;
}
