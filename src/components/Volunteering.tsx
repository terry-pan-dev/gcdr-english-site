const headingStyle = {
  color: "var(--heading-foreground)",
} as const;

const bodyStyle = {
  color: "var(--foreground)",
} as const;

const accentRuleStyle = {
  width: 28,
  height: 2,
  backgroundColor: "var(--accent)",
  marginBottom: "1.75rem",
} as const;

export function Volunteering() {
  return (
    <main
      className="min-h-screen w-full overflow-x-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* About Volunteering Section */}
      <section className="py-16 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm:hidden" style={accentRuleStyle} />
          <h2
            className="type-section-title mb-8"
            style={{
              ...headingStyle,
              fontSize: "clamp(2rem, 4vw, 2.6rem)",
            }}
          >
            Volunteering at Gold Coast Dharma Realm
          </h2>

          <div className="type-body space-y-5" style={bodyStyle}>
            <p>
              Volunteering is a wonderful way to support the monastery and be part of a community
              dedicated to kindness and service. Whether you can offer a few hours or a regular
              commitment, your help makes a real difference. Tasks may include gardening, cleaning,
              preparing vegetarian meals, assisting with events, translating sutra texts or helping
              maintain the grounds.
            </p>
            <p>
              Volunteering is not only about giving—it's also an opportunity to learn, practise
              mindfulness, and experience the joy of working together in harmony. Everyone is
              welcome, and no prior experience is needed. If you'd like to contribute your time and
              skills, please sign up below or speak to a monastic or volunteer during your visit.
            </p>
          </div>
        </div>
      </section>

      {/* Volunteer Form Section */}
      <section
        id="volunteer-form"
        className="py-16 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm:hidden" style={accentRuleStyle} />
          <h2
            className="type-section-title mb-4"
            style={{
              ...headingStyle,
              fontSize: "clamp(2rem, 4vw, 2.6rem)",
            }}
          >
            Sign Up to Volunteer
          </h2>
          <p className="type-body mb-10" style={bodyStyle}>
            Want to lend a hand? Complete our Volunteer Registration Form to let us know your
            interests and availability. This helps us match you with tasks that suit your skills.
            Registering ensures smooth coordination and keeps you informed about upcoming
            opportunities.
          </p>

          {/* Google Form Embed */}
          <div
            className="overflow-hidden"
            style={{ border: "0.5px solid var(--border)", borderRadius: 2 }}
          >
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfW3yI4Ozj0LCihE0VBzUHt2q0Mn7q6wcj2LxK4H4ovpeg38A/viewform?embedded=true"
              title="Volunteer registration form"
              width="100%"
              height="1543"
              className="bg-white"
            >
              Loading...
            </iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
