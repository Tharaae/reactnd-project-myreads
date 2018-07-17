import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BooksList from './BooksList';
import SearchBooks from './SearchBooks';

class BooksApp extends Component {
  state = {
    allBooks: [],
    shelves: [
      {
        key: 'currentlyReading',
        title: 'Currently Reading',
        booksIds: []
      },
      {
        key: 'wantToRead',
        title: 'Want to Read',
        booksIds: []
      },
      {
        key: 'read',
        title: 'Already Read',
        booksIds: []
      }
    ]
  }

  /*
   * Get All books list once main app component is mounted
   */
  componentDidMount() {
    BooksAPI.getAll()
    .then((allBooks) => {
      this.setState({allBooks});
      this.setState((st) => (
        {shelves: st.shelves.map((shelf) => {
          const booksIds = allBooks
            .filter((book) => (book.shelf === shelf.key))
            .map((book) => book.id);
          shelf.booksIds = booksIds? booksIds : [];
          return shelf;
        })
      }));
    })
    .catch((error) => console.log('Error getting books list', error));
  }

  /*
   * When a child Book in a child BookShelf moved to a new shelf,
   * or when a new book is added to one of the shelves,
   * update the App state to re-render
   */
  updateBooks = (book, newShelf) => {
    // Update the backend
    BooksAPI.update(book, newShelf)
    // then udate App state from returning response
    .then((data) => {
      //if book already existed on one of the shelves
      if(book.shelf) {
        // Change book shelf in allBooks state
        this.setState((st) => {
          st.allBooks.find((bk) => (bk.id === book.id)).shelf = newShelf;
          return {allBooks: st.allBooks};
        });
      } else { // if book does not exist in allBooks state
        // Add shelf property to the new book
        book['shelf'] = newShelf;
        // Add the new book to allBooks state
        this.setState((st) => {
          st.allBooks.push(book);
          return {allBooks: st.allBooks};
        });
      }
      // Update the current booksIds in shelves state from the returning data
      this.setState((st) => ({shelves: st.shelves.map((shelf) => {
        const booksIds = data[shelf.key];
        shelf.booksIds = booksIds? booksIds : [];
        return shelf;
      })}));
    })
    .catch((error) => console.log('Error updating book shelf', error));
  }

  render() {
    const {allBooks, shelves} = this.state;

    return (
      <div className="app">

        {/* go to Seach Books when url includes /search */}
        <Route path="/search" render={() => (
          <SearchBooks
            existingBooks={allBooks}
            onUpdateBooks={this.updateBooks}
          />
        )} />

        {/* go to Books Display when url is the root path */}
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>My Reads</h1>
            </div>

            <div className="list-books-content">
              <div>
                {/*Loop on existing array state property 'shelves'
                  and display books list for every shelf */
                  shelves.map((shelf) => (
                    <div key={shelf.key} className="bookshelf">
                      <h2 className="bookshelf-title">{shelf.title}</h2>
                      <div className="bookshelf-books">
                        <BooksList
                          books={allBooks.filter((book) => (shelf.booksIds.includes(book.id)))}
                          orderBy='title'
                          onUpdateBooks={this.updateBooks}
                        />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>

          </div>
        )} />

      </div>
    )
  }
}

export default BooksApp;
