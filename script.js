
/* =========================================================
   EMPTYMILES JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

function toggleMobileMenu() {

    const menu = document.getElementById("mobileMenu");

    menu.classList.toggle("show");

}


function closeMobileMenu() {

    document
        .getElementById("mobileMenu")
        .classList.remove("show");

}


/* =========================================================
   MODAL FUNCTIONS
========================================================= */

function openModal(id) {

    document.getElementById(id).style.display = "flex";

}


function closeModal(id) {

    document.getElementById(id).style.display = "none";

}


/* =========================================================
   TRUCK FLOW
========================================================= */

function openTruckFlow() {

    openModal("truckModal");

}


document
    .getElementById("truckForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        closeModal("truckModal");

        showCapacityPosted();

    });


function showCapacityPosted() {

    setTimeout(function() {

        alert(
            "✅ RETURN CAPACITY POSTED!\n\n" +
            "Truck: EM1024\n" +
            "Route: Mumbai → Indore\n" +
            "Available Capacity: 6 Ton\n\n" +
            "EMPTYMILES will now look for suitable shipments."
        );

    }, 200);

}


/* =========================================================
   SHIPMENT FLOW
========================================================= */

function openShipmentFlow() {

    openModal("shipmentModal");

}


document
    .getElementById("shipmentForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        closeModal("shipmentModal");

        startMatching();

        document
            .getElementById("business")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


/* =========================================================
   MATCHING ANIMATION
========================================================= */

function startMatching() {

    const result =
        document.getElementById("matchingResult");


    result.innerHTML = `

        <div class="searching-animation">

            <div class="search-icon">
                🔍
            </div>

            <strong>
                Searching Return Trucks...
            </strong>

            <span>
                Starting matching engine
            </span>

        </div>

    `;


    setTimeout(function() {

        result.innerHTML = `

            <div class="searching-animation">

                <div class="search-icon">
                    🗺️
                </div>

                <strong>
                    Route Match ✓
                </strong>

                <span>
                    Mumbai → Indore
                </span>

            </div>

        `;

    }, 1000);


    setTimeout(function() {

        result.innerHTML = `

            <div class="searching-animation">

                <div class="search-icon">
                    📦
                </div>

                <strong>
                    Capacity Match ✓
                </strong>

                <span>
                    4 Ton required / 6 Ton available
                </span>

            </div>

        `;

    }, 2000);


    setTimeout(function() {

        result.innerHTML = `

            <div class="searching-animation">

                <div class="search-icon">
                    📅
                </div>

                <strong>
                    Date Match ✓
                </strong>

                <span>
                    15 September
                </span>

            </div>

        `;

    }, 3000);


    setTimeout(function() {

        result.innerHTML = `

            <div class="match-result-active">

                <div class="match-found-small">
                    🎯 MATCH FOUND
                </div>

                <div class="match-score-large">
                    98%
                </div>

                <p>
                    Truck EM1024<br>
                    6 Ton Available<br>
                    4 Ton Required
                </p>

                <button onclick="bookShipment()">
                    BOOK SHIPMENT
                </button>

            </div>

        `;

    }, 4000);

}


/* =========================================================
   SHOW MATCH
========================================================= */

function showMatch(truckId, score) {

    document.getElementById("matchTruck").textContent =
        truckId;


    const modal =
        document.getElementById("matchModal");


    modal.style.display = "flex";


    const scoreElement =
        modal.querySelector("h2");


    scoreElement.textContent =
        score + "% Match";

}


/* =========================================================
   BOOK SHIPMENT
========================================================= */

function bookShipment() {

    closeModal("matchModal");

    setTimeout(function() {

        openModal("successModal");

    }, 300);

}


/* =========================================================
   TRACKING
========================================================= */

function goToTracking() {

    closeModal("successModal");

    document
        .getElementById("tracking")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================================
   MATCHING SECTION
========================================================= */

function scrollToMatching() {

    document
        .getElementById("matching")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================================
   BOOKINGS
========================================================= */

function showBookings() {

    alert(
        "MY BOOKINGS\n\n" +

        "Shipment EM4582\n" +
        "Mumbai → Indore\n" +
        "Status: Confirmed\n\n" +

        "This will become a real booking list " +
        "when the Spring Boot backend is connected."
    );

}


/* =========================================================
   LOGIN
========================================================= */

function openLogin() {

    openModal("loginModal");

}


function openSignup() {

    alert(
        "EMPTYMILES registration will be connected " +
        "to the Spring Boot backend."
    );

}


/* =========================================================
   HERO STATUS ANIMATION
========================================================= */

const emptyStatus =
    document.getElementById("emptyStatus");

const matchedStatus =
    document.getElementById("matchedStatus");

const loadedStatus =
    document.getElementById("loadedStatus");


function animateHeroStatus() {

    setTimeout(function() {

        emptyStatus.style.opacity = "1";

        matchedStatus.style.opacity = "0.45";

        loadedStatus.style.opacity = "0.45";

    }, 500);


    setTimeout(function() {

        emptyStatus.style.opacity = "0.45";

        matchedStatus.style.opacity = "1";

        loadedStatus.style.opacity = "0.45";

    }, 2800);


    setTimeout(function() {

        emptyStatus.style.opacity = "0.45";

        matchedStatus.style.opacity = "0.45";

        loadedStatus.style.opacity = "1";

    }, 5000);

}


animateHeroStatus();


setInterval(
    animateHeroStatus,
    7000
);


/* =========================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================================= */

document
    .querySelectorAll(".modal-overlay")
    .forEach(function(overlay) {

        overlay.addEventListener(
            "click",
            function(event) {

                if (event.target === overlay) {

                    overlay.style.display = "none";

                }

            }
        );

    });


/* =========================================================
   ESC KEY CLOSE MODAL
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            document
                .querySelectorAll(".modal-overlay")
                .forEach(function(modal) {

                    modal.style.display = "none";

                });

        }

    }
);
