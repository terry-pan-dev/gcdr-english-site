import { StickyScroll } from "./ui/sticky-scroll-reveal";
import type { StickyScrollContent } from "./ui/sticky-scroll-reveal";
import Prism from "./ui/Prism";
import RevHengSureImg from "../assets/RevHengSure.jpg";
import HengChihImg from "../assets/HengChih.jpg";
import LaiFashrImg from "../assets/laifashr.jpeg";

const dharmaMastersContent: StickyScrollContent[] = [
  {
    title: "Venerable Heng Sure",
    description:
      "Rev. Heng Sure was ordained as a Buddhist monk in 1976. For the sake of world peace, he undertook an over six hundred mile pilgrimage from South Pasadena to Ukiah, repeatedly taking three steps and one bow to cover the entire journey. In the entire two years taken to make the pilgrimage, he observed a practice of total silence. Rev. Heng Sure has an M.A. in Oriental Languages from UC Berkeley, and a Ph.D. from the Graduate Theological Union in Berkeley.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-black">
        <img
          src={typeof RevHengSureImg === "string" ? RevHengSureImg : RevHengSureImg.src}
          alt="Venerable Heng Sure"
          className="h-full w-full object-contain"
        />
      </div>
    ),
  },
  {
    title: "Venerable Heng Chih",
    description:
      "For 46 years Bhikshuni Heng Chih has been a Buddhist nun ordained in the Buddhist Mahayana tradition. She was one of the first Americans to be ordained under the guidance of the late Venerable Master Hsuan Hua, founder of the City of Ten Thousand Buddhas. Bhikshuni Heng Chih is currently Professor Emerita at Dharma Realm Buddhist University and retired in 2013 from a position as Assistant Professor in Buddhist Philosophy at Bond University in Australia.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-black">
        <img
          src={typeof HengChihImg === "string" ? HengChihImg : HengChihImg.src}
          alt="Venerable Heng Chih"
          className="h-full w-full object-contain"
        />
      </div>
    ),
  },
  {
    title: "Venerable Heng Lai",
    description:
      "Venerable Heng Lai met Venerable Master Xuan Gong in 1969 and received full ordination as a bhikshu in 1976 at the City of Ten Thousand Buddhas (CTTB). Prior to ordination, Venerable Heng Lai served in the US Navy on an aircraft carrier and later worked on a research vessel for the oceanography department. He has completed three periods of seven-day fasting during meditation retreats, with the third period lasting for 36 days.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-black">
        <img
          src={typeof LaiFashrImg === "string" ? LaiFashrImg : LaiFashrImg.src}
          alt="Venerable Heng Lai"
          className="h-full w-full object-contain"
        />
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
