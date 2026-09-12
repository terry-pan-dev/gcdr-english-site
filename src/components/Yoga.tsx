import buddhaLotusPond from "@/assets/BuddhaLotusPond.webp";
import blessingsHouse from "@/assets/BlessingsHouse.webp";

/* ─────────────────────────────────────────────────────────────
   Hero icons
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

/* ─────────────────────────────────────────────────────────────
   Custom SVG icons

   Uses the SVG as a mask so all icons inherit currentColor.
───────────────────────────────────────────────────────────── */

function CustomIcon({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "block",
        width,
        height,
        backgroundColor: "currentColor",

        WebkitMaskImage: `url("${src}")`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        WebkitMaskSize: "contain",

        maskImage: `url("${src}")`,
        maskRepeat: "no-repeat",
        maskPosition: "center",
        maskSize: "contain",
      }}
    />
  );
}

function YogaIcon() {
  return <CustomIcon src="/icons/IconYoga.svg" width={66} height={66} />;
}

function LotusIcon() {
  return <CustomIcon src="/icons/IconLotus.svg" width={72} height={72} />;
}

function MeditationIcon() {
  return <CustomIcon src="/icons/IconMeditation.svg" width={66} height={66} />;
}

function ShirtIcon() {
  return <CustomIcon src="/icons/IconShirt.svg" width={44} height={44} />;
}

function MatIcon() {
  return <CustomIcon src="/icons/IconMat.svg" width={44} height={44} />;
}

function ClockIcon() {
  return <CustomIcon src="/icons/IconClock.svg" width={44} height={44} />;
}

function MeetPinIcon() {
  return <CustomIcon src="/icons/IconPin.svg" width={44} height={44} />;
}

function CalendarClassesIcon() {
  return <CustomIcon src="/icons/IconCallendar.svg" width={28} height={28} />;
}

function InfoIcon({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="shrink-0 flex items-center justify-center rounded-full"
      style={{
        width: 64,
        height: 64,
        color: "var(--color-icon-primary)",
        backgroundColor:
          "color-mix(in srgb, var(--color-icon-primary) 5%, var(--muted) 95%)",
      }}
    >
      {children}
    </div>
  );
}

