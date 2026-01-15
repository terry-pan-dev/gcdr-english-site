import { BuildingPage } from "../BuildingPage";
import { Clock, User, Brush, Building2, Store } from "lucide-react";

const LeftPanel = () => {
  return (
    <div className="space-y-6 leading-relaxed text-stone-700">
      <h1 className="text-5xl font-bold text-stone-900 text-left">Main Gate</h1>

      <p className="mt-2 text-base text-stone-600 text-left">
        Buddhist Architecture, All / 2019-06-04
      </p>

      <div className="border-l-4 !border-[#c9a050] bg-stone-100 px-6 py-4 rounded-r ">
        <p className="text-black font-bold">
          The true Buddha is not to be sought outside the mind;
        </p>
        <p className="text-black font-bold">This very body is the true place of the Way.</p>
      </div>

      <p>
        The inner mountain gate of Gold Coast Dharma Realm has a distinctive design. Its
        semicircular arch combines elegance and modernity, symbolizing Buddhism's spirit of perfect
        harmony and non-obstruction. The arch is mounted with the titanium alloy English name "Gold
        Coast Dharma Realm," while on either side of the gate hang the Chinese characters, with
        "Gold Coast Dharma Realm" on the right and "Leng Yan Holy Temple" on the left.
      </p>
      <p>
        In front of the mountain gate stand the Four Heavenly Kings, each over ten feet tall and
        portrayed with majestic forms. Along with the twenty stone lanterns lining both sides of the
        main path, they were all sourced from Taizhou, Zhejiang, China.
      </p>
    </div>
  );
};

const RightPanel = () => {
  return (
    <div className="p-6 space-y-6">
      <strong className="text-2xl block border-b-2 border-black pb-2">Main Gate</strong>
      <p className="italic text-stone-600">
        The inner mountain gate of Gold Coast Dharma Realm has a distinctive design. Its
        semicircular arch combines elegance and modernity, symbolizing Buddhism's spirit of perfect
        harmony and non-obstruction. The arch is mounted with the titanium alloy English name "Gold
        Coast Dharma Realm," while on either side of the gate hang the Chinese characters, with
        "Gold Coast Dharma Realm" on the right and "Leng Yan Holy Temple" on the left.
      </p>
      <div className="space-y-4">
        <div>
          <strong className="text-lg">Completion Date</strong>
          <div className="flex items-center gap-2 mt-1">
            <Clock size={18} /> June 2022
          </div>
        </div>
        <div>
          <strong className="text-lg">Designer</strong>
          <div className="flex items-center gap-2 mt-1">
            <User size={18} /> Michael Chen
          </div>
        </div>
        <div>
          <strong className="text-lg">Construction</strong>
          <div className="flex items-center gap-2 mt-1">
            <Building2 size={18} /> Bruce Clark
          </div>
        </div>
        <div>
          <strong className="text-lg">Structure</strong>
          <div className="flex items-center gap-2 mt-1">
            <Store size={18} /> Steel-frame brick-and-stone
          </div>
        </div>

        <div>
          <strong className="text-lg">Calligraphy</strong>
          <div className="flex items-center gap-2 mt-1">
            <Brush size={18} /> Wang Xizhi's Collection of Characters
          </div>
        </div>
        {/* 分割线 */}
        <hr
          style={{
            border: "none",
            borderTop: "1px solid #555",
            margin: "1.5rem 0 0",
          }}
        />
      </div>
    </div>
  );
};

const building = {
  name: "Main Gate",
  nameChinese: "内山门",
  description:
    "The inner mountain gate featuring a semi-circular arch and statues of the Four Heavenly Kings.",
  featuredImage: {
    src: "/assets/buildings/main-gate/gate_1-scaled.jpg",
    alt: "Main Gate overview",
  },
  galleryImages: [
    { src: "/assets/buildings/main-gate/gate_2-scaled.jpg", alt: "Main Gate detail" },
    { src: "/assets/buildings/main-gate/gate_3-scaled.jpg", alt: "Main Gate architecture" },
    { src: "/assets/buildings/main-gate/gate_4-scaled.jpg", alt: "Main Gate entrance" },
    // { src: "/assets/buildings/main-gate/gate_5-scaled.jpg", alt: "Main Gate structure" },
    { src: "/assets/buildings/main-gate/gate_6-scaled.jpg", alt: "Main Gate view" },
    { src: "/assets/buildings/main-gate/gate_7-scaled.jpg", alt: "Main Gate detail view" },
  ],
  relatedBuildings: [
    {
      slug: "the-main-hall-of-gcdr",
      name: "The Main Hall of GCDR",
      //nameChinese: "大殿",
      // description: "The main hall is the heart of the temple, where ceremonies, teachings, and meditation practices take place.",
      image: "/assets/buildings/main-gate/751-Dharma-Realm-Temple-42-edited-770x433.jpg.webp",
    },

    {
      slug: "dinning-room",
      name: "The Five Contemplations Hall",
      // nameChinese: "五观堂",
      //description: "The dining hall where practitioners gather for meals, practicing mindfulness and gratitude with each meal.",
      image: "/assets/buildings/main-gate/五观堂-770x433.jpg.webp",
    },

    {
      slug: "pagoda",
      name: "Pagoda",
      // nameChinese: "舍利塔",
      //description: "The pagoda stands as a sacred monument, housing relics and serving as a focal point for devotion and reverence.",
      image: "/assets/buildings/lotus-pool/she_li_ta_1-770x433.jpg.webp",
    },
  ],
};

export function MainGatePage() {
  return (
    <BuildingPage
      name={building.name}
      nameChinese={building.nameChinese}
      description={building.description}
      featuredImage={building.featuredImage}
      galleryImages={building.galleryImages}
      leftContent={<LeftPanel />}
      rightContent={<RightPanel />}
      relatedBuildings={building.relatedBuildings}
      type="dining-room"
    />
  );
}
