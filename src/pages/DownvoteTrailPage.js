import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Row, Card, Col, Pagination, InputGroup, Form, Spinner } from 'react-bootstrap';
import { postRequest } from 'api/axios/instance';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { popular, following } from 'slices/downvote';
import SearchBar from 'components/Search/SearchBar';

const DownvoteTrailPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    popularDownvotes,
    followingDownvotes,
    followingCurrentPage,
    followingTotalPages,
    popularCurrentPage,
    popularTotalPages,
  } = useSelector((state) => state.downvotes);

  const [popularPage, setPopularPage] = useState(popularCurrentPage);
  const [followingPage, setFollowingPage] = useState(followingCurrentPage);

  // Loading state for Follow/Unfollow button
  const [loadingFollow, setLoadingFollow] = useState(false);

  const fetchDownvotes = async (page, dispatchAction) => {
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
        type: 'downvote',
      });
      await fetchDownvotes(popularPage, popular);
      await fetchDownvotes(followingPage, following);
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoadingFollow(false); // Set loading state back to false
    }
  };

  const handlePageChange = (page, setPage) => setPage(page);

  const getFollowButtonProps = (popularDownvote) => {
    const isFollowing = popularDownvote?.followers?.some((follower) => follower.follower_id === user?.userData?.id);

    return {
      disabled: false,
      text: isFollowing ? 'Unfollow' : 'Follow',
      variant: isFollowing ? 'danger' : 'success',
    };
  };

  const handleFollowButtonClick = (popularDownvote) => {
    const { disabled, text } = getFollowButtonProps(popularDownvote);
    if (!disabled) {
      const isUnfollow = text === 'Unfollow';
      handleFollow(popularDownvote.id, isUnfollow);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchDownvotes(popularPage, popular);
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
        await fetchDownvotes(followingPage, following);
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
          <SearchBar type="downvote" />
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
                  {followingDownvotes.length !== 0 ? (
                    followingDownvotes?.map((followingDownvote, index) => (
                      <tr key={index}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>{index + 1 + (followingCurrentPage - 1) * 10}</td>
                        <td>
                          <NavLink>@{followingDownvote.username}</NavLink>
                        </td>
                        <td>{followingDownvote.followers_count}</td>
                        <td>{followingDownvote.weight}</td>
                        <td>{followingDownvote.method}</td>
                        <td>{followingDownvote.wait_time}</td>
                        <td>{followingDownvote.status}</td>
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
                                onClick={() => handleFollow(followingDownvote.id, true)}
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
              <Card.Title as="h4">Popular Downvote Trails</Card.Title>
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
                  {popularDownvotes.length !== 0 ? (
                    popularDownvotes.map((popularDownvote, index) => (
                      <tr key={popularDownvote.id}>
                        <td>{index + 1 + (popularCurrentPage - 1) * 10}</td>
                        <td>
                          <NavLink>@{popularDownvote.username}</NavLink>
                        </td>
                        <td>{popularDownvote.description ?? 'None'}</td>
                        <td>{popularDownvote.followings_count}</td>
                        <td>
                          <Button
                            size="sm"
                            variant={getFollowButtonProps(popularDownvote).variant}
                            onClick={() => handleFollowButtonClick(popularDownvote)}
                            disabled={getFollowButtonProps(popularDownvote).disabled}
                          >
                            {getFollowButtonProps(popularDownvote).text}
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

export default DownvoteTrailPage;
