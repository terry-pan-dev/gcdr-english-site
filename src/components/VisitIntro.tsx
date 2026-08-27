import pathImage from "@/assets/PathOffice.webp";

export function VisitIntro() {
  return (
    <section id="visit" style={{ backgroundColor: "var(--background)" }}>
      <div className="pt-nav pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="type-page-title mb-6">Visiting the Monastery</h1>
          <p className="type-body" style={{ color: "var(--foreground)" }}>
            Visitors are welcome to come during visiting hours, to attend
            activities, or just be here as the monastery goes about its day. For
            Dharma talks, ceremonies, or retreats, please see the{" "}
            <a href="/events" className="type-link">
              Events page
            </a>{" "}
            for current offerings.
          </p>
        </div>
      </div>

      {/* ── Grounds Photo ────────────────────────────────────── */}
      <div
        className="mx-auto px-4 sm:px-6 lg:px-8 pb-4"
        style={{ maxWidth: "72rem" }}
      >
        <div
          style={{
            margin: "2.5rem 0",
            overflow: "hidden",
            borderRadius: 2,
          }}
        >
          <img
            src={pathImage.src}
            alt="Garden path and grounds of Gold Coast Dharma Realm"
            style={{
              width: "100%",
              height: "clamp(260px, 40vw, 420px)",
              objectFit: "cover",
              objectPosition: "center 100%",
              display: "block",
            }}
          />
        </div>
      </div>

      {/* ── Visiting Hours & Location ────────────────────────── */}
      <div
        className="pt-10 pb-14 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Visiting Hours */}
            <div>
              <h3 className="type-subtitle mb-5">Visiting Hours</h3>
              <div
                style={{
                  borderTop: "0.5px solid var(--border)",
                }}
              >
                <div
                  className="type-body"
                  style={{
                    color: "var(--foreground)",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.5rem 0",
                    borderBottom: "0.5px solid var(--border)",
                  }}
                >
                  <span style={{ color: "var(--foreground)" }}>Saturday</span>
                  <span>7:30 AM {"\u2013"} 3:00 PM</span>
                </div>
                <div
                  className="type-body"
                  style={{
                    color: "var(--foreground)",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.5rem 0",
                  }}
                >
                  <span style={{ color: "var(--foreground)" }}>Sunday</span>
                  <span>7:30 AM {"\u2013"} 11:30 AM</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="type-subtitle mb-5">Location</h3>
              <p className="type-body" style={{ color: "var(--foreground)" }}>
                Gold Coast Dharma Realm
                <br />
                106 Bonogin Road
                <br />
                Bonogin, Queensland, 4213
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Gold+Coast+Dharma+Realm+Bonogin+Road+Bonogin+QLD+4213"
                target="_blank"
                rel="noopener noreferrer"
                className="type-link inline-block font-medium"
                style={{
                  marginTop: "0.85rem",
                }}
              >
                Get Directions {"\u2192"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
