import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookShelfChanger extends Component {
    state = {
        shelf: '',
    };

    static protoTypes = {
        shelf: PropTypes.string.isRequired,
        updateShelf: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.updateState(this.props.shelf);
    }

    updateState = (shelf) => {
        this.setState(() => ({
            shelf,
        }));
    };

    handelOnChange = (e) => {
        const newShelf = e.target.value;
        this.updateState(newShelf);
        this.props.updateShelf(newShelf);
    };

    render() {
        return (
            <div className="book-shelf-changer">
                <select onChange={this.handelOnChange} value={this.state.shelf}>
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
    }
}

export default BookShelfChanger;
