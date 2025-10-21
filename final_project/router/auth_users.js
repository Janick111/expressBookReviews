const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  // Check if username exists in users array
  return users.some(user => user.username === username);
}

const authenticatedUser = (username, password) => {
  // Check if username and password match a user in users array
  return users.some(user => user.username === username && user.password === password);
}

const JWT_SECRET = 'your_jwt_secret_key'; // Use a strong secret key

// Only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (!isValid(username)) {
    return res.status(401).json({ message: "User does not exist" });
  }

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Create JWT token with username payload
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

  // Save token in session or return it in response
  req.session.authorization = { token, username };

  return res.status(200).json({ message: "Login successful", token });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review;
    const username = req.session.authorization?.username;

    if (!username) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    if (!review) {
        return res.status(400).json({ message: "Review text is required" });
    }

    let book = books[isbn];
    if (book) {
        if (!book.reviews) {
            book.reviews = {};
        }
        // Add or update the review by this user
        book.reviews[username] = review;
        return res.status(200).json({ message: "Review added/updated successfully", reviews: book.reviews });
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization?.username;

    if (!username) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    let book = books[isbn];
    if (book && book.reviews && book.reviews[username]) {
        delete book.reviews[username];
        return res.status(200).json({ message: "Review deleted successfully", reviews: book.reviews });
    } else if (book) {
        return res.status(404).json({ message: "Review not found for this user" });
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;