import { Component } from 'react';
// import { BiSearchAlt } from 'react-icons/bi';
import {
  Searchbar,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
  SearchIcon,
} from './Searchbar.styled';

export class Form extends Component {
  state = {
    value: '',
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const value = this.state.value.trim().toLowerCase();
    if (!value) return;

    this.props.submit(value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <Searchbar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormInput
            onChange={this.handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
          />
          <SearchFormBtn type="submit">
            <SearchIcon />
          </SearchFormBtn>
        </SearchForm>
      </Searchbar>
    );
  }
}
