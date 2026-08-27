import youngMeditationSrc from "@/assets/MasterHuaYoungMeditating.jpg";
import xuyunNanhuaSrc from "@/assets/MasterHuaXuYun.jpg";
import sfPondSrc from "@/assets/MasterHuaDuckPond.jpg";
import laterLifeSrc from "@/assets/MasterHuaLater.jpg";
import heroSrc from "@/assets/MasterHuaGroup.webp";

const headingStyle = {
  color: "var(--heading-foreground)",
} as const;

const bodyStyle = {
  color: "var(--foreground)",
  fontSize: "1.0625rem",
} as const;

const accentRuleStyle = {
  width: 28,
  height: 2,
  backgroundColor: "var(--color-accent-gold)",
  marginBottom: "1.75rem",
} as const;

const hairline = "0.5px solid var(--border)";

export function MasterBio() {
  return (
    <main
      className="min-h-screen w-full overflow-x-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Page title */}
      <section className="pt-nav pt-12 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="type-page-title mb-6"
            style={{
              ...headingStyle,
            }}
          >
            Venerable Master Hsuan Hua
          </h1>
          <div style={accentRuleStyle} />
          <p
            className="type-body"
            style={{
              ...bodyStyle,
              marginBottom: "0.5rem",
            }}
          >
            Founder of the Dharma Realm Buddhist Association and the first
            Chinese Buddhist master to bring the full monastic tradition to the
            West.
          </p>
        </div>
      </section>

      {/* Hero image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="w-full overflow-hidden"
          style={{
            height: "clamp(220px, 38vw, 480px)",
            backgroundColor: "var(--card)",
            position: "relative",
          }}
        >
          <img
            src={heroSrc.src}
            alt="Venerable Master Hsuan Hua with disciples"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="border-t mt-16" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="type-body space-y-10" style={bodyStyle}>
            {/* Early life */}
            <div>
              <h2
                className="type-section-title"
                style={{
                  ...headingStyle,
                  fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
                  marginBottom: "1.25rem",
                }}
              >
                Early life
              </h2>
              <p style={{ marginBottom: "1.25rem" }}>
                Hsuan Hua was born Bai Yushu in 1918, the youngest of eight
                children in a rural family in Shuangcheng County, in the
                northeastern province of Jilin. His mother was a lifelong
                vegetarian who recited the name of Amitabha Buddha every day — a
                quiet practice that shaped her youngest son deeply.
              </p>
              <p style={{ marginBottom: "1.25rem" }}>
                He first encountered the reality of death at eleven, when he
                came across a dead infant lying on the ground. The sight stopped
                him. He searched and found the answers offered in the Buddha's
                teachings. At twelve he began bowing to his parents every
                morning and evening as an act of repentance — gradually
                extending this to all living beings, bowing over eight hundred
                times a day. He resolved to become a monk, but acquiesced to his
                mother's wish that he not do so while she was alive.
              </p>
              <p>
                At fifteen he attended school for the first time. At sixteen he
                was already explaining the sutras to illiterate neighbours who
                wanted to hear the teachings. At eighteen he started a free
                school for around thirty poor children and adults, teaching as
                the sole instructor, and left school to care for his terminally
                ill mother. She passed away when he was nineteen.
              </p>
            </div>

            {/* Three years at the grave */}
            <div style={{ borderTop: hairline, paddingTop: "2.5rem" }}>
              <h2
                className="type-section-title"
                style={{
                  ...headingStyle,
                  fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
                  marginBottom: "1.25rem",
                }}
              >
                Three years at the grave
              </h2>
              <div style={{ overflow: "hidden" }}>
                <figure className="mb-6 w-full md:float-right md:mb-4 md:ml-10 md:w-[35%] md:max-w-[320px]">
                  <div className="overflow-hidden">
                    <img
                      src={youngMeditationSrc.src}
                      alt="Master Hua in meditation, early period, Manchuria"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </div>
                </figure>
                <p style={{ marginBottom: "1.25rem" }}>
                  After his mother's death, he travelled to Sanyuan Monastery in
                  Harbin, where he took his novice ordination under Venerable
                  Master Chang Zhi. He then built a small hut of sorghum thatch
                  beside her grave and spent three years there in mourning and
                  practice. He ate one meal a day and did not lie down to sleep
                  at night. During those years he made{" "}
                  <a href="/18-vows" className="type-link">
                    eighteen great vows
                  </a>{" "}
                  — vows that would govern the rest of his life. He read deeply
                  in the sutras. It was while reading the Lotus Sutra that he
                  experienced a profound awakening.
                </p>
                <p style={{ marginBottom: "1.25rem" }}>
                  Later, seated in meditation, he had a vision of the Sixth Chan
                  Patriarch, Huineng. In that vision, Huineng gave him a
                  mission: to bring the Dharma to the Western world.
                </p>
                <p style={{ marginBottom: "1.25rem" }}>
                  He was in his late teens, living in rural Manchuria. He had
                  never been to the West. He spoke no English. He took the
                  vision seriously.
                </p>
                <p>
                  At the end of those three years, he went into seclusion in
                  Amitabha Cave in the Changbai Mountains, where he continued
                  his practice in solitude. On his return he served as senior
                  monk at Sanyuan Monastery in Harbin, remaining there until
                  conditions drew him south.
                </p>
              </div>
            </div>

            {/* Nanhua and Master Xuyun */}
            <div style={{ borderTop: hairline, paddingTop: "2.5rem" }}>
              <h2
                className="type-section-title"
                style={{
                  ...headingStyle,
                  fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
                  marginBottom: "1.25rem",
                }}
              >
                Nanhua Monastery and Master Xuyun
              </h2>
              <div style={{ overflow: "hidden" }}>
                <figure className="mb-6 w-full md:float-right md:mb-4 md:ml-10 md:w-[35%] md:max-w-[320px]">
                  <div className="overflow-hidden">
                    <img
                      src={xuyunNanhuaSrc.src}
                      alt="Young Master Hua with Elder Master Xuyun at Nanhua Monastery, 1948"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </div>
                </figure>
                <p style={{ marginBottom: "1.25rem" }}>
                  In 1946, wanting to meet China's most revered living Chan
                  master, he began the long journey south — an arduous passage
                  of over two thousand miles across a country in the final years
                  of civil war. He received full monastic ordination at
                  Putuoshan in 1947.
                </p>
                <p style={{ marginBottom: "1.25rem" }}>
                  In 1948 he arrived at Nanhua Monastery in Guangzhou, where he
                  bowed before Master Xuyun — Empty Cloud — widely regarded as
                  the greatest Chan master of the twentieth century. Master
                  Xuyun had been born in 1840. He had lived through the fall of
                  the Qing dynasty, two world wars, and the revolution. He was,
                  by that point, over a hundred years old, and still teaching.
                </p>
                <p>
                  Xuyun appointed him head of the Vinaya Academy, and later Dean
                  of Academic Affairs, and formally recognised in the young monk
                  a genuine realisation.
                </p>
              </div>
            </div>

            {/* Hong Kong */}
            <div style={{ borderTop: hairline, paddingTop: "2.5rem" }}>
              <h2
                className="type-section-title"
                style={{
                  ...headingStyle,
                  fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
                  marginBottom: "1.25rem",
                }}
              >
                Hong Kong
              </h2>
              <p style={{ marginBottom: "1.25rem" }}>
                In 1949 he left for Hong Kong, where he spent over a decade
                teaching, sponsoring the printing of sutras, and building
                monasteries — Western Bliss Gardens, Cixing Chan Monastery, and
                the Buddhist Lecture Hall. He supported monastic refugees
                arriving from mainland China, and made several visits to
                Thailand and Burma to study the Theravada tradition firsthand.
              </p>
              <p>
                In 1956, Xuyun transmitted to him the Dharma lineage of the
                Weiyang school of Chan — one of the five great schools of
                Chinese Buddhism — along with the name Hsuan Hua, meaning "to
                proclaim and transform." Master Hua became the forty-fifth
                generation holder of that lineage, traced back to the First
                Patriarch Mahakashyapa. He waited for the conditions in the West
                to ripen.
              </p>
            </div>

            {/* The monk in the grave */}
            <div style={{ borderTop: hairline, paddingTop: "2.5rem" }}>
              <h2
                className="type-section-title"
                style={{
                  ...headingStyle,
                  fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
                  marginBottom: "1.25rem",
                }}
              >
                The monk in the grave
              </h2>
              <div style={{ overflow: "hidden" }}>
                <figure className="mb-6 w-full md:float-right md:mb-4 md:ml-10 md:w-[55%] md:max-w-[480px]">
                  <div className="overflow-hidden">
                    <img
                      src={sfPondSrc.src}
                      alt="Master Hua by a pond in San Francisco, early 1960s"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </div>
                </figure>
                <p style={{ marginBottom: "1.25rem" }}>
                  In 1962, invited by disciples who had settled in San
                  Francisco, he flew to the United States — stopping over in
                  Japan and Hawaii. He arrived in a country where almost no one
                  knew what a Buddhist monk was, let alone what the sutras
                  contained.
                </p>
                <p style={{ marginBottom: "1.25rem" }}>
                  He began lecturing at the Buddhist Lecture Hall in Chinatown,
                  which his disciples had already established as a branch of his
                  Hong Kong hall. He held a public meditation hour every evening
                  from seven to eight. He gave Dharma talks in Chinese. Early
                  lectures were rendered into English by whoever was present who
                  could manage it — imperfectly, haltingly, but earnestly. The
                  Master was deeply patient. He taught daily, regardless of how
                  many came.
                </p>
                <p style={{ marginBottom: "1.25rem" }}>
                  In October 1962, as the Cuban Missile Crisis brought the
                  United States and Soviet Union to the brink of nuclear war,
                  the Master undertook a total fast of thirty-five days, praying
                  for an end to the hostilities and for world peace.
                </p>
                <p style={{ marginBottom: "1.25rem" }}>
                  In 1963 he moved to a first-floor flat on the corner of Sutter
                  and Webster Streets in the Fillmore District and lived there
                  in relative seclusion for five years. Because the flat was
                  damp and windowless, he called himself "the monk in the grave"
                  — and wrote a short poem about it:
                </p>
                <blockquote
                  className="type-subtitle"
                  style={{
                    fontStyle: "italic",
                    fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
                    lineHeight: 2,
                    color: "var(--muted-foreground)",
                    borderLeft: "2px solid var(--color-accent-gold)",
                    paddingLeft: "1.5rem",
                    margin: "1.75rem 0",
                  }}
                >
                  Each of you now meets a monk in the grave.
                  <br />
                  Above there is no sun and moon, below there is no lamp.
                  <br />
                  Affliction and enlightenment — ice is water.
                  <br />
                  Let go of self-seeking and become apart from all that is
                  false.
                </blockquote>
              </div>
            </div>

            {/* The summer that changed things */}
            <div style={{ borderTop: hairline, paddingTop: "2.5rem" }}>
              <h2
                className="type-section-title"
                style={{
                  ...headingStyle,
                  fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
                  marginBottom: "1.25rem",
                }}
              >
                The summer that changed things
              </h2>
              <p style={{ marginBottom: "1.25rem" }}>
                In the summer of 1968, more than thirty students from the
                University of Washington came down to San Francisco to attend an
                intensive study session on the Shurangama Sutra. The Master
                lectured through the entire text. At the end of the session,
                five of the young Americans asked permission to leave the home
                life and become monastics under his guidance.
              </p>
              <p style={{ marginBottom: "1.25rem" }}>
                It was the first time a novice monastic ordination had taken
                place on Western soil.
              </p>
              <p>
                In 1969, those five — three men and two women — were sent to
                Taiwan for full ordination. The monastic community there was
                astonished. They were the first Americans to receive full
                Buddhist ordination in that era. News of it spread. People began
                to understand that something real was happening in California.
              </p>
            </div>

            {/* What he built */}
            <div style={{ borderTop: hairline, paddingTop: "2.5rem" }}>
              <h2
                className="type-section-title"
                style={{
                  ...headingStyle,
                  fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
                  marginBottom: "1.25rem",
                }}
              >
                What he built
              </h2>
              <p style={{ marginBottom: "1.25rem" }}>
                Over the following decades, the Master lectured on the sutras
                nearly every day. He founded Gold Mountain Monastery in San
                Francisco's Mission District in 1970, and in 1976 established
                the City of Ten Thousand Buddhas in Ukiah, California — one of
                the first traditional Chan monasteries in the Western world, and
                still the headquarters of the Dharma Realm Buddhist Association
                today.
              </p>
              <p style={{ marginBottom: "1.25rem" }}>
                He founded Dharma Realm Buddhist University and schools for
                children. He established the Buddhist Text Translation Society,
                which has since published more than a hundred volumes of
                translated sutras with his commentaries — the Buddhist canon
                rendered carefully into English, Vietnamese, Spanish, and other
                languages. The work of translation fell to his disciples,
                working together under his direction; it was a collective
                undertaking that continues to this day.
              </p>
              <p>
                He trained hundreds of monastics, both Asian and Western, who
                now teach at monasteries and temples across the United States,
                Canada, Australia, Europe, and Asia. Gold Coast Dharma Realm is
                among them.
              </p>
            </div>

            {/* How he taught */}
            <div style={{ borderTop: hairline, paddingTop: "2.5rem" }}>
              <h2
                className="type-section-title"
                style={{
                  ...headingStyle,
                  fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
                  marginBottom: "1.25rem",
                }}
              >
                How he taught
              </h2>
              <div style={{ overflow: "hidden" }}>
                <figure className="mb-6 w-full md:float-right md:mb-4 md:ml-10 md:w-[55%] md:max-w-[480px]">
                  <div className="overflow-hidden">
                    <img
                      src={laterLifeSrc.src}
                      alt="Venerable Master Hsuan Hua in later life"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </div>
                </figure>
                <p style={{ marginBottom: "1.25rem" }}>
                  The Master lectured in Chinese. From 1968 to the early 1990s
                  he gave sutra lectures at least once a day, and travelled
                  extensively — to Hong Kong, Taiwan, India, Southeast Asia, and
                  Europe. He was invited to speak at universities and academic
                  conferences. His presence drew a multitude of the faithful
                  wherever he went.
                </p>
                <p style={{ marginBottom: "1.25rem" }}>
                  He held to strict practice himself: one meal a day, no lying
                  down to sleep, the full monastic precepts kept without
                  compromise. He expected the same of his monastic disciples. He
                  was not a figure of easy comfort, but many who encountered him
                  described something harder to name — a quality of presence, of
                  complete attention, as though he saw the person in front of
                  him clearly.
                </p>
                <p style={{ marginBottom: "1.25rem" }}>
                  He was also a pioneer in bringing Buddhist traditions together
                  — inviting Theravada monks to teach and share ordination
                  duties alongside his own community, at a time when such
                  exchange was uncommon.
                </p>
                <p>
                  He entered stillness on 7 June 1995 in Long Beach, California.
                  His cremation yielded śarīra — crystalline relics that are a
                  sign of deep practice.
                </p>
              </div>
            </div>
          </div>

          {/* YouTube embed */}
          <div className="mt-16 pt-10" style={{ borderTop: hairline }}>
            <h2
              className="type-section-title mb-6"
              style={{
                ...headingStyle,
                fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
              }}
            >
              A documentary biography
            </h2>
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                backgroundColor: "var(--card)",
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/NsHieqe3_2c"
                title="A Biography of the Venerable Master Hsuan Hua"
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

          {/* Closing quote */}
          <div className="mt-16 pt-10" style={{ borderTop: hairline }}>
            <p
              className="type-subtitle"
              style={{
                fontStyle: "italic",
                fontSize: "clamp(1.2rem, 3vw, 1.7rem)",
                lineHeight: 1.5,
                color: "var(--heading-foreground)",
                marginBottom: "0.75rem",
              }}
            >
              "From emptiness I came; to emptiness I am returning."
            </p>
            <p
              className="type-body"
              style={{
                color: "var(--foreground)",
                fontSize: "0.9rem",
              }}
            >
              Venerable Master Hsuan Hua
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
