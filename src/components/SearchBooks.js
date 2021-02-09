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
    };

    isValidQuery = (query) => {
        const { validSearchKeywords } = this.props;
        return (
            validSearchKeywords.filter((keyword) => keyword.toLowerCase().includes(query.toLowerCase()))
                .length > 0
        );
    };

    search = (query) => {
        if (this.isValidQuery(query)) {
            if (query !== '') {
                BooksAPI.search(query).then((data) => {
                    this.setState(() => ({ searchResults: data, isValid: true }));
                });
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
