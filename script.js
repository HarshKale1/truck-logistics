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


/* Shipment */

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


/* Match */

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


/* Booking */

const bookingCard =
    document.getElementById("bookingCard");

const trackBtn =
    document.getElementById("trackBtn");


/* Tracking */

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


/* =========================
   STEP 1
   POST TRUCK
========================= */

postTruckBtn.addEventListener("click", function () {

    const start =
        startInput.value.trim();

    const end =
        endInput.value.trim();

    const truckCapacity =
        Number(truckCapacityInput.value);

    const availableCapacity =
        Number(availableCapacityInput.value);


    /* Validation */

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


    /* Save */

    routeData.start = start;
    routeData.end = end;
    routeData.truckCapacity = truckCapacity;
    routeData.availableCapacity = availableCapacity;


    /* Update UI */

    routeStart.textContent = start;
    routeEnd.textContent = end;

    visualStart.textContent = start;
    visualEnd.textContent = end;


    /* Show route */

    routeCard.classList.remove("hidden");


    /* Scroll */

    setTimeout(() => {

        routeCard.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 200);


    /* Start animation */

    startTruckJourney();

});


/* =========================
   TRUCK JOURNEY
========================= */

function startTruckJourney() {

    /* Reset */

    animatedTruck.style.transition = "none";
    animatedTruck.style.left = "0%";

    animatedTruck.style.transform =
        "translateX(-50%) scaleX(-1)";


    cargoBoxes.classList.remove("show");


    statusGoing.classList.add("active");

    statusEmpty.classList.remove("active");

    statusMatched.classList.remove("active");

    statusLoaded.classList.remove("active");


    routeStatus.textContent =
        "GOING TO DESTINATION";


    /*
        Small delay allows browser
        to register starting position.
    */

    setTimeout(() => {

        /*
            Truck slowly moves toward
            destination.
        */

        animatedTruck.style.transition =
            "left 8s linear";

        animatedTruck.style.left =
            "100%";

    }, 300);


    /*
        Truck reaches destination
        after 8 seconds.
    */

    setTimeout(() => {

        destinationReached();

    }, 8500);

}


/* =========================
   DESTINATION
========================= */

function destinationReached() {

    statusGoing.classList.remove("active");

    statusEmpty.classList.add("active");

    routeStatus.textContent =
        "EMPTY RETURN";


    /*
        IMPORTANT:

        Instead of reversing the truck
        using negative movement,

        we visually TURN the truck
        around using scaleX(-1).
    */

    animatedTruck.style.transform =
        "translateX(-50%) scaleX(-1)";


    /*
        Show shipment section
    */

    shipmentStart.value =
        routeData.end;

    shipmentEnd.value =
        routeData.start;


    shipmentStep.classList.remove("hidden");


    setTimeout(() => {

        shipmentStep.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 100);

}


/* =========================
   FIND MATCH
========================= */

findMatchBtn.addEventListener("click", function () {

    const pickup =
        shipmentStart.value.trim();

    const destination =
        shipmentEnd.value.trim();

    const required =
        Number(requiredCapacity.value);


    if (!pickup || !destination || !required) {

        alert(
            "Please complete the shipment details."
        );

        return;
    }


    /*
        Check route against
        truck's return route.
    */

    const routeMatches =
        pickup.toLowerCase() === routeData.end.toLowerCase()
        &&
        destination.toLowerCase() === routeData.start.toLowerCase();


    if (!routeMatches) {

        alert(
            `This truck is returning from ${routeData.end} to ${routeData.start}. Please use the matching return route.`
        );

        return;
    }


    if (required > routeData.availableCapacity) {

        alert(
            `Only ${routeData.availableCapacity} Ton is available on the return journey.`
        );

        return;
    }


    /* Show matching screen */

    matchCard.classList.remove("hidden");

    searching.classList.remove("hidden");

    matchResult.classList.add("hidden");


    checkRoute.textContent =
        "○ Route Match";

    checkCapacity.textContent =
        "○ Capacity Match";

    checkDate.textContent =
        "○ Availability Match";


    setTimeout(() => {

        checkRoute.textContent =
            "✓ Route Match";

        checkRoute.classList.add("done");

    }, 1000);


    setTimeout(() => {

        checkCapacity.textContent =
            "✓ Capacity Match";

        checkCapacity.classList.add("done");

    }, 1800);


    setTimeout(() => {

        checkDate.textContent =
            "✓ Availability Match";

        checkDate.classList.add("done");

    }, 2600);


    setTimeout(() => {

        showMatch(
            pickup,
            destination,
            required
        );

    }, 3300);


    matchCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


/* =========================
   SHOW MATCH
========================= */

function showMatch(
    pickup,
    destination,
    required
) {

    searching.classList.add("hidden");

    matchResult.classList.remove("hidden");


    matchStart.textContent =
        destination;

    matchEnd.textContent =
        pickup;

    matchAvailable.textContent =
        routeData.availableCapacity;

    matchRequired.textContent =
        required;


    statusEmpty.classList.remove("active");

    statusMatched.classList.add("active");

    routeStatus.textContent =
        "MATCH FOUND — 98%";


    /*
        Start return movement
        after match.
    */

    setTimeout(() => {

        animateReturnJourney();

    }, 500);

}


/* =========================
   RETURN JOURNEY
========================= */

function animateReturnJourney() {

    /*
        Truck is currently at 100%.

        We turn it around first.
    */

    animatedTruck.style.transform =
        "translateX(-50%) scaleX(-1)";


    /*
        Then move it back toward
        the starting location.

        Because the truck is already
        visually facing the opposite
        direction, it looks like
        a real return journey.
    */

    setTimeout(() => {

        animatedTruck.style.transition =
            "left 10s linear";

        animatedTruck.style.left =
            "0%";

    }, 400);


    /*
        Show cargo during return.
    */

    setTimeout(() => {

        cargoBoxes.classList.add("show");

        statusMatched.classList.remove("active");

        statusLoaded.classList.add("active");

        routeStatus.textContent =
            "LOADED RETURN JOURNEY";

    }, 3500);

}


/* =========================
   BOOK
========================= */

bookBtn.addEventListener("click", function () {

    matchCard.classList.add("hidden");

    bookingCard.classList.remove("hidden");

    bookingCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


/* =========================
   TRACK
========================= */

trackBtn.addEventListener("click", function () {

    bookingCard.classList.add("hidden");

    trackingCard.classList.remove("hidden");

    trackingStart.textContent =
        routeData.start;

    trackingEnd.textContent =
        routeData.end;


    trackingCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    startTrackingAnimation();

});


/* =========================
   TRACKING ANIMATION
========================= */

function startTrackingAnimation() {

    trackingTruck.style.left = "0%";

    trackingMessage.textContent =
        "Shipment picked up and ready to move.";


    setTimeout(() => {

        trackingMessage.textContent =
            `🚛 Shipment travelling from ${routeData.start} to ${routeData.end}.`;

        trackingTruck.style.left =
            "50%";

    }, 1500);


    setTimeout(() => {

        trackingMessage.textContent =
            "Shipment is approaching destination.";

        trackingTruck.style.left =
            "100%";

    }, 5000);


    setTimeout(() => {

        trackingMessage.textContent =
            `✅ Shipment delivered at ${routeData.end}.`;

    }, 7000);

}
