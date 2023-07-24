import React, { Component } from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

export class Button extends Component {
  render() {
    return (
      <div className={css.btn__container}>
        <button
          className={css.button}
          type="button"
          onClick={this.props.onClick}
        >
          Load more
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
};
export default Button;
