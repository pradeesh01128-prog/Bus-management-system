/* =========================================================
   EDIT BUS
   ========================================================= */

function editBus(id) {

    const buses = getBuses();

    const bus = buses.find(function(item) {

        return String(item.id) === String(id);

    });


    if (!bus) {

        alert(
            "Bus not found.\n" +
            " ."
        );

        return;
    }


    /* =====================================================
       GET FORM ELEMENTS
    ===================================================== */

    const busIdElement =
        document.getElementById("busId");

    const busNumberElement =
        document.getElementById("busNumber");

    const busTypeElement =
        document.getElementById("busType");

    const capacityElement =
        document.getElementById("capacity");

    const driverElement =
        document.getElementById("driver");

    const statusElement =
        document.getElementById("busStatus");


    /* =====================================================
       FILL FORM
    ===================================================== */

    if (busIdElement) {
        busIdElement.value = bus.id;
    }

    if (busNumberElement) {
        busNumberElement.value =
            bus.busNumber || "";
    }

    if (busTypeElement) {
        busTypeElement.value =
            bus.busType || "AC";
    }

    if (capacityElement) {
        capacityElement.value =
            bus.capacity || "";
    }

    if (driverElement) {
        driverElement.value =
            bus.driver || "";
    }

    if (statusElement) {
        statusElement.value =
            bus.status || "Active";
    }


    /* =====================================================
       CHANGE MODAL TITLE
    ===================================================== */

    const modalTitle =
        document.querySelector(
            "#busModal .modal-title"
        );


    if (modalTitle) {

        modalTitle.innerHTML = `
            <i class="bi bi-pencil-square"></i>
            Edit Bus
            <small class="text-muted"></small>
        `;

    }


    /* =====================================================
       OPEN MODAL
    ===================================================== */

    const modalElement =
        document.getElementById("busModal");


    if (modalElement) {

        const modal =
            bootstrap.Modal.getOrCreateInstance(
                modalElement
            );

        modal.show();

    }

}