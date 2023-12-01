import useTrailPage from 'hooks/useTrailPage';
import { useMemo, useState } from 'react';
import { Button, Card, Pagination, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CurationPopularList = () => {
  const qwewq = useSelector((state) => state.trailer);
  // {
  //   popularCurations,
  //     popularCurrentPage,
  //     popularTotalPages,
  // }

  console.log(qwewq);

  const memoizedCurations = useMemo(() => popularCurations, [popularCurations]);
  const memoizedCurrentPage = useMemo(() => popularCurrentPage, [popularCurrentPage]);
  const memoizedTotalPages = useMemo(() => popularTotalPages, [popularTotalPages]);

  const {
    currentPage,
    loadingFollow,
    handlePageChange,
    handleFollowButtonClick,
    getFollowButtonProps,
    error,
  } = useTrailPage(popular, 'curation');

  const [popularPage, setPopularPage] = useState(memoizedCurrentPage);

  return (
    <>
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
                {memoizedCurations.length !== 0 ? (
                  memoizedCurations.map((popularCuration, index) => (
                    <tr key={popularCuration.id}>
                      <td>{index + 1 + (memoizedCurrentPage - 1) * 10}</td>
                      <td>
                        <Link to={`/curation-trail/@${popularCuration.username}`}>
                          @{popularCuration.username}
                        </Link>
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

export default CurationPopularList