import React from 'react';
import Book from './Book';
import './App.css';

/*
 * This functional component displays the passed shelf title and list of books.
 * For every book list item, Book functional component is used.
 */
const BooksList = (props) => {

  const {books, onUpdateBooks} = props;

  if(!books || books.length === 0) {
    return (<ol className="books-grid"></ol>);
  } else {
    return (
      <ol className="books-grid">
        {books.map((book) => (
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

export default BooksList;
