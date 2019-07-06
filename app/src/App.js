import React from 'react';
import TypeAhead from 'typeahead-lib';
import './App.css';


function App() {
  return (
    <div style={{ margin: '100px', width: '600px' }}>
      <TypeAhead options={['Apple', 'Aeroplane', 'Ball', 'Basker']} />
    </div>
  );
}

export default App;
