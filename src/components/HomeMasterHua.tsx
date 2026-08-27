import masterHuaImage from "@/assets/MasterHuaBW.webp";

export function HomeMasterHua() {
  return (
    <section style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8 md:grid-cols-[minmax(280px,420px)_1fr] md:gap-12 lg:gap-16 items-start">
          {/* Photo */}
          <a
            href="/master-hua"
            className="block mx-auto md:mx-0"
            aria-label="Read more about Master Hua"
          >
            {" "}
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

          {/* Text */}
          <div
            className="type-body"
            style={{
              color: "var(--foreground)",
              fontSize: "1.0625rem",
              maxWidth: "42rem",
            }}
          >
            <h2
              className="type-section-title mb-5 ml-0 pl-0"
              style={{
                fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)",
                marginLeft: 0,
                paddingLeft: 0,
              }}
            >
              The Venerable Master Hsuan Hua
            </h2>

            <p>
              Gold Coast Dharma Realm is part of the Dharma Realm Buddhist Association, founded by
              the Venerable Master Hsuan Hua (1918–1995). A disciple of Master Empty Cloud (Xū Yún),
              Master Hua dedicated his life to bringing the Buddhist teachings to the Western world.
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
