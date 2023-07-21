import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, ModalContainer } from './Modal.styled';

const Modal = ({ onClose, imgModal, tag }) => {
  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer>
        <img src={imgModal} alt={tag} />
      </ModalContainer>
    </Overlay>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  imgModal: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

export default Modal;
