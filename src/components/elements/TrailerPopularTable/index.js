import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const TrailerPopularTable = ({
  username,
  trailerType,
  popularTrailers,
  loadingStates,
  handleFollow,
  handleUnfollow,
  popularCurrentPage
}) => {
  return (
    <>
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
                  <Link to={`/@${popularTrailer.username}/${trailerType}`}>
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
    </>
  )
}

export default TrailerPopularTable