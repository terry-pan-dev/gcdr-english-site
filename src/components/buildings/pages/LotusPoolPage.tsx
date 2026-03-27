import { BuildingPage } from "../BuildingPage";
//import { Clock, Truck, Layers, MapPin } from "lucide-react";
import { Clock, DropletOff, ConstructionIcon, Leaf } from "lucide-react";

const LeftPanel = () => {
  return (
    <div className="space-y-6 leading-relaxed text-stone-700">
      {/* ===== Left Content Header ===== */}
      <div className="mb-6">
        <h1 className="text-5xl font-bold text-stone-900 text-left">Lotus Pool</h1>

        <p className="mt-2 text-base text-stone-600 text-left">Natural Scenery, All / 2019-06-04</p>
      </div>

      <div className="border-l-4 !border-[#c9a050] bg-stone-100 px-6 py-4 rounded-r">
        <p className="text-black">
          The sound of flowing water returns the hearing inward to one’s own nature;
        </p>
        <p className="text-black ">In sudden awakening, all dissolves into the inconceivable.</p>
      </div>

      <p>
        Gold Coast Dharma Realm's Lotus Pool began construction in 2020 on the site of a former fire
        reservoir. It was undertaken by Patrick, a permaculture water feature expert from the
        Sunshine Coast, and his team. The Lotus Pool is shaped like an irregular precious gourd and
        is connected by a small stream to a waterfall that flows from a dragon head. Four jet
        outlets are installed around the Pool to push fallen leaves on the water surface toward the
        waterfall at the Pool's exit. Below the waterfall is a layer of pebbles that filters the
        leaves, followed by a storage reservoir and pump station. The stones used for the entire
        Pool are of two types: blue stone excavated during the construction of Gold Coast Dharma
        Realm, and volcanic rock produced by volcanic eruptions on the Gold Coast 20 million years
        ago.
      </p>
      <p>
        A few water lilies and lotus flowers are planted in the ponl, and several goldfish have been
        released into it. A walking path is reserved around the Lotus Ponl for people to practice
        walking meditation. Beside the pool stands a white marble Buddha statue, dignified in form
        and vivid in its lines. Additionally, a waterside pavilion has been built, equipped with a
        one-meter-wide bench for meditation.
      </p>
    </div>
  );
};

//import { Clock, Truck, Layers, MapPin,Cog, Droplets, Leaf, User, Users, Hammer, PenTool, Home, Store, Book, Hourglass } from "lucide-react";

const RightPanel = () => {
  return (
    <div className="p-6 space-y-6">
      <strong className="text-2xl block border-b-2 border-black pb-2">Lotus Pool</strong>
      <p className="italic text-stone-600">
        The Lotus Pool has been completed, but items such as Buddhist altars and interior
        furnishings are still needed. Currently, landscaping work is underway around the main hall
        and is expected to take two months. The plan is to use native Australian plants to create an
        Eastern-style dry landscape garden around the main hall, which is sure to be very
        distinctive.
      </p>
      <div className="space-y-4">
        <div>
          <strong className="text-lg">Construction Date</strong>
          <div className="flex items-center gap-2 mt-1">
            <Clock size={18} /> April 2020
          </div>
        </div>
        <div>
          <strong className="text-lg">Contractor</strong>
          <div className="flex items-center gap-2 mt-1">
            <ConstructionIcon size={18} /> Patrick Handley Waterscapes
          </div>
        </div>
        <div>
          <strong className="text-lg">Waterproofing</strong>
          <div className="flex items-center gap-2 mt-1">
            <DropletOff size={18} /> Waterproof membrane
          </div>
        </div>
        <div>
          <strong className="text-lg">Materials</strong>
          <div className="flex items-center gap-2 mt-1">
            <Leaf size={18} /> Bluestone, volcanic stone
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
  name: "Lotus Pool",
  nameChinese: "莲池",
  description:
    "A serene lotus pool designed for meditation and reflection, featuring a dragon waterfall.",
  featuredImage: {
    src: "/assets/buildings/lotus-pool/pool_1-scaled.jpg",
    alt: "Lotus pool overview",
  },
  galleryImages: [
    // { src: "/assets/buildings/lotus-pool/pool_2-scaled.jpg", alt: "Lotus pool view" },
    // { src: "/assets/buildings/lotus-pool/pool_3-scaled.jpg", alt: "Lotus pool detail" },
    // { src: "/assets/buildings/lotus-pool/pool_4-scaled.jpg", alt: "Lotus pool reflection" },
    { src: "/assets/buildings/lotus-pool/pool_5-scaled.jpg", alt: "Lotus pool scene" },
    { src: "/assets/buildings/lotus-pool/pool_6-scaled.jpg", alt: "Lotus pool view" },
    { src: "/assets/buildings/lotus-pool/pool_7-2-scaled.jpg", alt: "Lotus pool detail" },
    { src: "/assets/buildings/lotus-pool/pool_8-2-scaled.jpg", alt: "Lotus pool scene" },
  ],
  relatedBuildings: [
    // {  slug: "the-main-hall-of-gcdr",name: "The Main Hall of GCDR", nameChinese: "舍利塔", image: "/assets/buildings/pagoda/shelita_1-scaled.jpg", description: "The Vajra Relic Stupa." },
    {
      slug: "the-main-hall-of-gcdr",
      name: "The Main Hall of GCDR",
      // nameChinese: "大殿",
      // description: "The main hall is the heart of the temple, where ceremonies, teachings, and meditation practices take place.",
      image: "/assets/buildings/main-gate/751-Dharma-Realm-Temple-42-edited-770x433.jpg.webp",
    },
    {
      slug: "outergate",
      name: "Outer Gate",
      //  nameChinese: "外山门",
      // description: "The outer gate welcomes visitors to the temple grounds, marking the entrance to a place of peace and spiritual practice.",
      image: "/assets/buildings/lotus-pool/rsz_外山门-370x208.png.webp",
    },

    {
      slug: "main-gate",
      name: "Main Gate",
      //nameChinese: "山门",
      //description: "The main gate serves as the primary entrance to the temple complex, embodying traditional Buddhist architecture.",
      image: "/assets/buildings/dinning-room/1-Main-Gate-Overview-770x433.jpg.webp",
    },
  ],
};

export function LotusPoolPage() {
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
