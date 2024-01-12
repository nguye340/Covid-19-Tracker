# Covid-19-Tracker
[Check out Project](https://covid-19-tracker-0.web.app/)
React application for tracking covid-19 cases globally 
Ultilize Material UI, React hooks and components
Deploy with Firebase

Objectives:
- Practice applying React framework, React hooks and component-based design
- Familiarize with React Materialize, deploying react application on firebase

Challenges: 
- Correctly fetch and manipulate data from the API
- Duplication and complexity of codes
- Organize components
- Employ visual and interactive components for better user experience

Actions:
- Applied useState() to define data type for variables, useEffect() to fetch data from API and execute codes on set condition.
- While fetching data, user input was passed to a parameter later incorporated in URL to request desired data from the API (desease.sh)
- Deconstructured data for necessary values only and using ES6 syntax, which simplified the codes
- Seperated each significant component into different javaScript and CSS files for easy navigation, focused tasks, loose dependency and targeted debugging
- Using string interpolation in class name for detailed styling

Products/React components:
- 3 info-boxes automatically updates infected cases, recovered cases and deaths of chosen country (default worldwide statistic) everyday and total number of cases
- A map visuallizes the number of case types (infected, recovered, deaths) globally or by country.
  Case types can be selected by clickable info-boxes on top of it
- A table for live cases recorded by countries
- A graph to demonstrate worldwide changes in different case types, also interactive with pop-up of specific statistic on hover.
  It is updated upon user choice of case types via info-boxes
