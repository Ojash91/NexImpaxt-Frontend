import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./components/LandingPage";
import { ExploreProblems } from "./components/ExploreProblems";
import { SolverDashboard } from "./components/SolverDashboard";
import { EarningsPage } from "./components/EarningsPage";
import { NGOPortal } from "./components/NGOPortal";
import { AuthPage } from "./components/AuthPage";
import { CommunityHub } from "./components/CommunityHub";
import { AboutPage } from "./components/AboutPage";
import { Footer } from "./components/Footer";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <LandingPage onPageChange={setCurrentPage} />;
      case "explore":
        return (
          <ExploreProblems onPageChange={setCurrentPage} />
        );
      case "solver":
        return (
          <SolverDashboard onPageChange={setCurrentPage} />
        );
      case "ngo":
        return <NGOPortal onPageChange={setCurrentPage} />;
      case "earnings":
        return <EarningsPage onPageChange={setCurrentPage} />;
      case "auth":
        return <AuthPage onPageChange={setCurrentPage} />;
      case "community":
        return <CommunityHub onPageChange={setCurrentPage} />;
      case "about":
        return <AboutPage onPageChange={setCurrentPage} />;
      default:
        return <LandingPage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
}