export function Yoga() {
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
                  marginBottom: "1.6rem",
                }}
              >
                Sunday Yoga &amp; Meditation
              </h1>

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
                Every Sunday morning the monastery offers a two-hour session of
                yoga, Dharma talk, and meditation, freely offered by the
                monastery and open to everyone. No experience with yoga or
                meditation is needed.
              </p>

              <div
                style={{
                  border: "1px solid var(--border)",
                  padding: "1.2rem 1.25rem",
                }}
              >
                <div className="grid grid-cols-[30px_1fr] gap-x-4 gap-y-5 items-start">
                  <div style={{ color: "var(--color-icon-accent)" }}>
                    <CalendarIcon />
                  </div>

                  <p
                    className="type-body"
                    style={{
                      margin: 0,
                      color: "var(--foreground)",
                    }}
                  >
                    Every Sunday · 8:00 – 10:00 AM
                  </p>

                  <div style={{ color: "var(--color-icon-accent)" }}>
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
                      Blessings House, Gold Coast Dharma Realm
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

                  <div style={{ color: "var(--color-icon-accent)" }}>
                    <MapIcon />
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Gold+Coast+Dharma+Realm+Bonogin+Road+Bonogin+QLD+4213"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="type-link"
                    style={{
                      alignSelf: "center",
                      width: "fit-content",
                    }}
                  >
                    Get Directions {"\u2192"}
                  </a>
                </div>
              </div>
            </div>

            <div className="min-h-0">
              <img
                src={buddhaLotusPond.src}
                alt="Buddha statue by the lotus pond at Gold Coast Dharma Realm"
                className="w-full h-auto md:h-full"
                style={{
                  objectFit: "cover",
                  objectPosition: "60% center",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Session flow ─────────────────────────────────────── */}
      <div className="pt-14 md:pt-16 pb-12 md:pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="text-center px-5 md:px-7 py-4">
              <div
                className="flex justify-center mb-3"
                style={{ color: "var(--color-icon-primary)" }}
              >
                <YogaIcon />
              </div>

              <h2
                className="type-subtitle"
                style={{
                  color: "var(--heading-foreground)",
                  fontSize: "clamp(1.55rem, 3vw, 2rem)",
                  marginBottom: "0.75rem",
                }}
              >
                Yoga
              </h2>

              <p
                className="type-body"
                style={{
                  color: "var(--foreground)",
                  margin: 0,
                }}
              >
                The session opens with yoga, led by a volunteer yoga instructor.
                No experience or flexibility needed.
              </p>
            </div>

            <div
              className="text-center px-5 md:px-7 py-4 md:border-x"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="flex justify-center mb-3"
                style={{ color: "var(--color-icon-primary)" }}
              >
                <LotusIcon />
              </div>

              <h2
                className="type-subtitle"
                style={{
                  color: "var(--heading-foreground)",
                  fontSize: "clamp(1.55rem, 3vw, 2rem)",
                  marginBottom: "0.75rem",
                }}
              >
                Dharma Talk
              </h2>

              <p
                className="type-body"
                style={{
                  color: "var(--foreground)",
                  margin: 0,
                }}
              >
                One of the resident monastics gives a short, informal talk on
                the Buddhist teachings, questions are welcome.
              </p>
            </div>

            <div className="text-center px-5 md:px-7 py-4">
              <div
                className="flex justify-center mb-3"
                style={{ color: "var(--color-icon-primary)" }}
              >
                <MeditationIcon />
              </div>

              <h2
                className="type-subtitle"
                style={{
                  color: "var(--heading-foreground)",
                  fontSize: "clamp(1.55rem, 3vw, 2rem)",
                  marginBottom: "0.75rem",
                }}
              >
                Meditation
              </h2>

              <p
                className="type-body"
                style={{
                  color: "var(--foreground)",
                  margin: 0,
                }}
              >
                The session closes with seated meditation. Cushions, mats,
                chairs, and blankets are available.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Additional Yoga Classes ──────────────────────────── */}
      <div className="pb-14 md:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            style={
              {
                // borderTop: "1px solid var(--border)",
                // paddingTop: "0.75rem",
              }
            }
          >
            <div
              className="flex items-center gap-5"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--muted) 72%, var(--background) 28%)",
                padding: "1.4rem 1.5rem",
              }}
            >
              <div
                className="shrink-0 flex items-center justify-center rounded-full"
                style={{
                  width: 56,
                  height: 56,
                  color: "var(--color-icon-primary)",
                  backgroundColor:
                    "color-mix(in srgb, var(--color-icon-primary) 5%, var(--muted) 95%)",
                }}
              >
                <CalendarClassesIcon />
              </div>

              <div
                aria-hidden="true"
                className="hidden sm:block self-stretch"
                style={{
                  width: "1px",
                  backgroundColor: "var(--border)",
                }}
              />

              <div>
                <h2
                  className="type-subtitle"
                  style={{
                    color: "var(--heading-foreground)",
                    fontSize: "1.3rem",
                    marginBottom: "0.3rem",
                  }}
                >
                  Additional Yoga Classes
                </h2>

                <p
                  className="type-body"
                  style={{
                    color: "var(--foreground)",
                    margin: 0,
                  }}
                >
                  Yoga classes are also offered on Saturdays and most weekday
                  mornings, with times varying from week to week. Current class
                  times are shared with participants through the yoga group.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Good to Know ─────────────────────────────────────── */}
      <div
        className="py-14 md:py-16 border-t"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--muted)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="type-section-title"
            style={{
              color: "var(--heading-foreground)",
              fontSize: "clamp(2rem, 4vw, 2.55rem)",
              marginBottom: "0.9rem",
            }}
          >
            Good to Know
          </h2>

          <div
            aria-hidden="true"
            style={{
              width: "2.1rem",
              height: "2px",
              backgroundColor: "var(--color-accent)",
              marginBottom: "2rem",
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14">
            {/* What to wear */}
            <div
              className="flex gap-5 py-5 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <InfoIcon>
                <ShirtIcon />
              </InfoIcon>

              <div>
                <h3
                  className="type-subtitle"
                  style={{
                    color: "var(--heading-foreground)",
                    fontSize: "1.08rem",
                    marginBottom: "0.35rem",
                  }}
                >
                  What to wear
                </h3>

                <p
                  className="type-body"
                  style={{
                    color: "var(--foreground)",
                    margin: 0,
                  }}
                >
                  As the session is held at the monastery, modest clothing is
                  encouraged, shoulders and knees covered where possible.
                  Loose-fitting clothing works well for both yoga and seated
                  meditation.
                </p>

                <p
                  className="type-body"
                  style={{
                    color: "var(--foreground)",
                    margin: "0.65rem 0 0",
                  }}
                >
                  If you arrive dressed differently, you are still welcome; we
                  simply ask that you keep this in mind for future visits.
                </p>
              </div>
            </div>

            {/* Where to meet */}
            <div
              className="yoga-meet-grid py-5 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <div style={{ gridArea: "icon" }}>
                <InfoIcon>
                  <MeetPinIcon />
                </InfoIcon>
              </div>

              <h3
                className="type-subtitle"
                style={{
                  gridArea: "heading",
                  color: "var(--heading-foreground)",
                  fontSize: "1.08rem",
                }}
              >
                Where to meet
              </h3>

              <p
                className="type-body"
                style={{
                  gridArea: "text",
                  color: "var(--foreground)",
                  margin: 0,
                }}
              >
                The session is held in the Blessings House.
              </p>

              <div
                className="md:overflow-hidden md:max-h-[190px]"
                style={{ gridArea: "image", borderRadius: "2px" }}
              >
                <img
                  src={blessingsHouse.src}
                  alt="Entrance to Blessings House at Gold Coast Dharma Realm"
                  className="w-full block md:h-auto md:rounded-sm"
                />
              </div>
            </div>

            {/* What to bring */}
            <div
              className="flex gap-5 py-5 border-b md:border-b-0"
              style={{ borderColor: "var(--border)" }}
            >
              <InfoIcon>
                <MatIcon />
              </InfoIcon>

              <div>
                <h3
                  className="type-subtitle"
                  style={{
                    color: "var(--heading-foreground)",
                    fontSize: "1.08rem",
                    marginBottom: "0.35rem",
                  }}
                >
                  What to bring
                </h3>

                <p
                  className="type-body"
                  style={{
                    color: "var(--foreground)",
                    margin: 0,
                  }}
                >
                  If you have a yoga mat, please bring it along, it helps us
                  make sure there are enough for everyone who needs one.
                </p>
              </div>
            </div>

            {/* When to arrive */}
            <div
              className="flex gap-5 py-5 md:border-b-0"
              style={{ borderColor: "var(--border)" }}
            >
              <InfoIcon>
                <ClockIcon />
              </InfoIcon>

              <div>
                <h3
                  className="type-subtitle"
                  style={{
                    color: "var(--heading-foreground)",
                    fontSize: "1.08rem",
                    marginBottom: "0.35rem",
                  }}
                >
                  When to arrive
                </h3>

                <p
                  className="type-body"
                  style={{
                    color: "var(--foreground)",
                    margin: 0,
                  }}
                >
                  Please arrive before 8:00 AM.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
