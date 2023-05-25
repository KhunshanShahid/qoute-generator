# qoute-generator

This project allows users to generate random quotes and perform various actions such as adding, deleting, and searching quotes. It also includes user signup and login functionalities with validation using local storage. The state management and user login information are handled using Redux. The styling is implemented using CSS modules.

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
https://github.com/KhunshanShahid/qoute-generator.git


2. Install dependencies:
npm install


3. Start the development server:
npm start


## Functionalities

- Random Quote Generation: Users can generate random quotes by specifying the number of quotes they want. If data is available in the local storage, it will be retrieved from there; otherwise, an API call will be made, and the data will be saved to the local storage.

- User Signup and Validation: Users can sign up and their credentials will be validated using the validator. The user information is stored in the local storage.

- User Login and State Management: Users can log in, and the login state and user information are managed using Redux. This allows for persistent login sessions and easy access to user-specific data.

- Quote Management: Once logged in, users can add and delete quotes on their page. They can also search for specific quotes using the provided search functionality.

- State Persistence: Even after a page refresh, the application state remains intact, ensuring a seamless user experience.




