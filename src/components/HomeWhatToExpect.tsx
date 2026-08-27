export function HomeWhatToExpect() {
  return (
    <section
      className="border-t"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--background)" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="type-section-title mb-8" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
          What to Expect
        </h2>

        <div
          className="type-body"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.4rem",
            color: "var(--foreground)",
          }}
        >
          <p>
            During visiting hours, you may see people walking the trail or exploring the gardens,
            volunteers caring for the grounds, and monastics going about their daily activities. You
            may also see ceremonies taking place in the Buddha Hall or Dharma talks being led as
            part of the monastery's regular schedule.
          </p>
          <p>
            Visitors are welcome to join the ceremonies and Dharma talks, or simply sit and watch.
            Many people spend time exploring the monastery and its surroundings.
          </p>
        </div>
      </div>
    </section>
  );
}
