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
            this.updateStatus(booksList);
        });
    };

    updateStatus = (booksList) => {
        this.setState(() => ({
            ...booksList,
        }));
    };

    // Question #1: I am using this arrow function and passing it down multiple level to child components! is this correct or should I use different approach?
    changeShelf = (book) => {
        BooksAPI.update(book, book.shelf).then((data) => {
            // Question #2: I feel that I need to use the data returned from update API method to save the additional API call to get all data again
            // please let me know if there is a better approach!
            // Approach #1 -> expensive API call
            /*
                Please un-comment between * *
                BooksAPI.getAll().then((data) => {
                const booksList = this.groupByShelf(data);
                this.updateStatus(booksList);
                });
            */
            // Approach #2 -> not happy with the way specially if arrays are big in length
            const booksList = this.updateNewBookListWithOldBookObjectValues(data, this.state);
            this.updateStatus(booksList);
        });
    };

    groupByShelf = (books) =>
        books.reduce((acc, curr) => {
            acc[curr.shelf] = acc[curr.shelf] ? acc[curr.shelf] : [];
            acc[curr.shelf].push(curr);
            return acc;
        }, {});

    // Is there a better way to accomplish this function?
    updateNewBookListWithOldBookObjectValues = (newBooksList, oldBooksList) => {
        const oldValues = Object.values(oldBooksList).flat();
        let updatedBookList = {};
        Object.keys(newBooksList).forEach((key) => {
            newBooksList[key].forEach((id) => {
                updatedBookList[key] = updatedBookList[key] ? updatedBookList[key] : [];
                updatedBookList[key].push(...oldValues.filter((x) => x.id === id));
            });
        });
        return updatedBookList;
    };

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
