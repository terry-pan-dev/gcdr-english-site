import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

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
    <div className="min-h-screen bg-[#1c1917] text-[#EBE9CF]">
      {/* Hero Banner */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/assets/hero-bg.png"
            alt="Background Texture"
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
              The Eighteen Great Vows
            </h1>
            <div className="h-1 w-24 bg-[#c9a050] mx-auto mb-6" />
            <p className="text-xl md:text-2xl font-light tracking-widest uppercase opacity-90">
              of the Venerable Master Hsuan Hua
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32">
        
        {/* Introduction */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20 space-y-8 text-stone-300 font-light leading-relaxed text-lg"
        >
          <p>
            When the Ven. Master Hua was cultivating the practice of filial mourning beside his mother's grave, he made the following vows before the Buddhas on the 19th day of the sixth lunar month of the year of Zhitong
          </p>
          <div className="p-8 border border-[#c9a050]/30 rounded-lg bg-[#2a2522]/50 italic relative">
            <span className="absolute top-4 left-4 text-4xl text-[#c9a050]/20">"</span>
            <p className="mb-4">
              Ven. Master Hua: I bow before the Buddhas of the ten directions, the Dharma of the Tripitaka, and the Holy Sangha of the past and present, praying that they will hear and bear witness.
            </p>
            <p>
              I, disciple To Lun, Shi An Tse, resolve never to seek for myself the blessings of gods or humans, or the attainments of Shravakas, Pratyekabuddhas, or high Bodhisattvas. Instead, I rely on the Supreme Vehicle, the One Buddha Vehicle, and bring forth the Resolve for Bodhi, vowing that all living beings of the Dharma Realm will attain Utmost, Right, and Equal, Proper Enlightenment at the same time as I.
            </p>
            <span className="absolute bottom-4 right-4 text-4xl text-[#c9a050]/20 rotate-180">"</span>
          </div>
        </motion.div>

        {/* Vows List */}
        <div className="space-y-6">
          {vows.map((vow, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.02,
                ease: "easeOut"
              }}
              className="flex gap-6 p-6 rounded-lg hover:bg-white/5 transition-all duration-300 border-b border-white/5 cursor-default"
            >
              <motion.div 
                className="flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#c9a050] text-[#c9a050] font-serif text-xl bg-[#c9a050]/10">
                  {index + 1}
                </span>
              </motion.div>
              <p className="text-lg text-stone-300 leading-relaxed pt-1 flex-1">
                {vow}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Final Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 pt-12 border-t border-stone-800"
        >
          <div className="p-8 border border-[#c9a050]/30 rounded-lg bg-[#2a2522]/50 italic relative">
            <span className="absolute top-4 left-4 text-4xl text-[#c9a050]/20">"</span>
            <p className="text-lg md:text-xl text-stone-300 leading-relaxed mb-4">
              Also: I vow to save the innumerable living beings. I vow to eradicate the inexhaustible afflictions. I vow to study the illimitable Dharma-doors. I vow to accomplish the unsurpassed Buddha Way.
            </p>
            <p className="text-[#c9a050] text-base md:text-lg font-serif not-italic">
              <strong>Venerable Master Hsuan Hua</strong>
            </p>
            <span className="absolute bottom-4 right-4 text-4xl text-[#c9a050]/20 rotate-180">"</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}