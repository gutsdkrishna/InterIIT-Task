const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // Include this line to parse JSON request bodies

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// MongoDB Collections
const db = mongoose.connection.useDb('godown');
const Godown = db.collection('godowns');
const Item = db.collection('items');

// API to fetch godowns from MongoDB
app.get('/api/godowns', async (req, res) => {
  try {
    const godowns = await Godown.find().toArray();
    res.json(godowns);
  } catch (error) {
    console.error('Error fetching godowns:', error); // Debug log
    res.status(500).json({ error: 'Error fetching godowns' });
  }
});

// API to fetch items based on godown_id from MongoDB
app.get('/api/items', async (req, res) => {
  const godownId = req.query.godown_id;
  try {
    const filteredItems = await Item.find({ godown_id: godownId }).toArray();
    res.json(filteredItems);
  } catch (error) {
    console.error('Error fetching items:', error); // Debug log
    res.status(500).json({ error: 'Error fetching items' });
  }
});

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Global item search by name (ignoring godown_id)
// Global item search by name and category
app.get('/api/search-items', async (req, res) => {
  const searchTerm = req.query.search_term;
  const category = req.query.category;
  const query = {
    name: { $regex: searchTerm, $options: 'i' },  // Search by item name
  };
  
  if (category) {
    query.category = category;  // Filter by category if selected
  }

  try {
    const matchingItems = await Item.find(query).toArray();
    res.json(matchingItems);
  } catch (error) {
    console.error('Error searching items:', error);
    res.status(500).json({ error: 'Error searching items' });
  }
});


