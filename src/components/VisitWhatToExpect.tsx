import buddhaHall from "@/assets/BuddhaHallLights.webp";
import lotusPond from "@/assets/LotusPond.webp";

export function VisitWhatToExpect() {
  return (
    <div className="py-16 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div
          className="sm:hidden"
          style={{
            width: 28,
            height: 2,
            backgroundColor: "var(--accent)",
            marginBottom: "1.75rem",
          }}
        />
        <h2 className="type-section-title" style={{ marginBottom: "3.5rem" }}>
          What to Expect
        </h2>

        {/* The Grounds — text left, image right */}
        <div
          className="flex flex-col gap-6 sm:flex-row sm:gap-8"
          style={{ alignItems: "flex-start", marginBottom: "2.5rem" }}
        >
          <div style={{ flex: 1 }}>
            <h3 className="type-subtitle mb-4" style={{ marginTop: 0 }}>
              The Grounds
            </h3>
            <p
              className="type-body"
              style={{
                color: "var(--foreground)",
                marginBottom: 0,
              }}
            >
              The monastery includes gardens maintained by volunteers, a Buddha Hall, a stupa, a
              lotus pond, and a wooded Arahan walking trail. Visitors are welcome to walk or sit
              quietly throughout the property during visiting hours.
            </p>
          </div>
          <div
            className="w-full sm:w-auto"
            style={{ flexShrink: 0, maxWidth: 260, alignSelf: "center" }}
          >
            <img
              src={lotusPond.src}
              alt="A stream and waterfall among rocks and trees on the monastery grounds"
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: "260 / 380",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
                borderRadius: 2,
              }}
            />
          </div>
        </div>

        {/* Monastic Life and Practice */}
        <div className="pt-10" style={{ borderTop: "0.5px solid var(--border)" }}>
          <h3 className="type-subtitle mb-4">Monastic Life and Practice</h3>
          <p className="type-body" style={{ color: "var(--foreground)" }}>
            Gold Coast Dharma Realm is an active monastery where monastics engage in daily practice
            and cultivation — meditation, ceremonies, study, and caring for the community and
            monastery. You may see this life going on around you as you spend time here. Visitors
            are welcome to observe quietly, and to join any public activities taking place during
            their visit.
          </p>
        </div>

        {/* The Main Buddha Hall */}
        <div className="pt-10 mt-10" style={{ borderTop: "0.5px solid var(--border)" }}>
          <h3 className="type-subtitle mb-4">The Buddha Hall</h3>
          <p className="type-body" style={{ color: "var(--foreground)" }}>
            Ceremonies, meditation, and chanting take place in the Buddha Hall as part of the
            monastery's regular practice. At times there may be periods of silence or bowing.
            Visitors are welcome to observe quietly or participate as they feel comfortable.
          </p>
        </div>

        {/* Buddha Hall photo — landscape, natural height */}
        <div
          style={{
            margin: "2.5rem 0",
            overflow: "hidden",
            borderRadius: 2,
          }}
        >
          <img
            src={buddhaHall.src}
            alt="The exterior of the Main Buddha Hall with traditional curved roofline and manicured gardens"
            style={{
              width: "100%",
              display: "block",
            }}
          />
        </div>

        {/* Learning and Community */}
        <div className="pt-10 mt-10" style={{ borderTop: "0.5px solid var(--border)" }}>
          <h3 className="type-subtitle mb-4">Learning and Community</h3>
          <p className="type-body" style={{ color: "var(--foreground)" }}>
            The monastery hosts a regular program of teachings, recitations, and community
            activities on weekends, many of which are also available online via Zoom. A small
            library and bookshop are available for those who would like to explore the Buddhist
            teachings further.
          </p>
        </div>
      </div>
    </div>
  );
}
