import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HomeAbout() {
  return (
    <section
      id="homeabout"
      className="pt-40 pb-20"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="type-section-title mb-6">Gold Coast Dharma Realm</h2>
            <p
              className="type-body text-lg"
              style={{ color: "var(--foreground)" }}
            >
              Tucked into the bushland of Bonogin on the Gold Coast, Gold Coast
              Dharma Realm is a Mahayana Buddhist monastery where anyone is
              welcome to come, slow down, and just be for a while. The monastery
              is home to resident monastics who live and practise here
              year-round. Visitors are welcome to join in — whether that means
              sitting in on a chanting session, borrowing a book from the
              library, or simply walking quietly around the grounds. There's no
              expectation to know anything or believe anything in particular.
              The centrepiece of the property is a traditional Japanese-style
              Buddha Hall, set among the trees. On Saturdays and Sundays the
              temple is open to visitors, and on Sundays children's activities,
              yoga, and meditation are offered free of charge. GCDR is part of
              the Dharma Realm Buddhist Association, founded by Venerable Master
              Hsuan Hua, and carries on his commitment to Buddhist education,
              sutra translation, and making the teachings genuinely accessible
              in the West. Whether you're curious about Buddhism for the first
              time or have been practising for years, you're welcome here.
            </p>
          </div>
          <div
            className="relative h-96 overflow-hidden"
            style={{
              borderRadius: "var(--image-radius)",
              boxShadow: "var(--image-shadow)",
            }}
          >
            <ImageWithFallback
              src="/assets/master_hua.jpeg"
              alt="Gold Coast Dharma Realm monastery"
              className="w-full h-full object-cover object-left"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
