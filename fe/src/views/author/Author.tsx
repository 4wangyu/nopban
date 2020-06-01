import React from 'react';
import SearchBar from '../../components/SearchBar';

const Author = () => {
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
        <h1>王小波</h1>
      </main>
    </>
  );
};

export default Author;
