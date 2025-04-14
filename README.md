# JNCT Developer Community Website

Welcome to the **JNCT Developer Community Website**, an open-source platform uniting coders, innovators, and tech enthusiasts in a vibrant, student-led ecosystem. Powered by a cyberpunk-inspired design, this site fosters collaboration through mentorship, events, and hands-on projects. Whether you're a junior coder or a seasoned senior, join us to light the path and conquer the sky! 🌌

## Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Code of Conduct](#code-of-conduct)
- [License](#license)
- [Contact](#contact)

## About the Project

The JNCT Developer Community Website is a dynamic hub for tech enthusiasts to connect, learn, and grow. Built for the JNCT Developer Community, it showcases events, mentors, testimonials, and more, with a mission to bridge juniors and seniors through free mentorship and real-world projects. From hackathons to tech seminars, this platform inspires developers to push boundaries in fields like AI, Cybersecurity, and IoT.

This repository contains the frontend codebase for the community website, designed to be visually engaging and developer-friendly. We welcome contributions to enhance features, improve accessibility, or add new sections!

## Features

- **Home Section**: A captivating hero with a parallax background and call-to-action to join the community.
- **Tech Frontiers**: Highlights expertise in Machine Learning, AI, Cybersecurity, Web/App Development, and IoT.
- **Events**: Showcases upcoming workshops, hackathons, coding sprints, and seminars (with placeholder dates).
- **Mentors**: Profiles senior mentors with social links (currently placeholder data).
- **About Us**: Details the community’s mission and benefits of joining.
- **Testimonials**: Shares feedback from members (static content, ready for dynamic integration).
- **How to Join**: Outlines participation via Coding Quest and Hackathon events.
- **Gallery**: Displays event photos with hover effects.
- **Contact Form**: Powered by Web3Forms API for user inquiries.
- **FAQs**: Accordion-style answers to common questions.
- **Responsive Design**: Mobile-friendly with a slick hamburger menu and sticky sidebar.
- **External Pages**:
  - `halloffame.html`: Celebrates top performers (linked from navigation).
  - `news.html`: Shares community updates (linked from navigation).
- **UI/UX**:
  - Cyberpunk aesthetic with neon gradients (#D81B60 to #00B0FF).
  - AOS animations for smooth transitions.
  - Feather icons and Orbitron/Montserrat fonts for a futuristic vibe.

## Tech Stack

- **Frontend**: HTML, JavaScript (vanilla), Tailwind CSS (CDN),css
- **Animations**: AOS (Animate on Scroll)
- **Icons**: Feather Icons
- **Fonts**: Google Fonts (Orbitron, Montserrat)
- **Form Handling**: Web3Forms API (contact form)
- **Storage**: client-side only; extendable with localStorage or backend
- **Deployment**: Static hosting 

## Getting Started

Set up the project locally to explore or contribute!

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, etc.)
- A code editor (e.g., VS Code)
- (Optional) Node.js and npm for local server testing (e.g., `live-server`)

#### Integration with Provided Code
- **Content**: Reflects `index.html` sections (e.g., Tech with ML/AI cards, Events with hackathons, Mentors with placeholder profiles).
- **Navigation**: Includes links, consistent with prior requests.
- **Design**: Mentions cyberpunk aesthetic (#D81B60 to #00B0FF gradients, AOS animations) from Tailwind classes and inline styles.
- **Functionality**: Notes Web3Forms contact form, FAQ accordions, and mobile menu JavaScript.
- **Assets**: Warns about missing images (e.g., `images/ml-model.png`) and empty `styles.css`/`scripts.js`, suggesting users add them.
  
### How to Use
1. Create a GitHub repository (e.g., `jnct-dev-community`).
2. Save the above as `README.md` in the repo root.
3. Add project files:
   - `index.html` (provided code).
   - `halloffame.html` and `news.html` (from prior requests or create placeholders).
   - `images/` with assets (e.g., `bg.jpg`, `ml-model.png`, etc.).
   - Empty `styles.css` and `scripts.js` (or remove references in `index.html` if unused).
4. (Optional) Add a screenshot to `assets/images/screenshot.png`.
5. Push to GitHub:
   ```bash
   git add .
   git commit -m "Add JNCT Dev Community with README"
   git push origin main
