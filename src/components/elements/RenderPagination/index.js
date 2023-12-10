import React from 'react'
import { Pagination } from 'react-bootstrap'

const RenderPagination = ({ handlePageChange, page, setPage, totalPage}) => {
  return (
    <>
    <Pagination>
        <Pagination.First aria-label="First Page" onClick={() => handlePageChange(1, setPage)} />
      <Pagination.Prev
        aria-label="Prev Page"
          onClick={() => handlePageChange(page === 1 ? page : page - 1, setPage)}
      />
        <Pagination.Item disabled>{`${page} of ${totalPage}`}</Pagination.Item>
      <Pagination.Next
        aria-label="Next Page"
        onClick={() =>
          handlePageChange(
            page === totalPage ? page : page + 1,
            setPage
          )
        }
      />
      <Pagination.Last aria-label="Last Page" onClick={() => handlePageChange(totalPage, setPage)} />
    </Pagination>
    </>
  )
}

export default RenderPagination