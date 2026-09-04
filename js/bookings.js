/* =========================================================
   BOOKINGS.JS
   Bus Management System
   Tamil + English
   Full Replacement
   Matches bookings.html
   ========================================================= */


/* =========================================================
   GET BOOKINGS
   ========================================================= */

function getBookings() {

    try {

        const data =
            localStorage.getItem("bookings");

        if (!data) {
            return [];
        }

        const bookings =
            JSON.parse(data);

        return Array.isArray(bookings) ?
            bookings :
            [];

    } catch (error) {

        console.error(
            "Error reading bookings:",
            error
        );

        return [];

    }

}


/* =========================================================
   SAVE BOOKINGS
   ========================================================= */

function saveBookings(bookings) {

    try {

        localStorage.setItem(
            "bookings",
            JSON.stringify(bookings)
        );

        return true;

    } catch (error) {

        console.error(
            "Error saving bookings:",
            error
        );

        alert(
            "Unable to save booking data."
        );

        return false;

    }

}


/* =========================================================
   GENERATE BOOKING ID
   ========================================================= */

function generateBookingId(bookings) {

    if (bookings.length === 0) {

        return 1;

    }

    let maxId = 0;


    bookings.forEach(function(booking) {

        const id =
            Number(booking.id) || 0;


        if (id > maxId) {

            maxId = id;

        }

    });


    return maxId + 1;

}


/* =========================================================
   CLEAR BOOKING FORM
   ========================================================= */

function clearBookingForm() {

    const bookingId =
        document.getElementById("bookingId");

    const passenger =
        document.getElementById("passenger");

    const bus =
        document.getElementById("bookingBus");

    const route =
        document.getElementById("bookingRoute");

    const seat =
        document.getElementById("seat");

    const date =
        document.getElementById("travelDate");

    const fare =
        document.getElementById("bookingFare");

    const status =
        document.getElementById("bookingStatus");


    if (bookingId) {

        bookingId.value = "";

    }


    if (passenger) {

        passenger.value = "";

    }


    if (bus) {

        bus.value = "";

    }


    if (route) {

        route.value = "";

    }


    if (seat) {

        seat.value = "";

    }


    if (date) {

        date.value = "";

    }


    if (fare) {

        fare.value = "";

    }


    if (status) {

        status.value = "Confirmed";

    }

}


/* =========================================================
   SAVE BOOKING
   ========================================================= */

