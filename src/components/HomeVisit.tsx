export function HomeVisit() {
  return (
    <section>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* ── Visit + Events ─────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-0">
          {/* Visit */}
          <div className="lg:pr-10">
            <div
              style={{
                width: "3.5rem",
                height: 2,
                backgroundColor: "var(--accent)",
                marginBottom: "1.5rem",
              }}
            />

            <h3 className="type-subtitle" style={{ marginBottom: "1rem" }}>
              Visit
            </h3>

            <p
              className="type-body"
              style={{
                color: "var(--foreground)",
                maxWidth: "26rem",
              }}
            >
              Hours, directions, and what to expect if you're coming for the
              first time.
            </p>

            <a
              href="/visit"
              className="type-link inline-block font-medium"
              style={{ marginTop: "1.5rem" }}
            >
              Plan your visit {"\u2192"}
            </a>
          </div>

          {/* Events */}
          <div
            className="
              pt-10 border-t
              lg:pt-0 lg:pl-10 lg:border-t-0 lg:border-l
            "
            style={{ borderColor: "var(--border)" }}
          >
            <div
              style={{
                width: "3.5rem",
                height: 2,
                backgroundColor: "var(--accent)",
                marginBottom: "1.5rem",
              }}
            />

            <h3 className="type-subtitle" style={{ marginBottom: "1rem" }}>
              Events
            </h3>

            <p
              className="type-body"
              style={{
                color: "var(--foreground)",
                maxWidth: "26rem",
              }}
            >
              Dharma talks, ceremonies, and retreats held throughout the year.
            </p>

            <a
              href="/events"
              className="type-link inline-block font-medium"
              style={{ marginTop: "1.5rem" }}
            >
              See upcoming events {"\u2192"}
            </a>
          </div>
        </div>

        {/* ── Visiting Details ───────────────────────────────── */}
        <div
          className="
            bg-secondary
            mt-14 md:mt-16
            -mx-4 sm:-mx-6 lg:-mx-8
            px-4 sm:px-6 lg:px-8
            py-8 sm:py-10
          "
          style={{ borderRadius: 2 }}
        >
          <div className="grid lg:grid-cols-2">
            {/* Visiting Hours */}
            <div className="lg:pr-10">
              <h3
                className="type-subtitle"
                style={{
                  paddingBottom: "0.9rem",
                  marginBottom: "0.55rem",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                Visiting Hours
              </h3>

              <div className="type-body" style={{ color: "var(--foreground)" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "0.7rem 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span>Saturday</span>
                  <span style={{ whiteSpace: "nowrap" }}>
                    7:30 AM {"\u2013"} 3:00 PM
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "0.7rem 0 0",
                  }}
                >
                  <span>Sunday</span>
                  <span style={{ whiteSpace: "nowrap" }}>
                    7:30 AM {"\u2013"} 11:30 AM
                  </span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div
              className="
                  mt-12
                  lg:mt-0 lg:pl-10
                  lg:border-l
                "
              style={{ borderColor: "var(--border)" }}
            >
              <h3
                className="type-subtitle"
                style={{
                  paddingBottom: "0.9rem",
                  marginBottom: "1.25rem",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                Location
              </h3>

              <p className="type-body" style={{ color: "var(--foreground)" }}>
                106 Bonogin Road, Bonogin, QLD
              </p>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Gold+Coast+Dharma+Realm+Bonogin+Road+Bonogin+QLD+4213"
                target="_blank"
                rel="noopener noreferrer"
                className="type-link inline-block font-medium"
                style={{ marginTop: "1.25rem" }}
              >
                Get directions {"\u2192"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
