// ShoppingContext.js
import React, { createContext, useState } from 'react';
import {v4 as uuidv4} from 'uuid';

const ShoppingContext = createContext();


export const  ShoppingProvider = ({ children }) => {
  const [items, setItems] = useState([
  ]);

  const [editItem, setEditItem] = useState(null);
  const [filter, setFilter] = useState('');


   // Create an item
   const addItem = (item) => {
    const newItem = {
      id: uuidv4(),
      itemName: item
    };
    setItems([...items,newItem]);
  };

  // Function to update an item in the shopping list
  const updateItem = (itemId, newItem) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? newItem : item
    );
    setItems(updatedItems);
    setEditItem(null);
  };

  // Function to delete an item from the shopping list
  const deleteItem = (itemId) => {
    const filteredItems = items.filter((item) => item.id !== itemId);
    setItems(filteredItems);
  };

//set item to edit
  const editItemHandler = (item) => {
    setEditItem(item);
  };

  //to clear the form and filter text
  const clearList = () => {
    setItems([]);
  };

  //filter text 
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // filter item logic
  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(filter.toLowerCase())
  );

  //clear filter text
  const handleClearFilter = () => {
    setFilter('');
  };

  return (
    <ShoppingContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        deleteItem,editItemHandler,
        clearList,editItem,handleFilterChange,filteredItems,filter,handleClearFilter
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContext;
