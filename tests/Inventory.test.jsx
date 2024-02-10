import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Inventory from '../src/Inventory';
import Modal from '../src/Modal';

vi.mock('../src/Modal', () => ({
  __esModule: true,
  default: vi.fn(() => <div>Mocked Modal</div>),
}));

describe('Inventory', () => {
  let inventoryItems, setInventoryItems;

  beforeEach(() => {
    inventoryItems = [{ item_name: 'Sword', effect_name: 'normal' }];
    setInventoryItems = vi.fn();
  });

  it('renders correctly with initial props', () => {
    render(<Inventory inventoryItems={inventoryItems} setInventoryItems={setInventoryItems} />);
    
    expect(screen.getByText('Inventory')).toBeInTheDocument();
    expect(screen.getByText('Sword')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type item name...')).toBeInTheDocument();
  });

  it('adds a new item to the inventory', () => {
    render(<Inventory inventoryItems={inventoryItems} setInventoryItems={setInventoryItems} />);
    
    fireEvent.change(screen.getByPlaceholderText('Type item name...'), { target: { value: 'Shield' } });
    fireEvent.click(screen.getByText('Add Item'));
    
    expect(setInventoryItems).toHaveBeenCalledWith([...inventoryItems, { item_name: 'Shield', effect_name: 'normal' }]);
  });

  it('opens the modal', () => {
    render(<Inventory inventoryItems={inventoryItems} setInventoryItems={setInventoryItems} />);
    
    fireEvent.click(screen.getByText('Sword'));
    expect(Modal).toHaveBeenCalled();
    
  });

});
