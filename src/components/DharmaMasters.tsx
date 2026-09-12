import RevHengSureImg from "../assets/RevHengSure.webp";
import RevHengSureMobileImg from "../assets/RevHengSureMobile.webp";
import HengChihImg from "../assets/DharmaMasterHengChih.webp";
import HengChihMobileImg from "../assets/DharmaMasterHengChihMobile.webp";
import LaiFashrImg from "../assets/DharmaMasterHengLai.webp";
import LaiFashrMobileImg from "../assets/DharmaMasterHengLaiMobile.webp";

const headingStyle = {
  color: "var(--heading-foreground)",
  marginLeft: 0,
} as const;

const bodyStyle = {
  color: "var(--foreground)",
} as const;

const accentRuleStyle = {
  width: 28,
  height: 1.5,
  backgroundColor: "var(--color-accent-gold)",
  marginBottom: "0.75rem",
  flexShrink: 0,
} as const;

const locationStyle = {
  fontStyle: "italic",
  fontSize: "0.875rem",
  color: "var(--foreground)",
  marginBottom: "1rem",
  display: "block",
} as const;

const roleLabelStyle = {
  display: "block",
  fontStyle: "italic",
  color: "var(--muted-foreground)",
  letterSpacing: "0.02em",
  fontSize: "0.95rem",
  marginTop: "0.15rem",
  marginBottom: "1rem",
} as const;

const groupHeadingStyle = {
  color: "var(--heading-foreground)",
  fontSize: "clamp(1.55rem, 2.5vw, 1.8rem)",
} as const;

const groupDescriptionStyle = {
  color: "var(--muted-foreground)",
  fontSize: "0.9rem",
  fontStyle: "italic",
  marginTop: "0.45rem",
  marginBottom: 0,
} as const;

const residentTeachers = [
  {
    title: "Rev. Heng Sure",
    description:
      "Rev. Heng Sure was ordained as a Buddhist monk in 1976. For the sake of world peace, he undertook an over six-hundred-mile pilgrimage from South Pasadena to Ukiah, repeatedly taking three steps and one bow to cover the entire journey. In the entire two years taken to make the pilgrimage, he observed a practice of total silence. Rev. Heng Sure has an M.A. in Oriental Languages from UC Berkeley, and a Ph.D. from the Graduate Theological Union in Berkeley. He serves as the Managing Director of the Berkeley Buddhist Monastery and teaches on the staff at the Institute for World Religions. He is based at Gold Coast Dharma Realm for half the year, and the other half in the United States. He lectures on the Avatamsaka Sūtra at every Sunday afternoon. He is actively involved in interfaith dialogue and in the ongoing conversation between spirituality and technology.",
    image: RevHengSureImg,
    mobileImage: RevHengSureMobileImg,
    imageClassName: "object-cover",
  },
  {
    title: "Dharma Master Jin Fu",
    role: "Monastic Director of Gold Coast Dharma Realm",
    description:
      "Dharma Master Jin Fu serves as the monastic director of Gold Coast Dharma Realm in Queensland. Over the years, she has devoted herself to Buddhist education, translation, editing, and the propagation of the Buddhadharma. She founded Source of Wisdom (智慧之源) in 1994, a monthly Buddhist publication that has inspired many readers to deepen their study and practice, with some eventually ordaining as monastics—a legacy that continues to this day. Since assuming her managerial responsibilities at Gold Coast Dharma Realm, she has dedicated herself to nurturing its growth as a place of Dharma learning, cultivation, and service to both the local and overseas community. Alongside her monastic responsibilities, DM Jin Fu regularly lectures on a wide range of Buddhist texts, including the Śūraṅgama Sūtra, the Avataṃsaka Sūtra, Dharma Flower Sūtra among others, and continues to contribute to the Buddhist Text Translation Society's publications.",
  },
];

const associatedTeachers = [
  {
    title: "Dharma Master Heng Lai",
    location: "Snow Mountain Monastery",
    locationUrl: "https://smm.drba.org/",
    description:
      "Dharma Master Heng Lai met Venerable Master Hsuan Hua in 1969 and received full ordination as a Buddhist monk in 1976 at the City of Ten Thousand Buddhas (CTTB). Before ordination, he served in the US Navy on an aircraft carrier and later worked on a research vessel for the oceanography department. A senior disciple of Venerable Master Hsuan Hua, Dharma Master Heng Lai founded Snow Mountain Monastery in Washington State and has dedicated his life to Chan meditation and community practice. He has completed three periods of seven-day fasting during meditation retreats, with the third lasting 36 days. Known for his deep devotion and storytelling, he often shares insights from his cultivation journey and encourages practitioners to uphold precepts and samadhi as the foundation for wisdom.",
    image: LaiFashrImg,
    mobileImage: LaiFashrMobileImg,
    imageClassName: "object-contain",
  },
  {
    title: "Dharma Master Heng Chih",
    location: "City of Ten Thousand Buddhas",
    locationUrl: "https://www.cttbusa.org/",
    description:
      "Dharma Master Heng Chih is a Buddhist nun in the Mahayana tradition and was among the first five American disciples of the late Venerable Master Hsuan Hua. Ordained in 1969, she later earned a Ph.D. in Translation and became a founding member of the Buddhist Text Translation Society. She served as Assistant Professor of Buddhist Philosophy at Bond University in Australia until her retirement in 2013 and holds the title of Professor Emerita at Dharma Realm Buddhist University. Her work has focused on teaching, translating Mahayana texts, and supporting authentic Buddhist practice and monastic training throughout the Dharma Realm Buddhist Association.",
    image: HengChihImg,
    mobileImage: HengChihMobileImg,
    imageClassName: "object-contain",
  },
];

