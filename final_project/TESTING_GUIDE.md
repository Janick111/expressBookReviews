# 🧪 Testing Guide for Tasks 10-13

## Step-by-Step Testing Instructions

### Prerequisites
Ensure your server is running on port 5000.

---

## Option 1: Test in Web Browser (Easiest)

Simply open these URLs in your web browser (Chrome, Firefox, Edge, etc.):

### Task 10: Get All Books
```
http://localhost:5000/async
```
**Expected Result**: JSON object with 10 books

### Task 11: Get Book by ISBN
```
http://localhost:5000/async/isbn/1
```
**Expected Result**: Single book details for "Things Fall Apart"

### Task 12: Get Books by Author
```
http://localhost:5000/async/author/Jane Austen
```
**Expected Result**: Array with "Pride and Prejudice"

### Task 13: Get Books by Title
```
http://localhost:5000/async/title/Pride
```
**Expected Result**: Array with books matching "Pride" in title

---

## Option 2: Test with PowerShell

Open a NEW PowerShell terminal (not the one running the server) and run:

### Task 10:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/async"
```

### Task 11:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/async/isbn/1"
```

### Task 12:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/async/author/Jane Austen"
```

### Task 13:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/async/title/Pride"
```

---

## Option 3: Test Promise Callback Versions

You can also test the alternative Promise callback implementations:

### Browser URLs:
```
http://localhost:5000/promise
http://localhost:5000/promise/isbn/1
http://localhost:5000/promise/author/Jane Austen
http://localhost:5000/promise/title/Pride
```

### PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/promise"
Invoke-RestMethod -Uri "http://localhost:5000/promise/isbn/1"
Invoke-RestMethod -Uri "http://localhost:5000/promise/author/Jane Austen"
Invoke-RestMethod -Uri "http://localhost:5000/promise/title/Pride"
```

---

## Sample Expected Responses

### Task 10 Response:
```json
{
  "1": {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
  },
  "2": {
    "author": "Hans Christian Andersen",
    "title": "Fairy tales",
    "reviews": {}
  },
  ...
}
```

### Task 11 Response:
```json
{
  "author": "Chinua Achebe",
  "title": "Things Fall Apart",
  "reviews": {}
}
```

### Task 12 Response:
```json
[
  {
    "isbn": "8",
    "author": "Jane Austen",
    "title": "Pride and Prejudice",
    "reviews": {}
  }
]
```

### Task 13 Response:
```json
[
  {
    "isbn": "8",
    "author": "Jane Austen",
    "title": "Pride and Prejudice",
    "reviews": {}
  }
]
```

---

## Troubleshooting

### Server Not Running?
```powershell
cd final_project
npm start
```

### Port 5000 Already in Use?
Stop other processes using port 5000, or change the PORT in `index.js`

### Cannot Connect?
- Make sure the server is running (you should see "Server is running" message)
- Check that you're using the correct URL: `http://localhost:5000`
- Ensure no firewall is blocking the connection

### Getting 404 Error?
- Double-check the URL spelling
- Make sure you saved the changes to `general.js`
- Restart the server if needed

---

## Quick Test All Endpoints Script

Create a file called `test_all.ps1` with this content:

```powershell
Write-Host "Testing Task 10..." -ForegroundColor Cyan
Invoke-RestMethod -Uri "http://localhost:5000/async" | ConvertTo-Json -Depth 3

Write-Host "`nTesting Task 11..." -ForegroundColor Cyan
Invoke-RestMethod -Uri "http://localhost:5000/async/isbn/1" | ConvertTo-Json

Write-Host "`nTesting Task 12..." -ForegroundColor Cyan
Invoke-RestMethod -Uri "http://localhost:5000/async/author/Jane Austen" | ConvertTo-Json

Write-Host "`nTesting Task 13..." -ForegroundColor Cyan
Invoke-RestMethod -Uri "http://localhost:5000/async/title/Pride" | ConvertTo-Json

Write-Host "`n✅ All tests completed!" -ForegroundColor Green
```

Then run:
```powershell
.\test_all.ps1
```

---

## ✨ Success Criteria

Your implementation is successful if:
- ✅ All URLs return JSON data (not errors)
- ✅ Task 10 returns all 10 books
- ✅ Task 11 returns a single book object
- ✅ Task 12 returns an array of books by the author
- ✅ Task 13 returns an array of books matching the title
- ✅ No 404, 500, or connection errors

---

**Ready for Screenshots!** Once testing is successful, proceed to take screenshots as described in QUICK_SUMMARY.md
