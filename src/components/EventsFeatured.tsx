export function EventsFeatured() {
  return (
    <div className="py-16 border-t" style={{ borderColor: "var(--border)" }}>
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
        <h2 className="type-section-title" style={{ marginBottom: "0.75rem" }}>
          Featured Retreats
        </h2>
        <p
          className="type-body"
          style={{
            color: "var(--foreground)",
            marginBottom: "3rem",
          }}
        >
          To register or enquire about any of the following retreats, please
          contact the monastery at{" "}
          <a href="mailto:gcdr.australia@gmail.com" className="type-link">
            gcdr.australia@gmail.com
          </a>
          .
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Three Refuges & Five Precepts */}
          <div
            style={{
              backgroundColor: "var(--muted)",
              padding: "1.5rem",
              borderTop: "2px solid var(--accent)",
            }}
          >
            <p
              className="type-body"
              style={{
                color: "var(--foreground)",
                fontSize: "0.85rem",
                marginBottom: "0.6rem",
                letterSpacing: "0.03em",
              }}
            >
              5 May 2026 &mdash; 6:30 PM
            </p>
            <h3 className="type-subtitle" style={{ marginBottom: "1rem" }}>
              Three Refuges &amp; Five Precepts Transmission Ceremony
            </h3>
            <p
              className="type-body"
              style={{
                color: "var(--foreground)",
                fontSize: "0.92rem",
              }}
            >
              A formal ceremony for those wishing to take refuge in the Buddha,
              Dharma, and Sangha and receive the Five Precepts.
            </p>
          </div>

          {/* 10-Day Meditation Retreat */}
          <div
            style={{
              backgroundColor: "var(--muted)",
              padding: "1.5rem",
              borderTop: "2px solid var(--accent)",
            }}
          >
            <p
              className="type-body"
              style={{
                color: "var(--foreground)",
                fontSize: "0.85rem",
                marginBottom: "0.6rem",
                letterSpacing: "0.03em",
              }}
            >
              7 {"\u2013"} 16 August 2026
            </p>
            <h3 className="type-subtitle" style={{ marginBottom: "1rem" }}>
              10-Day Meditation Retreat
            </h3>
            <p
              className="type-body"
              style={{
                color: "var(--foreground)",
                fontSize: "0.92rem",
              }}
            >
              A ten-day residential meditation retreat held at the monastery.
            </p>
          </div>

          {/* Guan Yin Recitation Retreat (English) */}
          <div
            style={{
              backgroundColor: "var(--muted)",
              padding: "1.5rem",
              borderTop: "2px solid var(--accent)",
            }}
          >
            <p
              className="type-body"
              style={{
                color: "var(--foreground)",
                fontSize: "0.85rem",
                marginBottom: "0.6rem",
                letterSpacing: "0.03em",
              }}
            >
              25 {"\u2013"} 31 October 2026
            </p>
            <h3 className="type-subtitle" style={{ marginBottom: "1rem" }}>
              Guan Yin Recitation Retreat{" "}
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--heading-foreground)",
                  fontSize: "1.25rem",
                }}
              >
                (English)
              </span>
            </h3>
            <p
              className="type-body"
              style={{
                color: "var(--foreground)",
                fontSize: "0.92rem",
              }}
            >
              A week-long retreat centred on the recitation of Guan Yin
              Bodhisattva&rsquo;s name, conducted in English.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
