import React from 'react';
import PropTypes from 'prop-types';
import BookShelfChanger from './BookShelfChanger';
import BookCover from './BookCover';
import BookInfo from './BookInfo';

const Book = (props) => {
    const { coverWidth, coverHeight, book } = props;
    const {
        title,
        authors = ['unknown'],
        shelf = 'none',
        imageLinks: { smallThumbnail = 'https://via.placeholder.com/128x192' } = {},
    } = book;

    return (
        <div className="book">
            <div className="book-top">
                <BookCover width={coverWidth} height={coverHeight} imageURL={smallThumbnail} />
                <BookShelfChanger
                    shelf={shelf}
                    updateShelf={(newShelf) => {
                        props.onChange({
                            oldBook: { ...book },
                            newShelf,
                            changes:
                                newShelf === 'none'
                                    ? bookChanges.removed
                                    : book.shelf
                                    ? bookChanges.changed
                                    : bookChanges.new,
                        });
                    }}
                />
            </div>
            <BookInfo title={title} author={authors.join(', ')} />
        </div>
    );
};

Book.propTypes = {
    book: PropTypes.object.isRequired,
    coverWidth: PropTypes.number.isRequired,
    coverHeight: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

const bookChanges = { new: 'new', changed: 'changed', removed: 'removed' };
Object.freeze(bookChanges);

export { bookChanges, Book as default };