function saveBooking() {

    let bookings =
        getBookings();


    /* =====================================================
       FORM ELEMENTS
       ===================================================== */

    const idElement =
        document.getElementById("bookingId");

    const passengerElement =
        document.getElementById("passenger");

    const busElement =
        document.getElementById("bookingBus");

    const routeElement =
        document.getElementById("bookingRoute");

    const seatElement =
        document.getElementById("seat");

    const dateElement =
        document.getElementById("travelDate");

    const fareElement =
        document.getElementById("bookingFare");

    const statusElement =
        document.getElementById("bookingStatus");


    /* =====================================================
       CHECK ELEMENTS
       ===================================================== */

    if (!idElement ||
        !passengerElement ||
        !busElement ||
        !routeElement ||
        !seatElement ||
        !dateElement ||
        !fareElement ||
        !statusElement
    ) {

        alert(
            "Booking form error! Check bookings.html IDs."
        );

        console.error(
            "One or more booking form elements are missing."
        );

        return;

    }


    /* =====================================================
       GET VALUES
       ===================================================== */

    const id =
        idElement.value.trim();


    const passenger =
        passengerElement.value.trim();


    const busId =
        busElement.value.trim();


    const routeId =
        routeElement.value.trim();


    const seat =
        seatElement.value.trim();


    const date =
        dateElement.value.trim();


    const fare =
        fareElement.value.trim();


    const status =
        statusElement.value ||
        "Confirmed";


    /* =====================================================
       VALIDATION - PASSENGER
       ===================================================== */

    if (!passenger) {

        alert(
            "Please enter Passenger Name."
        );

        passengerElement.focus();

        return;

    }


    /* =====================================================
       VALIDATION - BUS
       ===================================================== */

    if (!busId) {

        alert(
            "Please enter Bus Number."
        );

        busElement.focus();

        return;

    }


    /* =====================================================
       VALIDATION - ROUTE
       ===================================================== */

    if (!routeId) {

        alert(
            "Please enter Route."
        );

        routeElement.focus();

        return;

    }


    /* =====================================================
       VALIDATION - SEAT
       ===================================================== */

    if (!seat) {

        alert(
            "Please enter Seat Number."
        );

        seatElement.focus();

        return;

    }


    /* =====================================================
       VALIDATION - DATE
       ===================================================== */

    if (!date) {

        alert(
            "Please select Travel Date."
        );

        dateElement.focus();

        return;

    }


    /* =====================================================
       VALIDATION - FARE
       ===================================================== */

    if (!fare) {

        alert(
            "Please enter Fare."
        );

        fareElement.focus();

        return;

    }


    const numericFare =
        Number(fare);


    if (
        Number.isNaN(numericFare) ||
        numericFare < 0
    ) {

        alert(
            "Fare must be a valid number."
        );

        fareElement.focus();

        return;

    }


    /* =====================================================
       DUPLICATE SEAT CHECK
       ===================================================== */

    const duplicateSeat =
        bookings.find(function(booking) {

            const sameBus =
                String(booking.busId || "")
                .trim()
                .toLowerCase() ===
                String(busId)
                .trim()
                .toLowerCase();


            const sameDate =
                String(booking.date || "")
                .trim() ===
                String(date)
                .trim();


            const sameSeat =
                String(booking.seat || "")
                .trim()
                .toLowerCase() ===
                String(seat)
                .trim()
                .toLowerCase();


            const differentBooking =
                String(booking.id) !==
                String(id);


            return (
                sameBus &&
                sameDate &&
                sameSeat &&
                differentBooking
            );

        });


    if (duplicateSeat) {

        alert(
            "This seat is already booked for this bus and date."
        );

        seatElement.focus();

        return;

    }


    /* =====================================================
       CREATE BOOKING OBJECT
       ===================================================== */

    const booking = {

        id: id !== "" ?
            Number(id) :
            generateBookingId(bookings),

        passenger: passenger,

        busId: busId,

        routeId: routeId,

        seat: seat,

        date: date,

        amount: numericFare,

        status: status

    };


    /* =====================================================
       UPDATE EXISTING BOOKING
       ===================================================== */

    if (id !== "") {

        const index =
            bookings.findIndex(
                function(item) {

                    return (
                        Number(item.id) ===
                        Number(id)
                    );

                }
            );


        if (index === -1) {

            alert(
                "Booking not found."
            );

            return;

        }


        bookings[index] =
            booking;

    }


    /* =====================================================
       ADD NEW BOOKING
       ===================================================== */
    else {

        bookings.push(
            booking
        );

    }


    /* =====================================================
       SAVE
       ===================================================== */

    const saved =
        saveBookings(
            bookings
        );


    if (!saved) {

        return;

    }


    /* =====================================================
       DISPLAY
       ===================================================== */

    displayBookings();


    /* =====================================================
       UPDATE COUNT
       ===================================================== */

    updateBookingCount();


    /* =====================================================
       CLOSE MODAL
       ===================================================== */

    const modalElement =
        document.getElementById(
            "bookingModal"
        );


    if (
        modalElement &&
        typeof bootstrap !== "undefined"
    ) {

        const modal =
            bootstrap.Modal.getOrCreateInstance(
                modalElement
            );


        modal.hide();

    }


    /* =====================================================
       CLEAR FORM
       ===================================================== */

    clearBookingForm();


    /* =====================================================
       SUCCESS
       ===================================================== */

    if (id !== "") {

        alert(
            "Booking updated successfully!"
        );

    } else {

        alert(
            "Booking saved successfully!"
        );

    }

}


/* =========================================================
   DISPLAY BOOKINGS
   ========================================================= */

