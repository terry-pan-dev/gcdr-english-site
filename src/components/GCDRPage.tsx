import RosalineKangPhoto from "@/assets/RosalineKang.webp";

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

function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="type-link">
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
        color: "var(--foreground)",
      }}
    >
      {children}
      {footer && (
        <footer
          style={{
            marginTop: "0.75rem",
            fontStyle: "normal",
            fontSize: "0.85rem",
            color: "var(--foreground)",
          }}
        >
          {footer}
        </footer>
      )}
    </blockquote>
  );
}

function PageImage({
  src,
  alt,
  caption,
  width = "100%",
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: string;
}) {
  return (
    <figure
      style={{
        margin: "2.5rem 0",
        maxWidth: width,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: 2,
          overflow: "hidden",
          display: "block",
        }}
      />
      {caption && (
        <figcaption
          className="type-body"
          style={{
            marginTop: "0.75rem",
            fontSize: "0.85rem",
            color: "var(--muted-foreground)",
            fontStyle: "italic",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function GCDRPage() {
  return (
    <section style={{ backgroundColor: "var(--background)" }}>
      <div className="pt-nav pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Page title ── */}
          <h1 className="type-page-title" style={{ marginBottom: "2.5rem" }}>
            About Gold Coast Dharma Realm
          </h1>

          {/* ── Opening ── */}
          <BodyPara mb="0">
            Gold Coast Dharma Realm (GCDR) is a Mahayana Buddhist monastery in Bonogin, in the Gold
            Coast hinterland, Queensland. It is the Australian branch of the Dharma Realm Buddhist
            Association (DRBA), founded by Venerable Master Hsuan Hua, and is also known as
            Shurangama Monastery.
          </BodyPara>

          {/* ── History ── */}
          <div style={{ marginTop: "3rem" }}>
            <SectionRule />
            <SectionHeading>History</SectionHeading>

            <BodyPara>
              GCDR exists because of Rosaline Kang, a disciple of Venerable Master Hua, who set out
              to find land for a monastery in the Mahayana Chinese tradition. In her own words:
            </BodyPara>

            <BlockQuote footer="— Rosaline Kang">
              I visit Australia often and realised that there is a shortage of monasteries in the
              Mahayana Chinese tradition. In my resolve to help the Master realise his vision, I
              started my search for a suitable piece of land. In 1991, I found a 53-acre piece of
              land. However, after we submitted a plan to the Gold Coast City Council, the
              restrictive conditions they set made it unfeasible to develop this plot of land as a
              monastery. I set forth to look for an alternative site and found the present 22-acre
              lot in 1996. Within four months, we were able to purchase the land, apply to the
              council for rezoning, and obtain approval from the City Council. Building plans and
              environmental reports were subsequently submitted and approved.
              <br />
              <br />
              In the months following the proposal, South-east Asia was hit by a severe economic
              crisis towards the end of 1997. My stocks and shares were badly affected by the crash
              of the stock and property markets, and almost overnight, my personal nett worth was
              reduced to about ten percent of its pre-crash value. This financial crisis was a
              severe ordeal for me, and I was extremely worried that I might not fulfil my vow of
              building the monastery.
              <br />
              <br />
              Despite this setback, I remained focused and drew strength by praying earnestly to
              Guanyin Bodhisattva.
              <br />
              <br />
              I sold the various properties that I had in Australia, and together with the help and
              generous support of friends and fellow Buddhists, we continued to work towards the
              Master's vision. The original plan was scaled down, and building began. I am now
              pleased to report that we have made a modest start with the completion of the basic
              facilities and amenities. Since April this year, we have had nuns and monks from CTTB
              visit the place to give Dharma lectures. These lectures were attended and
              well-received by both locals and well-wishers from Singapore and Malaysia.
              <br />
              <br />
              In July this year, with the visit of Reverend Heng Tso and Reverend Heng Yuen, I
              handed over the monastery to DRBA without any conditions, and I am sure that the place
              will scale new heights in times to come.
              <br />
              <br />
              Since I met the Master in 1978, his expedient teaching and guidance have influenced me
              to change my ways and lifestyle for the better. I have also learned the higher values
              of life in this material world. I sincerely hope that by establishing this branch of
              CTTB in Australia, many people as well as sentient beings will hear the proper Dharma
              and be able to similarly change their values and lifestyle. I wish for them to
              experience the benefits of the Master's teachings, without which I would still be lost
              in this samsaric ocean.
              <br />
              <br />I would like to take this opportunity to express my gratitude to all my friends
              who supported me during the trials and tribulations that I experienced while pursuing
              the fulfilment of my vows. In particular, I am grateful to Reverend Heng Sure for his
              advice and words of encouragement. Finally, I would also like to say that I am, and
              will always be grateful to the Buddhas, the Bodhisattvas, and the Venerable Master for
              showing me the way. Amitabha!
            </BlockQuote>

            <PageImage src={RosalineKangPhoto.src} alt="Rosaline Kang" width="60%" />

            <BodyPara mb="0">
              In 2008, Master Heng Chih travelled from the United States to continue the work of
              establishing Mahayana Chinese Buddhism in Australia, following Venerable Master Hua's
              example.
            </BodyPara>
          </div>

          {/* ── Lineage ── */}
          <div style={{ marginTop: "3rem" }}>
            <SectionRule />
            <SectionHeading>Lineage</SectionHeading>
            <BodyPara mb="0">
              GCDR is affiliated with the City of Ten Thousand Buddhas (CTTB) in Ukiah, California,
              DRBA's principal monastery, and follows the monastic tradition established by
              Venerable Master Hsuan Hua.{" "}
              <InlineLink href="/master-hua">Read more about Venerable Master Hsuan Hua</InlineLink>
              .
            </BodyPara>
          </div>

          {/* ── Practice Today ── */}
          <div style={{ marginTop: "3rem" }}>
            <SectionRule />
            <SectionHeading>Practice Today</SectionHeading>
            <BodyPara>
              GCDR follows the Five Schools of Mahayana Buddhism: the Vinaya School (precepts and
              moral discipline), the Chan School (meditation), the Scholastic School (study of the
              sutras), the Esoteric School (mantras), and the Pure Land School (chanting the
              Buddha's name).
            </BodyPara>
            <BodyPara>
              Dharma Master Jin Fu is the monastery's resident teacher.{" "}
              <InlineLink href="/dharma-masters">Meet the teachers</InlineLink>.
            </BodyPara>
            <BodyPara mb="0">
              The monastery holds sutra and mantra recitation, chanting, and meditation sessions on
              weekends. <InlineLink href="/events">See current offerings</InlineLink> or{" "}
              <InlineLink href="/visit">plan a visit</InlineLink>.
            </BodyPara>
          </div>
        </div>
      </div>
    </section>
  );
}
