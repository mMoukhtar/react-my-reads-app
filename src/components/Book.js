import React from 'react';
import PropType from 'prop-types';
import BookShelfChanger from './BookShelfChanger';
import BookCover from './BookCover';
import BookInfo from './BookInfo';

const Book = (props) => {
    const { coverWidth, coverHeight, book } = props;

    const ShelfChanged = (shelf) => {
        console.log(shelf);
    };

    return (
        <div className="book">
            <div className="book-top">
                <BookCover
                    width={coverWidth}
                    height={coverHeight}
                    imageURL={book.imageLinks.smallThumbnail}
                />
                <BookShelfChanger updateShelf={ShelfChanged} shelf={book.shelf} />
            </div>
            <BookInfo title={book.title} author={book.authors.join(', ')} />
        </div>
    );
};

Book.propTypes = {
    book: PropType.object.isRequired,
    coverWidth: PropType.number.isRequired,
    coverHeight: PropType.number.isRequired,
};

export default Book;

/*
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
*/
