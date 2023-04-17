import { clientCredentials } from '../utils/client';
// API CALLS FOR BOOKS

const dbUrl = clientCredentials.databaseURL;

const getBooks = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/books.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const deleteBook = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/books/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleBook = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/books/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createBook = (bookObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/books.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookObj),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateBook = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/books/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const booksOnSale = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/books.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const onSale = Object.values(data).filter((item) => item.sale);
      resolve(onSale);
    })
    .catch(reject);
});

export {
  getBooks,
  createBook,
  deleteBook,
  getSingleBook,
  updateBook,
  booksOnSale,
};
