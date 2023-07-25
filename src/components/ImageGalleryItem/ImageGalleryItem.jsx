import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  render() {
    return (
      <div>
        <li className={css.gallery__item}>
          <img
            className={css.gallery__image}
            width="300px"
            src={this.props.item.webformatURL}
            alt={this.props.item.tags}
            onClick={this.props.onClickImage}
            data-bgimage={this.props.item.largeImageURL}
            data-alt={this.props.item.tags}
          />
        </li>
      </div>
    );
  }
}
ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  onClickImage: PropTypes.func,
};

export default ImageGalleryItem;
