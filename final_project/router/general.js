const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

// Base URL for axios requests
const BASE_URL = 'http://localhost:5000';


public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (users.find(user => user.username === username)) {
    return res.status(409).json({ message: "Username already exists" });
  }

  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  
  if (book) {
    return res.status(200).json(book);
  } else {
    return res.status(404).json({message: "Book not found"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const booksByAuthor = [];
  
  for (let isbn in books) {
    if (books[isbn].author.toLowerCase() === author.toLowerCase()) {
      booksByAuthor.push({ isbn, ...books[isbn] });
    }
  }
  
  if (booksByAuthor.length > 0) {
    return res.status(200).json(booksByAuthor);
  } else {
    return res.status(404).json({message: "No books found by this author"});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  const booksByTitle = [];
  
  for (let isbn in books) {
    if (books[isbn].title.toLowerCase().includes(title.toLowerCase())) {
      booksByTitle.push({ isbn, ...books[isbn] });
    }
  }
  
  if (booksByTitle.length > 0) {
    return res.status(200).json(booksByTitle);
  } else {
    return res.status(404).json({message: "No books found with this title"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  
  if (book) {
    return res.status(200).json(book.reviews);
  } else {
    return res.status(404).json({message: "Book not found"});
  }
});

// Task 10: Get all books using async-await with Axios
// Simulating async operation with Promise
function getAllBooks() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books);
    }, 100);
  });
}

public_users.get('/async', async function (req, res) {
  try {
    const bookList = await getAllBooks();
    return res.status(200).json(bookList);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books", error: error.message });
  }
});

// Task 11: Get book details based on ISBN using async-await with Axios
// Simulating async operation with Promise
function getBookByISBN(isbn) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const book = books[isbn];
      if (book) {
        resolve(book);
      } else {
        reject({ status: 404, message: "Book not found" });
      }
    }, 100);
  });
}

public_users.get('/async/isbn/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;
    const book = await getBookByISBN(isbn);
    return res.status(200).json(book);
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Error fetching book details", error: error.message });
  }
});

// Task 12: Get book details based on Author using async-await with Axios
// Simulating async operation with Promise
function getBooksByAuthor(author) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const booksByAuthor = [];
      for (let isbn in books) {
        if (books[isbn].author.toLowerCase() === author.toLowerCase()) {
          booksByAuthor.push({ isbn, ...books[isbn] });
        }
      }
      if (booksByAuthor.length > 0) {
        resolve(booksByAuthor);
      } else {
        reject({ status: 404, message: "No books found by this author" });
      }
    }, 100);
  });
}

public_users.get('/async/author/:author', async function (req, res) {
  try {
    const author = req.params.author;
    const booksByAuthor = await getBooksByAuthor(author);
    return res.status(200).json(booksByAuthor);
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Error fetching books by author", error: error.message });
  }
});

// Task 13: Get book details based on Title using async-await with Axios
// Simulating async operation with Promise
function getBooksByTitle(title) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const booksByTitle = [];
      for (let isbn in books) {
        if (books[isbn].title.toLowerCase().includes(title.toLowerCase())) {
          booksByTitle.push({ isbn, ...books[isbn] });
        }
      }
      if (booksByTitle.length > 0) {
        resolve(booksByTitle);
      } else {
        reject({ status: 404, message: "No books found with this title" });
      }
    }, 100);
  });
}

public_users.get('/async/title/:title', async function (req, res) {
  try {
    const title = req.params.title;
    const booksByTitle = await getBooksByTitle(title);
    return res.status(200).json(booksByTitle);
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Error fetching books by title", error: error.message });
  }
});

// Alternative implementations using Promise callbacks (.then() and .catch())

// Task 10 (Promise): Get all books using Promise callbacks
public_users.get('/promise', function (req, res) {
  getAllBooks()
    .then(bookList => {
      return res.status(200).json(bookList);
    })
    .catch(error => {
      return res.status(500).json({ message: "Error fetching books", error: error.message });
    });
});

// Task 11 (Promise): Get book details based on ISBN using Promise callbacks
public_users.get('/promise/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  getBookByISBN(isbn)
    .then(book => {
      return res.status(200).json(book);
    })
    .catch(error => {
      if (error.status === 404) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: "Error fetching book details", error: error.message });
    });
});

// Task 12 (Promise): Get book details based on Author using Promise callbacks
public_users.get('/promise/author/:author', function (req, res) {
  const author = req.params.author;
  getBooksByAuthor(author)
    .then(booksByAuthor => {
      return res.status(200).json(booksByAuthor);
    })
    .catch(error => {
      if (error.status === 404) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: "Error fetching books by author", error: error.message });
    });
});

// Task 13 (Promise): Get book details based on Title using Promise callbacks
public_users.get('/promise/title/:title', function (req, res) {
  const title = req.params.title;
  getBooksByTitle(title)
    .then(booksByTitle => {
      return res.status(200).json(booksByTitle);
    })
    .catch(error => {
      if (error.status === 404) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: "Error fetching books by title", error: error.message });
    });
});

module.exports.general = public_users;
