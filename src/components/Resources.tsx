import sutrasImage from "@/assets/Sutras.webp";
import masterHsuYunImage from "@/assets/MasterHsuYun.webp";

// ─── Data ────────────────────────────────────────────────────────────────────

type TextEntry = {
  title: string;
  description: string;
  href: string;
  linkLabel?: string;
};

type ShurangamaVolume = {
  vol: number;
  href: string;
};

const shurangamaVolumes: ShurangamaVolume[] = [
  {
    vol: 1,
    href: "http://www.longbeachmonastery.org/Shurangama_Sutra_Part_1.pdf",
  },
  {
    vol: 2,
    href: "http://www.longbeachmonastery.org/Shurangama_Sutra_Part_2.pdf",
  },
  {
    vol: 3,
    href: "http://www.longbeachmonastery.org/Shurangama_Sutra_Part_3.pdf",
  },
  {
    vol: 4,
    href: "http://www.longbeachmonastery.org/Shurangama_Sutra_Part_4.pdf",
  },
  {
    vol: 5,
    href: "http://www.longbeachmonastery.org/Shurangama_Sutra_Part_5.pdf",
  },
  {
    vol: 6,
    href: "http://www.longbeachmonastery.org/Shurangama_Sutra_Part_6.pdf",
  },
  {
    vol: 7,
    href: "http://www.longbeachmonastery.org/Shurangama_Sutra_Part_7.pdf",
  },
  {
    vol: 8,
    href: "http://www.longbeachmonastery.org/Shurangama_Sutra_Part_8.pdf",
  },
];

const sutras: TextEntry[] = [
  {
    title: "The Heart of Prajna Paramita Sutra",
    description:
      "One of the most recited sutras in Mahayana Buddhism, on the nature of emptiness and the perfection of wisdom.",
    href: "https://dn721807.ca.archive.org/0/items/heart-sutra_202305/Heart_Sutra.pdf",
  },
  {
    title: "The Sixth Patriarch's Dharma Jewel Platform Sutra",
    description:
      "The recorded teachings of Chan Master Hui Neng, the only Chinese text to carry the designation of sutra.",
    href: "https://archive.org/download/the-sixth-patriarchs-dharmajewelplatformsutra/TheSixthPatriarch%27s%20Dharmajewelplatformsutra.pdf",
  },
  {
    title:
      "The Buddha Speaks the Sutra on the Deep Kindness of Parents and the Difficulty of Repaying It",
    description:
      "A sutra on the immeasurable kindness of parents and the Buddhist understanding of filial piety.",
    href: "https://dn720707.ca.archive.org/0/items/b-698af-1cb-1c-2eea-96ed-542467e-582b-1d-1/b698af1cb1c2eea96ed542467e582b1d%20%281%29.pdf",
  },
];

const books: TextEntry[] = [
  {
    title: "The Chan Handbook",
    description:
      "Master Hua's instructions on Chan meditation — on posture, the method of huatou, and the investigation of the self.",
    href: "http://www.longbeachmonastery.org/the_chan_handbook.pdf",
  },
  {
    title: "Ten Dharma Realms Are Not Beyond a Single Thought",
    description:
      "Verses composed and explained by Master Hua on the ten realms of existence, from the Buddha realm to the hells.",
    href: "https://dn760004.eu.archive.org/0/items/ten-dharma-realms-2018/TenDharmaRealms_-_2018.pdf",
  },
  {
    title: "Listen to Yourself — Think Everything Over",
    description:
      "Dharma talks by Master Hua on Amitabha Buddha recitation and the practice of mindfulness of the Buddha.",
    href: "https://ia800401.us.archive.org/23/items/listen-to-yourself-amitabha/Listen_to_yourself-Amitabha.pdf",
  },
  {
    title: "The Path Within",
    description:
      "Talks by teachers of the Dharma Realm Buddhist Association on practice, precepts, and cultivation.",
    href: "https://dn721903.ca.archive.org/0/items/pb.PathWithin_04152024/pb.PathWithin_04152024.pdf",
  },
  {
    title: "Meditation Handbook",
    description:
      "An introduction to Buddhist meditation by Rev. Heng Sure and Chin He, covering Chan and Pure Land methods.",
    href: "https://dn721606.ca.archive.org/0/items/meditation-handbook-english/Meditation_Handbook_English.pdf",
  },
  {
    title: "Kind Monk",
    description:
      "A biography of Venerable Master Hsuan Hua written for young readers, tracing his life from Manchuria to the West.",
    href: "https://dn721804.ca.archive.org/0/items/kind-monk-english-master-hua/Kind_Monk_English%20%28MasterHua%29.pdf",
  },
];

