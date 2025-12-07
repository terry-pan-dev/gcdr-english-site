import React from "react";
import { motion } from "motion/react";
import { ImageCarousel } from "./ImageCarousel";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import parallaxImage from "../assets/c8367a591975cc33957b0c6bb3b4f9d0a17c9c3c.png";

export function GCDRPage() {
  const carouselImages = [
    {
      src: "/assets/temple-1.jpg",
      alt: "Dharma Realm Temple",
    },
    {
      src: "/assets/temple-2.jpg",
      alt: "Main Gate Overview",
    },
    {
      src: "/assets/temple-3.png",
      alt: "Temple Gate",
    },
    {
      src: "/assets/temple-4.jpg",
      alt: "Temple Hall",
    },
    {
      src: "/assets/temple-5.jpg",
      alt: "Temple Hall",
    },
    {
      src: "/assets/temple-6.jpg",
      alt: "Main Hall",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1c1917] text-[#EBE9CF]">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={parallaxImage.src}
            alt="Temple background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8 tracking-wide leading-tight">
              About Us
            </h1>
            <div className="h-px w-32 bg-[#c9a050] mx-auto mb-12" />
            <p className="text-xl md:text-2xl font-light tracking-wide text-white/90 max-w-3xl mx-auto">
              A Place of Serenity and Enlightenment
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Introduction Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-light mb-12 text-[#c9a050] tracking-wide">
              Welcome to Gold Coast Dharma Realm
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 text-lg md:text-xl font-light leading-relaxed text-stone-300 max-w-4xl mx-auto"
          >
            <div className="space-y-6 text-justify">
              <p>
                Welcome to a Buddhist monastery. You have entered an
                extraordinary place that is devoted to spiritual practice and
                personal transformation. It is a place where you can let go of
                worldly concerns and focus on some of the deeper questions in
                life: "Who am I? Where am I going? And, how can I selflessly
                benefit others?"
              </p>
              <p>
                The monastery is also the home of monks and nuns who have
                dedicated their lives to following the Buddhist path to
                awakening. Their lives are simple, allowing them to focus on the
                study and practice of Buddhism. There are many lay people and
                visitors that frequent the monastery as well. Some are regular
                supporters of the monastery, while others are simply curious
                about the lifestyle here.
              </p>
              <p>
                We welcome you and hope your visit is meaningful and worthwhile.
                Here are some background and basic information for you as new
                visitors and to give you a glimpse of what life is like in the
                monastery.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Buddhism Historical Perspective Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#2a2522]/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-light mb-8 text-[#c9a050] tracking-wide">
                Buddhism: A Historical Perspective
              </h2>
              <div className="space-y-6 text-lg font-light leading-relaxed text-stone-300">
                <p>
                  Several thousand years ago, Siddhartha Gautama was born as a
                  prince in a small kingdom. Upon his birth, a seer foretold
                  that he would either become a spiritual guide or a great
                  ruler. His father wanted his son to be the next ruler to carry
                  on his family line, so he attempted to shield his son from all
                  the unpleasantness of life.
                </p>
                <p>
                  However, when Prince Siddhartha turned twenty-nine, he
                  witnessed sickness, old age, and death, and resolved to find
                  an answer to these universal sufferings. He left the palace
                  and studied under meditation masters of his time, but after
                  mastering their techniques, he found that he had not answered
                  his fundamental questions.
                </p>
                <p>
                  He then undertook strict ascetic practices, to a point where
                  he was near death, but found himself still no closer to
                  liberation. Reflecting on his previous experiences, he
                  realized that the path consisted of the Middle Way, which
                  avoided the extremes of self-indulgence and
                  self-mortification.
                </p>
                <p>
                  He then made a vow that he would sit under the Bodhi tree
                  until he attained complete liberation. During the very first
                  night, Prince Siddhartha awoke to the Dharma, the way things
                  truly are, and became known as the Buddha, "The Awakened One."
                </p>
                <p>
                  Upon his awakening, Prince Siddhartha realized that all beings
                  have the capacity to be fully awake, but their inherent
                  potential is covered by deluded thinking and worldly
                  attachments. Hence, his teachings over the next forty-nine
                  years aimed at helping people return to their original
                  enlightened nature.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl"
            >
              <ImageCarousel images={carouselImages} autoplaySpeed={4000} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-6 text-lg font-light leading-relaxed text-stone-300"
          >
            <p>
              Over the millennia, the teachings of the Buddha have spread across
              many parts of Asia. In Sri Lanka, Burma, Cambodia, Lao and
              Thailand, a form of Buddhism is practiced known as the Theravada
              tradition, or "The Teaching of the Elders". In China, Japan,
              Vietnam, Korea, and Tibet, the Buddha's teachings are widely
              practiced in a tradition known as the Mahayana, "The Great
              Vehicle."
            </p>
            <p>
              In the last one hundred years, all of these different cultural
              expressions and Buddhist traditions have come to America. Since
              Buddhism has always adapted itself to the cultures of the
              countries in which it was taught, how Buddhism will develop in
              America still remains to be seen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction to the Founder Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1 relative h-[500px] rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                src="/assets/master-hua-giving-smile.jpg"
                alt="Master Hua giving smile"
                className="w-full h-full object-cover rounded-xl"
                style={{ borderRadius: "0.75rem" }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2"
            >
              <h2 className="text-4xl md:text-5xl font-light mb-8 text-[#c9a050] tracking-wide">
                Introduction to the Founder
              </h2>
              <div className="space-y-6 text-lg font-light leading-relaxed text-stone-300">
                <p>
                  The Venerable Master Hsuan Hua (1918-1995), founder of CTTB,
                  was born into a poor family in a small village in Manchuria.
                  He attended school for only two years before he had to return
                  home to take care of his ailing mother. At home, he opened a
                  free school for both children and adults who had even fewer
                  opportunities than he did.
                </p>
                <p>
                  Also as a young boy, he had his first encounter with death and
                  became aware of the impermanence of life. Upon learning that
                  Buddhism had a method for ending the cycle of death and
                  rebirth, he resolved to become a monk.
                </p>
                <p>
                  His mother died when he was nineteen, and he then spent three
                  years in solitary meditation beside his mother's grave. He
                  then entered the monastic life at Three Conditions Monastery
                  in Harbin. Seeing firsthand the hungry and impoverished, he
                  began to practice giving, often going without food himself in
                  order to feed others.
                </p>
                <p>
                  Master Hua's life was one of complete dedication to the
                  Buddhist path, teaching, and helping all beings. His teachings
                  continue to inspire and guide practitioners around the world.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Daily Life in the Monastery Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#2a2522]/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-[#c9a050] tracking-wide">
              Daily Life in the Monastery
            </h2>
            <p className="text-xl font-light text-stone-400 max-w-3xl mx-auto">
              A glimpse into the daily practice and ceremonies
            </p>
          </motion.div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-light mb-4 text-[#c9a050]">
                Morning Ceremony
              </h3>
              <p className="text-lg font-light leading-relaxed text-stone-300">
                The day begins at 4 AM with the morning ceremony. This ceremony
                includes chanting, bowing, and meditation. The morning ceremony
                sets the tone for the day, reminding everyone of the purpose of
                their practice and the importance of being mindful and
                compassionate.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-light mb-4 text-[#c9a050]">
                Noon Meal
              </h3>
              <p className="text-lg font-light leading-relaxed text-stone-300">
                The noon meal is the main meal of the day and is taken in
                silence. The meal is vegetarian, as Buddhists practice
                non-harming and compassion toward all living beings. Eating in
                silence helps us have clearer minds and more compassionate
                hearts. There is a mutual relationship between laity and
                monastics, where the laity provides sustenance and material
                support, and the monastics give teachings to the laity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-light mb-4 text-[#c9a050]">
                Great Compassion Repentance
              </h3>
              <p className="text-lg font-light leading-relaxed text-stone-300">
                After the noon meal, there is the Great Compassion Repentance,
                which is a ceremony focusing on Avalokiteshvara (Chinese: Guan
                Shi Yin), the Bodhisattva of Great Compassion. Repentance is a
                central practice in Buddhism because it allows us to turn a new
                leaf—to recognize what we have done wrong, to repent of our
                mistakes, and to reform ourselves for the better. The ceremony
                gives a form to the very personal act of repentance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-light mb-4 text-[#c9a050]">
                Evening Ceremony
              </h3>
              <p className="text-lg font-light leading-relaxed text-stone-300">
                The evening ceremony begins with the Incense Praise and is
                followed by either the Amitabha Sutra or the Eighty-eight
                Buddhas Repentance. The Amitabha Sutra teaches about Amitabha
                Buddha and his Pure Land, the Land of Ultimate Bliss. In the
                middle of the ceremony, the entire congregation recites the Four
                Great Vows of the Bodhisattva, followed by a Sutra lecture where
                the words of the Buddha are explained in a traditional setting.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
