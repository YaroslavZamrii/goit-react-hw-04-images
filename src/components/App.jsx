import { Component } from 'react';
import { toast } from 'react-toastify';

import Searchbar from './Searchbar/Searchbar';
import ImageCallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

import { Container } from './App.styled';
import { fetchImg } from 'services/api';
import 'react-toastify/dist/ReactToastify.css';

const toastConfig = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    loadMore: false,
    isLoading: false,
    error: null,
    modal: { isOpen: false, imgModal: null, tags: '' },
  };

  searchQuery = query => {
    this.setState({ query, page: 1 });
  };

  clickBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onOpenModal = (imgUrl, tags) => {
    this.setState({ modal: { isOpen: true, imgModal: imgUrl, tags } });
  };
  onCloseModal = () => {
    this.setState({ modal: { isOpen: false, imgModal: null, tags: '' } });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    )
      try {
        this.setState({ isLoading: true });
        const searchImgResult = await fetchImg(
          this.state.query,
          this.state.page
        );
        this.setState(prev => ({
          images:
            this.state.page === 1
              ? searchImgResult.hits
              : [...prev.images, ...searchImgResult.hits],
          loadMore: this.state.page < Math.ceil(searchImgResult.totalHits / 12),
        }));
        searchImgResult.total > 0
          ? toast.success('Your images were successfully fetched!', toastConfig)
          : toast.info(
              `Opps... .Your ${this.state.query} was not found.`,
              toastConfig
            );
      } catch (error) {
        this.setState({ error: error.message });
        toast.error(error.message, toastConfig);
      } finally {
        this.setState({ isLoading: false });
      }
  }

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.searchQuery} />
        <Loader isLoading={this.state.isLoading} />
        <ImageCallery images={this.state.images} openModal={this.onOpenModal} />
        {this.state.loadMore && <Button onClick={this.clickBtn} />}
        {this.state.modal.isOpen && (
          <Modal
            imgModal={this.state.modal.imgModal}
            tag={this.state.modal.tags}
            onClose={this.onCloseModal}
          />
        )}
      </Container>
    );
  }
}
