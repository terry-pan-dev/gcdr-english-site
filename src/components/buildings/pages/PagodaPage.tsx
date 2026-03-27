import { BuildingPage } from "../BuildingPage";
import { Clock, MapPin, Brush, Cone, SquarePen } from "lucide-react";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
const LeftPanel = () => {
  // 定义两个独立的状态
  const [showDetails1, setShowDetails1] = useState(false);
  const [showDetails2, setShowDetails2] = useState(false);

  return (
    <div className="space-y-6 leading-relaxed text-stone-700">
      <h1 className="text-5xl font-bold text-stone-900 text-left">Vajra Relic Stupa</h1>

      <p className="mt-2 text-base text-stone-600 text-left">
        Buddhist Architecture, All / 2019-06-04
      </p>

      <div className="border-l-4 !border-[#c9a050] bg-stone-100 px-6 py-4 rounded-r ">
        <p className="text-black font-bold">
          If there are good men or good women who circumambulate this Buddha stupa to the right,
          make prostrations, or make offerings to it, they shall receive a prediction of
          unsurpassed, complete enlightenment and shall not regress. All past obstacles and all
          karmic offenses shall be completely eradicated.
        </p>
        <p className="text-sm mt-2 font-medium">— The Sūtra of the Unstained Pure Light Dhāraṇī</p>
      </div>

      <p>
        On the sixteenth day of the third lunar month in 2022 (April 16th on the Gregorian
        calendar), the holy birthday of Cundi Bodhisattva and also the birthday of Venerable Master
        Hsuan Hua, Gold Coast Dharma Realm in Australia held a commemorative Dharma assembly for the
        Venerable Master's birthday. On this auspicious day, the Venerable Master's relics were
        respectfully welcomed to be enshrined in the newly completed Vajra Relic Pagoda. The day was
        supremely auspicious and sunny. Inside the main hall of Leng Yan Holy Temple at Gold Coast
        Dharma Realm, a pagoda-veneration Dharma assembly was held. Venerable Heng Sure presided
        over the ceremony, leading the assembly in repentance according to the proper ritual
        procedures. Afterward, the fourfold assembly of disciples lined up and processed out,
        chanting the Buddha's name and the name of Venerable Master Hsuan Hua, proceeding to the
        Vajra Relic Pagoda in the central garden, where they stood in two rows to circumambulate the
        pagoda to the right. Venerable Heng Sure offered incense and paid homage before the Vajra
        Pagoda, then expounded to the assembly on the significance of circumambulating the pagoda
        and venerating the relics. Amidst solemn chanting of mantras, the relics of Venerable Master
        Hsuan Hua were then respectfully welcomed into the pagoda for enshrinement. Also placed
        within the pagoda were three major Mahayana sutras and the seven treasures of Buddhism.
      </p>

      <p>
        The pagoda is a symbol of Buddhism, originating in India. Its Sanskrit name, "Stupa," means
        a high and prominent place, used for enshrining relics. Before Buddhism was introduced to
        China in the first century CE, there was no Chinese character for "pagoda." Instead,
        transliterations like "浮屠" (futu) or "窣堵波" (sudubo) were used, as in the saying,
        "Saving a life surpasses building a seven-story futu." It was not until the Wei and Jin
        dynasties that translators created the new character "塔" (ta), which was included in the
        Shuowen Jiezi and adopted as the unified translation, used to this day. Pagodas are an
        important component of Buddhist architecture. Ancient Indian monasteries, as well as Chinese
        monasteries during the Sui and Tang dynasties, were centered around pagodas.
      </p>
      <p>
        Why build pagodas? According to the <em>Fayuan Zhulin</em> , there are three reasons:
        <ol className="list-decimal pl-4 text-stone-700 ">
          <li>To signify human excellence—meaning high virtue and prestige; </li>
          <li>To inspire faith in others—so that people may see the pagoda and develop faith; </li>
          <li>
            To repay the kindness of the Buddha—to repay the benevolence of the Buddha and one's
            teachers. Master Zhiyi believed that the pagoda is "the realm of true reality, the abode
            of the Dharma body." The Southern Tradition's Mūlasarvāstivāda Vinaya Commentary states:
            "The Buddha pagoda is the Dharma body." The Northern Tradition's Ratnakūṭa Sūtra says:
            "The merit of making offerings and serving me while I am in the world and making
            offerings to my pagoda after my nirvana is equal. Why? Because the Buddha is established
            by the Dharma body, not by the physical body." Since the pagoda represents the Buddha's
            Dharma body, building and circumambulating pagodas bring immeasurable merit. For
            example, the Sūtra of Immeasurable Life describes the practice of erecting pagodas and
            images and dedicating the merit toward rebirth in the Pure Land. According to various
            sutras, building, circumambulating, repairing, sweeping, or venerating pagodas can all
            bring boundless blessings, accomplish the path, and are sublime methods of practice. The
            Dīrgha Āgama mentions the necessity of building pagodas: "At crossroads, erect pagodas
            and temples with banners and streamers, so that all passersby may see the Buddha pagodas
            and remember the Tathagata's teachings and transformation." The Sūtra on Building
            Pagodas and the Avadāna Sūtra explain in detail the merit of building pagodas. The
            Sarvāstivāda Vinaya discusses the merit of repairing pagodas: "Even a hundred thousand
            loads of genuine gold given in charity cannot compare to a single lump of clay offered
            with a scattered mind to repair a Buddha pagoda." The Sūtra on the Merit of
            Circumambulating Pagodas to the Right describes the method of circumambulation: "All
            devas, dragons, yakshas, ghosts, and spirits draw near and make offerings due to
            circumambulating the pagoda to the right." Of course, the sutra that mentions pagodas
            most frequently is the Lotus Sūtra, with 78 references across 17 chapters. The famous
            verse, "Even children at play, gathering sand to make Buddha pagodas—all such people
            have already attained Buddhahood," comes from this sutra.{" "}
          </li>
        </ol>
      </p>

      <p>
        Who built the pagoda to honor the great cosmos? Its divine light stretches afar, joining the
        white clouds. There are many historical records of eminent monks venerating pagodas. For
        example, the "Head-Touching Monk" of Baotong Temple in Wuchang during the Qing Dynasty could
        cure illnesses with a touch. His practice involved daily circumambulation of the pagoda
        while silently reciting the Great Compassion Mantra. Another example is the recent " Living
        Buddha of Jinshan," whose ascetic practice of venerating the Great Golden Pagoda in Yangon,
        Myanmar, is still celebrated today.
      </p>

      <p>
        Pagodas come in various styles, adapted to local conditions, but their basic structure
        consists of a base, a body, and a spire. The design of Gold Coast Dharma Realm's Vajra Relic
        Pagoda is primarily based on ancient Indian forms, incorporating elements from various
        pagoda styles to create a uniquely Australian pagoda. The pagoda at Gold Coast Dharma Realm
        is a copper-covered bowl-style pagoda, appearing as if it emerged from the earth. From
        bottom to top, it consists of three parts: a base formed by a Sumeru circular pedestal and
        four layers of vajra rings, a pagoda body designed in the covered bowl mound style, and a
        spire composed of thirteen layers of discs and a precious pearl finial. The entire structure
        is golden, with the full text of the Diamond Sūtra carved in relief around the four layers
        of vajra rings. Because the pagoda is externally engraved with the Diamond Sūtra and
        internally houses relics, it is called the Vajra Relic Pagoda. Against the backdrop of
        Australia's azure sky, sunlight makes the golden pagoda gleam brilliantly—truly, "water
        sways the pagoda's shadow, sunlight stirs the fiery pearl's glow."
      </p>

      <p>
        Pagodas are used to enshrine relics, and only enlightened saints leave relics behind.
        According to the Suvarṇaprabhāsa Sūtra: "These relics are the result of being imbued with
        the merit of the immeasurable six pāramitās." "Relics are cultivated through precepts,
        meditation, and wisdom, extremely difficult to obtain, and are the supreme field of merit."
        Gold Coast, Australia, is a blessed land of profound blessings, protected by the true-body
        relics of Venerable Master Hsuan Hua. Enshrining the Venerable Master's relics in the pagoda
        on his birthday holds special significance.
      </p>

      <p>
        In his discourse during the relic enshrinement, Venerable Heng Sure said that today, the
        relics of Venerable Master Hsuan Hua are enshrined in the Vajra Relic Pagoda at Leng Yan
        Holy Temple, Gold Coast Dharma Realm, in Australia. This is a supremely auspicious event for
        the Gold Coast, Queensland, Australia, and even the entire world. Venerable Heng Sure
        encouraged everyone to frequently visit Gold Coast Dharma Realm to circumambulate the pagoda
        and venerate the Buddha, following the practice of circumambulating pagodas and venerating
        relics. May all beings act without obstruction and accomplish all wisdom.
      </p>

      {/* --- 第一个折叠区域 --- */}
      <div className="border border-black rounded-lg overflow-hidden">
        <button
          onClick={() => setShowDetails1(!showDetails1)}
          className="w-full flex items-center justify-between p-4 bg-transparent hover:bg-stone-50 transition-colors"
        >
          <span className="font-bold  text-black ">
            Dharma Talk by Master Heng Sure during the Relic Enshrinement Ceremony of Venerable
            Master Hsuan Hua
          </span>
          <div className="text-black">
            {showDetails1 ? <Minus size={24} /> : <Plus size={24} />}
          </div>
        </button>

        {showDetails1 && (
          <div className="p-4 border-t border-black bg-transparent text-stone-700 text-xl">
            <p className="text-black font-bold">
              Namo Fundamental Teacher Shakyamuni Buddha! Namo Venerable Master Hsuan Hua!
            </p>

            <p className="mb-4">
              Good morning, everyone! Today is an auspicious day. It is April 16th on the solar
              calendar and the 16th day of the third lunar month. Today, disciples of Chinese
              Buddhism celebrate the holy birthday of Cundi Buddha Mother. Disciples of the Dharma
              Realm Buddhist Association also celebrate the birthday of Venerable Master Hsuan Hua
              on this same day, so today is doubly and especially auspicious.
            </p>

            <p className="mb-4">
              In the central courtyard of our Gold Coast Dharma Realm stands a pagoda. Chinese
              people are very familiar with pagodas because there are many in mainland China and
              also in Taiwan. The character "塔" (ta) in "pagoda" is borrowed from an Indian term,
              originally the Sanskrit word "stupa" (窣都婆), meaning "a high and prominent place."
              The Chinese simplified it to "塔" (ta). "High and prominent place" means it represents
              the most majestic location in the human realm, used to enshrine the relics left behind
              after a saint attains the Way, passes into Nirvana, and is cremated—such as Buddhas,
              Pratyekabuddhas, Bodhisattvas, and Arhats. Where are the relics enshrined? They are
              placed inside the pagoda.
            </p>

            <p className="mb-4">
              These pagodas are Indian religious structures that have been transmitted to China for
              thousands of years, becoming the pagodas familiar to Chinese people. As Chinese
              characters and culture have only recently spread to Australia here, the
              pagoda-veneration liturgy we just performed speaks of pagodas and places with relics
              from various regions of China. So, whenever we can circumambulate the pagoda, venerate
              the pagoda, or venerate the Buddha within our Way-place, then great calamities will
              diminish, and small calamities will disappear. Seemingly unsolvable problems appear to
              be resolved; incurable illnesses and pains are healed; and the depression in people's
              hearts—how does it naturally improve through circumambulating the pagoda? It also gets
              better. Therefore, wherever there is a pagoda, we must follow the methods taught by
              the sages of old to circumambulate it and venerate the Buddha. This is the function of
              a pagoda. Today, we also want to introduce another term: "śarīra." This is also
              Sanskrit, what everyone calls "relics" or "śarīra." Śarīra—what does it mean? It means
              spiritual bones. It refers to what is found within the ashes after a saint who has
              realized the fruit is cremated. Like diamonds, or like jewels, these are very
              precious, very hard "indestructible grains." What are these? They are proof that
              during his lifetime, this person devoted all his time to cultivation, practicing
              according to the principles of the Dharma spoken by the Buddha. These cultivation
              methods, like fire, refined his internal essence, energy, and spirit. After his
              Nirvana, cremation, with the addition of fire at 1600 degrees, these spiritual bones
              are refined out. We call them "indestructible grains"—these are the relics. The
              miraculous and inspirational stories about these relics are too numerous to tell.
              These stories all illustrate that relics are wondrous, and only saints who have
              realized the fruit can leave relics behind. In Australia, how many opportunities are
              there to come to a genuine pagoda to circumambulate and venerate it? Not many.
              Therefore, our Gold Coast Dharma Realm's Leng Yan Holy Temple is extremely auspicious.
              Today at Gold Coast Dharma Realm, we have the relics of Venerable Master Hsuan Hua,
              and we are preparing to respectfully invite them into our pagoda. This should be said
              to be very auspicious and excellent news for the Gold Coast, Queensland, all of
              Australia, and even the whole world. So, everyone participating in our ceremony today
              should cherish this opportunity. This Dharma-door is most sublime. Therefore, I hope
              everyone will often come to venerate the pagoda. I encourage everyone to often come
              venerate the pagoda, to establish merit for yourselves, all the way until Buddhahood.
              While circumambulating the pagoda, I will teach everyone a verse from the Avatamsaka
              Sutra. It is about what we should recite in our minds while circumambulating. In the
              future, when you come, if you wish to circumambulate the pagoda and practice this
              Dharma-door, you can all use this passage of sutra text. This verse is what Manjushri
              Bodhisattva taught us: what to do every time we see, how to circumambulate when we see
              a pagoda, and how to contemplate. First, one must have pure thoughts oneself, and then
              "may all beings..." Each verse first purifies what is within oneself, then dedicates
              it with "may all beings..." In this way, the process of venerating the pagoda becomes
              a process of generating eternal wholesome thoughts, becoming a very positive
              experience. So now we should: "When seeing a Buddha pagoda, may all beings respect it
              like a pagoda, receiving offerings from devas and humans." "When reverently
              contemplating a pagoda, may all beings be gazed upon and revered by all devas and
              humans." "When prostrating to a pagoda, may all beings have a summit that no deva or
              human can see." "When circumambulating a pagoda to the right, may all beings act
              without obstruction and accomplish all wisdom. Namo samanta buddhānām, oṃ dhūpa dhūpa
              svāhā." "When circumambulating the pagoda three times, may all beings diligently seek
              the Buddha Way, their minds never slackening." Congratulations to all of you. Being
              able to come here is not easy. I hope everyone attains wisdom. In the future, when you
              come to Gold Coast Dharma Realm, recite these verses while circumambulating the pagoda
              three times, and that will be very perfect. I wish everyone an early realization of
              Bodhi.
            </p>
          </div>
        )}
      </div>

      {/* --- 第二个折叠区域 --- */}
      <div className="border border-black rounded-lg overflow-hidden">
        <button
          onClick={() => setShowDetails2(!showDetails2)}
          className="w-full flex items-center justify-between p-4 bg-transparent hover:bg-stone-50 transition-colors"
        >
          <span className="font-bold text-black">
            A Verse in Praise of the Vajra Relic Pagoda at Gold Coast Dharma Realm
          </span>
          <div className="text-black">
            {showDetails2 ? <Minus size={24} /> : <Plus size={24} />}
          </div>
        </button>

        {showDetails2 && (
          <div className="p-4 border-t border-black bg-transparent text-stone-700 text-xl text-center">
            <p className="text-left">Shanghai Layperson Yang Jiqiang: </p>
            <p>At Gold Coast Dharma Realm in Jambudvīpa,</p>
            <p>A Vajra Pagoda rests upon a golden platform.</p>
            <p>Within Leng Yan Temple, sages and worthies abide, </p>
            <p>With the Buddha's power blessing great Australia. </p>
            <p>In days past, Venerable Master Hua opened this Way-place, </p>
            <p>Expounding the Mahā through eighteen great vows. </p>
            <p>The Eight Great Vajras constantly protect and remember, </p>
            <p>And the assemblies of Four Bodhisattvas also guard and uphold. </p>
            <p>All Tathagatas throughout the ten directions praise in unison, </p>
            <p>Throughout the great thousandfold world, offerings are made together. </p>
            <p>How does one attain a Vajra body? </p>
            <p>How does one again gain steadfast strength? </p>
            <p>How does one uphold the sutra to reach the other shore? </p>
            <p>How do all Buddhas proclaim the subtle and profound? </p>
            <p>How does one abide in the Bodhi mind? </p>
            <p>How, returning, does one subdue this mind? </p>
            <p>How does one behold the Tathagata? </p>
            <p>How do the four lines benefit boundlessly? </p>
            <p>Whether with form or without form, all is giving; </p>
            <p>Planting seeds with a true mind, the fruit will still grow. </p>
            <p>If one sees form, all is empty and false; </p>
            <p>If one sees the non-form, then one sees the Buddha. </p>
            <p>To receive, uphold, recite, and proclaim it— </p>
            <p>Naturally, one gains inconceivable merit and virtue. </p>
            <p>Even without attaining the three minds, blessings are immeasurable; </p>
            <p>This is to be the Tathagata's true Buddha-child. </p>
            <p>The ten-direction Dharma realm is made by mind alone; </p>
            <p>Mind, Buddha, and living beings are not two, not different. </p>
            <p>The esoteric meaning of the Vajra cannot be fully expressed; </p>
            <p>Widely proclaim the Prajñāpāramitā. </p>
            <p>May living beings increase in blessings, heaven add to longevity; </p>
            <p>Thus contemplating the Dharma, universally dedicate all merits.</p>
          </div>
        )}
      </div>

      {/* --- 新增视频区域 --- */}
      <div className="my-8">
        <br></br>
        <div className="relative rounded-xl overflow-hidden shadow-xl bg-black aspect-video">
          <video
            controls
            className="w-full h-full object-contain"
            poster="/assets/buildings/pagoda/shelita_7-scaled.jpg" // 可选：视频加载前的封面图
          >
            <source src="/assets/buildings/pagoda/舍利入塔法会.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      {/* ------------------ */}
    </div>
  );
};

