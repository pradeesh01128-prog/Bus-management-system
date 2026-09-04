/* =========================================================
   DASHBOARD.JS
   Bus Management System
   Tamil + English
   ========================================================= */


/* =========================================================
   GET DATA FROM LOCAL STORAGE
   ========================================================= */

function getLocalStorageData(key) {

    try {

        const data = localStorage.getItem(key);

        if (!data) {
            return [];
        }

        const parsedData = JSON.parse(data);

        return Array.isArray(parsedData) ?
            parsedData : [];

    } catch (error) {

        console.error(
            "Error reading " + key + " from localStorage:",
            error
        );

        return [];

    }
}


/* =========================================================
   UPDATE HTML ELEMENT
   ========================================================= */

function updateElement(id, value) {

    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }

}


/* =========================================================
   GET STATUS
   ========================================================= */

function getStatus(item) {

    if (!item) {
        return "";
    }

    return String(
            item.status || ""
        )
        .trim()
        .toLowerCase();

}


/* =========================================================
   LOAD CURRENT DATE
   ========================================================= */

function showCurrentDate() {

    const dateElement =
        document.getElementById("currentDate");

    if (!dateElement) {
        return;
    }


    const today = new Date();


    const options = {

        day: "2-digit",

        month: "short",

        year: "numeric"

    };


    dateElement.textContent =
        today.toLocaleDateString(
            "en-IN",
            options
        );

}


/* =========================================================
   UPDATE DASHBOARD
   ========================================================= */

function loadDashboard() {


    /* =====================================================
       GET ALL DATA
    ===================================================== */

    const buses =
        getLocalStorageData("buses");

    const routes =
        getLocalStorageData("routes");

    const drivers =
        getLocalStorageData("drivers");

    const schedules =
        getLocalStorageData("schedules");

    const bookings =
        getLocalStorageData("bookings");

    const payments =
        getLocalStorageData("payments");


    /* =====================================================
       TOTAL COUNTS
    ===================================================== */

    updateElement(
        "totalBuses",
        buses.length
    );


    updateElement(
        "totalRoutes",
        routes.length
    );


    updateElement(
        "totalDrivers",
        drivers.length
    );


    updateElement(
        "totalSchedules",
        schedules.length
    );


    updateElement(
        "totalBookings",
        bookings.length
    );


    updateElement(
        "totalPayments",
        payments.length
    );


    /* =====================================================
       ACTIVE BUSES
    ===================================================== */

    const activeBuses =
        buses.filter(function(bus) {

            const status =
                getStatus(bus);

            return (
                status === "active" ||
                status === "available"
            );

        });


    updateElement(
        "activeBuses",
        activeBuses.length
    );


    /* =====================================================
       CONFIRMED BOOKINGS
    ===================================================== */

    const confirmedBookings =
        bookings.filter(function(booking) {

            const status =
                getStatus(booking);

            return (
                status === "confirmed" ||
                status === "confirm"
            );

        });


    updateElement(
        "confirmedBookings",
        confirmedBookings.length
    );


    /* =====================================================
       PAID PAYMENTS
    ===================================================== */

    const paidPayments =
        payments.filter(function(payment) {

            const status =
                getStatus(payment);

            return (
                status === "paid" ||
                status === "success" ||
                status === "completed"
            );

        });


    updateElement(
        "paidPayments",
        paidPayments.length
    );


    /* =====================================================
       TOTAL REVENUE
    ===================================================== */

    let totalRevenue = 0;


    paidPayments.forEach(function(payment) {

        /*
         Possible amount field names:
         amount
         totalAmount
         price
         fare
         paymentAmount
        */

        let amount =
            payment.amount;


        if (
            amount === undefined ||
            amount === null ||
            amount === ""
        ) {

            amount =
                payment.totalAmount;

        }


        if (
            amount === undefined ||
            amount === null ||
            amount === ""
        ) {

            amount =
                payment.price;

        }


        if (
            amount === undefined ||
            amount === null ||
            amount === ""
        ) {

            amount =
                payment.fare;

        }


        if (
            amount === undefined ||
            amount === null ||
            amount === ""
        ) {

            amount =
                payment.paymentAmount;

        }


        /*
         Remove currency symbols
         Example:
         ₹500
         Rs.500
         500
        */

        if (typeof amount === "string") {

            amount =
                amount
                .replace(/[₹,Rs.\s]/gi, "");

        }


        const numericAmount =
            Number(amount);


        if (!isNaN(numericAmount)) {

            totalRevenue += numericAmount;

        }

    });


    updateElement(
        "totalRevenue",
        "₹" + totalRevenue.toFixed(2)
    );


    /* =====================================================
       UPDATE CURRENT DATE
    ===================================================== */

    showCurrentDate();

}


/* =========================================================
   REFRESH DASHBOARD
   ========================================================= */

function refreshDashboard() {

    loadDashboard();

}


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "Dashboard loaded successfully."
        );


        loadDashboard();

    }
);


/* =========================================================
   STORAGE CHANGE
   ========================================================= */

window.addEventListener(
    "storage",
    function() {

        loadDashboard();

    }
);


/* =========================================================
   AUTO REFRESH
   ========================================================= */

/*
   Refresh every 1 second.

   This is useful because when data is changed
   from another page/tab, dashboard updates automatically.
*/

setInterval(
    function() {

        loadDashboard();

    },
    1000
);