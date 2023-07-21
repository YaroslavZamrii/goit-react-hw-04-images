import { useState, useEffect } from 'react';
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

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({
    isOpen: false,
    imgModal: null,
    tags: '',
  });

  const searchQuery = query => {
    setQuery(query);
    setPage(1);
  };

  const clickBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onOpenModal = (imgUrl, tags) => {
    setModal({ isOpen: true, imgModal: imgUrl, tags });
  };

  const onCloseModal = () => {
    setModal({ isOpen: false, imgModal: null, tags: '' });
  };

  useEffect(() => {
    const requestImages = async (query, page) => {
      try {
        setIsLoading(true);
        const searchImgResult = await fetchImg(query, page);

        setImages(prevImg =>
          page === 1
            ? searchImgResult.hits
            : [...prevImg, ...searchImgResult.hits]
        );

        setLoadMore(page < Math.ceil(searchImgResult.totalHits / 12));

        searchImgResult.total > 0
          ? toast.success('Your images were successfully fetched!', toastConfig)
          : toast.info(`Opps... .Your ${query} was not found.`, toastConfig);
      } catch (error) {
        setError(error.message);
        toast.error(error.message, toastConfig);
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length === 0 && page === 1) return;
    requestImages(query, page);
  }, [query, page]);

  return (
    <Container>
      <Searchbar onSubmit={searchQuery} />
      <Loader isLoading={isLoading} />
      <ImageCallery images={images} openModal={onOpenModal} />
      {loadMore && <Button onClick={clickBtn} />}
      {modal.isOpen && (
        <Modal
          imgModal={modal.imgModal}
          tag={modal.tags}
          onClose={onCloseModal}
        />
      )}
    </Container>
  );
};
