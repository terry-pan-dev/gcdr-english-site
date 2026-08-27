export function VisitGuidelines() {
  const guidelines = [
    {
      title: "Dress Comfortably and Modestly",
      body: "Comfortable, modest clothing is encouraged (shoulders and knees covered). Loose-fitting clothing is recommended, as it can make it easier to bow or sit during meditation.\n\nIf you arrive dressed differently, you are still very welcome. We simply ask that you keep this in mind for future visits.",
    },
    {
      title: "What to Leave at Home",
      body: "In keeping with the monastery's traditions and practices, please do not bring alcohol, meat (including fish & poultry), eggs, illicit drugs, or cigarettes into the monastery.",
    },
    {
      title: "Families Welcome",
      body: "Children are welcome at the monastery. Parents and carers are asked to supervise children to help maintain a peaceful environment.",
    },
    {
      title: "Care for All Living Beings",
      body: "In keeping with the Buddhist principle of non-harming, we ask visitors not to harm any living beings while on the monastery grounds, including small creatures such as ants or insects.",
    },
    {
      title: "Shared Spaces and Seating",
      body: "In some areas of the monastery, such as the Buddha Hall, visitors may notice that seating may be arranged separately for men and women. This follows the monastery's traditional practice and helps support a focused and respectful environment. Visitors are welcome to follow the general arrangement in these spaces.",
    },
    {
      title: "Respect for Buddhist Texts",
      body: "Sutras and other Buddhist texts are regarded with care and reverence. Please avoid placing them on the floor or in unsuitable areas, and handle them respectfully.",
    },
  ];

  return (
    <section
      className="border-t"
      style={{
        backgroundColor: "var(--muted)",
        borderColor: "var(--border)",
      }}
    >
      <div className="py-16">
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
          <h2 className="type-section-title" style={{ marginBottom: "1rem" }}>
            Visitor Guidelines
          </h2>
          <p
            className="type-body"
            style={{
              color: "var(--foreground)",
              marginTop: "3rem",
              marginBottom: "3rem",
            }}
          >
            To help maintain a peaceful and harmonious environment for everyone, we kindly ask
            visitors to observe the following guidelines.
          </p>

          {/* Guidelines list */}
          <div>
            {guidelines.map((item, index) => (
              <div
                key={item.title}
                style={{
                  borderTop: "0.5px solid var(--border)",
                  paddingTop: "2.5rem",
                  marginTop: index === 0 ? 0 : "2.5rem",
                }}
              >
                <h3 className="type-subtitle" style={{ marginBottom: "1rem" }}>
                  {item.title}
                </h3>
                <div
                  className="type-body whitespace-pre-line"
                  style={{ color: "var(--foreground)" }}
                >
                  {item.body}
                </div>
              </div>
            ))}
          </div>

          {/* Closing invitation */}
          <div
            style={{
              borderTop: "0.5px solid var(--border)",
              paddingTop: "2.5rem",
              marginTop: "3rem",
              textAlign: "center",
            }}
          >
            <p
              className="type-body"
              style={{
                color: "var(--muted-foreground)",
                fontStyle: "italic",
              }}
            >
              If you have any questions before your visit, please contact the monastery at +61 (07)
              5522-8788 or at{" "}
              <a href="mailto:gcdr.australia@gmail.com" className="type-link">
                gcdr.australia@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
