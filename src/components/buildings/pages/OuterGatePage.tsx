import { BuildingPage } from "../BuildingPage";
import { Clock, MapPin, Gem, Brush, StoreIcon } from "lucide-react";

const LeftPanel = () => {
  return (
    <div className="space-y-6 leading-relaxed text-stone-700">
      <h1 className="text-5xl font-bold text-stone-900 text-left">Outer Mountain Gate</h1>

      <p className="mt-2 text-base text-stone-600 text-left">All / 2022-08-10</p>

      <div className="border-l-4 !border-[#c9a050] bg-stone-100 px-6 py-4 rounded-r ">
        <p className="text-black font-bold">
          The true Buddha is not to be sought outside the mind;
        </p>
        <p className="text-black font-bold">This very body is the true place of the Way.</p>
      </div>

      <div className="bg-stone-100 px-6 py-4 rounded italic mx-auto max-w-xl text-center text-black">
        <p>Upon arriving at the Gold Coast, worldly concerns fall away;</p>
        <p>having ascended the hall, one should further enter the inner chamber.</p>
        <p>Ascending further, wondrous peaks appear of themselves;</p>
        <p>only by advancing again may one reach the summit.</p>
      </div>

      <p>
        On the left side of the outer mountain gate is a stone wall carved with the complete text of
        the
        <em> Prajñāpāramitā Heart Sūtra</em>, incised and gilded. The calligraphy is free-flowing
        and graceful, written in the style of Zhao Mengfu of the Yuan dynasty. On the right-side
        stone wall are carved the four Chinese characters “Gold Coast Dharma Realm” along with its
        English name. Ancient Chinese calligraphic art, carved into a single piece of natural stone
        and combined with modern design, forms a distinctive landmark of the Gold Coast Dharma
        Realm.
      </p>

      <p>
        The rear mountain gate bears the English name Gold Coast Dharma Realm, preceded by the
        character “Oṃ” handwritten by Venerable Master Hsuan Hua together with the Sanskrit seed
        syllables of the Śūraṅgama Mantra. On the wall of the dining hall behind it also hangs a
        golden “Oṃ,” two meters square and suspended five meters above the ground, visible even from
        outside the mountain gate.
      </p>

      <div className="text-center italic pt-4 text-black">
        <p>Only through wondrous wisdom can one reach the other shore;</p>
        <p>with a true mind, one naturally accords with the source of awakening.</p>
      </div>
      <p>
        The <em>Heart Sutra</em>, or<em> Prajñāpāramitā Hṛdaya</em>, originates from the{" "}
        <em>Larger Prajñāpāramitā Sūtra</em>. It is the most widely circulated and representative
        scripture in Mahayana Buddhism, best expressing the concepts of emptiness and wisdom.
        Prajñāpāramitā (Sanskrit: Prajñāpāramitā): Here, prajñā is directly translated as "wisdom,"
        while pāramitā means "perfection" or "reaching the other shore," interpreted as achieving
        ultimate accomplishment, transcending limits, and often abbreviated as "crossing over." It
        is the foundation for attaining Buddhahood. Hṛdaya (Sanskrit: Hṛdaya) here refers to the
        "essence" or "core." This sutra is the essence of the Prajñāpāramitā scriptures, hence its
        name, the Heart of <em>Prajñāpāramitā Sutra</em>. "What is prajñā? Prajñā includes textual
        prajñā, contemplative prajñā, and true-suchness prajñā. From textual prajñā arises
        contemplative prajñā; through contemplative prajñā, one aligns with the true-suchness prajñā
        of the fundamental nature. This prajñā is also called ultimate wisdom, wondrous wisdom, or
        thorough wisdom. Thorough wisdom means this wisdom reaches the very end—it can be called
        wisdom that arrives home, the wisdom of a Buddha, or the true mind. This true mind is
        wisdom, and wisdom is this true mind. 'Prajñā' itself can be translated as the 'true mind.'
        The <em>Mahāprajñāpāramitā Sūtra</em> could be called the Great True Mind Sutra, not about a
        false mind but entirely about the true mind, the practical and wondrous principle. As for
        this <em>Heart Sutra</em>, it is the heart within the heart of prajñā. Although it consists
        of only 260 characters, within the Prajñāpāramitā scriptures, it is like the heart, the
        core, hence called the heart within the heart. Now, with the addition of the word 'heart' in
        its title, it signifies the heart within the heart of the heart—the true mind within the
        true mind. Thus, with this word 'heart,' it is succinctly called the<em> Heart Sutra</em>."
        — Venerable Master Hsuan Hua
      </p>
    </div>
  );
};

