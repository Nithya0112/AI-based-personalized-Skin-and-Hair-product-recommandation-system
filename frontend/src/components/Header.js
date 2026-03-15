// import React from "react";
// import "../styles/Header.css";

// function Header() {
//   return (
//     <header className="navbar">

//       <div className="logo">
//         <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Cetaphil_logo.svg" alt="logo"/>
//       </div>

//       <nav className="menu">
//         <a href="#">WHAT'S NEW</a>
//         <a href="#">PRODUCTS</a>
//         <a href="#">DIGITAL SKINCARE ASSIST</a>
//         <a href="#">SKINCARE TIPS</a>
//         <a href="#">WHY CETAPHIL</a>
//         <a href="#">OUR INGREDIENTS</a>
//       </nav>

//       <div className="searchBox">
//         <input type="text" placeholder="Search"/>
//         <button>🔍</button>
//       </div>

//     </header>
//   );
// }

// export default Header;

import React from "react";
import "../styles/Header.css";

function Header() {
  return (
    <header className="navbar">

      <div className="logo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Cetaphil_logo.svg" alt="logo"/>
      </div>

      <nav className="menu">
        <a href="#">WHAT'S NEW</a>
        <a href="#products">PRODUCTS</a>
        <a href="#">DIGITAL SKINCARE ASSIST</a>
        <a href="#">SKINCARE TIPS</a>
        <a href="#">WHY CETAPHIL</a>
        <a href="#">OUR INGREDIENTS</a>
      </nav>

      <div className="searchBox">
        <input type="text" placeholder="Search"/>
        <button>🔍</button>
      </div>

    </header>
  );
}

export default Header;