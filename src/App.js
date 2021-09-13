import './App.css';

import { AllProductRatings } from './AllProductRatings';

import { DataProvider } from './components/DataContext';

function App() {
  return (
    <DataProvider>
      <div className="app">
        <AllProductRatings />
      </div>
    </DataProvider>
  );
}

export default App;
