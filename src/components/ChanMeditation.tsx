import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import CircularGallery from "./CircularGallery";

const heroBg = "/assets/hero-bg.png";

const galleryItems = [
  {
    image: "/assets/chan-meditation/mmexport1697577219970.jpg",
    text: "Chan Meditation Practice",
  },
  {
    image: "/assets/chan-meditation/mmexport1697577214414.jpg",
    text: "Meditation Session",
  },
  {
    image: "/assets/chan-meditation/DSC2188-scaled.jpg",
    text: "Sacred Meditation Space",
  },
  {
    image: "/assets/chan-meditation/DSC_0152-1-scaled.jpg",
    text: "Peaceful Contemplation",
  },
  {
    image: "/assets/chan-meditation/DSC_1630-scaled.jpg",
    text: "Chan Practice",
  },
  {
    image: "/assets/chan-meditation/DSC_1495-scaled.jpg",
    text: "Meditation Hall",
  },
  {
    image: "/assets/chan-meditation/DSC_1480-scaled.jpg",
    text: "Stillness and Wisdom",
  },
  {
    image: "/assets/chan-meditation/DSC_1475-scaled.jpg",
    text: "Dharma Practice",
  },
  { image: "/assets/chan-meditation/DSC_1470-scaled.jpg", text: "Inner Peace" },
  {
    image: "/assets/chan-meditation/DSC_1466-scaled.jpg",
    text: "Chan Investigation",
  },
  {
    image: "/assets/chan-meditation/DSC_1462-scaled.jpg",
    text: "Meditation Path",
  },
  {
    image: "/assets/chan-meditation/DSC_0186-scaled.jpg",
    text: "Sacred Space",
  },
  {
    image: "/assets/chan-meditation/DSC_0296-scaled.jpg",
    text: "Spiritual Practice",
  },
];

