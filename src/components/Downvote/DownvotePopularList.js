import useTrailPage from 'hooks/useTrailPage';
import { useMemo, useState } from 'react';
import { Button, Card, Pagination, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { popular } from 'slices/downvote';

const DownvotePopularList = () => {
  const {
    popularDownvotes,
    popularCurrentPage,
    popularTotalPages,
  } = useSelector((state) => state.downvotes);

  const memoizedDownvotes = useMemo(() => popularDownvotes, [popularDownvotes]);
  const memoizedCurrentPage = useMemo(() => popularCurrentPage, [popularCurrentPage]);
  const memoizedTotalPages = useMemo(() => popularTotalPages, [popularTotalPages]);

  const {
    currentPage,
    loadingFollow,
    handlePageChange,
    handleFollowButtonClick,
    getFollowButtonProps,
    error,
  } = useTrailPage(popular, 'downvote');

  const [popularPage, setPopularPage] = useState(memoizedCurrentPage);

  return (
    <>
      <Card className="strpied-tabled-with-hover">
        <Card.Header>
          <Card.Title as="h4">Popular Downvote Trails</Card.Title>
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
                {memoizedDownvotes.length !== 0 ? (
                  memoizedDownvotes.map((popularDownvote, index) => (
                    <tr key={popularDownvote.id}>
                      <td>{index + 1 + (memoizedCurrentPage - 1) * 10}</td>
                      <td>
                        <Link to={`/downvote-trail/@${popularDownvote.username}`}>
                          @{popularDownvote.username}
                        </Link>
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
                  handlePageChange(popularPage === memoizedTotalPages ? popularPage : popularPage + 1, setPopularPage)
                }
              />
              <Pagination.Last aria-label="Last Page" onClick={() => handlePageChange(memoizedTotalPages, setPopularPage)} />
            </Pagination>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default DownvotePopularList