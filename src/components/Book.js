import React, { Component } from 'react';
import PropType from 'prop-types';
import BookShelfChanger from './BookShelfChanger';
import BookCover from './BookCover';
import BookInfo from './BookInfo';

class Book extends Component {
    static propTypes = {
        book: PropType.object.isRequired,
        coverWidth: PropType.number.isRequired,
        coverHeight: PropType.number.isRequired,
    };

    ShelfChanged = (shelf) => {
        console.log(shelf);
    };

    render() {
        const { coverWidth, coverHeight, book } = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <BookCover width={coverWidth} height={coverHeight} imageURL={book.imageURL} />
                    <BookShelfChanger updateShelf={this.ShelfChanged} shelf={book.shelf} />
                </div>
                <BookInfo title={book.title} author={book.author} />
            </div>
        );
    }
}

export default Book;
