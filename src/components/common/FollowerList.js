import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function FollowerList() {
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
          <tr>
            <td>1</td>
            <td><Link>@Test</Link></td>
            <td>1234</td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default FollowerList