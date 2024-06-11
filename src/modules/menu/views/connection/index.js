import React from 'react'
import NavbarTitle from "@src/components/navbarTitle"
import { Badge, Button, Card, CardBody, Col, Row } from 'reactstrap'
import { Edit, Plus } from 'react-feather'
import DataTable from 'react-data-table-component'
import PaginationAndRowPerPage from "@src/components/pagination/PaginationAndRowPerPage"
import FilterSearch from '@src/components/filter-search'
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { DatePicker } from 'antd'

const { RangePicker } = DatePicker
const columns = [
  {
    name: 'DISPLAYNAME',
    sortable: true,
    selector: row => <Link to={`/connection/edit/${row.displayname}`}>{row.displayname}</Link>
  },
  {
    name: 'USERNAME',
    sortable: true,
    selector: row => row.username
  },
  {
    name: 'IP/DOMAIN',
    sortable: true,
    center: true,
    selector: row => row.ip
  },
  {
    name: 'DATABASE',
    sortable: true,
    right: true,
    selector: row => row.db
  },
  {
    name: 'OTP GATEWAY',
    sortable: true,
    right: true,
    selector: row => row.otp_gateway
  },
  {
    name: 'PORT',
    sortable: true,
    right: true,
    selector: row => row.port
  },
  {
    name: 'CREATE DATE',
    sortable: true,
    right: true,
    selector: row => row.create_date && new Date(row?.create_date).toLocaleString('th')
  },
  {
    name: 'STATUS',
    sortable: true,
    right: true,
    selector: row => <Badge color={row.status ? 'success' : 'danger'}>{row.status ? 'Active' : 'Inactive'}</Badge>
  },
  {
    name: 'ACTION',
    sortable: true,
    right: true,
    selector: row => <Link to={`/connection/edit/${row.displayname}`}><Edit /></Link>
  }
]

const datas = [
  {
    displayname : 'pawat',
    username : 'pawat',
    ip : '127.0.0.1',
    db : 'test',
    otp_gateway : 'sdlfk',
    port : '14430',
    create_date : new Date(),
    status : true
  }
]
function Connection() {
  const history = useHistory()
  return (
    <>
      <NavbarTitle
        breadCrumbTitle={"Connection List"}
        breadCrumbActive={""}
        className={"col-md-2 col-12"}
      >

        <Button color='primary' onClick={() => history.push('/Connection/add')}><Plus /> Add</Button>
      </NavbarTitle>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Row>
                <Col xs="5" sm='5'>
                  <FilterSearch />
                </Col>
                <Col xs='4' sm='5'>
                  <RangePicker style={{ height: '100%' }} />
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

export default Connection