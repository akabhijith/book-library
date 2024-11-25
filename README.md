# Book Library Application

## Overview
This is a simple Node.js and Express.js application for managing a personal book library. Users can:
- Add books with details such as title, author, ISBN, rating, and review.
- View a list of books with sorting options (by title, rating, or recency).
- Edit book details or delete books.
- View individual book details.
- Fetch book cover images dynamically using the Open Library Covers API.

## Features
1. **CRUD Operations**: Add, view, edit, and delete books.
2. **API Integration**: Book cover images fetched dynamically using ISBN from the Open Library Covers API.
3. **Sorting**: Sort books by title, rating, or recency.
4. **Flash Messages**: User feedback for actions (e.g., book added, error messages).
5. **Responsive UI**: Simple user interface designed using EJS templates.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Templating Engine**: EJS
- **HTTP Client**: Axios
- **API**: Open Library Covers API
- **Other Tools**: connect-flash for flash messages

## Setup Instructions
### Prerequisites
- Node.js installed (v16 or above recommended).
- PostgreSQL installed.
- A code editor like VSCode.

### Steps
1. Clone this repository:
   ```bash
   git clone <repository_url>
   cd book-library
