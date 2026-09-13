/* ==========================================
   EMPTYMILES
   Dynamic Route + Matching Demo
========================================== */


/* =========================
   ELEMENTS
========================= */

const startInput =
    document.getElementById("startLocation");

const endInput =
    document.getElementById("endLocation");

const truckCapacityInput =
    document.getElementById("truckCapacity");

const availableCapacityInput =
    document.getElementById("availableCapacity");

const postTruckBtn =
    document.getElementById("postTruckBtn");

const routeCard =
    document.getElementById("routeCard");

const shipmentStep =
    document.getElementById("shipmentStep");

const routeStart =
    document.getElementById("routeStart");

const routeEnd =
    document.getElementById("routeEnd");

const visualStart =
    document.getElementById("visualStart");

const visualEnd =
    document.getElementById("visualEnd");

const animatedTruck =
    document.getElementById("animatedTruck");

const cargoBoxes =
    document.getElementById("cargoBoxes");

const routeStatus =
    document.getElementById("routeStatus");

const statusGoing =
    document.getElementById("statusGoing");

const statusEmpty =
    document.getElementById("statusEmpty");

const statusMatched =
    document.getElementById("statusMatched");

const statusLoaded =
    document.getElementById("statusLoaded");


/* =========================
   SHIPMENT
========================= */

const shipmentStart =
    document.getElementById("shipmentStart");

const shipmentEnd =
    document.getElementById("shipmentEnd");

const requiredCapacity =
    document.getElementById("requiredCapacity");

const findMatchBtn =
    document.getElementById("findMatchBtn");

const matchCard =
    document.getElementById("matchCard");

const searching =
    document.getElementById("searching");

const matchResult =
    document.getElementById("matchResult");

const checkRoute =
    document.getElementById("checkRoute");

const checkCapacity =
    document.getElementById("checkCapacity");

const checkDate =
    document.getElementById("checkDate");


/* =========================
   MATCH
========================= */

const matchStart =
    document.getElementById("matchStart");

const matchEnd =
    document.getElementById("matchEnd");

const matchAvailable =
    document.getElementById("matchAvailable");

const matchRequired =
    document.getElementById("matchRequired");

const bookBtn =
    document.getElementById("bookBtn");


/* =========================
   BOOKING
========================= */

const bookingCard =
    document.getElementById("bookingCard");

const trackBtn =
    document.getElementById("trackBtn");


/* =========================
   TRACKING
========================= */

const trackingCard =
    document.getElementById("trackingCard");

const trackingStart =
    document.getElementById("trackingStart");

const trackingEnd =
    document.getElementById("trackingEnd");

const trackingTruck =
    document.getElementById("trackingTruck");

const trackingMessage =
    document.getElementById("trackingMessage");


/* =========================
   DATA
========================= */

let routeData = {

    start: "",

    end: "",

    truckCapacity: 0,

    availableCapacity: 0

};


/* ==================================================
   STEP 1
   POST TRUCK
================================================== */

postTruckBtn.addEventListener("click", function () {

    const start =
        startInput.value.trim();

    const end =
        endInput.value.trim();

    const truckCapacity =
        Number(truckCapacityInput.value);

    const availableCapacity =
        Number(availableCapacityInput.value);


    /* =========================
       VALIDATION
    ========================= */

    if (!start || !end) {

        alert(
            "Please enter both starting location and destination."
        );

        return;
    }


    if (!truckCapacity || !availableCapacity) {

        alert(
            "Please enter truck and available capacity."
        );

        return;
    }


    if (availableCapacity > truckCapacity) {

        alert(
            "Available return capacity cannot be greater than truck capacity."
        );

        return;
    }


    /* =========================
       SAVE ROUTE
    ========================= */

    routeData.start =
        start;

    routeData.end =
        end;

    routeData.truckCapacity =
        truckCapacity;

    routeData.availableCapacity =
        availableCapacity;


    /* =========================
       UPDATE UI
    ========================= */

    routeStart.textContent =
        start;

    routeEnd.textContent =
        end;

    visualStart.textContent =
        start;

    visualEnd.textContent =
        end;


    /* =========================
       SHOW ROUTE
    ========================= */

    routeCard.classList.remove("hidden");


    /* =========================
       SCROLL
    ========================= */

    setTimeout(() => {

        routeCard.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

    }, 200);


    /* =========================
       START TRUCK
    ========================= */

    startTruckJourney();

});


