import { useState, createContext } from 'react';
import './App.css';
import Home from './pages/Home';
import Welcome from './pages/welcome';
import List from './pages/list';
import Add from './pages/add';

export const PageContext = createContext<{
  currentPage: string;
  setCurrentPage: (page: string) => void;
}>({
  currentPage: 'error',
  setCurrentPage: () => {throw new Error('setCurrentPage function not implemented');},
});

const pages: { [key: string]: React.FunctionComponent } = {
  Welcome,
  List,
  Add,
  Home,
};

function App() {
  const [currentPage, setCurrentPage] = useState<string>('Welcome');
  const PageComponent = pages[currentPage] || Welcome;

  
  function handlePageChange(page: string) {
    window.history.pushState(null, page, `/${page.toLowerCase()}`);
    setCurrentPage(page);
  }

  const contextValue = {
    currentPage,
    setCurrentPage: handlePageChange,
  };
  
  return (
    <PageContext.Provider value={contextValue}>
      <PageComponent />
    </PageContext.Provider>
  );
}

export default App;
