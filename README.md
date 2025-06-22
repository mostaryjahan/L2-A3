
# Library Management System API

A RESTful API for managing a library system built with **Express**, **TypeScript**, and **MongoDB** using **Mongoose**. This project includes features like book management, borrowing system with availability control, aggregation summaries, and validation.

<!-- --- -->

## Features

- **Book Management**
  - Create, read, update, and delete books
  - Validation on book fields (title, author, genre, ISBN, copies, availability)
  - Filtering and sorting support for book listings

- **Borrowing System**
  - Borrow books with quantity and due date validations
  - Business logic enforcing available copies before borrowing
  - Automatic update of book availability on borrow
  - Aggregation summary of total borrowed quantity per book

- **Error Handling**
  - Consistent API error responses with descriptive messages
  - Validation error handling with detailed feedback

- **Code Quality**
  - MVC architecture separating routes, controllers, models, and interfaces
  - TypeScript strict typing and interface definitions
  - Use of Mongoose static methods and middleware for business logic

---

## API Endpoints

### Books

| Method | Endpoint           | Description                |
| ------ | ------------------ | --------------------------|
| POST   | `/api/books`       | Create a new book          |
| GET    | `/api/books`       | Get all books (filter/sort)|
| GET    | `/api/books/:id`   | Get book by ID             |
| PUT    | `/api/books/:id`   | Update book details        |
| DELETE | `/api/books/:id`   | Delete a book              |

### Borrow

| Method | Endpoint           | Description                |
| ------ | ------------------ | --------------------------|
| POST   | `/api/borrow`      | Borrow a book              |
| GET    | `/api/borrow`      | Get borrowed books summary |

---

## Setup and Installation

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (Atlas or local)
- npm or yarn

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/mostaryjahan/L2-A3.git
   cd L2-A3
   ````

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ````

3. Create a `.env` file in the root with the following variables:

   ```env
   PORT=5000
   MONGO_URL=your_mongodb_connection_string
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. The API will be available at `http://localhost:5000`

---

## Sample Request (Create Book)

```json
POST /api/books
Content-Type: application/json

{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

---

## Technologies Used

* **Node.js** with **Express** — Server and routing
* **TypeScript** — Type safety and modern JavaScript features
* **MongoDB** with **Mongoose** — Database and ORM


<!-- --- -->

<!-- ## Project Structure

```
├── src
│   ├── app
│   │   ├── controllers
│   │   ├── interfaces
│   │   ├── models
│   ├── config.ts
│   ├── app.ts
│   └── server.ts
├── .env
├── package.json
└── tsconfig.json


```

--- -->

## Error Handling

API responds with consistent error format on failures:

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Copies must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```

---

## Contact

For any questions, feel free to reach out:

* Name: Mostary Jahan
* Email: [mostaryjahan01@email.com](mailto:mostaryjahan01@email.com)
* GitHub: [Mostary Jahan](https://github.com/mostaryjahan)

---



This project is for educational purposes only.


