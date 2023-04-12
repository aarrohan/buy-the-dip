// Dependencies
import { Routes, Route } from "react-router-dom";

// Components
import NavigationBarComponent from "./components/NavigationBarComponent";

// Pages
import LandingPage from "./pages/LandingPage";
import TeamPage from "./pages/TeamPage";
import AboutPage from "./pages/AboutPage";
import RoadmapPage from "./pages/RoadmapPage";

// App
const App = () => {
  return (
    <>
      {/* Navigation bar component */}
      <NavigationBarComponent />

      {/* Routes */}
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Team page */}
        <Route path="/team" element={<TeamPage />} />

        {/* About page */}
        <Route path="/about" element={<AboutPage />} />

        {/* Roadmap page */}
        <Route path="/roadmap" element={<RoadmapPage />} />
      </Routes>
    </>
  );
};

// Export
export default App;
