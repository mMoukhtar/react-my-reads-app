import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookShelf = (props) => {
    const coverWidth = process.env.bookCoverWidth || 128;
    const coverHeight = process.env.bookCoverHeight || 192;
    const { books, title } = props;
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <li key={book.id}>
                            <Book
                                book={book}
                                coverWidth={coverWidth}
                                coverHeight={coverHeight}
                                onChange={props.onChange}
                            />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

BookShelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default BookShelf;
