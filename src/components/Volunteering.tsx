import { Users, Heart, Sparkles, Flower2, CalendarHeart } from "lucide-react";
import { motion } from "motion/react";

export function Volunteering() {
  const scrollToForm = () => {
    const formSection = document.getElementById("volunteer-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const benefits = [
    {
      icon: Users,
      title: "Connection",
      description:
        "Connect with a community of like-minded individuals dedicated to kindness and service.",
    },
    {
      icon: Heart,
      title: "Inner Peace",
      description: "Find tranquility by working in our meditative and sacred environment.",
    },
    {
      icon: Sparkles,
      title: "Good Karma",
      description: "Engage in selfless action to cultivate positive spiritual merits.",
    },
  ];

  const roles = [
    {
      image: "/assets/temple-2.jpg",
      title: "Groundskeeping",
      description: "Maintain the beauty of nature and our sacred grounds",
    },
    {
      image: "/assets/temple-5.jpg",
      title: "Kitchen Service",
      description: "Help prepare vegetarian meals for the community",
    },
    {
      image: "/assets/event-hosting.webp",
      title: "Event Hosting",
      description: "Welcome guests and assist with dharma events",
    },
    {
      image: "/assets/translation.webp",
      title: "Sutra Translation",
      description: "Help translate sacred Buddhist texts",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1c1917" }}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-end justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/temple-1.jpg')",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(28, 25, 23, 0.7), rgba(28, 25, 23, 0.9))",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pb-32">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif italic mb-6"
            style={{ color: "#EBE9CF" }}
          >
            Serve the Community,
            <br />
            Nourish Your Soul
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "#EBE9CF", opacity: 0.85 }}
          >
            Join our volunteer family at Gold Coast Dharma Realm. Discover the spiritual benefits of
            selfless service (Seva) while keeping our sanctuary beautiful.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={scrollToForm}
              className="px-6 py-3 sm:px-8 sm:py-4 rounded-full font-medium transition-all hover:shadow-lg hover:scale-105"
              style={{ backgroundColor: "#c9a050", color: "#1c1917" }}
            >
              Sign Up to Volunteer
            </button>
            <a
              href="#learn-more"
              className="px-6 py-3 sm:px-8 sm:py-4 rounded-full font-medium transition-all hover:shadow-lg border-2"
              style={{ borderColor: "#EBE9CF", color: "#EBE9CF" }}
            >
              Learn More
            </a>
          </motion.div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-16"
            style={{ fill: "#1c1917" }}
          >
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
          </svg>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section id="learn-more" className="py-20" style={{ backgroundColor: "#1c1917" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl mb-4"
              style={{ color: "#EBE9CF" }}
            >
              Why Volunteer?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "#EBE9CF", opacity: 0.7 }}
            >
              Experience the profound impact of selfless service on your spiritual journey and
              personal growth.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-8 rounded-2xl transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: "rgba(201, 160, 80, 0.1)",
                  border: "1px solid rgba(201, 160, 80, 0.3)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: "rgba(201, 160, 80, 0.2)" }}
                >
                  <benefit.icon size={28} style={{ color: "#c9a050" }} />
                </div>
                <h3 className="text-2xl mb-3" style={{ color: "#c9a050" }}>
                  {benefit.title}
                </h3>
                <p style={{ color: "#EBE9CF", opacity: 0.8 }}>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Volunteering Section */}
      <section className="py-20" style={{ backgroundColor: "#EBE9CF" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center mb-8"
            >
              <div className="h-px w-16" style={{ backgroundColor: "#c9a050" }} />
              <div
                className="mx-4 w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#c9a050" }}
              >
                <Flower2 size={32} className="text-white" />
              </div>
              <div className="h-px w-16" style={{ backgroundColor: "#c9a050" }} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl mb-8"
              style={{ color: "#1c1917" }}
            >
              Volunteering at Gold Coast Dharma Realm
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg max-w-none text-left"
              style={{ color: "#44403c" }}
            >
              <p className="mb-6 leading-relaxed">
                Volunteering is a wonderful way to support the monastery and be part of a community
                dedicated to kindness and service. Whether you can offer a few hours or a regular
                commitment, your help makes a real difference. Tasks may include gardening,
                cleaning, preparing vegetarian meals, assisting with events, translating sutra texts
                or helping maintain the grounds.
              </p>
              <p className="leading-relaxed">
                Volunteering is not only about giving—it's also an opportunity to learn, practise
                mindfulness, and experience the joy of working together in harmony. Everyone is
                welcome, and no prior experience is needed. If you'd like to contribute your time
                and skills, please contact us or speak to a monastic/volunteer during your visit.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Volunteer Roles Section */}
      <section className="py-20" style={{ backgroundColor: "#1c1917" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl mb-4"
              style={{ color: "#EBE9CF" }}
            >
              Volunteer Roles
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg"
              style={{ color: "#EBE9CF", opacity: 0.7 }}
            >
              Find a role that resonates with your skills and spirit.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
                className="group cursor-pointer"
              >
                <div
                  className="relative overflow-hidden rounded-xl mb-4"
                  style={{ border: "2px solid rgba(201, 160, 80, 0.3)" }}
                >
                  <img
                    src={role.image}
                    alt={role.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(to top, rgba(28, 25, 23, 0.9), transparent)",
                    }}
                  />
                </div>
                <h3 className="text-xl mb-1" style={{ color: "#c9a050" }}>
                  {role.title}
                </h3>
                <p className="text-sm" style={{ color: "#EBE9CF", opacity: 0.7 }}>
                  {role.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Form Section */}
      <section id="volunteer-form" className="py-20" style={{ backgroundColor: "#EBE9CF" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px w-16" style={{ backgroundColor: "#c9a050" }} />
              <div
                className="mx-4 w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#c9a050" }}
              >
                <CalendarHeart size={28} className="text-white" />
              </div>
              <div className="h-px w-16" style={{ backgroundColor: "#c9a050" }} />
            </div>

            <h2 className="text-3xl md:text-4xl mb-4" style={{ color: "#1c1917" }}>
              Sign Up to Volunteer
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#44403c" }}>
              Ready to lend a hand? Complete our Volunteer Registration Form to let us know your
              interests and availability. This helps us match you with tasks that suit your skills.
              Registering ensures smooth coordination and keeps you informed about upcoming
              opportunities.
            </p>
          </div>

          {/* Google Form Embed */}
          <div
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{ border: "3px solid #c9a050" }}
          >
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfW3yI4Ozj0LCihE0VBzUHt2q0Mn7q6wcj2LxK4H4ovpeg38A/viewform?embedded=true"
              width="100%"
              height="1543"
              className="bg-white"
            >
              Loading...
            </iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