/* ==================================================
   TRUCK JOURNEY
   START → DESTINATION
================================================== */

function startTruckJourney() {

    /*
        RESET POSITION
    */

    animatedTruck.style.transition =
        "none";

    animatedTruck.style.left =
        "0%";


    /*
        IMPORTANT

        scaleX(1)
        = truck faces RIGHT

        This is the forward direction.
    */

    animatedTruck.style.transform =
        "translateX(-50%) scaleX(-1)";


    /*
        Remove cargo
    */

    cargoBoxes.classList.remove("show");


    /*
        Reset statuses
    */

    statusGoing.classList.add("active");

    statusEmpty.classList.remove("active");

    statusMatched.classList.remove("active");

    statusLoaded.classList.remove("active");


    routeStatus.textContent =
        "GOING TO DESTINATION";


    /*
        Allow browser to register
        the starting position.
    */

    setTimeout(() => {

        /*
            Move:

            0% → 100%

            START → DESTINATION
        */

        animatedTruck.style.transition =
            "left 8s linear";

        animatedTruck.style.left =
            "100%";

    }, 300);


    /*
        Destination reached
    */

    setTimeout(() => {

        destinationReached();

    }, 8500);

}


/* ==================================================
   DESTINATION REACHED
================================================== */

function destinationReached() {

    /*
        Stop "going" status
    */

    statusGoing.classList.remove("active");

    statusEmpty.classList.add("active");


    routeStatus.textContent =
        "EMPTY RETURN";


    /*
        IMPORTANT

        Truck has reached the RIGHT side.

        Turn truck around.

        scaleX(-1)
        = truck now faces LEFT
    */

    animatedTruck.style.transform =
        "translateX(-50%) scaleX(-1)";


    /*
        Prepare return shipment
    */

    shipmentStart.value =
        routeData.end;

    shipmentEnd.value =
        routeData.start;


    /*
        Show shipment section
    */

    shipmentStep.classList.remove("hidden");


    /*
        Scroll to shipment section
    */

    setTimeout(() => {

        shipmentStep.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

    }, 100);

}


/* ==================================================
   FIND MATCH
================================================== */

findMatchBtn.addEventListener("click", function () {

    const pickup =
        shipmentStart.value.trim();

    const destination =
        shipmentEnd.value.trim();

    const required =
        Number(requiredCapacity.value);


    /* =========================
       VALIDATION
    ========================= */

    if (!pickup || !destination || !required) {

        alert(
            "Please complete the shipment details."
        );

        return;
    }


    /* =========================
       ROUTE MATCH
    ========================= */

    const routeMatches =

        pickup.toLowerCase() ===
        routeData.end.toLowerCase()

        &&

        destination.toLowerCase() ===
        routeData.start.toLowerCase();


    if (!routeMatches) {

        alert(

            `This truck is returning from ${routeData.end} to ${routeData.start}. Please use the matching return route.`

        );

        return;
    }


    /* =========================
       CAPACITY MATCH
    ========================= */

    if (
        required >
        routeData.availableCapacity
    ) {

        alert(

            `Only ${routeData.availableCapacity} Ton is available on the return journey.`

        );

        return;
    }


    /* =========================
       SHOW MATCH CARD
    ========================= */

    matchCard.classList.remove("hidden");

    searching.classList.remove("hidden");

    matchResult.classList.add("hidden");


    /*
        Reset checks
    */

    checkRoute.textContent =
        "○ Route Match";

    checkCapacity.textContent =
        "○ Capacity Match";

    checkDate.textContent =
        "○ Availability Match";


    checkRoute.classList.remove("done");

    checkCapacity.classList.remove("done");

    checkDate.classList.remove("done");


    /* =========================
       ROUTE CHECK
    ========================= */

    setTimeout(() => {

        checkRoute.textContent =
            "✓ Route Match";

        checkRoute.classList.add("done");

    }, 1000);


    /* =========================
       CAPACITY CHECK
    ========================= */

    setTimeout(() => {

        checkCapacity.textContent =
            "✓ Capacity Match";

        checkCapacity.classList.add("done");

    }, 1800);


    /* =========================
       DATE CHECK
    ========================= */

    setTimeout(() => {

        checkDate.textContent =
            "✓ Availability Match";

        checkDate.classList.add("done");

    }, 2600);


    /* =========================
       SHOW MATCH
    ========================= */

    setTimeout(() => {

        showMatch(
            pickup,
            destination,
            required
        );

    }, 3300);


    /*
        Scroll
    */

    matchCard.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

});


