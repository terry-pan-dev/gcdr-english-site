interface Principle {
  title: string;
  abstract: string;
  content: string[];
}

const bodyStyle = {
  color: "var(--foreground)",
} as const;

const accentRuleStyle = {
  width: 28,
  height: 2,
  backgroundColor: "var(--accent)",
  marginBottom: "1.75rem",
} as const;

export function SixPrinciples() {
  const principles: Principle[] = [
    {
      title: "Not Fighting",
      abstract:
        "In cultivation, take care not to fight with others. Don’t be belligerent or aggressive. Don’t have a hot temper. Then you will separate yourself from asuras.",
      content: [
        "Why can’t people dwell in harmony in the world? Because they fight with and rob each other and don’t yield to each other. Therefore wars break out, leading to the tragic situation of countries being destroyed and families going to ruin.",
        "The reason demons become demons is that they tend to fight for supremacy. There is a saying, “Fighting involves thoughts of victory and defeat / And goes in opposition to the Way. / The mind of the four marks is produced, / So how can one attain samadhi?” When a demon fails in his struggle to be number one, it gives rise to anger, jealousy, and obstructiveness. Anyone who has such thoughts or behavior is a demon and can never become a Buddha.",
        "Cultivators have no contention with the world. They do not compete or fight with anyone. Everyone applies effort together. If someone else applies effort diligently, it’s just as good as if you yourself had applied effort diligently. If you think like this, you won’t have any wish to compete for first place.",
        "If you don’t harbor any thoughts of fighting, then you cut off connections with the realm of asuras. If you are not greedy, then you cut off connections with the animal realm.",
      ],
    },
    {
      title: "Not Being Greedy",
      abstract:
        "I have a very strange temperament. What others want, I don’t want. What others crave, I don’t crave. What others like, I don’t like.",
      content: [
        "Buddhist disciples should endure starvation, endure cold, endure thirst, and endure hunger. In everything, you have to be in accord with the Buddhadharma. Don’t be greedy to eat good food, wear good clothes, or live in a fine place. Don’t be greedy for enjoyment. Enduring suffering puts an end to suffering, but enjoying blessings uses up blessings.",
        "Don’t greedily seek a false reputation. In every move, in every word and deed, you have to go towards the true. Be as true as you can be. That’s the basic characteristic of a Buddhist disciple.",
        "We Buddhist disciples have to possess the Dharma-Selecting Vision. We shouldn’t be greedy for bargains or responses. We shouldn’t go around seeking the Buddhadharma with a greedy mind. It shouldn’t be that one day you hear someone say that the Manifest School is good, so you decide to study in the Manifest School, but the next day another person says that the Secret School is good, so you go over to the Secret School to study. You may study for a lifetime, but because you don’t hold firmly to your principles, you don’t concentrate and focus singlemindedly, and you don’t guard the “one,” you end up wasting your whole life in vain.",
        "You should see cultivation as your personal duty. There’s no need to be greedy. In time, your merit and virtue will naturally become perfect and full, and you will naturally accomplish the fruition of Bodhi.",
        "In cultivation you should apply effort naturally. Don’t be greedy and ask whether there is any efficacy or good results. Don’t think about anything; just keep applying effort and changing your faults every day.",
        "Cultivators, no matter what their practice–be it reciting the Buddha’s name, reciting mantras, studying the teachings, upholding the precepts, or meditating–should not be greedy for quick attainment. If you want to have quick attainment, then that’s a form of greed. Once you have greed, it will obstruct your wisdom, your inspiration, and the light of your own nature. The light of your own nature is without greed, and your inspiration and wisdom are also devoid of greed. When you are greedy, it is like dust accumulated on a mirror. People who apply effort must be sure to understand this point. Don’t be greedy for a lot. Don’t be greedy for bargains.",
        "People who are greedy are never happy. If they are not greedy, they will be happy. Therefore, we should put an end to greed.",
        "How many people have ruined their health and reputation because they gave rise to greed? How many people have ruined their countries and families because of it? This is something that harms people. We cannot fail to be on our guard!",
        "Why are you moved by external states? Because of curiosity. Curiosity is basically a form of greed.",
      ],
    },
    {
      title: "Not Seeking",
      abstract:
        "No matter what kind of skill we apply, we don’t obtain any response in the Way. We never manage to get going. Why? Because we have an illusory, unsubstantial “false mind.”",
      content: [
        "We aim for what is high and far, and we seek fame and profit–these are all the false mind.",
        "You look outside for happiness, seeking happiness from morning to night. If you obtain it, it is only a temporary happiness. If you fail to obtain it, then you will have all kinds of affliction. You are insatiably greedy, and you both hope to obtain it and worry about losing it after you obtain it. This is not true happiness. True happiness is free of seeking. “When one reaches the place of no seeking, one has no worries.” If you seek nothing, then that is true happiness. That is the true calm and peace of your own nature.",
      ],
    },
    {
      title: "Not Being Selfish",
      abstract:
        "Basically, there is only one precept–do not be selfish. If people are selfish, they will violate the precepts. If they are not selfish, they won’t violate the precepts.",
      content: [
        "Likewise, if people are selfish, they will break the law. If they are without selfishness, then they will not break the law.",
        "A proper mind is unselfish. If you are selfish, then you don’t have a proper mind.",
        "Why can’t we recognize our original face? Because we have not gotten rid of the mark of self, and we have not gotten rid of selfishness. If we do not have a mark of self or selfishness, then we will recognize our original face.",
        "Worldly people busily run around, always on the go. Their motive is always selfish–they want to protect their own life and property. The Buddhadharma is public-spirited and unselfish–its purpose is to benefit others.",
        "In cultivating, we have to “turn it around.” What does that mean? It means we “give the good things to others, and keep the bad things for ourselves.” We give up the small self in order to realize the great self.",
        "What kind of person is a bad person? A person who is selfish, who pursues personal advantage, and who forgets righteousness when he sees benefit.",
      ],
    },
    {
      title: "Not Pursuing Personal Advantage",
      abstract:
        "When we have the ability, we should hurry up and benefit others. As it is said, “Foster the ground of the mind and nurture the sky of the nature.”",
      content: [
        "If we constantly benefit others, in time we will come to have virtuous conduct. If we always ask others to benefit ourselves, but we do not benefit others; if we always look for bargains and develop the habit of being dependent on others, then we are totally spineless.",
        "If you can benefit people and make them happy, then no matter where you go, everyone will be influenced by your example.",
        "When students are just beginning to learn how to be people, we should teach them not to allow their minds to be permeated by the desire for profit, not to see money as important. The ancients studied in order to understand principle. Nowadays people study for the sake of fame and profit. They want to obtain a good name and a big profit. Why is this? Because the schools are teaching students incorrectly. Thus the world is getting worse every day, degenerating day by day.",
        "One who always thinks of benefiting living beings is a Bodhisattva. One who always thinks of benefiting himself is a devil. A Bodhisattva is only aware of others and is not aware of himself. A devil only knows of his own existence and doesn’t know that there are others. These two are exact opposites.",
      ],
    },
    {
      title: "Not Lying",
      abstract:
        "If we don’t talk, that’s one thing. If we talk, we always speak truthfully. We would never say anything to deceive people. No matter under what circumstances, we honestly speak the truth, and we guard our mouths from lying at all times.",
      content: [
        "I don’t tell lies. No matter where I am, I try to be true. I engage in straight speech and straight conduct, and I don’t use any manipulative tricks in dealing with people and taking care of matters. If there is something I want to say, then I will say it no matter where I am. I’m not afraid of offending people. If there is something I don’t want to say, then I won’t say it no matter where I am. I absolutely will not lie or cheat others.",
        "Everyone should speak frankly more often. Even if you are beaten or scolded for it, you still want to speak the truth. Don’t be afraid. Let me tell you, I’m a straightforward person. I’m someone who establishes his life in straightforwardness and doesn’t seek upon the crooked. If they want to punish me, they can go ahead; it doesn’t matter. If you punish me for telling the truth, I will still think it’s worth it, and I won’t hold a grudge against you. In cultivation, I don’t insist that other people believe whatever I say. Even if they don’t believe it, I will have tried my best.",
        "Why do some people fail to make progress in their practice? Because they have told too many lies. When you utter one false sentence, a hundred false thoughts arise.",
        "If you lie, then no matter what mantra you recite, it won’t be efficacious. Nor will any Sutra you recite have efficacy. If you want to be able to recite mantras or recite Sutras and obtain a response or have some accomplishment, then you cannot lie. Be honest, and speak true and actual words, not false or frivolous words.",
        "We should expand our vision and broaden our views. We should not know only about ourselves, or be aware only of our own family, or know only about our own country’s existence. We have to expand the measure of our mind so that it exhaustively fills empty space and pervades the Dharma Realm. We should think on behalf of all mankind, not just scheme for our own sakes. To benefit mankind and not harm mankind: That is the fundamental requirement for cultivating the Buddha path.",
      ],
    },
  ];

  return (
    <main
      className="min-h-screen w-full overflow-x-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Hero Banner */}
      <section className="pt-nav pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="type-page-title mb-6">The Six Great Guiding Principles</h1>
          <div style={accentRuleStyle} />
        </div>
      </section>

      {/* Main Content */}
      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {principles.map((principle, index) => (
            <PrincipleItem key={index} principle={principle} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}

function PrincipleItem({ principle, index }: { principle: Principle; index: number }) {
  return (
    <article
      className="grid gap-5 py-12 md:grid-cols-[2.5rem_1fr]"
      style={{ borderTop: index === 0 ? undefined : "0.5px solid var(--border)" }}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full border font-serif text-xl"
        style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
      >
        {index + 1}
      </div>

      <div>
        <h2 className="type-section-title mb-4" style={{ marginLeft: 0 }}>
          {principle.title}
        </h2>
        <p className="type-body mb-6 italic" style={bodyStyle}>
          {principle.abstract}
        </p>
        <div className="type-body space-y-5" style={bodyStyle}>
          {principle.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
