
import React from 'react';
import Rotas from './rotas';
import '../custom.css';
import Header from '../components/header';
import Footer from '../components/footer';


function App() {
  return (

    <div className="App" >
      <Header />
      <div className="content">
        <Rotas />
      </div>
      <Footer />
    </div>
  );
}

export default App;
