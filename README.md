# Task List React App

### Overview

This is a Task List management application built using **React** and **Vite**. It provides a user-friendly interface to interact with a Java Spring Boot API, allowing users to create, view, update, and delete tasks of different types. The task types include **Standard Tasks**, **Timed Tasks**, and **Due Date Tasks**.

The styling of the application follows a vibrant orange-themed scheme inspired by Reddit's design.

### Features

- Create, update, view, and delete different types of tasks.
- User interface separated into tabs for **Standard Tasks**, **Timed Tasks**, and **Due Date Tasks**.
- **Timed Tasks** include a countdown timer and start/stop functionality.
- **Due Date Tasks** allow the user to specify a due date for the task.
- **Responsive UI** built using Tailwind CSS and Material UI for additional components.

### Requirements

- Node.js 20 or higher
- Yarn or npm for dependency management

### Setup and Running the Application

1. **Clone the repository**:
   ```bash
   git clone https://github.com/luccacastro/react-spring-todo-list
   cd tasklist-react-app
   ```

2. **Install dependencies** using Yarn or npm:
   ```bash
   # Using Yarn
   yarn install

   # Using npm
   npm install
   ```

3. **Create a `.env` file** in the root directory with the following content:
   ```env
   VITE_API_URL=http://localhost:8080/api/tasks
   ```

4. **Run the development server**:
   ```bash
   # Using Yarn
   yarn dev

   # Using npm
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:5173` to access the app.

### Components Overview

#### 1. **TaskForm**
   - Allows users to create new tasks. The user can select the type of task from a dropdown (`Standard Task`, `Due Date Task`, `Timed Task`) and provide the necessary fields.

#### 2. **TaskList**
   - Displays the list of tasks. The tasks are organized into three categories: `Standard Tasks`, `Due Date Tasks`, and `Timed Tasks`.

#### 3. **TaskItem**
   - Represents a single task item. Displays task information such as `title`, `description`, and additional details for timed and due date tasks.
   - Includes buttons to complete, delete, or update tasks.
   - **Timed Tasks** have a countdown timer, start/stop functionality, and **Due Date Tasks** show the due date.

#### 4. **TaskUpdateModal**
   - A modal component that allows the user to update the `title` and `description` of a task.
   - Uses Material UI for smooth, accessible modals.

### Environment Variables

- The `API URL` for backend interaction is set in the `.env` file using `VITE_API_URL`.
- Ensure the backend Java API is running before using this React application.

### Scripts

- **`yarn dev`** / **`npm run dev`**: Starts the development server.
- **`yarn build`** / **`npm run build`**: Builds the app for production.
- **`yarn preview`** / **`npm run preview`**: Previews the production build.

### Technologies Used

- **React**: Main JavaScript library for UI development.
- **Vite**: Fast development server.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Material UI**: Component library for additional UI elements.
- **Axios**: HTTP client for interacting with the backend API.
- **React Context API**: For state management.

### Future Improvements

- **Authentication**: Implement user authentication for secured access.
- **Tests**: Add unit and integration tests for the components.
- **Offline Capabilities**: Use local storage to provide offline functionality.


