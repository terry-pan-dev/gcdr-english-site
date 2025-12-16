import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const sampleEvents = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1596458162260-fb75a8fd1d11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRkaGlzdCUyMGV2ZW50JTIwcG9zdGVyfGVufDF8fHx8MTc2MzYyOTMyOXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Spring Dharma Retreat",
    date: "2025-12-15",
    displayDate: "December 15, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Main Hall",
    description:
      "Join us for a full day of meditation, dharma talks, and community practice as we explore the teachings of mindfulness and compassion.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1659439902271-8a310f0edeca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwd29ya3Nob3AlMjBmbHllcnxlbnwxfHx8fDE3NjM2MjkzMjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Weekly Meditation Workshop",
    date: "recurring-saturday",
    displayDate: "Every Saturday",
    time: "7:00 AM - 8:30 AM",
    location: "Meditation Room",
    description:
      "Start your weekend with peace and clarity. Our weekly meditation sessions are suitable for beginners and experienced practitioners alike.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1584937047511-6cb661f59687?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaGFybWElMjB0ZWFjaGluZyUyMGFubm91bmNlbWVudHxlbnwxfHx8fDE3NjM2MjkzMjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Dharma Teaching Series",
    date: "2026-01-05",
    displayDate: "January 5, 2026",
    time: "2:00 PM - 4:00 PM",
    location: "Main Hall",
    description:
      "Explore the fundamental teachings of Buddhism through engaging discussions and practical applications for modern life.",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1598873508391-941423378861?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlyaXR1YWwlMjByZXRyZWF0JTIwcG9zdGVyfGVufDF8fHx8MTc2MzYyOTMzMHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Mountain Retreat",
    date: "2026-02-20",
    displayDate: "February 20-23, 2026",
    time: "3-Day Event",
    location: "Mountain Center",
    description:
      "Immerse yourself in nature and dharma practice during this transformative three-day mountain retreat featuring silent meditation and mindful hiking.",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRkaGlzdCUyMGNlcmVtb255fGVufDF8fHx8MTc2MzYyOTMzMHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Full Moon Ceremony",
    date: "recurring-fullmoon",
    displayDate: "Monthly",
    time: "7:00 PM - 9:00 PM",
    location: "Main Hall",
    description:
      "Celebrate the full moon with chanting, meditation, and traditional ceremonies honoring the lunar cycle and our connection to nature.",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1593811167562-9cef47bfc4a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRkaGlzdCUyMHRlYWNoaW5nfGVufDF8fHx8MTc2MzYyOTMzMHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Introduction to Buddhism",
    date: "2026-03-10",
    displayDate: "March 10, 2026",
    time: "6:00 PM - 8:00 PM",
    location: "Community Room",
    description:
      "Perfect for newcomers! Learn about the core principles of Buddhist philosophy and practice in a welcoming, informal setting.",
  },
];

