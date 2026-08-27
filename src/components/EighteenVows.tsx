const bodyStyle = {
  color: "var(--foreground)",
} as const;

const accentRuleStyle = {
  width: 28,
  height: 2,
  backgroundColor: "var(--accent)",
  marginBottom: "1.75rem",
} as const;

export function EighteenVows() {
  const vows = [
    "I vow that as long as there is a single Bodhisattva in the three periods of time throughout the ten directions of the Dharma Realm, to the very end of empty space, who has not accomplished Buddhahood, I too will not attain the right enlightenment.",
    "I vow that as long as there is a single Pratyekabuddha in the three periods of time throughout the ten directions of the Dharma Realm, to the very end of empty space, who has not accomplished Buddhahood, I too will not attain the right enlightenment.",
    "I vow that as long as there is a single Shravaka in the three periods of time throughout the ten directions of the Dharma Realm, to the very end of empty space, who has not accomplished Buddhahood, I too will not attain the right enlightenment.",
    "I vow that as long as there is a single god in the Triple Realm who has not accomplished Buddhahood, I too will not attain the right enlightenment.",
    "I vow that as long as there is a single human being in the worlds of the ten directions who has not accomplished Buddhahood, I too will not attain the right enlightenment.",
    "I vow that as long as there is a single asura who has not accomplished Buddhahood, I too will not attain the right enlightenment.",
    "I vow that as long as there is a single animal who has not accomplished Buddhahood, I too will not attain the right enlightenment.",
    "I vow that as long as there is a single hungry ghost who has not accomplished Buddhahood, I too will not attain the right enlightenment.",
    "I vow that as long as there is a single hell-dweller who has not accomplished Buddhahood, I too will not attain the right enlightenment.",
    "I vow that as long as there is a single god, immortal, human, asura, air-bound or water-bound creature, animate or inanimate object, or a single dragon, beast, ghost, spirit, or the like of the spiritual realm that has taken refuge with me and has not accomplished Buddhahood, I too will not attain the right enlightenment.",
    "I vow to fully dedicate all blessings and bliss which I myself ought to receive and enjoy to all living beings of the Dharma Realm.",
    "I vow to fully take upon myself all sufferings and hardships of all living beings in the Dharma Realm.",
    "I vow to manifest innumerable bodies as a means to gain access into the minds of living beings throughout the universe who do not believe in the Buddha-dharma, causing them to correct their faults and tend toward wholesomeness, repent of their errors and start anew, take refuge in the Triple Jewel, and ultimately accomplish Buddhahood.",
    "I vow that all living beings who see my face or even hear my name will fix their thoughts on Bodhi and quickly accomplish the Buddha Way.",
    "I vow to respectfully observe the Buddha's instructions and cultivate the practice of eating only one meal per day.",
    "I vow to enlighten all sentient beings, universally responding to the multitude of differing potentials.",
    "I vow to obtain the five eyes, six spiritual powers, and the freedom of being able to fly in this very life.",
    "I vow that all of my vows will certainly be fulfilled.",
  ];

  return (
    <main
      className="min-h-screen w-full overflow-x-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Hero Banner */}
      <section className="pt-nav pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="type-page-title mb-6">The Eighteen Great Vows</h1>
          <div style={accentRuleStyle} />
        </div>
      </section>

      {/* Main Content */}
      <section
        className="border-t py-16"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="type-body mb-16 space-y-8" style={bodyStyle}>
            <p>
              When the Ven. Master Hua was cultivating the practice of filial
              mourning beside his mother's grave, he made the following vows
              before the Buddhas on the 19th day of the sixth lunar month of the
              year of Zhitong
            </p>
            <blockquote
              className="p-6 italic"
              style={{ border: "0.5px solid var(--border)", borderRadius: 2 }}
            >
              <p className="mb-4">
                Ven. Master Hua: I bow before the Buddhas of the ten directions,
                the Dharma of the Tripitaka, and the Holy Sangha of the past and
                present, praying that they will hear and bear witness.
              </p>
              <p>
                I, disciple To Lun, Shi An Tse, resolve never to seek for myself
                the blessings of gods or humans, or the attainments of
                Shravakas, Pratyekabuddhas, or high Bodhisattvas. Instead, I
                rely on the Supreme Vehicle, the One Buddha Vehicle, and bring
                forth the Resolve for Bodhi, vowing that all living beings of
                the Dharma Realm will attain Utmost, Right, and Equal, Proper
                Enlightenment at the same time as I.
              </p>
            </blockquote>
          </div>

          {/* Vows List */}
          <div>
            {vows.map((vow, index) => (
              <div
                key={vow}
                className="grid grid-cols-[2.5rem_1fr] gap-5 py-8"
                style={{
                  borderTop:
                    index === 0 ? undefined : "0.5px solid var(--border)",
                }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full border font-serif text-xl"
                  style={{
                    borderColor: "var(--accent)",
                    color: "var(--accent)",
                  }}
                >
                  {index + 1}
                </div>
                <p className="type-body" style={bodyStyle}>
                  {vow}
                </p>
              </div>
            ))}
          </div>

          {/* Final Quote */}
          <div
            className="mt-16 pt-10"
            style={{ borderTop: "0.5px solid var(--border)" }}
          >
            <blockquote
              className="p-6 italic"
              style={{ border: "0.5px solid var(--border)", borderRadius: 2 }}
            >
              <p
                className="type-body mb-4 text-lg md:text-xl"
                style={bodyStyle}
              >
                Also: I vow to save the innumerable living beings. I vow to
                eradicate the inexhaustible afflictions. I vow to study the
                illimitable Dharma-doors. I vow to accomplish the unsurpassed
                Buddha Way.
              </p>
              <p
                className="type-body"
                style={{ ...bodyStyle, color: "var(--foreground)" }}
              >
                <strong>Venerable Master Hsuan Hua</strong>
              </p>
            </blockquote>
          </div>
        </div>
      </section>
    </main>
  );
}
