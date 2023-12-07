// Search/SearchBar.js
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import SearchResultModal from './SearchResultModal';
import hiveService from 'api/services/hiveService';
import { useEffect } from 'react';

const SearchBar = ({ loadingStates, handleUnfollow, handleFollow, trailerType }) => {
  const [searchUsername, setSearchUsername] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state

  const handleSearch = async () => {
    if (searchUsername) {
      setLoading(true); // Set loading to true when starting the search

      try {
        const result = await hiveService.searchUsername(searchUsername, trailerType);
        const user = result?.data?.data;

        if (user?.hive_user.length !== 0) {
          setSearchResult(user);
          setShowModal(true);
        } else {
          window.alert('No User Found');
        }

      } catch (error) {
        console.error('Error making the request:', error);
      } finally {
        setLoading(false); // Set loading to false when the search is complete
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <Form.Control
          style={{ height: '44px' }}
          placeholder="Find a @username"
          maxLength={16}
          onChange={(e) => setSearchUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant={!loading ? "outline-secondary" : "outline-warning"}
          id="button-addon2"
          onClick={() => handleSearch()}
          disabled={loading} // Disable the button when loading
        >
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </InputGroup>

      <SearchResultModal
        show={showModal}
        loadingStates={loadingStates}
        handleUnfollow={handleUnfollow}
        handleFollow={handleFollow}
        handleClose={handleCloseModal}
        user={searchResult}
      />
    </div>
  );
};

export default SearchBar;
