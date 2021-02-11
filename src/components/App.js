import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from '../api/BooksAPI';
import { searchKeywords } from '../api/validSearchKeywords';
import BooksList from './BooksList';
import { bookChanges } from './Book';
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

    changeShelf = ({ oldBook, newShelf, changes }) => {
        const { id: oldBookId, shelf: oldShelf } = oldBook;
        console.log('oldShelf', oldShelf, 'newShelf', newShelf);
        this.setState((oldState) => {
            const newState = { ...oldState };
            switch (changes) {
                case bookChanges.new:
                    newState[newShelf] = [
                        oldState[newShelf]
                            ? [...oldState[newShelf], { ...oldBook, shelf: newShelf }]
                            : [{ ...oldBook, shelf: newShelf }],
                    ];
                    break;
                case bookChanges.removed:
                case bookChanges.changed: {
                    const oldShelfBooksAfterUpdate = this.getShelfBooksWithoutId(
                        oldState,
                        oldShelf,
                        oldBookId
                    );
                    delete newState[oldShelf];
                    this.containsBooks(oldShelfBooksAfterUpdate) &&
                        (newState[oldBook.shelf] = [...oldShelfBooksAfterUpdate]);
                    newShelf !== 'none' &&
                        (newState[newShelf] = newState[newShelf]
                            ? [...newState[newShelf], { ...oldBook, shelf: newShelf }]
                            : [{ ...oldBook, shelf: newShelf }]);
                    break;
                }

                default:
                    console.log(':: Undefined Change');
                    break;
            }
            return newState;
        });
        BooksAPI.update(oldBook, newShelf);
    };

    containsBooks = (shelf) => shelf.length > 0;

    getShelfBooksWithoutId = (state, shelf, id) => state[shelf].filter((book) => book.id !== id);

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
                            onChange={this.changeShelf}
                        />
                    )}
                />
            </div>
        );
    }
}

export default BooksApp;
