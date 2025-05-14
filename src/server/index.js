import express from 'express';
import cors from 'cors';
import { query } from '../db/index.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/military-entities', async (req, res) => {
  try {
    const result = await query('SELECT * FROM entities ORDER BY last_update DESC');
    
    const formattedEntities = result.rows.map(entity => ({
      id: entity.id,
      name: entity.name,
      sidc: entity.sidc,
      position: {
        latitude: entity.position_lat,
        longitude: entity.position_lng
      },
      status: entity.status,
      threatLevel: entity.threat_level,
      lastUpdate: new Date(entity.last_update).toISOString()
    }));
    
    res.json(formattedEntities);
  } catch (error) {
    console.error('Error fetching entities:', error);
    res.status(500).json({ 
      error: 'Failed to fetch entities',
      details: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});