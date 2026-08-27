import { Calendar } from "lucide-react";

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

export function EventsRegular() {
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
        <h2 className="type-section-title" style={{ marginBottom: "3rem" }}>
          Regular Activities
        </h2>

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

            {/* Morning Ceremony */}
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
                style={{ fontSize: "1.2rem", marginBottom: "0.75rem" }}
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
                <p>
                  <span style={{ color: "var(--foreground)" }}>
                    8:00 {"\u2013"} 9:30 AM
                  </span>{" "}
                  Avatamsaka Repentance
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
                      title: "Morning Ceremony — Avatamsaka Repentance",
                      start: "20260502T080000",
                      end: "20260502T093000",
                      details:
                        "Avatamsaka Repentance\nhttps://zoom.us/j/127598942",
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
              </div>
            </div>

            {/* Library Lecture */}
            <div
              style={{
                paddingTop: "1.25rem",
                paddingBottom: "1.25rem",
                borderBottom: "0.5px solid var(--border)",
              }}
            >
              <p
                className="type-subtitle"
                style={{ fontSize: "1.2rem", marginBottom: "0.75rem" }}
              >
                Library Dharma Talk
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
                        "Dharma talk by Rev. Heng Sure on A Pictorial Biography of the Venerable Master Hsu Yun\nhttps://zoom.us/j/96191533015?pwd=291853",
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
                style={{ fontSize: "1.2rem", marginBottom: "0.75rem" }}
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
                style={{ fontSize: "1.2rem", marginBottom: "0.75rem" }}
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
                style={{ fontSize: "1.2rem", marginBottom: "0.35rem" }}
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
                  Includes calligraphy and kids' Chinese culture classes.
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
                style={{ fontSize: "1.2rem", marginBottom: "0.75rem" }}
              >
                Sutra Dharma Talk
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
                <p style={{ marginTop: "0.5rem" }}>
                  Visitors are welcome to join in person. Please ring at the
                  gate for entry, as this talk is after opening hours.
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
                        "Dharma talk by Rev. Heng Sure on Avatamsaka (Flower Adornment) Sūtra.\nVisitors welcome in person — ring at the gate for entry.\nhttps://drba-org.zoom.us/j/84914586289",
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
