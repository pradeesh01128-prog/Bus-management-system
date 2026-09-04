/* =========================================================
   SCHEDULES.JS
   Bus Management System
   ========================================================= */


/* =========================================================
   GET SCHEDULES
   ========================================================= */

function getSchedules() {

    try {

        const data = localStorage.getItem("schedules");

        if (!data) {
            return [];
        }

        const schedules = JSON.parse(data);

        return Array.isArray(schedules) ?
            schedules :
            [];

    } catch (error) {

        console.error(
            "Error reading schedules:",
            error
        );

        return [];

    }
}


/* =========================================================
   SAVE SCHEDULES
   ========================================================= */

function saveSchedules(schedules) {

    localStorage.setItem(
        "schedules",
        JSON.stringify(schedules)
    );

}


/* =========================================================
   GENERATE SCHEDULE ID
   ========================================================= */

function generateScheduleId(schedules) {

    if (schedules.length === 0) {
        return 1;
    }

    const ids = schedules.map(function(schedule) {

        return Number(schedule.id) || 0;

    });

    return Math.max.apply(null, ids) + 1;

}


/* =========================================================
   CLEAR SCHEDULE FORM
   ========================================================= */

function clearScheduleForm() {

    const scheduleId =
        document.getElementById("scheduleId");

    const busId =
        document.getElementById("scheduleBus");

    const routeId =
        document.getElementById("scheduleRoute");

    const date =
        document.getElementById("scheduleDate");

    const departureTime =
        document.getElementById("departureTime");

    const arrivalTime =
        document.getElementById("arrivalTime");

    const status =
        document.getElementById("scheduleStatus");


    if (scheduleId) {
        scheduleId.value = "";
    }

    if (busId) {
        busId.value = "";
    }

    if (routeId) {
        routeId.value = "";
    }

    if (date) {
        date.value = "";
    }

    if (departureTime) {
        departureTime.value = "";
    }

    if (arrivalTime) {
        arrivalTime.value = "";
    }

    if (status) {
        status.value = "Active";
    }

}


/* =========================================================
   SAVE SCHEDULE
   ========================================================= */

function saveSchedule() {

    let schedules = getSchedules();


    const idElement =
        document.getElementById("scheduleId");

    const busElement =
        document.getElementById("scheduleBus");

    const routeElement =
        document.getElementById("scheduleRoute");

    const dateElement =
        document.getElementById("scheduleDate");

    const departureElement =
        document.getElementById("departureTime");

    const arrivalElement =
        document.getElementById("arrivalTime");

    const statusElement =
        document.getElementById("scheduleStatus");


    const id =
        idElement ?
        idElement.value.trim() :
        "";


    const busId =
        busElement ?
        busElement.value.trim() :
        "";


    const routeId =
        routeElement ?
        routeElement.value.trim() :
        "";


    const date =
        dateElement ?
        dateElement.value.trim() :
        "";


    const departureTime =
        departureElement ?
        departureElement.value.trim() :
        "";


    const arrivalTime =
        arrivalElement ?
        arrivalElement.value.trim() :
        "";


    const status =
        statusElement ?
        statusElement.value :
        "Active";


    /* =====================================================
       VALIDATION
       ===================================================== */

    if (!busId) {

        alert("Please select Bus.");

        if (busElement) {
            busElement.focus();
        }

        return;
    }


    if (!routeId) {

        alert("Please select Route.");

        if (routeElement) {
            routeElement.focus();
        }

        return;
    }


    if (!date) {

        alert("Please select Schedule Date.");

        if (dateElement) {
            dateElement.focus();
        }

        return;
    }


    if (!departureTime) {

        alert("Please enter Departure Time.");

        if (departureElement) {
            departureElement.focus();
        }

        return;
    }


    if (!arrivalTime) {

        alert("Please enter Arrival Time.");

        if (arrivalElement) {
            arrivalElement.focus();
        }

        return;
    }


    /* =====================================================
       CREATE SCHEDULE OBJECT
       ===================================================== */

    const schedule = {

        id: id ?
            Number(id) :
            generateScheduleId(schedules),

        busId: busId,

        routeId: routeId,

        date: date,

        departureTime: departureTime,

        arrivalTime: arrivalTime,

        status: status || "Active"

    };


    /* =====================================================
       UPDATE EXISTING
       ===================================================== */

    if (id) {

        const index =
            schedules.findIndex(function(item) {

                return (
                    Number(item.id) ===
                    Number(id)
                );

            });


        if (index !== -1) {

            schedules[index] = schedule;

        } else {

            schedules.push(schedule);

        }

    }


    /* =====================================================
       ADD NEW
       ===================================================== */
    else {

        schedules.push(schedule);

    }


    /* =====================================================
       SAVE
       ===================================================== */

    saveSchedules(schedules);


    /* =====================================================
       DISPLAY
       ===================================================== */

    displaySchedules();


    /* =====================================================
       CLOSE MODAL
       ===================================================== */

    const modalElement =
        document.getElementById("scheduleModal");


    if (
        modalElement &&
        typeof bootstrap !== "undefined"
    ) {

        const modal =
            bootstrap.Modal.getInstance(
                modalElement
            );


        if (modal) {
            modal.hide();
        }

    }


    /* =====================================================
       CLEAR FORM
       ===================================================== */

    clearScheduleForm();


    /* =====================================================
       SUCCESS
       ===================================================== */

    alert("Schedule saved successfully.");

}


