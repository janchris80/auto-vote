import { Form, Button, ListGroup, Row, Container, Col, Badge } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

export default function HelpVideoPage() {

  const [communityData, setCommunityData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [excludedCommunities, setExcludedCommunities] = useState([]);

  // Function to fetch data from localStorage
  const fetchDataFromLocalStorage = () => {
    const storedData = localStorage.getItem('communityData');
    if (storedData) {
      setCommunityData(JSON.parse(storedData));
    }

    const storedExcludedCommunities = localStorage.getItem('excludedCommunities');
    if (storedExcludedCommunities) {
      setExcludedCommunities(JSON.parse(storedExcludedCommunities));
    }
  };

  // Effect to fetch data on component mount
  useEffect(() => {
    fetchDataFromLocalStorage();
  }, []);

  // Function to handle adding/removing communities to/from the excluded list
  const handleToggleExcluded = (name) => {
    setExcludedCommunities((prevExcluded) => {
      if (prevExcluded.includes(name)) {
        // Remove from excluded list
        return prevExcluded.filter((item) => item !== name);
      } else {
        // Add to excluded list
        return [...prevExcluded, name];
      }
    });
  };

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
    <Container fluid>
      <Row>
        <Col>
          {excludedCommunities.length > 0 && (
            <ListGroup.Item>
              Excluded Communities:{' '}
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
    </Container>
  );
}
