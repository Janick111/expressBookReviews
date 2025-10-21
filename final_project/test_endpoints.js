// Test file to verify all async/promise endpoints
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testEndpoints() {
  console.log('='.repeat(60));
  console.log('Testing Task 10-13: Async/Await and Promise Callbacks');
  console.log('='.repeat(60));
  
  try {
    // Task 10: Get all books (async-await)
    console.log('\n📚 Task 10: Get all books using async-await');
    console.log('Endpoint: GET /async');
    const allBooks = await axios.get(`${BASE_URL}/async`);
    console.log('✅ Success! Retrieved', Object.keys(allBooks.data).length, 'books');
    console.log('Sample:', JSON.stringify(allBooks.data['1'], null, 2));
    
    // Task 11: Get book by ISBN (async-await)
    console.log('\n📖 Task 11: Get book by ISBN using async-await');
    console.log('Endpoint: GET /async/isbn/1');
    const bookByIsbn = await axios.get(`${BASE_URL}/async/isbn/1`);
    console.log('✅ Success! Book:', JSON.stringify(bookByIsbn.data, null, 2));
    
    // Task 12: Get books by Author (async-await)
    console.log('\n✍️ Task 12: Get books by Author using async-await');
    console.log('Endpoint: GET /async/author/Jane Austen');
    const booksByAuthor = await axios.get(`${BASE_URL}/async/author/Jane Austen`);
    console.log('✅ Success! Found', booksByAuthor.data.length, 'book(s)');
    console.log('Result:', JSON.stringify(booksByAuthor.data, null, 2));
    
    // Task 13: Get books by Title (async-await)
    console.log('\n📕 Task 13: Get books by Title using async-await');
    console.log('Endpoint: GET /async/title/Pride');
    const booksByTitle = await axios.get(`${BASE_URL}/async/title/Pride`);
    console.log('✅ Success! Found', booksByTitle.data.length, 'book(s)');
    console.log('Result:', JSON.stringify(booksByTitle.data, null, 2));
    
    console.log('\n' + '='.repeat(60));
    console.log('Testing Promise Callback Implementations');
    console.log('='.repeat(60));
    
    // Task 10: Get all books (promise)
    console.log('\n📚 Task 10 (Promise): Get all books using Promise callbacks');
    console.log('Endpoint: GET /promise');
    await axios.get(`${BASE_URL}/promise`)
      .then(response => {
        console.log('✅ Success! Retrieved', Object.keys(response.data).length, 'books');
        console.log('Sample:', JSON.stringify(response.data['2'], null, 2));
      })
      .catch(error => {
        console.log('❌ Error:', error.message);
      });
    
    // Task 11: Get book by ISBN (promise)
    console.log('\n📖 Task 11 (Promise): Get book by ISBN using Promise callbacks');
    console.log('Endpoint: GET /promise/isbn/3');
    await axios.get(`${BASE_URL}/promise/isbn/3`)
      .then(response => {
        console.log('✅ Success! Book:', JSON.stringify(response.data, null, 2));
      })
      .catch(error => {
        console.log('❌ Error:', error.message);
      });
    
    // Task 12: Get books by Author (promise)
    console.log('\n✍️ Task 12 (Promise): Get books by Author using Promise callbacks');
    console.log('Endpoint: GET /promise/author/Chinua Achebe');
    await axios.get(`${BASE_URL}/promise/author/Chinua Achebe`)
      .then(response => {
        console.log('✅ Success! Found', response.data.length, 'book(s)');
        console.log('Result:', JSON.stringify(response.data, null, 2));
      })
      .catch(error => {
        console.log('❌ Error:', error.message);
      });
    
    // Task 13: Get books by Title (promise)
    console.log('\n📕 Task 13 (Promise): Get books by Title using Promise callbacks');
    console.log('Endpoint: GET /promise/title/Things');
    await axios.get(`${BASE_URL}/promise/title/Things`)
      .then(response => {
        console.log('✅ Success! Found', response.data.length, 'book(s)');
        console.log('Result:', JSON.stringify(response.data, null, 2));
      })
      .catch(error => {
        console.log('❌ Error:', error.message);
      });
    
    console.log('\n' + '='.repeat(60));
    console.log('✨ All tests completed successfully!');
    console.log('='.repeat(60));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run tests
testEndpoints();
