import { useState, useEffect } from 'react';
import { fetchImages } from '../api';
import { Container } from 'components/App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [gallery, setGallery] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    const getImages = async () => {
      try {
        setIsLoading(true);
        const response = await fetchImages(query, page);
        const totalImages = response.total;
        const gallery = response.hits;
        setGallery(state => [...state, ...gallery]);
        setTotalImages(totalImages);
      } catch {
        // setError('Failed to load gallary :(');
        toast.error('Failed to load gallary, please reload the page');
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [page, query]);

  useEffect(() => {
    if (totalImages && totalImages === gallery.length) {
      toast.warn('There is no more imeges to load, on such query');
    }
    return;
  }, [gallery, totalImages]);

  const querySubmit = query => {
    setQuery(query);
    setPage(1);
    setGallery([]);
    // setError(null);
  };

  const onLargeImageURL = largeImageURL => {
    setLargeImageURL(largeImageURL);
  };

  const loadMore = () => {
    setPage(state => state + 1);
  };

  const closeModal = () => {
    setLargeImageURL(null);
  };

  const isLoadMoreBtn = gallery.length > 0 && !isLoading;

  return (
    <Container>
      <Searchbar onSubmit={querySubmit} />
      <ImageGallery gallery={gallery} query={query} onClick={onLargeImageURL} />
      {isLoading && <Loader />}
      {isLoadMoreBtn && <Button onClick={loadMore} />}
      <ToastContainer autoClose={3000} />
      {largeImageURL && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal} />
      )}
    </Container>
  );
};
