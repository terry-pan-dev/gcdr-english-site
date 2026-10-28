import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

function addToCalLink({
  title,
  start,
  end,
  details = "",
  location = "",
  recurring = false,
}: {
  title: string;
  start: string;
  end: string;
  details?: string;
  location?: string;
  recurring?: boolean;
}) {
  const base = "https://calendar.google.com/calendar/render";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${start}/${end}`,
    details,
    location,
  });

  if (recurring) {
    params.set("recur", "RRULE:FREQ=WEEKLY");
  }

  params.set("ctz", "Australia/Brisbane");

  return `${base}?${params}`;
}

function CalLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="calendar-link"
      aria-label="Add to Google Calendar"
      title="Add to Google Calendar"
      style={{
        display: "inline-flex",
        alignItems: "center",
        marginLeft: "0.5rem",
        color: "var(--muted-foreground)",
        opacity: 0.85,
        verticalAlign: "middle",
        transition: "color 0.15s, opacity 0.15s",
      }}
    >
      <Calendar size={13} aria-hidden="true" />
    </a>
  );
}

/**
 * Time range shown on its own line above an event description.
 */
function EventTime({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "block",
        color: "var(--foreground)",
        fontSize: "0.9rem",
        fontWeight: 600,
        letterSpacing: "0.01em",
        marginBottom: "0.3rem",
      }}
    >
      {children}
    </span>
  );
}

/**
 * Saturday morning repentance service rotation.
 * "week" is the nth Saturday of the calendar month (1st through 5th).
 */
const SATURDAY_ROTATION = [
  { week: 1, label: "1st Saturday", title: "Avatamsaka Repentance" },
  { week: 2, label: "2nd Saturday", title: "Universal Door Chapter" },
  { week: 3, label: "3rd Saturday", title: "Pure Land Repentance" },
  { week: 4, label: "4th Saturday", title: "Earth Store Repentance" },
  { week: 5, label: "5th Saturday", title: "Announced separately" },
] as const;

type DateParts = { year: number; month: number; day: number };

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function getBrisbaneDateParts(): DateParts {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Australia/Brisbane",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const map: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== "literal") map[part.type] = part.value;
  }

  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
  };
}

function getBrisbaneToday(): Date {
  const { year, month, day } = getBrisbaneDateParts();
  // Noon UTC avoids DST/rollover edge cases when shifting days.
  return new Date(Date.UTC(year, month - 1, day, 12));
}

/**
 * Returns the date of the next occurrence of a given weekday
 * (0 = Sunday ... 6 = Saturday), staying on today if today already
 * is that weekday rather than jumping a full week ahead.
 */
function getNextDateForDow(targetDow: number): DateParts {
  const today = getBrisbaneToday();
  const daysUntil = (targetDow - today.getUTCDay() + 7) % 7;
  const target = new Date(today);
  target.setUTCDate(today.getUTCDate() + daysUntil);

  return {
    year: target.getUTCFullYear(),
    month: target.getUTCMonth() + 1,
    day: target.getUTCDate(),
  };
}

function formatEventDateTime(
  dateParts: DateParts,
  hour: number,
  minute: number,
): string {
  return `${dateParts.year}${pad2(dateParts.month)}${pad2(dateParts.day)}T${pad2(
    hour,
  )}${pad2(minute)}00`;
}

/**
 * Works out which Saturday of the month is "current":
 * - On any day Sun-Fri, this is the upcoming Saturday.
 * - On a Saturday itself, this stays on that same day (doesn't flip
 *   ahead to next week until Sunday).
 */
function getCurrentSaturdayOfMonth(): number {
  const { day } = getNextDateForDow(6);
  return Math.ceil(day / 7);
}

function useCurrentSaturdayOfMonth(): number | null {
  const [week, setWeek] = useState<number | null>(null);

  useEffect(() => {
    setWeek(getCurrentSaturdayOfMonth());
  }, []);

  return week;
}

/**
 * Dates for the calendar-link anchors, computed client-side (like the
 * rotation week above) so server and client renders match on first paint.
 */
function useNextWeekendDates(): {
  saturday: DateParts | null;
  sunday: DateParts | null;
} {
  const [dates, setDates] = useState<{
    saturday: DateParts | null;
    sunday: DateParts | null;
  }>({ saturday: null, sunday: null });

  useEffect(() => {
    setDates({
      saturday: getNextDateForDow(6),
      sunday: getNextDateForDow(0),
    });
  }, []);

  return dates;
}

export function EventsRegular() {
  const currentSaturdayWeek = useCurrentSaturdayOfMonth();
  const { saturday, sunday } = useNextWeekendDates();

  return (
    <div
      className="py-16 border-t"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--muted)",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div
          className="sm:hidden"
          style={{
            width: 28,
            height: 2,
            backgroundColor: "var(--accent)",
            marginBottom: "1.75rem",
          }}
        />

        <h2
          className="type-section-title"
          style={{
            marginBottom: "1rem",
          }}
        >
          Weekend Activities
        </h2>

        <p
          className="type-body"
          style={{
            color: "var(--muted-foreground)",
            fontSize: "0.98rem",
            lineHeight: 1.7,
            marginBottom: "3rem",
          }}
        >
          Our weekend activities are open to everyone, with no registration needed. They run most weekends and are in{" "}
          <strong>English unless otherwise noted</strong>.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Saturday */}
          <div>
            <h3
              className="type-subtitle flex items-center gap-5 before:content-[''] before:h-px before:flex-1 before:bg-[var(--color-accent-subtle)] after:content-[''] after:h-px after:flex-1 after:bg-[var(--color-accent-subtle)]"
              style={{
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
                fontSize: "1.4rem"
              }}
            >
              Saturday
            </h3>

            {/* Dharma Service */}
            <div
              style={{
                paddingTop: "1.25rem",
                paddingBottom: "1.25rem",
                borderBottom: "0.5px solid var(--border)",
              }}
            >
              <h4 className="type-item-title">
                Dharma Service
              </h4>

              <div
                className="type-body"
                style={{
                  color: "var(--foreground)",
                  fontSize: "0.95rem",
                }}
              >
                <EventTime>8:00 {"\u2013"} 9:30 AM</EventTime>

                <div style={{ marginBottom: "0.6rem" }}>
                  {SATURDAY_ROTATION.map((item) => {
                    const isCurrent = item.week === currentSaturdayWeek;
                    return (
                      <p
                        key={item.week}
                        style={{
                          lineHeight: 1.55,
                          fontWeight: isCurrent ? 600 : 400,
                        }}
                      >
                        {item.label}: {item.title}
                        {isCurrent && (
                          <span
                            style={{
                              color: "var(--muted-foreground)",
                              fontStyle: "italic",
                              fontWeight: 400,
                            }}
                          >
                            {" "}
                            {"\u00b7"} this week
                          </span>
                        )}
                      </p>
                    );
                  })}
                </div>

                <p
                  className="type-body"
                  style={{
                    color: "var(--muted-foreground)",
                    fontSize: "0.88rem",
                    fontStyle: "italic",
                    marginBottom: "0.35rem",
                  }}
                >
                  In Chinese
                </p>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  <a
                    href="https://zoom.us/j/127598942"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="type-link"
                    style={{
                      fontSize: "0.9rem",
                    }}
                  >
                    Join via Zoom {"\u2192"}
                  </a>

                  {saturday && (
                    <CalLink
                      href={addToCalLink({
                        title: "Morning Dharma Service",
                        start: formatEventDateTime(saturday, 8, 0),
                        end: formatEventDateTime(saturday, 9, 30),
                        details:
                          "Rotates weekly: 1st Sat Avatamsaka Repentance, 2nd Sat Universal Door Chapter, 3rd Sat Pure Land Repentance, 4th Sat Earth Store Repentance, 5th Sat announced separately.\nConducted in Chinese.\nhttps://zoom.us/j/127598942",
                        location: "https://zoom.us/j/127598942",
                        recurring: true,
                      })}
                    />
                  )}
                </span>
              </div>
            </div>

            {/* Buddha Hall Dharma Talk */}
            <div
              style={{
                paddingTop: "1.25rem",
                paddingBottom: "1.25rem",
                borderBottom: "0.5px solid var(--border)",
              }}
            >
              <h4 className="type-item-title">
                Buddha Hall Dharma Talk
              </h4>

              <div
                className="type-body"
                style={{
                  color: "var(--foreground)",
                  fontSize: "0.95rem",
                }}
              >
                <p>
                  <EventTime>9:30 {"\u2013"} 10:30 AM</EventTime>
                  Dharma Talk by Dharma Master Jin Fu
                </p>
                <p
                  className="type-body"
                  style={{
                    color: "var(--muted-foreground)",
                    fontSize: "0.88rem",
                    fontStyle: "italic",
                    marginBottom: "0.75rem",
                  }}
                >
                  Chinese with English translation
                </p>
              </div>
            </div>

            {/* Library Dharma Talk */}
            <div
              style={{
                paddingTop: "1.25rem",
                paddingBottom: "1.25rem",
                borderBottom: "0.5px solid var(--border)",
              }}
            >
              <h4 className="type-item-title">
                Library Dharma Talk
              </h4>

              <p
                className="type-body"
                style={{
                  color: "var(--muted-foreground)",
                  fontSize: "0.88rem",
                  fontStyle: "italic",
                  marginBottom: "0.75rem",
                }}
              >
                Online year-round · In person when Rev. Heng Sure is at GCDR,
                usually from mid-spring to mid-autumn
              </p>

              <div
                className="type-body"
                style={{
                  color: "var(--foreground)",
                  fontSize: "0.95rem",
                }}
              >
                <p>
                  <EventTime>12:30 {"\u2013"} 1:30 PM</EventTime>
                  Dharma talk by Rev. Heng Sure on
                  <em style={{ display: "block" }}>
                    A Pictorial Biography of the Venerable Master Hsu Yun
                    (Master Empty Cloud)
                  </em>
                </p>

                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <a
                    href="https://zoom.us/j/96191533015?pwd=291853"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="type-link"
                    style={{
                      fontSize: "0.9rem",
                    }}
                  >
                    Join via Zoom {"\u2192"}
                  </a>

                  {saturday && (
                    <CalLink
                      href={addToCalLink({
                        title: "Library Dharma Talk — Rev. Heng Sure",
                        start: formatEventDateTime(saturday, 12, 30),
                        end: formatEventDateTime(saturday, 13, 30),
                        details:
                          "Dharma talk by Rev. Heng Sure on A Pictorial Biography of the Venerable Master Hsu Yun.\nChinese with English translation.\nOnline year-round, with in-person attendance when Rev. Heng Sure is at Gold Coast Dharma Realm.\nhttps://zoom.us/j/96191533015?pwd=291853",
                        location: "https://zoom.us/j/96191533015?pwd=291853",
                        recurring: true,
                      })}
                    />
                  )}
                </span>
              </div>
            </div>

            {/* Afternoon Recitation */}
            <div
              style={{
                paddingTop: "1.25rem",
                paddingBottom: "1.25rem",
                borderBottom: "0.5px solid var(--border)",
              }}
            >
              <h4 className="type-item-title">
                Afternoon Recitation
              </h4>

              <div
                className="type-body"
                style={{
                  color: "var(--foreground)",
                  fontSize: "0.95rem",
                }}
              >
                <p>
                  <EventTime>1:45 {"\u2013"} 3:00 PM</EventTime>
                  Shurangama Mantra Recitation &amp; Transference of Merits
                </p>

                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  <a
                    href="https://zoom.us/j/127598942"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="type-link"
                    style={{
                      fontSize: "0.9rem",
                    }}
                  >
                    Join via Zoom {"\u2192"}
                  </a>

                  {saturday && (
                    <CalLink
                      href={addToCalLink({
                        title: "Afternoon Recitation — Shurangama Mantra",
                        start: formatEventDateTime(saturday, 13, 45),
                        end: formatEventDateTime(saturday, 15, 0),
                        details:
                          "Shurangama Mantra Recitation & Transference of Merits\nhttps://zoom.us/j/127598942",
                        location: "https://zoom.us/j/127598942",
                        recurring: true,
                      })}
                    />
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Sunday */}
          <div>
            <h3
              className="type-subtitle flex items-center gap-5 before:content-[''] before:h-px before:flex-1 before:bg-[var(--color-accent-subtle)] after:content-[''] after:h-px after:flex-1 after:bg-[var(--color-accent-subtle)]"
              style={{
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
                fontSize: "1.4rem"
              }}
            >
              Sunday
            </h3>

            {/* Yoga & Meditation */}
            <div
              style={{
                paddingTop: "1.25rem",
                paddingBottom: "1.25rem",
                borderBottom: "0.5px solid var(--border)",
              }}
            >
              <h4 className="type-item-title">
                Yoga &amp; Meditation
              </h4>

              <div
                className="type-body"
                style={{
                  color: "var(--foreground)",
                  fontSize: "0.95rem",
                }}
              >
                <p>
                  <EventTime>8:00 {"\u2013"} 10:00 AM</EventTime>
                  A guided session open to all, including yoga, meditation, and a short dharma talk. Sitting cushions, chairs, and mats are available.
                </p>

                <a
                  href="/yoga"
                  className="type-link subtle-text-link"
                  style={{
                    display: "inline-block",
                    marginTop: "0.5rem",
                    fontSize: "0.9rem",
                  }}
                >
                  More information {"\u2192"}
                </a>
              </div>
            </div>

            {/* Sunday Classes */}
            <div
              style={{
                paddingTop: "1.25rem",
                paddingBottom: "1.25rem",
                borderBottom: "0.5px solid var(--border)",
              }}
            >
              <h4 className="type-item-title">
                Sunday Classes
              </h4>

              <p
                className="type-body"
                style={{
                  color: "var(--muted-foreground)",
                  fontSize: "0.88rem",
                  fontStyle: "italic",
                  marginBottom: "0.75rem",
                }}
              >
                Term-based
              </p>

              <div
                className="type-body"
                style={{
                  color: "var(--foreground)",
                  fontSize: "0.95rem",
                }}
              >
                <p>
                  <EventTime>9:00 {"\u2013"} 11:00 AM</EventTime>
                  Includes calligraphy and kids&apos; Chinese culture classes.
                </p>
              </div>
            </div>

            {/* Sutra Dharma Talk */}
            <div
              style={{
                paddingTop: "1.25rem",
                paddingBottom: "1.25rem",
                borderBottom: "0.5px solid var(--border)",
              }}
            >
              <h4 className="type-item-title">
                Sutra Dharma Talk
              </h4>

              <p
                className="type-body"
                style={{
                  color: "var(--muted-foreground)",
                  fontSize: "0.88rem",
                  fontStyle: "italic",
                  marginBottom: "0.75rem",
                }}
              >
                Online year-round · In person when Rev. Heng Sure is at GCDR,
                usually from mid-spring to mid-autumn
              </p>

              <div
                className="type-body"
                style={{
                  color: "var(--foreground)",
                  fontSize: "0.95rem",
                }}
              >
                <p>
                  <EventTime>
                    12:30 {"\u2013"} 3:00 PM
                    <span
                      style={{
                        color: "var(--muted-foreground)",
                        fontSize: "0.88rem",
                        fontStyle: "italic",
                        fontWeight: 400,
                      }}
                    >
                      {" "}
                      {"\u00b7"} After hours: please ring the buzzer at the gate.
                    </span>
                  </EventTime>
                  Dharma talk by Rev. Heng Sure on
                  <em style={{ display: "block" }}>
                    Avatamsaka (Flower Adornment) Sūtra
                  </em>
                </p>

                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <a
                    href="https://drba-org.zoom.us/j/84914586289"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="type-link"
                    style={{
                      fontSize: "0.9rem",
                    }}
                  >
                    Join via Zoom {"\u2192"}
                  </a>

                  {sunday && (
                    <CalLink
                      href={addToCalLink({
                        title: "Sutra Dharma Talk — Rev. Heng Sure",
                        start: formatEventDateTime(sunday, 12, 30),
                        end: formatEventDateTime(sunday, 15, 0),
                        details:
                          "Dharma talk by Rev. Heng Sure on Avatamsaka (Flower Adornment) Sūtra.\nOnline year-round, with in-person attendance when Rev. Heng Sure is at Gold Coast Dharma Realm.\nhttps://drba-org.zoom.us/j/84914586289",
                        location: "https://drba-org.zoom.us/j/84914586289",
                        recurring: true,
                      })}
                    />
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
