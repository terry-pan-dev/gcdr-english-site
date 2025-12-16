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
import { Visit } from "./components/Visit";
import { Footer } from "./components/Footer";
import { useState, useEffect } from "react";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === "events") {
        setCurrentPage("events");
      } else if (hash === "master-about") {
        setCurrentPage("master-about");
      } else if (hash === "18-vows") {
        setCurrentPage("18-vows");
      } else if (hash === "six-principles") {
        setCurrentPage("six-principles");
      } else if (hash === "white-universe-poem") {
        setCurrentPage("white-universe-poem");
      } else if (hash === "about") {
        setCurrentPage("about");
      } else if (hash === "dharma-masters") {
        setCurrentPage("dharma-masters");
      } else {
        setCurrentPage("home");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
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
