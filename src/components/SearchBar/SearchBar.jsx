import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { SearchBar } from './SearchBar.styled';
import { SearchButton } from './SearchBar.styled';
import { SearchBtnLabel } from './SearchBar.styled';
import { FiSearch } from 'react-icons/fi';
import { SearchFormInput } from './SearchBar.styled';
import { SearchForm } from './SearchBar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handleNameChange = event => {
    setImageName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (imageName.trim() === '') {
      toast.error('Please, enter something');
      return;
    }
    onSubmit(imageName);
    setImageName('');
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <FiSearch size="20" />
          <SearchBtnLabel />
        </SearchButton>
        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imageName}
          onChange={handleNameChange}
        />
      </SearchForm>
    </SearchBar>
  );
};

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};

// export class Searchbar extends Component {
//   state = {
//     imageName: '',
//   };

//   handleNameChange = event => {
//     this.setState({ imageName: event.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     if (this.state.imageName.trim() === '') {
//       toast.error('Please, enter something');
//       return;
//     }
//     this.props.onSubmit(this.state.imageName);
//     this.setState(this.setState({ imageName: '' }));
//   };

//   render() {
//     return (
//       <SearchBar>
//         <SearchForm onSubmit={this.handleSubmit}>
//           <SearchButton type="submit">
//             <FiSearch size="20" />
//             <SearchBtnLabel />
//           </SearchButton>
//           <SearchFormInput
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.imageName}
//             onChange={this.handleNameChange}
//           />
//         </SearchForm>
//       </SearchBar>
//     );
//   }
// }

// Searchbar.propType = {
//   onSubmit: PropTypes.func.isRequired,
// };
