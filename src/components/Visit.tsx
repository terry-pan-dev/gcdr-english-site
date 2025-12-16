import { Clock, MapPin, Phone, Mail } from "lucide-react";

export function Visit() {
  const contactInfo = [
    {
      icon: MapPin,
      label: "Location",
      value: "106 Bonogin Road, Bonogin, Queensland 4213 Australia",
    },
    {
      icon: Clock,
      label: "Temple Hours",
      value: "Saturday 7:30 AM – 3:00 PM  |  Sunday 7:30 AM – 11:30 AM",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+61 (07) 5522-8788",
    },
    {
      icon: Mail,
      label: "Email",
      value: "gcdr.australia@gmail.com",
    },
  ];

  return (
    <section id="visit" className="bg-stone-50">
      {/* Dark Top Half - for navigation visibility */}
      <div className="bg-[#1c1917] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-amber-100 text-amber-800 rounded-full mb-4">
              Visit Us
            </div>
            <h2 className="text-4xl md:text-5xl text-white mb-6">Welcome All Seekers</h2>
            <p className="text-stone-300 max-w-2xl mx-auto text-lg">
              Our doors are open to everyone, regardless of background or belief. Come experience
              the tranquility of our temple.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full text-white flex items-center justify-center"
                    style={{ backgroundColor: "#c9a050" }}
                  >
                    <info.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-white mb-1">{info.label}</h3>
                    <p className="text-stone-300">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Light Bottom Half - Visitor Guidelines */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Detailed Visitor Guidelines */}
          <div className="p-8 bg-white rounded-lg shadow-sm border border-stone-200">
            <h3 className="text-2xl text-stone-900 mb-8 font-serif border-b pb-4 border-amber-100">
              Visitor Guidelines
            </h3>
            <div className="grid gap-8">
              <div>
                <h4 className="font-bold text-stone-800 mb-2 text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c9a050]"></span>
                  Separation of Men and Women
                </h4>
                <p className="text-stone-600 leading-relaxed pl-4 border-l-2 border-amber-50 ml-1">
                  Usually, the first thing people notice when they visit is that men and women are
                  separated. The reason for this separation is to allow everyone to focus on the
                  practice with fewer distractions.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-stone-800 mb-2 text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c9a050]"></span>
                  Comfortable and Modest Clothing
                </h4>
                <p className="text-stone-600 leading-relaxed pl-4 border-l-2 border-amber-50 ml-1">
                  Clothing in the monastery should be comfortable and modest. Comfortable clothing
                  is ideal for meditation and cultivation because it allows you to bow and sit
                  cross-legged unimpeded. Modest clothing is important because it causes fewer
                  distractions for other people. As a visitor, please refrain from wearing clothing
                  such as mini-skirts, shorts, and sleeveless shirts. (If you already are wearing
                  them, don't worry about it. We are very happy to have you, but please try to be
                  more careful next time you visit.)
                </p>
              </div>

              <div>
                <h4 className="font-bold text-stone-800 mb-2 text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c9a050]"></span>
                  Cherishing All Forms of Life
                </h4>
                <p className="text-stone-600 leading-relaxed pl-4 border-l-2 border-amber-50 ml-1">
                  Please refrain from killing any living creatures in the monastery, including even
                  small insects such as spiders, ants, flies, or mosquitoes. Buddhists practice
                  non-harming in order to cultivate a heart of compassion and empathy for others. In
                  Buddhism, all life forms are interconnected, and all creatures are considered
                  "family."
                </p>
              </div>

              <div>
                <h4 className="font-bold text-stone-800 mb-2 text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c9a050]"></span>
                  Respecting Buddhist Sutras and Texts
                </h4>
                <p className="text-stone-600 leading-relaxed pl-4 border-l-2 border-amber-50 ml-1">
                  Buddhist Sutras and texts are the words of the Buddhist sages that give
                  instructions on how to become awakened, and for this reason, they are treated with
                  utmost care and respect. Furthermore, our attitude toward a sacred text affects
                  our ability to access the teachings contained within it. Hence, people are
                  encouraged not to put Buddhist books on the ground or bring them into the
                  bathroom. Other customs in the monastery are keeping Sutras in good condition and
                  making sure one’s hands are clean before reading them. In general, the intent of
                  all these customs is the same —to show one’s respect for the text.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-stone-800 mb-2 text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c9a050]"></span>
                  Things Not to Bring into the Monastery
                </h4>
                <p className="text-stone-600 leading-relaxed pl-4 border-l-2 border-amber-50 ml-1">
                  Please do not bring alcohol, meat (including fish & poultry), eggs, illicit drugs,
                  or cigarettes into the monastery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
