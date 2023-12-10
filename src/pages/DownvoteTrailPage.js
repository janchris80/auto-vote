import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container, Button, Row, Col, Card, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import SearchBar from 'components/inputs/Search';
import instance from 'api/axios/instance';
import FollowingSetting from 'components/modals/FollowingSetting';
import { updateTrailer } from 'slices/trailer';
import { useFollowingTrails, useCreateTrailer, useGetTrailer } from 'hooks/useTrailer';
import { DOWNVOTE } from 'lib/constant';
import followerService from 'api/services/followerService';
import RenderPagination from 'components/elements/RenderPagination';
import TrailerFollowingTable from 'components/elements/TrailerFollowingTable';

const DownvoteTrailPage = () => {
  const dispatch = useDispatch();
  const {
    followingTrailers,
    followingCurrentPage,
    followingTotalPages,
    downvote,
  } = useSelector((state) => state.trailer);

  const userRef = useRef();
  const errRef = useRef();
  const prevFollowingTrailers = useRef(followingTrailers);

  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [title, setTitle] = useState('Create Trail');
  const [loadingStates, setLoadingStates] = useState({});
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [trailer, setTrailer] = useState(null);

  const { followingPage, setFollowingPage, refreshFollowingTrails } = useFollowingTrails(DOWNVOTE);
  const createTrailer = useCreateTrailer();
  useGetTrailer(DOWNVOTE);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseSetting = () => setShowSettings(false);
  const handleShowSetting = () => setShowSettings(true);

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
    if (downvote.id) {
      console.log(downvote);
      setDescription(downvote.description)
      setId(downvote.id)
      setTitle('Update Trail')
    }
  }, [downvote])

  const handlePageChange = (page, handlePage) => handlePage(page)

  const handleFollow = async (userId) => {
    try {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [userId]: true,
      }));

      await followerService.follow(userId, DOWNVOTE);
      await refreshFollowingTrails();
      // await refreshPopularTrails();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [userId]: false,
      }));
    }
  };

  const handleUnfollow = useCallback(async (userId) => {
    try {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [userId]: true,
      }));
      await followerService.unfollow(userId, DOWNVOTE);
      await refreshFollowingTrails();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [userId]: false,
      }));
    }
  }, [followerService, refreshFollowingTrails, setLoadingStates]);

  const handleSettings = useCallback((trailer) => {
    setTrailer(trailer);
    handleShowSetting();
  }, [setTrailer, handleShowSetting]);

  const handleCreate = (event) => {
    event.preventDefault();
    // Get description and DOWNVOTE from form inputs or state
    createTrailer(description, DOWNVOTE);
  };

  const handleUpdate = async () => {
    // Handle form submission
    const cancelTokenSource = instance.createCancelToken();
    try {
      await dispatch(updateTrailer({ description, DOWNVOTE, id, cancelToken: cancelTokenSource }))
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

  return (
    <Container fluid>
      <Row>
        <Col md="10">
          <SearchBar
            trailerType={DOWNVOTE}
            handleFollow={handleFollow}
            handleUnfollow={handleUnfollow}
            loadingStates={loadingStates}
          />
          <FollowingSetting
            trailerType={DOWNVOTE}
            show={showSettings}
            handleCloseSetting={handleCloseSetting}
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
              <p className="card-category">List of trails you follow</p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <TrailerFollowingTable
                trailerType={DOWNVOTE}
                followingTrailers={followingTrailers}
                loadingStates={loadingStates}
                handleUnfollow={handleUnfollow}
                handleSettings={handleSettings}
                followingCurrentPage={followingCurrentPage}
              />
              <div className="d-flex justify-content-center mt-4">
                <RenderPagination
                  handlePageChange={handlePageChange}
                  page={followingPage}
                  setPage={setFollowingPage}
                  totalPage={followingTotalPages}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DownvoteTrailPage;