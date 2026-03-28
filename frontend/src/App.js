// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import Features from "./components/Features";
// import HowItWorks from "./components/HowItWorks";
// import Categories from "./components/Categories";
// import Testimonials from "./components/Testimonials";
// import Footer from "./components/Footer";

// function App(){

// return(

// <div>

// <Navbar/>
// <Hero/>
// <Features/>
// <HowItWorks/>
// <Categories/>
// <Testimonials/>
// <Footer/>

// </div>

// );

// }

// export default App;

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Categories from "./components/Categories";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import AnalysisResult from "./components/AnalysisResult";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />

      {/* AI ANALYSIS SECTION */}
      <AnalysisResult />

      <Features />
      <HowItWorks />
      <Categories />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;