const emptyCloudBooks: TextEntry[] = [
  {
    title: "Empty Cloud: The Autobiography of Xu Yun",
    description:
      "Master Hsu Yun's account of his own life — his years of wandering practice and the experience of sudden enlightenment at the age of fifty-six.",
    href: "http://www.thezensite.com/ZenTeachings/Translations/Empty-Cloud_The_Autobiography_of_Xu_Yun.pdf",
  },
  {
    title: "Remembrance of a Great Chinese Zen Master",
    description:
      "Teachings and accounts from Master Hsu Yun's students, compiled as a memorial to his life and practice.",
    href: "https://archive.org/download/emptycloudteachingsofzenmasterxuyunremembranceofgreatchinesezenmasterjydinshakyaminzenshakya_698_V/Empty%20Cloud%20Teachings%20of%20Zen%20Master%20Xu%20Yun%20Remembrance%20of%20Great%20Chinese%20Zen%20Master%20Jy%20Din%20Shakya%20Min%20Zen%20Shakya.pdf",
  },
];

const links: { title: string; description: string; href: string }[] = [
  {
    title: "City of Ten Thousand Buddhas",
    description:
      "The principal monastery of the Dharma Realm Buddhist Association, with an extensive archive of Master Hua's sutra commentaries and Dharma talks.",
    href: "https://www.cttbusa.org",
  },
  {
    title: "Dharma Realm Buddhist Association",
    description:
      "The parent organisation founded by Master Hua, with monasteries and centres across the United States, Canada, and Asia.",
    href: "https://www.drba.org",
  },
  {
    title: "Dharma Realm Buddhist University",
    description:
      "A liberal arts university at the City of Ten Thousand Buddhas offering programmes in Buddhist studies, languages, and the humanities.",
    href: "https://www.drbu.edu",
  },
  {
    title: "Vajra Bodhi Sea",
    description:
      "A monthly journal of orthodox Buddhism published by the Buddhist Text Translation Society since 1970, with Dharma talks, biographies, and translations.",
    href: "http://www.drbachinese.org/vbs/publish/main_index.htm",
  },
  {
    title: "Online Dharma Talks",
    description:
      "An archive of Dharma talks given at the City of Ten Thousand Buddhas, available to read online.",
    href: "http://www.cttbusa.org/dharmatalks.asp",
  },
  {
    title: "Venerable Master Hua's Talks on Dharma",
    description:
      "Master Hua's Dharma talks available to read online through the DRBA Chinese website.",
    href: "https://www.drbachinese.org/online_reading_simplified/dharma_talks/kaishrlu-1/contents.htm",
  },
  {
    title: "Dharma Radio",
    description:
      "Online radio and podcast featuring Dharma talks, Chan Chronicles, and recordings from DRBA monasteries.",
    href: "https://www.dharmaradio.org",
  },
];

const navSections = [
  {
    id: "sutras",
    label: "Sutras",
    //description: "Free PDFs with Master Hua's commentary",
  },
  {
    id: "books",
    label: "Books",
    //description: "Practice guides and biographies",
  },
  {
    id: "links",
    label: "Links",
    //description: "Monasteries and online archives",
  },
];

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
        color: "var(--heading-foreground)",
        fontSize: "clamp(2rem, 4vw, 2.6rem)",
        marginBottom: "0.5rem",
      }}
    >
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="type-subtitle"
      style={{
        color: "var(--heading-foreground)",
        fontSize: "1.25rem",
        textTransform: "uppercase" as const,
        marginTop: "2.5rem",
        marginBottom: "1rem",
      }}
    >
      {children}
    </h3>
  );
}

