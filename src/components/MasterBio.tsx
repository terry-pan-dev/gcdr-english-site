import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

const masterHuaImg = "/assets/master-hua.png";
const heroBg = "/assets/hero-bg.png";

export function MasterBio() {
  return (
    <div className="min-h-screen bg-[#1c1917] text-[#EBE9CF]">
      {/* Hero Banner */}
      <div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroBg}
            alt="Buddhist Ceremony"
            className="w-full h-full object-cover opacity-50 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c1917]/40 via-[#1c1917]/60 to-[#1c1917]" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-serif italic mb-4 tracking-wide text-[#c9a050]">
              A Biographical Sketch of
              <br />
              The Venerable Master Hsuan Hua
            </h1>
            <div className="h-1 w-24 bg-[#c9a050] mx-auto mb-6" />
            <p className="text-xl md:text-2xl font-light tracking-widest uppercase opacity-90">
              A Life of Dharma
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Links Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4 text-[#c9a050] text-sm md:text-base">
            <a
              href="https://en.wikipedia.org/wiki/Hsuan_Hua"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Wikipedia
            </a>
            <span className="text-stone-600">|</span>
            <a
              href="https://www.drba.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Back to the Source
            </a>
            <span className="text-stone-600">|</span>
            <a
              href="https://www.drba.org/master-hua-talks-at-vedanta-retreat-in-olema-1992/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Master Hua Talks at Vedanta Retreat in Olema 1992
            </a>
          </div>
        </motion.div>

        {/* Biography Section */}
        <div className="space-y-12 text-lg leading-loose font-light text-stone-300">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="md:float-right md:w-72 md:ml-10 mb-8 md:mb-2">
              <div className="p-2 border border-[#c9a050]/30 rounded-sm bg-[#2a2522]">
                <img
                  src={masterHuaImg}
                  alt="Venerable Master Hsuan Hua"
                  className="w-full h-auto rounded-sm shadow-2xl opacity-90"
                />
              </div>
              <p className="text-center text-[#c9a050]/60 text-sm mt-3 font-serif italic tracking-wide">
                Venerable Master Hsuan Hua
              </p>
            </div>
            <p className="first-letter:text-5xl first-letter:text-[#c9a050] first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]">
              The Venerable Master Hsuan Hua was also known as An Tse and To
              Lun. The name Hsuan Hua was bestowed upon him after he received
              the transmission of the Wei Yang Lineage of the Chan School from
              Venerable Elder Hsu Yun. Venerable Master Hua was born in
              Manchuria in the beginning of the last century. He left the home
              life at the age of nineteen. After the death of his mother, he
              lived in a tiny thatched hut by her graveside for three years, as
              an act of filial respect. During that time, he practiced
              meditation and studied the Buddha's teachings. Among his many
              practices were eating only once a day at midday and never lying
              down to sleep.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>
              He cultivated various practices of purity and traveled to study
              with various eminent and virtuous monks, such as the Venerable
              Elder Hsu Yun. In 1948 the Master arrived in Hong Kong, where he
              founded the Buddhist Lecture Hall and other monasteries. In 1962
              he brought the Proper Dharma to America and the West, where he
              lectured extensively on the major works of the Mahayana Buddhist
              canon. Delivering more than ten thousand lectures, he was the
              first person to establish the Triple Jewel in the United States.
              Over the years, the Master established the Dharma Realm Buddhist
              Association (DRBA) and its numerous affiliated monasteries and
              centers. He taught both Western and Asian disciples to apply the
              Dharma in daily life. He also taught disciples to translate the
              canon and set up educational institutions, and he guided the
              Sangha members in DRBA monasteries to truly practice and uphold
              the Buddhadharma.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>
              The Master passed into stillness on June 7, 1995, in Los Angeles,
              U.S.A., causing many people throughout the world to mourn the
              sudden setting of the sun of wisdom. Although he has passed on,
              his lofty example will always be remembered. Throughout his life
              he worked selflessly and vigorously to benefit the people of the
              world and all living beings. His wisdom and compassion inspired
              many to correct their faults and lead wholesome lives. Here we
              include the Verse of the Mendicant of Chang Bai written by the
              Venerable Master to serve as a model for all of us to emulate.
            </p>
          </motion.div>

          {/* Verse of the Mendicant of Chang Bai */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 pt-8 border-t border-stone-800"
          >
            <blockquote className="text-lg md:text-xl font-serif italic leading-relaxed text-stone-300 space-y-4">
              <p className="text-[#c9a050]">
                <em>
                  The Mendicant of Chang Bai was simple and honest in nature.
                </em>
              </p>
              <p>
                <em>He was always eager to help people and benefit others.</em>
              </p>
              <p>
                <em>Forgetting himself for the sake of the Dharma,</em>
              </p>
              <p>
                <em>he was willing to sacrifice his life.</em>
              </p>
              <p>
                <em>Bestowing medicines according to people's illnesses,</em>
              </p>
              <p>
                <em>he offered his own marrow and skin.</em>
              </p>
              <p>
                <em>His vow was to unite as one with millions of beings.</em>
              </p>
              <p>
                <em>
                  His practice pervaded space as he gathered in the myriad
                  potentials,
                </em>
              </p>
              <p>
                <em>Without regard for past, future, or present;</em>
              </p>
              <p>
                <em>With no distinctions of north, south, east, or west.</em>
              </p>
            </blockquote>
          </motion.div>
        </div>

        {/* Footer Quote */}
        <div className="mt-24 text-center border-t border-stone-800 pt-12">
          <p className="text-xl md:text-2xl font-serif italic text-stone-300 mb-2">
            "From emptiness I came; to emptiness I am returning"
          </p>
          <p className="text-[#c9a050] text-sm md:text-base">
            <strong>Venerable Master Hsuan Hua</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
