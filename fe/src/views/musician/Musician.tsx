import React from 'react';
import SearchBar from '../../components/SearchBar';

const Musician = () => {
  const [searchKey, setSearchKey] = React.useState<string>('');
  function search() {}

  return (
    <>
      <SearchBar
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        onButtonClick={search}
      ></SearchBar>
      <main>
        <h1>17 Hippies</h1>
      </main>
    </>
  );
};

export default Musician;
