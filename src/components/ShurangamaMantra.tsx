import { ShurangamaMantraPractice } from "./ShurangamaMantraPractice";

// ─── Sub-components ───────────────────────────────────────────────────────────

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

function InlineLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="type-link"
    >
      {children}
    </a>
  );
}

function BlockQuote({ children, footer }: { children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <blockquote
      style={{
        borderLeft: "2px solid var(--accent)",
        paddingLeft: "1.5rem",
        margin: "2rem 0",
        fontSize: "0.95rem",
        lineHeight: 1.9,
        fontStyle: "italic",
        color: "var(--muted-foreground)",
      }}
    >
      {children}
      {footer && (
        <footer
          style={{
            marginTop: "0.75rem",
            fontStyle: "normal",
            fontSize: "0.85rem",
            color: "var(--muted-foreground)",
          }}
        >
          {footer}
        </footer>
      )}
    </blockquote>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ShurangamaMantra() {
  return (
    <section style={{ backgroundColor: "var(--background)" }}>
      <div className="pt-nav pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Page title ── */}
          <h1 className="type-page-title" style={{ marginBottom: "0.75rem" }}>
            The Shurangama Mantra
          </h1>
          <p
            className="type-body"
            style={{
              color: "var(--foreground)",
              fontSize: "0.92rem",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}
          >
            One of the longest mantras recited in the Chinese Buddhist tradition, chanted daily by
            monastics and lay practitioners alike.
          </p>

          {/* ── Practice UI ── */}
          <ShurangamaMantraPractice />

          {/* ── About the practice ── */}
          <div style={{ marginTop: "4rem" }}>
            <SectionRule />
            <SectionHeading>The Mantra</SectionHeading>
            <BodyPara>
              Master Hua described the Shurangama Mantra as the king of mantras — the longest in the
              Buddhist canon, and, in his words, "the most important." It has 554 lines, divided
              into five sections.
            </BodyPara>
            <BodyPara mb="0">
              The Mantra appears in the Shurangama Sutra, where it is described as the means by
              which all Buddhas of the ten directions attained awakening. The Buddha Shakyamuni
              first proclaimed it to protect his disciple Ananda, who had fallen into difficulty on
              his almsround.
            </BodyPara>
          </div>

          {/* ── The practice ── */}
          <div style={{ marginTop: "3rem" }}>
            <SectionRule />
            <SectionHeading>The practice</SectionHeading>
            <BodyPara>
              The foundation of the practice is purity of conduct. Master Hua was direct about this:
              precepts and virtuous conduct come first, because scattered thoughts and impure
              motivations get in the way. The minimum standard he asked of practitioners was to hold
              the five precepts and practise the ten good deeds. "The purity of your mind," he said,
              "is what really dispels calamities."
            </BodyPara>
            <BodyPara>
              The mantra is traditionally recited daily, without interruption, and without concern
              for whether or not anything seems to be "happening." Master Hua discouraged chasing
              after responses: "Don't pay any attention to whether there are responses or not, just
              keep reciting." The state this points toward is one where the mantra and the mind are
              no longer separate — "the mantra is the mind and the mind is the mantra" — reached by
              turning the hearing inward to listen to one's own nature, which connects the practice
              to the Sutra's broader teaching on the ear faculty.
            </BodyPara>
            <BodyPara mb="0">
              The Sutra singles out reciting the Mantra from memory as significant in itself,
              sufficient to draw the Bodhisattvas' protection even without samadhi:
            </BodyPara>

            <BlockQuote footer="— The Shurangama Sutra">
              This mantra is always attended, day and night, by Bodhisattvas in the lineage of the
              Bodhisattva-King Vajra-Treasury. These Bodhisattvas will always be present to protect
              beings who recite this mantra and who are resolved to become enlightened. Indeed they
              will even protect beings whose minds are scattered and disorderly and lack samadhi,
              but who can nevertheless recite the mantra from memory.
            </BlockQuote>

            <BodyPara mb="0">
              The Sutra also teaches that reciting the Mantra with genuine devotion can restore
              broken precepts to purity, and enable those who have not yet received precepts to
              receive them.
            </BodyPara>
          </div>

          {/* ── At GCDR ── */}
          <div style={{ marginTop: "3rem" }}>
            <SectionRule />
            <SectionHeading>At Gold Coast Dharma Realm</SectionHeading>
            <BodyPara>
              The Shurangama Mantra is recited at the monastery every Saturday afternoon, and
              everyone is welcome to join. An annual retreat is also held each year, open to all.
            </BodyPara>
            <BodyPara mb="0">
              Those wanting to learn the Mantra will find both romanisation versions above. A copy
              of the Shurangama Sutra, which contains the full Mantra text with Master Hua's
              commentary, is available in the monastery library and through the links on our{" "}
              <InlineLink href="/resources">Resources page</InlineLink>.
            </BodyPara>
          </div>

          {/* ── YouTube ── */}
          <div style={{ marginTop: "3rem" }}>
            <SectionRule />
            <SectionHeading>Further listening</SectionHeading>
            <BodyPara>
              Alan Nicholson, a longtime disciple of Master Hua, recalls travelling with him through
              Malaysia in the late 1970s, and an eye-opening experience that convinced him of the
              Mantra's protective power.
            </BodyPara>
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                borderRadius: "4px",
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/dB7Cs7kw55w"
                title="Shurangama Mantra — practitioner's experience"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
