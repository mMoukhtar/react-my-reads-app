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
        onChange: PropTypes.func.isRequired,
    };

    isValidQuery = (query) => {
        const { validSearchKeywords } = this.props;
        return validSearchKeywords.filter((keyword) => keyword.toLowerCase().includes(query)).length > 0;
    };

    updateState({ oldBook, newShelf, changes }) {
        this.props.onChange({ oldBook, newShelf, changes });
    }

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
                            onChange={this.props.onChange}
                        />
                    )}
                    {!isValid && <div>Invalid Search Keyworkd!</div>}
                </div>
            </div>
        );
    }
}

export default SearchBooks;