/* ==================================================
   SHOW MATCH
================================================== */

function showMatch(
    pickup,
    destination,
    required
) {

    searching.classList.add("hidden");

    matchResult.classList.remove("hidden");


    /*
        Match is:

        DESTINATION → PICKUP

        Example:

        Jaipur → Mumbai
    */

    matchStart.textContent =
        pickup;

    matchEnd.textContent =
        destination;

    matchAvailable.textContent =
        routeData.availableCapacity;

    matchRequired.textContent =
        required;


    /*
        Update status
    */

    statusEmpty.classList.remove("active");

    statusMatched.classList.add("active");


    routeStatus.textContent =
        "MATCH FOUND — 98%";


    /*
        Start return journey
    */

    setTimeout(() => {

        animateReturnJourney();

    }, 500);

}


/* ==================================================
   RETURN JOURNEY
   DESTINATION → START
================================================== */

function animateReturnJourney() {

    /*
        Truck is currently:

        RIGHT SIDE = 100%

        It is already facing LEFT
        because destinationReached()
        changed scaleX(-1).
    */


    /*
        Make absolutely sure
        it faces LEFT.
    */

    animatedTruck.style.transform =
        "translateX(-50%) scaleX(-1)";


    /*
        Start return movement.

        IMPORTANT:

        100% → 0%

        DESTINATION → START
    */

    setTimeout(() => {

        animatedTruck.style.transition =
            "left 10s linear";

        animatedTruck.style.left =
            "0%";

    }, 400);


    /*
        Cargo appears while
        truck is returning.
    */

    setTimeout(() => {

        cargoBoxes.classList.add("show");

        statusMatched.classList.remove("active");

        statusLoaded.classList.add("active");

        routeStatus.textContent =
            "LOADED RETURN JOURNEY";

    }, 3500);

}


/* ==================================================
   BOOKING
================================================== */

bookBtn.addEventListener("click", function () {

    matchCard.classList.add("hidden");

    bookingCard.classList.remove("hidden");


    bookingCard.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

});


/* ==================================================
   TRACK SHIPMENT
================================================== */

trackBtn.addEventListener("click", function () {

    bookingCard.classList.add("hidden");

    trackingCard.classList.remove("hidden");


    /*
        Update tracking locations
    */

    trackingStart.textContent =
        routeData.start;

    trackingEnd.textContent =
        routeData.end;


    /*
        Scroll to tracking
    */

    trackingCard.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });


    /*
        Start tracking
    */

    startTrackingAnimation();

});


/* ==================================================
   TRACKING ANIMATION
   START → DESTINATION
================================================== */

function startTrackingAnimation() {

    /*
        VERY IMPORTANT

        Reset tracking truck.

        Start at LEFT.
    */

    trackingTruck.style.transition =
        "none";

    trackingTruck.style.left =
        "0%";


 
    trackingTruck.style.transform =
        "translateX(-50%) scaleX(-1)";



    trackingMessage.textContent =
        `📦 Shipment picked up at ${routeData.start}.`;



    setTimeout(() => {



        trackingTruck.style.transition =
            "left 10s linear";

        trackingTruck.style.left =
            "100%";


        trackingMessage.textContent =
            `🚛 Shipment travelling from ${routeData.start} to ${routeData.end}.`;

    }, 300);



    setTimeout(() => {

        trackingMessage.textContent =
            `📍 Shipment approaching ${routeData.end}.`;

    }, 7500);


    setTimeout(() => {

        trackingMessage.textContent =
            `✅ Shipment delivered at ${routeData.end}.`;

    }, 10300);

}
