import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import BooksList from './BooksList';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import './App.css';

/*
 * This component provides the functionality for books search page.
 * It uses BookList component to display the search results.
 */
class SearchBooks extends Component {
  static propTypes = {
    existingBooks: PropTypes.array.isRequired,
    onUpdateBooks: PropTypes.func.isRequired
  };

  state = {
    query: ''
  }

  constructor() {
    super();
    // initialise search results books list
    this.books = [];
    // initialise typingTimer to be used to detect quick typing
    this.typingTimer = null;
    // bind updateResults function to "this" component variables
    this.updateResults = this.updateResults.bind(this);
  }

  /*
   * On search field change, update results "after" quick typing stops.
   * It uses an instant timer variable to delay results fetches from backend
   * until typing stops (or slow down).
   * This is to avoid too many fetches from backend in order to improve performance
   * and to let async search results fetches to execute in order
   */
   handleChange(query) {
     // reset timer
     clearTimeout(this.typingTimer);
     // call updateResults function after 0.5 second if no further typing interrupts meanwhile
     this.typingTimer = setTimeout(this.updateResults, 500, query);
   }

  /*
   * Fetch updated search results then set books list and query state accordingly.
   */
  updateResults(query) {
    // This component property is passed from parent; used to check fetched books shelves
    const {existingBooks} = this.props;

    // fetch serach results from backend
    BooksAPI.search(query.trim())
    .then((booksData) => {
      // if some response that is not empty array or error is returned
      if(booksData && booksData.length !== 0 && !booksData.error) {
        this.books = booksData.map((book) => {
          // Return existing shelves books with their shelf property set to value
          const existing = existingBooks.find((bk) => (bk.id === book.id));
          if(existing) {
            return existing;
          }
          return book;
        });
        this.setState({query});
      } else { // if undefined response, empty array or an error is returned
        this.books = [];
        this.setState({query});
      }
    })
    .catch((error) => { // error fetching serach results from backend
      this.books = [];
      console.log('Error searching', error);
      this.setState({query});
    });
  }

  render() {
    const {onUpdateBooks} = this.props;
    const books = this.books;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.handleChange(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BooksList
            books={books}
            onUpdateBooks={onUpdateBooks}
          />
        </div>
      </div>
    );
  }
}

export default SearchBooks;
