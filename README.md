# 🐾 Find My Pet

> A full-stack pet finding platform designed to reunite lost pets with their families and help adoptable pets find loving homes.

---

## 🚀 Project Overview

**Find My Pet** is a community-driven web application that enables users to:

- 🐶 Post lost pets
- 🐱 Report found pets
- 🏡 Browse pets available for adoption
- 📍 Search listings by geographic area

The platform is designed to make local pet discovery fast, organized, and accessible — because every pet deserves a safe home.

---

## 🧱 Tech Stack

### 🖥 Frontend

Built with:

- ⚡ **Next.js** – Server-side rendering and optimized routing
- 🧩 **TypeScript** – Type-safe components and scalable architecture
- 🌐 **Context API** – Global state management
- 🎨 **TailwindCSS** – Utility-first styling for responsive and modern UI

Frontend Features:
- Area-based filtering system
- Dynamic routing for pet profiles
- Responsive mobile-first design
- Real-time UI updates with GraphQL queries

---

### 🔌 Backend

Powered by:

- 🍃 **MongoDB** – Flexible NoSQL database for pet listings and user data
- 🔎 **GraphQL** – Efficient and structured API layer for querying and mutating pet data
- 🐕 **Petfinder API** – External integration to fetch adoptable pets in real-time

Backend Responsibilities:
- CRUD operations for lost/found pet posts
- Area-based search queries
- User authentication and post management
- External API aggregation for adoptable pets

---

## 🐾 Core Features

### 🔍 Lost Pet Search
Users can:
- Post detailed information about lost pets
- Upload images
- Specify last known location
- Filter results by area

### 🐕 Found Pet Listings
Community members can:
- Post pets they’ve found
- Provide location details
- Add photos and descriptions
- Help reunite pets with owners

### 🏡 Adoptable Pets
- Pulls live data from the Petfinder API
- Displays pets available for adoption by area
- Provides direct links to adoption organizations

### 📍 Location-Based Filtering
- Search by city, ZIP code, or region
- Organized listings to improve visibility and recovery speed
