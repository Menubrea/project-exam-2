# Holidaze - Project Exam

![alt](/src/assets/frontpage-image.png)

This project was built using [Vite](https://vitejs.dev/guide/), with React plugin.

## Summary

In this project I've been tasked with creating a booking site, similar to that of AirBnB. In an attempt to corner a niche market, all locations feature a `nature-oriented` theme and are isolated to venues located in Norway.

All locations and pictures are of course entirely fictional, as this isn't meant to be an actual public application with any transactions or actual bookings finding place.

## How to use

Since the API is accessed by dozens of other students to make their applications, I've decided to filter venue `objects` based on name to ensure the integrity of aesthetics, theme and features. Unfortunately this also means it's harder to demo all `user stories` without access to an account that is included within the filtering. Most interactions should be stored in state, so it's possible it maintains stability within the same session, but it can not be guranteed.  

You can [contact] me for access to a demo account, or change the string variable by cloning the repository and opening up `src/app.jsx`. This will allow you to include your own account in a local environmnet running `localhost`.

```jsx
// On line 14 you'll find:
const demoAccount = 'SuperMarker'; // Change this string value to the name of your account.
```

### Getting started
Clone repository from `main`.

#### Install dependencies with CLI command:

`npm install`

#### Run Vite dev server with:

`npm run dev`

#### Open dev server

`cmd / control O`

#### Create JSDocs with:

`npm run docs`

## Project scope

Copied directly from the project exam brief.

## Goal

To take the skills learned over the last two years and take on an extensive project where the finished product should reflect the candidate’s general development capabilities, in addition to visual and technical skills.

## Brief

A newly launched accommodation booking site called Holidaze has approached you to develop a brand new front end for their application. While they have a list of required features, the design and user experience have not been specified. Working with the official API documentation, plan, design, and build a modern front-end accommodation booking application.

There are two aspects to this brief: the customer-facing side of the website where users can book holidays at a venue, and the admin-facing side of the website where users can register and manage venues and bookings at those venues.

## User Stories

- A user may view a list of Venues
- A user may search for a specific Venue
- A user may view a specific Venue page by id
- A user may view a calendar with available dates for a Venue
- A user with a stud.noroff.no email may register as a customer
- A registered customer may create a booking at a Venue
- A registered customer may view their upcoming bookings
- A user with a stud.noroff.no email may register as a Venue manager
- A registered Venue manager may create a Venue
- A registered Venue manager may update a Venue they manage
- A registered Venue manager may delete a Venue they manage
- A registered Venue manager may view bookings for a Venue they manage
- A registered user may login
- A registered user may update their avatar
- A registered user may logout

## Technical Restrictions

The company CTO has set the following technical restrictions:

- Must use an approved JavaScript Framework
- Must use an approved CSS Framework
- Must be hosted on an approved Static Host
- Must use an approved Design Application
- Must use an approved Planning Application

## Approved Resources

This list covers libraries and services that have been vetted by the company and approved for use.

### JavaScript Frameworks

- React (>16)

### CSS Frameworks

- Bootstrap (>5)
- Tailwind (>3)
- MUI (>5) `Project is built with MUI/Joy`
- Styled Components
- CSS Modules

### Hosting Services

- GitHub Pages
- [Netlify](https://charming-tulumba-3edec4.netlify.app/)
