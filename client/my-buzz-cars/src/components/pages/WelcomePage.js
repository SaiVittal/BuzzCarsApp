  // WelcomeScreen.js
  import React from 'react';
  import SearchBar from '../SearchBar';
  import Table from '../Table';

  const WelcomeScreen = ({ onSearch, tableData,isLoading }) => {
    return (
      <div>
        <SearchBar onSearch={onSearch} />
        {isLoading ? (  
          <p>Loading...</p>
        ) : (
          <Table data={tableData} />
        )}
      </div>
    );
  };

  export default WelcomeScreen;
