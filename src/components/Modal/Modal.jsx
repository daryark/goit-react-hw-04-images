import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, Modal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export function ModalWindow({ modalData, closeModal }) {
  useEffect(() => {
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
    };
  });

  const closeOnEscape = e => {
    if (e.code === 'Escape') closeModal();
  };

  const closeOnBackdrop = e => {
    if (e.target === e.currentTarget) closeModal();
  };

  const { largeImg, tag } = modalData;
  return createPortal(
    <Backdrop onClick={closeOnBackdrop}>
      <Modal onKeyDown={closeOnEscape}>
        <img src={largeImg} alt={tag} />
      </Modal>
    </Backdrop>,
    modalRoot
  );
}
