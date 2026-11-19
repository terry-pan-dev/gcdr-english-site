import amitabhaBuddha from "@/assets/Amituofo.webp";
import { getEvent, formatDateRange, formatLongDateRange } from "@/data/events";

// Dates come from src/data/events.ts. Do not type them in by hand. Keep this note in future files.
const event = getEvent("amitabha-retreat-2026");

// Daily times are the same every day of the retreat, so they live here rather than in events.ts.
const schedule = [
  {
    time: "8:00 to 10:00 am",
    en: "Pure Land Praise, Amitabha Sutra, Bowing to the 48 Vows, Amitabha Great Praise, Amitabha Praise, and Reciting Buddha’s Name",
  },
  {
    time: "1:30 to 3:30 pm",
    en: "Pure Land Praise, Amitabha Sutra, Amitabha Praise, Reciting Buddha’s Name, and Rebirth Dedication of Merit",
  },
  {
    time: "7:00 to 8:00 pm",
    en: "Dharma talk",
  },
  {
    time: "8:00 to 8:30 pm",
    en: "Great Dedication of Merit",
  },
];

const REGISTRATION_HREF =
  "https://docs.google.com/forms/d/e/1FAIpQLSdrHSiZ6_yg5DUcLdeaQp3FeyeP15Iw0OqtQyyUm0IT6aS2xQ/viewform";
const ZOOM_HREF = "https://drba-org.zoom.us/j/127598942";
const PLAQUE_EMAIL = "gcdrpaiwei@gmail.com";

// Paste the YouTube video ID of Heng Yang Shi's talk from last year's retreat
// (the part after v= in the URL). While this is empty, the video section is not shown.
const TALK_VIDEO_ID = "";

type AmitabhaBuddhaRecitation2026Props = {
  registrationHref?: string;
};

const headingStyle = {
  color: "var(--heading-foreground)",
  fontSize: "clamp(1.5rem, 3vw, 2rem)",
  marginBottom: "1.25rem",
};

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

