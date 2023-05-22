import { GlobalStyle } from './GlobalStyle';
import { useState } from 'react';
import { Searchbar } from './SearchBar/SearchBar';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Layout } from './Layout/Layout';

export const App = () => {
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setPage(1);
  };

  const loadMoreBtnClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Layout>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery image={imageName} page={page} loadMore={loadMoreBtnClick} />
      <ToastContainer autoClose={2500} />
      <GlobalStyle />
    </Layout>
  );
};

// export class App extends Component {
//   state = {
//     imageName: '',
//   };

//   handleFormSubmit = imageName => this.setState({ imageName });
//   render() {
//     return (
//       <Layout>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         <ImageGallery image={this.state.imageName} />
//         <ToastContainer autoClose={2500} />
//         <GlobalStyle />
//       </Layout>
//     );
//   }
// }
