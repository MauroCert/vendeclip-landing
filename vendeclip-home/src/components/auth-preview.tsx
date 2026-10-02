"use client";
import { useLocalizer } from "@/i18n/use-localizer";

import { LanguageSwitcher } from "./language-switcher";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { Icon, Logo } from "./icon";
export type AuthMode = "sign-in" | "sign-up" | "forgot-password";
export function AuthPreview({ mode, embedded = false }: { mode: AuthMode; embedded?: boolean }) {
  const Content = embedded ? "div" : "main";
  const Heading = embedded ? "h2" : "h1";
  const localize = useLocalizer();
  const signup = mode === "sign-up";
  const reset = mode === "forgot-password";
  const form = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const title = reset
    ? "Let’s get you back in."
    : signup
      ? "Your next great listing starts here."
      : "Welcome back.";
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    form.current?.reset();
    setSubmitted(true);
  }
  return localize((
    <div className={`auth-page${embedded ? " auth-embedded" : ""}`}>
      <header className="auth-header container">
        <Logo />
        {!embedded && <Link href="/" className="text-link">
          <Icon name="arrow" className="back-arrow" /> Back to the website
        </Link>}
      </header>
      <Content id={embedded ? undefined : "main"} className="auth-main container">
        <section className="auth-form-column">
          <div className="auth-form-wrap">
            <span className="eyebrow">
              {reset
                ? "RESET YOUR PASSWORD"
                : signup
                  ? "MAKE YOUR NEXT MOVE"
                  : "YOUR NEXT STORY IS WAITING"}
            </span>
            <Heading className="auth-title">{title}</Heading>
            <p className="auth-intro">
              {reset
                ? "Enter your email to review the password-reset flow."
                : signup
                  ? "Create property videos that look like you had a whole team behind them."
                  : "Pick up where you left off and bring your next property to life."}
            </p>
            <p className="auth-preview-note">
              Design preview. Use sample details; this form does not send or
              save them.
            </p>
            {submitted ? (
              <div className="auth-result" role="status">
                <span className="feature-icon">
                  <Icon name="check" />
                </span>
                <h2>
                  {reset
                    ? "Ready for the next step."
                    : "You’ve reached the end of the preview."}
                </h2>
                <p>
                  {reset
                    ? "To request a real password-reset email, continue on VendeClip."
                    : "Use the live VendeClip site to securely sign in or create your account."}
                </p>
                <a href={`https://vendeclip.com/${mode}`} className="button">
                  Continue on VendeClip <Icon name="arrow" />
                </a>
                <button
                  className="auth-text-button"
                  onClick={() => setSubmitted(false)}
                >
                  Back to the form
                </button>
              </div>
            ) : (
              <>
                {!reset && (
                  <>
                    <button
                      className="google-auth-button"
                      onClick={() => setSubmitted(true)}
                    >
                      Continue with Google <Icon name="arrow" />
                    </button>
                    <div className="auth-divider">
                      <span />
                      or continue with email
                      <span />
                    </div>
                  </>
                )}
                <form
                  ref={form}
                  onSubmit={submit}
                  className="auth-form"
                  autoComplete="off"
                >
                  {signup && (
                    <div className="auth-name-fields">
                      <label htmlFor="first-name">
                        First name
                        <input
                          id="first-name"
                          type="text"
                          placeholder="Alex"
                          required
                          autoComplete="off"
                        />
                      </label>
                      <label htmlFor="last-name">
                        Last name
                        <input
                          id="last-name"
                          type="text"
                          placeholder="Morgan"
                          required
                          autoComplete="off"
                        />
                      </label>
                    </div>
                  )}
                  <label htmlFor="auth-email">
                    Email address
                    <input
                      id="auth-email"
                      type="email"
                      placeholder="you@youragency.com"
                      required
                      autoComplete="off"
                    />
                  </label>
                  {!reset && (
                    <>
                      <div className="auth-password-label">
                        <label htmlFor="auth-password">Password</label>
                        {!signup && (
                          <Link href="/forgot-password">Forgot password?</Link>
                        )}
                      </div>
                      <div className="auth-password-input">
                        <input
                          id="auth-password"
                          type={showPassword ? "text" : "password"}
                          minLength={signup ? 8 : 1}
                          placeholder={
                            signup ? "Create a password" : "Enter your password"
                          }
                          autoComplete="new-password"
                          required
                          aria-describedby={
                            signup ? "password-hint" : undefined
                          }
                        />
                        <button
                          type="button"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          aria-pressed={showPassword}
                          onClick={() => setShowPassword((value) => !value)}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                      {signup && (
                        <span id="password-hint" className="auth-field-hint">
                          Use at least 8 characters.
                        </span>
                      )}
                    </>
                  )}
                  {signup && (
                    <label className="auth-terms">
                      <input type="checkbox" required />
                      <span>
                        I agree to the <Link href="/terms">Terms</Link> and{" "}
                        <Link href="/privacy">Privacy Policy</Link>.
                      </span>
                    </label>
                  )}
                  <button className="button auth-submit" type="submit">
                    {reset
                      ? "Continue"
                      : signup
                        ? "Create your account"
                        : "Sign in"}
                    <Icon name="arrow" />
                  </button>
                </form>
              </>
            )}
            <p className="auth-switch">
              {reset ? (
                <Link href="/sign-in">Back to sign in</Link>
              ) : signup ? (
                <>
                  Already have an account? <Link href="/sign-in">Sign in</Link>
                </>
              ) : (
                <>
                  New to VendeClip?{" "}
                  <Link href="/sign-up">Create an account</Link>
                </>
              )}
            </p>
            {signup && (
              <p className="auth-free-note">
                <Icon name="check" /> Start free · No credit card required
              </p>
            )}
          </div>
        </section>
        <aside className="auth-visual">
          <div className="auth-photo">
            <Image
              src="/media/costa-villa.webp"
              alt="Coastal home with a pool and ocean views"
              fill
              sizes="(max-width: 900px) 90vw, 50vw"
              priority
            />
            <div className="auth-visual-tag">
              <Icon name="sparkles" /> From listing photos to a whole new story
            </div>
            <div className="auth-visual-copy">
              <span>GREAT PROPERTIES DESERVE</span>
              <h2>Great videos.</h2>
              <p>
                Your brand. Your voice.
                <br />
                Your next buyer’s first impression.
              </p>
              <Link href="/examples">
                See what’s possible <Icon name="arrow" />
              </Link>
            </div>
          </div>
          <div className="auth-proof">
            <span>
              <Icon name="image" /> Start with your photos
            </span>
            <span>
              <Icon name="palette" /> Make it yours
            </span>
            <span>
              <Icon name="film" /> Ready to share
            </span>
          </div>
        </aside>
      </Content>
      {!embedded && <footer className="auth-footer container">
        <span>© {new Date().getFullYear()} VendeClip</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="https://aprender.vendeclip.com">Help center</a>
        </div>
      <LanguageSwitcher compact />
      </footer>}
    </div>
  ));
}
