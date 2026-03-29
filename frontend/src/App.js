// // import Navbar from "./components/Navbar";
// // import Hero from "./components/Hero";
// // import Features from "./components/Features";
// // import HowItWorks from "./components/HowItWorks";
// // import Categories from "./components/Categories";
// // import Testimonials from "./components/Testimonials";
// // import Footer from "./components/Footer";

// // function App(){

// // return(

// // <div>

// // <Navbar/>
// // <Hero/>
// // <Features/>
// // <HowItWorks/>
// // <Categories/>
// // <Testimonials/>
// // <Footer/>

// // </div>

// // );

// // }

// // export default App;

// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import Features from "./components/Features";
// import HowItWorks from "./components/HowItWorks";
// import Categories from "./components/Categories";
// import Testimonials from "./components/Testimonials";
// import Footer from "./components/Footer";
// import AnalysisResult from "./components/AnalysisResult";

// function App() {
//   return (
//     <div>
//       <Navbar />

//         <section id="home">
//         <Hero />
//       </section>

//       <section id="products">
//         <AnalysisResult />
//       </section>

     

//       <section id="features">
//         <Features />
//         <HowItWorks />
//         <Categories />
//       </section>

//       <section id="tips">
//         <Testimonials />
//       </section>

//       <section id="about">
//         <Footer />
//       </section>
//     </div>
//   );
// }

// // export default App;
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