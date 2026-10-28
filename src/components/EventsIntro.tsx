import qigongImage from "@/assets/QiGong.webp";

export function EventsIntro() {
  return (
    <section id="events" style={{ backgroundColor: "var(--background)" }}>
      <div className="pt-nav pb-20">
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

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[225px] sm:h-[405px] overflow-hidden rounded-sm">
            <img
              src={qigongImage.src}
              alt="Qi Gong during Chan Session at Gold Coast Dharma Realm"
              className="block w-full h-full object-cover object-[center_100%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
