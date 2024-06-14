# Space Route Planning System Documentation

This document serves as a comprehensive guide for the Space Route Planning System developed to assist astronauts in planning trips throughout the solar system. The system is designed to be intuitive and functional, incorporating a realistic simulation of fuel consumption and identifying optimal refueling points. To know more, here's the [.pdf of the challenge.](https://drive.google.com/file/d/1NSnDXLw4NW0_uldhpIxLI6_v7PsU_ulq/view?usp=sharing)

## Preview

![](./public/latitudesh-spaceship.gif)

## Link

[Click to open the project](https://latitudesh-spaceship.vercel.app)

## Functional Requirements

The system was developed with the following functional requirements in mind:

### User's Current Location

- Determine and display the user's current location in the solar system.
- Display the user's current planet on the system interface.

### Travel Simulation and Fuel Calculation

- Simulate the trip when a destination is selected.
- Calculate the required fuel based on the distance to the destination and the spacecraft's fuel consumption ratio.

### Travel and User Position Update

- Allow the trip if there is sufficient fuel.
- Update the user's position to the selected destination.
- Update the remaining fuel amount.

### Refueling

- Recommend the nearest planet with a refueling station if the fuel is insufficient.
- Refueling stations are located on Mercury, Earth, Saturn, and Uranus.

## Non-Functional Requirements

### Distances Between Planets

- Precise distances between planets have been defined and are used to calculate the necessary fuel.

### Fuel Tank Capacity and Consumption

- The spacecraft's fuel tank capacity is 90,000 liters.
- The spacecraft's fuel consumption ratio is 0.0001 liters per kilometer.

## Additional Features

### Interactive Map of Planets

- Display all planets with icons indicating refueling stations.
- Dynamically position a spacecraft icon on the map as the user travels.

### Travel History

- Store all trips during the browser session.
- Detailed information about each trip, including date, time, origin, destination, fuel before and after the trip.

### User Interface and Interaction

- Toasts for successful or failed travel feedback.
- Interactive alerts for refueling when you are on a planet with a station or when you are isolated.

## Internationalization

- Support for English and Portuguese, making it easy for a global audience to use.

## Technologies Used

- **Next.js (App Router)**
- **TypeScript**
- **TailwindCSS**
- **Shadcn**
- **Next intl**
- **react-share**
- **jotai**
- **lucide-react**
- **framer-motion**
- **dayjs**
- **Vercel**
- **Cypress**

## How to Run the Project

1. Clone this repository:

```bash
git clone https://github.com/mateussp97/latitudesh-spaceship.git
```

2. Navigate to the project directory:

```bash
cd latitudesh-spaceship
```

3. Navigate to the project directory:

```bash
pnpm install
```

4. Start the development:

```bash
pnpm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

6. (Optional) Running Cypress Tests:

```bash
npx cypress run
```

## Conclusion

This system represents an effort to combine technical accuracy with usability, ensuring that astronauts and space enthusiasts can efficiently and informatively plan their trips through the solar system. The integration of various modern technologies and design practices provides an exceptional user experience that is accessible globally.
