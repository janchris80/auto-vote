import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { DISPLAY_PAGE_NUMBER } from 'lib/constant';

const FollowerList = ({ followers }) => {
  const { username, trail } = useParams();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <Table className="table-hover table-striped">
        <thead>
          <tr>
            <th className="border-0">#</th>
            <th className="border-0">Follower</th>
            <th className="border-0">Weight</th>
          </tr>
        </thead>
        <tbody>
          {
            loading
              ? 'Loading...'
              : (
                followers?.lenght !== 0
                  ? followers?.map((follower, index) =>
                    <tr>
                      <td>{index + 1 + (currentPage - 1) * DISPLAY_PAGE_NUMBER}</td>
                      <td><Link to={`@${follower.username}/${trail}`}>@{follower.username}</Link></td>
                      <td>{follower.weight / 100}%</td>
                    </tr>
                  )
                  : <tr>
                    <td colSpan={2}>None</td>
                  </tr>
              )
          }
        </tbody>
      </Table>
    </>
  )
}

export default FollowerList