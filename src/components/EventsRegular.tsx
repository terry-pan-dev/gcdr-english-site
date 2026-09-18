import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";

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

function getBrisbaneDateParts(): { year: number; month: number; day: number } {
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

/**
 * Works out which Saturday of the month is "current":
 * - On any day Sun–Fri, this is the upcoming Saturday.
 * - On a Saturday itself, this stays on that same day (doesn't flip
 *   ahead to next week until Sunday).
 */
function getCurrentSaturdayOfMonth(): number {
  const { year, month, day } = getBrisbaneDateParts();
  // Noon UTC avoids DST/rollover edge cases when shifting days.
  const today = new Date(Date.UTC(year, month - 1, day, 12));

  const daysUntilSaturday = (6 - today.getUTCDay() + 7) % 7;
  const referenceSaturday = new Date(today);
  referenceSaturday.setUTCDate(today.getUTCDate() + daysUntilSaturday);

  return Math.ceil(referenceSaturday.getUTCDate() / 7);
}

function useCurrentSaturdayOfMonth(): number | null {
  const [week, setWeek] = useState<number | null>(null);

  useEffect(() => {
    setWeek(getCurrentSaturdayOfMonth());
  }, []);

  return week;
}

export function EventsRegular() {
  const currentSaturdayWeek = useCurrentSaturdayOfMonth();
  const currentService = SATURDAY_ROTATION.find(
    (item) => item.week === currentSaturdayWeek,
  );

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
            maxWidth: "44rem",
            marginBottom: "3rem",
          }}
        >
          Our weekend activities are open to everyone and do not require
          registration. They take place most weekends and are in{" "}
          <strong>English unless otherwise noted</strong>.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Saturday */}
          <div>
            <h3
              className="type-subtitle"
              style={{
                fontSize: "1.25rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              Saturday
            </h3>

            {/* Dharma Service and Lecture */}
            <div
              style={{
                borderTop: "0.5px solid var(--border)",
                paddingTop: "1.25rem",
                paddingBottom: "1.25rem",
                borderBottom: "0.5px solid var(--border)",
              }}
            >
              <p
                className="type-subtitle"
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "0.35rem",
                }}
              >
                Dharma Service and Lecture
              </p>

              <div
                className="type-body"
                style={{
                  color: "var(--foreground)",
                  fontSize: "0.95rem",
                }}
              >
                <p style={{ marginBottom: "0.35rem" }}>
                  <span style={{ color: "var(--foreground)" }}>
                    8:00 {"\u2013"} 9:30 AM
                  </span>
                </p>

                <div style={{ marginBottom: "0.35rem" }}>
                  {SATURDAY_ROTATION.map((item) => {
                    const isCurrent = item.week === currentSaturdayWeek;
                    return (
                      <p
                        key={item.week}
                        style={{
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

                  <CalLink
                    href={addToCalLink({
                      title: `Morning Ceremony ${"\u2014"} ${
                        currentService
                          ? currentService.title
                          : "Repentance Service"
                      }`,
                      start: "20260502T080000",
                      end: "20260502T093000",
                      details:
                        "Rotates weekly: 1st Sat Avatamsaka Repentance, 2nd Sat Universal Door Chapter, 3rd Sat Pure Land Repentance, 4th Sat Earth Store Repentance, 5th Sat announced separately.\nConducted in Chinese.\nhttps://zoom.us/j/127598942",
                      location: "https://zoom.us/j/127598942",
                      recurring: true,
                    })}
                  />
                </span>

                <p>
                  <span style={{ color: "var(--foreground)" }}>
                    9:30 {"\u2013"} 10:30 AM
                  </span>{" "}
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
              <p
                className="type-subtitle"
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "0.35rem",
                }}
              >
                Library Dharma Talk
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
                  <span style={{ color: "var(--foreground)" }}>
                    12:30 {"\u2013"} 1:30 PM
                  </span>{" "}
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

                  <CalLink
                    href={addToCalLink({
                      title: "Library Dharma Talk — Rev. Heng Sure",
                      start: "20260502T123000",
                      end: "20260502T133000",
                      details:
                        "Dharma talk by Rev. Heng Sure on A Pictorial Biography of the Venerable Master Hsu Yun.\nChinese with English translation.\nOnline year-round, with in-person attendance when Rev. Heng Sure is at Gold Coast Dharma Realm.\nhttps://zoom.us/j/96191533015?pwd=291853",
                      location: "https://zoom.us/j/96191533015?pwd=291853",
                      recurring: true,
                    })}
                  />
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
              <p
                className="type-subtitle"
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "0.75rem",
                }}
              >
                Afternoon Recitation
              </p>

              <div
                className="type-body"
                style={{
                  color: "var(--foreground)",
                  fontSize: "0.95rem",
                }}
              >
                <p>
                  <span style={{ color: "var(--foreground)" }}>
                    1:45 {"\u2013"} 3:00 PM
                  </span>{" "}
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

                  <CalLink
                    href={addToCalLink({
                      title: "Afternoon Recitation — Shurangama Mantra",
                      start: "20260502T134500",
                      end: "20260502T150000",
                      details:
                        "Shurangama Mantra Recitation & Transference of Merits\nhttps://zoom.us/j/127598942",
                      location: "https://zoom.us/j/127598942",
                      recurring: true,
                    })}
                  />
                </span>
              </div>
            </div>
          </div>

          {/* Sunday */}
          <div>
            <h3
              className="type-subtitle"
              style={{
                fontSize: "1.25rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              Sunday
            </h3>

            {/* Yoga & Meditation */}
            <div
              style={{
                borderTop: "0.5px solid var(--border)",
                paddingTop: "1.25rem",
                paddingBottom: "1.25rem",
                borderBottom: "0.5px solid var(--border)",
              }}
            >
              <p
                className="type-subtitle"
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "0.75rem",
                }}
              >
                Yoga &amp; Meditation
              </p>

              <div
                className="type-body"
                style={{
                  color: "var(--foreground)",
                  fontSize: "0.95rem",
                }}
              >
                <p>
                  <span style={{ color: "var(--foreground)" }}>
                    8:00 {"\u2013"} 10:00 AM
                  </span>{" "}
                  A guided session open to all. Sitting cushions, mats, and
                  blankets are available.
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
              <p
                className="type-subtitle"
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "0.35rem",
                }}
              >
                Sunday Classes
              </p>

              <p
                className="type-body"
                style={{
                  color: "var(--foreground)",
                  fontSize: "0.88rem",
                  marginBottom: "0.75rem",
                  fontStyle: "italic",
                }}
              >
                Term-based &mdash; running through 29 March
              </p>

              <div
                className="type-body"
                style={{
                  color: "var(--foreground)",
                  fontSize: "0.95rem",
                }}
              >
                <p>
                  <span style={{ color: "var(--foreground)" }}>
                    9:00 {"\u2013"} 11:00 AM
                  </span>{" "}
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
              <p
                className="type-subtitle"
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "0.35rem",
                }}
              >
                Sutra Dharma Talk
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
                  <span style={{ color: "var(--foreground)" }}>
                    12:30 {"\u2013"} 3:00 PM
                  </span>{" "}
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

                  <CalLink
                    href={addToCalLink({
                      title: "Sutra Dharma Talk — Rev. Heng Sure",
                      start: "20260503T123000",
                      end: "20260503T150000",
                      details:
                        "Dharma talk by Rev. Heng Sure on Avatamsaka (Flower Adornment) Sūtra.\nOnline year-round, with in-person attendance when Rev. Heng Sure is at Gold Coast Dharma Realm.\nhttps://drba-org.zoom.us/j/84914586289",
                      location: "https://drba-org.zoom.us/j/84914586289",
                      recurring: true,
                    })}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
