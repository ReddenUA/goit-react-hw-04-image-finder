import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ImageModal, Overlay } from './Modal.styled';

export const Modal = ({ onClose, largeImageURL }) => {
  useEffect(() => {
    console.log('Добавил');
    window.addEventListener('keydown', handleClose);

    return () => {
      console.log('Снял');
      window.removeEventListener('keydown', handleClose);
    };
  });

  const handleClose = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) {
      onClose();
    }
  };
  // commit failed lights is gone

  return (
    <Overlay onClick={handleClose}>
      <ImageModal>
        <img src={largeImageURL} alt="" />
      </ImageModal>
    </Overlay>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
