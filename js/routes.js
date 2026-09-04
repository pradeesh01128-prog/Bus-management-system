/* =========================================================
   ROUTES.JS
   Bus Management System
   ========================================================= */


/* =========================================================
   GET ROUTES
   ========================================================= */

function getRoutes() {

    try {

        const data = localStorage.getItem("routes");

        if (!data) {
            return [];
        }

        const routes = JSON.parse(data);

        return Array.isArray(routes) ? routes : [];

    } catch (error) {

        console.error("Error loading routes:", error);

        return [];
    }
}


/* =========================================================
   SAVE ROUTES
   ========================================================= */

function saveRoutes(routes) {

    try {

        localStorage.setItem(
            "routes",
            JSON.stringify(routes)
        );

    } catch (error) {

        console.error("Error saving routes:", error);

        alert("Unable to save route data.");
    }
}


/* =========================================================
   GENERATE ROUTE ID
   ========================================================= */

function generateRouteId(routes) {

    if (!routes || routes.length === 0) {
        return 1;
    }

    const ids = routes.map(function(route) {

        return Number(route.id) || 0;

    });

    return Math.max(...ids) + 1;
}


/* =========================================================
   CLEAR ROUTE FORM
   ========================================================= */

function clearRouteForm() {

    const routeId = document.getElementById("routeId");
    const routeName = document.getElementById("routeName");
    const source = document.getElementById("source");
    const destination = document.getElementById("destination");
    const distance = document.getElementById("distance");
    const fare = document.getElementById("fare");
    const status = document.getElementById("routeStatus");

    if (routeId) {
        routeId.value = "";
    }

    if (routeName) {
        routeName.value = "";
    }

    if (source) {
        source.value = "";
    }

    if (destination) {
        destination.value = "";
    }

    if (distance) {
        distance.value = "";
    }

    if (fare) {
        fare.value = "";
    }

    if (status) {
        status.value = "Active";
    }
}


/* =========================================================
   SAVE ROUTE
   ========================================================= */

