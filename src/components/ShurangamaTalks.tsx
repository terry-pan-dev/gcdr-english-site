import type { ReactNode } from "react";

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

function SectionHeading({ children }: { children: ReactNode }) {
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

function BodyPara({
  children,
  mb = "1.25rem",
}: {
  children: ReactNode;
  mb?: string;
}) {
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
  children: ReactNode;
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

// ─── Talk attribution block ───────────────────────────────────────────────────

function TalkHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3
        className="type-section-title"
        style={{
          fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)",
          marginBottom: "0.5rem",
        }}
      >
        {title}
      </h3>
      <p
        className="type-body"
        style={{
          color: "var(--muted-foreground)",
          fontSize: "0.9rem",
          fontStyle: "italic",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

function TalkFooter() {
  return (
    <p
      className="type-body"
      style={{
        color: "var(--muted-foreground)",
        fontSize: "0.85rem",
        marginTop: "2rem",
        paddingTop: "1.5rem",
        borderTop: "1px solid var(--border)",
      }}
    >
      Translated by the Buddhist Text Translation Society. From{" "}
      <em>A Sure Sign of the Proper Dharma</em>, a collection of talks by
      Venerable Master Hsuan Hua published by the Dharma Realm Buddhist
      Association.
    </p>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ShurangamaTalks() {
  return (
    <section style={{ backgroundColor: "var(--background)" }}>
      <div className="pt-nav pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Page title ── */}
          <h1 className="type-page-title" style={{ marginBottom: "0.75rem" }}>
            Talks on the Shurangama
          </h1>
          <p
            className="type-body"
            style={{
              color: "var(--foreground)",
              fontSize: "0.92rem",
              lineHeight: 1.8,
              marginBottom: "2.5rem",
            }}
          >
            Master Hua spoke often on the Shurangama Sutra and Mantra throughout
            his teaching life. Below is one talk in full, with links to more.
          </p>

          {/* ── Featured talk ── */}
          <TalkHeader
            title="Disciples of the Buddha Should Recite and Uphold the Shurangama Sutra"
            subtitle="A talk given in January 1983 at Gold Wheel Monastery"
          />

          <BodyPara>
            The Shurangama Sutra is a Sutra that acts like a demon-spotting
            mirror in Buddhism. All the celestial demons, externalists, and the
            li, mei, and wangliang ghosts reveal their true appearance when they
            see the Shurangama Sutra. They have no way to hide and no place to
            flee to. And so in the past, when Great Master Zhi Zhe heard of the
            existence of this Sutra, he bowed in the direction of India for
            eighteen years. For eighteen years, he used this spirit of utmost
            sincerity to pray for this Sutra to be brought to China.
          </BodyPara>

          <BodyPara>
            Of all the greatly virtuous and eminent monks of the past, all the
            wise and lofty Sanghans, there was not a single one who did not
            praise the Shurangama Sutra. Therefore, as long as the Shurangama
            Sutra exists, the Buddhadharma exists. If the Shurangama Sutra is
            destroyed, then the Buddhadharma will also become extinct. How will
            the decline of the Dharma come about? It will begin with the
            destruction of the Shurangama Sutra. Who will destroy it? The
            celestial demons and externalists will. They see the Shurangama
            Sutra as a nail in their eyes and a thorn in their flesh. They can't
            sit still, and they can't stand steady; they are compelled to invent
            a deviant theory, saying that the Shurangama Sutra is false.
          </BodyPara>

          <BodyPara>
            As Buddhist disciples, we should recognize true principle. Every
            word of the doctrines in the Shurangama Sutra is the absolute truth.
            There isn't a single word that does not express the truth. So now
            that we are studying the Fifty Skandha-demons, we should realize
            even more just how important the Shurangama Sutra is. The Shurangama
            Sutra is what the deviant demons, ghosts, and goblins fear most.
          </BodyPara>

          <BodyPara>
            The Venerable Master Hsu Yun lived to be a hundred and twenty years
            old, and during his whole life, he didn't write a commentary for any
            Sutra other than the Shurangama Sutra. He took special care to
            preserve the manuscript of his commentary on the Shurangama Sutra.
            He preserved it for several decades, but it was later lost during
            the Yunmen incident. This was the Elder Hsu's greatest regret in his
            life. He proposed that, as left-home people, we should study the
            Shurangama Sutra to the point that we can recite it by memory, from
            the beginning to the end, and from the end to the beginning,
            forwards and backwards. That was his proposal. I know that,
            throughout his whole life, the Elder Hsu regarded the Shurangama
            Sutra as being especially important.
          </BodyPara>

          <BodyPara>
            When someone informed the Elder Hsu that there were people who said
            the Shurangama Sutra was counterfeit, he explained that the decline
            of the Dharma occurs just because these people try to pass fish eyes
            off as pearls, confusing people so that they cannot distinguish
            right from wrong. They make people blind so that they can no longer
            recognize the Buddhadharma. They take the true as false, and the
            false as true. Look at these people: this one writes a book and
            people all read it. That one writes a book, and they read it too.
            The real Sutras spoken by the Buddha himself are put up on a shelf,
            where no one ever reads them.
          </BodyPara>

          <BodyPara>
            From this, we can see that living beings' karmic obstacles are very
            heavy. If they hear deviant knowledge and deviant views, they
            readily believe them. If you speak Dharma based on proper knowledge
            and proper views, they won't believe it. Why won't they believe it?
            Because they don't have sufficient good roots and foundations. That
            is why they have doubts about the proper Dharma. They are skeptical
            and unwilling to believe.
          </BodyPara>

          <BodyPara>
            Here at the City of Ten Thousand Buddhas, we will be setting up the
            Shurangama Platform, so it would be ideal if some of you bring forth
            the resolve to read the Shurangama Sutra every day for one or two
            hours. You can study it daily just as if you were studying in
            school, and memorize it so that you can recite it by heart. If you
            can recite the Shurangama Sutra, the Dharma Flower Sutra, and even
            the Avatamsaka Sutra from memory, that would be the very best.
          </BodyPara>

          <BodyPara>
            If someone is able to recite the Shurangama Sutra, the Dharma Flower
            Sutra, and the Avatamsaka Sutra from memory, then it will mean that
            this is still a time when the proper Dharma exists in the world.
            Therefore, in such a wonderful place as the City of Ten Thousand
            Buddhas, everyone should bring forth a great Bodhi resolve to do
            these things. It is not that we are competing with others. We should
            be outstanding, rise above the crowd, and do these things.
          </BodyPara>

          <BodyPara>
            In the past, I had a wish: I wanted to be able to recite the Dharma
            Flower Sutra and the Shurangama Sutra from memory. In Hong Kong,
            there is a disciple named Guo Yi (Heng Ding) who can recite the
            Shurangama Sutra from memory. I taught him to study the Dharma
            Flower Sutra, but in the end he probably didn't finish memorizing
            it, which is very regrettable.
          </BodyPara>

          <BodyPara mb="0">
            In such a fine place as we have here, all of you should bring forth
            a great resolve to study the Buddhist Sutras and precepts — the
            Shurangama Sutra, the Dharma Flower Sutra, the Vinaya in Four
            Divisions, and the Brahma Net Sutra — until you can recite them from
            memory. That would be the best, for then the proper Dharma would
            surely remain here for a long time.
          </BodyPara>

          <TalkFooter />

          {/* ── Further talks ── */}
          <div style={{ marginTop: "3.5rem" }}>
            <SectionRule />
            <SectionHeading>Further talks</SectionHeading>
            <BodyPara mb="0">
              This talk is one chapter of{" "}
              <em>A Sure Sign of the Proper Dharma</em>, a short collection of
              talks in which Master Hua speaks on the Shurangama Sutra and
              Mantra, published by the Dharma Realm Buddhist Association — the
              organisation he founded, and the one Gold Coast Dharma Realm
              belongs to. The full collection is available to read on the{" "}
              <InlineLink
                href="https://www.drbachinese.org/online_reading/dharma_talks/ProperDharma_b/contents.htm"
                external
              >
                Dharma Realm Buddhist Association website
              </InlineLink>
              . Many more of Master Hua's talks, including a full set of
              commentaries on the Shurangama Sutra, are published by the{" "}
              <InlineLink href="https://www.buddhisttexts.org" external>
                Buddhist Text Translation Society
              </InlineLink>
              .
            </BodyPara>
          </div>
        </div>
      </div>
    </section>
  );
}
