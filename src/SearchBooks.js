import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import BooksList from './BooksList';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import './App.css';

class SearchBooks extends Component {
  static propTypes = {
    existingBooks: PropTypes.array.isRequired,
    onUpdateBooks: PropTypes.func.isRequired
  };

  state = {
    query: '',
    books: []
  }

  /*
   * On search field change, update results "after" query async setState is done.
   * This is to avoid query state unwanted reset with search term quick typing.
   */
  handleChange(newQuery) {
    this.setState({query: newQuery}, ()=>this.updateResults());
  }

  /*
   * Fetch updated search results then set books state accordingly.
   */
  updateResults() {
    const {query} = this.state;
    const {existingBooks} = this.props;
    // if query state contains some value,
    // fetch search results and assign them to books state
    if(query.trim() !== '') {
      BooksAPI.search(query)
      .then((books) => {
        // if some response that is not an error is returned
        if(books && !books.error) {
          this.setState({books: books.map((book) => {
            // Return existing shelves books with their shelf property set to value
            const existing = existingBooks.find((bk) => (bk.id === book.id));
            if(existing) {
              return existing;
            }
            return book;
          })});
        } else { // if undefined response or an error is returned
          this.setState({books: []});
        }
      })
      .catch((error) => {
        this.setState({books: []});
        console.log('Error searching', error);
      });
    } else { // if query state is empty, set books state to empty list
      this.setState({books: []});
    }
  }

  render() {
    const {query, books} = this.state;
    const {onUpdateBooks} = this.props;

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
              type="text" value={query}
              placeholder="Search by title or author"
              onChange={(event) => this.handleChange(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BooksList
            books={query.trim() !== '' ? books : []}
            onUpdateBooks={onUpdateBooks}
          />
        </div>
      </div>
    );
  }
}

export default SearchBooks;
