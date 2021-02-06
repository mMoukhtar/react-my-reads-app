import React from 'react';
import PropTypes from 'prop-types';

const BookShelfChanger = (props) => {
    const handelOnChange = (e) => {
        const index = e.target.selectedIndex;
        console.log(index, e.target[index].value);
        props.onChange(e.target[index].value);
    };

    return (
        <div className="book-shelf-changer">
            <select onChange={handelOnChange} value={props.shelf}>
                <option value="move" disabled>
                    Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    );
};

BookShelfChanger.protoTypes = {
    shelf: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default BookShelfChanger;
