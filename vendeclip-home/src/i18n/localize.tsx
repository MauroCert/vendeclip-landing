import { Children, cloneElement, isValidElement, type ReactNode, type ReactElement } from 'react';
import { localizedHref } from './config';
export type Dictionary = Record<string, string>;
export const normalize = (value: string) => value.replace(/\s+/g, ' ').trim();
const cache = new WeakMap<Dictionary, Map<string, ReturnType<typeof buildLocalizer>>>();
export function createLocalizer(encoded: Dictionary, locale: string) {
  let byLocale = cache.get(encoded);
  if (!byLocale) { byLocale = new Map(); cache.set(encoded, byLocale); }
  let existing = byLocale.get(locale);
  if (!existing) { existing = buildLocalizer(encoded, locale); byLocale.set(locale, existing); }
  return existing;
}
function buildLocalizer(encoded: Dictionary, locale: string) {
  const messages = Object.fromEntries(Object.entries(encoded).map(([key, value]) => [decodeURIComponent(key), value]));
  const lowercase = Object.fromEntries(Object.entries(messages).map(([key, value]) => [key.toLowerCase(), value]));
  const patterns = Object.entries(messages).filter(([key]) => /\{\d+\}/.test(key)).sort(([a], [b]) => b.replace(/\{\d+\}/g, '').length - a.replace(/\{\d+\}/g, '').length).map(([key, target]) => ({
    expression: new RegExp('^' + key.split(/(\{\d+\})/).map(part => /^\{\d+\}$/.test(part) ? '(.+?)' : part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('') + '$'), target,
  }));
  function text(value: string, depth = 0): string {
    const normalized = normalize(value);
    let translated = messages[normalized] ?? lowercase[normalized.toLowerCase()];
    if (translated === undefined && depth < 2) {
      for (const pattern of patterns) {
        const match = normalized.match(pattern.expression);
        if (match) { translated = pattern.target.replace(/\{(\d+)\}/g, (_, i) => text(match[Number(i) + 1] ?? '', depth + 1)); break; }
      }
    }
    if (translated === undefined) return value;
    return (value.match(/^\s*/)?.[0] ?? '') + translated + (value.match(/\s*$/)?.[0] ?? '');
  }
  function node<T extends ReactNode>(value: T): T {
    if (typeof value === 'string') return text(value) as T;
    if (Array.isArray(value)) return Children.map(value, child => node(child)) as unknown as T;
    if (!isValidElement(value)) return value;
    const element = value as ReactElement<Record<string, unknown>>;
    const props = element.props;
    const changes: Record<string, unknown> = {};
    if ('children' in props) changes.children = node(props.children as ReactNode);
    for (const key of ['alt', 'title', 'placeholder', 'aria-label', 'aria-description', 'aria-valuetext']) {
      if (typeof props[key] === 'string') changes[key] = text(props[key]);
    }
    if (typeof props.href === 'string') changes.href = localizedHref(props.href, locale);
    if (props.lang === 'es') changes.lang = locale === 'en-gb' ? 'en-GB' : locale;
    return cloneElement(element, changes) as T;
  }
  return Object.assign(node, {text, locale});
}
