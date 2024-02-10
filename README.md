# Shadow of the Giants - A Fighting Fantasy Adventure

## Project Overview
This project is a web-based interactive fiction game where players make choices that affect the outcome of the story. Built with React and Vite, it features dynamic combat mechanics and story progression based on user decisions.

## Data Source and Schema
Data Source [here](https://docs.google.com/spreadsheets/d/1lInch-mQeW68Eh5g7XIvDrs0u0GdXCFrG-A9McTsquU/edit?usp=sharing)
Schema Files [here](https://dbdiagram.io/d/Capstone-2-Project-Fighting-Fantasy-65a0a129ac844320aec1ad21)

## Setup and Installation
To set up the project locally:
- Clone the repository
- Install dependencies with `npm install`
- Start the development server with `npm run dev`

## Testing
This project uses Vitest for testing. To run tests, use `npm run test`. When testing components that use `GameContext` or `AuthContext`, ensure to mock these contexts appropriately as shown in the test files.

## Common Issues and Troubleshooting
- If encountering `TypeError: vi.importMock(...).useGame is not a function`, ensure you are using `vi.mock` correctly to mock modules and functions. Refer to the test files for examples of correct mocking.

## Contributing
Contributions are welcome! Please open an issue or pull request if you have suggestions or improvements.

## Acknowledgments

This project makes use of several key resources, libraries, and inspirations that have significantly contributed to its development:

- **RPGUI**: A fantastic library for creating a quick and easy RPG-like UI in web applications. We've used RPGUI extensively for the styling of our project. Check it out [here](https://ronenness.github.io/RPGUI/).

- **React**: For building the user interface. [Learn more](https://reactjs.org/).

- **Vite**: Used for building and serving our React application with efficient bundling and hot module replacement. [Learn more](https://vitejs.dev/).

- **Shadow of the Giants by Ian Livingstone**: This project is a digital version of the Fighting Fantasy series, "Shadow of the Giants" by Ian Livingstone. The interactive and choice-driven narrative of our game pays homage to the innovative storytelling found in these books. Discover more about Fighting Fantasy [here](https://www.fightingfantasy.com/).

Special thanks to the developers and contributors of these tools for making them available to the open-source community and for inspiring creators everywhere.

## React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
Currently, two official plugins are available:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
