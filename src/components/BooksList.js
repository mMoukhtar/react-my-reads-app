import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

export class BooksList extends Component {
    static propTypes = { list: PropTypes.object.isRequired };

    render() {
        const { list } = this.props;
        const shelves = Object.keys(list);

        return (
            <div className="list-books">
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
        );
    }
}

export default BooksList;
