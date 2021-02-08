import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from '../api/BooksAPI';
import BooksList from './BooksList';
import SearchBooks from './SearchBooks';

class BooksApp extends Component {
    state = {};
    componentDidMount = () => {
        BooksAPI.getAll().then((data) => {
            const booksList = this.groupByShelf(data);
            this.setState(() => ({
                ...booksList,
            }));
        });
    };

    // Question #1:
    // I am using this arrow function and passing it down multiple level to Book child components!
    // Is this correct or should I use different approach?
    changeShelf = (changes) => {
        const { oldBook, newShelf } = changes;

        this.setState((oldState) => {
            const oldShelfBooksWithoutChangedBook = oldState[oldBook.shelf].filter(
                (book) => book.id !== oldBook.id
            );
            if (newShelf !== 'none') {
                return {
                    ...oldState,
                    [newShelf]: [
                        ...oldState[newShelf],
                        {
                            ...oldBook,
                            shelf: newShelf,
                        },
                    ],
                    [oldBook.shelf]: [...oldShelfBooksWithoutChangedBook],
                };
            } else {
                return {
                    ...oldState,
                    [oldBook.shelf]: [...oldShelfBooksWithoutChangedBook],
                };
            }
        });

        BooksAPI.update(oldBook, newShelf);
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
                <Route path="/search" render={() => <SearchBooks />} />
            </div>
        );
    }
}

export default BooksApp;
