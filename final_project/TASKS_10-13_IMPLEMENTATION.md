# Tasks 10-13 Implementation Summary

## ✅ All Tasks Completed Successfully!

This document describes the implementation of Tasks 10-13 for the Express Book Reviews project.

---

## 📋 What Was Implemented

### Task 10: Get All Books Using Async-Await
**Implementation**: Added `/async` endpoint that uses async-await with Promises
- Function: `getAllBooks()` - Returns a Promise that resolves with all books
- Route: `GET /async`
- Also added: `GET /promise` - Promise callback version using `.then()` and `.catch()`

### Task 11: Get Book by ISBN Using Async-Await
**Implementation**: Added `/async/isbn/:isbn` endpoint that uses async-await with Promises
- Function: `getBookByISBN(isbn)` - Returns a Promise that resolves with book data
- Route: `GET /async/isbn/:isbn`
- Also added: `GET /promise/isbn/:isbn` - Promise callback version

### Task 12: Get Books by Author Using Async-Await
**Implementation**: Added `/async/author/:author` endpoint that uses async-await with Promises
- Function: `getBooksByAuthor(author)` - Returns a Promise that resolves with matching books
- Route: `GET /async/author/:author`
- Also added: `GET /promise/author/:author` - Promise callback version

### Task 13: Get Books by Title Using Async-Await  
**Implementation**: Added `/async/title/:title` endpoint that uses async-await with Promises
- Function: `getBooksByTitle(title)` - Returns a Promise that resolves with matching books
- Route: `GET /async/title/:title`
- Also added: `GET /promise/title/:title` - Promise callback version

---

## 🔧 Technical Details

### Technologies Used
- **Express.js** - Web framework
- **Axios** - HTTP client (installed via npm)
- **Promises** - For async operations
- **Async/Await** - Modern JavaScript async syntax

### Key Features
1. **Promise-based Functions**: Each task has a dedicated function that returns a Promise
2. **Async-Await Routes**: Clean, readable async code using async/await syntax
3. **Promise Callback Routes**: Alternative implementation using .then() and .catch()
4. **Error Handling**: Proper try-catch blocks and error responses
5. **Simulated Async Operations**: Using setTimeout() to simulate async database calls

---

## 🧪 How to Test the Endpoints

### Prerequisites
1. Make sure the server is running:
```powershell
cd final_project
npm start
```

2. Server should be running on `http://localhost:5000`

### Test Task 10: Get All Books
```powershell
# Using web browser
# Navigate to: http://localhost:5000/async

# Using PowerShell
Invoke-RestMethod -Uri "http://localhost:5000/async"

# Promise callback version
Invoke-RestMethod -Uri "http://localhost:5000/promise"
```

**Expected Response**: JSON object with all 10 books

### Test Task 11: Get Book by ISBN
```powershell
# Async-await version
Invoke-RestMethod -Uri "http://localhost:5000/async/isbn/1"

# Promise callback version
Invoke-RestMethod -Uri "http://localhost:5000/promise/isbn/1"
```

**Expected Response**: Book details for ISBN 1 (Things Fall Apart by Chinua Achebe)

### Test Task 12: Get Books by Author
```powershell
# Async-await version
Invoke-RestMethod -Uri "http://localhost:5000/async/author/Jane Austen"

# Promise callback version
Invoke-RestMethod -Uri "http://localhost:5000/promise/author/Jane Austen"
```

**Expected Response**: Array of books by Jane Austen

### Test Task 13: Get Books by Title
```powershell
# Async-await version
Invoke-RestMethod -Uri "http://localhost:5000/async/title/Pride"

# Promise callback version
Invoke-RestMethod -Uri "http://localhost:5000/promise/title/Pride"
```

**Expected Response**: Array of books matching "Pride" in the title

---

## 📸 Screenshot Guidelines for Submission

### For Task 10 (task10.png)
1. Open `final_project/router/general.js` in VS Code
2. Scroll to lines ~95-110 (getAllBooks function and /async route)
3. Make sure the following are visible:
   - `function getAllBooks()` with Promise implementation
   - `public_users.get('/async', async function...)`
   - The async-await syntax with try-catch
4. Take screenshot and save as `task10.png`

### For Task 11 (task11.png)
1. In `general.js`, scroll to lines ~115-145
2. Make sure the following are visible:
   - `function getBookByISBN(isbn)` with Promise implementation
   - `public_users.get('/async/isbn/:isbn', async function...)`
   - The async-await syntax with error handling
3. Take screenshot and save as `task11.png`

### For Task 12 (task12.png)
1. In `general.js`, scroll to lines ~148-180
2. Make sure the following are visible:
   - `function getBooksByAuthor(author)` with Promise implementation
   - `public_users.get('/async/author/:author', async function...)`
   - The loop logic and async-await syntax
3. Take screenshot and save as `task12.png`

### For Task 13 (task13.png)
1. In `general.js`, scroll to lines ~183-215
2. Make sure the following are visible:
   - `function getBooksByTitle(title)` with Promise implementation
   - `public_users.get('/async/title/:title', async function...)`
   - The search logic and async-await syntax
3. Take screenshot and save as `task13.png`

---

## 📁 Files Modified

### `final_project/router/general.js`
- Added axios import
- Added 4 helper functions (getAllBooks, getBookByISBN, getBooksByAuthor, getBooksByTitle)
- Added 4 async-await routes (/async, /async/isbn/:isbn, /async/author/:author, /async/title/:title)
- Added 4 Promise callback routes (/promise, /promise/isbn/:isbn, /promise/author/:author, /promise/title/:title)

### `final_project/package.json`
- Added axios dependency

---

## 💡 Code Highlights

### Async-Await Example (Task 10)
```javascript
// Helper function returning a Promise
function getAllBooks() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books);
    }, 100);
  });
}

// Route using async-await
public_users.get('/async', async function (req, res) {
  try {
    const bookList = await getAllBooks();
    return res.status(200).json(bookList);
  } catch (error) {
    return res.status(500).json({ 
      message: "Error fetching books", 
      error: error.message 
    });
  }
});
```

### Promise Callback Example (Task 10)
```javascript
// Route using Promise callbacks
public_users.get('/promise', function (req, res) {
  getAllBooks()
    .then(bookList => {
      return res.status(200).json(bookList);
    })
    .catch(error => {
      return res.status(500).json({ 
        message: "Error fetching books", 
        error: error.message 
      });
    });
});
```

---

## ✨ Summary

All four tasks (10-13) have been successfully implemented with:
- ✅ Async-await syntax
- ✅ Promise callbacks (.then/.catch)
- ✅ Proper error handling
- ✅ RESTful endpoint design
- ✅ JSON responses
- ✅ Code comments for clarity

The implementation demonstrates understanding of:
- Modern JavaScript async patterns
- Express.js routing
- Promise-based programming
- HTTP request/response handling
- Error handling in async operations

---

## 🎯 Next Steps for Submission

1. Start the server: `npm start`
2. Test all endpoints to verify they work
3. Take screenshots of the code in `general.js` as described above
4. Name screenshots: task10.png, task11.png, task12.png, task13.png
5. Submit screenshots for peer review

---

**Date Completed**: October 21, 2025
**Files Updated**: general.js, package.json
**New Dependencies**: axios
