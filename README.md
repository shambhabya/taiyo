# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# React COVID-19 Tracker and Contact Management

This is a React application built with Create React App, TypeScript, React Query, React Router, Tailwind CSS, Redux, and Redux Toolkit. It provides COVID-19 data visualization including a world map with country-specific data and a line graph showing historical data.

## Features

- View COVID-19 data for different countries on a world map.
- Explore historical COVID-19 data with a line graph.
- Manage contact information using Redux and Redux Toolkit:
  - Create new contacts.
  - Edit existing contacts.
  - Delete contacts.

## APIs Used

- **Map Data**: [Disease.sh](https://disease.sh/v3/covid-19/countries)

  - Used to fetch data for plotting the world map.

- **Historical Data**: [Disease.sh](https://disease.sh/v3/covid-19/historical/all?lastdays=all)
  - Used to fetch historical data for creating the line graph.