export function Events() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Get calendar data
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Navigate months
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Check if a date has events
  const getEventsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayOfWeek = new Date(year, month, day).getDay();

    return sampleEvents.filter((event) => {
      if (event.date === dateStr) return true;
      if (event.date === "recurring-saturday" && dayOfWeek === 6) return true;
      return false;
    });
  };

  // Generate calendar days
  const calendarDays = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#EBE9CF" }}>
      {/* Hero Section */}
      <div className="relative pt-32 pb-16" style={{ backgroundColor: "#1c1917" }}>
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, #c9a050 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px w-16" style={{ backgroundColor: "#c9a050" }} />
              <div
                className="mx-4 w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#c9a050" }}
              >
                <Calendar size={32} className="text-white" />
              </div>
              <div className="h-px w-16" style={{ backgroundColor: "#c9a050" }} />
            </div>
            <h1 className="text-5xl mb-6" style={{ color: "#EBE9CF" }}>
              Dharma Calendar
            </h1>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: "#EBE9CF", opacity: 0.8 }}>
              Join us for upcoming events, teachings, and spiritual gatherings at Gold Coast Dharma
              Realm
            </p>
          </div>
        </div>
      </div>

      {/* Calendar and Events List */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Calendar Grid */}
          <div
            className="bg-white rounded-lg shadow-xl p-6 md:p-8 mb-16"
            style={{ border: "3px solid #c9a050" }}
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={previousMonth}
                className="p-2 rounded-full transition-all hover:shadow-lg"
                style={{ backgroundColor: "#c9a050" }}
              >
                <ChevronLeft size={24} className="text-white" />
              </button>

              <h2 className="text-3xl text-stone-900">
                {monthNames[month]} {year}
              </h2>

              <button
                onClick={nextMonth}
                className="p-2 rounded-full transition-all hover:shadow-lg"
                style={{ backgroundColor: "#c9a050" }}
              >
                <ChevronRight size={24} className="text-white" />
              </button>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="text-center py-3 rounded"
                  style={{ backgroundColor: "#1c1917", color: "#c9a050" }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }

                const dayEvents = getEventsForDate(day);
                const hasEvents = dayEvents.length > 0;
                const isToday =
                  new Date().toDateString() === new Date(year, month, day).toDateString();

                return (
                  <div
                    key={day}
                    className="aspect-square p-2 rounded-lg transition-all cursor-pointer hover:shadow-lg"
                    style={{
                      backgroundColor: hasEvents ? "#c9a050" : isToday ? "#EBE9CF" : "#f5f5f4",
                      border: isToday ? "2px solid #c9a050" : "1px solid #e7e5e4",
                    }}
                    onClick={() =>
                      hasEvents &&
                      setSelectedDate(
                        `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                      )
                    }
                  >
                    <div className="flex flex-col h-full items-center">
                      <div
                        className="text-sm md:text-base mb-1"
                        style={{ color: hasEvents ? "white" : "#1c1917" }}
                      >
                        {day}
                      </div>
                      {hasEvents && (
                        <>
                          {/* Mobile: Show dots */}
                          <div className="flex-1 flex items-center justify-center md:hidden">
                            <div className="flex flex-col gap-0.5">
                              {dayEvents.slice(0, 3).map((_, i) => (
                                <div key={i} className="w-1 h-1 rounded-full bg-white" />
                              ))}
                            </div>
                          </div>
                          {/* Desktop: Show event titles */}
                          <div className="hidden md:flex flex-col gap-1 text-xs overflow-hidden w-full">
                            {dayEvents.slice(0, 2).map((event) => (
                              <div
                                key={event.id}
                                className="px-1 py-0.5 rounded truncate text-center"
                                style={{
                                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                                  color: "white",
                                }}
                              >
                                {event.title}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-white text-xs px-1 text-center">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Date Events */}
            {selectedDate && (
              <div
                className="mt-8 p-6 rounded-lg"
                style={{ backgroundColor: "#EBE9CF", border: "2px solid #c9a050" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl text-stone-900">
                    Events on{" "}
                    {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </h3>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="text-stone-600 hover:text-stone-900"
                  >
                    Close
                  </button>
                </div>
                <div className="space-y-4">
                  {sampleEvents
                    .filter((event) => {
                      const [y, m, d] = selectedDate.split("-");
                      const dayOfWeek = new Date(
                        parseInt(y),
                        parseInt(m) - 1,
                        parseInt(d)
                      ).getDay();
                      if (event.date === selectedDate) return true;
                      if (event.date === "recurring-saturday" && dayOfWeek === 6) return true;
                      return false;
                    })
                    .map((event) => (
                      <div
                        key={event.id}
                        className="p-4 bg-white rounded-lg shadow-md"
                        style={{ border: "2px solid #c9a050" }}
                      >
                        <h4 className="text-xl text-stone-900 mb-2">{event.title}</h4>
                        <div className="flex flex-col gap-2 text-stone-600">
                          <div className="flex items-center gap-2">
                            <Clock size={16} style={{ color: "#c9a050" }} />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} style={{ color: "#c9a050" }} />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* List View */}
          <div className="space-y-8">
            {sampleEvents.map((event, index) => (
              <div key={event.id} className="group">
                {/* Event Card */}
                <div
                  className={`flex flex-col md:flex-row gap-6 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  style={{
                    backgroundColor: "white",
                    border: "3px solid #c9a050",
                  }}
                >
                  {/* Event Image */}
                  <div className="md:w-1/3 flex-shrink-0">
                    <div
                      className="relative overflow-hidden rounded-lg"
                      style={{
                        border: "2px solid #c9a050",
                        boxShadow: "0 4px 12px rgba(201, 160, 80, 0.3)",
                      }}
                    >
                      <ImageWithFallback
                        src={event.image}
                        alt={event.title}
                        className="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Corner Decorations */}
                      <div
                        className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 rounded-tl"
                        style={{ borderColor: "#c9a050" }}
                      />
                      <div
                        className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 rounded-tr"
                        style={{ borderColor: "#c9a050" }}
                      />
                      <div
                        className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 rounded-bl"
                        style={{ borderColor: "#c9a050" }}
                      />
                      <div
                        className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 rounded-br"
                        style={{ borderColor: "#c9a050" }}
                      />
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="md:w-2/3 flex flex-col justify-center">
                    {/* Title */}
                    <h3 className="text-3xl text-stone-900 mb-4">{event.title}</h3>

                    {/* Description */}
                    <p className="text-stone-600 mb-6">{event.description}</p>

                    {/* Date, Time, Location */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                          style={{ backgroundColor: "#c9a050" }}
                        >
                          <Calendar size={20} />
                        </div>
                        <div>
                          <div className="text-stone-500 text-sm">Date</div>
                          <div className="text-stone-900">{event.displayDate}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                          style={{ backgroundColor: "#c9a050" }}
                        >
                          <Clock size={20} />
                        </div>
                        <div>
                          <div className="text-stone-500 text-sm">Time</div>
                          <div className="text-stone-900">{event.time}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                          style={{ backgroundColor: "#c9a050" }}
                        >
                          <MapPin size={20} />
                        </div>
                        <div>
                          <div className="text-stone-500 text-sm">Location</div>
                          <div className="text-stone-900">{event.location}</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div>
                      <button
                        className="px-6 py-3 rounded transition-all hover:shadow-lg"
                        style={{ backgroundColor: "#c9a050", color: "#1c1917" }}
                      >
                        Register Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Timeline Connector (except for last item) */}
                {index < sampleEvents.length - 1 && (
                  <div className="flex justify-center py-4">
                    <div className="flex flex-col items-center">
                      <div className="w-px h-8" style={{ backgroundColor: "#c9a050" }} />
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: "#c9a050" }}
                      />
                      <div className="w-px h-8" style={{ backgroundColor: "#c9a050" }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
