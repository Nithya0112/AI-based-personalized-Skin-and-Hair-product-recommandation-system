import React from "react";
import "../styles/SkinCareTips.css";
import {
FaSun,
FaMoon,
FaTint,
FaAppleAlt,
FaCheckCircle,
FaTimesCircle
} from "react-icons/fa";

function SkinCareTips() {

const morningRoutine = [
{
icon: <FaSun />,
title: "Cleanse",
desc: "Use a gentle cleanser to remove oil and dirt."
},
{
icon: <FaTint />,
title: "Moisturize",
desc: "Apply moisturizer to keep skin hydrated."
},
{
icon: <FaSun />,
title: "Sunscreen",
desc: "Use SPF 30+ sunscreen to protect skin from UV rays."
}
];

const nightRoutine = [
{
icon: <FaMoon />,
title: "Night Cleanse",
desc: "Remove makeup and wash your face before sleep."
},
{
icon: <FaMoon />,
title: "Serum",
desc: "Apply vitamin C or hyaluronic acid serum."
},
{
icon: <FaMoon />,
title: "Night Cream",
desc: "Use nourishing night cream for skin repair."
}
];

const skinTypes = [
{
title:"Oily Skin",
desc:"Use oil-free cleansers and lightweight moisturizers."
},
{
title:"Dry Skin",
desc:"Use hydrating creams and avoid hot water."
},
{
title:"Sensitive Skin",
desc:"Choose fragrance-free and gentle products."
},
{
title:"Combination Skin",
desc:"Balance oily T-zone and dry cheeks."
}
];

const dos = [
"Drink enough water daily",
"Use sunscreen every day",
"Eat fruits and vegetables",
"Clean your face regularly"
];

const donts = [
"Do not touch pimples",
"Avoid harsh scrubs",
"Do not skip moisturizer",
"Avoid too much junk food"
];

return (

<section className="tips-section">

<h2 className="tips-title">Skin Care Tips</h2>

{/* MORNING ROUTINE */}

<div className="routine-block">

<h3 className="routine-title">Morning Routine ☀️</h3>

<div className="routine-grid">

{morningRoutine.map((tip,index)=>(
<div className="routine-card" key={index}>

<div className="icon">{tip.icon}</div>

<h4>{tip.title}</h4>

<p>{tip.desc}</p>

</div>
))}

</div>

</div>

{/* NIGHT ROUTINE */}

<div className="routine-block">

<h3 className="routine-title">Night Routine 🌙</h3>

<div className="routine-grid">

{nightRoutine.map((tip,index)=>(
<div className="routine-card" key={index}>

<div className="icon">{tip.icon}</div>

<h4>{tip.title}</h4>

<p>{tip.desc}</p>

</div>
))}

</div>

</div>

{/* SKIN TYPES */}

<div className="skin-types">

<h3>Tips for Different Skin Types</h3>

<div className="skin-grid">

{skinTypes.map((type,index)=>(
<div className="skin-card" key={index}>

<h4>{type.title}</h4>

<p>{type.desc}</p>

</div>
))}

</div>

</div>

{/* DOS AND DONTS */}

<div className="dos-donts">

<div className="dos">

<h3>Do's</h3>

<ul>

{dos.map((item,index)=>(
<li key={index}>
<FaCheckCircle className="check"/>
{item}
</li>
))}

</ul>

</div>

<div className="donts">

<h3>Don'ts</h3>

<ul>

{donts.map((item,index)=>(
<li key={index}>
<FaTimesCircle className="cross"/>
{item}
</li>
))}

</ul>

</div>

</div>

{/* AI CTA */}


</section>

);

}

export default SkinCareTips;