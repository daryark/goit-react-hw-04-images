import { useState, useEffect } from 'react';
import React from 'react';

import { getImages as fetchImg } from 'service/image-service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import {
  Form,
  Btn,
  Loader,
  ModalWindow,
  ImageGallery,
  messageSettings,
} from 'components';
import { ToastMessage } from 'components/ToastMessage/ToastMessage.styled';

export function App() {
  const [value, setValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (!value) {
      return;
    }
    async function getImages() {
      try {
        setLoading(true);

        const data = await fetchImg(value, page);
        const { hits, total } = data;

        if (page === 1 && !hits.length) {
          toast('🤷‍♀️ Sorry, no images found by your request', messageSettings);
        }
        setImages(prev => [...prev, ...hits]);
        setTotal(total);
      } catch (error) {
        toast.error(`🙆‍♂️ Oops... ${error.message}`, messageSettings);
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [value, page]);

  const getValue = inputValue => {
    if (inputValue === value) {
      toast(
        `🤷‍♀️ Hey, you already have '${value}' shown, find something new!`,
        messageSettings
      );
      return;
    }
    setValue(inputValue);
    setPage(1);
    setTotal(0);
    setImages([]);
  };

  const handleChangePage = () => {
    setPage(prev => prev + 1);
  };

  const toggleModal = (modalData = null) => {
    setModalData(modalData);
  };

  const limit = total !== images.length;
  return (
    <>
      <Form submit={getValue} />
      <ImageGallery photos={images} openModal={toggleModal} />
      {images.length > 0 && limit && (
        <Btn text="Load more" btnClick={handleChangePage} disabled={!loading} />
      )}

      {/* {error !== null && <b>{error}</b>} */}
      {loading && <Loader />}
      {modalData !== null && (
        <ModalWindow closeModal={toggleModal} modalData={modalData} />
      )}
      <ToastMessage />
    </>
  );
}
