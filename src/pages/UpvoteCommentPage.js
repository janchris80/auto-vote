import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { UPVOTE_COMMENT } from 'lib/constant';
import { useFollowingTrails } from 'hooks/useTrailer';

import SearchBar from 'components/inputs/Search';
import FollowingSetting from 'components/modals/FollowingSetting';
import followerService from 'api/services/followerService';
import RenderPagination from 'components/elements/RenderPagination';
import TrailerFollowingTable from 'components/elements/TrailerFollowingTable';

const UpvoteCommentPage = () => {
  const {
    followingTrailers,
    followingCurrentPage,
    followingTotalPages,
  } = useSelector((state) => state.trailer);

  const prevFollowingTrailers = useRef(followingTrailers);

  const [showSettings, setShowSettings] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});
  const [trailer, setTrailer] = useState(null);

  const { followingPage, setFollowingPage, refreshFollowingTrails } = useFollowingTrails(UPVOTE_COMMENT);

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

  const handlePageChange = (page, handlePage) => handlePage(page)

  const handleFollow = async (userId) => {
    try {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [userId]: true,
      }));

      await followerService.follow(userId, UPVOTE_COMMENT);
      await refreshFollowingTrails();
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

      await followerService.unfollow(userId, UPVOTE_COMMENT);
      await refreshFollowingTrails();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [userId]: false,
      }));
    }
  };


  const handleSettings = (trailer) => {
    setTrailer(trailer)
    handleShowSetting()
  }

  return (
    <Container fluid>
      <Row>
        <Col md="10">
          <SearchBar
            trailerType={UPVOTE_COMMENT}
            handleFollow={handleFollow}
            handleUnfollow={handleUnfollow}
            loadingStates={loadingStates}
          />
          <FollowingSetting
            trailerType={UPVOTE_COMMENT}
            show={showSettings}
            handleCloseSetting={handleCloseSetting}
            trailer={trailer}
            refreshFollowingTrails={refreshFollowingTrails}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Upvote comments you recieve from:</Card.Title>
              <p className="card-category">If user commented on your post, the comment will be upvote.</p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <TrailerFollowingTable
                trailerType={UPVOTE_COMMENT}
                followingTrailers={followingTrailers}
                loadingStates={loadingStates}
                handleUnfollow={handleUnfollow}
                handleSettings={handleSettings}
                followingCurrentPage={followingCurrentPage}
                loadingFollow={loadingFollow}
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

export default UpvoteCommentPage;