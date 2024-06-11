import { Fragment, useState, useEffect } from "react"
import {
  Row, Col, UncontrolledDropdown, DropdownMenu,
  DropdownItem, DropdownToggle, Badge, handleFirstPage
} from "reactstrap"
import ReactPaginate from "react-paginate"
import PropTypes from 'prop-types'
import { paginationFromTo } from "@src/utility/Utils"
import { ChevronDown, ChevronUp } from 'react-feather'

const PaginationAndRowPerPage = ({ totalPage, currentPage, perPage, handlePagination, handleRowPerPage }) => {
  const pageAll = Math.ceil(totalPage / perPage)
  const [open, setOpen] = useState(false)
  const [rowPerPage, setRowPerPage] = useState(perPage)
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const dataRow = [10, 20, 30]
  const toggle = () => setOpen(prevState => !prevState)

  const onChangeRow = (value) => {
    setRowPerPage(value)
    handleRowPerPage(value)
  }

  const handleFirstPage = () => {
    handlePagination(0)
  }

  const handleLastPage = () => {
    const lastPage = Math.floor(totalPage / perPage)
    if (totalPage === perPage && lastPage === 1) {
      handlePagination(0)
    } else {
      handlePagination(lastPage)
    }
  }

  const pageChange = (page) => {
    handlePagination(page.selected)
  }

  useEffect(() => {
    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Fragment>
      <Row style={{ margin: "1rem" }} className={`mb-1 ${totalPage === 0 && 'd-none'}`}>
        {windowSize.width > 900 ? (
          <Col style={{ color: "#b8c2cc" }}>
            <span>
              {`showing ${paginationFromTo(perPage, currentPage, totalPage).from} to 
              ${paginationFromTo(perPage, currentPage, totalPage).to} 
              of ${totalPage} entries`}
            </span>
          </Col>
        ) : null}
        <Col className="d-flex justify-content-end">
          {windowSize.width > 900 ? (
            <>
              <div className="mr-50" style={{ color: "#b8c2cc" }}>Rows per page: </div>
              <UncontrolledDropdown isOpen={open} toggle={toggle} className="mr-1">
                <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-50'>
                  {rowPerPage}
                  {open ? <ChevronUp size={14} style={{ marginTop: "-3px", marginLeft: "5px" }} /> : <ChevronDown size={14} style={{ marginTop: "-3px", marginLeft: "5px" }} />}
                </DropdownToggle>
                <DropdownMenu right className="dropdown-per-page">
                  {dataRow.map(item => (
                    <DropdownItem onClick={e => onChangeRow(item)} className='w-100' key={item}>
                      {item}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
            </>
          ) : null}
          <Badge pill color='light-primary' className="py-50 mr-25 align-self-center cursor-pointer" onClick={handleFirstPage}>First Page</Badge>
          <ReactPaginate
            previousLabel=""
            nextLabel=""
            forcePage={currentPage}
            onPageChange={(page) => pageChange(page)}
            pageCount={pageAll || 1}
            breakLabel="..."
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName="active"
            pageClassName="page-item"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            nextLinkClassName="page-link"
            nextClassName="page-item next"
            previousClassName="page-item prev"
            previousLinkClassName="page-link"
            pageLinkClassName="page-link"
            containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end mb-0"
          />
          <Badge pill color='light-primary' className="py-50 ml-25 align-self-center cursor-pointer" onClick={handleLastPage}>Last Page</Badge>
        </Col>
      </Row>
    </Fragment>
  )
}

export default PaginationAndRowPerPage

// ** Default Props
PaginationAndRowPerPage.defaultProps = {
  totalPage: 0,
  currentPage: 0, // start 0
  perPage: 10
}

// ** PropTypes
PaginationAndRowPerPage.propTypes = {
  currentPage: PropTypes.number.isRequired,
  perPage: PropTypes.number,
  totalPage: PropTypes.number.isRequired,
  handlePagination: PropTypes.func.isRequired,
  handleRowPerPage: PropTypes.func.isRequired
}