import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { debounce } from 'throttle-debounce';

class SearchBooksBar extends Component {
    state = {
        query: '',
    };

    static propTypes = {
        search: PropTypes.func.isRequired,
    };

    search = debounce(1000, (query) => {
        this.props.search(query);
    });

    searchChanged = (value) => {
        this.setState(() => ({ query: value }));
        this.search(value.toLowerCase().trim());
    };

    clearSearch = () => {
        this.searchChanged('');
    };

    render() {
        return (
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
                            this.searchChanged(event.target.value);
                        }}
                    />
                </div>
                {this.state.query.length > 0 && (
                    <button className="clear-search" onClick={this.clearSearch} />
                )}
            </div>
        );
    }
}

export default SearchBooksBar;
