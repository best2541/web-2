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
    name: 'NAME',
    sortable: true,
    selector: row => <Link to={`/accounts/edit/${row.name}`}>{row.name}</Link>
  },
  {
    name: 'PROTACAL',
    sortable: true,
    selector: row => row.protocal
  },
  {
    name: 'HOSTNAME',
    sortable: true,
    center: true,
    selector: row => row.hostname
  },
  {
    name: 'USERNAME',
    sortable: true,
    right: true,
    selector: row => row.username
  },
  {
    name: 'PASSWORD',
    sortable: true,
    right: true,
    selector: row => row.password
  },
  {
    name: 'PATH',
    sortable: true,
    right: true,
    selector: row => row.path
  },
  {
    name: 'UPDATE DATE',
    sortable: true,
    right: true,
    selector: row => row.update_date && new Date(row?.update_date).toLocaleString('th')
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
    selector: row => <Link to={`/ftpconfig/edit/${row.name}`}><Edit /></Link>
  }
]

const datas = [
  {
    name: 'test',
    protocal : 'http',
    hostname : 'www',
    username : 'username',
    password : 'password',
    path : '/',
    update_date : new Date(),
    status : true
  }
]
function FTPConfig() {
  const history = useHistory()
  return (
    <>
      <NavbarTitle
        breadCrumbTitle={"FTP Config"}
        breadCrumbActive={""}
        className={"col-md-2 col-12"}
      >

        <Button color='primary' onClick={() => history.push('/ftpconfig/add')}><Plus /> Add</Button>
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

export default FTPConfig