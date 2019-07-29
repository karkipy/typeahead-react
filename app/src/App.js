import React from 'react';
import TypeAhead from 'typeahead-react-skeleton';
import './App.css';


function App() {
  return (
    <div style={{ margin: '100px', width: '600px' }}>
      <TypeAhead options={['Apple', 'Aeroplane', 'Ball', 'Basker']} />
    </div>
  );
}

export default App;
