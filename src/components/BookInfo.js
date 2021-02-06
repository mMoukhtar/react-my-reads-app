import React from 'react';
import PropTypes from 'prop-types';

const BookInfo = (props) => {
    return (
        <div>
            <div className="book-title">{props.title}</div>
            <div className="book-authors">{props.author}</div>
        </div>
    );
};

BookInfo.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
};

export default BookInfo;
