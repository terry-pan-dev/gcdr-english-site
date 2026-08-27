// ─── Sub-components (matching ShurangamaSutra.tsx conventions) ────────────────

function SectionRule() {
  return (
    <div
      className="sm:hidden"
      style={{
        width: 28,
        height: 2,
        backgroundColor: "var(--accent)",
        marginBottom: "1.75rem",
      }}
    />
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="type-section-title"
      style={{
        fontSize: "clamp(1.5rem, 3vw, 2rem)",
        marginBottom: "1.25rem",
      }}
    >
      {children}
    </h2>
  );
}

function BodyPara({ children, mb = "1.25rem" }: { children: React.ReactNode; mb?: string }) {
  return (
    <p
      className="type-body"
      style={{
        color: "var(--foreground)",
        lineHeight: 1.9,
        marginBottom: mb,
      }}
    >
      {children}
    </p>
  );
}

function TeachingLink({ href, title, detail }: { href: string; title: string; detail: string }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <a href={href} className="type-link" style={{ fontWeight: "var(--font-weight-medium)" }}>
        {title}
      </a>
      <p
        className="type-body"
        style={{
          color: "var(--muted-foreground)",
          fontSize: "0.9rem",
          lineHeight: 1.7,
          marginTop: "0.25rem",
        }}
      >
        {detail}
      </p>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export function MasterHuaTalks() {
  return (
    <section style={{ backgroundColor: "var(--background)" }}>
      <div className="pt-nav pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Page title ── */}
          <h1 className="type-page-title" style={{ marginBottom: "2.5rem" }}>
            In His Own Words
          </h1>

          {/* ── Intro ── */}
          <BodyPara mb="0">A selection of Master Hua's talks and answers to questions.</BodyPara>

          {/* ── Talks ── */}
          <div style={{ marginTop: "3rem" }}>
            <SectionRule />
            <SectionHeading>Talks</SectionHeading>

            <TeachingLink
              href="https://www.drbachinese.org/online_reading/dharma_talks/kaishrlu-1/volume1-ce-01.htm"
              title="The Buddhadharma Is in Practice, Not in Talking"
              detail="A talk given June 13, 1958, during a Guanyin Session at Western Bliss Garden Monastery, Hong Kong."
            />
            <TeachingLink
              href="https://www.cttbusa.org/talks_on_dharma/ultimate_bliss.htm"
              title="The Land of Ultimate Bliss Is Right Before Our Eyes"
              detail="A talk given June 14, 1958, at Western Bliss Garden Monastery, Hong Kong."
            />
            <TeachingLink
              href="https://www.drbachinese.org/online_reading/dharma_talks/kaishrlu-1/volume1-ce-09.htm"
              title="Don't Wait Till You're Thirsty to Dig a Well"
              detail="A talk given June 17, 1958, at Western Bliss Garden Monastery, Hong Kong."
            />
            <TeachingLink
              href="https://www.drbachinese.org/online_reading/dharma_talks/kaishrlu-1/volume1-ce-12.htm"
              title="To Study Buddhism, We Must Cultivate Precepts, Samadhi, and Wisdom"
              detail="From the same 1958 series of talks at Western Bliss Garden Monastery, Hong Kong."
            />
            <TeachingLink
              href="https://www.drbachinese.org/online_reading/dharma_talks/kaishrlu-1/volume1-ce-24.htm"
              title="Doing It Just Right Is the Middle Way"
              detail="On investigating Chan and the Middle Way."
            />
            <TeachingLink
              href="https://www.cttbusa.org/talks_on_dharma/takingrefuge.htm"
              title="The Greatest Thing in Life, Taking Refuge with the Triple Jewel"
              detail="A talk given March 28, 1993, at Long Beach Monastery."
            />
            <TeachingLink
              href="https://www.cttbusa.org/talks_on_dharma/foundation.htm"
              title="When the Foundation Is Established, the Way Comes Forth"
              detail="A lecture given April 12, 1989, at the University of Oregon."
            />
            <TeachingLink
              href="http://longbeachmonastery.org/why_5_precepts-e.htm"
              title="Why Should We Receive and Uphold the Five Precepts"
              detail="An instructional talk on the five precepts and why they matter."
            />
            <TeachingLink
              href="https://www.drbachinese.org/online_reading/dharma_talks/kaishrlu-2/volume2-ce-13.htm"
              title="The Six Great Principles Are in Fact the Five Precepts"
              detail="Master Hua drawing the connection between the six principles and the five precepts."
            />
          </div>

          {/* ── Questions & Answers ── */}
          <div style={{ marginTop: "3rem" }}>
            <SectionRule />
            <SectionHeading>Questions & Answers</SectionHeading>
            <TeachingLink
              href="https://www.cttbusa.org/vajrastrikes/buddhism.asp.html"
              title="Questions and Answers with Master Hua"
              detail="Direct answers to students' questions on Buddhism, collected from Vajra Strikes."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
