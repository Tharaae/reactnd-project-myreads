import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

/*
 * This functional component displays the passed book details.
 * This component is used by BookList component to display every list item.
 */
const Book = (props) => {

  const {book, onChangeShelf} = props;

  if(book) {
    // check if book image exists
    let bookImage;
    if(book.imageLinks && book.imageLinks.thumbnail) {
      bookImage = book.imageLinks.thumbnail;
    } else { // if image does not exist, display placeholder image
      bookImage = '/img/noimage.jpg';
    }

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{backgroundImage: `url(${bookImage})` }}
            >
          </div>
          <div className="book-shelf-changer">
            <select
              defaultValue={book.shelf? book.shelf : 'none'}
              onChange={(event) => onChangeShelf(book, event.target.value)}
            >
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Already Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">
          {book.title? book.title : ''}
        </div>
        <div className="book-authors">
          {book.authors? book.authors.join(' - ') : ''}
        </div>
      </div>
    );
  } else {
    return (<div className="book"></div>);
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired
};

export default Book;
