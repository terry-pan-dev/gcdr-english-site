import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

interface BilingualText {
  chinese: string;
  english: string;
}

export function WarningCentury() {
  const teachings: BilingualText[] = [
    {
      chinese:
        "人為什麼都是糊裏糊塗的？因為他們一點也不曉得自己從哪裏來，還到哪裏去。每天在鏡子裏所照的形相，不是真正的你呀！假使想知道自己的本來面目，必須迴光返照，反求諸己。世人都被五欲迷住了；每天被財色名食睡的鎖鍊縛得透不過氣來，還心甘情願地作它的奴隸。",
      english:
        "Why are people oblivious and confused? It's because they do not know where they came from and where they will go. The image you see every day in the mirror is not the real you! If you want to know your original self, you must turn the light within to reflect and seek within yourself. People have become obsessed with the five desires; they are stifled by the shackles of wealth, sex, fame, food, and sleep, yet still, they are willing to be enslaved by the five desires. (translated by James Lan.)",
    },
    {
      chinese:
        "我們人的貪心，比天還高、比地還厚、比海也更深，無底的洞，什麼時候也填不滿。",
      english:
        "Our greed is higher than the sky, thicker than the earth's crust, and deeper than the sea. It's a bottomless pit that no matter how long we try, can never be filled.",
    },
    {
      chinese: "人無道德，就是真正的貧窮。",
      english: "A person is truly poor if he has no virtue.",
    },
    {
      chinese:
        "本有的珍寶，要到哪裏找回來呢？要在《華嚴經》。所謂「不讀《華嚴經》，不知佛之富貴。」《華嚴經》是經王之王。",
      english:
        'Where can we go to look for our original treasure? In the Avatamsaka Sutra; as the saying goes, "You will never know of the wealth of the Buddha if you do not read the Avatamsaka Sutra ." The Avatamsaka Sutra is the king among the kings of sutras. (translated by Ash M.)',
    },
    {
      chinese:
        "如果用貪瞋癡三毒來處理事情的話，就會天昏地暗，發生災難。如果用戒定慧來處理事情，天會清、地會寧，發生吉祥。所以說，惡人多的地方，災難就重；善人多的地方，吉祥增加。總而言之，災難或吉祥，都在人為。",
      english:
        "If we act based on the three poisons of greed, anger, and delusion, the world will be enveloped in darkness, and disasters will occur. On the contrary, if we act based on precepts, samadhi, and wisdom, the sky will be clear, the earth will be peaceful, and auspiciousness will pervade. Therefore it is said, disasters are rampant in places where bad people abound, and auspiciousness prevails in places where good people gather. In essence, disasters and auspiciousness depend on everyone's actions.",
    },
    {
      chinese: "人不成佛，就是因為儘在口頭禪上用功夫。",
      english:
        "We are yet to realize Buddhahood because we only engage in lip service.",
    },
    {
      chinese:
        "一切法皆是佛法，皆不可得。世界上萬事萬物都在說法、都在講經。我們把每一個人自己那一部經念好了、背熟了，不要錯因果，那是真經、真典。",
      english:
        "Every phenomenon is the Buddhadharma and is thus unattainable. Every being and phenomenon in the world is teaching the Dharma and lecturing sutras to us. Every one of us should concentrate on reciting and memorizing our own sutra. Do not be confused in cause and effect. That's the true sutra. (translated by Ash M.)",
    },
    {
      chinese:
        "你儘看人家不對，就是自己有苦；你若沒有苦了，見到誰都是佛，見到人人都像佛似的。很簡單、很淺顯，就是你做不到！",
      english:
        "If you always look at others' faults, that means you have suffering; if you do not have suffering, then you will see everyone as a Buddha. This seems to be very simple and straightforward, but you just cannot do it!",
    },
    {
      chinese:
        "人不是為吃飯而活著，人活著應有功於世、有德於民、有利於天下，人應「慈悲代天宣化，忠孝為國救民。」",
      english:
        "We do not live just to eat; we should live to be useful to the world, to help other people, and to benefit the world. We should 'with kindness and compassion, propagate the Dharma and teach living beings on behalf of the heavens, and with loyalty and filiality, save the people for the country.'",
    },
    {
      chinese: "一日無過可改，即一日無功可進。",
      english:
        "Each day you do not correct your faults is a day you make no self-improvement. (translated by Katherine Wang.)",
    },
    {
      chinese:
        "煩惱即菩提，就是說你在有煩惱的時候，你要是能沒有煩惱了，你能認識了，那就是菩提了。不是要把那個煩惱放下，然後另找一個菩提。",
      english:
        "Afflictions are just Bodhi means that when you have afflictions, if you are able to recognize and transcend them, then that is Bodhi. It is not putting aside afflictions and searching for Bodhi elsewhere.",
    },
    {
      chinese:
        "愛死病，是亡國滅種的一種病，我希望我們中國不要亡國，不要跟西方學這一類的行為。",
      english:
        "AIDS is an illness that decimates nations and brings humans to extinction. I hope that the Chinese do not learn from the behavior of the West so that China will not be destroyed.",
    },
    {
      chinese:
        "學佛的人，要節欲、要清心寡欲，不要重欲，這是要緊的，這是健康根本的問題。",
      english:
        "People who practice Buddhism should curb their desires. They should purify their minds and limit their desires. This is crucial, and it concerns the fundamental problem of health.",
    },
    {
      chinese:
        "你們今天能夠皈依三寶，皆是往昔的大善根，今生才能遇到一起。遇到一起，大家都要發菩提心，不要做佛教中的蟲子，不要做佛教的敗類。有人譭謗佛教，不要和人去辯論，要以實際行動來修行。以修行來證明佛教，不是以口頭禪來讓人相信，要躬行實踐。",
      english:
        "The reason you are able to take refuge with the Three Jewels and encounter each other in this life is because of the deep roots of goodness you planted in the past. Now that you have gathered here, you should all bring forth the Bodhi resolve and not be a worm or scum of Buddhism. If someone harshly criticizes Buddhism, don't debate with them. Commit yourself to cultivation to prove Buddhism to them. Teach by example, not with words.",
    },
    {
      chinese:
        "世界的戰爭，是由我們心裏小的戰爭引起，所謂「天下興亡，匹夫有責」，不能說這是他們的事，不是我們的事。人人沒有戰爭，世界的戰爭就平息了。",
      english:
        'The wars in the world arise from small conflicts within our minds. As a Chinese saying goes, "Each and everyone is responsible for the rise and fall of nations." We shouldn\'t say, "That\'s their problem, not mine." If nobody has [internal] conflicts, then all the wars in the world will subside.',
    },
    {
      chinese:
        "不要把光向外照，要時時刻刻迴光返照，照照自己是個畜生？是個鬼？是個什麼？",
      english:
        "Don't shine the light outwards; instead, constantly turn the light inwards, illuminating ourselves to see if we are animals, ghosts, or something else.",
    },
    {
      chinese:
        "什麼是道德呢？就是以利益他人為主，以不妨礙他人為宗旨，也就是內心充滿仁、義、禮、智、信。",
      english:
        "What is virtue? It's to benefit others first and abide by the principle of not obstructing others, which is just infusing our minds with benevolence, righteousness, propriety, wisdom, and trustworthiness.",
    },
    {
      chinese: "我們為什麼與道不相應呢？就因為狂心沒有休息。",
      english:
        "Why don't we have any responses from cultivation? It's because we have not put our mad minds to rest yet. (translated by James Lan.)",
    },
    {
      chinese: "所謂好，要從心做起。所謂壞，也要從心做起。",
      english: "Good comes from the mind and evil also comes from the mind.",
    },
    {
      chinese:
        "貪瞋癡三毒，比鴉片煙、比酗酒、比最毒的砒霜都厲害。因為這些毒，是毒人有形的東西，譬如毒人身體；而貪瞋癡這三毒，是毒我們每一個人的法身慧命，所以這是最障道的。",
      english:
        "The three poisons—greed, hatred, and delusion—are more potent than opium, alcoholism, and even the highly toxic arsenic. While these toxic substances poison the physical body, the three poisons harm the Dharma body. Therefore, they are the greatest obstacles to our cultivation.",
    },
    {
      chinese: "修佛法，即是諸惡莫作，眾善奉行。",
      english:
        "To practice the Buddhadharma is to refrain from all evil and do all good.",
    },
    {
      chinese:
        "看破是明白，放下是解脫，解脫是自在。自不在，都是被賊侵犯，被境界轉。",
      english:
        "To see through is to understand clearly, to let go is to be liberated, and to be liberated is to be at ease. We are not at ease because we are being seized by thieves and turned by states. (translated by James Lan.)",
    },
    {
      chinese:
        "真正的快樂，是無求的，「到無求處便無憂」。你無所求，這才是真正的快樂，真正自性的穩定、平安。",
      english:
        'True happiness can be achieved by not yearning. "When one no longer yearns, one no longer worries." Only when you no longer yearn is it true happiness, true stability, and peacefulness of your self-nature.',
    },
    {
      chinese:
        "眾生最大的毛病，便是癡愛；日夜在癡愛中，時刻不能放下。如果把好色之心放在學佛上，時刻不忘學佛，那就很快能成佛。",
      english:
        "Human beings' greatest shortcoming is emotional love. One is caught in its grip day and night, unable to let go of it even for a moment. If we can channel our desire for sex towards studying Buddhism, then we'll become Buddhas quickly.",
    },
    {
      chinese:
        "要把你那些小聰明、小智慧都收起來；不要覺得自己什麼都明白，什麼都懂。如果你覺得什麼都明白，你就是沒有真正明白佛法的人。",
      english:
        "Put away all your trivial cleverness and smarts; do not think you understand everything. If you think so, then you do not truly understand Buddhism.",
    },
    {
      chinese: "在萬佛聖城，誰也不可給人戴高帽，說些諂媚、流俗、拍馬屁的話。",
      english:
        "Here at CTTB, we do not condone flattery, brown-nosing, sweet talk, and the like. (translated by Derrick Gan.)",
    },
    {
      chinese: "在道場裏，最醜陋的行為，就是不修行。誰不修行，將來就會墮落。",
      english:
        "The worst behavior in the monastery is to not cultivate. Whoever does not cultivate will surely fall [into lower realms] in the future.",
    },
    {
      chinese:
        "修行就是要「養拙」，「拙」就是很笨的意思。修行要愈笨愈好，笨得什麼也不知，一點妄想也無。",
      english:
        'We cultivate to "develop dullness." To be "dull" is to be very dumb. The dumber you are, the better it is for your cultivation, to the point that you\'re too dumb to know anything and to have any false thoughts.',
    },
    {
      chinese:
        "修行人不要有自己，把自己掉到垃圾堆去，處處為公家著想；要和光，以退為進，樣樣保守，不出風頭。一出風頭，就會有問題。",
      english:
        'Cultivators should not think of themselves. They should throw their "self" into a trash pile and constantly think for the common good. They should work in harmony with others, take a step back to make progress, be conservative in everything, and avoid the limelight. As soon as they are in the limelight, there will be problems. (translated by Bo Han Zhu and Marvin Wang.)',
    },
    {
      chinese:
        "在聖城，若師父來城時，你出席聽經，平常卻不來作早晚課，聽經也不隨喜，這就是自私，只來「拿」，不來布施，違背萬佛城基本精神。大家是一體，不能只私人活動，不顧全體大家。",
      english:
        "When the Master comes to CTTB, you attend his Sutra lectures; normally you don't regularly participate in morning and evening recitations, or rejoice in listening to the Sutra lectures. This is being selfish– only taking without giving back — and goes against the fundamental spirit of the City of Ten Thousand Buddhas. We are all one, so we cannot act independently and neglect the entire community.",
    },
    {
      chinese:
        "修道的敵人是誰？非魔王，而是自私心。若用自私心，萬事無成。就算有成，也屬虛妄。",
      english:
        "Who is the enemy of cultivators? It is not the demon king, but selfishness. If you act out of selfishness, you will not succeed at anything. Even if you do succeed, it will be fake. (translated by Bo Han Zhu and Marvin Wang.)",
    },
    {
      chinese:
        "用功修道的人，一秒鐘也不可打妄想，所謂「大事未明，如喪考妣。」生死大事沒有了，好像死了父母一樣的悲哀。",
      english:
        'Serious cultivators do not waste even one second on discursive thoughts. As the saying goes, "Not understanding the one great matter is like losing one\'s parents." When we do not understand the great matter of birth and death, it is as heartbreaking as the passing of our parents.',
    },
    {
      chinese: "佛法深如大海，必須勇猛精進，勤加修習，才能有所成就。",
      english:
        "The Buddhadharma is as deep as the ocean. We have to cultivate diligently with vigor and valor in order to gain some accomplishment in our practice.",
    },
    {
      chinese:
        "修道要有正知正見，不可顛倒是非。黑白要分清楚，不可魚目混珠、不可濫竽充數；否則，就是邪知邪見，永不成佛。",
      english:
        "Cultivators should have the right knowledge and right views. Do not mistake the rights for the wrongs and vice versa. Be clear about black and white. Do not pass off fish eyes for pearls or pretend to be skilled. Otherwise, you'll have wrong knowledge and wrong views and will never realize Buddhahood.",
    },
    {
      chinese:
        "妄想，明明知道辦不到，為何還要打呢？明明知道是妄想，為何不收拾乾淨？這就是一般人的習氣毛病，明知故犯。說穿了，就是看不破、放不下，執東執西、著男著女，把寶貴光陰浪費掉了。",
      english:
        "We know clearly that discursive thoughts are mere illusions, so why do we still engage in them? We know clearly that they are just discursive thoughts, so why can't we get rid of them? This is a bad habit of ordinary people: doing things that we know are wrong. To be perfectly frank, you still cannot see through and let go of things. Being attached to this and that and fixated on men and women, you're throwing away precious time. (translated by Ash M.)",
    },
    {
      chinese:
        "慈悲源於自性，無須半點矯揉造作，不是故意去討好人，這就落於虛偽。人一天一天長成，慢慢會懂得其理，心裏自然會生出慈悲，不用故意採取什麼行動。故意慈悲，流於諂媚；故意不慈悲，又變成冷淡。太過猶如不及，凡事要行中道，即是無心無念。",
      english:
        "Kindness and compassion arise from one's self-nature, without the need to be deliberate or pretentious. It is not about pleasing anyone on purpose—that would be hypocritical. People grow day by day, and slowly but surely, they come to understand the principles, and compassion arises spontaneously in their hearts, without having to take any deliberate action. Try to be compassionate deliberately, and you come off as flattering; try not to be compassionate on purpose, and you become cold and indifferent. Neither exceeding nor falling short, you should always seek the middle path; this is to achieve the absence of thought and mind. (translated by James Lan.)",
    },
    {
      chinese:
        "學佛不用好高騖遠，只須在日常生活中體會。「平常心是道，直心是道場。」求遠必自近、登高必自低，就在日常一舉一動中，能鍛鍊自己與一般人不同，就是個好的佛教徒。",
      english:
        "While studying Buddhism, there is no need to be overly ambitious; you only need to experience it in your daily life. 'The ordinary mind is the Way; the straightforward mind is the monastery.' Seeking what is far must be from what is near, and climbing what is high must start from where is low. To act differently than ordinary people in your daily life is to be a good Buddhist.",
    },
    {
      chinese: "佛教徒要注意因果，凡事要小心謹慎，不能隨便譭謗他人。",
      english:
        "Buddhists should pay attention to the law of cause and effect and be careful in everything they do, and they should not carelessly slander other people. (translated by Katherine Wang.)",
    },
    {
      chinese:
        "一念不生，什麼鬼都不生。到什麼都沒有時，什麼都來了。佛菩薩都來了，為什麼？因為你什麼都沒有了，佛才來。你若還有，佛就不來。這時，盡己之性，盡人之性、物之性、天地之性。諸佛就是你，你就是諸佛。四相皆空，有何煩惱？",
      english:
        "When you have not a single thought, there won't be any ghosts. When it gets to the point that you have nothing, then everything will come. All the Buddhas and Bodhisattvas will come; why is this so? It is because you do not have anything, so the Buddhas will come. Otherwise, the Buddhas will not come. In the former case, you fully understand your nature, other people's nature, the nature of objects, and the nature of the universe. Buddhas are you, and you are the Buddhas. The four notions (a self, a person, a living being, and lifespan) are all gone, so what afflictions are there? (translated by Katherine Wang)",
    },
    {
      chinese: "你若懂了，事事都是「西來祖師意」；若不懂，「樣樣都生氣」。",
      english:
        "If you understand, then everything will be the 'Patriarch's intention in coming from the West.' If you don't understand, then you will lose your temper at everything. (translated by Katherine Wang)",
    },
    {
      chinese:
        "一念善，天地間就吉祥；一念惡，天地間就有狂風暴雨。所以每個國家的人民都良善，受持五戒，行十善，這國家就無事了。",
      english:
        "One good thought can bring peace to the world. One evil thought can cause terrible storms and gales. So, if all the citizens of a country are kind, uphold the five precepts, and practice the ten good deeds, everything will be fine in this country.",
    },
    {
      chinese: "有真正修行人，佛法才興；若無，佛教則滅。",
      english:
        "If there are genuine cultivators, Buddhism will flourish; otherwise, Buddhism will become extinct.",
    },
    {
      chinese:
        "修道，不要怕難、不怕苦、不怕沒有錢、不怕沒有飯吃。若怕了就不能修道。修道人與世人剛相反，世人求五欲，捨不了。",
      english:
        "When cultivating the Way, do not be afraid of difficulty, suffering, poverty, or hunger. If you are afraid of these, you won't be able to cultivate. Cultivators should be the exact opposite of worldly people who pursue the five desires and cannot let go. (translated by Qin Rui Y. & Qing Zheng K.)",
    },
    {
      chinese: "若能忍慾，就是持戒；若不忍慾，就不是持戒。",
      english:
        "If you are able to restrain your desires, then you are upholding the precepts; if you are unable to restrain your desires, you are not upholding the precepts. (translated by James Lan.)",
    },
    {
      chinese:
        "叢林生活，必先要守規矩。上殿、過堂，必定要參加，這比什麼其他工作更重要。要隨眾，不可別眾，否則不共住。",
      english:
        "It is requisite to observe the rules when living in a monastery. You should attend the ceremonies in the Buddha Hall and Dining Hall, regarding them as more important than any other job. Follow the assembly and do not act differently. Otherwise, you are not welcome to live in the community. (translated by Yifan Chan.)",
    },
    {
      chinese:
        "你修道，不明白道，一邊修，就一邊丟；一邊叫你沒有愛慾，你這邊愛慾就更多一點。一天到晚想這個愛、想這個慾，想這種不乾淨的東西。在你心裏頭，智慧水渾了，沒有智慧了，這是濁興起了。所以你就不明白道，修道修來修去，也不證果、也不見道，為什麼呢？就因為你有愛慾心；你若沒有愛慾心，很快就會見道了。",
      english:
        "If you cultivate the Way but do not understand it, as soon as you gain some benefits, you will lose them right away. You are taught to be free of desire and emotional love, yet your emotional love and desire become even stronger. From morning to night, you think about emotional love and desire, defiled thoughts as such. Therefore, the water of wisdom in your mind becomes turbid; when turbidity arises, wisdom will disappear and you will not understand the Way. So, even though you cultivate day in and day out, you will still be unable to realize fruition or see the Way. Why? It is because you harbor emotional love and desire in your mind. If you don't have thoughts of emotional love and desire, you will be able to see the Way sooner. (translated and revised by Qin Rui Y. & Qing Zheng K.)",
    },
    {
      chinese: "你若不用功、不修行，好像磨刀之石，不見其損，日有所虧。",
      english:
        "If you do not work hard and cultivate seriously, you will have to bear the consequences. Take the whetstone as an example. You may not see the wear and tear as you sharpen your knife on it, but the stone still wears away day by day.",
    },
    {
      chinese:
        "無明就是一個黑暗的房子，你若有了智慧，這黑暗的房子也會變成光明了。這世間一個財、一個色，這兩種把很多修道的人都給害了。修道的人，放不下財，就貪財；放不下色，就貪色。你貪財好色，道業絕對不會成就的！",
      english:
        "Ignorance is analogous to a dark chamber. If you have wisdom, the dark chamber will brighten up. The two main things in the world that lead to the downfall of cultivators are wealth and sex. Cultivators who cannot let go of wealth, crave money. Those who cannot let go of sexual desire, crave sex. People who lust for wealth or sex will never accomplish anything in their cultivation. (translated by Yifan Chan.)",
    },
    {
      chinese: "精足不冷，氣足不餓，神足不睏。精氣神是三寶，和佛法僧是一樣的。",
      english:
        'Having sufficient "essence," or vital energy, keeps you from the cold; having sufficient qi wards off hunger; and having sufficient "spirit" casts away drowsiness. Essence, qi, and spirit are the Three Jewels, like the Buddha, Dharma, and Sangha.',
    },
    {
      chinese:
        "修道是「差之毫釐，謬之千里」，絲毫不能馬虎；若打一纖毫的妄想，律儀不修、道學不整，可能立刻招來嚴厲的果報及懲罰。",
      english:
        'It can be said that in our cultivation, "Off by a hair in the beginning, off by a thousand miles at the end." We cannot be careless even in the slightest. Just having a false thought of a hair\'s breadth, not following the precepts, or deviating from the path may instantly bring harsh karmic retributions and punishment.',
    },
    {
      chinese:
        "你不要那麼執著，帶那一些累贅到你身上。什麼叫累贅呢？就是你那一些個習氣毛病。你有那一些個累贅，就拔不出腿來，就不能到彼岸。",
      english:
        "Don't be so attached, for you just burden yourself. What are burdens? They're just your bad habits. Once you have these, you can't take the first step to cross to the other shore. (translated by Bo Han Zhu and Marvin Wang.)",
    },
    {
      chinese:
        "真正修道的人，到什麼地方也不希望人家給自己好菜吃、好地方住，不可有這種念頭，這是墮落的因。到什麼地方都要普普通通就可以，不可貪圖享受，不可人家對我好，我就高興；人家對我不好，我就不高興。",
      english:
        "Genuine cultivators do not want to be provided with delicious food or nice lodging wherever they go because such thoughts will lead to their downfall. They try to maintain a low profile everywhere and don't want to be pampered with comfort, feeling neither pleased when they are treated well nor displeased when they are treated poorly. (translated by Ash M.)",
    },
    {
      chinese: "誰能不發脾氣，誰就能對佛教的道理相應，就能很順利地成佛。",
      english:
        "Whoever can refrain from getting angry will be in accord with the Buddhas' teachings and will successfully become a Buddha.",
    },
    {
      chinese:
        "我們人都是捨本逐末，把修行放在第二位，把賺錢放在第一位；把根本的道理忘了，在末梢上用功夫。賺錢只能維持你的生活，學習佛法是養你的法身慧命、增長你的智慧。你應選擇一部經，對機研究下去，不要天天只掛著去賺錢！",
      english:
        "We humans always neglect the root (fundamentals) while concentrating on the branches (details), place cultivation second while placing making money first, and forget the fundamental principles while spending our efforts on the trivial. Making money can only sustain your physical life while studying Buddhadharma can nourish the wisdom life of your Dharma body and increase your wisdom. You should select a Sutra that resonates with you and study it every day, instead of only focusing on making money.",
    },
    {
      chinese:
        "學咒要先正心誠意；若心不正，學什麼咒都是邪的。心正了，學咒才有感應。",
      english:
        "To learn mantras, you must first be sincere and righteous; if you are not righteous, any mantras you learn will be deviant. Only with righteousness, can you have responses from learning mantras. (translated by Bo Han Zhu and Marvin Wang.)",
    },
    {
      chinese:
        "你自性光明是沒有貪心，你的靈感上也沒有貪心、你的智慧上也沒有貪心。你有貪心，就等於一個鏡子上面有了塵土一樣。所以我們用功的人，切記切記不要貪多、也不要貪快、也不要貪便宜。",
      english:
        "There is no greed in your radiant inherent nature, in your spiritual awareness, or in your inherent wisdom. When your heart is consumed with greed, you are like a mirror that is covered with dust. Hence, as we work hard at our cultivation, we should keep reminding ourselves not to be greedy for quantity, speed, or bargains. (translated by Ash M.)",
    },
    {
      chinese: "如果人心裏有鬼，就是人怕鬼。如果人心裏沒有鬼，就是鬼怕人。",
      english:
        "With ghosts in your mind, you will be afraid of ghosts. Without ghosts in your mind, ghosts will be afraid of you. (translated by Bo Han Zhu and Marvin Wang.)",
    },
    {
      chinese:
        "我們現在得到人身，若不藉著人身來修行，還等著什麼？等著把人身丟了，再想修行，那時來不及的！",
      english:
        "Although you are now born as a human, you do not make good use of your human form to cultivate. Why are you procrastinating? If you wait until you have lost your human body, that will be too late (translated by Ash M.)",
    },
    {
      chinese:
        "各位不要向遠處求、不要找什麼高深法門；無上甚深微妙法，聽見一唸這個開經偈，就找無上甚深微妙法。其實無上甚深微妙法離你太遠了，你根本一步還沒邁，為什麼就要捨近求遠、捨本逐末呢？你為什麼不在你的身邊，日用行為上用功夫呢？為什麼要跑到那麼遠呢？古人說「道在邇而求諸遠，事在易而求諸難。」",
      english:
        "All of you should not seek from afar or seek for profound and lofty Dharma; upon hearing this verse for opening a sutra, \"The unsurpassed, profound, and wondrous Dharma,\" you immediately look for the 'unsurpassed, profound, and wondrous Dharma.' In fact, the unsurpassed, profound, and wondrous Dharma is far away from you; you haven't even taken the first step forward yet. Why do you forsake what is near to seek what is far, and renounce the root to chase after the branches? Why don't you start applying effort toward your daily activities? Why do you run so far away? The ancient people said, 'The Way is close at hand, yet you seek afar; the matter is easy, yet you search for every difficulty.' (translated by Katherine Wang.)",
    },
    {
      chinese: "你真不打妄語了，叫天，天應；叫地，地靈。",
      english:
        "Once you really no longer tell lies, heaven and earth will heed you should you call upon them.",
    },
    {
      chinese:
        "不爭、不貪、不求、不自私、不自利、不打妄語，這是最有效的修行方法。",
      english:
        "Not fighting, not being greedy, not seeking, not being selfish, not pursuing personal advantage, and not telling lies — these are the most effective methods of cultivation. (translated by Derrick Gan.)",
    },
    {
      chinese:
        "若犯婬戒，就容易犯殺戒，也容易犯偷戒、妄語戒。因此，犯婬戒，是殺盜妄都包括了。",
      english:
        "If you break the precept against sexual misconduct, then it is easy for you to break the precepts against killing, stealing, and lying. Therefore, breaking the precept against sexual misconduct includes breaking the precepts against killing, stealing, and lying. (translated by Katherine Wang.)",
    },
    {
      chinese:
        "你為什麼煩惱？因你貪沒空，未看破放下，故「處處是荊棘，處處撞牆。」若能無四相，誰痛呢？連痛的人也沒有，煩惱從何來？",
      english:
        "Why do you have afflictions? It is because your greed is not eliminated, and you haven't seen things through and put them down yet. Thus, 'there are thorns everywhere, and you bump into walls everywhere.' If you are free of the four notions [of self, human, living beings, and lifespan], then who is in pain? If there is no one who is in pain, then where do afflictions come from?",
    },
    {
      chinese: "要作法門的龍象，不要作法門的老鼠！",
      english:
        "Be outstanding dragon-elephants of the Dharma, not mice of the Dharma! (translated by Katherine Wang.)",
    },
    {
      chinese:
        "天上有八萬四千個星斗，人有八萬四千個毛孔；我們人與每個世界皆相通。世界的毀壞是因為人有無明。天地間的空氣和每個人的空氣都是相通，空氣和空氣分不開。每個人的空氣，有他空氣的源路。所有人存一善念，就補助天地間正氣的不足；每個人發一次脾氣、生一念煩惱，就增加宇宙間的戾氣。如盡用貪瞋癡處理事情，天地間的災難就多了。一人如此，多人如此。惡人聚集的地方，災難氣就多點；所以這世界哪個地方好、哪個地方壞，和我們每個人分不開的。",
      english:
        "There are eighty-four thousand stars in the sky and eighty-four thousand pores on a person's body. Every one of us is connected to the world. The destruction of the world is caused by the ignorance of people. The energy that exists between heaven and Earth is connected with the energy of every human, and they cannot be separated. The energy of each person has its own source. When a person has a wholesome thought, it will replenish the positive energy in the world. However, every time a person loses his temper or has an affliction, the negative energy in the universe will increase. If we use greed, hatred, and delusion to solve problems, then the calamities in the world will increase. This is true for one person or many people. The places where evil people gather will harbor more ominous energy. Therefore, whether a place in the world is good or bad is closely related to every one of us. (translated by Qin Rui Y., Qin Zheng K. & Qin Xiang K.)",
    },
    {
      chinese: "世界的快樂是短暫的，究竟的快樂是永遠的，所以才要修道。",
      english:
        "All worldly happiness is temporary, while ultimate happiness is eternal; this is why we should cultivate the Way. (translated by Katherine Wang.)",
    },
    {
      chinese: "學佛要學慈悲、道德、原諒人、不和人起對待、不和人起鬥爭。",
      english:
        "To study Buddhism is to learn to be compassionate, virtuous, and forgiving, to avoid confrontation with others, and to refrain from contention and fighting. (translated by Qin Rui Y., Qin Zheng K. & Qin Xiang K.)",
    },
    {
      chinese:
        "恭敬心把剛強的性情改變為和藹的性情；拜佛是拜自性佛，將來成佛也是成自性佛。",
      english:
        "Respect can transform stubbornness into gentleness. Bowing to the Buddha is bowing to the Buddha of our self-nature. When we become Buddhas in the future, it is also the Buddha of our own self-nature that we become.",
    },
    {
      chinese:
        "古人說：「君子有造命之學。」有道德的人、正人君子，是可以改造命運，超出命數之外。為何不吉祥？就是心裏不吉祥，種下惡因當然有惡報；若能改過從善，便可趨吉避凶。",
      english:
        'The ancients said:" A noble person knows how to determine his own fate." A person of virtue and integrity can change his own fate and transcend his destiny. Why is there inauspiciousness? That is because one harbors inauspicious thoughts. Planting immoral causes will of course lead to woeful retributions. However, if one can rectify one\'s own mistakes and do good deeds, one will be able to avoid calamities and encounter auspicious conditions. (translated by Qin Rui Y., Qin Zheng K., and Qin Xiang K.)',
    },
    {
      chinese:
        "人為什麼會有魔業？就因為在往昔不聽善知識的教導、不受善知識的告誡，自己盡打妄想、造惡業，所以這生常受魔業纏繞，事事不能遂心滿願。",
      english:
        "Why do we experience demonic karma? It is because we failed to heed the teachings of good teachers and accept their admonishments in our past lives. Instead, we engaged in false thinking and created bad karma. Thus, we are surrounded and afflicted by demonic karma this life, and things do not go our way.",
    },
    {
      chinese:
        "我向你們化大緣，就是化你們所有人的脾氣，所有人的無明、煩惱、瞋癡。",
      english:
        "I'm requesting a big donation from you all– please donate to me all of your temper, your ignorance, your afflictions, your hatred, and your delusion. (translated by Derrick Gan.)",
    },
    {
      chinese:
        "萬佛城是大悲城、是楞嚴城、是萬聖城、堅固城、手眼城、正法久住城、是寶所城、是想要修行，求福求慧之城、是十方諸佛聚集之城。",
      english:
        "The City of Ten Thousand Buddhas is a city of great compassion, a city of Shurangama, a city of ten thousand sages, a city of indestructibility, a city of Hands and Eyes, a city where the Right Dharma abides forever, a city of jewels, a city where people strive to cultivate and seek blessings and wisdom, and a city where Buddhas throughout the ten directions gather.",
    },
    {
      chinese: "修行用功，疲倦也能忍受，這就是用功的一種誠心。",
      english:
        "When you are diligent in your cultivation, you can even endure fatigue; this comes from sincerity in your hard work. (translated by James Lan.)",
    },
    {
      chinese:
        "修行不可以浪費施主的金錢，要儘量節省。如果浪費物質，貪享受，永遠也不會有所成就，因為你不修福、修慧。",
      english:
        "Cultivators should not waste the donations they receive from their donors. They should try their best to be frugal. Those who waste material goods and engage in self-indulgence will never accomplish anything in their cultivation as they do not cultivate blessings and wisdom. (translated by Yifan Chan.)",
    },
    {
      chinese:
        "什麼是智？就是不自私。什麼是妄想？就是自私。自私一起，妄想便來。",
      english:
        "What is wisdom? It is being unselfish. What is false thinking? It is being selfish. Once thoughts of selfishness arise, false thoughts will follow. (translated by James Lan.)",
    },
    {
      chinese:
        "自己是盡虛空遍法界，哪有個東西？無古無今、無上無下、無人無我、無眾生無壽者，人是由大光明藏變化出來的。",
      english:
        "The self reaches the end of empty space and pervades the Dharma Realm, so how can it be something? There is no past or present, no above or below, no others or self, no living beings or life span. People are transformed out of the great treasury of radiance.",
    },
    {
      chinese:
        "我們人的貪心，比天還高、比地還厚、比海也更深，無底的洞，什麼時候也填不滿！",
      english:
        "Our greed stacks higher than the sky, piles thicker than the earth, and pools deeper than the ocean; like a bottomless pit, our greed can never be satiated. (translated by Sophia and Rui Liu.)",
    },
    {
      chinese:
        "修行修什麼？修行就是把我們的妄想修沒有了，慾念修沒有了，這就是有功夫了。",
      english:
        "What is it that we're cultivating? We're cultivating to eradicate our false thoughts and desires; to be able to eradicate them is to have skill in cultivation.",
    },
    {
      chinese:
        "人為什麼有憂愁恐懼？就是因為人有愛慾，所以才有憂愁恐懼；若把這愛慾斷了，就沒有什麼憂愁恐懼了。",
      english:
        "Why do people have worry and fear? It is because they have lust. If they can eradicate lust, there will no longer be any worry or fear.",
    },
    {
      chinese:
        "男女相愛，究竟有什麼意思呢？相貌生得再好，都是革囊眾穢，裏邊裝的是屎、尿。九孔常流不淨：眼睛有眼眵出來、耳朵有耳垢、鼻子又有鼻涕、口又有口水、大小便等。你說這究竟哪個是乾淨的呢？",
      english:
        "What does it actually mean for a man and a woman to be in love? No matter how appealing the physical appearance, it is but a skin bag inside filled with filthy stuff such as feces and urine. Defiled things constantly flow from the nine orifices: eye gum from the eyes, earwax from the ears, nasal mucus from the nose, saliva from the mouth, and urine and feces from the lower orifices. Which of these would you say is actually clean? (translated by James Lan.)",
    },
    {
      chinese: "假如你不修行，就是釋迦牟尼佛作你的師父也沒有用！",
      english:
        "If you do not cultivate, there is no use even if Shakyamuni Buddha comes to teach you.",
    },
    {
      chinese:
        "我們念觀世音菩薩，不要一見到人，就看別人的不對。你儘找別人麻煩，是自己苦未了，苦根未斷盡。",
      english:
        "While being mindful of Guan Yin Bodhisattva, do not immediately look for others' flaws upon seeing people. If you always find others' faults, that means your suffering has not been eradicated and you haven't cut off the root of your suffering yet. (translated by Sophia and Rui Liu.)",
    },
    {
      chinese:
        "財欲令人顛倒、色欲也令人顛倒、名欲也令人顛倒、食欲也令人顛倒、睡欲也令人顛倒；財色名食睡，這是地獄五條根，可是我們人人都把這個根紮得深深的。善根，他不往深的紮；財色名食睡這五種根，他往地裏頭紮，啊！紮了覺得還不夠深，還往地裏頭紮。",
      english:
        "Wealth makes people confused; so do lust, fame, food, and sleep. These are the five roots of the hells, and all of us have planted them quite deeply. The roots of goodness are not planted deeply; these five roots, however, are planted deep into the ground. We think \"Ah, they're not deep enough; let's plant them even deeper into the ground!\" (translated by James Lan.)",
    },
    {
      chinese:
        "世界為什麼會毀滅？因為人們的善念少、惡念多的緣故。一念為善，天地增加正氣；一念為惡，天地增加戾氣。要轉戾氣為祥和。",
      english:
        "Why will the world be destroyed? It is because people harbor fewer good thoughts and have more evil thoughts. One good thought increases the right energy in the world, while an evil thought increases the evil energy. We need to turn evil energy to auspicious and peaceful energy.",
    },
    {
      chinese:
        "世界為什麼會毀滅？因為人的善念少、惡念多。一個善念，就增加天地間的正氣；一個惡念，就增加天地間的戾氣。要轉戾氣為祥和。",
      english:
        "Why will the world be destroyed? It is because people harbor fewer good thoughts and have more evil thoughts. One good thought increases the right energy in the world, while an evil thought increases the evil energy. We need to turn evil energy to auspicious and peaceful energy.",
    },
    {
      chinese: "修行要處處本著道德，以不妨礙道德為根本戒條。",
      english:
        "Cultivation means abiding with virtue at all times, by adhering to the basic rule of not violating virtue.",
    },
    {
      chinese:
        "誰對自己不慈悲，或不講道理，都是自己的善知識。能「逆來順受」，對橫逆能處之泰然，才見出你忍辱的功夫，不要因別人一句話就動了。你要修得「不動」，能忍人所不能忍，這才是真功夫，否則還須從頭練起。",
      english:
        "Those who are uncompassionate and unreasonable towards you are your good teachers. Only when you're able to accept adversity with ease and be unmoved, can your patience be revealed. Do not allow a stray comment from others to move you. You need to cultivate to the state of being unmovable and be able to endure the unendurable, only then will you have true skills. Otherwise, you'll have to start over again. (translated by Derrick Gan.)",
    },
    {
      chinese:
        "修道的人，要好像水一樣，有謙卑心，不爭功、不貪德；好的給人家，壞的自己留著。",
      english:
        "Cultivators of the Way should be like water– stay humble, never fight for merit, and never be greedy for virtue; give good things to others and leave bad things for oneself.",
    },
    {
      chinese:
        "人為什麼做人？就因為有愛，才到這五濁惡世來。若愛減輕了，就會生到其他世界中，如極樂世界、琉璃世界、或其他世界。古人說：「愛不重，不生娑婆；業不空，不生極樂。」",
      english:
        "Why do people become people? It is because we have emotional love, that we were born into the evil world of the five turbidities. If we can reduce our emotional love, then we will be reborn in other worlds, such as the Land of Ultimate Bliss or the Land of Vaidūrya. The ancients said, 'If your emotional love weren't heavy, you wouldn't be born in the Saha World. If your karma is not emptied, you cannot be born in the Land of Ultimate Bliss.' (translated by Katherine Wang.)",
    },
    {
      chinese:
        "精進是身精進、心精進。身精進要誦經、禮懺、坐禪、持咒，要用身體來修行。心精進就是念茲在茲，時時刻刻都要勤修戒定慧，息滅貪瞋癡。晝也精進、夜也精進，時時刻刻向前努力，不懶惰。時時刻刻念茲在茲地修行，向前勇猛精進，晝也精進、夜也精進，晝夜恆精進。我們修行，精進是非常重要的。我們不能不精進；你要是不精進，就不會成佛；要想成佛，就要精進。",
      english:
        "Being vigorous is being vigorous with your body and being vigorous with your mind. To be vigorous with your body, you recite sutras, bow repentances, practice Chan, or uphold mantras, i.e. use your body to cultivate. To be vigorous with your mind, you are always mindful; always vigorously cultivating precepts, samadhi, and wisdom; and extinguishing greed, hatred, and delusion. You are vigorous in the day as well as at night, always going forward and working hard, and never being lazy. You are always being mindful while cultivating, going forward courageously and vigorously, and being vigorous in the day and at night. When we cultivate, vigor is very important. You have to be vigorous. If you are not vigorous, then you will not become a Buddha; if you want to become a Buddha, you must be vigorous.",
    },
    {
      chinese: "每個人的身體，就是個監獄，只是你不瞭解！",
      english:
        "Everyone's body is a prison, it's just that you do not realize it! (translated by Katherine Wang.)",
    },
    {
      chinese:
        "觀世音菩薩是看裏邊，你是看外邊。觀世音菩薩是看自性；他的自性和每位眾生都有電波。哪個眾生在打什麼妄想，他都知道。",
      english:
        "Guan Shi Yin Bodhisattva looks inwards, while you look outwards; he observes his inherent nature. There exist electromagnetic waves that connect his inherent nature with other living beings'. Hence, Guan Shi Yin Bodhisattva knows every thought of every living being.",
    },
    {
      chinese: "人持戒，就是清淨自性，將自性黑暗一掃而空。",
      english:
        "When one upholds the precepts, one is purifying one's inherent nature and purging all its darkness. (translated by Derrick Gan.)",
    },
    {
      chinese: "用功，是不怕苦、不怕難、不怕疲倦，才會有成就。",
      english:
        "Hard work is to not fear hardships, to not fear difficulties, and to not fear fatigue. Only then can you see the results.",
    },
    {
      chinese:
        "原子彈、氫氣彈、死光，它們的母親是誰？就是貪瞋癡。所以我們若把貪瞋癡息滅了，原子彈也不響了、氫氣彈也不炸了、死光也沒有用了。",
      english:
        "Atomic bombs, hydrogen bombs, and death rays — what are their roots? It is none other than greed, hatred, and delusion. Therefore, if we can extinguish greed, hatred, and delusion, atomic bombs will not explode anymore, hydrogen bombs will not detonate, and death rays will have no effect.",
    },
    {
      chinese:
        "修行要天天保持像個秤似的平衡下來，怎麼叫平衡下來呢？平衡就是時時都要平平靜靜的，自性一點波浪也沒有；這就是煩惱即菩提、生死即涅槃。",
      english:
        "A good cultivator must maintain balance daily like a scale. What does it mean to be balanced? To be balanced means to always be calm and collected, to have no waves in one's self-nature at all. This means affliction is Bodhi, and birth and death is nirvana.",
    },
    {
      chinese: "修道人要損之又損，以至於無。不要像世俗人，什麼都要多。",
      english:
        "Cultivators must practice renunciation upon renunciation until there is nothing left. Don't be like worldly folks, who want more of everything. (translated by Ryan and Hubert Liu.)",
    },
    {
      chinese:
        "想了生死，應該把生死二字掛在眉梢上，睜眼看見生死問題，閉眼不忘生死問題，要念茲在茲用功修行，才能了生死。",
      english:
        "If you want to end birth and death, you should hang the characters of birth and death on the tips of your eyebrows, so you can see them when you open your eyes, and not forget about birth and death when your eyes are closed. Only when you never forget to cultivate hard, can you end birth and death. (translated by Derrick Gan.)",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1c1917] text-[#EBE9CF]">
      {/* Hero Banner */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/assets/hero-bg.png"
            alt="Background Texture"
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
              世紀末警鐘
            </h1>
            <div className="h-1 w-24 bg-[#c9a050] mx-auto mb-6" />
            <p className="text-xl md:text-2xl font-light tracking-widest uppercase opacity-90">
              Warning of the Century
            </p>
            <p className="text-lg md:text-xl font-serif italic text-[#c9a050]/80 mt-4">
              by Venerable Master Hsuan Hua
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-6 md:space-y-8">
          {teachings.map((teaching, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
              className="group bg-[#2a2522]/50 border border-[#c9a050]/20 rounded-lg p-6 md:p-8 hover:border-[#c9a050]/50 hover:bg-[#2a2522]/70 transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              {/* Chinese Text */}
              <div className="mb-6 pb-6 border-b border-[#c9a050]/10">
                <p className="text-base md:text-lg leading-loose text-stone-200 font-light">
                  {teaching.chinese}
                </p>
              </div>

              {/* English Text */}
              <div>
                <p className="text-base md:text-lg leading-relaxed text-stone-300 font-light">
                  {teaching.english}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Symbol */}
        <div className="mt-24 text-center">
          <span className="block text-[#c9a050] text-4xl">❖</span>
        </div>
      </div>
    </div>
  );
}
