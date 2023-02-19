import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Searchbar,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
  SearchIcon,
} from './Searchbar.styled';

export function Form({ submit }) {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;

    submit(value.trim().toLowerCase());
    setValue('');
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormInput
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
        />
        <SearchFormBtn type="submit">
          <SearchIcon />
        </SearchFormBtn>
      </SearchForm>
    </Searchbar>
  );
}

Searchbar.propTypes = {
  submit: PropTypes.func,
  prevValue: PropTypes.string,
};
