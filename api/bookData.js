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
        const sortedData = Object.values(data).sort((bookOne, bookTwo) => bookOne.title.localeCompare(bookTwo.title));
        resolve(sortedData);
        // resolve(Object.values(data));
        // https://firebase.google.com/docs/database/rest/retrieve-data#section-rest-filtering:~:text=Filtered%20data%20is%20returned%20unordered%3A%20When%20using%20the%20REST%20API%2C%20the%20filtered%20results%20are%20returned%20in%20an%20undefined%20order%20since%20JSON%20interpreters%20don%27t%20enforce%20any%20ordering.%20If%20the%20order%20of%20your%20data%20is%20important%20you%20should%20sort%20the%20results%20in%20your%20application%20after%20they%20are%20returned%20from%20Firebase.
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
