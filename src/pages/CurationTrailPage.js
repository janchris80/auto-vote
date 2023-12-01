import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, Row, Col, Card, Table, Pagination, Modal, Form, Switch, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import SearchBar from 'components/Search/SearchBar';
import instance from 'api/axios/instance';
import { updateTrailer } from 'slices/trailer';
import FollowingSetting from 'components/common/FollowingSetting';
import { usePopularTrailers, useFollowingTrails, useCreateTrailer, useGetTrailer } from 'hooks/useTrailer';
import followerService from 'api/services/followerService';


const CurationTrailPage = () => {
  const dispatch = useDispatch();
  const {
    followingTrailers,
    followingCurrentPage,
    followingTotalPages,
    popularTrailers,
    popularCurrentPage,
    popularTotalPages,
    curation,
  } = useSelector((state) => state.trailer);
  const { user } = useSelector((state) => state.auth);

  const userRef = useRef();
  const errRef = useRef();
  const prevFollowingTrailers = useRef(followingTrailers);
  const prevPopularTrailers = useRef(popularTrailers);

  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [title, setTitle] = useState('Create Trail');
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});
  const [error, setError] = useState(null);
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');
  const [type, setType] = useState('curation');
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [trailer, setTrailer] = useState(null);
  const [username, setUsername] = useState('');

  const { popularPage, setPopularPage, refreshPopularTrails } = usePopularTrailers(type);
  const { followingPage, setFollowingPage, refreshFollowingTrails } = useFollowingTrails(type);
  const createTrailer = useCreateTrailer();
  useGetTrailer(type);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseSetting = () => setShowSettings(false);
  const handleShowSetting = () => setShowSettings(true);

  useEffect(() => {
    if (user) {
      setUsername(user.username)
    }
  }, [user])

  useEffect(() => {
    // Check if followingTrailers has changed
    if (prevFollowingTrailers.current !== followingTrailers) {
      console.log('followingTrailers has changed');
      // Perform actions or call functions that you want to run when followingTrailers changes
    }

    // Update the ref with the current value
    prevFollowingTrailers.current = followingTrailers;
  }, [followingTrailers]);

  useEffect(() => {
    // Check if followingTrailers has changed
    if (prevPopularTrailers.current !== popularTrailers) {
      console.log('popularTrailers has changed');
      // Perform actions or call functions that you want to run when followingTrailers changes
    }

    // Update the ref with the current value
    prevPopularTrailers.current = popularTrailers;
  }, [popularTrailers]);

  useEffect(() => {
    if (curation.id) {
      console.log(curation);
      setDescription(curation.description)
      setId(curation.id)
      setTitle('Update Trail')
    }
  }, [curation])

  const handlePageChange = (page, handlePage) => handlePage(page)

  const handleFollow = async (userId) => {
    try {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [userId]: true,
      }));

      await followerService.follow(userId, type);
      await refreshFollowingTrails();
      await refreshPopularTrails();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [userId]: false,
      }));
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [userId]: true,
      }));

      await followerService.unfollow(userId, type);
      await refreshFollowingTrails();
      await refreshPopularTrails();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [userId]: false,
      }));
    }
  };

  const handleCreate = (event) => {
    event.preventDefault();
    // Get description and type from form inputs or state
    createTrailer(description, type);
  };

  const handleUpdate = async () => {
    // Handle form submission
    const cancelTokenSource = instance.createCancelToken();
    try {
      await dispatch(updateTrailer({ description, type, id, cancelToken: cancelTokenSource }))
    } catch (error) {
      setErrorMessage(error.message);
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    if (id && description) {
      handleUpdate(event);
    } else {
      handleCreate(event);
    }

    handleClose();
  };


  useEffect(() => {
    if (show) {
      userRef.current.focus();
    }
  }, [show])


  const handleSettings = (trailer) => {
    setTrailer(trailer)
    handleShowSetting()
  }

  return (
    <Container fluid>
      <Row>
        <Col md="10">
          <SearchBar type="curation" />
          <FollowingSetting
            type={type}
            show={showSettings}
            onHide={handleCloseSetting}
            trailer={trailer}
            refreshFollowingTrails={refreshFollowingTrails}
          />
        </Col>
        <Col className='w-100' md="2">
          <Button onClick={handleShow}>{title}</Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                errorMessage ?? <Row>
                  <p ref={errRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>
                </Row>
              }
              <Form noValidate validated={validated} onSubmit={handleSubmit} id="trailForm">
                <Form.Group controlId="formBasicDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    ref={userRef}
                    required
                    rows={4} // You can adjust the number of rows based on your preference
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
              </Form>


            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">You are following</Card.Title>
              <p className="card-category">{/* Here is a subtitle for this table */}</p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              {loadingFollow ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  Loading...
                </div>
              ) : error ? (
                <div style={{ color: 'red', textAlign: 'center' }}>
                  Error: {error.message}
                </div>
              ) : (
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0"></th>
                      <th className="border-0">#</th>
                      <th className="border-0">Username</th>
                      <th className="border-0">Followers</th>
                      <th className="border-0">Weight</th>
                      <th className="border-0">Method</th>
                      <th className="border-0">Wait Time</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {followingTrailers.length !== 0 ? (
                      followingTrailers?.map((followingTrailer, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <input type="checkbox" />
                            </td>
                            <td>{index + 1 + (followingCurrentPage - 1) * 10}</td>
                            <td>
                              <Link to={`/curation-trail/@${followingTrailer.username}`}>
                                @{followingTrailer.username}
                              </Link>
                            </td>
                            <td>{followingTrailer.followersCount}</td>
                            <td>{followingTrailer.weight}</td>
                            <td className='text-capitalize'>{followingTrailer.method}</td>
                            <td>{followingTrailer.waitTime}</td>
                            <td>
                              {
                                followingTrailer.status
                                  ? <Badge bg='success'>Enable</Badge>
                                  : <Badge bg='danger'>Disable</Badge>
                              }
                            </td>
                            <td className=''>
                              {/* Show loading spinner when loadingFollow is true */}
                              {loadingFollow ? (
                                <Spinner size='sm' animation="border" role="status">
                                  <span className="sr-only">Loading...</span>
                                </Spinner>
                              ) : (
                                <>
                                  <Button size="sm" onClick={() => handleSettings(followingTrailer)}>Settings</Button>
                                  <Button
                                    size="sm"
                                    variant='danger'
                                    onClick={() => handleUnfollow(followingTrailer.userId)} disabled={loadingFollow}
                                  >
                                    {loadingStates[followingTrailer.userId] ? 'Removing...' : 'Remove'}
                                  </Button>
                                </>
                              )}
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan={9} style={{ textAlign: 'center' }}>
                          None
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}
              <div className="d-flex justify-content-center mt-4">
                <Pagination>
                  <Pagination.First aria-label="First Page" onClick={() => handlePageChange(1, setFollowingPage)} />
                  <Pagination.Prev
                    aria-label="Prev Page"
                    onClick={() => handlePageChange(followingPage === 1 ? followingPage : followingPage - 1, setFollowingPage)}
                  />
                  <Pagination.Item disabled>{`${followingPage} of ${followingTotalPages}`}</Pagination.Item>
                  <Pagination.Next
                    aria-label="Next Page"
                    onClick={() =>
                      handlePageChange(
                        followingPage === followingTotalPages ? followingPage : followingPage + 1,
                        setFollowingPage
                      )
                    }
                  />
                  <Pagination.Last aria-label="Last Page" onClick={() => handlePageChange(followingTotalPages, setFollowingPage)} />
                </Pagination>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Popular Curation Trails</Card.Title>
              <p className="card-category">{/* Here is a subtitle for this table */}</p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              {loadingFollow ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  Loading...
                </div>
              ) : error ? (
                <div style={{ color: 'red', textAlign: 'center' }}>
                  Error: {error.message}
                </div>
              ) : (
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">#</th>
                      <th className="border-0">Username</th>
                      <th className="border-0">Description</th>
                      <th className="border-0">Followers</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {popularTrailers.length !== 0 ? (
                      popularTrailers.map((popularTrailer, index) => (
                        <tr key={popularTrailer.id}>
                          <td>{index + 1 + (popularCurrentPage - 1) * 10}</td>
                          <td>
                            <Link to={`/curation-trail/@${popularTrailer.username}`}>
                              @{popularTrailer.username}
                            </Link>
                          </td>
                          <td>{popularTrailer.description ?? 'None'}</td>
                          <td>{popularTrailer.followersCount}</td>
                          <td>
                            {
                              popularTrailer.username !== username
                                ? popularTrailer.isFollowed
                                  ? <Button size='sm' variant='danger' onClick={() => handleUnfollow(popularTrailer.userId)}>
                                    {loadingStates[popularTrailer.userId] ? 'Unfollowing...' : 'Unfollow'}
                                  </Button>
                                  : <Button size='sm' variant='success' onClick={() => handleFollow(popularTrailer.userId)}>
                                    {loadingStates[popularTrailer.userId] ? 'Following...' : 'Follow'}
                                  </Button>
                                : <Button size='sm' disabled variant='danger' className='text-black'>Cant follow yourself</Button>
                            }
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} style={{ textAlign: 'center' }}>
                          No Users
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}
              <div className="d-flex justify-content-center mt-4">
                <Pagination>
                  <Pagination.First aria-label="First Page" onClick={() => handlePageChange(1, setPopularPage)} />
                  <Pagination.Prev
                    aria-label="Prev Page"
                    onClick={() => handlePageChange(popularPage === 1 ? popularPage : popularPage - 1, setPopularPage)}
                  />
                  <Pagination.Item disabled>{`${popularPage} of ${popularTotalPages}`}</Pagination.Item>
                  <Pagination.Next
                    aria-label="Next Page"
                    onClick={() =>
                      handlePageChange(popularPage === popularTotalPages ? popularPage : popularPage + 1, setPopularPage)
                    }
                  />
                  <Pagination.Last aria-label="Last Page" onClick={() => handlePageChange(popularTotalPages, setPopularPage)} />
                </Pagination>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CurationTrailPage;