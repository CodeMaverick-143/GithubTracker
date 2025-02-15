import { useState } from 'react';
import axios from 'axios';

const RepositoryForm = ({ onRepositoryAdded }) => {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRepo = { name, owner, url, description };
      const response = await axios.post('/api/repositories/', newRepo);
      // Call the callback with the new repository
      if (onRepositoryAdded) {
        onRepositoryAdded(response.data);
      }
      // Reset form fields
      setName('');
      setOwner('');
      setUrl('');
      setDescription('');
    } catch (err) {
      console.error('Error adding repository:', err);
      setError(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Repository</h2>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Owner:
          <input
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          URL:
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Add Repository</button>
    </form>
  );
};

export default RepositoryForm;
