const form = document.getElementById("predictionForm");

form.addEventListener("submit", async function(e){

    e.preventDefault();

    document.getElementById("result").innerHTML = "Predicting...";

    const data = {

        Area_sqft: Number(document.getElementById("area").value),

        Bedrooms: Number(document.getElementById("bedrooms").value),

        Bathrooms: Number(document.getElementById("bathrooms").value),

        Parking: Number(document.getElementById("parking").value),

        Floor: Number(document.getElementById("floor").value),

        Total_Floors: Number(document.getElementById("totalfloors").value),

        Property_Age: Number(document.getElementById("age").value),

        City: document.getElementById("city").value,

        Property_Type: document.getElementById("property").value,

        Furnishing: document.getElementById("furnishing").value

    };

    try{

        const response = await fetch("/predict",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });

        const result = await response.json();

        animateValue(result.prediction);

    }

    catch(error){

        document.getElementById("result").innerHTML =
        "Prediction Failed";

    }

});

function animateValue(value){

    let start = 0;

    let end = Number(value);

    let duration = 1500;

    let startTime = null;

    function step(timestamp){

        if(!startTime) startTime = timestamp;

        const progress = Math.min((timestamp-startTime)/duration,1);

        const current = Math.floor(progress*(end-start));

        document.getElementById("result").innerHTML =
        "₹ " + current.toLocaleString("en-IN");

        if(progress<1){

            requestAnimationFrame(step);

        }

    }

    requestAnimationFrame(step);

}

const badge = document.querySelector(".badge-price");

if(result.prediction > 20000000){

    badge.innerHTML = "Luxury Property";

}
else if(result.prediction > 10000000){

    badge.innerHTML = "Premium Property";

}
else{

    badge.innerHTML = "Budget Property";

}

function loadSample(){

    // Property
    document.getElementById("area").value = 1500;
    document.getElementById("bedrooms").value = 3;
    document.getElementById("bathrooms").value = 2;
    document.getElementById("parking").value = 1;
    document.getElementById("floor").value = 4;
    document.getElementById("totalfloors").value = 10;
    document.getElementById("age").value = 5;

    // Location
    document.getElementById("city").value = "Bangalore";
    document.getElementById("locality").value = "Whitefield";

    document.getElementById("property").value = "Apartment";
    document.getElementById("furnishing").value = "Furnished";

    // Metrics
    document.getElementById("city_distance").value = 8;
    document.getElementById("school_distance").value = 1;
    document.getElementById("hospital_distance").value = 2;
    document.getElementById("metro_distance").value = 0.8;
    document.getElementById("crime").value = 35;
    document.getElementById("income").value = 82;
    document.getElementById("aqi").value = 58;

    // Amenities
    document.getElementById("lift").checked = true;
    document.getElementById("gym").checked = true;
    document.getElementById("pool").checked = false;
    document.getElementById("park").checked = true;
    document.getElementById("security").checked = true;

}
const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click",()=>{

    document.body.classList.toggle("light-theme");

    const icon = toggle.querySelector("i");

    if(document.body.classList.contains("light-theme")){

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        localStorage.setItem("theme","light");

    }
    else{

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        localStorage.setItem("theme","dark");

    }

});

window.addEventListener("DOMContentLoaded",()=>{

    if(localStorage.getItem("theme")==="light"){

        document.body.classList.add("light-theme");

        const icon = toggle.querySelector("i");

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    }

});