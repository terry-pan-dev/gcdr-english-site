import guanYinRetreat from "@/assets/GuanYinRetreat.webp";

/* ─────────────────────────────────────────────────────────────
   Icons — reused from Yoga.tsx for consistency. Worth extracting
   to a shared icons file if a third event page needs these.
───────────────────────────────────────────────────────────── */

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="25" height="25" fill="none" aria-hidden="true">
      <path
        d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="27" height="27" fill="none" aria-hidden="true">
      <path
        d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" width="27" height="27" fill="none" aria-hidden="true">
      <path d="m3 6 5-2 8 3 5-2v13l-5 2-8-3-5 2V6Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 4v13M16 7v13" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function GuanYinRetreat2026() {
  return (
    <section style={{ backgroundColor: "var(--background)" }}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <div
        className="pt-nav py-16 md:py-20"
        style={{
          backgroundColor: "var(--muted)",
          borderBottom: "0.5px solid var(--border)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-12 items-stretch">
            <div>
              <h1
                className="type-page-title"
                style={{
                  color: "var(--heading-foreground)",
                  marginBottom: "0.4rem",
                }}
              >
                Listen to the Heart
              </h1>

              <p
                className="type-subtitle"
                style={{
                  color: "var(--heading-foreground)",
                  opacity: 0.9,
                  fontStyle: "italic",
                  marginBottom: "1.6rem",
                }}
              >
                Guan Yin Meditation Retreat
              </p>

              <div
                aria-hidden="true"
                style={{
                  width: "2.1rem",
                  height: "2px",
                  backgroundColor: "var(--color-accent)",
                  marginBottom: "1.6rem",
                }}
              />

              <p
                className="type-body"
                style={{
                  color: "var(--foreground)",
                  fontSize: "1.04rem",
                  lineHeight: 1.7,
                  marginBottom: "2.2rem",
                }}
              >
                A seven-day meditation retreat exploring the practice of deep listening, led by Rev.
                Heng Sure, Ven. Jin Chuan, Ven. Jin Wei, and other monastics (
                <a
                  href="https://www.redwoodvihara.org/community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-link"
                >
                  view teacher bios {"\u2192"}
                </a>
                ).
              </p>

              <div
                style={{
                  border: "1px solid var(--border)",
                  padding: "1.2rem 1.25rem",
                }}
              >
                <div className="grid grid-cols-[30px_1fr] gap-x-4 gap-y-5 items-start">
                  <div style={{ color: "var(--color-accent)" }}>
                    <CalendarIcon />
                  </div>

                  <div>
                    <p
                      className="type-body"
                      style={{
                        margin: 0,
                        color: "var(--heading-foreground)",
                        fontWeight: 600,
                      }}
                    >
                      24 {"\u2013"} 31 October 2026
                    </p>

                    <p
                      className="type-body"
                      style={{
                        margin: "0.15rem 0 0",
                        color: "var(--foreground)",
                        fontSize: "0.94rem",
                      }}
                    >
                      3:00pm arrival {"\u00b7"} 4:00pm departure
                    </p>
                  </div>

                  <div style={{ color: "var(--color-accent)" }}>
                    <PinIcon />
                  </div>

                  <div>
                    <p
                      className="type-body"
                      style={{
                        margin: 0,
                        color: "var(--heading-foreground)",
                        fontWeight: 600,
                      }}
                    >
                      Gold Coast Dharma Realm
                    </p>

                    <p
                      className="type-body"
                      style={{
                        margin: "0.15rem 0 0",
                        color: "var(--foreground)",
                        fontSize: "0.94rem",
                      }}
                    >
                      106 Bonogin Road, Bonogin QLD 4213
                    </p>
                  </div>

                  <div style={{ color: "var(--color-accent)" }}>
                    <MapIcon />
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Gold+Coast+Dharma+Realm+Bonogin+Road+Bonogin+QLD+4213"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="type-link"
                    style={{ alignSelf: "center", width: "fit-content" }}
                  >
                    Get Directions {"\u2192"}
                  </a>
                </div>
              </div>
            </div>

            <div className="relative h-[320px] md:h-auto md:min-h-0 overflow-hidden">
              <img
                src={guanYinRetreat.src}
                alt="Bronze Guan Yin statue among green foliage at Gold Coast Dharma Realm"
                className="w-full h-full md:absolute md:inset-0"
                style={{
                  objectFit: "cover",
                  objectPosition: "center 20%",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Reflection ───────────────────────────────────────── */}
      <div className="pt-16 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="type-subtitle text-center"
            style={{
              color: "var(--heading-foreground)",
              fontStyle: "italic",
              marginBottom: "2.25rem",
            }}
          >
            When was the last time we really listened?
          </p>

          <div className="type-body space-y-5" style={{ color: "var(--foreground)" }}>
            <p>
              Our lives are full of noise: messages, opinions, expectations, and the constant
              chatter of our own minds. But beneath all that noise, what might we hear?
            </p>

            <p>
              Together, we will slow down and explore the practice of deep listening: listening to
              our bodies, our hearts, the natural world, and the stillness within.
            </p>

            <p>
              Set in the grounds of Gold Coast Dharma Realm, this retreat will offer space to
              meditate, walk in nature, reflect together, and explore practical Buddhist teachings
              that can help us meet our lives with greater awareness and care.
            </p>

            <p>
              We will also learn from Guan Yin Bodhisattva, the embodiment of compassion and deep
              listening in the Buddhist tradition. Guan Yin listens deeply to the cries of the world
              and responds with wisdom and compassion. Through her practice, we will explore how we
              too can listen more deeply to ourselves, to one another, and to the world around us,
              and cultivate qualities of kindness, compassion, joy, and equanimity.
            </p>
          </div>

          {/* Listening stanza */}
          <div
            className="text-center"
            style={{
              margin: "3rem 0 0",
              padding: "2.25rem 0",
              borderTop: "0.5px solid var(--border)",
              borderBottom: "0.5px solid var(--border)",
            }}
          >
            {[
              "Listen to the body.",
              "Listen to the heart.",
              "Listen to nature.",
              "Listen within.",
            ].map((line) => (
              <p
                key={line}
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--color-dark-bg)",
                  fontSize: "1.35rem",
                  lineHeight: 1.9,
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* ── What the Retreat Includes ──────────────────────── */}
      <div className="pt-10 pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="type-subtitle mb-6">What the Retreat Includes</h2>

          <div className="type-body space-y-5" style={{ color: "var(--foreground)" }}>
            <p>
              A typical day centres on the practice of reciting the name of Guan Yin Bodhisattva,{" "}
              <em>Namo Guan Shr Yin Pu Sa</em>, together as a group. The recitation is used as a
              form of meditation, helping us to settle the mind and connect with the qualities of
              compassion embodied by Guan Yin. The day also includes talks on core Buddhist
              teachings, suitable both for those familiar with Buddhism and those with no prior
              background.
            </p>

            <p>
              Periods of sitting meditation are balanced with walking meditation, recitation, and
              time on the monastery grounds.
            </p>

            <p>No previous experience with Buddhism or meditation is needed.</p>
          </div>
        </div>
      </div>

      {/* ── Join This Retreat ───────────────────────────────── */}
      <div className="pt-10 pb-14 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="type-subtitle mb-6">Join This Retreat</h2>

          <div className="space-y-4">
            <p className="type-body" style={{ color: "var(--foreground)" }}>
              A contribution of $50 per night is requested to help cover accommodation and vegan
              meals during the retreat.
            </p>

            <p
              className="type-body"
              style={{
                color: "var(--medium-foreground)",
                fontStyle: "italic",
              }}
            >
              We are still finalising the full daily schedule and will share more details as the
              retreat gets closer.
            </p>
          </div>

          <div className="mt-8">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScQ4GCkbqsohMn7BIto4kHAyJikT6pB8r2rzX_HhSD2OgRvVw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="type-body inline-block"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--primary-foreground)",
                padding: "0.75rem 1.75rem",
                borderRadius: "var(--radius)",
                fontWeight: 500,
              }}
            >
              Register {"\u2192"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
