import React, { Component } from 'react';
import PropType from 'prop-types';
import BookShelfChanger from './BookShelfChanger';
import BookCover from './BookCover';
import BookInfo from './BookInfo';

class Book extends Component {
    // state = {
    //     ...this.props.book,
    // };

    static propTypes = {
        book: PropType.object.isRequired,
        coverWidth: PropType.number.isRequired,
        coverHeight: PropType.number.isRequired,
    };

    ShelfChanged = (shelf) => {
        // this.setState((prevState) => ({
        //     ...prevState,
        //     shelf,
        // }));
        // this.props.onChange(this.state);

        this.props.onChange({ ...this.props.book, shelf });
    };

    render() {
        const { coverWidth, coverHeight } = this.props;
        const {
            title,
            authors,
            shelf,
            imageLinks: { smallThumbnail },
        } = this.props.book;
        return (
            <div className="book">
                <div className="book-top">
                    <BookCover width={coverWidth} height={coverHeight} imageURL={smallThumbnail} />
                    <BookShelfChanger updateShelf={this.ShelfChanged} shelf={shelf} />
                </div>
                <BookInfo title={title} author={authors.join(', ')} />
            </div>
        );
    }
}

export default Book;
