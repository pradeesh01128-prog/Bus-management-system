# Bus-management-system
 Bus Management System – A Java-based application for managing bus details, routes, drivers, timings, and stops. It helps organize and maintain bus transportation information efficiently.
# 🚌 Bus Management System

A simple and user-friendly **Bus Management System** developed using **HTML, CSS, JavaScript, and Bootstrap**.

This project is designed to help manage buses, drivers, routes, schedules, bookings, and payments through a centralized web-based dashboard.

## 📌 Project Overview

The **Bus Management System** provides an easy way to maintain and manage bus-related information.

It includes a dashboard where users can view important details such as:

* Total buses
* Total routes
* Total drivers
* Total schedules
* Total bookings
* Total payments
* Active buses
* Confirmed bookings
* Paid payments
* Total revenue

The application stores data using **Browser LocalStorage**, so no external database is required.

## ✨ Features

### 🏠 Dashboard

* Displays overall system statistics
* Shows total buses
* Shows total routes
* Shows total drivers
* Shows schedules
* Shows bookings and payments
* Displays active buses
* Displays confirmed bookings
* Calculates total revenue

### 🚌 Bus Management

* Add new buses
* Edit bus details
* View bus information
* Manage bus number
* Manage bus type
* Manage seating capacity
* Assign drivers
* Update bus status

### 👨‍✈️ Driver Management

* Add drivers
* Edit driver information
* Store driver name
* Store phone number
* Store license number
* Store experience
* Manage driver status
* Validate driver phone numbers

### 🎫 Booking Management

* Create bus bookings
* Manage passenger details
* Select bus and route
* Manage seat numbers
* Set travel date
* Manage fare
* Update booking status
* Store booking information

### 💰 Payment Management

* Track payment information
* Manage payment status
* Calculate paid payments
* Calculate total revenue

### 🛣️ Route & Schedule Management

* Manage bus routes
* Manage schedules
* Display route-related information
* Connect buses with routes and schedules

## 🛠️ Technologies Used

| Technology      | Purpose                           |
| --------------- | --------------------------------- |
| HTML5           | Web page structure                |
| CSS3            | Styling and layout                |
| JavaScript      | Functionality and data management |
| Bootstrap       | Responsive UI components          |
| Bootstrap Icons | Icons                             |
| LocalStorage    | Browser-based data storage        |

## 📂 Project Structure

```text
Bus-Management-System/
│
├── index.html
├── buses.html
├── drivers.html
├── bookings.html
├── app.js
│
├── css/
│   └── style.css
│
├── js/
│   ├── dashboard.js
│   ├── buses.js
│   ├── drivers.js
│   └── bookings.js
│
├── images/
│   └── bus.jpg
│
└── README.md
```

## 🏗️ System Architecture

```text
                 BUS MANAGEMENT SYSTEM
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
   Dashboard        Bus Management   Driver Management
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ▼
                 Booking Management
                         │
                         ▼
                Route & Schedule
                         │
                         ▼
                  Payment Tracking
                         │
                         ▼
                    LocalStorage
```

## 🚀 How to Run

### Method 1 — Using VS Code

1. Download or clone the repository.
2. Open the project folder in **Visual Studio Code**.
3. Open `index.html`.
4. Right-click the file.
5. Select **Open with Live Server**.

### Method 2 — Directly in Browser

Simply open:

```text
index.html
```

in a modern web browser.

> **Recommended:** Use VS Code with the **Live Server** extension for the best development experience.

## 💾 Data Storage

This project uses **Browser LocalStorage** instead of a traditional database.

The system stores information locally for:

```text
Buses
Drivers
Bookings
Routes
Schedules
Payments
```

This means the data remains available in the same browser until the browser's stored site data is cleared.

## 📊 Dashboard

The dashboard provides an overview of the complete bus management system.

Example statistics:

```text
Total Buses
Total Routes
Total Drivers
Total Schedules
Total Bookings
Total Payments
Active Buses
Confirmed Bookings
Paid Payments
Total Revenue
```

## 🔄 Application Workflow

```text
Start
  │
  ▼
Dashboard
  │
  ├──► Manage Buses
  │
  ├──► Manage Drivers
  │
  ├──► Manage Routes
  │
  ├──► Manage Schedules
  │
  ├──► Manage Bookings
  │
  └──► Manage Payments
          │
          ▼
      LocalStorage
```

## 🔐 Data Validation

The system includes client-side validation for important fields.

For example, driver phone numbers are validated to ensure they contain exactly **10 digits**.

```javascript
if (!/^[0-9]{10}$/.test(phone)) {
    alert("Phone number must contain exactly 10 digits.");
}
```

## 📱 Responsive Design

The interface uses **Bootstrap** and responsive CSS techniques to provide a clean layout across different screen sizes.

The application includes:

* Responsive cards
* Responsive tables
* Navigation sidebar
* Bootstrap components
* Mobile-friendly layouts

## 🎯 Objectives

The main objectives of this project are:

* To simplify bus management
* To maintain driver information
* To manage bus bookings
* To organize routes and schedules
* To track payments
* To provide a centralized dashboard
* To reduce manual record management

## 🔮 Future Enhancements

The project can be extended with:

* 🔐 Admin and user login
* 🗄️ MySQL database integration
* 🌐 Backend using Java/Spring Boot or Node.js
* 💳 Online payment integration
* 📍 GPS-based bus tracking
* 🔔 SMS and email notifications
* 🎫 Online ticket generation
* 📱 Mobile application
* 📊 Advanced reports and analytics
* 🧑‍💼 Role-based access control

## 🎓 Project Type

**Academic / College Project**

This project is suitable for demonstrating concepts in:

* Web Development
* Frontend Development
* JavaScript
* Bootstrap
* CRUD Operations
* LocalStorage
* User Interface Design

## 👨‍💻 Developer

**Pradeesh S**

BE Computer Science and Engineering

## 📄 License

This project is created for **educational and academic purposes**.

---

⭐ **If you find this project useful, please consider giving the repository a star!**

🚌 **Bus Management System — Making bus operations simple and organized.**
