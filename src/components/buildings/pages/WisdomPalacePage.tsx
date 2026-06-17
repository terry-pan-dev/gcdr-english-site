import { BuildingPage } from "../BuildingPage";
import { Clock, Building2Icon, UserRoundIcon, LibraryBigIcon, Landmark } from "lucide-react";

const LeftPanel = () => {
  return (
    <div className="space-y-6 leading-relaxed text-stone-700">
      <h1 className="text-5xl font-bold text-stone-900 text-left">Manjushri Hall</h1>

      <p className="mt-2 text-base text-stone-600 text-left">
        Buddhist Architecture, All / 2019-06-04
      </p>

      <div className="border-l-4 !border-[#c9a050] bg-stone-100 px-6 py-4 rounded-r">
        <p className="text-black">
          This is my Pure and Cool Dharma Site, where countless Bodhisattvas constantly gather;
        </p>
        <p className="text-black">
          May you, predestined seekers of wisdom, uphold sincerity in this Golden Coast holy realm.
        </p>
      </div>

      <p>
        The building housing Manjushri Hall is the oldest structure at Gold Coast Dharma Realm. The
        front hall now serves as a library, while the back hall enshrines the Three Sages of the
        Avatamsaka Sutra and contains two editions of the Buddhist Canon. This library previously
        functioned as the main Buddha Hall of Gold Coast Dharma Realm for nearly two decades. After
        the new Great Hall was completed in 2017, the old Buddha Hall was converted into a dining
        hall. Following the completion of the new dining hall in 2021, it has now been transformed
        into a library.
      </p>
      <p>
        The arrangement of the Three Sages of the Avatamsaka Sutra enshrined in Manjushri Hall
        essentially restores the appearance of the old Buddha Hall at Gold Coast Dharma Realm from
        twenty years ago. Manjushri Hall currently houses two editions of the Buddhist Canon: one
        being the Zhaocheng Jin Canon and the other the Dragon Canon. The library contains Buddhist
        books in Chinese, English, and Vietnamese, as well as the monthly journal Vajra Bodhi Sea
        from the City of Ten Thousand Buddhas. A dedicated space has also been established in the
        library to commemorate the Patriarch Venerable Master Hsuan Hua and his connections with
        Australia.
      </p>
      <p>
        Know that this place deserves reverence and offerings, as its merits cannot be fully
        described even over hundreds of thousands of eons; If there are those who uphold, recite,
        and chant here, they have already planted roots of goodness with not just three, four, or
        five Buddhas.
      </p>
    </div>
  );
};

const RightPanel = () => {
  return (
    <div className="p-6 space-y-6">
      <strong className="text-2xl block border-b-2 border-black pb-2">Manjushri Hall</strong>
      <div className="space-y-4">
        <p className="italic text-stone-600">
          The building housing Manjushri Hall is the oldest structure at Gold Coast Dharma Realm.
          The front hall now serves as a library, while the back hall enshrines the Three Sages of
          the Avatamsaka Sutra and contains two editions of the Buddhist Canon. This library
          previously functioned as the main Buddha Hall of Gold Coast Dharma Realm for nearly two
          decades. After the new Great Hall was completed in 2017, the old Buddha Hall was converted
          into a dining hall. Following the completion of the new dining hall in 2021, it has now
          been transformed into a library.
        </p>
        <div>
          <strong className="text-lg">Structure</strong>
          <div className="flex items-center gap-2 mt-1">
            <Building2Icon size={18} /> Brick–wood hybrid
          </div>
        </div>
        <div>
          <strong className="text-lg">Date</strong>
          <div className="flex items-center gap-2 mt-1">
            <Clock size={18} /> October 2021
          </div>
        </div>
        <div>
          <strong className="text-lg">Former Use</strong>
          <div className="flex items-center gap-2 mt-1">
            <Landmark size={18} /> Buddha Hall{" "}
          </div>
        </div>

        <div>
          <strong className="text-lg">Buddha Statue</strong>
          <div className="flex items-center gap-2 mt-1">
            <UserRoundIcon size={18} />
            The Three Saints of the Avatamsaka Sutra
          </div>
        </div>

        <div>
          <strong className="text-lg">Scriptures</strong>
          <div className="flex items-center gap-2 mt-1">
            <LibraryBigIcon size={18} /> Dragon Canon, Zhaocheng Jin Canon
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
  name: "Wisdom Palace",
  nameChinese: "文殊殿",
  description:
    "The oldest building on the grounds, now serving as a library and shrine for Manjushri Bodhisattva.",
  featuredImage: {
    src: "/assets/buildings/wisdom-palace/image_4.jpg",
    alt: "Wisdom Palace exterior",
  },
  // galleryImages: [
  //   { },
  // ],
  relatedBuildings: [
    {
      slug: "pagoda",
      name: "Pagoda",
      // nameChinese: "舍利塔",
      // description: "The pagoda stands as a sacred monument, housing relics and serving as a focal point for devotion and reverence.",
      image: "/assets/buildings/lotus-pool/she_li_ta_1-770x433.jpg.webp",
    },
    {
      slug: "outergate",
      name: "Outer Gate",
      // nameChinese: "外山门",
      // description: "The outer gate welcomes visitors to the temple grounds, marking the entrance to a place of peace and spiritual practice.",
      image: "/assets/buildings/lotus-pool/rsz_外山门-370x208.png.webp",
    },

    {
      slug: "dinning-room",
      name: "The Five Contemplations Hall",
      // nameChinese: "五观堂",
      // description: "The dining hall where practitioners gather for meals, practicing mindfulness and gratitude with each meal.",
      image: "/assets/buildings/main-gate/五观堂-770x433.jpg.webp",
    },
  ],
};

export function WisdomPalacePage() {
  return (
    <BuildingPage
      name={building.name}
      nameChinese={building.nameChinese}
      description={building.description}
      featuredImage={building.featuredImage}
      // galleryImages={building.galleryImages} // 如果需要也可以传入
      leftContent={<LeftPanel />}
      rightContent={<RightPanel />}
      relatedBuildings={building.relatedBuildings}
      type="wisdom-palace" // 指定类型以使用 WisdomPalaceDetail 布局
    />
  );
}
