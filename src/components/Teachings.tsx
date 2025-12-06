import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BookOpen, Sparkles, Sun, Video } from "lucide-react";

export function Teachings() {
  const programs = [
    {
      icon: Sun,
      title: "Morning Meditation",
      time: "Daily 6:00 AM - 7:30 AM",
      description: "Begin your day with guided meditation and chanting in our main hall",
    },
    {
      icon: BookOpen,
      title: "Dharma Study",
      time: "Sunday 1:30 PM - 3:00 PM",
      description: "Explore Buddhist scriptures and philosophy with our resident monks",
      zoomLink: "https://drba-org.zoom.us/j/84914586289",
    },
    {
      icon: Sparkles,
      title: "Kids School",
      time: "Sunday 9:00 AM - 11:00 AM",
      description: "A special program for children to learn Chinese language, Chinese calligraphy, Buddhist teachings, meditation, and moral values in a fun and engaging way",
      note: "Kids School will close during any QLD school holidays",
    },
  ];

  return (
    <section id="teachings" className="py-20 bg-stone-900 text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <ImageWithFallback
          src="/assets/dharma-realm-temple.jpg"
          alt="Dharma Realm Temple"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-amber-600/20 rounded-full mb-4" style={{ color: '#EBE9CF' }}>
            Teachings & Programs
          </div>
          <h2 className="text-4xl md:text-5xl mb-6" style={{ color: '#EBE9CF' }}>
            The Path to Enlightenment
          </h2>
          <p className="max-w-2xl mx-auto text-lg" style={{ color: '#EBE9CF', opacity: 0.8 }}>
            Join us in exploring the Buddha's teachings through meditation, study, and practice
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {programs.map((program) => (
            <div
              key={program.title}
              className="p-8 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4" style={{ backgroundColor: '#c9a050', color: '#EBE9CF' }}>
                <program.icon size={28} />
              </div>
              <h3 className="text-xl mb-2" style={{ color: '#EBE9CF' }}>{program.title}</h3>
              <p className="text-amber-400 mb-3">{program.time}</p>
              <p style={{ color: '#EBE9CF', opacity: 0.7 }} className="mb-4">{program.description}</p>
              {program.note && (
                <p className="text-xs italic mb-4" style={{ color: '#EBE9CF', opacity: 0.6 }}>
                  {program.note}
                </p>
              )}
              {program.zoomLink && (
                <a
                  href={program.zoomLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded transition-all hover:shadow-lg text-sm"
                  style={{ backgroundColor: '#c9a050', color: '#1c1917' }}
                >
                  <Video size={16} />
                  Join Zoom Meeting
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl italic mb-4" style={{ color: '#EBE9CF', opacity: 0.9 }}>
            "Peace comes from within. Do not seek it without."
          </blockquote>
          <cite className="text-amber-400">&mdash; The Buddha</cite>
        </div>
      </div>
    </section>
  );
}