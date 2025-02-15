import React, { useState } from 'react';
import RepositoryList from './components/RepositoryList';
import RepositoryForm from './components/RepositoryForm';

function App() {
  // Optional: maintain a state to trigger reloading the repository list after adding a new repo.
  const [reloadList, setReloadList] = useState(false);

  // Callback function when a repository is added
  const handleRepositoryAdded = (newRepo) => {
    // Toggle reload state to trigger re-render of RepositoryList if needed.
    // Alternatively, you could pass the new repository to RepositoryList if you manage the state at this level.
    setReloadList(!reloadList);
  };

  return (
    <div>
      <h1>GitHub Tracker</h1>
      <RepositoryForm onRepositoryAdded={handleRepositoryAdded} />
      {/* The RepositoryList component re-fetches data on mount.
          You could also pass `reloadList` as a prop to force update if you wish. */}
      <RepositoryList key={reloadList} />
    </div>
  );
}

export default App;
