
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CameraPage from "./components/CameraPage";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Categories from "./components/Categories";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import ResultPage from "./components/ResultPage";
import ProductsPage from "./components/ProductsPage";
import SkinCareTips from "./components/SkinCareTips";
import IngredientAnalysisPage from "./components/IngredientAnalysisPage";

/* Wrapper to use location */
function Layout() {
  const location = useLocation();

  return (
    <>
      {/* 👇 Hide Navbar in camera page */}
      {location.pathname !== "/camera" && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Features />
              <HowItWorks />
              <Categories />
              <Testimonials />
              <Footer />
            </>
          }
        />
        
        <Route path="/camera" element={<CameraPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/skincare-tips" element={<SkinCareTips />} />
          <Route path="/ingredient-analysis" element={<IngredientAnalysisPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;