function PDFLink({
  href,
  label = "Download PDF",
}: {
  href: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="type-link"
      style={{
        display: "inline-block",
        marginTop: "0.5rem",
        fontSize: "0.9rem",
      }}
    >
      {label} →
    </a>
  );
}

function TextRow({ entry }: { entry: TextEntry }) {
  return (
    <div
      style={{
        paddingTop: "1.25rem",
        paddingBottom: "1.25rem",
        borderBottom: "0.5px solid var(--border)",
      }}
    >
      <p
        className="type-subtitle"
        style={{
          color: "var(--heading-foreground)",
          fontSize: "1.2rem",
          marginBottom: "0.4rem",
        }}
      >
        {entry.title}
      </p>
      <p
        className="type-body"
        style={{
          color: "var(--foreground)",
          fontSize: "0.92rem",
        }}
      >
        {entry.description}
      </p>
      <PDFLink href={entry.href} label={entry.linkLabel ?? "Download PDF"} />
    </div>
  );
}

function LinkRow({ item }: { item: (typeof links)[0] }) {
  return (
    <div
      style={{
        paddingTop: "1.25rem",
        paddingBottom: "1.25rem",
        borderBottom: "0.5px solid var(--border)",
      }}
    >
      <p
        className="type-subtitle"
        style={{
          color: "var(--heading-foreground)",
          fontSize: "1.2rem",
          marginBottom: "0.4rem",
        }}
      >
        {item.title}
      </p>
      <p
        className="type-body"
        style={{
          color: "var(--foreground)",
          fontSize: "0.92rem",
        }}
      >
        {item.description}
      </p>
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="type-link"
        style={{
          display: "inline-block",
          marginTop: "0.5rem",
          fontSize: "0.9rem",
        }}
      >
        Visit →
      </a>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function Resources() {
  return (
    <>
      {/* ── Intro ── */}
      <section style={{ backgroundColor: "var(--background)" }}>
        <div className="pt-nav pb-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1
              className="type-page-title"
              style={{
                color: "var(--heading-foreground)",
                marginBottom: "1.25rem",
              }}
            >
              Resources
            </h1>
            <p
              className="type-body"
              style={{
                color: "var(--foreground)",
                marginBottom: "0.75rem",
              }}
            >
              A small selection of texts and links for those wishing to explore
              further. The{" "}
              <a
                href="https://www.buddhisttexts.org"
                target="_blank"
                rel="noopener noreferrer"
                className="type-link"
              >
                Buddhist Text Translation Society
              </a>{" "}
              has many more titles available for free as print editions and
              ebooks, as well as through their online bookstore.
            </p>

            {/* ── Banner image ── */}
            <div
              style={{
                overflow: "hidden",
                borderRadius: "2px",
                marginTop: "1.75rem",
              }}
            >
              <img
                src={sutrasImage.src}
                alt="Sutra canon volumes at Gold Coast Dharma Realm"
                style={{
                  width: "100%",
                  height: "260px",
                  objectFit: "cover",
                  objectPosition: "center 40%",
                  display: "block",
                }}
              />
            </div>

            {/* ── Section nav cards ── */}
            <div
              className="grid md:grid-cols-3 gap-4"
              style={{ marginTop: "2.5rem" }}
            >
              {navSections.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="resource-nav-card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "var(--card)",
                    borderTop: "2px solid var(--accent)",
                    padding: "1.25rem 1.5rem",
                    minHeight: "5.25rem",
                    textDecoration: "none",
                    transition: "border-color 0.15s",
                  }}
                >
                  <p
                    className="type-subtitle"
                    style={{
                      color: "var(--heading-foreground)",
                      fontSize: "1.4rem",
                      marginBottom: 0,
                      textAlign: "center" as const,
                    }}
                  >
                    {label}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sutras ── */}
      <div
        id="sutras"
        className="py-16 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionRule />
          <SectionHeading>Sutras</SectionHeading>
          <p
            className="type-body"
            style={{
              color: "var(--foreground)",
              fontSize: "0.92rem",
              marginBottom: "2.5rem",
              fontStyle: "italic",
            }}
          >
            All texts below include commentary by the Venerable Master Hsuan
            Hua.
          </p>

          {/* Shurangama — special treatment */}
          <div
            style={{
              paddingTop: "1.25rem",
              paddingBottom: "1.25rem",
              borderTop: "0.5px solid var(--border)",
              borderBottom: "0.5px solid var(--border)",
            }}
          >
            <p
              className="type-subtitle"
              style={{
                color: "var(--heading-foreground)",
                fontSize: "1.2rem",
                marginBottom: "0.4rem",
              }}
            >
              The Shurangama Sutra
            </p>
            <p
              className="type-body"
              style={{
                color: "var(--foreground)",
                fontSize: "0.92rem",
                marginBottom: "0.75rem",
              }}
            >
              Covering the nature of the mind, the origin of delusion, and the
              path to liberation. The 2017 edition with selected commentary
              excerpts is the best starting point; the complete commentary is
              available in eight volumes for deeper study.
            </p>
            <PDFLink
              href="https://dn721808.ca.archive.org/0/items/surangama-2017/Surangama_2017.pdf"
              label="Download 2017 edition (with commentary excerpts)"
            />
            <div style={{ marginTop: "1.25rem" }}>
              <p
                className="type-body"
                style={{
                  color: "var(--foreground)",
                  fontSize: "0.85rem",
                  marginBottom: "0.6rem",
                  fontStyle: "italic",
                }}
              >
                Complete commentary in eight volumes:
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap" as const,
                  gap: "0.5rem 1rem",
                }}
              >
                {shurangamaVolumes.map(({ vol, href }) => (
                  <a
                    key={vol}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="type-link"
                    style={{
                      fontSize: "0.88rem",
                    }}
                  >
                    Volume {vol}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {sutras.map((entry) => (
            <TextRow key={entry.title} entry={entry} />
          ))}
        </div>
      </div>

      {/* ── Books ── */}
      <div
        id="books"
        className="py-16 border-t"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--muted)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionRule />
          <SectionHeading>Books</SectionHeading>
          <p
            className="type-body"
            style={{
              color: "var(--foreground)",
              fontSize: "0.92rem",
              marginBottom: "2.5rem",
            }}
          >
            Dharma talks, practice guides, and introductory texts from the
            Dharma Realm Buddhist Association tradition.
          </p>

          <div style={{ borderTop: "0.5px solid var(--border)" }}>
            {books.map((entry) => (
              <TextRow key={entry.title} entry={entry} />
            ))}
          </div>

          <SubHeading>Venerable Master Hsu Yun (Empty Cloud)</SubHeading>
          <div className="grid items-start gap-8 md:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)]">
            <figure className="mx-auto w-full max-w-72 md:max-w-none">
              <img
                src={masterHsuYunImage.src}
                alt="Venerable Master Hsu Yun (Empty Cloud)"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "2px",
                }}
              />
            </figure>
            <div>
              <p
                className="type-body"
                style={{
                  color: "var(--foreground)",
                  fontSize: "0.92rem",
                  marginBottom: "1.25rem",
                }}
              >
                Few figures in modern Buddhism lived as completely within the
                tradition as Master Hsu Yun — decades of solitary practice,
                pilgrimage on foot across China, and awakenings that drew
                students from across the country. Venerable Master Hsuan Hua
                received Dharma transmission from him at Nanhua Monastery in
                1948.
              </p>
              <div style={{ borderTop: "0.5px solid var(--border)" }}>
                {emptyCloudBooks.map((entry) => (
                  <TextRow key={entry.title} entry={entry} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Links ── */}
      <div
        id="links"
        className="py-16 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionRule />
          <SectionHeading>Links</SectionHeading>
          <p
            className="type-body"
            style={{
              color: "var(--foreground)",
              fontSize: "0.92rem",
              marginBottom: "2.5rem",
            }}
          >
            Monasteries, organisations, and online archives within the Dharma
            Realm Buddhist Association network.
          </p>
          <div style={{ borderTop: "0.5px solid var(--border)" }}>
            {links.map((item) => (
              <LinkRow key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