function saveRoute() {

    let routes = getRoutes();

    const idElement =
        document.getElementById("routeId");

    const routeNameElement =
        document.getElementById("routeName");

    const sourceElement =
        document.getElementById("source");

    const destinationElement =
        document.getElementById("destination");

    const distanceElement =
        document.getElementById("distance");

    const fareElement =
        document.getElementById("fare");

    const statusElement =
        document.getElementById("routeStatus");


    /* =====================================================
       GET VALUES
       ===================================================== */

    const id =
        idElement ?
        idElement.value.trim() :
        "";

    const routeName =
        routeNameElement ?
        routeNameElement.value.trim() :
        "";

    const source =
        sourceElement ?
        sourceElement.value.trim() :
        "";

    const destination =
        destinationElement ?
        destinationElement.value.trim() :
        "";

    const distance =
        distanceElement ?
        distanceElement.value.trim() :
        "";

    const fare =
        fareElement ?
        fareElement.value.trim() :
        "";

    const status =
        statusElement ?
        statusElement.value :
        "Active";


    /* =====================================================
       VALIDATION
       ===================================================== */

    if (!routeName) {

        alert(
            "Please enter Route Name."
        );

        if (routeNameElement) {
            routeNameElement.focus();
        }

        return;
    }


    if (!source) {

        alert(
            "Please enter Source / Start Point."
        );

        if (sourceElement) {
            sourceElement.focus();
        }

        return;
    }


    if (!destination) {

        alert(
            "Please enter Destination."
        );

        if (destinationElement) {
            destinationElement.focus();
        }

        return;
    }


    /* =====================================================
       DISTANCE VALIDATION
       ===================================================== */

    if (
        distance !== "" &&
        (
            isNaN(Number(distance)) ||
            Number(distance) < 0
        )
    ) {

        alert(
            "Please enter a valid Distance."
        );

        if (distanceElement) {
            distanceElement.focus();
        }

        return;
    }


    /* =====================================================
       FARE VALIDATION
       ===================================================== */

    if (
        fare !== "" &&
        (
            isNaN(Number(fare)) ||
            Number(fare) < 0
        )
    ) {

        alert(
            "Please enter a valid Fare."
        );

        if (fareElement) {
            fareElement.focus();
        }

        return;
    }


    /* =====================================================
       DUPLICATE ROUTE CHECK
       ===================================================== */

    const duplicateRoute =
        routes.find(function(route) {

            const sameSource =
                String(route.source || "")
                .trim()
                .toLowerCase() ===
                source.toLowerCase();

            const sameDestination =
                String(route.destination || "")
                .trim()
                .toLowerCase() ===
                destination.toLowerCase();

            const differentRoute =
                String(route.id) !==
                String(id);

            return (
                sameSource &&
                sameDestination &&
                differentRoute
            );

        });


    if (duplicateRoute) {

        alert(
            "This route already exists."
        );

        return;
    }


    /* =====================================================
       CREATE ROUTE OBJECT
       ===================================================== */

    const route = {

        id: id ?
            Number(id) : generateRouteId(routes),

        routeName: routeName,

        source: source,

        destination: destination,

        distance: distance !== "" ?
            Number(distance) : 0,

        fare: fare !== "" ?
            Number(fare) : 0,

        status: status

    };


    /* =====================================================
       UPDATE EXISTING ROUTE
       ===================================================== */

    if (id) {

        const index =
            routes.findIndex(function(item) {

                return (
                    Number(item.id) ===
                    Number(id)
                );

            });


        if (index !== -1) {

            routes[index] = route;

        } else {

            routes.push(route);
        }

    }


    /* =====================================================
       ADD NEW ROUTE
       ===================================================== */
    else {

        routes.push(route);
    }


    /* =====================================================
       SAVE TO LOCAL STORAGE
       ===================================================== */

    saveRoutes(routes);


    /* =====================================================
       REFRESH TABLE
       ===================================================== */

    displayRoutes();


    /* =====================================================
       CLOSE MODAL
       ===================================================== */

    const modalElement =
        document.getElementById("routeModal");

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

    clearRouteForm();


    /* =====================================================
       SUCCESS MESSAGE
       ===================================================== */

    alert(
        id ?
        "Route updated successfully!" :
        "Route added successfully!"
    );
}


/* =========================================================
   DISPLAY ROUTES
   ========================================================= */

