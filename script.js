
let loads = [

    {
        id: 1,
        pickup: "Mumbai",
        destination: "Indore",
        material: "Steel",
        weight: 12,
        budget: 32000,
        match: 95
    },

    {
        id: 2,
        pickup: "Mumbai",
        destination: "Dewas",
        material: "Electronics",
        weight: 10,
        budget: 28000,
        match: 91
    },

    {
        id: 3,
        pickup: "Mumbai",
        destination: "Bhopal",
        material: "Machinery",
        weight: 15,
        budget: 35000,
        match: 82
    },

    {
        id: 4,
        pickup: "Mumbai",
        destination: "Ujjain",
        material: "Furniture",
        weight: 8,
        budget: 24000,
        match: 87
    },

    {
        id: 5,
        pickup: "Mumbai",
        destination: "Ahmedabad",
        material: "Textiles",
        weight: 11,
        budget: 30000,
        match: 76
    },

    {
        id: 6,
        pickup: "Mumbai",
        destination: "Ratlam",
        material: "Food Products",
        weight: 9,
        budget: 26000,
        match: 80
    }

];


/* =====================================
   LOAD CARDS
===================================== */

function displayLoads(data) {

    const container = document.getElementById("loadsContainer");

    container.innerHTML = "";


    if (data.length === 0) {

        container.innerHTML = `
            <div style="
                grid-column: 1/-1;
                background:white;
                padding:30px;
                text-align:center;
                border-radius:15px;
                color:#777;
            ">
                No matching loads found.
            </div>
        `;

        return;
    }


    data.forEach(load => {

        const card = document.createElement("div");

        card.className = "load-card";


        card.innerHTML = `

            <span class="match-score">
                ⭐ ${load.match}% Match
            </span>


            <div class="load-route">

                <div>
                    <small>PICKUP</small>
                    <strong>${load.pickup}</strong>
                </div>

                <span class="arrow">→</span>

                <div>
                    <small>DELIVERY</small>
                    <strong>${load.destination}</strong>
                </div>

            </div>


            <div class="load-info">

                <div>
                    <span>Material</span>
                    <strong>${load.material}</strong>
                </div>


                <div>
                    <span>Weight</span>
                    <strong>${load.weight} Ton</strong>
                </div>


                <div>
                    <span>Budget</span>
                    <strong>₹${load.budget.toLocaleString("en-IN")}</strong>
                </div>


                <div>
                    <span>Available</span>
                    <strong>Today</strong>
                </div>

            </div>


            <button onclick="selectLoad(${load.id})">
                View Load
            </button>

        `;


        container.appendChild(card);

    });

}


/* =====================================
   SEARCH LOADS
===================================== */

function searchLoads() {

    const searchValue =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const filteredLoads = loads.filter(load => {

        return (

            load.pickup.toLowerCase().includes(searchValue) ||

            load.destination.toLowerCase().includes(searchValue) ||

            load.material.toLowerCase().includes(searchValue)

        );

    });


    displayLoads(filteredLoads);

}


/* =====================================
   SELECT LOAD
===================================== */

function selectLoad(id) {

    const load = loads.find(item => item.id === id);


    if (!load) {
        return;
    }


    const message = `

Return Load Match Found!

Route:
${load.pickup} → ${load.destination}

Material:
${load.material}

Weight:
${load.weight} Ton

Budget:
₹${load.budget.toLocaleString("en-IN")}

Match:
${load.match}%

    `;


    const accepted = confirm(message + "\nAccept this load?");


    if (accepted) {

        alert(
            "Load accepted successfully!\n\n" +
            load.pickup +
            " → " +
            load.destination
        );

    }

}


/* =====================================
   SHOW ALL LOADS
===================================== */

function showAllLoads() {

    document.getElementById("searchInput").value = "";

    displayLoads(loads);

}


/* =====================================
   MOBILE MENU
===================================== */

function toggleMenu() {

    const menu =
        document.getElementById("mobileMenu");

    menu.classList.toggle("show");

}


function closeMenu() {

    document
        .getElementById("mobileMenu")
        .classList.remove("show");

}


/* =====================================
   SCROLL TO RETURN LOADS
===================================== */

function scrollToMatches() {

    document
        .getElementById("matches")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================
   MODAL
===================================== */

function openLoadModal() {

    document
        .getElementById("modal")
        .style.display = "flex";

}


function closeLoadModal() {

    document
        .getElementById("modal")
        .style.display = "none";

}


/* =====================================
   POST LOAD
===================================== */

document
    .getElementById("loadForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const pickup =
            document.getElementById("pickup").value;

        const destination =
            document.getElementById("destination").value;

        const material =
            document.getElementById("material").value;

        const weight =
            Number(document.getElementById("weight").value);

        const budget =
            Number(document.getElementById("budget").value);


        const newLoad = {

            id: loads.length + 1,

            pickup: pickup,

            destination: destination,

            material: material,

            weight: weight,

            budget: budget,

            match: 90

        };


        loads.unshift(newLoad);


        displayLoads(loads);


        closeLoadModal();


        document
            .getElementById("loadForm")
            .reset();


        alert("Load posted successfully!");

    });


/* =====================================
   INITIALIZE
===================================== */

displayLoads(loads);

