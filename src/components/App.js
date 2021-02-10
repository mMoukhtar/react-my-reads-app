import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from '../api/BooksAPI';
import { searchKeywords } from '../api/validSearchKeywords';
import BooksList from './BooksList';
import SearchBooks from './SearchBooks';

class BooksApp extends Component {
    state = {};

    async componentDidMount() {
        try {
            const data = await BooksAPI.getAll();
            const booksList = this.groupByShelf(data);
            this.setState(() => ({
                ...booksList,
            }));
        } catch (error) {
            console.log('error: ', error);
        }
    }

    // Question #1:
    // I am using this arrow function and passing it down multiple level to Book child components!
    // Is this correct or should I use different approach?
    // Question #2:
    // Is there a better way to write the below code?
    changeShelf = ({ oldBook, newShelf }) => {
        const { id: oldBookId, shelf: oldShelf } = oldBook;
        this.setState((oldState) => {
            const oldShelfBooksAfterUpdate = oldState[oldShelf].filter((book) => book.id !== oldBookId);
            const containsBooks = oldShelfBooksAfterUpdate.length >= 1;
            // Create new State Object
            //1. Delete changed shelf from
            delete oldState[oldShelf];
            //2. Copy old object without changed shelf
            let newState = { ...oldState };
            //3. If selected shelf not none
            //   check if the shelf is none and that shelf exists if doesn't exist create new shelf
            if (newShelf !== 'none') {
                newState[newShelf] = newState[newShelf] ? newState[newShelf] : [];
                //   Push book to shelf
                newState[newShelf].push({
                    ...oldBook,
                    shelf: newShelf,
                });
            }
            // 4. If old shelf still cotains books add the updated books to new state object
            containsBooks && (newState[oldBook.shelf] = [...oldShelfBooksAfterUpdate]);
            return newState;
        });
        BooksAPI.update(oldBook, newShelf);
    };

    existingBook = (bookId) => {
        const matchedBooks = Object.values(this.state)
            .flat()
            .filter((book) => book.id === bookId);
        return matchedBooks.length > 0 ? true : false;
    };

    addBook = ({ oldBook, newShelf }) => {
        console.log(oldBook, newShelf);
        if (this.existingBook(oldBook.id)) {
            console.log('existing');
            this.changeShelf({ oldBook, newShelf });
        } else {
            console.log('new');
            this.setState((oldState) => ({
                ...oldState,
                [newShelf]: oldState[newShelf]
                    ? [...oldState[newShelf], { ...oldBook, shelf: newShelf }]
                    : [{ ...oldBook, shelf: newShelf }],
            }));
            BooksAPI.update(oldBook, newShelf);
        }
    };

    groupByShelf = (books) =>
        books.reduce((acc, curr) => {
            acc[curr.shelf] = acc[curr.shelf] ? acc[curr.shelf] : [];
            acc[curr.shelf].push(curr);
            return acc;
        }, {});

    render() {
        return (
            <div className="app">
                <Route
                    path="/"
                    exact
                    render={() => <BooksList list={this.state} onChange={this.changeShelf} />}
                />
                <Route
                    path="/search"
                    render={() => (
                        <SearchBooks
                            list={Object.values(this.state).flat()}
                            validSearchKeywords={searchKeywords}
                            onAddBook={this.addBook}
                        />
                    )}
                />
            </div>
        );
    }
}

export default BooksApp;
