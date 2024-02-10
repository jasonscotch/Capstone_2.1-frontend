import { useState } from 'react';
import Modal from './Modal'; 

const Inventory = ({ inventoryItems, setInventoryItems }) => {
  const [newItem, setNewItem] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const addItem = () => {
    if (newItem.trim() !== '') {
      const newItemObject = { item_name: newItem, effect_name: 'normal' };
      setInventoryItems([...inventoryItems, newItemObject]);
      setNewItem('');
    }
  };

  const editItem = (index, editedValue) => {
    const updatedItems = [...inventoryItems];
    updatedItems[index] = editedValue;
    setInventoryItems(updatedItems);
  };

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const deleteItem = () => {
    if (selectedItem) {
      const updatedItems = inventoryItems.filter(item => item !== selectedItem);
      setInventoryItems(updatedItems);
      closeModal();
    }
  };

  return (
    <div className='inventory' style={{ maxHeight: '20vh', overflowY: 'auto' }}>
      <h4>Inventory</h4>
      <ul>
        {inventoryItems.map((item, index) => (
          <li
            key={index}
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => openModal(item)}
          >
            <div>
              <strong>{item.item_name}</strong>
            </div>
          </li>
        ))}
      </ul>
      <div className='rpgui-container framed-grey'>
        <input
          type="text"
          placeholder="Type item name..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </div>

      {selectedItem && (
        <Modal isOpen={true} onClose={closeModal} footer={<button onClick={deleteItem}>Delete</button>}>
          <h2>{selectedItem.item_name}</h2>
          <p>{selectedItem.description || selectedItem.effect_name}</p>
        </Modal>
      )}
    </div>
  );
};

export default Inventory;