function AttendanceButtons({
  registrationHref,
}: AmitabhaBuddhaRecitation2026Props) {
  return (
    <>
      <a
        href={registrationHref || REGISTRATION_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="type-body inline-block"
        style={{
          backgroundColor: "var(--color-accent)",
          color: "var(--primary-foreground)",
          padding: "0.7rem 1rem",
          borderRadius: "var(--radius)",
          fontWeight: 500,
        }}
      >
        Register to Attend in Person {"\u2192"}
      </a>

      <a
        href={ZOOM_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="type-body inline-block"
        style={{
          border: "1px solid var(--color-accent)",
          color: "var(--heading-foreground)",
          padding: "0.7rem 1rem",
          borderRadius: "var(--radius)",
          fontWeight: 500,
        }}
      >
        Join on Zoom {"\u2192"}
      </a>
    </>
  );
}

export function AmitabhaBuddhaRecitation2026({
  registrationHref,
}: AmitabhaBuddhaRecitation2026Props) {
  return (
    <section style={{ backgroundColor: "var(--background)" }}>
      {/* Hero */}
      <div
        className="pt-nav py-12 md:py-16"
        style={{
          backgroundColor: "var(--muted)",
          borderBottom: "0.5px solid var(--border)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-x-10 md:gap-x-12 gap-y-6 items-start">
            <div>
              <h1
                className="type-page-title"
                style={{
                  color: "var(--heading-foreground)",
                  marginBottom: "0.6rem",
                  fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)",
                  lineHeight: 1.12,
                }}
              >
                <span style={{ display: "block" }}>Amitabha Buddha</span>{" "}
                <span style={{ display: "block", fontSize: "0.85em" }}>
                  Recitation Retreat
                </span>
              </h1>

              <p
                className="type-subtitle"
                style={{
                  color: "var(--heading-foreground)",
                  opacity: 0.9,
                  marginBottom: "1.25rem",
                }}
              >
                <span lang="zh-Hant">彌陀七法會</span>
              </p>

              <div
                aria-hidden="true"
                style={{
                  width: "2.1rem",
                  height: "2px",
                  backgroundColor: "var(--color-accent)",
                  marginBottom: "1.25rem",
                }}
              />

              <p
                className="type-body"
                style={{
                  color: "var(--foreground)",
                  fontSize: "1.04rem",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                }}
              >
                Join Dharma Master Heng Yang and the monastic community for
                seven days devoted to reciting the Amitabha Sutra and Amitabha
                Buddha&apos;s name, Na Mo Amituofo (南無阿彌陀佛).
                <span
                  style={{
                    display: "block",
                    marginTop: "0.75rem",
                    fontSize: "0.94rem",
                  }}
                >
                  Chanting in Chinese, with English translation for Dharma
                  talks.
                </span>
              </p>

              <div
                style={{
                  border: "1px solid var(--border)",
                  padding: "1rem",
                }}
              >
                <div className="grid grid-cols-[26px_1fr] gap-x-3 gap-y-4 items-start">
                  <div style={{ color: "var(--color-icon-accent)" }}>
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
                      {formatDateRange(event, { showYear: true })}
                    </p>

                    <p
                      className="type-body"
                      style={{
                        margin: "0.15rem 0 0",
                        color: "var(--foreground)",
                        fontSize: "0.94rem",
                      }}
                    >
                      Seven-day Amitabha Buddha recitation retreat
                    </p>
                  </div>

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

            <div className="md:relative md:self-stretch overflow-hidden rounded-sm">
              <img
                src={amitabhaBuddha.src}
                alt="Amitabha Buddha statue at Gold Coast Dharma Realm"
                className="w-full h-auto block md:absolute md:inset-0 md:h-full md:object-cover"
                style={{ objectPosition: "center" }}
              />
            </div>

            <div className="flex flex-wrap gap-3 md:col-start-1">
              <AttendanceButtons registrationHref={registrationHref} />
            </div>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div
        className="pt-10 pb-14 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="type-section-title" style={headingStyle}>
            Amitabha Buddha and the Pure Land
          </h2>

          <div
            className="type-body space-y-5"
            style={{ color: "var(--foreground)" }}
          >
            <p>
              Amitabha Buddha is the Buddha of the Western Pure Land (Sukhāvatī
              極樂世界), the Land of Ultimate Bliss.
            </p>

            <p>
              Amitabha Buddha is also known by the Sanskrit names Amitābha,
              meaning “Infinite Light” (<span lang="zh-Hant">無量光</span>), and
              Amitāyus, meaning “Infinite Life” (
              <span lang="zh-Hant">無量壽</span>). These names express the
              Buddha&apos;s immeasurable wisdom and infinite lifespan. In
              Chinese, his name is rendered as Amituofo (
              <span lang="zh-Hant">阿彌陀佛</span>).
            </p>

            <p>
              The Pure Land Path is a Buddhist practice grounded in Amitabha
              Buddha&apos;s great vows of compassion. Practitioners recite his
              name with faith and sincerity, cultivating the aspiration for
              rebirth in the Pure Land, where they can progress towards
              enlightenment.
            </p>
          </div>

          <details
            className="mt-6"
            style={{
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <summary
              className="type-body py-4 cursor-pointer"
              style={{
                color: "var(--heading-foreground)",
                fontWeight: 500,
              }}
            >
              More about Amitabha Buddha and the Pure Land
            </summary>

            <div
              className="type-body space-y-5 pb-5"
              style={{ color: "var(--foreground)" }}
            >
              <p>
                Unlike our present world, known in Buddhism as the Saha World (
                <span lang="zh-Hant">娑婆世界</span>), where suffering,
                afflictions and worldly distractions present constant obstacles
                to spiritual cultivation, the Western Pure Land is free from
                such adverse conditions. There, beings can hear the Dharma
                continually, receive the guidance of Amitabha Buddha and the
                bodhisattvas, and progress towards enlightenment without the
                obstacles that so often hinder cultivation in our world.
              </p>

              <p>
                Saha is often translated as the “World of Endurance”, reflecting
                the suffering that sentient beings experience and endure in this
                world.
              </p>

              <p>
                Rebirth in the Pure Land is not an end in itself, nor is it
                simply the attainment of a blissful existence. The ultimate
                aspiration is to attain Buddhahood and, through wisdom and
                compassion, benefit and liberate all sentient beings.
              </p>

              <p>
                In Chinese Buddhist communities, people often say “Amituofo”
                when greeting one another, expressing gratitude, offering
                blessings, or wishing others peace and well-being. Beyond a
                simple greeting, it is also a reminder of Amitabha Buddha and an
                expression of mindfulness, compassion, and reverence.
              </p>

              <div
                style={{
                  borderLeft: "2px solid var(--color-accent)",
                  paddingLeft: "1.1rem",
                }}
              >
                <p style={{ margin: 0 }}>
                  <em>Pronunciation</em>
                </p>

                <p style={{ margin: "0.5rem 0 0" }}>
                  Approximate pronunciation: Ah-mee-tuu-oh-foh
                </p>

                <p style={{ margin: "0.35rem 0 0" }}>
                  Mandarin pinyin: Āmítuófó
                </p>
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* About the Retreat */}
      <div
        className="pt-10 pb-14 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="type-section-title" style={headingStyle}>
            About the Retreat
          </h2>

          <div
            className="type-body space-y-5"
            style={{ color: "var(--foreground)" }}
          >
            <p>
              The retreat offers seven days to make Buddha recitation the focus
              of your day, practising alongside the monastic community. Each day
              includes morning and afternoon recitation, an evening Dharma talk,
              and the Great Dedication of Merit.
            </p>

            <p>
              Chanting is in Chinese. Chanting books include Chinese text and
              romanised pinyin to help participants follow along. English
              translation is available for the Dharma talks.
            </p>
          </div>
        </div>
      </div>

      {/* Daily Schedule */}
      <div className="pt-10 pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="type-section-title" style={headingStyle}>
            Daily Schedule
          </h2>

          <ul
            className="list-none p-0 m-0"
            style={{ borderBottom: "0.5px solid var(--border)" }}
          >
            {schedule.map((item) => (
              <li
                key={item.time}
                className="grid grid-cols-1 sm:grid-cols-[11rem_1fr] gap-x-6 gap-y-1 py-4"
                style={{ borderTop: "0.5px solid var(--border)" }}
              >
                <p
                  className="type-body"
                  style={{
                    margin: 0,
                    color: "var(--heading-foreground)",
                    fontWeight: 600,
                  }}
                >
                  {item.time}
                </p>

                <p
                  className="type-body"
                  style={{ margin: 0, color: "var(--foreground)" }}
                >
                  {item.en}
                </p>
              </li>
            ))}
          </ul>

          <p
            className="type-body"
            style={{
              color: "var(--foreground)",
              marginTop: "1.25rem",
            }}
          >
            Plaques may be requested for the dedication of merit during the
            retreat. Please email{" "}
            <a href={`mailto:${PLAQUE_EMAIL}`} className="type-link">
              {PLAQUE_EMAIL}
            </a>{" "}
            for details.
          </p>
        </div>
      </div>

      {/* Talk video (only shown once TALK_VIDEO_ID is set) */}
      {TALK_VIDEO_ID && (
        <div
          className="pt-10 pb-14 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="type-section-title" style={headingStyle}>
              A Talk from Last Year&apos;s Retreat
            </h2>

            <p
              className="type-body"
              style={{
                color: "var(--foreground)",
                marginBottom: "1.5rem",
              }}
            >
              A Dharma talk by Dharma Master Heng Yang, given in Chinese.
            </p>

            <div
              className="aspect-video w-full overflow-hidden rounded-sm"
              style={{ border: "1px solid var(--border)" }}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${TALK_VIDEO_ID}`}
                title="Dharma talk by Dharma Master Heng Yang, from last year's retreat"
                className="w-full h-full"
                loading="lazy"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Participation */}
      <div
        className="pt-10 pb-14 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="type-section-title" style={headingStyle}>
            Join the Retreat
          </h2>

          <p className="type-body" style={{ color: "var(--foreground)" }}>
            The retreat runs from <strong>{formatLongDateRange(event)}</strong>.
            You are welcome to join for the full week or individual sessions, in
            person or online.
          </p>

          <h3
            className="type-subtitle"
            style={{
              color: "var(--heading-foreground)",
              marginTop: "1.75rem",
              marginBottom: "1rem",
            }}
          >
            Accommodation and Meals
          </h3>

          <div
            className="type-body space-y-5"
            style={{ color: "var(--foreground)" }}
          >
            <p>
              The Dharma teachings are offered freely to everyone. The monastery
              is grateful for the generosity of all those who help sustain its
              activities.
            </p>

            <p>
              <strong style={{ color: "var(--heading-foreground)" }}>
                Residential participants:
              </strong>{" "}
              Accommodation and all meals are provided for a contribution of{" "}
              <strong>$50 per night</strong>, payable in full upon arrival by
              cash or bank transfer. If paying in cash, please bring the exact
              amount. Bank transfer details will be provided at check-in.
            </p>

            <p>
              <strong style={{ color: "var(--heading-foreground)" }}>
                Day participants:
              </strong>{" "}
              You are welcome to attend during the day. Please register in
              advance so we can prepare sufficient meals for everyone.
            </p>

            <p>
              If your plans change, kindly let us know at least one day in
              advance so that the kitchen can adjust meal preparations
              accordingly.
            </p>
          </div>

          <h3
            className="type-subtitle"
            style={{
              color: "var(--heading-foreground)",
              marginTop: "1.75rem",
              marginBottom: "1rem",
            }}
          >
            Joining Online
          </h3>

          <p className="type-body" style={{ color: "var(--foreground)" }}>
            The full retreat will be live streamed on Zoom. You are welcome to
            join any session online (Meeting ID 127598942).
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <AttendanceButtons registrationHref={registrationHref} />
          </div>
        </div>
      </div>
    </section>
  );
}
