# 🌐 Covid-19 Tracker

[![Check out the project here!](https://img.shields.io/badge/Project-Here-brightgreen)](https://covid-19-tracker-0.web.app/)

React application for tracking COVID-19 cases globally. Utilizing Material UI, React hooks, and components. Deployed with Firebase.

## Objectives:

- Practice applying React framework, React hooks, and component-based design.
- Familiarize with React Materialize, deploying react application on firebase.

## Challenges:

- Correctly fetch and manipulate data from the API.
- Duplication and complexity of codes.
- Organize components.
- Employ visual and interactive components for a better user experience.

## Actions:

- Applied `useState()` to define data types for variables, `useEffect()` to fetch data from API, and execute codes on set conditions.
- While fetching data, user input was passed to a parameter later incorporated into the URL to request desired data from the API (disease.sh).
- Deconstructed data for necessary values only and using ES6 syntax, which simplified the codes.
- Separated each significant component into different JavaScript and CSS files for easy navigation, focused tasks, loose dependency, and targeted debugging.
- Using string interpolation in class name for detailed styling.

## Products/React components:

- 3 info-boxes automatically update infected cases, recovered cases, and deaths of the chosen country (default worldwide statistic) every day and the total number of cases.
- A map visualizes the number of case types (infected, recovered, deaths) globally or by country.
  Case types can be selected by clickable info-boxes on top of it.
- A table for live cases recorded by countries.
- A graph 📈 to demonstrate worldwide changes in different case types, also interactive with a pop-up of specific statistics on hover.
  It is updated upon user choice of case types via info-boxes.
