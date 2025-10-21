# Visual Code Location Guide for Tasks 10-13

## Where to Find Each Task in general.js

### 🎯 TASK 10: Get All Books
**Lines: ~95-110**
```javascript
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
```

---

### 🎯 TASK 11: Get Book by ISBN
**Lines: ~113-140**
```javascript
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
```

---

### 🎯 TASK 12: Get Books by Author
**Lines: ~143-175**
```javascript
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
```

---

### 🎯 TASK 13: Get Books by Title
**Lines: ~178-210**
```javascript
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
```

---

## 📸 Screenshot Checklist

- [ ] **task10.png** - Capture `getAllBooks()` function and `/async` route
- [ ] **task11.png** - Capture `getBookByISBN()` function and `/async/isbn/:isbn` route  
- [ ] **task12.png** - Capture `getBooksByAuthor()` function and `/async/author/:author` route
- [ ] **task13.png** - Capture `getBooksByTitle()` function and `/async/title/:title` route

**Tip**: Make sure your VS Code theme and font size make the code clearly readable in screenshots!

---

## 🚀 Test URLs

After starting the server (`npm start`), you can test these URLs in your browser:

1. **Task 10**: http://localhost:5000/async
2. **Task 11**: http://localhost:5000/async/isbn/1
3. **Task 12**: http://localhost:5000/async/author/Jane%20Austen
4. **Task 13**: http://localhost:5000/async/title/Pride

All endpoints should return JSON data! ✨