/* =========================================================
   DISPLAY SCHEDULES
   ========================================================= */

function displaySchedules() {

    const table =
        document.getElementById("scheduleTable");


    if (!table) {
        return;
    }


    const schedules =
        getSchedules();


    table.innerHTML = "";


    /* =====================================================
       NO SCHEDULES
       ===================================================== */

    if (schedules.length === 0) {

        table.innerHTML = `
            <tr>

                <td colspan="8"
                    class="text-center text-muted py-4">

                    No schedules found.

                </td>

            </tr>
        `;

        return;
    }


    /* =====================================================
       DISPLAY DATA
       ===================================================== */

    schedules.forEach(function(schedule) {

        const status =
            String(
                schedule.status || "Active"
            );


        let statusClass =
            "bg-success";


        if (
            status.toLowerCase() ===
            "inactive"
        ) {

            statusClass =
                "bg-secondary";

        }


        table.innerHTML += `

            <tr>

                <td>
                    ${escapeScheduleHTML(schedule.id)}
                </td>


                <td>
                    ${escapeScheduleHTML(schedule.busId)}
                </td>


                <td>
                    ${escapeScheduleHTML(schedule.routeId)}
                </td>


                <td>
                    ${escapeScheduleHTML(schedule.date)}
                </td>


                <td>
                    ${escapeScheduleHTML(
                        schedule.departureTime
                    )}
                </td>


                <td>
                    ${escapeScheduleHTML(
                        schedule.arrivalTime
                    )}
                </td>


                <td>

                    <span class="badge ${statusClass}">
                        ${escapeScheduleHTML(status)}
                    </span>

                </td>


                <td>

                    <button
                        type="button"
                        class="btn btn-sm btn-warning"
                        onclick="editSchedule(${Number(schedule.id)})">

                        <i class="bi bi-pencil"></i>

                    </button>


                    <button
                        type="button"
                        class="btn btn-sm btn-danger"
                        onclick="deleteSchedule(${Number(schedule.id)})">

                        <i class="bi bi-trash"></i>

                    </button>

                </td>

            </tr>

        `;

    });

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeScheduleHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

    .replace(/&/g, "&amp;")

    .replace(/</g, "&lt;")

    .replace(/>/g, "&gt;")

    .replace(/"/g, "&quot;")

    .replace(/'/g, "&#039;");

}


/* =========================================================
   EDIT SCHEDULE
   ========================================================= */

function editSchedule(id) {

    const schedules =
        getSchedules();


    const schedule =
        schedules.find(function(item) {

            return (
                Number(item.id) ===
                Number(id)
            );

        });


    if (!schedule) {

        alert("Schedule not found.");

        return;
    }


    const scheduleId =
        document.getElementById("scheduleId");

    const busElement =
        document.getElementById("scheduleBus");

    const routeElement =
        document.getElementById("scheduleRoute");

    const dateElement =
        document.getElementById("scheduleDate");

    const departureElement =
        document.getElementById("departureTime");

    const arrivalElement =
        document.getElementById("arrivalTime");

    const statusElement =
        document.getElementById("scheduleStatus");


    if (scheduleId) {

        scheduleId.value =
            schedule.id;

    }


    if (busElement) {

        busElement.value =
            schedule.busId || "";

    }


    if (routeElement) {

        routeElement.value =
            schedule.routeId || "";

    }


    if (dateElement) {

        dateElement.value =
            schedule.date || "";

    }


    if (departureElement) {

        departureElement.value =
            schedule.departureTime || "";

    }


    if (arrivalElement) {

        arrivalElement.value =
            schedule.arrivalTime || "";

    }


    if (statusElement) {

        statusElement.value =
            schedule.status || "Active";

    }


    /* =====================================================
       OPEN MODAL
       ===================================================== */

    const modalElement =
        document.getElementById("scheduleModal");


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
   DELETE SCHEDULE
   ========================================================= */

function deleteSchedule(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this schedule?"
        );


    if (!confirmed) {
        return;
    }


    let schedules =
        getSchedules();


    schedules =
        schedules.filter(function(schedule) {

            return (
                Number(schedule.id) !==
                Number(id)
            );

        });


    saveSchedules(schedules);


    displaySchedules();


    alert(
        "Schedule deleted successfully."
    );

}


/* =========================================================
   SEARCH SCHEDULES
   ========================================================= */

function searchSchedules() {

    const searchElement =
        document.getElementById("scheduleSearch");


    if (!searchElement) {
        return;
    }


    const search =
        searchElement.value
        .trim()
        .toLowerCase();


    const rows =
        document.querySelectorAll(
            "#scheduleTable tr"
        );


    rows.forEach(function(row) {

        const text =
            row.innerText.toLowerCase();


        row.style.display =
            text.includes(search) ?
            "" :
            "none";

    });

}


/* =========================================================
   REFRESH SCHEDULES
   ========================================================= */

function refreshSchedules() {

    displaySchedules();

}


/* =========================================================
   PREPARE NEW SCHEDULE
   ========================================================= */

function prepareNewSchedule() {

    clearScheduleForm();


    const modalElement =
        document.getElementById("scheduleModal");


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
   PAGE LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displaySchedules();

    }
);


/* =========================================================
   STORAGE CHANGE
   ========================================================= */

window.addEventListener(
    "storage",
    function() {

        displaySchedules();

    }
);