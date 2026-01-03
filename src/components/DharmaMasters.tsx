import { StickyScroll } from "./ui/sticky-scroll-reveal";
import type { StickyScrollContent } from "./ui/sticky-scroll-reveal";
import Prism from "./ui/Prism";
import RevHengSureImg from "../assets/RevHengSure.jpeg";
import RevHengSureMobileImg from "../assets/RevHengSureMobile.jpeg";
import HengChihImg from "../assets/DharmaMasterHengChih.jpeg";
import HengChihMobileImg from "../assets/DharmaMasterHengChihMobile.jpeg";
import LaiFashrImg from "../assets/DharmaMasterHengLai.jpeg";
import LaiFashrMobileImg from "../assets/DharmaMasterHengLaiMobile.jpeg";
import JinFuImg from "../assets/DharmaMasterJinFu.jpeg";
import JinFuMobileImg from "../assets/DharmaMasterJinFuMobile.jpeg";

const dharmaMastersContent: StickyScrollContent[] = [
  {
    title: "Reverend Heng Sure",
    description:
      "Rev. Heng Sure was ordained as a Buddhist monk in 1976. For the sake of world peace, he undertook an over six-hundred-mile pilgrimage from South Pasadena to Ukiah, repeatedly taking three steps and one bow to cover the entire journey. In the entire two years taken to make the pilgrimage, he observed a practice of total silence. Rev. Heng Sure has an M.A. in Oriental Languages from UC Berkeley, and a Ph.D. from the Graduate Theological Union in Berkeley. He serves as the Managing Director of the Berkeley Buddhist Monastery and teaches on the staff at the Institute for World Religions. He lectures on the Avatamsaka Sūtra at the Berkeley Monastery every Saturday evening. He is actively involved in interfaith dialogue and in the ongoing conversation between spirituality and technology.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[#1c1917]">
        <picture>
          <source
            media="(max-width: 639px)"
            srcSet={
              typeof RevHengSureMobileImg === "string"
                ? RevHengSureMobileImg
                : RevHengSureMobileImg.src
            }
          />
          <img
            src={typeof RevHengSureImg === "string" ? RevHengSureImg : RevHengSureImg.src}
            alt="Reverend Heng Sure"
            className="h-full w-full object-fit"
          />
        </picture>
      </div>
    ),
  },
  {
    title: "Dharma Master Heng Chih",
    description:
      "Dharma Master Heng Chih has been a Buddhist nun in the Mahayana tradition for 46 years. She was among the first Americans ordained under the guidance of the late Venerable Master Hsuan Hua, founder of the City of Ten Thousand Buddhas. Ordained in 1969, she later earned a Ph.D. in Translation and became a founding member of the Buddhist Text Translation Society. Dharma Master Heng Chih served as Assistant Professor of Buddhist Philosophy at Bond University in Australia until her retirement in 2013 and is now Professor Emerita at Dharma Realm Buddhist University. Her lifelong work focuses on teaching, translating Mahayana texts, and promoting authentic practice and monastic training across DRBA monasteries worldwide.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[#1c1917]">
        <picture>
          <source
            media="(max-width: 639px)"
            srcSet={
              typeof HengChihMobileImg === "string" ? HengChihMobileImg : HengChihMobileImg.src
            }
          />
          <img
            src={typeof HengChihImg === "string" ? HengChihImg : HengChihImg.src}
            alt="Dharma Master Heng Chih"
            className="h-full w-full object-contain"
          />
        </picture>
      </div>
    ),
  },
  {
    title: "Dharma Master Heng Lai",
    description:
      "Dharma Master Heng Lai met Venerable Master Hsuan Hua in 1969 and received full ordination as a Buddhist monk in 1976 at the City of Ten Thousand Buddhas (CTTB). Before ordination, he served in the US Navy on an aircraft carrier and later worked on a research vessel for the oceanography department. A senior disciple of Venerable Master Hsuan Hua, Dharma Master Heng Lai founded Snow Mountain Monastery in Washington State and has dedicated his life to Chan meditation and community practice. He has completed three periods of seven-day fasting during meditation retreats, with the third lasting 36 days. Known for his deep devotion and storytelling, he often shares insights from his cultivation journey and encourages practitioners to uphold precepts and samadhi as the foundation for wisdom.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[#1c1917]">
        <picture>
          <source
            media="(max-width: 639px)"
            srcSet={
              typeof LaiFashrMobileImg === "string" ? LaiFashrMobileImg : LaiFashrMobileImg.src
            }
          />
          <img
            src={typeof LaiFashrImg === "string" ? LaiFashrImg : LaiFashrImg.src}
            alt="Dharma Master Heng Lai"
            className="h-full w-full object-contain"
          />
        </picture>
      </div>
    ),
  },
  {
    title: "Dharma Master Jin Fu",
    description:
      "Dharma Master Jin Fu serves as the Monastic Director of Gold Coast Dharma Realm (Queensland). Alongside her monastic responsibilities, she currently offers lectures on the lines and phrases of the Shurangama Mantra and the Prologue of the Avatamsaka Sutra at GCDR. An accomplished editor, she has compiled and refined numerous publications for the Buddhist Text Translation Society (BTTS). At present, she is working on a comprehensive chronicle—a year-by-year record of Venerable Master Hsuan Hua's life and teachings.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[#1c1917]">
        <picture>
          <source
            media="(max-width: 639px)"
            srcSet={typeof JinFuMobileImg === "string" ? JinFuMobileImg : JinFuMobileImg.src}
          />
          <img
            src={typeof JinFuImg === "string" ? JinFuImg : JinFuImg.src}
            alt="Dharma Master Jin Fu"
            className="h-full w-full object-contain"
          />
        </picture>
      </div>
    ),
  },
];

export function DharmaMasters() {
  return (
    <div className="min-h-screen bg-[#1c1917] text-[#EBE9CF]" style={{ overflow: "visible" }}>
      {/* Hero Section with Prism Background */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Prism Background */}
        <div className="absolute inset-0">
          <Prism
            animationType="rotate"
            height={3.5}
            baseWidth={5.5}
            hueShift={0}
            glow={1}
            bloom={1}
            scale={3.6}
            colorFrequency={1}
            noise={0}
            transparent={true}
            timeScale={0.5}
            suspendWhenOffscreen={true}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 text-white tracking-wide drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            Our Dharma Masters
          </h1>
          <p className="text-xl md:text-2xl font-light text-stone-200 max-w-3xl mx-auto drop-shadow-md">
            Dedicated spiritual guides carrying forward the wisdom of ancient traditions
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full" style={{ overflow: "visible" }}>
        <StickyScroll content={dharmaMastersContent} />
      </div>
    </div>
  );
}
