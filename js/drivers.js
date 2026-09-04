/* =========================================================
   DRIVERS.JS
   Bus Management System
   ========================================================= */


/* =========================================================
   GET DRIVERS
   ========================================================= */

function getDrivers() {

    try {

        const data = localStorage.getItem("drivers");

        if (!data) {
            return [];
        }

        const drivers = JSON.parse(data);

        return Array.isArray(drivers) ? drivers : [];

    } catch (error) {

        console.error("Error reading drivers:", error);

        return [];
    }
}


/* =========================================================
   SAVE DRIVERS
   ========================================================= */

function saveDrivers(drivers) {

    localStorage.setItem(
        "drivers",
        JSON.stringify(drivers)
    );

}


/* =========================================================
   GENERATE DRIVER ID
   ========================================================= */

function generateDriverId(drivers) {

    if (drivers.length === 0) {
        return 1;
    }

    const ids = drivers.map(function(driver) {

        return Number(driver.id) || 0;

    });

    return Math.max.apply(null, ids) + 1;

}


/* =========================================================
   CLEAR DRIVER FORM
   ========================================================= */

function clearDriverForm() {

    const driverId =
        document.getElementById("driverId");

    const driverName =
        document.getElementById("driverName");

    const phone =
        document.getElementById("phone");

    const licenseNumber =
        document.getElementById("licenseNumber");

    const experience =
        document.getElementById("experience");

    const status =
        document.getElementById("driverStatus");


    if (driverId) {
        driverId.value = "";
    }

    if (driverName) {
        driverName.value = "";
    }

    if (phone) {
        phone.value = "";
    }

    if (licenseNumber) {
        licenseNumber.value = "";
    }

    if (experience) {
        experience.value = "";
    }

    if (status) {
        status.value = "Active";
    }

}


/* =========================================================
   SAVE DRIVER
   ========================================================= */

function saveDriver() {

    let drivers = getDrivers();


    const idElement =
        document.getElementById("driverId");

    const nameElement =
        document.getElementById("driverName");

    const phoneElement =
        document.getElementById("phone");

    const licenseElement =
        document.getElementById("licenseNumber");

    const experienceElement =
        document.getElementById("experience");

    const statusElement =
        document.getElementById("driverStatus");


    const id =
        idElement ?
        idElement.value.trim() :
        "";


    const driverName =
        nameElement ?
        nameElement.value.trim() :
        "";


    const phone =
        phoneElement ?
        phoneElement.value.trim() :
        "";


    const licenseNumber =
        licenseElement ?
        licenseElement.value.trim() :
        "";


    const experienceValue =
        experienceElement ?
        experienceElement.value.trim() :
        "";


    const status =
        statusElement ?
        statusElement.value :
        "Active";


    /* =====================================================
       DRIVER NAME VALIDATION
       ===================================================== */

    if (!driverName) {

        alert("Please enter Driver Name.");

        if (nameElement) {
            nameElement.focus();
        }

        return;
    }


    /* =====================================================
       PHONE VALIDATION
       ===================================================== */

    if (!phone) {

        alert("Please enter Phone Number.");

        if (phoneElement) {
            phoneElement.focus();
        }

        return;
    }


    if (!/^[0-9]{10}$/.test(phone)) {

        alert(
            "Phone number must contain exactly 10 digits."
        );

        if (phoneElement) {
            phoneElement.focus();
        }

        return;
    }


    /* =====================================================
       LICENSE VALIDATION
       ===================================================== */

    if (!licenseNumber) {

        alert("Please enter License Number.");

        if (licenseElement) {
            licenseElement.focus();
        }

        return;
    }


    /* =====================================================
       EXPERIENCE
       ===================================================== */

    const experience =
        experienceValue === "" ?
        0 :
        Number(experienceValue);


    if (!Number.isFinite(experience) ||
        experience < 0
    ) {

        alert(
            "Experience must be 0 or greater."
        );

        if (experienceElement) {
            experienceElement.focus();
        }

        return;
    }


    /* =====================================================
       DUPLICATE LICENSE CHECK
       ===================================================== */

    const duplicateLicense =
        drivers.find(function(driver) {

            const oldLicense =
                String(
                    driver.licenseNumber || ""
                )
                .trim()
                .toLowerCase();


            const newLicense =
                licenseNumber
                .trim()
                .toLowerCase();


            return (
                oldLicense === newLicense &&
                String(driver.id) !== String(id)
            );

        });


    if (duplicateLicense) {

        alert(
            "License Number already exists."
        );

        if (licenseElement) {
            licenseElement.focus();
        }

        return;
    }


    /* =====================================================
       CREATE DRIVER OBJECT
       ===================================================== */

    const driver = {

        id: id ?
            Number(id) :
            generateDriverId(drivers),

        driverName: driverName,

        phone: phone,

        licenseNumber: licenseNumber,

        experience: experience,

        status: status || "Active"

    };


    /* =====================================================
       UPDATE EXISTING DRIVER
       ===================================================== */

    if (id) {

        const index =
            drivers.findIndex(function(item) {

                return (
                    Number(item.id) ===
                    Number(id)
                );

            });


        if (index !== -1) {

            drivers[index] = driver;

        } else {

            drivers.push(driver);

        }

    }


    /* =====================================================
       ADD NEW DRIVER
       ===================================================== */
    else {

        drivers.push(driver);

    }


    /* =====================================================
       SAVE TO LOCAL STORAGE
       ===================================================== */

    saveDrivers(drivers);


    /* =====================================================
       DISPLAY
       ===================================================== */

    displayDrivers();


    /* =====================================================
       CLOSE MODAL
       ===================================================== */

    const modalElement =
        document.getElementById("driverModal");


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

    clearDriverForm();


    /* =====================================================
       SUCCESS MESSAGE
       ===================================================== */

    alert(
        "Driver saved successfully."
    );

}


