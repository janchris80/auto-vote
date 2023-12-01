import useTrailPage from 'hooks/useTrailPage';
import { useMemo, useState } from 'react';
import { Button, Card, Pagination, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { following } from 'slices/downvote';

const DownvoteFollowingList = () => {
  const {
    followingDownvotes,
    followingCurrentPage,
    followingTotalPages,
  } = useSelector((state) => state.downvotes);

  const memoizedFollowingDownvotes = useMemo(() => followingDownvotes, [followingDownvotes]);
  const memoizedFollowingCurrentPage = useMemo(() => followingCurrentPage, [followingCurrentPage]);
  const memoizedFollowingTotalPages = useMemo(() => followingTotalPages, [followingTotalPages]);

  const {
    currentPage,
    loadingFollow,
    handlePageChange,
    handleFollowButtonClick,
    getFollowButtonProps,
    error
  } = useTrailPage(following, 'downvote');

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
                {memoizedFollowingDownvotes.length !== 0 ? (
                  memoizedFollowingDownvotes?.map((followingDownvote, index) => (
                    <tr key={index}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>{index + 1 + (followingCurrentPage - 1) * 10}</td>
                      <td>
                        <Link to={`/downvote-trail/@${followingDownvote.username}`}>
                          @{followingDownvote.username}
                        </Link>
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
                              onClick={() => handleFollowButtonClick(followingDownvote.id, true)}
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

export default DownvoteFollowingList