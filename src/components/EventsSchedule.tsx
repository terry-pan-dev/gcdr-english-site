import eventImage from "@/assets/BuddhaHallEvent.webp";

type Session = {
  time: string;
  label: string;
};

type ScheduleEntry = {
  date: string;
  time?: string | string[];
  title: string;
  note?: string;
  zoomLink?: string;
  href?: string;
  sessions?: Session[];
};

type MonthBlock = {
  month: string;
  entries: ScheduleEntry[];
};

const schedule: MonthBlock[] = [
  {
    month: "February",
    entries: [
      {
        date: "16 February",
        time: "6:30 – 7:15 PM",
        title: "Medicine Buddha Blessing Ceremony & Candle Lighting",
      },
      {
        date: "16 February",
        time: "7:30 – 9:00 PM",
        title: "Lunar New Year Eve Performance",
      },
      {
        date: "17 February",
        time: ["8:00 – 10:15 AM", "1:30 – 3:00 PM"],
        title: "Medicine Buddha Repentance",
      },
    ],
  },
  {
    month: "April",
    entries: [
      {
        date: "18 – 19 April",
        time: "Sat 3:00 PM – Sun 2:00 PM",
        title: "Gold Coast Dharma Realm Kids Camp",
        note: "Theme: Building Things Together. Ages 3–15. RSVP: gcdrkids@proton.me",
      },
    ],
  },
  {
    month: "May",
    entries: [
      {
        date: "2 – 9 May",
        title: "Emperor Liang Jeweled Repentance",
        zoomLink: "https://zoom.us/j/127598942",
        sessions: [
          {
            time: "8:00 – 10:15 AM",
            label: "Emperor Liang Jeweled Repentance",
          },
          {
            time: "1:00 – 3:30 PM",
            label: "Emperor Liang Jeweled Repentance & Transference of Merits",
          },
          { time: "7:00 – 8:00 PM", label: "Dharma Talks" },
        ],
      },
      {
        date: "5 May",
        time: "6:30 – 8:00 PM",
        title: "Three Refuges & Five Precepts Transmission Ceremony",
      },
      {
        date: "11 – 17 May",
        title: "Shurangama Mantra Recitation Retreat",
        zoomLink: "https://zoom.us/j/127598942",
      },
      {
        date: "24 May",
        time: "8:00 – 10:00 AM",
        title: "Shakyamuni Buddha's Birthday Celebration",
      },
    ],
  },
  {
    month: "June",
    entries: [
      {
        date: "13 June – 11 July",
        title: "Flower Garland Sutra Recitation",
        note: "Schedule details to be confirmed.",
      },
    ],
  },
  {
    month: "July",
    entries: [
      {
        date: "26 July – 1 August",
        time: ["8:00 – 9:30 AM", "1:30 – 3:30 PM"],
        title: "Guan Yin Retreat (Chinese)",
      },
    ],
  },
  {
    month: "August",
    entries: [
      {
        date: "7 – 16 August",
        title: "10-Day Meditation Retreat",
      },
      {
        date: "22 August",
        time: "8:00 – 9:30 AM",
        title: "Celebration of Ullambana",
      },
      {
        date: "23 August – 8 September",
        title: "Earth Store Sutra Recitation",
      },
    ],
  },
  {
    month: "October",
    entries: [
      {
        date: "25 – 31 October",
        title: "Guan Yin Recitation Retreat (English)",
        href: "/events/Guan-Yin-English-2026",
      },
    ],
  },
  {
    month: "December",
    entries: [
      {
        date: "5 – 11 December",
        time: ["8:00 – 10:00 AM", "1:30 – 3:30 PM"],
        title: "Amitabha Buddha Recitation Retreat",
      },
    ],
  },
  {
    month: "January 2027",
    entries: [
      {
        date: "1 January 2027",
        time: "8:00 AM – 8:00 PM",
        title:
          "Making Wishes and Ringing the Bell — 12-Hour Shurangama Mantra Recitation",
      },
    ],
  },
];

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

        <h2 className="type-section-title" style={{ marginBottom: "0.75rem" }}>
          2026 Events, Ceremonies &amp; Retreats
        </h2>
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
        <div>
          {schedule.map((block) => (
            <div
              key={block.month}
              style={{
                marginBottom: "3rem",
                borderLeft: "2px solid var(--color-accent-gold)",
                paddingLeft: "1.5rem",
              }}
            >
              <h3
                className="type-subtitle"
                style={{
                  fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                  letterSpacing: "0.04em",
                  marginBottom: "0.75rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "0.5px solid var(--border)",
                }}
              >
                {block.month}
              </h3>

              {block.entries.map((entry, entryIndex) => (
                <div
                  key={entryIndex}
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
                      {entry.date}
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

                      {entry.zoomLink && !entry.sessions && (
                        <a
                          href={entry.zoomLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="type-link"
                          style={{
                            ...labelStyle,
                            display: "inline-block",
                            marginTop: "0.35rem",
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
                            display: "inline-block",
                            marginTop: "0.35rem",
                            color: "var(--color-accent-on-light)",
                          }}
                        >
                          View retreat details →
                        </a>
                      )}
                    </div>
                  </div>

                  {entry.sessions &&
                    entry.sessions.map((session, i) => (
                      <div key={i} style={{ ...rowGrid, marginTop: "0.3rem" }}>
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
        </div>
      </div>
    </div>
  );
}
