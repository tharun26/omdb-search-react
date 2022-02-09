import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import SearchPage from './Components/SearchPage/SearchPage';
import { SearchResultContextProvider } from './Context/SearchResultContext';

function App(props) {
  return (
    <div className='App'>
      <SearchResultContextProvider>
        <Header />
        <SearchPage />
      </SearchResultContextProvider>
    </div>
  );
}

export default App;
