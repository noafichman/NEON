import { useState, useEffect } from 'react';
import { MilitaryEntity } from '../types/entities';

// Use relative URL to ensure it works in all environments
const API_URL = '/api';

export const useMilitaryEntities = () => {
  const [entities, setEntities] = useState<MilitaryEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchEntities = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/military-entities`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEntities(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching entities:', err);
        setError('Failed to load entity data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEntities();
  }, []);
  
  const refreshEntities = async () => {
    const fetchEntities = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/military-entities`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEntities(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching entities:', err);
        setError('Failed to load entity data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    await fetchEntities();
  };
  
  return {
    entities,
    loading,
    error,
    refreshEntities
  };
};