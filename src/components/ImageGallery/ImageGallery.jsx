import { ImageErrorView } from 'components/ImageErrorViews/ImageErrorView';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { fetchImages } from 'services/fetchImages';
import { Button } from 'components/SearchBar/Button/Button';
import { toast } from 'react-toastify';
import { Gallery } from './ImageGallery.styled';
import { Notif } from './ImageGallery.styled';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const ImageGallery = ({ image }) => {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const updateData = async () => {
      try {
        if (!image) {
          return;
        }
        if (page !== 1) {
          setStatus(Status.PENDING);
        } else {
          setStatus(Status.PENDING);
          setImages([]);
          setPage(1);
        }

        const fetchedImages = await fetchImages(image, page);
        if (image.trim() === '' || !fetchedImages.length) {
          toast.error(`Sorry, but there are no pictures with ${image}`);
        }

        const totalPages = Math.ceil(fetchedImages.totalHits / 12);
        setImages(prevImages => [...prevImages, ...fetchedImages]);
        setStatus(Status.RESOLVED);
        setTotalPages(totalPages);
      } catch (error) {
        setStatus(Status.REJECTED);
        setError(error);
        toast.error('Something went wrong');
      }
    };
    updateData();
  }, [image, page]);

  const loadMoreBtnClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (status === Status.IDLE) {
    return <Notif>Please, enter a search query</Notif>;
  }

  if (status === Status.PENDING) {
    return <Loader />;
  }

  if (status === Status.REJECTED) {
    return <ImageErrorView />;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        <Gallery>
          {images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
        </Gallery>
        {images.length >= 12 &&
          (page < totalPages || images.length % 12 === 0) && (
            <Button onClick={loadMoreBtnClick} />
          )}
        {images.length === 0 && <ImageErrorView />}
      </>
    );
  }
};

// export class ImageGallery extends Component {
//   state = {
//     image: '',
//     images: [],
//     status: Status.IDLE,
//     error: null,
//     page: 1,
//     totalPages: 0,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const { page } = this.state;
//     const prevName = prevProps.image;
//     const nextName = this.props.image;
//     if (prevName !== nextName || prevState.page !== page) {
//       try {
//         if (prevState.page !== page) {
//           this.setState({
//             status: Status.PENDING,
//           });
//         } else {
//           this.setState({
//             status: Status.PENDING,
//             images: [],
//             page: 1,
//           });
//         }

//         const images = await fetchImages(nextName, page);
//         if (nextName.trim() === '' || !images.length) {
//           toast.error(`Sorry, but there are no pictures with ${nextName}`);
//         }

//         const totalPages = Math.ceil(images.totalHits / 12);
//         this.setState(prevState => ({
//           images: [...prevState.images, ...images],
//           status: Status.RESOLVED,
//           totalPages: totalPages,
//         }));
//       } catch (error) {
//         this.setState({ status: Status.REJECTED });
//         toast.error('Something went wrong');
//       }
//     }
//   }

//   loadMoreBtnClick = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const { status, images, totalPages, page } = this.state;
//     if (status === Status.IDLE) {
//       return <Notif>Please, enter a search query</Notif>;
//     }

//     if (status === Status.PENDING) {
//       return <Loader />;
//     }

//     if (status === Status.REJECTED) {
//       return <ImageErrorView />;
//     }

//     if (status === Status.RESOLVED) {
//       return (
//         <>
//           <Gallery>
//             {images.map(image => (
//               <ImageGalleryItem key={image.id} image={image} />
//             ))}
//           </Gallery>
//           {images.length >= 12 &&
//             (page < totalPages || images.length % 12 === 0) && (
//               <Button onClick={this.loadMoreBtnClick} />
//             )}
//           {images.length === 0 && <ImageErrorView />}
//         </>
//       );
//     }
//   }
// }
