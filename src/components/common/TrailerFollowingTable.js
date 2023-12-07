import { UPVOTE_POST, UPVOTE_COMMENT, DISPLAY_PAGE_NUMBER } from 'lib/constant'
import React, { useEffect, useMemo } from 'react'
import { Badge, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const TrailerFollowingTable = ({
  trailerType,
  followingTrailers,
  loadingStates,
  handleUnfollow,
  handleSettings,
  followingCurrentPage,
}) => {

  const type = [UPVOTE_POST, UPVOTE_COMMENT];

  const isInclude = useMemo(() => !type.includes(trailerType), [trailerType]);

  return (
    <>
      <Table className="table-hover table-striped">
        <thead>
          <tr>
            <th className="border-0"></th>
            <th className="border-0">#</th>
            <th className="border-0">Username</th>
            <th className="border-0">Weight</th>
            {
              isInclude
                ? <>
                  <th className="border-0">Followers</th>
                  <th className="border-0">Method</th>
                </>
                : null
            }
            <th className="border-0">Status</th>
            <th className="border-0">Action</th>
          </tr>
        </thead>
        <tbody>
          {followingTrailers && followingTrailers.length !== 0 ? (
            followingTrailers?.map((followingTrailer, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{index + 1 + (followingCurrentPage - 1) * DISPLAY_PAGE_NUMBER}</td>
                  <td>
                    <Link to={`/${trailerType}-trail/@${followingTrailer.username}`}>
                      @{followingTrailer.username}
                    </Link>
                  </td>
                  <td>{followingTrailer.weight / 100}%</td>
                  {
                    isInclude
                      ? <>
                        <td>{followingTrailer.followersCount}</td>
                        <td className='text-capitalize'>{followingTrailer.votingType}</td>
                      </>
                      : null
                  }
                  <td>
                    {
                      followingTrailer.isEnable
                        ? <Badge bg='success'>Enable</Badge>
                        : <Badge bg='danger'>Disable</Badge>
                    }
                  </td>
                  <td className=''>
                    <Button size="sm" onClick={() => handleSettings(followingTrailer)}>Settings</Button>
                    <Button
                      size="sm"
                      variant='danger'
                      onClick={() => handleUnfollow(followingTrailer.userId)} disabled={loadingStates[followingTrailer.userId]}
                    >
                      {loadingStates[followingTrailer.userId] ? 'Removing...' : 'Remove'}
                    </Button>
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

export default TrailerFollowingTable