import { GlobalStyle } from './GlobalStyle';
import { useState } from 'react';
import { Searchbar } from './SearchBar/SearchBar';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Layout } from './Layout/Layout';

export const App = () => {
  const [imageName, setImageName] = useState('');

  const handleFormSubmit = imageName => {
    setImageName(imageName);
  };

  return (
    <Layout>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery image={imageName} />
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
