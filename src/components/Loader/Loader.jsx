import React, { Component } from 'react';
import css from './Loader.module.css';
import { ThreeCircles } from 'react-loader-spinner';

export class Loader extends Component {
  render() {
    return (
      <div className={css.loader}>
        <ThreeCircles
          height="100"
          width="100"
          color="#3f51b5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      </div>
    );
  }
}

export default Loader;
