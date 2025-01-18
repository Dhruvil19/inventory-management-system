import React, { useEffect, useState } from 'react';
import API from '../services/api';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', quantity: '' });

  // Fetch inventory items from the API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await API.get('/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  // Delete an item
  const handleDelete = async (id) => {
    try {
      await API.delete(`/items/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Update an item
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      await API.put(`/items/${editingItem._id}`, editingItem);
      setItems(
        items.map((item) =>
          item._id === editingItem._id ? editingItem : item
        )
      );
      setEditingItem(null); // Reset editing state
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Add a new item
  const handleAddSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await API.post('/items', newItem);
      setItems([...items, response.data]);
      setNewItem({ name: '', quantity: '' }); // Reset new item form
    } catch (error) {
      console.error('Error adding new item:', error);
    }
  };

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <h1>Inventory Management System</h1>
        <button
          onClick={() => {
            localStorage.removeItem('token'); // Clear the token on logout
            window.location.href = '/'; // Redirect to login
          }}
        >
          Logout
        </button>
      </nav>

      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li>Dashboard</li>
          <li>Inventory</li>
          <li>Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h2>Inventory Items</h2>

        {/* Add New Item Form */}
        <form onSubmit={handleAddSubmit}>
          <input
            type="text"
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) =>
              setNewItem({ ...newItem, name: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: e.target.value })
            }
            required
          />
          <button type="submit">Add Item</button>
        </form>

        {/* Edit Form */}
        {editingItem && (
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              value={editingItem.name}
              onChange={(e) =>
                setEditingItem({ ...editingItem, name: e.target.value })
              }
              required
            />
            <input
              type="number"
              value={editingItem.quantity}
              onChange={(e) =>
                setEditingItem({ ...editingItem, quantity: e.target.value })
              }
              required
            />
            <button type="submit">Save Changes</button>
            <button onClick={() => setEditingItem(null)}>Cancel</button>
          </form>
        )}

        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button onClick={() => setEditingItem(item)}>Edit</button>
                    <button onClick={() => handleDelete(item._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No items found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
