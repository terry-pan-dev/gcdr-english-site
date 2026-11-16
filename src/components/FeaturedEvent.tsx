import { useEffect, useState } from "react";
import { formatDateRange, getToday } from "@/data/events";
import { getFeaturedEvent } from "@/data/featuredEvents";

// Dates come from src/data/events.ts. Do not type them in by hand. Keep this note in future files.
// Card content lives in src/data/featuredEvents.ts.

type FeaturedEventProps = {
  /**
   * Today's Brisbane date ("YYYY-MM-DD") as computed when the site was built.
   * Pass it from the Astro page so the first render matches the server HTML.
   * After the page loads, the card re-checks the date in the visitor's browser.
   */
  buildDate?: string;
};

export function FeaturedEvent({ buildDate }: FeaturedEventProps) {
  const [today, setToday] = useState<string>(buildDate ?? getToday());

  useEffect(() => {
    setToday(getToday());
  }, []);

  const featured = getFeaturedEvent(today);
  if (!featured) return null;

  const { content, event } = featured;
  const href = content.href ?? event.href ?? "/events";

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
          <a
            href={href}
            className="relative block"
            aria-label={`View ${content.title}`}
            style={{
              minHeight: "clamp(18rem, 40vw, 30rem)",
              overflow: "hidden",
            }}
          >
            <img
              src={content.image.src}
              alt={content.imageAlt}
              className={`absolute inset-0 w-full h-full object-cover ${
                content.imageClassName ?? "object-center"
              }`}
            />
          </a>

          <div
            className="flex flex-col justify-center px-6 py-8 sm:px-8 md:px-10 lg:px-12 md:py-10"
            style={{ color: "var(--foreground)" }}
          >
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
                {content.label}
              </p>

              <div
                style={{
                  width: "2.5rem",
                  height: 1,
                  backgroundColor: "var(--accent)",
                }}
              />
            </div>

            <h2
              className="type-page-title"
              style={{
                marginBottom:
                  content.chineseTitle || content.subtitle
                    ? "0.3rem"
                    : "1.25rem",
                lineHeight: 1.05,
              }}
            >
              {content.title}
            </h2>

            {content.chineseTitle && (
              <p
                lang="zh-Hant"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontStyle: "normal",
                  fontSize: "clamp(1.2rem, 2vw, 1.55rem)",
                  lineHeight: 1.25,
                  letterSpacing: "0.08em",
                  marginBottom: content.subtitle ? "0.3rem" : "1.25rem",
                  color: "var(--foreground)",
                }}
              >
                {content.chineseTitle}
              </p>
            )}

            {content.subtitle && (
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
                {content.subtitle}
              </p>
            )}

            <p
              className="type-body"
              style={{
                fontSize: "1rem",
                fontWeight: 500,
                marginBottom: "1.4rem",
              }}
            >
              {formatDateRange(event, { showYear: true })}
            </p>

            <div
              style={{
                borderTop:
                  "1px solid color-mix(in srgb, var(--foreground) 15%, transparent)",
                marginBottom: "1.3rem",
              }}
            />

            {content.tagline && (
              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontStyle: "italic",
                  fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)",
                  lineHeight: 1.4,
                  marginBottom: "1rem",
                }}
              >
                {content.tagline}
              </p>
            )}

            <p
              className="type-body"
              style={{
                fontSize: "1rem",
                lineHeight: 1.65,
                marginBottom: "1.25rem",
                maxWidth: "42rem",
              }}
            >
              {content.description}
            </p>

            {content.ledBy && (
              <>
                <div
                  style={{
                    borderTop:
                      "1px solid color-mix(in srgb, var(--foreground) 15%, transparent)",
                    marginBottom: "1.1rem",
                    maxWidth: "34rem",
                  }}
                />

                <p
                  className="type-body"
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.55,
                    marginBottom: "1.2rem",
                    maxWidth: "36rem",
                  }}
                >
                  Led by {content.ledBy}
                </p>
              </>
            )}

            <a
              href={href}
              className="type-link inline-block font-medium"
              style={{ marginTop: "0.25rem" }}
            >
              {content.linkText ?? "View event"} {"\u2192"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
