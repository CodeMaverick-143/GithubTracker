import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RepositoryList = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch repositories from the Django API
  useEffect(() => {
    axios
      .get('/api/repositories/')
      .then((response) => {
        setRepositories(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching repositories:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading repositories...</p>;
  if (error) return <p>Error fetching repositories: {error.message}</p>;

  return (
    <div>
      <h2>Repositories</h2>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.name} by {repo.owner}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepositoryList;
