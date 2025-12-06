import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Flame, Heart, Users } from "lucide-react";

export function About() {
  const values = [
    {
      icon: Flame,
      title: "Mindfulness",
      description: "Cultivating present-moment awareness through meditation and contemplation",
    },
    {
      icon: Heart,
      title: "Compassion",
      description: "Extending loving-kindness to all beings without discrimination",
    },
    {
      icon: Users,
      title: "Community",
      description: "Supporting each other on the path to enlightenment and inner peace",
    },
  ];

  return (
    <section id="about" className="py-20 relative bg-[#f5f3ed]" style={{
      backgroundImage: `
        repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(201, 160, 80, 0.03) 35px, rgba(201, 160, 80, 0.03) 70px)
      `
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-block px-4 py-1 bg-amber-100 text-amber-800 rounded-full mb-4">
              About Us
            </div>
            <h2 className="text-4xl md:text-5xl text-stone-900 mb-6 font-serif">
              A Place of Serenity and Enlightenment
            </h2>
            <p className="text-stone-600 mb-6 text-lg leading-relaxed">
              For over three centuries, Gold Coast Dharma Realm has stood as a beacon of
              Buddhist wisdom and spiritual practice. Our monastery offers a sanctuary
              where seekers from all walks of life can find peace, guidance, and a
              deeper connection to the dharma.
            </p>
            <p className="text-stone-600 text-lg leading-relaxed">
              We are dedicated to preserving ancient Buddhist traditions while making
              these timeless teachings accessible to the modern world. Through
              meditation, study, and service, we cultivate wisdom and compassion in
              daily life.
            </p>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
            <ImageWithFallback
              src="/assets/master_hua.jpeg"
              alt="Monk in meditation"
              className="w-full h-full object-cover object-left"
            />
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="text-center p-8 rounded-lg bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all border border-[#c9a050]/10 hover:border-[#c9a050]/30"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full text-white mb-4 shadow-lg" style={{ backgroundColor: '#c9a050' }}>
                <value.icon size={32} />
              </div>
              <h3 className="text-xl text-stone-900 mb-3 font-serif">{value.title}</h3>
              <p className="text-stone-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}