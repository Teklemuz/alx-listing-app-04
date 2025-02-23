# ALX Listing App 04

A Next.js application integrating RESTful APIs for dynamic property listings, details, bookings, and reviews.

## Overview

This project, `alx-listing-app-04`, enhances a property listing application by replacing hardcoded data with dynamic API-fetched data. It includes:

- **Property Listing Page**: Displays a list of properties fetched from an API.
- **Property Detail Page**: Fetches and displays detailed property information based on a dynamic route ID (Milestone 2 focus).
- **Booking Page**: Submits booking details to an API.
- **Review Section**: Dynamically fetches property reviews.

The primary focus of this repository, as per Milestone 2, is the API integration for the Property Detail Page (`pages/property/[id].tsx`), with additional files demonstrating the full app structure.

## Features

- **API Integration**: Uses `axios` to fetch data from endpoints like `/api/properties/:id`.
- **Dynamic Routing**: Leverages Next.js dynamic routes for property details (`[id].tsx`).
- **State Management**: Handles loading, error, and success states for API calls.
- **Component-Based**: Modular components for property details, bookings, and reviews.

## Setup Instructions

1. **Clone the Repository**:
   git clone https://github.com/Teklemuz/alx-listing-app-04.git
   cd alx-listing-app-04
