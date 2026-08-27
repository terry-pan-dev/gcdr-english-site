import ceremonyImage from "@/assets/CeremonyIncense.webp";

export function HomeEvents() {
  return (
    <section
      className="border-t"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--background)" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-12 gap-10 md:gap-14 md:items-center">
          {/* Text + schedule — 5 columns */}
          <div className="md:col-span-5">
            <h2
              className="type-section-title mb-8"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
            >
              Events at the Monastery
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderTop: "0.5px solid var(--border)",
              }}
            >
              {/* Saturday */}
              <div style={{ padding: "1.4rem 0", borderBottom: "0.5px solid var(--border)" }}>
                <p
                  className="type-subtitle"
                  style={{
                    fontSize: "1.15rem",
                    marginBottom: "0.4rem",
                  }}
                >
                  Saturday
                </p>
                <p className="type-body" style={{ color: "var(--foreground)" }}>
                  Ceremonies and Dharma talks
                </p>
              </div>

              {/* Sunday */}
              <div style={{ padding: "1.4rem 0", borderBottom: "0.5px solid var(--border)" }}>
                <p
                  className="type-subtitle"
                  style={{
                    fontSize: "1.15rem",
                    marginBottom: "0.4rem",
                  }}
                >
                  Sunday
                </p>
                <p className="type-body" style={{ color: "var(--foreground)" }}>
                  Yoga and meditation, children{"\u2019"}s cultural activities, and Dharma talks
                </p>
              </div>
            </div>

            <a
              href="/events"
              className="type-link inline-block font-medium"
              style={{
                marginTop: "1.4rem",
              }}
            >
              View events page {"\u2192"}
            </a>
          </div>

          {/* Photo — 7 columns */}
          <div className="md:col-span-7">
            <img
              src={ceremonyImage.src}
              alt="Visitor at the altar during a ceremony at Gold Coast Dharma Realm"
              style={{
                width: "100%",
                display: "block",
                borderRadius: 2,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