export function ChanMeditation() {
  return (
    <div className="min-h-screen bg-[#1c1917] text-[#EBE9CF]">
      {/* Hero Banner */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroBg}
            alt="Chan Meditation"
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
              Chan Meditation
            </h1>
            <div className="h-1 w-24 bg-[#c9a050] mx-auto mb-6" />
            <p className="text-xl md:text-2xl font-light tracking-widest uppercase opacity-90">
              The Path to Stillness
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* What is Chan Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-6 text-[#c9a050]">What is Chan?</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg leading-relaxed mb-6 opacity-90">
              <strong className="text-[#c9a050]">
                Concentrating on a focal point is the key to success in everything
              </strong>
            </p>
            <p className="text-lg leading-relaxed mb-6 opacity-90">
              The method of sitting in meditation is essential to learn in cultivation. What does
              the word Chan mean? Chan is a Chinese abbreviation for the Sanskrit word, Dhyana.
              Dhyana means thought cultivation that leads to stilling our thoughts. Chan meditation
              is the method used to reach Dhyana, a stilling of our thoughts. Normally, when we sit,
              our minds wanders. Where do our minds go? They indulge in false thinking, which sends
              us anywhere our thoughts take us. Without having to pay for traveling, we can take a
              rocket trip. The false thoughts fly everywhere without restraint.
            </p>
            <p className="text-lg leading-relaxed mb-6 opacity-90">
              Why is it people do not have wisdom? It is because the mind wanders about. Why do we
              age day-by-day? It is because the mind rushes to all sorts of places. Suppose someone
              drives a new car recklessly and aimlessly. Doing that will definitely consume and
              waste a lot of fuel. Eventually, the car and its parts will be damaged and mechanical
              difficulties will result. This analogy applies to the human body as well. If we do not
              know how to take good care of it, if we endulge it without restraint, it will
              definitely consume a lot of 'fuel'. What 'fuel' would that be? That fuel is our
              precious mental energy. No matter how many times we refuel, we keep using it up.
            </p>
            <p className="text-lg leading-relaxed mb-6 opacity-90">
              Take for example people who consume tonics everyday, thinking that they are
              replenishing their bodies with nutrients. If people do not treasure their mental
              energy and are selfindulgent, then no matter how much tonic they consume, they will
              never replenish the wasted energy. As a proverb says,{" "}
              <em className="text-[#c9a050]">
                "Concentrating on a focal point is the key to success in everything."
              </em>{" "}
              We have to gather our thoughts and concentrate on a focal point. Then we will not
              deplete our mental energy. In other words, if we know how to drive well, we will not
              drive around recklessly and meet with an accident. Our car will also last longer.
              Similarly, if we know how to take care of ourselves, then it is possible to neither
              age nor die.
            </p>
          </div>
        </motion.section>

        {/* Twirling a flower section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-serif mb-4 text-[#c9a050]">
            Twirling a flower, the Buddha revealed the mind-to-mind seal
          </h3>
          <p className="text-lg leading-relaxed opacity-90">
            Shakyamuni Buddha initiated Chan investigation when he held aloft a flower in the
            Vulture Peak Assembly to indicate the transmission of the subtle and wonderful mind seal
            Dharma door. At that time, Patriarch Mahakasyapa understood the intention of the Buddha,
            and smiled broadly. From then on, the mind seal Dharma door of the Buddhas and
            Patriarchs was transmitted. Actually, Patriarch Mahakasyapa was already over a hundred
            years old and because he vigorously practiced asceticism, he normally would not have
            smiled. On this occasion, his smile was an indication that he had just received the
            Buddha's mind-to-mind seal.
          </p>
        </motion.section>

        {/* Only quiet contemplation section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-serif mb-4 text-[#c9a050]">
            Only quiet contemplation can initiate Chan
          </h3>
          <p className="text-lg leading-relaxed mb-6 opacity-90">
            Chan means stilling thoughts. We will only realize Chan if we still our thoughts.
            Samadhi means not moving. If we move, we have no samadhi.
          </p>
          <p className="text-lg leading-relaxed mb-6 opacity-90">
            By taking Dharma bliss as food, Chan samadhi will manifest. When we cultivate the Way,
            we practice sitting in meditation. To develop Chan, we need to sit down. As we sit in
            meditation, our skill will manifest. It should not be the case that as soon as you sit
            in meditation knowing anything at all. Entering samadhi requires one to sit in an
            upright posture. One sits with a straight back and holds the head straight without
            nodding or inclining the neck. What is meant by samadhi power? Samadhi has a certain
            power that supports and maintains your body in an upright posture so that you do not
            lean forward or tilt backward. Sitting upright effortlessly, you can enter Chan samadhi.
          </p>
          <p className="text-lg leading-relaxed mb-6 opacity-90">
            In the midst of samadhi, there is an unimaginable joy that is inexplicable and
            indescribable. Because it surpasses what your mind can imagine, it is described like
            this:
          </p>
          <blockquote className="border-l-4 border-[#c9a050] pl-6 my-6 italic text-xl opacity-90">
            <p className="mb-2">The path of words and speech is cut off.</p>
            <p>The place of the mind's activity is gone.</p>
          </blockquote>
          <p className="text-lg leading-relaxed mb-6 opacity-90">
            In Chan samadhi, you will experience a bliss that is continuous and unceasing.
            Experiencing the bliss of Chan samadhi inspires in us courage and vigor that surpasses
            the ordinary. That kind of courage and vigor is extremely strong and powerful. No other
            forces can overcome that type of power.
          </p>
        </motion.section>

        {/* Thought cultivation section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-serif mb-4 text-[#c9a050]">
            Thought cultivation eliminates false thinking
          </h3>
          <p className="text-lg leading-relaxed mb-6 opacity-90">
            Chan sitting is also known as thought cultivation. From this definition, we know that it
            is impossible not to have false thinking during Chan sitting. Normally, our false
            thinking comes and goes just like waves on water. Waves come up because of wind. When we
            meditate, why do false thoughts arise? It is because our self-nature still contains
            falsehood. This falsehood is like the wind, and false thoughts are like waves stirred by
            the wind.
          </p>
          <p className="text-lg leading-relaxed mb-6 opacity-90">
            As we practice meditation, we need to silence our thoughts. That means we must stop the
            false winds. Thought cultivation aims at reducing false thoughts and stopping the waves
            that constantly arise in our minds. Stilling means quieting the thoughts so they cease
            their movement. When we cease thinking and deliberating, we can give rise to samadhi
            power. Over time, as samadhi power develops, wisdom will manifest. With wisdom, our
            minds can illuminate the true nature of all dharmas.
          </p>
          <blockquote className="border-l-4 border-[#c9a050] pl-6 my-6 italic text-xl opacity-90">
            <p>When not a single thought arises,</p>
            <p>the entire substance manifests.</p>
          </blockquote>
          <p className="text-lg leading-relaxed mb-6 opacity-90">
            When the mind is completely stilled so that not a single of shred of false thinking
            remains, we will be able to enter samadhi and our original wisdom will thus manifest. We
            will then truly understand the basic reason why we are human beings, and will no longer
            be moved by external things. When the myriad external conditions do not move our minds,
            we can then be considered to be:
          </p>
          <blockquote className="border-l-4 border-[#c9a050] pl-6 my-6 italic text-xl opacity-90">
            <p>In unmoving suchness where all is absolutely clear and constantly understood.</p>
          </blockquote>
          <p className="text-lg leading-relaxed mb-6 opacity-90">
            At that time, none of the eight winds: praise and ridicule, sorrow and joy, gain and
            loss, defamation and eulogy, will be able to move our minds.
          </p>
          <div className="bg-white/5 p-6 rounded-lg my-6">
            <p className="text-lg leading-relaxed mb-4 opacity-90 italic">
              People may praise us or ridicule us as they wish. In favorable or adverse conditions,
              we will advance vigorously. No suffering or joy will move our minds.
            </p>
            <p className="text-lg leading-relaxed mb-4 opacity-90">
              Gain refers to things that benefit one, loss refers to things that harm one;
              defamation means to slander; eulogy is to commend or glorify one's name.
            </p>
            <p className="text-lg leading-relaxed opacity-90 italic">
              Unmoved by the eight winds, I sit erect on a purple-golden lotus.
            </p>
          </div>
          <p className="text-lg leading-relaxed opacity-90">
            Not being blown about by the eight winds is the result of thought cultivation, of
            silencing the mind. By not being moved by external factors, we can then understand how
            to practice sitting meditation.
          </p>
        </motion.section>

        {/* Silencing the mind section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-serif mb-4 text-[#c9a050]">
            Silencing the mind reveals our wisdom
          </h3>
          <p className="text-lg leading-relaxed mb-6 opacity-90">
            Investigating Chan requires non-movement of the mind and thoughts and this means
            silence. The Chan method works like the thrust of a knife, cutting right through.
            Because Chan investigation is apart from the mind-consciousness, it is known as putting
            an end to the mind. Ending the mind means ending all mental activities of the
            mind-consciousness. Only when all the activities of the false mind are stopped will
            thoughts be silenced. When that happens, we gain the power of knowing and seeing that
            comes with suddenly enlightening to the nonarising of all things. We then have patience
            with the nonarising of people and dharmas. And we certify to four stages of practice,
            which are heat, summit, patience, and first in the world.
          </p>
          <ol className="list-decimal list-inside space-y-4 mb-6 text-lg opacity-90">
            <li className="mb-2">
              <strong className="text-[#c9a050]">Heat.</strong> This warm energy comes as we sit in
              meditation.
            </li>
            <li className="mb-2">
              <strong className="text-[#c9a050]">Summit.</strong> That energy rises to the crown of
              our head as we continue to practice.
            </li>
            <li className="mb-2">
              <strong className="text-[#c9a050]">Patience.</strong> It becomes very difficult to be
              patient, but we must still be patient.
            </li>
            <li className="mb-2">
              <strong className="text-[#c9a050]">First in the World.</strong> We become a
              world-transcending great hero. If we want to attain these four stages, we must first
              learn to silence the mind. Our mind-consciousness must remain unmoving.
            </li>
          </ol>
          <p className="text-lg leading-relaxed mb-6 opacity-90">
            Our thoughts are like waves that cannot be calmed. Sitting in meditation aims at
            stopping the mind-consciousness from moving. Eventually, it stops naturally. Once
            stopped, the mind is silent. When it is completely silent, wisdom comes forth. When
            wisdom arises, we become self-illuminating.
          </p>
          <blockquote className="border-l-4 border-[#c9a050] pl-6 my-6 italic text-xl opacity-90">
            <p>When silence reaches an ultimate point,</p>
            <p>the light penetrates everywhere.</p>
          </blockquote>
          <p className="text-lg leading-relaxed opacity-90">
            That is the power of knowing and seeing that comes with sudden enlightenment to the
            non-arising of all things.
          </p>
        </motion.section>

        {/* The flavor of lightness section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-serif mb-4 text-[#c9a050]">
            The flavor of lightness and ease is infinitely wonderful
          </h3>
          <p className="text-lg leading-relaxed mb-6 opacity-90">
            What is the flavor of Chan? It is the joy of realizing Chan samadhi, which brings a
            feeling of lightness and tranquility. This infinitely wonderful experience defies
            conceptualization and verbal description. Those who have personally experienced this
            state tacitly accept it. Just as when a person drinks water, he himself will know
            whether it is hot or cold, so too lightness and ease is something we ourselves will know
            when it happens to us. If all of you want to know whether the flavor of Chan is sweet or
            bitter, you will have to work very hard at investigating Chan. When you have reached a
            certain state, you will naturally know the flavor.
          </p>
          <p className="text-lg leading-relaxed mb-6 opacity-90">
            Therefore, you have to investigate, and when you have investigated until the truth
            emerges, then you will experience the flavor of Chan. Chan is not to be spoken of but is
            to be investigated. This is why the Chan sect does not teach using words or literature.
            Its truth is transmitted outside the Teaching. It is a method that points directly to
            the human mind so that one can see one's own nature and attain Buddhahood. When a person
            who investigates Chan has reached a high level of attainment, he will never get angry.
            He will not fight or contend with others, because he has attained the Samadhi of
            Non-Contention. He will not pursue fame nor gain, because he looks upon wealth as being
            dewdrops on flowers. He looks upon official status as being frost on a rooftop. Both
            vanish without a trace in no time.
          </p>
        </motion.section>
      </div>

      {/* Circular Gallery Section */}
      <div className="py-20 bg-[#1c1917]">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-[#c9a050]">Our Sacred Spaces</h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Explore the peaceful environments where Chan meditation is practiced
          </p>
        </div>
        <div style={{ height: "600px", position: "relative" }}>
          <CircularGallery
            items={galleryItems}
            bend={1}
            textColor="#EBE9CF"
            borderRadius={0.05}
            scrollSpeed={2}
            scrollEase={0.05}
          />
        </div>
      </div>
    </div>
  );
}
