import React from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends React.Component {
  state = {
    images: [],
    page: 1,
    value: '',
    isLoading: false,
    isModal: false,
  };

  request = {
    API: 'https://pixabay.com/api/',
    KEY: '36940182-0da281a971cf517379f0112d8',
    per_page: 12,
  };

  showLoadMore = false;
  modalData = {};

  onSubmit = e => {
    e.preventDefault();
    const value = e.target.search.value;

    if (value.trim()) {
      this.setState(prevState => {
        if (prevState.value !== value) {
          return {
            value: value.trim(),
            page: 1,
            images: [],
          };
        }
      });
    } else {
      Notiflix.Notify.failure('The field cannot be empty.');
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.value !== this.state.value
    ) {
      const { API, KEY, per_page } = this.request;

      const searchParams = new URLSearchParams({
        q: this.state.value,
        page: this.state.page,
        key: KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: per_page,
      });

      this.setState({ isLoading: true });
      try {
        const response = await axios.get(`${API}/?${searchParams}`);
        if (!response.data.totalHits) {
          this.showLoadMore = false;

          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          if (this.state.page === 1) {
            this.setState({ images: [...response.data.hits] });
            Notiflix.Notify.info(
              `Hooray! We found ${response.data.totalHits} images.`
            );
          } else {
            this.setState({
              images: [...prevState.images, ...response.data.hits],
            });
          }

          if (per_page * this.state.page >= response.data.totalHits) {
            this.showLoadMore = false;
            Notiflix.Notify.warning(
              "We're sorry, but you've reached the end of search results."
            );
          } else {
            this.showLoadMore = true;
          }
        }
      } catch (error) {
        this.showLoadMore = false;
        Notiflix.Notify.failure(
          'Sorry, some error on the server. Please try again.'
        );
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onClickImage = e => {
    document.addEventListener('keydown', this.keyDown);
    this.modalData = {
      img: e.target.dataset.bgimage,
      alt: e.target.dataset.alt,
    };
    this.setState({
      isModal: !this.state.isModal,
    });
  };

  keyDown = e => {
    if (e.code === 'Escape') {
      document.removeEventListener('keydown', this.keyDown);
      this.setState({
        isModal: !this.state.isModal,
        modalData: {},
      });
    }
  };

  closeModal = e => {
    if (e.target === e.currentTarget) {
      document.removeEventListener('keydown', this.keyDown);
      this.setState({
        isModal: !this.state.isModal,
        modalData: {},
      });
    }
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          images={this.state.images}
          onClickImage={this.onClickImage}
        />
        {this.state.images[0] && this.showLoadMore && !this.state.isLoading && (
          <Button onClick={this.onClick} />
        )}
        {this.state.isLoading && <Loader />}
        {this.state.isModal && (
          <Modal data={this.modalData} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}
