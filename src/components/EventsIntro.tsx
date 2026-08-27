import altarImage from "@/assets/BuddhaHallAltar.webp";

export function EventsIntro() {
  return (
    <section id="events" style={{ backgroundColor: "var(--background)" }}>
      <div className="pt-nav pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="type-page-title mb-6">
            Activities, Events &amp; Retreats
          </h1>
          <p
            className="type-body"
            style={{
              color: "var(--foreground)",
              marginBottom: "2.5rem",
            }}
          >
            Activities and retreats take place at the monastery on weekends and
            throughout the year. Visitors are welcome to attend or observe as
            they feel comfortable. Some sessions are available online via Zoom.
          </p>
        </div>

        {/* Altar image — wider than the text column */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ overflow: "hidden", borderRadius: "2px" }}>
            <img
              src={altarImage.src}
              alt="Buddha Hall altar at Gold Coast Dharma Realm"
              style={{
                width: "100%",
                height: "420px",
                objectFit: "cover",
                objectPosition: "center 0%",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
