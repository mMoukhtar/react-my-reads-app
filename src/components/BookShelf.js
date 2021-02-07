import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

export class BookShelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
    };

    changeShelf = (book) => {
        this.props.onChange(book);
    };

    render() {
        const coverWidth = process.env.bookCoverWidth || 128;
        const coverHeight = process.env.bookCoverHeight || 192;
        const { books, title } = this.props;
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
                                    onChange={this.changeShelf}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookShelf;
