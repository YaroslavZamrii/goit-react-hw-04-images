import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, ModalContainer } from './Modal.styled';

const Modal = ({ onClose, imgModal, tag }) => {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handleWindowKeyDown = e => {
      handleKeyDown(e);
    };

    window.addEventListener('keydown', handleWindowKeyDown);

    return () => {
      window.removeEventListener('keydown', handleWindowKeyDown);
    };
  }, []);

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
