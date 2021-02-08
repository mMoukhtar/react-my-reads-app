import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

const BooksList = (props) => {
    const { list } = props;
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
                            onChange={props.onChange}
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
};

BooksList.propTypes = {
    list: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default BooksList;
