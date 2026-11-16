import { useEffect, useState } from "react";
import eventImage from "@/assets/BuddhaHallEvent.webp";
import {
  events,
  formatDateRange,
  getToday,
  groupByYear,
  isPast,
} from "@/data/events";

const timeStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  color: "var(--foreground)",
  lineHeight: 1.5,
  paddingTop: "0.1rem",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.82rem",
  color: "var(--foreground)",
  lineHeight: 1.5,
};

const rowGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "var(--schedule-date-col) 1fr",
  gap: "0 1rem",
  alignItems: "baseline",
};

export function EventsSchedule() {
  const [showPast, setShowPast] = useState(false);

  // `null` until the component has mounted in the browser. The server render and the
  // first client render both see `null`, so they match and there is no hydration warning.
  // Until then the full schedule is rendered, which also keeps every event in the HTML
  // for search engines and for visitors without JavaScript.
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(getToday());
  }, []);

  const pastCount =
    today === null ? 0 : events.filter((e) => isPast(e, today)).length;

  const visibleEvents =
    today === null || showPast
      ? events
      : events.filter((e) => !isPast(e, today));

  const years = groupByYear(visibleEvents);

  return (
    <div className="py-16 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="sm:hidden"
          style={{
            width: 28,
            height: 2,
            backgroundColor: "var(--accent)",
            marginBottom: "1.75rem",
          }}
        />

        <h2 className="type-section-title" style={{ marginBottom: "1rem" }}>
          Events, Ceremonies &amp; Retreats
        </h2>

        <p
          className="type-body"
          style={{
            color: "var(--medium-foreground)",
            fontSize: "0.98rem",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
          }}
        >
          Most ceremonies and retreats are in{" "}
          <strong>Chinese unless otherwise noted</strong>. Events offered in
          English are marked in the schedule. All are welcome at both English
          and Chinese sessions, with romanized texts and translations available
          to follow along.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          style={{
            marginBottom: "3.5rem",
            overflow: "hidden",
            borderRadius: "2px",
          }}
        >
          <img
            src={eventImage.src}
            alt="Community gathered at Gold Coast Dharma Realm"
            style={{
              width: "100%",
              height: "420px",
              objectFit: "cover",
              objectPosition: "center 79%",
              display: "block",
            }}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {pastCount > 0 && (
          <button
            type="button"
            onClick={() => setShowPast((v) => !v)}
            aria-expanded={showPast}
            aria-controls="events-schedule-list"
            className="mb-8 inline-flex cursor-pointer touch-manipulation select-none items-center gap-2.5 rounded-[var(--radius)] border border-[var(--border)] bg-transparent px-5 py-2.5 text-[0.9rem] text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold-10)] focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ fontFamily: "var(--font-body)", lineHeight: 1.4 }}
          >
            <span>{showPast ? "Hide past events" : "Show past events"}</span>
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-200 ${showPast ? "rotate-180" : ""}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        )}

        <div id="events-schedule-list">
          {years.length === 0 && (
            <p
              className="type-body"
              style={{ color: "var(--muted-foreground)", fontSize: "0.98rem" }}
            >
              New events will be announced soon.
            </p>
          )}

          {years.map((yearGroup) => (
            <section
              key={yearGroup.year}
              aria-labelledby={`year-${yearGroup.year}`}
            >
              <h3
                id={`year-${yearGroup.year}`}
                className="type-subtitle"
                style={{
                  fontSize: "clamp(1.9rem, 4vw, 2.4rem)",
                  marginBottom: "1.5rem",
                }}
              >
                {yearGroup.year}
              </h3>
              {yearGroup.months.map((block) => (
                <div
                  key={block.key}
                  style={{
                    marginBottom: "3rem",
                    borderLeft: "2px solid var(--color-accent-gold)",
                    paddingLeft: "1.5rem",
                  }}
                >
                  <h4
                    className="type-subtitle"
                    style={{
                      fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                      letterSpacing: "0.04em",
                      marginBottom: "0.75rem",
                      paddingBottom: "0.75rem",
                      borderBottom: "0.5px solid var(--border)",
                    }}
                  >
                    {block.label}
                  </h4>

                  {block.events.map((entry) => (
                    <div
                      key={entry.id}
                      style={{
                        paddingTop: "0.75rem",
                        paddingBottom: "0.75rem",
                        borderBottom: "0.5px solid var(--border)",
                      }}
                    >
                      <div style={rowGrid}>
                        <p
                          className="type-body"
                          style={{
                            fontSize: "0.88rem",
                            color: "var(--foreground)",
                            lineHeight: 1.5,
                          }}
                        >
                          {formatDateRange(entry)}
                        </p>

                        <div>
                          <p
                            className="type-subtitle"
                            style={{
                              fontSize: "1.15rem",
                              lineHeight: 1.4,
                            }}
                          >
                            {entry.title}
                          </p>

                          {entry.note && !entry.sessions && (
                            <p
                              style={{
                                ...labelStyle,
                                fontStyle: "italic",
                                marginTop: "0.2rem",
                              }}
                            >
                              {entry.note}
                            </p>
                          )}

                          {((entry.zoomLink && !entry.sessions) ||
                            entry.href) && (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "0.35rem",
                                marginTop: "0.35rem",
                              }}
                            >
                              {entry.zoomLink && !entry.sessions && (
                                <a
                                  href={entry.zoomLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="type-link"
                                  style={{
                                    ...labelStyle,
                                    color: "var(--color-accent-on-light)",
                                  }}
                                >
                                  Join on Zoom
                                </a>
                              )}

                              {entry.href && (
                                <a
                                  href={entry.href}
                                  className="type-link"
                                  style={{
                                    ...labelStyle,
                                    color: "var(--color-accent-on-light)",
                                  }}
                                >
                                  View retreat details →
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {entry.sessions &&
                        entry.sessions.map((session, i) => (
                          <div
                            key={i}
                            style={{ ...rowGrid, marginTop: "0.3rem" }}
                          >
                            <p style={timeStyle}>{session.time}</p>
                            <p style={labelStyle}>{session.label}</p>
                          </div>
                        ))}

                      {entry.sessions && entry.zoomLink && (
                        <div style={{ ...rowGrid, marginTop: "0.35rem" }}>
                          <div />
                          <a
                            href={entry.zoomLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="type-link"
                            style={{
                              ...labelStyle,
                              color: "var(--color-accent-on-light)",
                            }}
                          >
                            Join on Zoom
                          </a>
                        </div>
                      )}

                      {entry.sessions && entry.note && (
                        <div style={{ ...rowGrid, marginTop: "0.2rem" }}>
                          <div />
                          <p
                            style={{
                              ...labelStyle,
                              fontStyle: "italic",
                            }}
                          >
                            {entry.note}
                          </p>
                        </div>
                      )}

                      {!entry.sessions &&
                        entry.time &&
                        (Array.isArray(entry.time) ? (
                          entry.time.map((t, i) => (
                            <div
                              key={i}
                              style={{ ...rowGrid, marginTop: "0.3rem" }}
                            >
                              <p style={timeStyle}>{t}</p>
                              <div />
                            </div>
                          ))
                        ) : (
                          <div style={{ ...rowGrid, marginTop: "0.3rem" }}>
                            <p style={timeStyle}>{entry.time}</p>
                            <div />
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
