import './App.css';
import Header from './components/Header';
import NasaPic from './components/NasaPic';

const App = () => {
  return(
    <>
      <div class="front-page-container">
        <div className="app">
        <Header />
        </div>
      </div>
      <NasaPic />
    </>
  );
};

export default App;

