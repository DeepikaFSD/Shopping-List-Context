// App.js
import React from 'react';
import './index.css'
import { ShoppingProvider } from './Context/ShoppingContext'
import ShoppingList from './Component/ShoppingList'

function App() {
  return (
    <ShoppingProvider>
      <ShoppingList />
    </ShoppingProvider>
  );
}

export default App;