function displayBookings(
    list = null
) {

    const table =
        document.getElementById(
            "bookingTable"
        );


    if (!table) {

        console.error(
            "bookingTable not found."
        );

        return;

    }


    const bookings =
        list !== null ?
        list :
        getBookings();


    table.innerHTML = "";


    /* =====================================================
       NO BOOKINGS
       ===================================================== */

    if (bookings.length === 0) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="9"
                    class="text-center text-muted py-4"
                >

                    <i
                        class="bi bi-ticket-perforated fs-2 d-block mb-2"
                    ></i>

                    No bookings found.

                </td>

            </tr>

        `;

        return;

    }


    /* =====================================================
       DISPLAY BOOKINGS
       ===================================================== */

    bookings.forEach(
        function(booking) {


            const status =
                String(
                    booking.status ||
                    "Confirmed"
                );


            let statusClass =
                "bg-success";


            const lowerStatus =
                status.toLowerCase();


            if (
                lowerStatus ===
                "cancelled"
            ) {

                statusClass =
                    "bg-danger";

            } else if (
                lowerStatus ===
                "pending"
            ) {

                statusClass =
                    "bg-warning text-dark";

            } else if (
                lowerStatus ===
                "completed"
            ) {

                statusClass =
                    "bg-primary";

            }


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${escapeBookingHTML(
                        booking.id
                    )}
                </td>


                <td>

                    <strong>
                        ${escapeBookingHTML(
                            booking.passenger
                        )}
                    </strong>

                </td>


                <td>
                    ${escapeBookingHTML(
                        booking.busId
                    )}
                </td>


                <td>
                    ${escapeBookingHTML(
                        booking.routeId
                    )}
                </td>


                <td>
                    ${escapeBookingHTML(
                        booking.seat
                    )}
                </td>


                <td>
                    ${escapeBookingHTML(
                        booking.date
                    )}
                </td>


                <td>

                    ₹${Number(
                        booking.amount || 0
                    ).toFixed(2)}

                </td>


                <td>

                    <span
                        class="badge ${statusClass}"
                    >

                        ${escapeBookingHTML(
                            status
                        )}

                    </span>

                </td>


                <td>

                    <button
                        type="button"
                        class="btn btn-sm btn-warning me-1"
                        onclick="editBooking(${Number(
                            booking.id
                        )})"
                        title="Edit Booking"
                    >

                        <i
                            class="bi bi-pencil"
                        ></i>

                    </button>


                    <button
                        type="button"
                        class="btn btn-sm btn-danger"
                        onclick="deleteBooking(${Number(
                            booking.id
                        )})"
                        title="Delete Booking"
                    >

                        <i
                            class="bi bi-trash"
                        ></i>

                    </button>

                </td>

            `;


            table.appendChild(
                row
            );

        }
    );

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeBookingHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

    .replace(
        /&/g,
        "&amp;"
    )

    .replace(
        /</g,
        "&lt;"
    )

    .replace(
        />/g,
        "&gt;"
    )

    .replace(
        /"/g,
        "&quot;"
    )

    .replace(
        /'/g,
        "&#039;"
    );

}


/* =========================================================
   EDIT BOOKING
   ========================================================= */

function editBooking(id) {

    const bookings =
        getBookings();


    const booking =
        bookings.find(
            function(item) {

                return (
                    Number(item.id) ===
                    Number(id)
                );

            }
        );


    if (!booking) {

        alert(
            "Booking not found."
        );

        return;

    }


    /* =====================================================
       GET ELEMENTS
       ===================================================== */

    const bookingId =
        document.getElementById(
            "bookingId"
        );


    const passenger =
        document.getElementById(
            "passenger"
        );


    const bus =
        document.getElementById(
            "bookingBus"
        );


    const route =
        document.getElementById(
            "bookingRoute"
        );


    const seat =
        document.getElementById(
            "seat"
        );


    const date =
        document.getElementById(
            "travelDate"
        );


    const fare =
        document.getElementById(
            "bookingFare"
        );


    const status =
        document.getElementById(
            "bookingStatus"
        );


    /* =====================================================
       SET VALUES
       ===================================================== */

    if (bookingId) {

        bookingId.value =
            booking.id;

    }


    if (passenger) {

        passenger.value =
            booking.passenger || "";

    }


    if (bus) {

        bus.value =
            booking.busId || "";

    }


    if (route) {

        route.value =
            booking.routeId || "";

    }


    if (seat) {

        seat.value =
            booking.seat || "";

    }


    if (date) {

        date.value =
            booking.date || "";

    }


    if (fare) {

        fare.value =
            booking.amount || "";

    }


    if (status) {

        status.value =
            booking.status ||
            "Confirmed";

    }


    /* =====================================================
       OPEN MODAL
       ===================================================== */

    const modalElement =
        document.getElementById(
            "bookingModal"
        );


    if (
        modalElement &&
        typeof bootstrap !== "undefined"
    ) {

        const modal =
            bootstrap.Modal.getOrCreateInstance(
                modalElement
            );


        modal.show();

    }

}


