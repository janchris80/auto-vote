import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Row, Card, Col, Pagination, InputGroup, Form, Spinner } from 'react-bootstrap';
import { postRequest } from 'api/axios/instance';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { popular, following } from 'slices/curation';
import SearchBar from 'components/Search/SearchBar';

const CurationTrailPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    popularCurations,
    followingCurations,
    followingCurrentPage,
    followingTotalPages,
    popularCurrentPage,
    popularTotalPages,
  } = useSelector((state) => state.curations);

  const [popularPage, setPopularPage] = useState(popularCurrentPage);
  const [followingPage, setFollowingPage] = useState(followingCurrentPage);

  // Loading state for Follow/Unfollow button
  const [loadingFollow, setLoadingFollow] = useState(false);

  const fetchCurations = async (page, dispatchAction) => {
    try {
      await dispatch(dispatchAction({ page }));
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleFollow = async (userId, follow = true) => {
    const action = follow ? 'unfollow' : 'follow';

    try {
      setLoadingFollow(true); // Set loading state to true

      await postRequest(`/api/followers/${action}`, {
        user_id: userId,
        type: 'curation',
      });
      await fetchCurations(popularPage, popular);
      await fetchCurations(followingPage, following);
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoadingFollow(false); // Set loading state back to false
    }
  };

  const handlePageChange = (page, setPage) => setPage(page);

  const getFollowButtonProps = (popularCuration) => {
    const isFollowing = popularCuration?.followers?.some((follower) => follower.follower_id === user?.userData?.id);

    return {
      disabled: false,
      text: isFollowing ? 'Unfollow' : 'Follow',
      variant: isFollowing ? 'danger' : 'success',
    };
  };

  const handleFollowButtonClick = (popularCuration) => {
    const { disabled, text } = getFollowButtonProps(popularCuration);
    if (!disabled) {
      const isUnfollow = text === 'Unfollow';
      handleFollow(popularCuration.id, isUnfollow);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCurations(popularPage, popular);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    // Cleanup function (if needed)
    return () => { };
  }, [popularPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCurations(followingPage, following);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    // Cleanup function (if needed)
    return () => { };
  }, [followingPage]);

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <SearchBar type="curation" />
        </Col>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">You are following</Card.Title>
              <p className="card-category">{/* Here is a subtitle for this table */}</p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
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
                  {followingCurations.length !== 0 ? (
                    followingCurations?.map((followingCuration, index) => (
                      <tr key={index}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>{index + 1 + (followingCurrentPage - 1) * 10}</td>
                        <td>
                          <NavLink>@{followingCuration.username}</NavLink>
                        </td>
                        <td>{followingCuration.followers_count}</td>
                        <td>{followingCuration.weight}</td>
                        <td>{followingCuration.method}</td>
                        <td>{followingCuration.wait_time}</td>
                        <td>{followingCuration.status}</td>
                        <td className=''>
                          {/* Show loading spinner when loadingFollow is true */}
                          {loadingFollow ? (
                            <Spinner size='sm' animation="border" role="status">
                              <span className="sr-only">Loading...</span>
                            </Spinner>
                          ) : (
                            <>
                              <Button size="sm">Settings</Button>
                              <Button
                                size="sm"
                                variant='danger'
                                onClick={() => handleFollow(followingCuration.id, true)}
                                disabled={loadingFollow} // Disable button when loading
                              >
                                Remove
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} style={{ textAlign: 'center' }}>
                        None
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <div className="d-flex justify-content-center mt-4">
                <Pagination>
                  <Pagination.First onClick={() => handlePageChange(1, setFollowingPage)} />
                  <Pagination.Prev
                    onClick={() => handlePageChange(followingPage === 1 ? followingPage : followingPage - 1, setFollowingPage)}
                  />
                  <Pagination.Item>{followingPage}</Pagination.Item>
                  <Pagination.Next
                    onClick={() =>
                      handlePageChange(followingPage === followingTotalPages ? followingPage : followingPage + 1, setFollowingPage)
                    }
                  />
                  <Pagination.Last onClick={() => handlePageChange(followingTotalPages, setFollowingPage)} />
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
                  {popularCurations.length !== 0 ? (
                    popularCurations.map((popularCuration, index) => (
                      <tr key={popularCuration.id}>
                        <td>{index + 1 + (popularCurrentPage - 1) * 10}</td>
                        <td>
                          <NavLink>@{popularCuration.username}</NavLink>
                        </td>
                        <td>{popularCuration.description ?? 'None'}</td>
                        <td>{popularCuration.followings_count}</td>
                        <td>
                          <Button
                            size="sm"
                            variant={getFollowButtonProps(popularCuration).variant}
                            onClick={() => handleFollowButtonClick(popularCuration)}
                            disabled={getFollowButtonProps(popularCuration).disabled}
                          >
                            {getFollowButtonProps(popularCuration).text}
                          </Button>
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
              <div className="d-flex justify-content-center mt-4">
                <Pagination>
                  <Pagination.First onClick={() => handlePageChange(1, setPopularPage)} />
                  <Pagination.Prev
                    onClick={() => handlePageChange(popularPage === 1 ? popularPage : popularPage - 1, setPopularPage)}
                  />
                  <Pagination.Item>{popularPage}</Pagination.Item>
                  <Pagination.Next
                    onClick={() =>
                      handlePageChange(popularPage === popularTotalPages ? popularPage : popularPage + 1, setPopularPage)
                    }
                  />
                  <Pagination.Last onClick={() => handlePageChange(popularTotalPages, setPopularPage)} />
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
