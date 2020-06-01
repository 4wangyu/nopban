import React from 'react';
import SearchBar from '../../components/SearchBar';

const Music = () => {
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
        <h1>Tank!</h1>
      </main>
    </>
  );
};

export default Music;
