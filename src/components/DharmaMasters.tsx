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
  marginBottom: "1.75rem",
  flexShrink: 0,
} as const;

const locationStyle = {
  fontStyle: "italic",
  fontSize: "0.875rem",
  color: "var(--foreground)",
  marginBottom: "1rem",
  display: "block",
} as const;

const sectionLabelStyle = {
  fontSize: "1.125rem",
  textTransform: "uppercase" as const,
  color: "var(--heading-foreground)",
  display: "block",
  paddingTop: "3.5rem",
  paddingBottom: 0,
} as const;

// Italic, quiet role label — a small stand-in for the visual weight a
// photo would normally carry, kept left-aligned and understated so it
// matches the plain register of the rest of the page rather than reading
// as a formal or ceremonial treatment.
const roleLabelStyle = {
  display: "block",
  fontStyle: "italic",
  color: "var(--muted-foreground)",
  letterSpacing: "0.02em",
  fontSize: "0.95rem",
  marginBottom: "0.5rem",
} as const;

const residentTeachers = [
  {
    title: "Reverend Heng Sure",
    description:
      "Rev. Heng Sure was ordained as a Buddhist monk in 1976. For the sake of world peace, he undertook an over six-hundred-mile pilgrimage from South Pasadena to Ukiah, repeatedly taking three steps and one bow to cover the entire journey. In the entire two years taken to make the pilgrimage, he observed a practice of total silence. Rev. Heng Sure has an M.A. in Oriental Languages from UC Berkeley, and a Ph.D. from the Graduate Theological Union in Berkeley. He serves as the Managing Director of the Berkeley Buddhist Monastery and teaches on the staff at the Institute for World Religions. He is based at Gold Coast Dharma Realm for half the year, and the other half in the United States. He lectures on the Avatamsaka Sūtra at every Sunday afternoon. He is actively involved in interfaith dialogue and in the ongoing conversation between spirituality and technology.",
    image: RevHengSureImg,
    mobileImage: RevHengSureMobileImg,
    imageClassName: "object-cover",
  },
  {
    title: "Dharma Master Jin Fu",
    role: "Monastic Director",
    description:
      "Dharma Master Jin Fu serves as the monastic director of Gold Coast Dharma Realm in Queensland. Over the years, she has devoted herself to Buddhist education, translation, editing, and the propagation of the Buddhadharma. She founded Source of Wisdom (智慧之源) in 1994, a monthly Buddhist publication that has inspired many readers to deepen their study and practice, with some eventually ordaining as monastics—a legacy that continues to this day. Since assuming her managerial responsibilities at Gold Coast Dharma Realm, she has dedicated herself to nurturing its growth as a place of Dharma learning, cultivation, and service to both the local and overseas community. Alongside her monastic responsibilities, DM Jin Fu regularly lectures on a wide range of Buddhist texts, including the Śūraṅgama Sūtra, the Avataṃsaka Sūtra, Dharma Flower Sūtra among others, and continues to contribute to the Buddhist Text Translation Society's publications.",
    // No image on file for DM Jin Fu at present — rendered as a text-only
    // featured profile rather than an image-column layout. See FeaturedTeacherArticle.
  },
];

