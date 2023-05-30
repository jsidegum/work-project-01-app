
import React from 'react';
import Login from './views/login';
import CenteredCard from './components/card';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <p>
    //       App.js
    //     </p>
    //   </header>
    // </div>

    <div className="App">
      <>
        <CenteredCard title="Faça seu Login">
          <Login />
        </CenteredCard>
      </>

    </div>
  );
}

export default App;