function getImageSrc(image: ImageMetadata | string) {
  return typeof image === "string" ? image : image.src;
}

function GroupHeading({
  children,
  description,
}: {
  children: React.ReactNode;
  description: string;
}) {
  return (
    <div className="relative pt-6 pb-5 sm:pt-10 sm:pb-10">
      <h2
        className="type-section-title text-center"
        style={{
          color: "var(--heading-foreground)",
          fontSize: "clamp(1.6rem, 2.5vw, 1.9rem)",
          marginLeft: 0,
        }}
      >
        {children}
      </h2>

      <p
        className="text-center"
        style={{
          color: "var(--muted-foreground)",
          fontSize: "0.9rem",
          fontStyle: "italic",
          marginTop: "0.35rem",
          marginBottom: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
}

function TeacherArticle({
  master,
  firstInGroup,
}: {
  master: (typeof residentTeachers)[0] & {
    image: ImageMetadata | string;
    mobileImage: ImageMetadata | string;
    imageClassName: string;
    location?: string;
    locationUrl?: string;
  };
  firstInGroup: boolean;
}) {
  return (
    <article
      className={`grid gap-8 ${
        firstInGroup ? "pt-2 pb-16" : "py-16"
      } md:grid-cols-[0.82fr_1fr] md:gap-12`}
      style={{
        borderTop: firstInGroup ? undefined : "0.5px solid var(--border)",
        alignItems: "start",
      }}
    >
      <div
        className="relative overflow-hidden md:sticky md:top-28"
        style={{
          borderRadius: 2,
          backgroundColor: "var(--background)",
        }}
      >
        <picture>
          <source
            media="(max-width: 639px)"
            srcSet={getImageSrc(master.mobileImage)}
          />
          <img
            src={getImageSrc(master.image)}
            alt={master.title}
            className={`w-full h-auto md:h-full md:max-h-[520px] md:min-h-[360px] ${master.imageClassName}`}
          />
        </picture>
      </div>

      <div style={{ paddingTop: 0 }}>
        <div style={accentRuleStyle} />

        <h3
          className="type-section-title mb-2"
          style={{
            ...headingStyle,
            fontSize: "clamp(2rem, 4vw, 2.6rem)",
          }}
        >
          {master.title}
        </h3>

        {master.location &&
          (master.locationUrl ? (
            <a
              href={master.locationUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...locationStyle,
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                textDecorationThickness: "1px",
              }}
            >
              {master.location}
            </a>
          ) : (
            <span style={locationStyle}>{master.location}</span>
          ))}

        <p className="type-body" style={bodyStyle}>
          {master.description}
        </p>
      </div>
    </article>
  );
}

function FeaturedTeacherArticle({
  master,
  firstInGroup,
}: {
  master: (typeof residentTeachers)[0];
  firstInGroup: boolean;
}) {
  return (
    <article
      className={firstInGroup ? "pt-8 pb-16" : "py-16"}
      style={{
        borderTop: firstInGroup ? undefined : "0.5px solid var(--border)",
      }}
    >
      <div style={accentRuleStyle} />

      <h3
        className="type-section-title mb-2"
        style={{
          ...headingStyle,
          fontSize: "clamp(2rem, 4vw, 2.6rem)",
        }}
      >
        {master.title}
      </h3>

      {master.role && <span style={roleLabelStyle}>{master.role}</span>}

      <p className="type-body" style={bodyStyle}>
        {master.description}
      </p>
    </article>
  );
}

export function DharmaMasters() {
  return (
    <main
      className="min-h-screen w-full overflow-x-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Hero Section */}
      <section className="pt-nav pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="type-page-title mb-6"
            style={{
              ...headingStyle,
            }}
          >
            Our Dharma Teachers
          </h1>

          <div style={accentRuleStyle} />
        </div>
      </section>

      {/* Content Section */}
      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Resident Teachers */}
          <GroupHeading description="Teachers based at Gold Coast Dharma Realm">
            Resident Teachers
          </GroupHeading>

          {residentTeachers.map((master, index) =>
            "image" in master ? (
              <TeacherArticle
                key={master.title}
                master={
                  master as (typeof residentTeachers)[0] & {
                    image: ImageMetadata | string;
                    mobileImage: ImageMetadata | string;
                    imageClassName: string;
                  }
                }
                firstInGroup={index === 0}
              />
            ) : (
              <FeaturedTeacherArticle
                key={master.title}
                master={master}
                firstInGroup={index === 0}
              />
            ),
          )}

          {/* Associated Teachers */}
          <div className="pt-8 sm:pt-8">
            <div
              style={{
                width: "75vw",
                marginLeft: "50%",
                transform: "translateX(-50%)",
                marginBottom: "0",
              }}
            >
              <div
                style={{
                  height: "1px",
                  backgroundColor: "var(--border)",
                  marginBottom: "4px",
                }}
              />
              <div
                style={{
                  height: "1px",
                  backgroundColor: "var(--border)",
                }}
              />
            </div>

            <GroupHeading description="Teachers from other DRBA monasteries">
              Associated Teachers
            </GroupHeading>

            {associatedTeachers.map((master, index) => (
              <TeacherArticle
                key={master.title}
                master={master}
                firstInGroup={index === 0}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
