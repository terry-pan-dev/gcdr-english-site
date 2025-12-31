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
            <p className="text-stone-300 max-w-5xl mx-auto text-lg">
              Gold Coast Dharma Realm welcomes visitors who wish to learn about Buddhism, join
              ceremonies, or simply experience the peaceful environment of the monastery in Bonogin,
              Queensland. Before visiting, please check the website for current programs, schedules,
              and any guidelines for visitors. Modesty in dress and respectful behaviour are
              encouraged. For group visits or retreats, advance arrangements are recommended to
              ensure availability and proper accommodation.
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
              Guidelines for Visitors
            </h3>
            <div className="grid gap-8">
              <div>
                <h4 className="font-bold text-stone-800 mb-2 text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c9a050]"></span>
                  Preparing for Your Visit
                </h4>
                <p className="text-stone-600 leading-relaxed">
                  Life in a monastery is quite different from everyday life. To help you feel
                  comfortable and maintain a peaceful, harmonious environment, please take a moment
                  to read the guidelines below. They are designed to support both visitors and
                  practitioners in creating a space conducive to spiritual practice.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-stone-800 mb-2 text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c9a050]"></span>
                  Separate Areas for Men and Women
                </h4>
                <p className="text-stone-600 leading-relaxed">
                  Visitors will notice that men and women practise in separate areas. This
                  arrangement helps everyone focus on their cultivation with fewer distractions.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-stone-800 mb-2 text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c9a050]"></span>
                  Dress Comfortably and Modestly
                </h4>
                <p className="text-stone-600 leading-relaxed">
                  Choose clothing that is both comfortable and modest. Loose-fitting attire makes it
                  easier to bow and sit cross-legged during meditation. Please avoid mini-skirts,
                  shorts, and sleeveless tops. If you happen to arrive wearing these, don't worry –
                  you're still very welcome. We simply ask that you keep this in mind for future
                  visits.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-stone-800 mb-2 text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c9a050]"></span>
                  Cherish All Life
                </h4>
                <p className="text-stone-600 leading-relaxed">
                  Please do not harm any living beings while on the grounds – even small creatures
                  such as ants, spiders, or mosquitoes. In Buddhism, all life is interconnected, and
                  practising non-harming helps us develop compassion and empathy.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-stone-800 mb-2 text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c9a050]"></span>
                  Respect Buddhist Texts
                </h4>
                <p className="text-stone-600 leading-relaxed">
                  Sutras and other Buddhist texts are treated with care as they contain the
                  teachings of enlightened sages. Please avoid placing them on the floor or taking
                  them into bathrooms. Keep them clean and in good condition and wash your hands
                  before reading. These customs reflect respect for the Dharma.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-stone-800 mb-2 text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c9a050]"></span>
                  Items Not Permitted
                </h4>
                <p className="text-stone-600 leading-relaxed">
                  Please do not bring alcohol, meat (including fish and poultry), eggs, illicit
                  drugs, or cigarettes into the monastery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
