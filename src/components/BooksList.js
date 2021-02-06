import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

export class BooksList extends Component {
    static propTypes = { list: PropTypes.object.isRequired };

    render() {
        const { list } = this.props;
        const shelves = Object.keys(list);

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelves.map((shelf) => (
                            <BookShelf
                                key={shelf}
                                title={shelf
                                    .split(/(?=[A-Z])/)
                                    .join(' ')
                                    .toUpperCase()}
                                books={list[shelf]}
                            />
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search" onClick={() => console.log('search')}>
                        Add a book
                    </Link>
                </div>
            </div>
        );
    }
}

export default BooksList;
