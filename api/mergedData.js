import {
  getAuthorBooks, getSingleAuthor, deleteSingleAuthor, getAuthors,
} from './authorData';
import { getSingleBook, deleteBook, getBooks } from './bookData';

const viewBookDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(bookFirebaseKey)
    .then((bookObject) => {
      getSingleAuthor(bookObject.author_id)
        .then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        });
    }).catch((error) => reject(error));
});

const viewAuthorDetails = (authorFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleAuthor(authorFirebaseKey), getAuthorBooks(authorFirebaseKey)])
    .then(([authorObject, authorBooksArray]) => {
      resolve({ ...authorObject, books: authorBooksArray });
    }).catch((error) => reject(error));
});

const deleteAuthorBooks = (authorId) => new Promise((resolve, reject) => {
  getAuthorBooks(authorId).then((booksArray) => {
    console.warn(booksArray, 'Author Books');
    const deleteBookPromises = booksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(authorId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const globalSearch = (searchTerm, uid) => new Promise((resolve, reject) => {
  Promise.all([getBooks(uid), getAuthors(uid)])
    .then(([bookArray, authorArray]) => {
    // filter books and change to objects with only the title, firebasekey, and type:book
      const filteredBooks = bookArray.filter((book) => {
        if (book.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          return book;
        }
        return '';
      }).map((filterBook) => {
        if (filterBook !== '') {
          return {
            title: filterBook.title,
            firebaseKey: filterBook.firebaseKey,
            type: 'book',
          };
        }
        return '';
      });

      // filter authors and chang to objects with only author_name, firebasekey, and type: author
      const filteredAuthors = authorArray.filter((author) => {
        if (author.first_name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return author;
        } if (author.last_name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return author;
        }
        return '';
      }).map((filterAuthor) => {
        if (filterAuthor !== '') {
          return {
            title: filterAuthor.first_name + filterAuthor.last_name,
            firebaseKey: filterAuthor.firebaseKey,
            type: 'author',
          };
        }
        return '';
      });

      // combine arrays and return
      resolve([...filteredBooks, ...filteredAuthors]);
    }).catch((error) => reject(error));
});

export {
  viewBookDetails, viewAuthorDetails, deleteAuthorBooks, globalSearch,
};
