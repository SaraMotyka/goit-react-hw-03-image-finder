import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  render() {
    const { images, onClickImage } = this.props;
    return (
      <div>
        <ul className={css.gallery}>
          {images.map(el => {
            return (
              <ImageGalleryItem
                key={el.id}
                item={el}
                onClickImage={onClickImage}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ),
  onClickImage: PropTypes.func,
};

export default ImageGallery;
