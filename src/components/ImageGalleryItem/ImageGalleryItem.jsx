import PropTypes from 'prop-types';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

function ImageGalleryItem({ items, openModal }) {
  return (
    <>
      {items.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <GalleryItem key={id}>
            <GalleryImg
              onClick={() => openModal(largeImageURL, tags)}
              src={webformatURL}
              alt={tags}
              loading="lazy"
            />
          </GalleryItem>
        );
      })}
    </>
  );
}

ImageGalleryItem.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
