import React, { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export class Modal extends Component {
  render() {
    const {
      data: { img, alt },
      closeModal,
    } = this.props;
    console.log(img, alt, closeModal);
    return (
      <div className={css.overlay} onClick={closeModal}>
        <div className={css.modal}>
          <img src={img} alt={alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  img: PropTypes.string,
  alt: PropTypes.string,
  closeModal: PropTypes.func,
};
export default Modal;
