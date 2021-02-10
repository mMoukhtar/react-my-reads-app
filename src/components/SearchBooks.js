import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from '../api/BooksAPI';
import BookShelf from './BookShelf';

import SearchBooksBar from './SearchBooksBar';

export class SearchBooks extends Component {
    state = {
        searchResults: [],
        isValid: true,
    };

    static propTypes = {
        validSearchKeywords: PropTypes.array.isRequired,
        list: PropTypes.array.isRequired,
    };

    isValidQuery = (query) => {
        const { validSearchKeywords } = this.props;
        return (
            validSearchKeywords.filter((keyword) => keyword.toLowerCase().includes(query.toLowerCase()))
                .length > 0
        );
    };

    // Question
    // I used the below logic to compare the list of books returned from search API with the list of
    // books on shelves! is this the best way to accomplish this task?
    search = async (query) => {
        if (this.isValidQuery(query)) {
            if (query !== '') {
                try {
                    const data = await BooksAPI.search(query);
                    data.forEach((book) => {
                        const matchedBooks = this.props.list.filter((listBooks) => listBooks.id === book.id);
                        matchedBooks.length > 0 && (book.shelf = matchedBooks[0].shelf);
                    });
                    this.setState(() => ({ searchResults: data, isValid: true }));
                } catch (error) {
                    console.log('error: ', error);
                }
            } else {
                this.setState(() => ({ searchResults: [], isValid: true }));
            }
        } else {
            this.setState(() => ({ searchResults: [], isValid: false }));
        }
    };

    addToShelf = ({ oldBook, newShelf }) => {
        newShelf !== 'none' && BooksAPI.update(oldBook, newShelf);
    };

    render() {
        const { searchResults, isValid } = this.state;
        return (
            <div className="search-books">
                <SearchBooksBar search={this.search} />
                <div className="search-books-results">
                    {searchResults.length > 0 && (
                        <BookShelf
                            title={'Search Results'}
                            books={searchResults}
                            onChange={this.addToShelf}
                        />
                    )}
                    {!isValid && <div>Invalid Search Keyworkd!</div>}
                </div>
            </div>
        );
    }
}

export default SearchBooks;
