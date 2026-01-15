import { BuildingPage } from "../BuildingPage";
import { Home, Leaf, StoreIcon } from "lucide-react";
import { PenTool, Hourglass, Users, Hammer } from "lucide-react";

/* ================= Left Content ================= */
const LeftPanel = () => {
  return (
    <div className="space-y-6 leading-relaxed text-stone-700">
      <h1 className="text-5xl font-bold text-stone-900 text-left">Main Hall</h1>

      <p className="mt-2 text-base text-stone-600 text-left">
        Buddhist Architecture, All / 2019-06-04
      </p>

      <p>
        The Gold Coast Dharma Realm, a branch monastery located in Australia, is currently
        constructing the Main Hall of Lengyan Sacred Temple. The monastics of the Dharma Realm hoped
        to design a one-of-a-kind landmark building imbued with profound Chinese cultural heritage.
        After extensive research and exploration, attention was drawn to the Golden Hall of
        Tōshōdai-ji, originally built during the Tang dynasty. The Golden (Sutra) Hall is the
        principal building of Tōshōdai-ji in Nara, Japan, founded by the renowned monk Venerable
        Jianzhen (Ganjin). Built in the Tang dynasty, its architectural style is simple yet
        majestic, with a concise and powerful structural expression, embodying a direct and
        unadorned Chan spirit.
      </p>

      <p>
        The Kondō is a wooden structure seven bays wide and four bays deep. The entire hall is 28
        meters long, 15 meters deep, and 16 meters high, with an East Asian hip roof and a
        one-bay-deep front porch. Between the upper and lower tie beams, short posts and a single
        bracket support the structure—a feature characteristic of the architectural style of the
        Northern and Southern Dynasties and early Tang periods. Structurally, the Kondō (Lecture
        Hall) of Tōshōdai-ji uses robust timbers, features deeply overhanging eaves, and employs
        bracket sets with clearly defined structural functions. The roof incorporates certain
        Japanese construction techniques, making its pitch slightly steeper. Overall, the building
        presents a majestic appearance that fully embodies the grandeur of the Tang dynasty. Tang
        architecture is notably simple: wooden beams are uncarved, the exterior conveys imposing
        grandeur, and the interior structure is straightforward yet powerful—qualities that resonate
        with Master Hsuan Hua's teachings, which emphasize truthfulness and practicality, profoundly
        moving the heart and perfectly aligning with the ethos of Jin'an Dharma Realm. The new main
        hall was designed with simplicity and dignity; its design concept and requirements were
        proposed by monastics of Jin'an Dharma Realm and realized by a Taiwanese architect based in
        Brisbane.
      </p>

      {/* <p className=" text-stone-600 font-bold">
        The Dharma does not arise alone; it relies on conditions to manifest.  
        The Dharma travels from East to West; ancient form, present embodiment.
      </p> */}

      {/* <h2 className="text-1xl font-bold "> 
  The Dharma does not arise alone; it relies on conditions to manifest. <br></br> 
  The Dharma travels from East to West; ancient form, present embodiment.</h2> */}

      <div className="border-l-4 !border-[#c9a050] bg-stone-100 px-6 py-4 rounded-r">
        <p className="text-black">
          The Dharma does not arise alone; it relies on conditions to manifest.
        </p>
        <p className="text-black">
          The Dharma travels from East to West; ancient form, present embodiment.
        </p>
      </div>

      <p>
        Moving this Tang-dynasty main hall from Japan to modern Australia was undoubtedly a
        tremendous challenge for the design team. How could traditional Tang-dynasty architecture be
        brought to life using modern construction methods in Australia, where labor and materials
        are relatively scarce? How to preserve the grand spirit of the Tang Dynasty while designing
        a modern main hall? What is the essence of ancient architecture, and what must be retained?
        Only by capturing this spirit could the team vividly bring Tang-dynasty architecture into
        the modern age.
      </p>

      <p>
        In the end, the design team focused on the hip-and-gable roof of the Kondo. The defining
        features of the Tang Dynasty's architectural style are concentrated mainly in the roof—such
        as the roof tiles, overhanging eaves, and chiwen roof ornaments. The challenge was how to
        recreate the effect of the overhanging eaves using modern woodworking techniques.
        Additionally, there are no engineers in Australia capable of crafting dougong brackets. The
        advantage of dougong is that small pieces of wood can be joined to form large load-bearing
        structures, enhancing weight capacity.
      </p>

      <p>
        To simplify the dougong design, the team referenced the Yingzao Fashi (Treatise on
        Architectural Methods) of the Song Dynasty to calculate the curvature of the main hall's
        roof and the angle of the overhanging eaves. Once the form was determined, it was integrated
        with local woodworking techniques to adapt to modern construction practices in Australia.
        The pillars were sized to match the actual weight of the main hall. Thanks to advancements
        in modern materials and construction methods, the modern roof is lighter than traditional
        ones. From a structural stress analysis, the pillars of the new main hall did not need to be
        as massive as those of the Toshodai-ji Kondo. Thus, the proportion of the pillars to the
        hall differs from that of the Kondo. Here, the design team did not rigidly adhere to the
        Kondo's proportions; instead, they embraced the Tang-dynasty architectural spirit of seeking
        truth and pragmatism, rejecting superficial ornamentation. Proceeding from a fact-based
        approach, they boldly adopted a new pillar-to-hall proportion. They also replaced the
        traditional swing doors with sliding doors—compact, flexible, space-saving, lightweight,
        easy to operate, and aesthetically pleasing, sliding doors are ideal for dividing
        high-ceilinged, spacious areas.
      </p>

      <p>
        Asuka tiles integrate the flat tiles and cylindrical tiles of traditional Chinese
        Tang-dynasty roof tiles into a single unit, creating a sense of holistic beauty. With their
        fully waterproof and windproof design, they can be installed using a completely dry
        construction method with tile hanging battens, eliminating the need for large amounts of
        cement mortar used in conventional Tang tile installation, which adds structural weight.
        This dry method drastically reduces construction time and costs, and is suitable for steep
        roof slopes.
      </p>

      <p>
        The Asuka tiles are finished in a silver-fumigated color that never fades, evoking a sense
        of solidity and simplicity. Again, they integrate Tang-dynasty flat and cylindrical tiles
        into a unified whole for a cohesive aesthetic. They are easy to install and resistant to
        disasters and strong winds, blending traditional beauty with modern functionality. Their
        fully waterproof and windproof design enables dry installation with hanging battens,
        overcoming the drawbacks of traditional Tang tile construction—excessive cement mortar use
        and increased load-bearing—and significantly cutting construction time and costs.
      </p>

      <p>
        Tang-dynasty architecture exudes confidence, eschewing carvings and relying solely on
        quality materials and exposed structural frames. In line with this, the new main hall's
        design emphasizes its mechanical structure; visitors can clearly see all the beam and pillar
        structures as they move through the hall. This design philosophy further inspired the
        adoption of green building principles.
      </p>

      <p>
        No air conditioning was installed. Considering the small number of permanent residents at
        the Dharma center, and to reduce maintenance work and costs for the resident monastics, the
        new main hall has no air conditioning. This not only saves electricity and construction
        costs but also reduces ongoing maintenance expenses. The Gold Coast has a subtropical
        maritime climate, with year-round sunshine and humid air. As it is located in the
        subtropics, winter temperatures range from 11 to 21 degrees Celsius, so cold is not a major
        concern; the primary focus is on cooling in summer.
      </p>

      <p>
        The silver-fumigated Asuka tiles reflect sunlight, and insulation cotton is laid beneath
        them to block heat transfer. Structurally, every effort was made to maximize natural
        cooling. The main hall faces northeast—(a note: the sun is in the north in Australia, and
        this is the direction of the Gold Coast's prevailing cool breezes)—so the entrance and exit
        doors were made extra large to optimize ventilation. For windless days, large fans with a
        diameter of 2.7 meters were installed, along with louvered windows.
      </p>

      <div className="border-l-4 !border-[#c9a050] bg-stone-100 px-6 py-4 rounded-r">
        <p className="text-black">Lengyan Dharma Assembly, aerial altar;</p>
        <p className="text-black">
          Myriad Buddhas gather like clouds, light illuminating without obstruction.
        </p>
      </div>

      {/* <p className="italic text-stone-600">
        Lengyan Dharma Assembly, aerial altar;  
        Myriad Buddhas gather like clouds, light illuminating without obstruction.
      </p> */}
      {/* <h2 className="text-2xl font-bold mt-10">Interior Design</h2> */}

      <p className="text-black font-bold"> Interior Design</p>
      <p>
        How to arrange the Buddha statues inside to reflect a modern aesthetic? The design
        emphasizes extremely simple lines. The walls are also streamlined—white walls paired with
        wooden structural elements. Since the bronze Buddha statues themselves feature carvings, the
        design team chose simple, unadorned bases to draw attention to the statues themselves.
      </p>

      <p>
        The design of the stone wall behind the Buddha statues is also ingenious. The monastics
        hoped to use a simple marble wall as the backdrop for the main Buddha statue. As the
        statue's base was already very minimal, they wanted the stone wall to be soft to avoid
        excessive monotony. To enhance the sense of space in the main hall, they hoped the stone
        wall would evoke a feeling of depth. It also needed natural veining to leave room for
        imagination, so that everyone who saw it might have different thoughts and their creativity
        might be inspired. The design team searched far and wide for suitable marble but was
        unsatisfied with all options—until they unexpectedly found a local variety that was both
        affordable and met their requirements. Coincidentally, the name of this marble includes the
        character "Jin" (gold), the same as in "Gold Coast."
      </p>

      <p>
        As the main structure of Lengyan Holy Temple, the main hall naturally reflects the
        characteristics of the Lengyan Dharma Assembly. In its design, based on the description of
        the Lengyan Dharma altar in the Shurangama Sutra, the team creatively designed two aerial
        "altars" on the suspended ceilings of the east and west sides. Drawing inspiration from
        traditional mandala designs, they projected this concept onto the roof, presenting it
        inverted in the air. Eight crystal hemispheres are used to create a play of interreflecting
        light.
      </p>

      <p>
        It is not uncommon for Buddhist halls to adopt designs of the Thousand Buddha Grottoes or
        Ten Thousand Buddha Grottoes, either as murals on the four walls or as sculptures standing
        around the hall. However, given the new main hall's minimalist and modern style, excessive
        decoration on the four walls would compromise the overall effect and distract attention from
        the main Buddha statue. Therefore, the design team ingeniously proposed the concept of the
        "Ten Thousand Buddhas in the Air." Small glazed Buddha statues are displayed on 16 pillars
        hanging vertically from the intersections of the beam frames. Each pillar has eight layers
        of trays, and each tray has eight sides for placing eight Buddha statues. Light shines
        through the glazed statues, filling the main hall with the presence of ten thousand Buddhas
        and unobstructed radiance.
      </p>

      <div className="border-l-4 !border-[#c9a050] bg-stone-100 px-6 py-4 rounded-r">
        <p className="text-black">The Dharma is not empty;</p>
        <p className="text-black">
          it responds to karmic affinities, adapts to local conditions, and remains unchanging yet
          flexible.
        </p>
      </div>

      <p className="text-black font-bold"> Environment Chapter</p>

      <p>
        The Dharma is true and unfalsifiable; when the corresponding karmic affinities ripen, it
        will naturally flourish. Australia is a meeting place of Chinese and Western cultures. Since
        the Venerable Master forged karmic connections here fifty years ago, the nation has
        prospered, its people have become affluent, and Buddhism in Australia has thrived and
        continues to develop. The Venerable Master's teachings have long taken root in Australia,
        and now the conditions are met and the karmic affinities are nearing maturity. As Gold Coast
        Dharma Realm undertakes the construction of the Mahavira Hall of Lengyan Holy Temple, it
        upholds the Venerable Master's guiding philosophy for Dharma center construction, striving
        to adapt to local conditions and remain unchanging yet flexible. Minimizing alterations to
        the local natural environment not only aligns with contemporary environmental protection,
        the idea of building a harmonious ecosystem and sustainable development in coexistence with
        the environment, but also saves labor, materials, time and resources. This has resulted in
        the design of a unique Mahavira Hall that embodies the characteristics of Gold Coast Dharma
        Realm. See the design drawings.
      </p>

      <p>
        Gold Coast Dharma Realm is situated in a hilly landscape within a nature reserve, which
        protects a rare and endangered bird—the Glossy Black-Cockatoo. Also known as the Black
        Glossy Cockatoo, the Glossy Black-Cockatoo (scientific name: Calyptorhynchus lathami) was
        listed on the International Union for Conservation of Nature (IUCN) Red List of Threatened
        Species in 2012. Males have a dark brown plumage, with a charcoal-fumed dark brown head,
        nape, chest and abdomen, black wings and back, and broad red banded feathers on the inner
        tail feathers; their beaks are grayish-black. Mature females have a light gray beak, yellow
        feathers under the wings, and tail feathers with a gradient of colors from light red and
        orange to yellow.
      </p>

      <p>
        The Glossy Black-Cockatoo's staple food is the seeds of the she-oak tree. Furthermore, its
        living habit is to feed exclusively on the seeds of a single tree. Local animal conservation
        experts explain that if this tree is cut down, the Glossy Black-Cockatoos that rely on it
        will be at a loss and starve to death. (No wonder they are endangered! So the editor reminds
        children not to be picky eaters.) Therefore, the she-oak tree is a key protected species in
        the reserve, and felling is strictly prohibited.
      </p>

      <p>
        The monastics joked, "Other monasteries have feng shui masters to choose locations. We also
        have a feng shui master who can fly—it's a bird." In the initial planning, the main hall was
        to be situated on the central axis of the Dharma center, with a square in front. However,
        finding a suitable site for the main hall within this nature reserve was no easy task.
        Ultimately, the main hall was not built on the central axis, and its final position was
        moved three feet from the original design. Additionally, ecologists required that all trees
        in front of the Buddhist hall be preserved, so the main hall is fronted by a dense forest
        instead of a square. The monastics at Gold Coast Dharma Realm said, "This main hall may
        differ from the grand, traditional main halls in people's minds; it is more like a
        meditation hall in a dense forest." After seeing the design of the main hall, a fellow
        practitioner expressed the following sentiments: Being able to construct the main hall
        without cutting down trees or harming the birds' habitat symbolizes that Buddhas and
        Bodhisattvas attain Buddhahood by accommodating all sentient beings and refraining from
        harming them. Reducing the size of the front courtyard symbolizes that Buddhas and
        Bodhisattvas are willing to open their broad minds to embrace all sentient beings without
        distinction (the trees that could not be moved). The main hall cannot be seen directly; it
        must be discovered faintly through the trees. The main hall is like our Buddha-nature—not
        everyone can easily find it, even though it has always been there. It requires a certain
        level of concentration to gradually unearth it. Furthermore, there is no need to worry about
        not reaching the main hall: as long as everyone who sees it follows the paved path (the
        Buddha's teachings) and proceeds with a sincere heart (as the Venerable Master often said:
        "A sincere heart is the Dharma center"), they will ultimately reach the main hall
        (Buddhahood) smoothly.
      </p>
    </div>
  );
};

/* ================= Right Content ================= */
const RightPanel = () => {
  return (
    <div className="p-6">
      <strong className="text-xl block mb-2">Gold Coast Dharma Realm Main Hall</strong>

      <p className="italic text-stone-600 mb-6">
        The Main Hall of the Gold Coast Dharma Realm draws its inspiration from the Golden Hall of
        Tōshōdai-ji, built during the Tang dynasty by Venerable Master Jianzhen. The building adopts
        a steel–timber hybrid structure, with translucent side elevations and a roof clad in Asuka
        tiles. Enshrined within the hall are three bronze statues of the Avataṃsaka Three Sages:
        Vairocana Buddha at the center, Mañjuśrī Bodhisattva on the left, and Samantabhadra
        Bodhisattva on the right. The sculptural style is modeled after the Tang-dynasty carvings of
        the Longmen Grottoes in Luoyang. The overall architectural style is simple and dignified,
        with a concise and powerful structural expression, embodying a direct and unadorned Chan
        spirit.
      </p>
      <div className="space-y-4">
        <div>
          <strong className="text-lg">Designer</strong>
          <div className="flex items-center gap-2 mt-1">
            <PenTool size={18} />
            Michael Chen
          </div>
        </div>

        <div>
          <strong className="text-lg">Date</strong>
          <div className="flex items-center gap-2 mt-1">
            <Hourglass size={18} />
            2016–2017
          </div>
        </div>

        <div>
          <strong className="text-lg">Buddha Images</strong>
          <div className="flex items-center gap-2 mt-1">
            <Users size={18} />
            Avataṃsaka Three Sages
          </div>
        </div>

        <div>
          <strong className="text-lg">Structure</strong>
          <div className="flex items-center gap-2 mt-1">
            <StoreIcon size={18} />
            Steel–timber hybrid
          </div>
        </div>

        <div>
          <strong className="text-lg">Materials</strong>
          <div className="flex items-center gap-2 mt-1">
            <Leaf size={18} />
            Asuka tiles, hardwood, Queensland marble
          </div>
        </div>

        <div>
          <strong className="text-lg">Contractor</strong>
          <div className="flex items-center gap-2 mt-1">
            <Hammer size={18} />
            Bruce Clark
          </div>
        </div>

        <div>
          <strong className="text-lg">Design Inspiration</strong>
          <div className="flex items-center gap-2 mt-1">
            <Home size={18} />
            The Golden Hall of Tōshōdai-ji built by Venerable Master Jianzhen
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

/* ================= Page Data ================= */
const building = {
  name: "The Main Hall of GCDR",
  description:
    "The Main Hall is the spiritual heart of the Gold Coast Dharma Realm, inspired by Tang-dynasty architecture.",
  featuredImage: {
    src: "/assets/buildings/the-main-hall-of-gcdr/751-Dharma-Realm-Temple-42-edited.jpg.webp",
    alt: "The Main Hall of GCDR",
  },
  galleryImages: [
    { src: "/assets/buildings/the-main-hall-of-gcdr/main_hall_12.jpg", alt: "Main Hall" },
    { src: "/assets/buildings/the-main-hall-of-gcdr/main_hall_6-scaled.jpg", alt: "Main Hall" },
    { src: "/assets/buildings/the-main-hall-of-gcdr/main_hall_3-scaled.jpg", alt: "Main Hall" },
    { src: "/assets/buildings/the-main-hall-of-gcdr/main_hall_4-scaled.jpg", alt: "Main Hall" },
    { src: "/assets/buildings/the-main-hall-of-gcdr/main_hall_5-scaled.jpg", alt: "Main Hall" },
    { src: "/assets/buildings/the-main-hall-of-gcdr/main_hall_7.jpg", alt: "Main Hall" },

    { src: "/assets/buildings/the-main-hall-of-gcdr/main_hall_9.jpg", alt: "Main Hall" },
    { src: "/assets/buildings/the-main-hall-of-gcdr/main_hall_10.jpg", alt: "Main Hall" },
    { src: "/assets/buildings/the-main-hall-of-gcdr/main_hall_11.jpg", alt: "Main Hall" },

    { src: "/assets/buildings/the-main-hall-of-gcdr/main_hall_1.jpg", alt: "Main Hall" },

    { src: "/assets/buildings/the-main-hall-of-gcdr/main_hall_8.jpg", alt: "Main Hall" },
  ],
  // relatedBuildings: [
  //   { slug: "dining-room", name: "Dining Room", image: "/assets/buildings/dinning-room/dinning_8-scaled.jpg" },
  //   { slug: "lotus-pool", name: "Lotus Pool", image: "/assets/buildings/lotus-pool/lotus_1.jpg" },
  //   { slug: "wisdom-palace", name: "Wisdom Palace", image: "/assets/buildings/wisdom-palace/image_4.jpg" },
  // ],
  relatedBuildings: [
    {
      slug: "dinning-room",
      name: "The Five Contemplations Hall",
      // nameChinese: "五观堂",
      //description: "The dining hall where practitioners gather for meals, practicing mindfulness and gratitude with each meal.",
      image: "/assets/buildings/main-gate/五观堂-770x433.jpg.webp",
    },
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
  ],
};

/* ================= Export Page ================= */
export function TheMainHallPage() {
  return (
    <BuildingPage
      name={building.name}
      description={building.description}
      featuredImage={building.featuredImage}
      galleryImages={building.galleryImages}
      leftContent={<LeftPanel />}
      rightContent={<RightPanel />}
      relatedBuildings={building.relatedBuildings}
      type="dining-room" //"the-main-hall-of-gcdr"
    />
  );
}
