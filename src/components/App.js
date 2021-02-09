import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from '../api/BooksAPI';
import { searchKeywords } from '../api/validSearchKeywords';
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
    // Question #2:
    // Is there a better way to write the below code?
    changeShelf = (changes) => {
        const { oldBook, newShelf } = changes;
        const { id: oldBookId, shelf: oldShelf } = oldBook;
        // Question #3:
        // When should I call the API? before I update the state or after updating it?
        // Also should I use any component event to handle the Update API call?
        BooksAPI.update(oldBook, newShelf).then((data) => {
            this.setState((oldState) => {
                const oldShelfBooksAfterUpdate = oldState[oldShelf].filter((book) => book.id !== oldBookId);
                const containsBooks = oldShelfBooksAfterUpdate.length > 1;
                // Create new State Object
                //1. Delete changed shelf from
                delete oldState[oldShelf];
                //2. Copy old object without changed shelf
                let newState = { ...oldState };
                //3. If selected shelf not none
                //   check if the shelf is none and that shelf exists if doesn't exist create new shelf
                newShelf !== 'none' && (newState[newShelf] = newState[newShelf] ? newState[newShelf] : []);
                //   Push book to shelf
                newState[newShelf].push({
                    ...oldBook,
                    shelf: newShelf,
                });
                // 4. If old shelf still cotains books add the updated books to new state object
                containsBooks && (newState[oldBook.shelf] = [...oldShelfBooksAfterUpdate]);
                return newState;
            });
        });
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
                <Route path="/search" render={() => <SearchBooks validSearchKeywords={searchKeywords} />} />
            </div>
        );
    }
}

export default BooksApp;
