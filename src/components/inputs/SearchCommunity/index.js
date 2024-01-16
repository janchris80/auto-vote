import { Form, Button, ListGroup, Row, Container, Col, Badge } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const SearchCommunity = ({ username, trailerType, trailer }) => {
  const { user } = useSelector((state) => state.auth);
  const [communityData, setCommunityData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [excludedCommunities, setExcludedCommunities] = useState([]);

  // Function to fetch data from localStorage
  const fetchDataFromLocalStorage = () => {
    const storedData = localStorage.getItem('communityData');
    if (storedData) {
      setCommunityData(JSON.parse(storedData));
    }

    const storedExcludedCommunities = localStorage.getItem(`excludedCommunities`);
    if (storedExcludedCommunities) {
      setExcludedCommunities(JSON.parse(storedExcludedCommunities));
    }
  };

  // Effect to fetch data on component mount
  useEffect(() => {
    fetchDataFromLocalStorage();

    if (trailer) {
      const excludedCommunity = trailer?.excludedCommunities[0];
      if (excludedCommunity) {
        updateLocalStorage(JSON.parse(excludedCommunity?.list));
      }
    }
  }, [username]);

  // Function to handle adding/removing communities to/from the excluded list
  const handleToggleExcluded = (name) => {
    setExcludedCommunities((prevExcluded) => {
      const updatedExcluded = prevExcluded.includes(name)
        ? prevExcluded.filter((item) => item !== name)
        : [...prevExcluded, name];

      // Save updated excludedCommunities to localStorage
      updateLocalStorage(updatedExcluded);

      return updatedExcluded;
    });
  };

  const updateLocalStorage = (data) => {
    localStorage.setItem(`excludedCommunities`, JSON.stringify(data));
  }

  // Function to filter communities based on search term
  const filteredCommunities = communityData.filter(
    (community) => community.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to render the list of communities
  const renderCommunityList = () => {
    if (filteredCommunities.length === 0 && excludedCommunities.length === 0) {
      return <p>No matching or excluded communities found.</p>;
    }

    return (
      <ListGroup>
        {filteredCommunities.map((community) => (
          <ListGroup.Item key={community.name}>
            {community.name} - {community.title}{' '}
            <Button
              size='sm'
              variant={excludedCommunities.includes(community.name) ? 'danger' : 'success'}
              onClick={() => handleToggleExcluded(community.name)}
            >
              {excludedCommunities.includes(community.name) ? 'Remove from Excluded' : 'Add to Excluded'}
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  return (
    <div>
      <Row>
        <Col>
          Excluded Communities: {excludedCommunities.length === 0 ? <span>None</span> : ''}
          {excludedCommunities.length > 0 && (
            <ListGroup.Item>
              {excludedCommunities.map((name) => (
                <Badge
                  key={name}
                  as={Button}
                  onClick={() => handleToggleExcluded(name)}
                  pill
                  text="dark"
                  className='m-1'
                  bg='light'
                >
                  {name} - {communityData.find((community) => community.name === name)?.title}{' '}
                  <i className='pe-7s-less text-red'></i>
                </Badge>
              ))}
            </ListGroup.Item>
          )}

        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="searchTerm">
            <Form.Label>Search Communities</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter search term"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          {searchTerm.length >= 2 && renderCommunityList()}
        </Col>
      </Row>
    </div>
  );
}

export default SearchCommunity