const associatedTeachers = [
  {
    title: "Dharma Master Heng Chih",
    location: "City of Ten Thousand Buddhas",
    description:
      "Dharma Master Heng Chih has been a Buddhist nun in the Mahayana tradition for 46 years. She was among the first Americans ordained under the guidance of the late Venerable Master Hsuan Hua, founder of the City of Ten Thousand Buddhas. Ordained in 1969, she later earned a Ph.D. in Translation and became a founding member of the Buddhist Text Translation Society. Dharma Master Heng Chih served as Assistant Professor of Buddhist Philosophy at Bond University in Australia until her retirement in 2013 and is now Professor Emerita at Dharma Realm Buddhist University. Her lifelong work focuses on teaching, translating Mahayana texts, and promoting authentic practice and monastic training across DRBA monasteries worldwide.",
    image: HengChihImg,
    mobileImage: HengChihMobileImg,
    imageClassName: "object-contain",
  },
  {
    title: "Dharma Master Heng Lai",
    location: "Snow Mountain Monastery",
    description:
      "Dharma Master Heng Lai met Venerable Master Hsuan Hua in 1969 and received full ordination as a Buddhist monk in 1976 at the City of Ten Thousand Buddhas (CTTB). Before ordination, he served in the US Navy on an aircraft carrier and later worked on a research vessel for the oceanography department. A senior disciple of Venerable Master Hsuan Hua, Dharma Master Heng Lai founded Snow Mountain Monastery in Washington State and has dedicated his life to Chan meditation and community practice. He has completed three periods of seven-day fasting during meditation retreats, with the third lasting 36 days. Known for his deep devotion and storytelling, he often shares insights from his cultivation journey and encourages practitioners to uphold precepts and samadhi as the foundation for wisdom.",
    image: LaiFashrImg,
    mobileImage: LaiFashrMobileImg,
    imageClassName: "object-contain",
  },
];

function getImageSrc(image: ImageMetadata | string) {
  return typeof image === "string" ? image : image.src;
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
  };
  firstInGroup: boolean;
}) {
  return (
    <article
      className={`grid gap-8 ${
        firstInGroup ? "pt-8 pb-16" : "py-16"
      } md:grid-cols-[0.82fr_1fr] md:gap-12`}
      style={{
        borderTop: firstInGroup ? undefined : "0.5px solid var(--border)",
        // Align both columns to their tops so the gold rule always
        // sits level with the top of the photograph
        alignItems: "start",
      }}
    >
      {/* Image column */}
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
            className={`h-full max-h-[520px] min-h-[360px] w-full ${master.imageClassName}`}
          />
        </picture>
      </div>

      {/* Text column — no top padding so the rule sits flush with the image top */}
      <div style={{ paddingTop: 0 }}>
        <div style={accentRuleStyle} />
        <h2
          className="type-section-title mb-2"
          style={{
            ...headingStyle,
            fontSize: "clamp(2rem, 4vw, 2.6rem)",
          }}
        >
          {master.title}
        </h2>
        {master.location && (
          <span style={locationStyle}>{master.location}</span>
        )}
        <p className="type-body" style={bodyStyle}>
          {master.description}
        </p>
      </div>
    </article>
  );
}

// Text-only layout — used when no photograph is available or appropriate
// for a teacher. Same left-aligned rule/heading/paragraph treatment as the
// photographed entries, just without an image column, so it reads as a
// natural variant of the existing pattern rather than a separate style.
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
      {master.role && <span style={roleLabelStyle}>{master.role}</span>}
      <h2
        className="type-section-title mb-2"
        style={{
          ...headingStyle,
          fontSize: "clamp(2rem, 4vw, 2.6rem)",
        }}
      >
        {master.title}
      </h2>
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
      <section className="pt-nav pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="type-page-title mb-6"
            style={{
              ...headingStyle,
            }}
          >
            Our Dharma Teachers
          </h1>
          {/* Page-heading rule — same style object, same colour */}
          <div style={accentRuleStyle} />
        </div>
      </section>

      {/* Content Section */}
      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Resident Teachers */}
          <span className="type-subtitle" style={sectionLabelStyle}>
            Resident Teachers
          </span>
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
          <div
            style={{
              borderTop: "0.5px solid var(--border)",
              display: "block",
              width: "min(calc(100vw - 2rem), 80rem)",
              marginLeft: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <div
              style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 1rem" }}
            >
              <span className="type-subtitle" style={sectionLabelStyle}>
                Associated Teachers
              </span>
            </div>
          </div>
          {associatedTeachers.map((master, index) => (
            <TeacherArticle
              key={master.title}
              master={master}
              firstInGroup={index === 0}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
