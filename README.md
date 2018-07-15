# Front-End Nano-Degree - My Reads Project
**By _Tharaa Elmorssi_**
---

## Project Requirements

MyReads project is a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. The project emphasizes using React to build the application and provides an API server and client library that I used to persist information as you interact with the application.

The app/site has two pages:
  - Main page
  - Search page

### Main Page
- The main page displays a list of "shelves" (i.e. categories), each of which contains a number of books. The three shelves are:
  - Currently Reading
  - Want to Read
  - Read
- Each book has a control that lets you select the shelf for that book. When you select a different shelf, the book moves there.
- The control is always showing the current shelf the book is in.
- The main page also has a link to `/search`, a search page that allows you to find books to add to your library.

### Search Page
- The search page has a text input that may be used to find books.
- As the value of the text input changes, the books that match that query are displayed on the page, along with a control that lets you add the book to your library.
- When a book is on a bookshelf, it has the shelf control shows the correct shelf on the search page, same as the main page.
- The search page has a link to the main page.
- When you go back to the main page from the search page, you instantly see all of the selections you made on the search page in your library.

**Note:** I used the starter template that provided a static example of the CSS and HTML markup that may be used, but without any of the React code that is needed to complete the project.

## How to run the App

- Clone the submitted project repository to a folder on your local machine
- install all project dependencies with `npm install` in the project folder
- start the app with `npm start`
