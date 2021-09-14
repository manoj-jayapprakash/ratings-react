import './App.css';

import { AllProductRatings } from './components/AllProductRatings';

// import { AddReviewModal } from './components/AddReviewModal';

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
