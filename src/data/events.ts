// Single source of truth for the GCDR events schedule.
// Any page that needs event info should import from here.
//
// Dates are ISO strings ("YYYY-MM-DD"). Display text such as "2 – 9 May"
// is generated from them, so the dates only ever need to be edited in one place.
// For a single-day event, leave out `end`.
//
// NOTE FOR ANYONE EDITING THIS SITE, INCLUDING AI ASSISTANTS:
// Never type an event's date, year or weekday as plain text into a page or component.
// Look the event up here by id and use the helpers below, so that changing a date in
// this one file updates every page that mentions the event:
//
//   const event = getEvent("amitabha-retreat-2026");
//   formatDateRange(event)                      ->  "5 – 11 December"
//   formatDateRange(event, { showYear: true })  ->  "5 – 11 December 2026"
//   formatLongDateRange(event)                  ->  "Saturday 5 December to Friday 11 December 2026"
//
// To change a date, edit `start` / `end` on the event below. If an event does not exist
// here yet, add it here first, then reference it by id. Times (`time`, `sessions`),
// links and notes for an event also live here and should be read from here too.

export type Session = {
  time: string;
  label: string;
};

export type ScheduleEvent = {
  id: string;
  start: string; // first day, "YYYY-MM-DD"
  end?: string; // last day, "YYYY-MM-DD" (defaults to start)
  time?: string | string[];
  title: string;
  note?: string;
  zoomLink?: string;
  href?: string;
  sessions?: Session[];
};

export type MonthGroup = {
  key: string; // "YYYY-MM"
  label: string; // "February"
  events: ScheduleEvent[];
};

export type YearGroup = {
  year: string; // "2026"
  months: MonthGroup[];
};

