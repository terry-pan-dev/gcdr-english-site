import masterHuaImage from "@/assets/MasterHuaBW.webp";

export function HomeMasterHua() {
  return (
    <section style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8 md:gap-x-12 lg:gap-x-16 md:grid-cols-[minmax(280px,420px)_1fr] md:grid-rows-[auto_1fr] items-start">
          {/* Heading */}
          <h2
            className="type-section-title mb-0 ml-0 pl-0 md:col-start-2 md:row-start-1"
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              marginLeft: 0,
              paddingLeft: 0,
            }}
          >
            The Venerable Master Hsuan Hua
          </h2>

          {/* Photo */}
          <a
            href="/master-hua"
            className="block mx-auto md:mx-0 md:col-start-1 md:row-start-1 md:row-span-2"
            aria-label="Read more about Master Hua"
          >
            <img
              src={masterHuaImage.src}
              alt="The Venerable Master Hsuan Hua"
              className="w-full"
              style={{
                maxWidth: "420px",
                display: "block",
                borderRadius: 2,
                filter: "grayscale(100%)",
              }}
            />
          </a>

          {/* Body text */}
          <div
            className="type-body md:col-start-2 md:row-start-2"
            style={{
              color: "var(--foreground)",
              fontSize: "1.0625rem",
              maxWidth: "42rem",
            }}
          >
            <p>
              Gold Coast Dharma Realm is part of the Dharma Realm Buddhist
              Association, founded by the Venerable Master Hsuan Hua
              (1918-1995). A disciple of Master Empty Cloud (Xū Yún), Master Hua
              dedicated his life to bringing the Buddhist teachings to the
              Western world.
            </p>

            <a
              href="/master-hua"
              className="type-link inline-block font-medium"
              style={{ marginTop: "1rem" }}
            >
              Read more about Master Hua {"\u2192"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
