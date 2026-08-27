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

// ─── Main component ───────────────────────────────────────────────────────────

export function ShurangamaSutra() {
  return (
    <section style={{ backgroundColor: "var(--background)" }}>
      <div className="pt-nav pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Page title ── */}
          <h1 className="type-page-title" style={{ marginBottom: "2.5rem" }}>
            The Shurangama Sutra
          </h1>

          {/* ── Opening ── */}
          <BodyPara>
            The Shurangama Sutra has been held in great esteem in Mahayana Buddhist countries for
            over a thousand years. Its name means "ultimately firm and strong."
          </BodyPara>
          <BodyPara>
            The Sutra has traditionally been regarded as a complete and practical manual for
            spiritual practice that will eventually lead to enlightenment. It offers practical and
            thorough guidance on the correct understanding of Buddha-nature — the potential within
            all beings for full awakening — and on how and why this true nature is hidden within our
            ordinary experience of ourselves and of the world. It teaches how we can uncover this
            nature and recognise it as our own true mind, how personal integrity and purity of
            conduct are essential prerequisites for spiritual awakening, and how our own intentional
            acts — whether physical, verbal, or mental — directly shape our experience, including
            our future rebirths. It also introduces general principles of Buddhist meditation
            alongside specific methods, and addresses how to distinguish correct understanding and
            practice from deviations.
          </BodyPara>
          <BodyPara mb="0">
            When Master Hsuan Hua brought the Sutra to Western students in San Francisco in 1968, he
            presented it not as an obscure or intimidating text but as what Reverend Heng Sure
            describes as "a good and wise spiritual friend." That perspective has been shared across
            the centuries by meditation teachers in China, Japan, Korea, and Vietnam — among them
            Master Han Shan of the Ming Dynasty, Master Yuanying of the Republic era, and Master
            Hua's own teacher Master Xuyun — each of whom used the Sutra as a reliable yardstick of
            proper samadhi.
          </BodyPara>

          {/* ── Ananda ── */}
          <div style={{ marginTop: "3rem" }}>
            <SectionRule />
            <SectionHeading>Ananda's story</SectionHeading>
            <BodyPara>
              Much of the Sutra unfolds through the Buddha's instructions to Ananda, the Buddha's
              cousin and attendant, and a monk of exceptional learning. As the Sutra opens, Ananda
              is alone on the road making his almsround when he passes a house of courtesans and is
              confused by a young woman's recitation of a spell. The Buddha senses his cousin's
              distress from a distance and sends the Bodhisattva Manjushri, armed with the
              Shurangama Mantra, to defeat the spell and bring Ananda safely back to the monastic
              grounds. Deeply mortified, Ananda requests instruction so that he can avoid further
              error — and this request becomes the occasion for the Buddha's extended teaching.
            </BodyPara>
            <BodyPara mb="0">
              The Buddha shows Ananda how to turn the attention of the sense faculties inward in
              order to reach the Shurangama Samadhi, and teaches that anyone who maintains purity of
              conduct and develops right understanding can attain an awakening identical to the
              minds of all Buddhas.
            </BodyPara>
          </div>

          {/* ── What the Sutra contains ── */}
          <div style={{ marginTop: "3rem" }}>
            <SectionRule />
            <SectionHeading>What the Sutra contains</SectionHeading>
            <BodyPara>
              The Sutra offers practical and thorough guidance on the correct understanding of
              Buddha-nature — the potential within all beings for full awakening — and on how and
              why this true nature is hidden within our ordinary experience of ourselves and of the
              world. It teaches how we can uncover this nature and recognise it as our own true
              mind, how personal integrity and purity of conduct are essential prerequisites for
              spiritual awakening, and how our own intentional acts — whether physical, verbal, or
              mental — directly shape our experience, including our future rebirths. It also
              introduces general principles of Buddhist meditation alongside specific methods, and
              addresses how to distinguish correct understanding and practice from deviations.
            </BodyPara>
            <BodyPara>
              The Sutra also contains a substantial section — the "Fifty Demonic States of Mind" —
              on experiences that can arise in the course of serious meditation practice. It serves
              as a guide for practitioners who encounter unusual or confusing states, helping them
              recognise and understand what is arising and avoid going astray. Reverend Heng Sure,
              President of the Dharma Realm Buddhist Association, describes how he uses it:
            </BodyPara>

            <BlockQuote footer="— Reverend Heng Sure, President of the Dharma Realm Buddhist Association and Director of Berkeley Buddhist Monastery">
              Over the years, when I have needed advice in cultivation, I have referred to the
              Shurangama Sutra for authoritative information. I go to the "Fifty Demonic States of
              Mind" to check on strange states in meditation. I go to the "Twenty-Five Sages" for
              encouragement on the path from the voices of Bodhisattvas. I go to the "Four Clear and
              Definitive Instructions on Purity" for clarity on interaction with the world.
            </BlockQuote>

            <BodyPara>
              This section is also available separately as <em>The Fifty Skandha-Demon States</em>{" "}
              by BTTS, which periodically makes it available without charge, and is covered in the
              eighth volume of the BTTS translation of the Shurangama Sutra (available on our{" "}
              <InlineLink href="/resources">Resources page</InlineLink>).
            </BodyPara>
            <BodyPara mb="0">
              Master Hsuan Hua described the Shurangama as "for opening wisdom" — distinguishing it
              from the Dharma Flower Sutra, which he said is "for becoming a Buddha," and the
              Avatamsaka, which is "for teaching living beings."
            </BodyPara>
          </div>

          {/* ── At GCDR ── */}
          <div style={{ marginTop: "3rem" }}>
            <SectionRule />
            <SectionHeading>The Sutra at Gold Coast Dharma Realm</SectionHeading>
            <BodyPara>
              A copy of the Shurangama Sutra is available in the monastery library and can also be
              accessed through the links on our{" "}
              <InlineLink href="/resources">Resources page</InlineLink>.
            </BodyPara>
            <BodyPara mb="0">
              At the heart of the Sutra is the Shurangama Mantra — recited daily by monastics and
              lay practitioners across the Chinese Buddhist tradition, and regarded as inseparable
              from the Sutra's practice. The Mantra is recited at the monastery every Saturday
              afternoon, and an annual retreat is held open to the public. See the{" "}
              <InlineLink href="/shurangama-mantra">Shurangama Mantra page</InlineLink> for more.
            </BodyPara>
          </div>
        </div>
      </div>
    </section>
  );
}
