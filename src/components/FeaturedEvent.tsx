import guanYinImage from "@/assets/GuanYinRetreat.webp";

type FeaturedEventProps = {
  href?: string;
};

export function FeaturedEvent({
  href = "/events/Guan-Yin-English-2026",
}: FeaturedEventProps) {
  return (
    <section style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div
          className="grid md:grid-cols-[0.85fr_1.15fr]"
          style={{
            overflow: "hidden",
            borderRadius: "0.4rem",
            backgroundColor: "var(--surface, var(--background))",
            border:
              "1px solid color-mix(in srgb, var(--foreground) 10%, transparent)",
          }}
        >
          {/* ── Image ───────────────────────────────────────── */}
          <a
            href={href}
            className="relative block"
            aria-label="View Listen to the Heart — Guan Yin Meditation Retreat"
            style={{
              minHeight: "clamp(18rem, 40vw, 30rem)",
              overflow: "hidden",
            }}
          >
            <img
              src={guanYinImage.src}
              alt="Guan Yin Bodhisattva at Gold Coast Dharma Realm"
              className="absolute inset-0 w-full h-full object-cover object-[center_20%] md:object-[center_30%]"
            />
          </a>

          {/* ── Content ─────────────────────────────────────── */}
          <div
            className="flex flex-col justify-center px-6 py-8 sm:px-8 md:px-10 lg:px-12 md:py-10"
            style={{ color: "var(--foreground)" }}
          >
            {/* Eyebrow */}
            <div style={{ marginBottom: "1.4rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "0.6rem",
                }}
              >
                Featured Retreat
              </p>

              <div
                style={{
                  width: "2.5rem",
                  height: 1,
                  backgroundColor: "var(--accent)",
                }}
              />
            </div>

            {/* Title */}
            <h2
              className="type-page-title"
              style={{
                marginBottom: "0.3rem",
                lineHeight: 1.05,
              }}
            >
              Listen to the Heart
            </h2>

            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                fontSize: "clamp(1.2rem, 2vw, 1.55rem)",
                lineHeight: 1.25,
                marginBottom: "1.25rem",
                color: "var(--foreground)",
              }}
            >
              Guan Yin Meditation Retreat
            </p>

            {/* Date */}
            <p
              className="type-body"
              style={{
                fontSize: "1rem",
                fontWeight: 500,
                marginBottom: "1.4rem",
              }}
            >
              24–31 October 2026
            </p>

            <div
              style={{
                borderTop:
                  "1px solid color-mix(in srgb, var(--foreground) 15%, transparent)",
                marginBottom: "1.3rem",
              }}
            />

            {/* Pull quote */}
            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)",
                lineHeight: 1.4,
                marginBottom: "1rem",
              }}
            >
              When was the last time we really listened?
            </p>

            {/* Description */}
            <p
              className="type-body"
              style={{
                fontSize: "1rem",
                lineHeight: 1.65,
                marginBottom: "1.25rem",
                maxWidth: "42rem",
              }}
            >
              Slow down and explore the practice of deep listening. Listen to
              the body, the heart, the natural world, and the stillness within.
              A week of meditation, reflection, nature and Buddhist teachings at
              Gold Coast Dharma Realm.
            </p>

            <div
              style={{
                borderTop:
                  "1px solid color-mix(in srgb, var(--foreground) 15%, transparent)",
                marginBottom: "1.1rem",
                maxWidth: "34rem",
              }}
            />

            {/* Teachers */}
            <p
              className="type-body"
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.55,
                marginBottom: "1.2rem",
                maxWidth: "36rem",
              }}
            >
              Led by Rev. Heng Sure, Ven. Jin Chuan, Ven. Jin Wei &amp; other
              monastics
            </p>

            {/* CTA */}
            <a
              href={href}
              className="type-link inline-block font-medium"
              style={{ marginTop: "0.25rem" }}
            >
              View retreat {"\u2192"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
