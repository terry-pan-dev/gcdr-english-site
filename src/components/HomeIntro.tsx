//import templeDuskImage from "@/assets/BuddhaHallDusk.webp";
import templeDayImage from "@/assets/BuddhaHallExteriorDay.webp";

export function HomeIntro() {
  return (
    <section style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-nav pb-8 text-center">
        <h1 className="type-page-title" style={{ marginBottom: "0.75rem" }}>
          Gold Coast Dharma Realm
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontSize: "1.25rem",
            color: "var(--foreground)",
          }}
        >
          A Mahayana Buddhist monastery in the Gold Coast hinterland
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div style={{ overflow: "hidden", borderRadius: 2 }}>
          <img
            src={templeDayImage.src}
            alt="Buddha Hall at Gold Coast Dharma Realm]"
            style={{ width: "100%", display: "block" }}
          />
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div
          className="type-body"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            color: "var(--foreground)",
            fontSize: "1.0625rem",
          }}
        >
          <p>
            Gold Coast Dharma Realm is a Mahayana Buddhist monastery in Bonogin,
            home to resident monastics who practise the teachings in full.
          </p>
          <p>
            Dharma talks, ceremonies, and retreats are held throughout the year
            and open to all. Visitors are welcome to attend, observe, or walk
            the grounds.
          </p>
        </div>
      </div>
    </section>
  );
}
