import guanYinRetreat from "@/assets/GuanYinRetreat.webp";

/* ─────────────────────────────────────────────────────────────
   Icons — reused from Yoga.tsx for consistency. Worth extracting
   to a shared icons file if a third event page needs these.
───────────────────────────────────────────────────────────── */

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="25"
      height="25"
      fill="none"
      aria-hidden="true"
    >
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
    <svg
      viewBox="0 0 24 24"
      width="27"
      height="27"
      fill="none"
      aria-hidden="true"
    >
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
    <svg
      viewBox="0 0 24 24"
      width="27"
      height="27"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m3 6 5-2 8 3 5-2v13l-5 2-8-3-5 2V6Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
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
                A seven-day meditation retreat exploring the practice of deep
                listening, led by Rev. Heng Sure, Ven. Jin Chuan, Ven. Jin Wei,
                and other monastics (
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
                      Arrival 3:00{"\u2013"}4:30pm {"\u00b7"} Retreat concludes
                      at 4:00pm on the 31st
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
                  objectPosition: "center 30%",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Introduction ─────────────────────────────────────── */}
      <div className="pt-16 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="type-subtitle text-center"
            style={{
              color: "var(--heading-foreground)",
              fontStyle: "italic",
              marginBottom: "2.25rem",
            }}
          >
            When was the last time we really listened?
          </h2>

          <div
            className="type-body space-y-5"
            style={{ color: "var(--foreground)" }}
          >
            <p>
              Our days can become crowded with noise, activity, conversation,
              and the constant movement of our own thoughts. This retreat offers
              a week to step away from that usual pace and give our attention to
              something quieter.
            </p>

            <p>
              At the heart of the retreat is the recitation of Guan Yin
              Bodhisattva&apos;s name. Guan Yin is often understood as “one who
              listens to the sounds of the world.” Through recitation and
              meditation, we will explore listening not only as something we do
              with our ears, but as a way of becoming more attentive to
              ourselves, to others, and to the world around us.
            </p>

            <p>
              The week will unfold within the daily rhythm of Gold Coast Dharma
              Realm, with periods of meditation, recitation, Dharma teachings,
              vegan meals, community service, and time in the monastery&apos;s
              natural surroundings. Several days will also be observed in noble
              silence, allowing more space for reflection and sustained
              practice.
            </p>

            <p>
              Whether you are familiar with Buddhist practice or encountering it
              for the first time, the retreat offers an opportunity to slow
              down, listen more carefully, and spend a week immersed in the life
              and practice of a Buddhist monastery.
            </p>
          </div>
        </div>
      </div>

      {/* ── A Week to Step Out of the Usual Rhythm ─────────── */}
      <div className="pt-10 pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="type-section-title"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              marginBottom: "1.25rem",
            }}
          >
            A Week to Step Out of the Usual Rhythm
          </h2>

          <div
            className="type-body space-y-5"
            style={{ color: "var(--foreground)" }}
          >
            <p>
              A residential retreat is different from attending a class or a
              single day of meditation. For one week, the ordinary routines of
              daily life are replaced by a simpler rhythm of practice, meals,
              work, rest, and silence.
            </p>

            <p>
              Participants may be completely new to meditation, longtime
              Buddhist practitioners, or simply interested in spending a week
              exploring contemplative practice in a monastic setting.
            </p>

            <p>
              The emphasis is not on reaching a particular outcome, but on
              creating the space to become quieter, more attentive, and more
              present.
            </p>
          </div>
        </div>
      </div>

      {/* ── What the Retreat Includes ───────────────────────── */}
      <div
        className="pt-10 pb-14 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="type-section-title"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              marginBottom: "1.25rem",
            }}
          >
            Full Retreat Details
          </h2>

          <div
            className="type-body space-y-5"
            style={{ color: "var(--foreground)" }}
          >
            <p>
              We are very fortunate to welcome Redwood Vihara&apos;s monastics
              back to Gold Coast Dharma Realm this October to lead the retreat
              for the second year. Their retreat page includes the full daily
              schedule, guidelines, and practical information for participants.
            </p>
          </div>

          <div className="mt-8">
            <a
              href="https://redwoodvihara.org/events/gcdr-guanyin/"
              target="_blank"
              rel="noopener noreferrer"
              className="type-body inline-block"
              style={{
                border: "1px solid var(--color-accent)",
                color: "var(--color-accent)",
                padding: "0.75rem 1.5rem",
                borderRadius: "var(--radius)",
                fontWeight: 500,
              }}
            >
              View Full Retreat Details {"\u2192"}
            </a>
          </div>
        </div>
      </div>

      {/* ── Join This Retreat ───────────────────────────────── */}
      <div
        className="pt-10 pb-14 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="type-section-title"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              marginBottom: "1.25rem",
            }}
          >
            Join This Retreat
          </h2>

          <div
            className="type-body space-y-5"
            style={{ color: "var(--foreground)" }}
          >
            <p>
              The retreat runs from{" "}
              <strong>Saturday 24 October to Saturday 31 October 2026</strong>.
            </p>

            <p>
              For those staying at the monastery overnight, a contribution of{" "}
              <strong>$50 per night</strong> is requested to help cover
              accommodation and vegan meals.
            </p>

            <p>Daytime participation in Dharma activities is freely offered.</p>
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
              Register for the Retreat {"\u2192"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
