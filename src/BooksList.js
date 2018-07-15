import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import './App.css';

/*
 * This functional component displays the passed shelf title and list of books.
 * For every book list item, Book functional component is used.
 */
const BooksList = (props) => {
  const {books, orderBy, onUpdateBooks} = props;

  if(!books || books.length === 0) {
    return (<ol className="books-grid"></ol>);
  } else {
    let sortedBooks;
    // if orderBy prop is passed, sort books accordingly
    if(orderBy && orderBy !== '') {
      sortedBooks = books.sort(sortBy(orderBy));
    } else { // if sortBy is not passed or empty, return unsorted books
      sortedBooks = books;
    }

    return (
      <ol className="books-grid">
        {sortedBooks.map((book) => (
          <li key={book.id}>
            <Book
              book={book}
              onChangeShelf={(book, newShelf) => {
                if(book.shelf !== newShelf) {
                  onUpdateBooks(book, newShelf);
                }
              }}
            />
          </li>
        ))}
      </ol>
    );
  }
}

BooksList.propTypes = {
  books: PropTypes.array.isRequired,
  sortBy: PropTypes.string,
  onUpdateBooks: PropTypes.func.isRequired
};

export default BooksList;
