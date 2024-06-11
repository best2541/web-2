import { Fragment, useState, useEffect } from "react"
import { Row, Col, UncontrolledDropdown, DropdownMenu, 
  DropdownItem, DropdownToggle, Badge, handleFirstPage } from "reactstrap"
import ReactPaginate from "react-paginate"
import PropTypes from 'prop-types'
import { paginationFromTo } from "@src/utility/Utils"
import { ChevronDown, ChevronUp } from 'react-feather'

const PaginationShowingAndRowPerPage = (props) => {
  const { totalPage, currentPage, perPage, 
    handlePagination, handleRowPerPage } = props
  const pageAll = Math.ceil(totalPage / perPage)
  const [open, setOpen] = useState(false)
  const [rowPerPage, setRowPerPage] = useState(perPage)
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const dataRow = [10, 50, 100]
  const toggle = () => setOpen(prevState => !prevState)

  const onChangeRow = (value) => {
    setRowPerPage(value)
    handleRowPerPage(value)
  }

  const handleFirstPage = () => {
    handlePagination({page: 1, rowPerPage: perPage})
  }

  const handleLastPage = () => {
    const lastPage = Math.floor(totalPage / perPage)
    handlePagination({page: lastPage + 1, rowPerPage: perPage})

    // if (totalPage === perPage && lastPage === 1) {
    //   handlePagination({page: 0, rowPerPage: perPage})
    // } else {
    //   handlePagination({page: lastPage, rowPerPage: perPage})
    // }
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
      <Row style={{ margin: "0px 0px 0px 0px" }} className={`mt-1 mb-1 ${totalPage === 0 && 'd-none'}`}>
        <Col style={{ color: "#b8c2cc" }}>
          {windowSize.width > 900 ? (
            <span>
              {`showing ${paginationFromTo(perPage, currentPage, totalPage).from} to 
              ${paginationFromTo(perPage, currentPage, totalPage).to} 
              of ${totalPage} entries`}
            </span>
          ) : null}
        </Col>
        <Col className="d-flex justify-content-end">
          {windowSize.width > 900 ? (
            <>
              <div className="mr-50" style={{ color: "#b8c2cc" }}>Rows per page: </div>
              <UncontrolledDropdown isOpen={open} toggle={toggle} className="mr-1">
                <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-50'>
                  {rowPerPage}
                  {open ? <ChevronUp size={14} style={{marginTop: "-3px", marginLeft: "5px"}}/> : <ChevronDown size={14} style={{marginTop: "-3px", marginLeft: "5px"}}/> }
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
            onPageChange={(page) => handlePagination({page: page.selected + 1, rowPerPage})}
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

export default PaginationShowingAndRowPerPage

// ** Default Props
PaginationShowingAndRowPerPage.defaultProps = {
  totalPage: 0,
  currentPage: 0, // start 0
  perPage: 10
}

// ** PropTypes
PaginationShowingAndRowPerPage.propTypes = {
  currentPage: PropTypes.number.isRequired,
  perPage: PropTypes.number,
  totalPage: PropTypes.number.isRequired,
  handlePagination: PropTypes.func.isRequired,
  handleRowPerPage: PropTypes.func.isRequired
}