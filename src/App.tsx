import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { AboutPage } from "./components/AboutPage";
import { Teachings } from "./components/Teachings";
import { Posters } from "./components/Posters";
import { Events } from "./components/Events";
import { MasterBio } from "./components/MasterBio";
import { EighteenVows } from "./components/EighteenVows";
import { SixPrinciples } from "./components/SixPrinciples";
import { WhiteUniverse } from "./components/WhiteUniverse";
import { DharmaMasters } from "./components/DharmaMasters";
import { Volunteering } from "./components/Volunteering";
import { Visit } from "./components/Visit";
import { Footer } from "./components/Footer";
import { useState, useEffect } from "react";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash.slice(1);
      const pathname = window.location.pathname;

      // Check pathname first, then fall back to hash
      if (pathname === "/events" || hash === "events") {
        setCurrentPage("events");
      } else if (pathname === "/master-about" || hash === "master-about") {
        setCurrentPage("master-about");
      } else if (pathname === "/18-vows" || hash === "18-vows") {
        setCurrentPage("18-vows");
      } else if (pathname === "/six-principles" || hash === "six-principles") {
        setCurrentPage("six-principles");
      } else if (pathname === "/white-universe-poem" || hash === "white-universe-poem") {
        setCurrentPage("white-universe-poem");
      } else if (pathname === "/about" || hash === "about") {
        setCurrentPage("about");
      } else if (pathname === "/dharma-masters" || hash === "dharma-masters") {
        setCurrentPage("dharma-masters");
      } else if (pathname === "/volunteering" || hash === "volunteering") {
        setCurrentPage("volunteering");
      } else {
        setCurrentPage("home");
      }
    };

    handleRouteChange();
    window.addEventListener("hashchange", handleRouteChange);
    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("hashchange", handleRouteChange);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  if (currentPage === "events") {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navigation />
        <Events />
        <Footer />
      </div>
    );
  }

  if (currentPage === "master-about") {
    return (
      <div className="min-h-screen bg-[#1c1917]">
        <Navigation />
        <MasterBio />
        <Footer />
      </div>
    );
  }

  if (currentPage === "18-vows") {
    return (
      <div className="min-h-screen bg-[#1c1917]">
        <Navigation />
        <EighteenVows />
        <Footer />
      </div>
    );
  }

  if (currentPage === "six-principles") {
    return (
      <div className="min-h-screen bg-[#1c1917]">
        <Navigation />
        <SixPrinciples />
        <Footer />
      </div>
    );
  }

  if (currentPage === "white-universe-poem") {
    return (
      <div className="min-h-screen bg-[#1c1917]">
        <Navigation />
        <WhiteUniverse />
        <Footer />
      </div>
    );
  }

  if (currentPage === "about") {
    return (
      <div className="min-h-screen bg-[#1c1917]">
        <Navigation />
        <AboutPage />
        <Footer />
      </div>
    );
  }

  if (currentPage === "dharma-masters") {
    return (
      <div className="min-h-screen bg-[#1c1917]">
        <Navigation />
        <DharmaMasters />
        <Footer />
      </div>
    );
  }

  if (currentPage === "volunteering") {
    return (
      <div className="min-h-screen bg-[#1c1917]">
        <Navigation />
        <Volunteering />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />
      <Hero />
      <About />
      <Teachings />
      <Posters />
      <Visit />
      <Footer />
    </div>
  );
}
