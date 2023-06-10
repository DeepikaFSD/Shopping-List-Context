import React, { useContext,useEffect,useState } from 'react';
import ShoppingContext from '../Context/ShoppingContext';
import {FaTimes, FaEdit,FaPlus} from 'react-icons/fa';


function ShoppingList() {
  const {items,addItem, updateItem, deleteItem,editItem,editItemHandler,clearList,filter,handleClearFilter,filteredItems,
    handleFilterChange} = useContext(ShoppingContext);

  const[inputValue,setInputValue]=useState('');
 
  // Function to handle adding an item
  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      alert('Please enter an item name');
      return;
    }

    if (editItem) {
      updateItem(editItem.id, {
        id: editItem.id,
        itemName: inputValue
      });
      setInputValue('');
    } else {
      addItem(inputValue);
      setInputValue('');
    }
  };
  
  
// handle edit
  const handleEdit = (item) => {
    setInputValue(item.itemName);
    editItemHandler(item);
  };

  //delete selected item
  const handleDelete = (itemId) => {
    deleteItem(itemId);
    if (editItem && editItem.id === itemId) {
      editItemHandler(null);
    }
  };

  //clear all on btn clear click
  const handleClear = () => {
  clearList();
  handleClearFilter();
  };
   

  return (
    <div className='container'>
        <><header className='header'>
    <h1>Shopping List</h1>
</header>
<form id="item-form" onSubmit={handleSubmit}>
        <div className="form-control">
            <input
                type="text"
                className="form-input"
                id="item-input"
                name="item"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter Item"
                />
        </div>
        <div className="form-control">
            <button type="submit" class="btn">
                <FaPlus color='white'/>
                {editItem ? ' Update ' : ' Add '}
            </button>
        </div>
    </form>
     <div className="filter">
     <input
       type="text"
       class="form-input-filter"
       id="filter"
       placeholder="Filter Items"
       value={filter}
       onChange={handleFilterChange}
     />
   </div>
  
   <ul id="item-list" className="items">
      {items.map((item) => (
         filteredItems.includes(item) && 
        <><li key={item.id}>{item.itemName}{filteredItems.includes(item)}
        <button onClick={() => handleDelete(item.id)} className='close'>
        <FaTimes color="purple"/>
            </button>
         <button className='edit' onClick={() => handleEdit(item)}>
         <FaEdit color='purple'/>
            </button>
        </li>
         </>
      ))}
    </ul>

   
    
  
  <button id="clear" className="btn-clear" onClick={handleClear}>clear All</button>
  
</>      
</div>  
  );
      
      }

export default  ShoppingList;