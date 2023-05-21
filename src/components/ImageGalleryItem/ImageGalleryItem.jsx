import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { Image, ImgWrap } from './ImageGalleryItem.styled';
// import { GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const toggleModal = () => {
    setIsShowModal(!isShowModal);
  };

  return (
    <div>
      <ImgWrap onClick={toggleModal}>
        <Image
          loading="lazy"
          src={image.webformatURL}
          alt={image.tags}
          width="320"
        />
      </ImgWrap>
      {isShowModal && (
        <Modal onModalClose={toggleModal}>
          <img loading="lazy" src={image.largeImageURL} alt={image.tags} />
        </Modal>
      )}
    </div>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};

// export class ImageGalleryItem extends Component {
//   state = {
//     selectedImg: null,
//     isShowModal: false,
//   };

//   toggleModal = () => {
//     this.setState(({ isShowModal }) => ({
//       isShowModal: !isShowModal,
//     }));
//   };

//   setSelectedImg = () => {
//     this.setState({ selectedImg: this.props.image.largeImageURL });
//   };

//   render() {
//     const { largeImageURL, tags } = this.props.image;
//     const { image } = this.props;
//     const { isShowModal } = this.state;

//     return (
//       <div>
//         <div onClick={() => this.toggleModal(largeImageURL)}>
//           <Image
//             loading="lazy"
//             src={image.webformatURL}
//             alt={image.tags}
//             width="320"
//           />
//         </div>
//         {isShowModal && (
//           <Modal onModalClose={this.toggleModal}>
//             <img loading="lazy" src={largeImageURL} alt={tags} />
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }

// ImageGalleryItem.propTypes = {
//   image: PropTypes.shape({
//     largeImageURL: PropTypes.string.isRequired,
//     tags: PropTypes.string.isRequired,
//   }).isRequired,
// };