/* =========================================================
   DELETE BOOKING
   ========================================================= */

function deleteBooking(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this booking?"
        );


    if (!confirmed) {

        return;

    }


    let bookings =
        getBookings();


    const oldLength =
        bookings.length;


    bookings =
        bookings.filter(
            function(booking) {

                return (
                    Number(booking.id) !==
                    Number(id)
                );

            }
        );


    if (
        bookings.length ===
        oldLength
    ) {

        alert(
            "Booking not found."
        );

        return;

    }


    const saved =
        saveBookings(
            bookings
        );


    if (!saved) {

        return;

    }


    displayBookings();


    updateBookingCount();


    alert(
        "Booking deleted successfully!"
    );

}


/* =========================================================
   SEARCH BOOKINGS
   ========================================================= */

function searchBookings() {

    const searchInput =
        document.getElementById(
            "bookingSearch"
        );


    if (!searchInput) {

        return;

    }


    const keyword =
        searchInput.value
        .trim()
        .toLowerCase();


    const bookings =
        getBookings();


    if (keyword === "") {

        displayBookings();

        return;

    }


    const filtered =
        bookings.filter(
            function(booking) {

                return (

                    String(
                        booking.id
                    )
                    .toLowerCase()
                    .includes(keyword)

                    ||

                    String(
                        booking.passenger
                    )
                    .toLowerCase()
                    .includes(keyword)

                    ||

                    String(
                        booking.busId
                    )
                    .toLowerCase()
                    .includes(keyword)

                    ||

                    String(
                        booking.routeId
                    )
                    .toLowerCase()
                    .includes(keyword)

                    ||

                    String(
                        booking.seat
                    )
                    .toLowerCase()
                    .includes(keyword)

                    ||

                    String(
                        booking.date
                    )
                    .toLowerCase()
                    .includes(keyword)

                    ||

                    String(
                        booking.amount
                    )
                    .toLowerCase()
                    .includes(keyword)

                    ||

                    String(
                        booking.status
                    )
                    .toLowerCase()
                    .includes(keyword)

                );

            }
        );


    displayBookings(
        filtered
    );

}


/* =========================================================
   REFRESH BOOKINGS
   ========================================================= */

function refreshBookings() {

    displayBookings();

    updateBookingCount();

}


/* =========================================================
   PREPARE NEW BOOKING
   ========================================================= */

function prepareNewBooking() {

    clearBookingForm();


    const modalElement =
        document.getElementById(
            "bookingModal"
        );


    if (
        modalElement &&
        typeof bootstrap !== "undefined"
    ) {

        const modal =
            bootstrap.Modal.getOrCreateInstance(
                modalElement
            );


        modal.show();

    }

}


/* =========================================================
   UPDATE BOOKING COUNT
   ========================================================= */

function updateBookingCount() {

    const countElement =
        document.getElementById(
            "bookingCount"
        );


    if (!countElement) {

        return;

    }


    const bookings =
        getBookings();


    countElement.textContent =
        bookings.length;

}


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayBookings();

        updateBookingCount();

    }
);


/* =========================================================
   STORAGE CHANGE
   ========================================================= */

window.addEventListener(
    "storage",
    function() {

        displayBookings();

        updateBookingCount();

    }
);