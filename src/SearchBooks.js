import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import BooksList from './BooksList';
import * as BooksAPI from './BooksAPI';
import './App.css';

class SearchBooks extends Component {
  state = {
    query: '',
    books: []
  }

  updateResults(newQuery) {
    BooksAPI.search(newQuery)
    .then((books) => {
      this.setState({query: newQuery.trim()});
      this.setState({books: books.map((book) => {
        // Return existing shelves books with their shelf property set
        const existing = this.props.existingBooks.find((bk) => (bk.id === book.id));
        if(existing) {
          return existing;
        }
        return book;
      })});
    })
    .catch((error) => {
      this.setState({books: []});
      console.log('Error searching', error);
    });
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
              onChange={(event) => this.updateResults(event.target.value)}
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
