import React, { useContext,useState } from 'react';
import ShoppingContext from '../Context/ShoppingContext';
import {FaTimes, FaEdit,FaPlus} from 'react-icons/fa';


function ShoppingList() {
  const {items,addItem, updateItem, deleteItem,editItem,editItemHandler,clearList,filter,handleClearFilter,filteredItems,
    handleFilterChange} = useContext(ShoppingContext);

  const[inputValue,setInputValue]=useState('');
 
  // Function to handle adding an item
  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue === '') {
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
        <div className='shopimg'/>
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
       className="form-input-filter"
       id="filter"
       placeholder="Filter Items"
       value={filter}
       onChange={handleFilterChange}
     />
   </div>
   <ul id="list-container" className='items'> 
      {items.map((item) => (
         filteredItems.includes(item) && 
        <><li id="item-list" key={item.id}>{item.itemName}
         <div class="button-group">
        <button className='edit-button' onClick={() => handleEdit(item)}>
         <FaEdit color='purple'/>
            </button>
        <button  className='close-button' onClick={() => handleDelete(item.id)} >
        <FaTimes color="purple"/>
            </button>
            </div>
        </li>
         </>
      ))}
    </ul>
  <button id="clear" className="btn-clear" onClick={handleClear}>Clear All</button>
</>      
</div>  
  );
}

export default  ShoppingList;