import { Navigation } from "./components/Navigation";
import { HomeVisit } from "./components/HomeVisit";
//import { AboutPage } from "./components/AboutPage";
import { GCDRPage } from "./components/GCDRPage";
import { Events } from "./components/Events";
import { MasterBio } from "./components/MasterBio";
import { EighteenVows } from "./components/EighteenVows";
import { SixPrinciples } from "./components/SixPrinciples";
import { WhiteUniverse } from "./components/WhiteUniverse";
import { DharmaMasters } from "./components/DharmaMasters";
import { Volunteering } from "./components/Volunteering";
import { VisitIntro } from "./components/VisitIntro";
import { VisitWhatToExpect } from "./components/VisitWhatToExpect";
import { VisitGuidelines } from "./components/VisitGuidelines";
import { ChanMeditation } from "./components/ChanMeditation";
import { WarningCentury } from "./components/WarningCentury";
import { Footer } from "./components/Footer";
import { useState, useEffect } from "react";
import { HomeIntro } from "./components/HomeIntro";
import { HomeMasterHua } from "./components/HomeMasterHua";
import { HomeWhatToExpect } from "./components/HomeWhatToExpect";
import { HomeEvents } from "./components/HomeEvents";

function normalizePathname(pathname: string) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/+$/, "");
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash.slice(1);
      const pathname = normalizePathname(window.location.pathname);

      // Check pathname first, then fall back to hash
      if (pathname === "/events" || hash === "events") {
        setCurrentPage("events");
      } else if (pathname === "/visit" || hash === "visit") {
        setCurrentPage("visit");
      } else if (pathname === "/about" || hash === "about") {
        setCurrentPage("about");
      } else if (pathname === "/master-hua" || hash === "master-hua") {
        setCurrentPage("master-hua");
      } else if (pathname === "/18-vows" || hash === "18-vows") {
        setCurrentPage("18-vows");
      } else if (pathname === "/six-principles" || hash === "six-principles") {
        setCurrentPage("six-principles");
      } else if (
        pathname === "/white-universe-poem" ||
        hash === "white-universe-poem"
      ) {
        setCurrentPage("white-universe-poem");
        //} else if (pathname === "/about" || hash === "about") {
        //  setCurrentPage("about");
      } else if (pathname === "/teachings" || hash === "teachings") {
        setCurrentPage("teachings");
      } else if (pathname === "/dharma-masters" || hash === "dharma-masters") {
        setCurrentPage("dharma-masters");
      } else if (pathname === "/volunteering" || hash === "volunteering") {
        setCurrentPage("volunteering");
      } else if (
        pathname === "/warning-century" ||
        hash === "warning-century"
      ) {
        setCurrentPage("warning-century");
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
      <div className="min-h-screen bg-background">
        <Navigation />
        <Events />
        <Footer />
      </div>
    );
  }

  if (currentPage === "visit") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <VisitIntro />
        <VisitWhatToExpect />
        <VisitGuidelines />
        <Footer />
      </div>
    );
  }

  if (currentPage === "about") {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Navigation />
        <GCDRPage />
        <Footer />
      </div>
    );
  }

  if (currentPage === "master-hua") {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Navigation />
        <MasterBio />
        <Footer />
      </div>
    );
  }

  if (currentPage === "18-vows") {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Navigation />
        <EighteenVows />
        <Footer />
      </div>
    );
  }

  if (currentPage === "six-principles") {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Navigation />
        <SixPrinciples />
        <Footer />
      </div>
    );
  }

  if (currentPage === "white-universe-poem") {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Navigation />
        <WhiteUniverse />
        <Footer />
      </div>
    );
  }

  if (currentPage === "teachings") {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Navigation />
        <ChanMeditation />
        <Footer />
      </div>
    );
  }

  /*if (currentPage === "about") {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Navigation />
        <AboutPage />
        <Footer />
      </div>
    );
  }*/

  if (currentPage === "warning-century") {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Navigation />
        <WarningCentury />
        <Footer />
      </div>
    );
  }

  if (currentPage === "dharma-masters") {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Navigation />
        <DharmaMasters />
        <Footer />
      </div>
    );
  }

  if (currentPage === "volunteering") {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Navigation />
        <Volunteering />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HomeIntro />
      <HomeMasterHua />
      <HomeWhatToExpect />
      <HomeEvents />
      <HomeVisit />
      <Footer />
    </div>
  );
}