/* =========================================================
   DISPLAY DRIVERS
   ========================================================= */

function displayDrivers() {

    const table =
        document.getElementById("driverTable");

    const count =
        document.getElementById("driverCount");


    if (!table) {
        return;
    }


    const drivers =
        getDrivers();


    /* =====================================================
       DRIVER COUNT
       ===================================================== */

    if (count) {

        count.textContent =
            drivers.length;

    }


    table.innerHTML = "";


    /* =====================================================
       NO DRIVERS
       ===================================================== */

    if (drivers.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7"
                    class="text-center text-muted py-4">

                    No drivers found.

                </td>
            </tr>
        `;

        return;
    }


    /* =====================================================
       DISPLAY EACH DRIVER
       ===================================================== */

    drivers.forEach(function(driver) {

        const status =
            String(
                driver.status || "Active"
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
                    ${escapeDriverHTML(driver.id)}
                </td>


                <td>

                    <strong>
                        ${escapeDriverHTML(
                            driver.driverName
                        )}
                    </strong>

                </td>


                <td>
                    ${escapeDriverHTML(
                        driver.phone
                    )}
                </td>


                <td>
                    ${escapeDriverHTML(
                        driver.licenseNumber
                    )}
                </td>


                <td>
                    ${escapeDriverHTML(
                        driver.experience
                    )}
                    Years
                </td>


                <td>

                    <span class="badge ${statusClass}">
                        ${escapeDriverHTML(status)}
                    </span>

                </td>


                <td>

                    <button
                        type="button"
                        class="btn btn-sm btn-warning"
                        onclick="editDriver(${Number(driver.id)})">

                        <i class="bi bi-pencil"></i>

                    </button>


                    <button
                        type="button"
                        class="btn btn-sm btn-danger"
                        onclick="deleteDriver(${Number(driver.id)})">

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

function escapeDriverHTML(value) {

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
   EDIT DRIVER
   ========================================================= */

function editDriver(id) {

    const drivers =
        getDrivers();


    const driver =
        drivers.find(function(item) {

            return (
                Number(item.id) ===
                Number(id)
            );

        });


    if (!driver) {

        alert("Driver not found.");

        return;
    }


    const driverId =
        document.getElementById("driverId");

    const driverName =
        document.getElementById("driverName");

    const phone =
        document.getElementById("phone");

    const licenseNumber =
        document.getElementById("licenseNumber");

    const experience =
        document.getElementById("experience");

    const status =
        document.getElementById("driverStatus");


    if (driverId) {

        driverId.value =
            driver.id;

    }


    if (driverName) {

        driverName.value =
            driver.driverName || "";

    }


    if (phone) {

        phone.value =
            driver.phone || "";

    }


    if (licenseNumber) {

        licenseNumber.value =
            driver.licenseNumber || "";

    }


    if (experience) {

        experience.value =
            driver.experience || 0;

    }


    if (status) {

        status.value =
            driver.status || "Active";

    }


    /* =====================================================
       OPEN MODAL
       ===================================================== */

    const modalElement =
        document.getElementById("driverModal");


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
   DELETE DRIVER
   ========================================================= */

function deleteDriver(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this driver?"
        );


    if (!confirmed) {
        return;
    }


    let drivers =
        getDrivers();


    drivers =
        drivers.filter(function(driver) {

            return (
                Number(driver.id) !==
                Number(id)
            );

        });


    saveDrivers(drivers);


    displayDrivers();


    alert(
        "Driver deleted successfully."
    );

}


/* =========================================================
   SEARCH DRIVERS
   ========================================================= */

function searchDrivers() {

    const searchElement =
        document.getElementById("driverSearch");


    if (!searchElement) {
        return;
    }


    const search =
        searchElement.value
        .trim()
        .toLowerCase();


    const rows =
        document.querySelectorAll(
            "#driverTable tr"
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
   REFRESH DRIVERS
   ========================================================= */

function refreshDrivers() {

    displayDrivers();

}


/* =========================================================
   PREPARE NEW DRIVER
   ========================================================= */

function prepareNewDriver() {

    clearDriverForm();


    const modalElement =
        document.getElementById("driverModal");


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

        displayDrivers();

    }
);


/* =========================================================
   STORAGE CHANGE
   ========================================================= */

window.addEventListener(
    "storage",
    function() {

        displayDrivers();

    }
);