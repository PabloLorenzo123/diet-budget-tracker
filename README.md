# Dietbudget

DietBudget is an app that helps users plan their diet, track nutritional goals, and manage food expenses while staying within their budget.
 It allows users to create and manage personalized food products,
set daily calorie and nutrient targets, and create diet plans for efficient meal planning.

## Features

- **User Accounts**: Sign up or sign in to access personalized diet plans.
- **Food Product Management**: Add, edit, delete, and search for food products.
- **Nutritional Tracking**: Automatically retrieve nutritional information from the USDA Food API or manually input data.
- **Meal Planning**: Create and customize meals for each day of your diet plan.
- **Budget Tracking**: Set and track food budgets, view the cost of each meal, and manage leftover groceries.
- **Responsive Design**: Fully responsive, works on both desktop and mobile devices.

## Technologies Used

- **Backend**: Django (Rest Framework)
- **Frontend**: React
- **Database**: SQLite
- **API**: USDA Food API

## Distinctiveness and Complexity
This app stands out from other meal tracking applications by incorporating both nutritional tracking and budget management.
Unlike typical diet planners that simply focus on adding foods based on their nutrient content, this app considers the user's financial constraints,
allowing them to create diet plans that are not only nutritionally balanced but also affordable. Users can track their food expenses,
compare different diet plans, and make informed decisions based on cost-effectiveness, ensuring they get the most value for their money.

The app’s architecture is complex, particularly on the frontend. Built with React, it contains over 30 components and a substantial amount of code, all working together to provide a seamless user experience.
The frontend is designed to handle multiple API requests, manage different states, and offer an intuitive user interface where users can create and customize their diet plans.
Achieving this required extensive use of React hooks, states, and custom CSS files to meet the complex demands of the UI.

On the backend, while the development process was slightly more straightforward, it still posed significant challenges. One of the main hurdles was integrating the USDA Food API.
This required cleaning and formatting large datasets to ensure the information provided was accurate and usable within the app.
Additionally, the diet plan saving function was a sophisticated process, involving the creation and management of five different models.
These models interact closely to allow users to save, modify, and retrieve their diet plans.
The process of sending data from the backend to the frontend involved extensive data formatting and cleaning to ensure smooth communication between the two.
The most complex aspect of this project, however, was bringing this unique concept to life.
Given that budget-conscious meal planning is not commonly seen in existing apps, the design and functionality needed to be carefully considered and planned.
The app had to provide not only nutritional information but also allow for easy tracking of food expenses, all while maintaining an intuitive user experience.
The relationship and interaction between various components had to be thoroughly analyzed to ensure they complemented each other and created a cohesive experience for the user.

## Files Explanation

### /backend
This directory contains the backend of the application, built with Django. The **/project** folder includes general settings for the project, as well as utility functions and constants that are used across various parts of the application.

#### /accounts
The **/accounts** app manages the user model and handles authentication and authorization processes. It is responsible for features like setting daily nutritional targets, managing user preferences, and retrieving user-specific default settings to display on the frontend.

#### /diet
The **/diet** app manages the core functionality of the application, including models for `FoodProduct`, `DietPlan`, `NutritionData`, and other essential data structures. It is responsible for key operations such as searching for food items in the USDA Food API, creating diet plans, and tracking food and nutrient data. The views in this app handle user interactions related to food selection and diet plan creation.

### /frontend

#### /src
The **/src** folder contains the main source code for the frontend, where the app is built using React. The entry point for the frontend is **App.jsx**, and the application’s styles are located in the **/styles** folder, which holds the CSS files.

#### /src/components
The **/components** folder contains all the React components for the frontend. Related components are grouped into subfolders based on their functionality. For example, all components related to the "diary" feature are found in the **/components/diary/** folder. Components that are used across different sections of the app, such as **Modal.jsx** and **NavBar.jsx**, are placed in the root of the **/components** folder as they are shared across multiple pages and contexts.

#### /src/pages
The **/src/pages** folder contains the React components that are rendered when visiting specific routes in the app. These components correspond to the different pages users interact with. The routes for these pages are defined in **src/App.jsx**, inside a **<BrowserRouter />** component that maps URLs to the appropriate page components.

#### /src/api.js
The **api.js** file in **/src** defines an Axios instance, which is used to make API calls throughout the project. This instance is configured to automatically include the JWT token in the authorization header for secure communication with the backend.

#### /src/constants.js
The **constants.js** file in **/src** defines various constants that are used throughout the frontend. These constants help maintain consistency across the application and make it easier to update values that are referenced in multiple places.

#### /src/lib
The **/src/lib** folder contains utility functions and variables that are used throughout the project. These helper functions are designed to streamline common tasks and make the codebase more modular and maintainable.

## Screenshots

### Index Page
On this page users can create and customize their diet plans.
![Index Page](assets/sc1.png)

### Add Food to Diary Modal.
On this modal there are two tabs.
1. **All**: The user's food products are displayed, these can be added to the diary, edited or deleted.
2. **Create**: Here the user can create a food product and save it to their food products private list.
![Add Food to Diary Modal](assets/sc2.png)

### Nutritional Targets displayed at the bottom of the Index Page.
![Nutritional Targets displayed at the bottom of the Index Page.](assets/sc3.png)

### Groceries list.
The groceries list shows the food products we need to buy and the quantities required, along with the total cost.
This total cost includes leftovers, so it differs from the diet plan’s total cost, which only accounts for the cost of what’s actually consumed.
![Groceries List](assets/sc4.png)

### Diet Plan Summary.
A summary of the entire diet plan. Detailing each day and its corresponding meals.
![Diet Plan Summary](assets/sc5.png)


## Installation

### Prerequisites

Before running the app, make sure you have the following:

- Python (for the backend)
- Node.js and npm (for the frontend)
- An API key from the [USDA Food API](https://www.ers.usda.gov/developer/data-apis/#apiForm)

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/PabloLorenzo123/DietBudget.git
    ```

2. Navigate to the project directory:
    ```bash
    cd DietBudget/backend
    ```

3. Create a virtual environment:
    ```bash
    python -m venv venv
    ```

4. Activate the virtual environment:
    - On Windows:
      ```bash
      .\venv\Scripts\activate
      ```
    - On macOS/Linux:
      ```bash
      source venv/bin/activate
      ```

5. Install Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```

6. Create a `.env` file in the `/backend` directory and add your USDA API key:
    ```env
    USDA_API_KEY=your_api_key_here
    ```

7. Run migrations to set up the database:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

8. Run the Django development server:
    ```bash
    python manage.py runserver
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install npm dependencies:
    ```bash
    npm install
    ```

3. Run the React development server:
    ```bash
    npm start
    ```

## Usage

1. Open the app in your browser at `http://localhost:3000`.
2. Sign up or sign in to create and manage your diet plans.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Created by [Pablo Lorenzo](https://github.com/PabloLorenzo123).
