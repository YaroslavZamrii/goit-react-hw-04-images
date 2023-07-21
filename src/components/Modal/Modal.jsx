import PropTypes from 'prop-types';
import { Component } from 'react';
import { Overlay, ModalContainer } from './Modal.styled';

class Modal extends Component {
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <Overlay onClick={this.handleOverlayClick}>
        <ModalContainer>
          <img src={this.props.imgModal} alt={this.props.tag} />
        </ModalContainer>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  imgModal: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

export default Modal;
