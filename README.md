# Employee Management Portal

## Project Overview

The Employee Management Portal is a frontend web application designed to manage employee records through a modern admin-style interface.
It allows users to add, edit, delete, search, filter, activate/deactivate, and print employee information efficiently.

This project was built as a frontend assignment with a focus on **clean UI/UX**, **component reusability**, and **real-world dashboard patterns**.

---

## Tech Stack Used

* **React** (with TypeScript)
* **Tailwind CSS** – UI styling and responsive design
* **Context API** – global state management
* **LocalStorage** – client-side data persistence
* **Vite** – development and build tooling

---

## Steps to Run the Project Locally

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd employee-management-portal
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**

   ```
   http://localhost:5173
   ```

---

## Features

* Login with basic mock authentication
* Employee dashboard with summary:

  * Total Employees
  * Active Employees
  * Inactive Employees
* Employee list with:

  * Profile image
  * Name, gender, DOB, state
  * Active / Inactive toggle
* Add & Edit employee using a reusable modal form
* Drag-and-drop image upload with preview
* Search employees by name
* Filter employees by:

  * Gender
  * Active / Inactive status
* Combined search and filters
* Action menu with:

  * Edit
  * Delete (with confirmation)
  * Print
* Print entire employee list with print-optimized layout
* Responsive and accessible UI

---

## Assumptions & Design Decisions

* Authentication is mocked on the frontend for demonstration purposes.
* All employee data is stored in **LocalStorage** to persist across reloads.
* A single reusable form is used for both **Add** and **Edit** operations.
* Employee status is managed directly from the table using a toggle switch.
* Print functionality uses native browser print with print-specific CSS.
* The UI follows enterprise admin dashboard patterns for clarity and usability.
