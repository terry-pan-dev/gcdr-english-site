import { BuildingPage } from "../BuildingPage";
import { Clock, Home, Users, Building2, Clock10 } from "lucide-react";

const LeftPanel = () => {
  return (
    <div className="space-y-6 leading-relaxed text-stone-700">
      {/* ===== Left Content Header ===== */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-stone-900 text-left">
          The Five Contemplations Hall
        </h1>

        <p className="mt-2 text-base text-stone-600 text-left">
          Buddhist Architecture, All / 2019-06-04
        </p>
      </div>

      <p className="text-center text-lg  italic text-black">
        The practice of constant joy, gentleness, and patience, <br></br>residing in
        loving-kindness, compassion, sympathetic joy, and equanimity.
      </p>

      <div className="border-l-4 !border-[#c9a050] bg-stone-100 px-6 py-4 rounded-r">
        <p className="text-black">
          When porridge is gone and rice arrives, do not let light and shadow cover your face;
        </p>
        <p className="text-black">
          When the bell rings and the wooden board sounds, always keep life and death in mind.
        </p>
      </div>

      <p>
        The Gold Coast Dharma Realm New Five Contemplations Hall was completed during the 2020
        pandemic. It is currently the only steel-frame brick-and-stone building in the Jin'an Dharma
        Realm, with an interior that can accommodate 200 people for meals. The Five Contemplations
        Hall has a polished cement-and-stone floor, spotless; the interior space and tables and
        chairs are mainly in light tones, and the walls are covered with emerald green tiles, giving
        it a clean and elegant appearance. The kitchen is fully equipped, clean, and tidy.
      </p>

      <p>
        The Five Contemplations Hall is the place where the monastic community eats in a Buddhist
        temple; it is also called a dining hall.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Venerable Master Hsuan Hua's Teaching</h2>

      <p>
        Left-home people make three recollections before taking their meal. They start the meal by
        drinking three spoonfuls of soup, making one recollection with each spoonful. The first
        recollection is, "I vow to cut off all evil." This includes not have a mind of
        discrimination on the taste of food when we eat. We do not find this one has a better taste
        and the other one has no taste. Just eat whatever food is served. Don't be picky or indulge
        in idle thoughts on what you eat. Don't think, "This place is not nice at all. We're not
        allowed to talk when we eat, and there's no freedom. It's like being in jail. I only came to
        bow to the Buddha, and there are so many rules to follow. It's no fun at all!" If you have
        such thoughts, you won't be able to digest your food. Don't always look at other people's
        faults. "If you always see the faults of others, then you haven't put an end to your own
        suffering." Why don't you reflect upon and examine yourself? The second recollection is, "I
        vow to cultivate all good." We should vow to correct all bad habits and faults. Cultivating
        the Way is nothing more than "doing no evil and practicing all good." The third recollection
        is, "I vow to save all living beings." We vow to help all living beings leave suffering,
        attain bliss, and end birth and death. During the meal, we should also make the five
        contemplations:
      </p>

      <ol className="list-decimal pl-8 space-y-3">
        <li>
          Considering the amount of work involved in bringing the food to the table. Contemplate
          whether we have the merit and virtue to accept this offering. Then consider how much
          energy the farmers expended in planting and harvesting the crops. Think about all the
          different stages of preparation the food has gone through before it reaches our plate.
          None of it comes easily.
        </li>
        <li>
          Reflect on whether or not ones' virtuous conduct is sufficient to entitle one to receive
          this offering. Have we perfected our virtuous conduct? Do we deserve to accept this
          meal?{" "}
        </li>
        <li>
          Guard the mind from transgressions, principally that of greed. We must watch over our own
          mind and keep it from errors and greedy thoughts. We shouldn't help ourselves to more of
          the good food while not touching food that is not as appetizing. In other words, we
          shouldn't be picky about food. Whether it tastes good or not, it's food all the same. This
          is our principle.
        </li>
        <li>
          {" "}
          Regard the food as medicine to prevent the body from collapsing. Why do we need to eat? We
          should regard the food as medicine that provides energy for our body. Just as cars cannot
          run without gasoline, people cannot survive without food. We eat not for the taste of the
          food but for curing hunger.
        </li>
        <li>
          This food is taken only in order to accomplish the Way. We eat not because we want to
          enjoy good food, but because we want to cultivate our Dharma body and wisdom life so as to
          accomplish the Way.
        </li>
      </ol>

      <p>
        These five contemplations are guidelines to be observed when we eat. They should also be
        applied to our other daily activities, such as dressing and sleeping. We shouldn't casually
        go through life in a muddled manner, not knowing why we eat, wear clothes, and sleep. These
        are all essential matters, and we should understand them very clearly.
      </p>
      {/* <p>
        The New Five-Contemplations Hall of Golden Shore Dharma Realm was completed in 2020 during the COVID-19 pandemic. It is currently the only steel-framed brick-and-stone structure within the Golden Shore Dharma Realm and can accommodate up to 200 people for communal meals.
        The hall features polished cement terrazzo flooring, immaculate and dust-free. The interior space and furnishings are designed in light, gentle tones, complemented by emerald-green ceramic tile walls, creating an atmosphere of purity, serenity, and elegance. The kitchen facilities are fully equipped, clean, and well maintained.
        The Five-Contemplations Hall is the place where the monastic community gathers to take meals in a Buddhist monastery. It is also known as the Dining Hall (Zhai Tang).
      </p> */}
    </div>
  );
};

/* 右侧信息栏（JSX，而不是字符串） */
const RightPanel = () => {
  return (
    <div
      style={{
        width: "100%",
        //backgroundColor: "#f9f9f9",
        padding: "24px",
        borderRadius: "8px",
        //border: "1px solid #e5e5e5",
      }}
    >
      <div>
        <strong style={{ fontSize: "22px" }}>The Five Contemplations Hall</strong>
        <br />
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "2px solid rgba(0, 0, 0, 1)",
          margin: "1rem 0",
          padding: 0,
        }}
      />

      <p
        style={{
          marginBottom: "20px",
          fontStyle: "italic",
          color: "#555",
        }}
      >
        The New Five-Contemplations Hall of Golden Shore Dharma Realm was completed in 2020 during
        the COVID-19 pandemic. It is currently the only steel-framed brick-and-stone structure
        within the Golden Shore Dharma Realm and can accommodate up to 200 people for communal
        meals. The hall features polished cement terrazzo flooring, immaculate and dust-free. The
        interior space and furnishings are designed in light, gentle tones, complemented by
        emerald-green ceramic tile walls, creating an atmosphere of purity, serenity, and elegance.
        The kitchen facilities are fully equipped, clean, and well maintained.
      </p>

      <div style={{ lineHeight: 2 }}>
        <div>
          <strong style={{ fontSize: "20px" }}>Completion Date</strong>
          <br />
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Clock size={16} />
            December 2020
          </span>
        </div>

        <div>
          <strong style={{ fontSize: "20px" }}>Opening Date</strong>
          <br />
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Clock10 size={16} />
            September 2021
          </span>
        </div>

        <div>
          <strong style={{ fontSize: "20px" }}>Construction Company</strong>
          <br />
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Building2 size={16} />
            Bruce Clark
          </span>
        </div>

        <div>
          <strong style={{ fontSize: "20px" }}>Structure</strong>
          <br />
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Home size={16} />
            Steel-frame, brick, and stone
          </span>
        </div>

        <div>
          <strong style={{ fontSize: "20px" }}>Capacity</strong>
          <br />
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Users size={16} />
            200 People
          </span>
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
  name: "Dining Room",
  nameChinese: "五观堂",
  description:
    "The Five Contemplations Hall is the place where the monastic community eats in a Buddhist temple; it is also called a dining hall.",
  featuredImage: {
    src: "/assets/buildings/dinning-room/五观堂-2048x1536.jpg.webp",
    alt: "Dining room interior",
  },
  galleryImages: [
    {
      src: "/assets/buildings/dinning-room/dinning_5-scaled.jpg",
      alt: "Dining room interior view",
    },
    { src: "/assets/buildings/dinning-room/dinning_6-scaled.jpg", alt: "Dining room architecture" },
    { src: "/assets/buildings/dinning-room/dinning_7-scaled.jpg", alt: "Dining room space" },
    { src: "/assets/buildings/dinning-room/dinning_8-scaled.jpg", alt: "Dining room space" },
    { src: "/assets/buildings/dinning-room/dinning_1-scaled.jpg", alt: "Dining room view" },
    { src: "/assets/buildings/dinning-room/dinning_2-scaled.jpg", alt: "Dining room view" },
    { src: "/assets/buildings/dinning-room/dinning_3-scaled.jpg", alt: "Dining room space" },
    { src: "/assets/buildings/dinning-room/dinning_4-scaled.jpg", alt: "Dining room detail" },
  ],

  relatedBuildings: [
    {
      slug: "main-gate",
      name: "Main Gate",
      //nameChinese: "山门",
      //description: "The main gate serves as the primary entrance to the temple complex, embodying traditional Buddhist architecture.",
      image: "/assets/buildings/dinning-room/1-Main-Gate-Overview-770x433.jpg.webp",
    },

    {
      slug: "wisdom-palace",
      name: "Manjushri Hall",
      //nameChinese: "文殊殿",
      // description: "The Wisdom Palace is dedicated to Manjushri, the Bodhisattva of Wisdom, inspiring practitioners on the path to enlightenment.",
      image: "/assets/buildings/dinning-room/文殊殿-770x433.jpg.webp",
    },

    {
      slug: "lotus-pool",
      name: "Lotus Pool",
      //nameChinese: "莲花池",
      //description: "A serene lotus pool that reflects the beauty and purity of Buddhist practice, creating a peaceful atmosphere.",
      image: "/assets/buildings/dinning-room/WeChat-Screenshot_20220601121508-770x433.png.webp",
    },
  ],
};

export function DiningRoomPage() {
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