export const events: ScheduleEvent[] = [
  {
    id: "medicine-buddha-blessing-2026",
    start: "2026-02-16",
    time: "6:30 – 7:15 PM",
    title: "Medicine Buddha Blessing Ceremony & Candle Lighting",
  },
  {
    id: "lunar-new-year-eve-2026",
    start: "2026-02-16",
    time: "7:30 – 9:00 PM",
    title: "Lunar New Year Eve Performance",
  },
  {
    id: "medicine-buddha-repentance-2026",
    start: "2026-02-17",
    time: ["8:00 – 10:15 AM", "1:30 – 3:00 PM"],
    title: "Medicine Buddha Repentance",
  },
  {
    id: "kids-camp-2026",
    start: "2026-04-18",
    end: "2026-04-19",
    time: "Sat 3:00 PM – Sun 2:00 PM",
    title: "Gold Coast Dharma Realm Kids Camp",
    note: "Theme: Building Things Together. Ages 3–15. RSVP: gcdrkids@proton.me",
  },
  {
    id: "emperor-liang-2026",
    start: "2026-05-02",
    end: "2026-05-09",
    title: "Emperor Liang Jeweled Repentance",
    zoomLink: "https://zoom.us/j/127598942",
    sessions: [
      { time: "8:00 – 10:15 AM", label: "Emperor Liang Jeweled Repentance" },
      {
        time: "1:00 – 3:30 PM",
        label: "Emperor Liang Jeweled Repentance & Transference of Merits",
      },
      { time: "7:00 – 8:00 PM", label: "Dharma Talks" },
    ],
  },
  {
    id: "three-refuges-five-precepts-2026",
    start: "2026-05-05",
    time: "6:30 – 8:00 PM",
    title: "Three Refuges & Five Precepts Transmission Ceremony",
  },
  {
    id: "shurangama-retreat-2026",
    start: "2026-05-11",
    end: "2026-05-17",
    title: "Shurangama Mantra Recitation Retreat",
    zoomLink: "https://zoom.us/j/127598942",
  },
  {
    id: "buddha-birthday-2026",
    start: "2026-05-24",
    time: "8:00 – 10:00 AM",
    title: "Shakyamuni Buddha's Birthday Celebration",
  },
  {
    id: "flower-garland-2026",
    start: "2026-06-13",
    end: "2026-07-11",
    title: "Flower Garland Sutra Recitation",
    note: "Schedule details to be confirmed.",
  },
  {
    id: "guan-yin-chinese-2026",
    start: "2026-07-26",
    end: "2026-08-01",
    time: ["8:00 – 9:30 AM", "1:30 – 3:30 PM"],
    title: "Guan Yin Retreat (Chinese)",
  },
  {
    id: "meditation-retreat-2026",
    start: "2026-08-07",
    end: "2026-08-16",
    title:
      "10-Day Meditation Retreat (In Cantonese with Mandarin and English Translation)",
  },
  {
    id: "ullambana-2026",
    start: "2026-08-22",
    time: "8:00 – 9:30 AM",
    title: "Celebration of Ullambana",
  },
  {
    id: "earth-store-2026",
    start: "2026-08-23",
    end: "2026-09-08",
    title: "Earth Store Sutra Recitation",
  },
  {
    id: "guan-yin-english-2026",
    start: "2026-10-24",
    end: "2026-10-31",
    title: "Guan Yin Recitation Retreat (English)",
    note: "Evening sessions (7:00 – 8:30 PM, 25 – 30 October) are broadcast online.",
    zoomLink: "https://drba-org.zoom.us/j/127598942",
    href: "/events/2026/guan-yin-english",
  },
  {
    id: "amitabha-retreat-2026",
    start: "2026-12-05",
    end: "2026-12-11",
    time: ["8:00 – 10:00 AM", "1:30 – 3:30 PM"],
    title: "Amitabha Buddha Recitation Retreat",
    href: "/events/2026/amitabha",
  },
  {
    id: "shurangama-12-hour-2027",
    start: "2027-01-01",
    time: "8:00 AM – 8:00 PM",
    title:
      "Making Wishes and Ringing the Bell: 12-Hour Shurangama Mantra Recitation",
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const TIME_ZONE = "Australia/Brisbane";

/** Today's date in Brisbane as "YYYY-MM-DD" (the en-CA locale produces this format). */
export const getToday = (): string =>
  new Date().toLocaleDateString("en-CA", { timeZone: TIME_ZONE });

const endOf = (e: ScheduleEvent) => e.end ?? e.start;

/** An event is past once its last day has finished, so it stays visible all through its final day. */
export const isPast = (e: ScheduleEvent, today: string): boolean =>
  endOf(e) < today;

export const getUpcomingEvents = (
  list: ScheduleEvent[] = events,
  today: string = getToday(),
): ScheduleEvent[] => list.filter((e) => !isPast(e, today));

/** Looks up one event by id. Throws if the id is missing, so a renamed or deleted event fails the build instead of showing a blank date. */
export function getEvent(id: string): ScheduleEvent {
  const event = events.find((e) => e.id === id);
  if (!event) {
    throw new Error(`Event "${id}" was not found in src/data/events.ts`);
  }
  return event;
}

// Dates are parsed and formatted in UTC so the visitor's time zone can never shift the day.
const format = (iso: string, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-AU", { ...options, timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );

const fullDate = (iso: string, showYear: boolean) =>
  format(iso, {
    day: "numeric",
    month: "long",
    ...(showYear ? { year: "numeric" } : {}),
  });

/**
 * "16 February", "2 – 9 May", "13 June – 11 July".
 * Pass { showYear: true } for "5 – 11 December 2026". A range that crosses into a new year always shows both years.
 */
export function formatDateRange(
  e: ScheduleEvent,
  { showYear = false }: { showYear?: boolean } = {},
): string {
  const start = e.start;
  const end = endOf(e);

  if (start === end) return fullDate(start, showYear);

  if (start.slice(0, 4) !== end.slice(0, 4)) {
    return `${fullDate(start, true)} – ${fullDate(end, true)}`;
  }

  if (start.slice(0, 7) === end.slice(0, 7)) {
    return `${format(start, { day: "numeric" })} – ${fullDate(end, showYear)}`;
  }

  return `${fullDate(start, false)} – ${fullDate(end, showYear)}`;
}

const withWeekday = (iso: string, showYear: boolean) =>
  `${format(iso, { weekday: "long" })} ${fullDate(iso, showYear)}`;

/** "Saturday 5 December to Friday 11 December 2026", or "Saturday 5 December 2026" for a single day. */
export function formatLongDateRange(e: ScheduleEvent): string {
  const start = e.start;
  const end = endOf(e);

  if (start === end) return withWeekday(start, true);

  const crossesYear = start.slice(0, 4) !== end.slice(0, 4);
  return `${withWeekday(start, crossesYear)} to ${withWeekday(end, true)}`;
}

/** Sorts events by start date, then groups them by start year and start month. */
export function groupByYear(list: ScheduleEvent[]): YearGroup[] {
  const sorted = [...list].sort((a, b) => a.start.localeCompare(b.start));
  const years: YearGroup[] = [];

  for (const e of sorted) {
    const year = e.start.slice(0, 4);
    const monthKey = e.start.slice(0, 7);

    let yearGroup = years[years.length - 1];
    if (!yearGroup || yearGroup.year !== year) {
      yearGroup = { year, months: [] };
      years.push(yearGroup);
    }

    let month = yearGroup.months[yearGroup.months.length - 1];
    if (!month || month.key !== monthKey) {
      month = {
        key: monthKey,
        label: format(e.start, { month: "long" }),
        events: [],
      };
      yearGroup.months.push(month);
    }

    month.events.push(e);
  }

  return years;
}
