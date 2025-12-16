import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

export function WhiteUniverse() {
  const poemLines = [
    "Ice in the sky, snow on the ground.",
    "Numberless tiny bugs die in the cold or sleep in hibernation.",
    "In the midst of stillness you should contemplate,",
    "and within movement you should investigate.",
    "Dragons spar and tigers wrestle in continual playful sport;",
    "Ghosts cry and spirits wail, their illusory transformations strange.",
    "Ultimate truth transcends words;",
    "Not thought about or talked about, you ought to advance with haste.",
    "With great and small destroyed, with no inside or out,",
    "It pervades every mote of dust and encompasses the Dharma Realm,",
    "Complete, whole, and perfectly fused, interpenetrating without obstruction.",
    "With two clenched fists, shatter the covering of empty space.",
    "In one mouthful swallow the source of seas of Buddhalands.",
    "With great compassion rescue all,",
    "Sparing no blood or sweat, and never pause to rest!",
  ];

  return (
    <div className="min-h-screen bg-[#1c1917] text-[#EBE9CF] overflow-x-hidden">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 z-0">
        <ImageWithFallback
          src="/assets/white-universe-snow.jpg"
          alt="White Universe Snow Scene"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c1917]/80 via-[#1c1917]/90 to-[#1c1917]" />
      </div>

      <div className="relative z-10">
        {/* Hero Section with Poem */}
        <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-serif text-[#c9a050] mb-6 tracking-tighter">
              White Universe
            </h1>
            <p className="text-stone-400 italic tracking-widest uppercase text-sm md:text-base">
              A Poem by Venerable Master Hsuan Hua
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6 text-center relative">
            {/* Decorative lines */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c9a050]/30 to-transparent hidden md:block" />
            <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c9a050]/30 to-transparent hidden md:block" />

            {poemLines.map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`text-lg md:text-2xl font-serif leading-relaxed ${
                  index % 2 === 0 ? "text-stone-200" : "text-stone-400"
                }`}
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-16"
          >
            <span className="text-[#c9a050] text-2xl animate-bounce block">↓</span>
          </motion.div>
        </div>

        {/* Explanation Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-[#1c1917]/80 backdrop-blur-sm rounded-t-3xl border-t border-[#c9a050]/20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-[#c9a050] mb-8">The Explanation</h2>
            <div className="h-1 w-24 bg-[#c9a050]/50 mx-auto" />
          </motion.div>

          <div className="space-y-12 text-lg font-light leading-relaxed text-stone-300 text-justify">
            <ExplanationBlock>
              Do you know what I want to tell you all today? I want to tell you about the
              "Six-Syllable Great Bright Mantra" Recitation Session held at Gold Mountain Monastery
              in 1972. That session lasted for seven days and seven nights. There were over sixty
              participants, Americans as well as Chinese. They were all very vigorous, reciting day
              and night without ever stopping to rest. From morning to night, twenty-four hours a
              day, every day, they rotated shifts to recite this "Six-Syllable Great Bright Mantra"
              without resting, stopping, or cutting corners. Why did they do it? They were praying
              for world peace; they wanted to invisibly eradicate the calamities of the world.
            </ExplanationBlock>

            <ExplanationBlock>
              That was why this Dharma session was held. In 1974, it was predicted that there would
              be an earthquake in San Francisco. We recited the "Six-Syllable Great Bright Mantra"
              to prevent the quake from occurring. That's how we fought with the celestial demons.
              The celestial demons and externalists wanted San Francisco to quake, and we wanted to
              turn it around. Therefore everyone was reciting very vigorously, and no one was lazy.
            </ExplanationBlock>

            <ExplanationBlock>
              You all know the Six-Syllable Great Bright Mantra. Some people recite "An Ma Ni Ba Mi
              Hung" while others recite "Om Mani Padme Hum." Long ago there was an elderly woman who
              recited "Om Mani Padme Cow." Whether it's "cow" or "Hum," it counts as long as you
              recite it with sincerity. If you are sincere then it will be efficacious; if you are
              not sincere then it will not be efficacious. What is sincerity? Concentration. Being
              concentrated is efficacious. Being scattered is useless.
            </ExplanationBlock>

            <ExplanationBlock>
              I didn't take part in that session for reciting the Great Bright Mantra. Why not?
              Because I wanted to let the participants follow their own free will. If I had
              pressured them into reciting, they would have been embarrassed not to recite. Then it
              would not really be them reciting, nor would it be me reciting. The recitation would
              have been done under pressure. That's why I chose not to take part in the session.
            </ExplanationBlock>

            <ExplanationBlock>
              But I watched them from behind the scenes. I had a "radar" and I could see very
              clearly who was sleeping and who was not. I was very pleased to find that during the
              seven days, both during the day and at night, not a single person fell asleep while
              reciting the mantra. It makes me happiest to see people cultivating. What I dislike
              most is to see people cheating each other and not cultivating.
            </ExplanationBlock>

            <ExplanationBlock>
              During those seven days, every person was very vigorous and diligent. Some of them had
              attained an ineffably sublime level of skill, while others were feeling terribly
              tired. Some people were hoping to obtain spiritual penetrations, while others were
              reciting in the hope of obtaining ghost penetrations or human penetrations. But in the
              end, they didn't penetrate a single penetration; they were without spiritual
              penetrations and ghost penetrations and didn't even have the penetrations of people!
            </ExplanationBlock>

            <ExplanationBlock>
              After the seven-day session was over, their sincerity in reciting the mantra inspired
              me to compose the poem "White Universe" as a commemoration. This poem is modeled after
              the poem "Crimson River" by Yue Wumu [the famous General Yue Fei of the Southern Song
              dynasty in China]. These two poems are slightly correlated. I believe that Yue Wumu
              was full of righteous energy and gave all his strength to try to save his country. His
              bearing was very heroic. The title "White Universe" is derived from the title of his
              poem. He used the color red, and I changed to the color white. Not only did the river
              turn white, but the whole universe turned white.
            </ExplanationBlock>

            <ExplanationBlock>
              "Why is the poem called "White Universe"? Because the Six-Syllable Great Bright Mantra
              is so bright that its light illumines the entire universe and turns it white. That's
              one explanation. Furthermore, Gold Mountain Monastery has a very apt nickname: the
              icebox. Why is it called the icebox? Because there is no heater. Why wasn't a heater
              installed? Because there was no money. Why wasn't there any money? Because we didn't
              solicit donations. Why didn't we solicit donations? Because we wanted to starve to
              death. Even if we starved to death, we wouldn't ask for money. So even though we were
              hungry as could be, everyone still worked hard at their cultivation inside the
              icebox."
            </ExplanationBlock>

            {/* Snow Scene Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="my-12"
            >
              <div className="md:float-right md:w-96 md:ml-10 mb-8 md:mb-4">
                <div className="p-2 border border-[#c9a050]/30 rounded-sm bg-[#2a2522]">
                  <ImageWithFallback
                    src="/assets/white-universe-snow.jpg"
                    alt="White Universe Snow Scene - Ice in the sky, snow on the ground"
                    className="w-full h-auto rounded-sm shadow-2xl opacity-90"
                  />
                </div>
                <p className="text-center text-[#c9a050]/60 text-sm mt-3 font-serif italic tracking-wide">
                  Ice in the sky, snow on the ground
                </p>
              </div>
            </motion.div>

            <ExplanationBlock>
              Since the ice is white, the poem is entitled "White Universe." That's to speak on a
              small scale. What about on a larger scale? The characters for "universe" in Chinese
              are <i>yu zhou</i>. <i>Yu</i> refers to the zenith and nadir, while <i>zhou</i> refers
              to the east, west, south, and north. Together the six directions comprise the
              universe. The universe of the six directions had turned completely white and there was
              no more darkness.
            </ExplanationBlock>

            <ExplanationBlock>
              "This poem is also describing how everyone worked so hard during those seven days,
              reciting the Six-Syllable Great Bright Mantra without stop, cleaning up all the
              darkness in our own natures and turning it white. Hence the name "White Universe."
              There are many meanings to this name. "White Universe" also describes being able to
              endure hardship and apply effort in cultivation. Being patient and having not a trace
              of greed, hatred, and stupidity in our minds is also called "White Universe." The poem
              "White Universe" which I wrote goes like this:"
            </ExplanationBlock>

            <div className="my-12 p-8 border-l-2 border-[#c9a050] bg-[#2a2522]/50 italic text-stone-200 space-y-2">
              <p>
                <i>Ice in the sky, snow on the ground.</i>
              </p>
              <p>
                <i>Numberless tiny bugs die in the cold or sleep in hibernation.</i>
              </p>
              <p>
                <i>
                  In the midst of stillness you should contemplate, and within movement you should
                  investigate.
                </i>
              </p>
              <p>
                <i>Dragons spar and tigers wrestle in continual playful sport;</i>
              </p>
              <p>
                <i>Ghosts cry and spirits wail, their illusory transformations strange.</i>
              </p>
              <p>
                <i>Ultimate truth transcends words;</i>
              </p>
              <p>
                <i>Not thought about or talked about, you ought to advance with haste.</i>
              </p>
              <p>
                <i>With great and small destroyed, with no inside or out,</i>
              </p>
              <p>
                <i>It pervades every mote of dust and encompasses the Dharma Realm,</i>
              </p>
              <p>
                <i>Complete, whole, and perfectly fused, interpenetrating without obstruction.</i>
              </p>
              <p>
                <i>With two clenched fists, shatter the covering of empty space.</i>
              </p>
              <p>
                <i>In one mouthful swallow the source of seas of Buddhalands.</i>
              </p>
              <p>
                <i>With great compassion rescue all,</i>
              </p>
              <p>
                <i>Sparing no blood or sweat, and never pause to rest!</i>
              </p>
            </div>

            <ExplanationBlock>
              "Although this verse is not as courageous as Yue Fei's "Crimson River," it's not too
              bad. The first line says:" <i>Ice in the sky, snow on the ground.</i> It describes how
              we worked hard amidst the cold–we were in an icebox. Although Gold Mountain Monastery
              is not a world-renowned place, people in the United States know that it is an icebox.
              In the icebox, there's ice in the sky and snow on the ground. The ice represents that
              it's cold–very, very cold.
            </ExplanationBlock>

            <ExplanationBlock>
              At Gold Mountain Monastery, the building is cold and so are the people. Everyone who
              comes here says, "The people at Gold Mountain Monastery are very cold to people; they
              are not warm at all." So people who come here are all disappointed. "Ah! Those people
              are really frigid, not friendly at all." All the bugs in Gold Mountain Monastery die
              in the cold. The "ice" means it's icy cold, and "snow" means everything is frozen like
              ice and snow. "Ice in the sky and snow on the ground." This is pretty easy to
              understand, right?
            </ExplanationBlock>

            <ExplanationBlock>
              "<i>N</i>umberless tiny bugs die in the cold." It's not known how many of these bugs
              there are. These tiny bugs are just our false thoughts and the germs in our bodies.
              Every person's body has bacteria and germs. Due to the presence of these organisms,
              our bodies want to consume vitamins, such as A, B, C, D, B12, and vitamins 100 or
              1000.
            </ExplanationBlock>

            <ExplanationBlock>
              "Die in the cold" means freeze to death. Since the people here don't take vitamins and
              yet still apply effort in such cold, these tiny organisms freeze to death. This kind
              of skill can eradicate all sorts of germs and infectious diseases. Not only does it
              cure skin diseases, it also freezes and kills the germs that transmit infectious
              diseases. Therefore, it says "Numberless tiny bugs die in the cold."
            </ExplanationBlock>

            <ExplanationBlock>
              However, these creatures are skilled at hiding. They become stiff in the winter, as if
              they were frozen to death, but they aren’t really dead. The freeze temporarily causes
              them to become stiff and hard, but when the warm summer weather arrives, they come
              back to life. So it says: <i>or sleep in hibernation</i>. They hide away and go into
              hibernation, but when spring arrives they come back to life!
            </ExplanationBlock>

            <ExplanationBlock>
              Buddhism advocates not killing, so we should try to avoid killing even germs. Thus,
              “Numberless tiny creatures die in the cold or sleep in hibernation.” They go into
              hibernation, and during that time they sleep. What does that symbolize? Their sleep
              symbolizes that when we are sitting in stillness and reciting the Six-Syllable Great
              Bright Mantra, we seem to enter samadhi and yet not enter samadhi. We seem to be
              reciting the Great Bright Mantra, but at the same time we seem to be in samadhi–that’s
              what is meant by “sleep in hibernation.” During our “hibernation” we should cultivate
              our thought.
            </ExplanationBlock>

            <ExplanationBlock>
              Therefore the next verse says: <i>In the midst of stillness you should contemplate</i>
              . The mind is cold and calm, free of the seven emotions and six desires. Why is it
              free of them? Because it’s so cold! There is no energy for emotions and desires. Some
              creatures are frantically reciting, “It’s so cold! It’s so cold! It’s so cold!” These
              creatures are freezing so badly that they go into hibernation. In the midst of
              stillness you should contemplate: when the mind has calmed down, contemplate what this
              state is like. This refers to cultivators who enter a state of stillness and
              contemplate how the myriad things are all speaking the Dharma.
            </ExplanationBlock>

            <ExplanationBlock>
              <i>And within movement you should investigate</i>. This refers to when you are moving
              about. Sometimes you sit and recite, and sometimes you walk and recite–never allowing
              the sound of the recitation to break off. In movement, contemplate the principles of
              the Buddha-dharma. To contemplate means to investigate, to look into the meditation
              topic. Even when you are moving, your mind should be clear and lucid, not muddled;
              whether sleeping or awake, you should not be confused. You should always be properly
              mindful; bring forth proper mindfulness and apply effort. Thus, you should investigate
              in movement.
            </ExplanationBlock>

            <ExplanationBlock>
              At that time, what happens? Some demonic states may appear. What kind of demonic
              states? <i>Dragons spar and tigers wrestle in continual playful sport</i>. The dragons
              are riding the clouds and driving the fog while the tigers are diving into caves and
              leaping over boulders. They are frolicking and having fun. When these states appear,
              they dazzle your eyes. You see the dragons sparring and chase after that state: “I’m
              going to get on that dragon!” Then you enter a demonic state and become possessed by a
              demon.
            </ExplanationBlock>

            <ExplanationBlock>
              When you see tigers wrestling, you are scared out of your wits. As soon as you let
              fear take hold, you also become vulnerable to demons. These are states that manifest
              in stillness. They are not worth mentioning. Just like the Fifty Skandha-demon States
              described in the <i>Shurangama Sutra</i>, these are illusory transformations, unreal
              states. So what should you do? You should “see as if not seeing, hear as if not
              hearing.”
            </ExplanationBlock>

            <ExplanationBlock>
              <i>Ghosts cry and spirits wail, their illusory transformations strange</i>. At this
              time, you may hear ghosts howling, or perhaps you hear spirits wail. These illusory
              transformations are strange, and they are numerous beyond the description of words and
              perception of the mind. These are also illusory and false states. The ghosts are
              crying, “Oh! I am innocent! Someone did me in– please save me quickly! Recite more
              Sutras for me and rescue me. Have mercy on me! I won’t lose my temper anymore. I
              didn’t understand before…”
            </ExplanationBlock>

            <ExplanationBlock>
              Spirits are also wailing, “Don’t pay attention to him. His karmic obstacles are heavy.
              You cannot possibly help him.” See how they argue among themselves? You cannot tell
              who is telling the truth and who is lying, so you get confused. “What should I do?”
              you wonder, and you start having false thoughts because you have been influenced by
              these states. Then the demons take possession of you, and when that happens, you lose
              all sense of proper knowledge and proper understanding. “Ghosts howl and spirits wail,
              their illusory transformations strange.” These are unreal states and should not be
              taken seriously. Don’t get attached. You should bring forth the mind that dwells
              nowhere.
            </ExplanationBlock>

            <ExplanationBlock>
              <i>Ultimate truth transcends words</i>. There is nothing to be said; there is neither
              right nor wrong, neither long nor short, neither good nor bad, and neither wholesome
              nor evil. There is nothing within the ultimate truth. "Originally, there is not a
              single thing. Where can the dust alight?" That is the ultimate truth. Within the
              ultimate truth, there is originally not a single thing. So where can the dust alight?
              There is nothing, so words are cut off. Let me tell you one more thing. This was the
              first poem I ever wrote in my life. I did not want to write any more after that
              because the obstacle of literature, the mark of literature, is not helpful at all.
              Therefore, I did not want to be caught up by the obstacle of literature or be attached
              to the mark of literature.
            </ExplanationBlock>

            <ExplanationBlock>
              <i>Not thought about or talked about</i>. It is so ineffably wonderful that you cannot
              fathom it with your mind or discuss it with words. Your mouth wants to talk but words
              are lost; your mind wants to exploit it but thoughts are gone. It is so wonderful that
              no words can describe it. There’s no way to think about it either. The path of
              language is cut off, and the place of the mind’s activity is destroyed. It is
              impossible to speak of it or to reach it with thought. Even though it cannot be
              thought about or talked about, <i>you ought to advance with haste</i>. You still have
              to cultivate this kind of Dharma, because if you don’t, you’ll never obtain genuine
              skill.
            </ExplanationBlock>

            <ExplanationBlock>
              <i>You ought to advance with haste!</i> Though it cannot be described with words, you
              still want to temper it with the skill of cultivation. Do not retreat; you want to
              advance vigorously and cultivate it. Don’t retreat. You shouldn’t fall into dull
              emptiness. If you say, “Oh! So I have nothing! This is inconceivable. Well, that’s the
              way it is. I’ll just go to sleep when I am sleepy and eat when I’m hungry, and when I
              die it will just be a tragic loss.” That is not the right attitude, either. That is
              also wrong because you are letting the time pass in vain.
            </ExplanationBlock>

            <ExplanationBlock>
              <i>With great and small destroyed</i>. That which you are advancing towards with haste
              has no greatness and no smallness. <i>With no inside or out</i>. If you say this
              wonderful thing is outside, that’s not right. Nor is it inside, nor between inside and
              outside. Both great and small are destroyed–they are gone; there is no great and no
              small. Neither great nor small, neither inside nor out; one cultivates by oneself,
              understands by oneself, and makes arrangements for oneself. It is so great that
              nothing is outside, so small that nothing is inside. Thus, the great and the small are
              destroyed and inside and outside are gone; there is neither inside nor outside. It is
              wrong to say that it’s inside. It is just like what the <i>Shurangama Sutra</i> says*,
              that the mind is located neither inside nor outside. The Venerable Ananda was
              therefore confused.
            </ExplanationBlock>

            <ExplanationBlock>
              <i>It pervades every mote of dust</i>. However, it is all pervasive. In each mote of
              dust, there is this Buddha-nature, this truth, and this seeing.{" "}
              <i>And encompasses the Dharma Realm</i>. Though the Dharma Realm is huge, it cannot
              encompass this wonder, this enlightened nature. It is said, “The emptiness born out of
              great enlightenment is just like a bubble in the ocean.” It cannot be described.{" "}
              <i>Complete, whole, and perfectly fused</i>. It is complete and whole, neither
              insufficient nor excessive.
            </ExplanationBlock>

            <ExplanationBlock>
              You do not have the slightest bit of surplus, and I do not have the slightest bit of
              deficiency. It is not more on the part of the Buddha, nor is it less on the part of
              living beings. It is perfectly fair and just, without partiality or bias. This
              Dharma-nature is inherent in each of us; no one lacks it. It is not damaged and
              destroyed, but rather it is complete and perfectly fused,{" "}
              <i>interpenetrating without obstruction</i>, just like lamps. Each lamp has its own
              light, yet their lights are united. One lamp doesn’t say to another, “Look here, your
              light is too bright. I am jealous. I don’t want your light to be so bright. I’m going
              to destroy your light so that mine will show.” It’s not that way. Lights do not fight
              with each other. They shine upon each other and are mutually non-obstructing. Everyone
              cultivates and does not obstruct one another.
            </ExplanationBlock>

            <ExplanationBlock>
              <i>With two clenched fists, shatter the covering of empty space</i>. With my two
              fists, I shatter empty space. The covering of empty space is gone, so that there is no
              empty space at all. There is nothing left. Heaven and earth are no longer to be seen
              anywhere. Everything has disappeared.{" "}
              <i>In one mouthful swallow the source of seas of Buddhalands</i>. In one mouthful, I
              swallow down the four great seas. I drink up all the waters in the four great seas, so
              that they all dry up. In one gulp, I swallow the entire world. Someone may say,
              "Doesn't that make you a monster?" Tell me, what is not a monster? To swallow the
              source of seas of Buddhalands in one gulp–this is the Buddha, who is neither great nor
              small, neither inside nor outside; who arranges his own birth and death at will.
            </ExplanationBlock>

            <ExplanationBlock>
              <i>With great compassion rescue all</i>. What is to be done at this point? One must
              bring forth a mind of great compassion to universally rescue all living beings.
              Buddhas and Bodhisattvas rescue all living beings with great kindness and compassion.
              They bleed and sweat and don’t ever rest; despite the hardships they endure, they
              never complain like we do, saying, “I’m tired! I’m exhausted! I want to take a break.”
              Buddhas and Bodhisattvas forget their fatigue when they are saving living beings.
            </ExplanationBlock>

            <ExplanationBlock>
              Therefore: <i>sparing no blood or sweat, and never pause to rest!</i> Applying effort
              in this way, people rested neither in the daytime nor at night. Seeing everyone
              applying effort so diligently, I wrote this poem in commemoration. Later on, I saw
              that people no longer applied effort and were very casual and lax. Maybe if I hadn’t
              written this poem, people would work harder. I wrote this poem to praise and
              commemorate them, and what happened? Later everyone just looked at each other and no
              one made vigorous progress anymore.
            </ExplanationBlock>
          </div>

          {/* Footer Symbol */}
          <div className="mt-24 text-center">
            <span className="block text-[#c9a050] text-4xl">❖</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExplanationBlock({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.p>
  );
}
