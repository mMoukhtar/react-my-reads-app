import React from 'react';
import PropTypes from 'prop-types';

const BookCover = (props) => {
    return (
        <div
            className="book-cover"
            style={{
                width: props.width,
                height: props.height,
                backgroundImage: `url("${props.imageURL}")`,
            }}
        />
    );
};

BookCover.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    imageURL: PropTypes.string.isRequired,
};

export default BookCover;