function displayRoutes() {

    const table =
        document.getElementById("routeTable");

    const countElement =
        document.getElementById("routeCount");


    if (!table) {
        return;
    }


    const routes = getRoutes();


    table.innerHTML = "";


    /* =====================================================
       ROUTE COUNT
       ===================================================== */

    if (countElement) {

        countElement.textContent =
            routes.length;
    }


    /* =====================================================
       NO ROUTES
       ===================================================== */

    if (routes.length === 0) {

        table.innerHTML = `
            <tr>
                <td
                    colspan="8"
                    class="text-center text-muted py-4"
                >
                    <i class="bi bi-signpost-2 fs-2"></i>
                    <br>
                    No routes found.
                    <br>
                    Add a new route to get started.
                </td>
            </tr>
        `;

        return;
    }


    /* =====================================================
       DISPLAY ROUTES
       ===================================================== */

    routes.forEach(function(route) {

        const row =
            document.createElement("tr");


        const status =
            route.status || "Active";


        const statusClass =
            status === "Active" ?
            "bg-success" :
            "bg-secondary";


        row.innerHTML = `

            <td>
                ${escapeRouteHTML(route.id)}
            </td>

            <td>
                <strong>
                    ${escapeRouteHTML(route.routeName)}
                </strong>
            </td>

            <td>
                ${escapeRouteHTML(route.source)}
            </td>

            <td>
                ${escapeRouteHTML(route.destination)}
            </td>

            <td>
                ${escapeRouteHTML(route.distance || 0)} KM
            </td>

            <td>
                ₹${escapeRouteHTML(route.fare || 0)}
            </td>

            <td>
                <span class="badge ${statusClass}">
                    ${escapeRouteHTML(status)}
                </span>
            </td>

            <td>

                <button
                    type="button"
                    class="btn btn-sm btn-warning me-1"
                    onclick="editRoute(${Number(route.id)})"
                    title="Edit Route"
                >
                    <i class="bi bi-pencil"></i>
                </button>

                <button
                    type="button"
                    class="btn btn-sm btn-danger"
                    onclick="deleteRoute(${Number(route.id)})"
                    title="Delete Route"
                >
                    <i class="bi bi-trash"></i>
                </button>

            </td>
        `;


        table.appendChild(row);

    });
}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeRouteHTML(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   EDIT ROUTE
   ========================================================= */

function editRoute(id) {

    const routes =
        getRoutes();


    const route =
        routes.find(function(item) {

            return (
                Number(item.id) ===
                Number(id)
            );

        });


    if (!route) {

        alert(
            "Route not found."
        );

        return;
    }


    /* =====================================================
       GET FORM ELEMENTS
       ===================================================== */

    const routeId =
        document.getElementById("routeId");

    const routeName =
        document.getElementById("routeName");

    const source =
        document.getElementById("source");

    const destination =
        document.getElementById("destination");

    const distance =
        document.getElementById("distance");

    const fare =
        document.getElementById("fare");

    const routeStatus =
        document.getElementById("routeStatus");


    /* =====================================================
       SET VALUES
       ===================================================== */

    if (routeId) {

        routeId.value =
            route.id;
    }


    if (routeName) {

        routeName.value =
            route.routeName || "";
    }


    if (source) {

        source.value =
            route.source || "";
    }


    if (destination) {

        destination.value =
            route.destination || "";
    }


    if (distance) {

        distance.value =
            route.distance || "";
    }


    if (fare) {

        fare.value =
            route.fare || "";
    }


    if (routeStatus) {

        routeStatus.value =
            route.status || "Active";
    }


    /* =====================================================
       OPEN MODAL
       ===================================================== */

    const modalElement =
        document.getElementById("routeModal");


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
   DELETE ROUTE
   ========================================================= */

function deleteRoute(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this route?"
        );


    if (!confirmed) {
        return;
    }


    let routes =
        getRoutes();


    const oldLength =
        routes.length;


    routes =
        routes.filter(function(route) {

            return (
                Number(route.id) !==
                Number(id)
            );

        });


    if (
        routes.length ===
        oldLength
    ) {

        alert(
            "Route not found."
        );

        return;
    }


    /* =====================================================
       SAVE UPDATED DATA
       ===================================================== */

    saveRoutes(routes);


    /* =====================================================
       REFRESH TABLE
       ===================================================== */

    displayRoutes();


    alert(
        "Route deleted successfully!"
    );
}


/* =========================================================
   SEARCH ROUTES
   ========================================================= */

function searchRoutes() {

    const searchElement =
        document.getElementById("routeSearch");


    if (!searchElement) {
        return;
    }


    const search =
        searchElement.value
        .trim()
        .toLowerCase();


    const rows =
        document.querySelectorAll(
            "#routeTable tr"
        );


    rows.forEach(function(row) {

        const text =
            row.innerText
            .toLowerCase();


        row.style.display =
            text.includes(search) ?
            "" :
            "none";
    });
}


/* =========================================================
   PREPARE NEW ROUTE
   ========================================================= */

function prepareNewRoute() {

    clearRouteForm();


    const modalElement =
        document.getElementById("routeModal");


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

        displayRoutes();

    }
);


/* =========================================================
   STORAGE CHANGE
   ========================================================= */

window.addEventListener(
    "storage",
    function() {

        displayRoutes();

    }
);