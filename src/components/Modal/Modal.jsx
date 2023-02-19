import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, Modal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export function ModalWindow() {
  useEffect(() => {
    window.addEventListener('keydown', this.closeOnEscape);
    return () => {
      window.removeEventListener('keydown', this.closeOnEscape);
    };
  }, []);

  const closeOnEscape = e => {
    if (e.code === 'Escape') this.props.closeModal();
  };

  const closeOnBackdrop = e => {
    if (e.target === e.currentTarget) this.props.closeModal();
  };

  const { largeImg, tag } = this.props.modalData;

  return createPortal(
    <Backdrop onClick={closeOnBackdrop}>
      <Modal onKeyDown={closeOnEscape}>
        <img src={largeImg} alt={tag} />
      </Modal>
    </Backdrop>,
    modalRoot
  );
}
