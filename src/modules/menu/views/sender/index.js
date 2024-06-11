import React from 'react'
import NavbarTitle from "@src/components/navbarTitle"
import { Badge, Button, Card, CardBody, CardHeader, Col, Input, Label, Row } from 'reactstrap'
import { notifySuccess, notifyFailed } from "@src/components/toast/notifyTopCenter"
import DataTable from 'react-data-table-component'
import PaginationAndRowPerPage from "@src/components/pagination/PaginationAndRowPerPage"
import FilterSearch from '@src/components/filter-search'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { popupConfirm } from '../../../../components/sweetalert'
import { Edit, Plus } from 'react-feather'

const columns = [
  {
    name: 'ACCOUNT NAME',
    sortable: true,
    selector: row => row.accountName
  },
  {
    name: 'SENDER AMOUNT',
    sortable: true,
    selector: row => row.sender_amount
  },
  {
    name: 'ACTION',
    sortable: true,
    center: true,
    selector: row => <Link to={`/sender/detail/${row.accountName}`}><Edit /></Link>
  }
]

const datas = [
  {
    accountName: 'pawat',
    sender_amount: 2,
    status: true
  },
  {
    accountName: 'pawat',
    sender_amount: 2,
    status: false
  }
]
function index() {
  const history = useHistory()

  return (
    <>
      <NavbarTitle
        breadCrumbTitle={"Sender in Account"}
        breadCrumbActive={""}
        className={"col-md-2 col-12"}
      >
      </NavbarTitle>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Row>
                <Col xs="9" sm='10'>
                  <FilterSearch />
                </Col>
                <Col xs='3' sm='2'>
                  <Button color='primary' outline>Search</Button>
                </Col>
              </Row>
              <DataTable
                columns={columns}
                data={datas}
              />
              <PaginationAndRowPerPage
                className="react-dataTable react-dataTable-custom-otp text-primary color-primary"
                currentPage={0}
                perPage={10}
                totalPage={20}
              // handlePagination={val => handlePagination(val)}
              // handleRowPerPage={val => handleRowPerPage(val)}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
    </>
  )
}

export default index