const RightPanel = () => {
  return (
    <div className="p-6 space-y-6">
      <strong className="text-2xl block border-b-2 border-black pb-2">Outer Mountain Gate</strong>
      <p className="italic text-stone-600">
        On the left side of the outer mountain gate is a stone wall carved with the complete text of
        the Prajñāpāramitā Heart Sūtra, incised and gilded. The calligraphy is free-flowing and
        graceful, written in the style of Zhao Mengfu of the Yuan dynasty. On the right-side stone
        wall are carved the four Chinese characters “Gold Coast Dharma Realm” along with its English
        name.
      </p>
      <div className="space-y-4">
        <div>
          <strong className="text-lg">Date</strong>
          <div className="flex items-center gap-2 mt-1">
            <Clock size={18} /> December 2020
          </div>
        </div>
        <div>
          <strong className="text-lg">Material</strong>
          <div className="flex items-center gap-2 mt-1">
            <Gem size={18} /> Shandong bluestone
          </div>
        </div>
        <div>
          <strong className="text-lg">Origin</strong>
          <div className="flex items-center gap-2 mt-1">
            <MapPin size={18} /> Jiaxiang, Jining, Shandong
          </div>
        </div>
        <div>
          <strong className="text-lg">Production Unit</strong>
          <div className="flex items-center gap-2 mt-1">
            <StoreIcon size={18} /> Guoxiang Stone Carving
          </div>
        </div>
        <div>
          <strong className="text-lg">Calligraphy</strong>
          <div className="flex items-center gap-2 mt-1">
            <Brush size={18} /> Zhao Mengfu
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
  name: "Outer Mountain Gate",
  nameChinese: "外山门",
  description:
    "The main entrance featuring the Heart Sutra stone wall and the Four Heavenly Kings.",
  featuredImage: {
    src: "/assets/buildings/outergate/rsz_外山门.png.webp",
    alt: "Outer Gate entrance",
  },
  galleryImages: [
    {
      src: "/assets/buildings/outergate/2-Stone-Wall-Sign-Night.jpg",
      alt: "Stone wall sign at night",
    },
    {
      src: "/assets/buildings/outergate/3-Stone-Wall-Heart-Sutra-.jpg",
      alt: "Heart Sutra inscription",
    },
    {
      src: "/assets/buildings/outergate/3-Stone-Wall-Heart-Sutra-Night2.jpg",
      alt: "Heart Sutra at night",
    },
  ],
  relatedBuildings: [
    {
      slug: "lotus-pool",
      name: "Lotus Pool",
      //nameChinese: "莲花池",
      //description: "A serene lotus pool that reflects the beauty and purity of Buddhist practice, creating a peaceful atmosphere.",
      image: "/assets/buildings/dinning-room/WeChat-Screenshot_20220601121508-770x433.png.webp",
    },

    {
      slug: "wisdom-palace",
      name: "Manjushri Hall",
      //nameChinese: "文殊殿",
      // description: "The Wisdom Palace is dedicated to Manjushri, the Bodhisattva of Wisdom, inspiring practitioners on the path to enlightenment.",
      image: "/assets/buildings/dinning-room/文殊殿-770x433.jpg.webp",
    },

    {
      slug: "pagoda",
      name: "Pagoda",
      // nameChinese: "舍利塔",
      // description: "The pagoda stands as a sacred monument, housing relics and serving as a focal point for devotion and reverence.",
      image: "/assets/buildings/lotus-pool/she_li_ta_1-770x433.jpg.webp",
    },
  ],
};

export function OuterGatePage() {
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

// export function OuterGatePage() {
//   return (
//     <BuildingPage
//       name={building.name}
//       nameChinese={building.nameChinese}
//       description={building.description}
//       images={building.images}
//     />
//   );
// }
