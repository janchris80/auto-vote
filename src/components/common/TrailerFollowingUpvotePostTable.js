import React from 'react'
import { Badge, Button, Spinner, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const TrailerFollowingUpvotePostTable = ({
  trailerType,
  followingTrailers,
  loadingStates,
  handleUnfollow,
  handleSettings,
  followingCurrentPage,
  loadingFollow,
}) => {
  return (
    <>
      <Table className="table-hover table-striped">
        <thead>
          <tr>
            <th className="border-0"></th>
            <th className="border-0">#</th>
            <th className="border-0">Username</th>
            <th className="border-0">Followers</th>
            <th className="border-0">Weight</th>
            <th className="border-0">Method</th>
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
                    <Link to={`/${trailerType}-trail/@${followingTrailer.username}`}>
                      @{followingTrailer.username}
                    </Link>
                  </td>
                  <td>{followingTrailer.followersCount}</td>
                  <td>{followingTrailer.weight / 100}%</td>
                  <td>
                    {
                      followingTrailer.isEnable
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
    </>
  )
}

export default TrailerFollowingUpvotePostTable