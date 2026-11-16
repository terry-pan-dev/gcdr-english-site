// Content for the FeaturedEvent card (home page and events page).
//
// Dates, links and times are NOT stored here. Each entry points to an event in
// src/data/events.ts by id, and the dates come from there. Never type a date in this file.
//
// HOW IT WORKS
// The card shows the first entry below (ordered by the event's start date) whose event has
// not finished yet. An event stays featured through its last day and drops off the day after.
// If every featured event is in the past, the card is hidden.
//
// TO FEATURE A NEW EVENT
// 1. Make sure the event exists in src/data/events.ts.
// 2. Add one entry to `featuredEvents` below. Order does not matter.
//
// OPTIONAL FIELDS (leave them out and that line, and its divider, is simply not shown):
// subtitle, tagline, ledBy, href, linkText, imageClassName

import amitabhaImage from "@/assets/Amituofo.webp";
import guanYinImage from "@/assets/GuanYinRetreat.webp";
import { getEvent, getToday, isPast, type ScheduleEvent } from "@/data/events";

export type FeaturedEventContent = {
  /** Must match an event id in src/data/events.ts */
  eventId: string;
  /** Small label above the title, e.g. "Featured Retreat" */
  label: string;
  title: string;
  /** Italic line directly under the title, e.g. a Chinese name or secondary title */
  subtitle?: string;
  /** Chinese title name, use instead of subtitle so it isn't in italics */
  chineseTitle?: string;
  /** Italic line under the dates */
  tagline?: string;
  description: string;
  /** Names only. The card adds "Led by " in front. */
  ledBy?: string;
  image: { src: string };
  imageAlt: string;
  /** Tailwind classes for cropping, e.g. "object-[center_45%]" */
  imageClassName?: string;
  /** Defaults to the event's own href in events.ts */
  href?: string;
  /** Defaults to "View event" */
  linkText?: string;
};

export const featuredEvents: FeaturedEventContent[] = [
  {
    eventId: "guan-yin-english-2026",
    label: "Upcoming Retreat",
    title: "Listen to the Heart",
    subtitle: "Guan Yin Meditation Retreat",
    tagline: "When was the last time we really listened?",
    description:
      "Slow down and explore the practice of deep listening. Listen to the body, the heart, the natural world, and the stillness within. A week of meditation, reflection, nature and Buddhist teachings at Gold Coast Dharma Realm.",
    ledBy: "Rev. Heng Sure, Ven. Jin Chuan, Ven. Jin Wei & other monastics",
    image: guanYinImage,
    imageAlt: "Guan Yin Bodhisattva at Gold Coast Dharma Realm",
    imageClassName: "object-[center_20%] md:object-[center_30%]",
    linkText: "View retreat",
  },
  {
    eventId: "amitabha-retreat-2026",
    label: "Upcoming Retreat",
    title: "Amitabha Recitation Retreat",
    chineseTitle: "彌陀七法會",
    //tagline: "A traditional week of recitation and cultivation",
    description:
      "Seven days devoted to reciting Na Mo Amituofo with the monastic community, with a Dharma talk each evening. Chanting in Chinese, with English translation for Dharma talks. Join in person or live on Zoom.",
    ledBy: "Dharma Master Heng Yang",
    image: amitabhaImage,
    imageAlt: "Amitabha Buddha statue at Gold Coast Dharma Realm",
    imageClassName: "object-[center_25%]",
    linkText: "View retreat",
  },
];

export type FeaturedSelection = {
  content: FeaturedEventContent;
  event: ScheduleEvent;
};

/**
 * Returns the featured event to show on the given day ("YYYY-MM-DD", Brisbane time),
 * or null if every featured event has finished.
 */
export function getFeaturedEvent(
  today: string = getToday(),
): FeaturedSelection | null {
  const candidates = featuredEvents
    .map((content) => ({ content, event: getEvent(content.eventId) }))
    .filter(({ event }) => !isPast(event, today))
    .sort((a, b) => a.event.start.localeCompare(b.event.start));

  return candidates[0] ?? null;
}
