import useTrailPage from 'hooks/useTrailPage';
import React, { useMemo } from 'react'
import { useState } from 'react';
import { Button, Card, Pagination, Spinner, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { following } from 'slices/curation';

const CurationFollowingList = () => {
  const {
    followingCurations,
    followingCurrentPage,
    followingTotalPages,
  } = useSelector((state) => state.curations);

  const memoizedFollowingCurations = useMemo(() => followingCurations, [followingCurations]);
  const memoizedFollowingCurrentPage = useMemo(() => followingCurrentPage, [followingCurrentPage]);
  const memoizedFollowingTotalPages = useMemo(() => followingTotalPages, [followingTotalPages]);

  const {
    currentPage,
    loadingFollow,
    handlePageChange,
    handleFollowButtonClick,
    getFollowButtonProps,
    error
  } = useTrailPage(following, 'curation');

  const [followingPage, setFollowingPage] = useState(memoizedFollowingCurrentPage);

  return (
    <>
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
                {memoizedFollowingCurations.length !== 0 ? (
                  memoizedFollowingCurations?.map((followingCuration, index) => (
                    <tr key={index}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>{index + 1 + (followingCurrentPage - 1) * 10}</td>
                      <td>
                        <Link to={`/curation-trail/@${followingCuration.username}`}>
                          @{followingCuration.username}
                        </Link>
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
                              onClick={() => handleFollowButtonClick(followingCuration.id, true)}
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
          )}
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.First aria-label="First Page" onClick={() => handlePageChange(1, setFollowingPage)} />
              <Pagination.Prev
                aria-label="Prev Page"
                onClick={() => handlePageChange(followingPage === 1 ? followingPage : followingPage - 1, setFollowingPage)}
              />
              <Pagination.Item disabled>{`${followingPage} of ${memoizedFollowingTotalPages}`}</Pagination.Item>
              <Pagination.Next
                aria-label="Next Page"
                onClick={() =>
                  handlePageChange(
                    followingPage === memoizedFollowingTotalPages ? followingPage : followingPage + 1,
                    setFollowingPage
                  )
                }
              />
              <Pagination.Last aria-label="Last Page" onClick={() => handlePageChange(memoizedFollowingTotalPages, setFollowingPage)} />
            </Pagination>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default CurationFollowingList