const RightPanel = () => {
  return (
    <div className="p-6 space-y-6">
      <strong className="text-2xl block border-b-2 border-black pb-2">Vajra Relic Stupa</strong>

      <p>
        The pagoda is a symbol of Buddhism, originating in India. Its Sanskrit name, "Stupa," means
        a high and prominent place, used for enshrining relics. Before Buddhism was introduced to
        China in the first century CE, there was no Chinese character for "pagoda." Instead,
        transliterations like "浮屠" (futu) or "窣堵波" (sudubo) were used, as in the saying,
        "Saving a life surpasses building a seven-story futu." It was not until the Wei and Jin
        dynasties that translators created the new character "塔" (ta), which was included in the
        Shuowen Jiezi and adopted as the unified translation, used to this day. Pagodas are an
        important component of Buddhist architecture.
      </p>
      <div className="space-y-4">
        <div>
          <strong className="text-lg">Date</strong>
          <div className="flex items-center gap-2 mt-1">
            <Clock size={18} /> 2021
          </div>
        </div>
        <div>
          <strong className="text-lg">Origin</strong>
          <div className="flex items-center gap-2 mt-1">
            <MapPin size={18} /> Taiwan
          </div>
        </div>
        <div>
          <strong className="text-lg">Material</strong>
          <div className="flex items-center gap-2 mt-1">
            <Cone size={18} /> Brass (Golden Color)
          </div>
        </div>

        <div>
          <strong className="text-lg">Carvings on the Pagoda Body</strong>
          <div className="flex items-center gap-2 mt-1">
            <SquarePen size={18} /> Diamond Sutra (Vajra Prajñāpāramitā Sūtra)
          </div>
        </div>

        <div>
          <strong className="text-lg">Calligrapher</strong>
          <div className="flex items-center gap-2 mt-1">
            <Brush size={18} /> Huang Tingjian
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
  name: "Pagoda",
  nameChinese: "舍利塔",
  description: "The Vajra Relic Stupa enshrining the bodily relics of Venerable Master Hsuan Hua.",
  featuredImage: { src: "/assets/buildings/pagoda/she_li_ta_1.jpg.webp", alt: "Pagoda scene" },
  galleryImages: [
    //{ src: "/assets/buildings/pagoda/shelita_1-scaled.jpg", alt: "Pagoda overview" },
    { src: "/assets/buildings/pagoda/shelita_2-scaled.jpg", alt: "Pagoda structure" },
    { src: "/assets/buildings/pagoda/shelita_3-scaled.jpg", alt: "Pagoda detail" },
    { src: "/assets/buildings/pagoda/shelita_4-scaled.jpg", alt: "Pagoda architecture" },
    { src: "/assets/buildings/pagoda/shelita_5-scaled.jpg", alt: "Pagoda view" },
    { src: "/assets/buildings/pagoda/shelita_6.jpg", alt: "Pagoda detail view" },
  ],
  relatedBuildings: [
    {
      slug: "wisdom-palace",
      name: "Manjushri Hall",
      //nameChinese: "文殊殿",
      // description: "The Wisdom Palace is dedicated to Manjushri, the Bodhisattva of Wisdom, inspiring practitioners on the path to enlightenment.",
      image: "/assets/buildings/dinning-room/文殊殿-770x433.jpg.webp",
    },
    {
      slug: "the-main-hall-of-gcdr",
      name: "The Main Hall of GCDR",
      //nameChinese: "大殿",
      // description: "The main hall is the heart of the temple, where ceremonies, teachings, and meditation practices take place.",
      image: "/assets/buildings/main-gate/751-Dharma-Realm-Temple-42-edited-770x433.jpg.webp",
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

export function PagodaPage() {
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
