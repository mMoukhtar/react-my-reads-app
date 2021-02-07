import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class SearchBooks extends Component {
    state = {
        query: '',
    };

    static propTypes = {};

    updateQuery = (newValue) => {
        this.setState(() => ({ query: newValue }));
    };

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) => {
                                this.updateQuery(event.target.value);
                            }}
                        />
                    </div>
                </div>
                {this.state.query.length >= 3 && (
                    <div className="search-books-results">
                        <ol className="books-grid">
                            <li>test</li>
                            <li>test</li>
                            <li>test</li>
                        </ol>
                    </div>
                )}
            </div>
        );
    }
}

export default SearchBooks;
