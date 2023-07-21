import PropTypes from 'prop-types';
import { Component } from 'react';
import {
  Header,
  SearchForm,
  SearchButton,
  SearchButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const searchQuery = form.elements.search.value;
    this.props.onSubmit(searchQuery);
    form.reset();
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <SearchButtonLabel>Search</SearchButtonLabel>
          </SearchButton>

          <SearchFormInput
            name="search"
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Searchbar;
