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
import { DatePicker } from 'antd'
import { Edit, Plus } from 'react-feather'

const { RangePicker } = DatePicker

const columns = [
  {
    name: 'DISPLAYNAME',
    sortable: true,
    selector: row => <Link to={`/credit/edit/${row.displayName}`}>{row.displayName}</Link>
  },
  {
    name: 'URL',
    sortable: true,
    selector: row => row.URL
  },
  {
    name: 'USERNAME',
    sortable: true,
    center: true,
    selector: row => row.username
  },
  {
    name: 'SERVICE ID',
    sortable: true,
    right: true,
    selector: row => row.service_id
  },
  {
    name: 'CHARGE NUMBER',
    sortable: true,
    right: true,
    selector: row => row.charge_number
  },
  {
    name: 'OPERATOR',
    sortable: true,
    right: true,
    selector: row => row.operator
  },
  {
    name: 'CREATE DATE',
    sortable: true,
    right: true,
    selector: row => new Date(row.create_date).toLocaleString('th')
  },
  {
    name: 'STATUS',
    sortable: true,
    right: true,
    selector: row => <Badge color={row.status === true ? 'success' : 'danger'}>{row.status === true ? 'Active' : 'Inactive'}</Badge>
  },
  {
    name: 'ACTION',
    sortable: true,
    center: true,
    selector: row => <Link to={`/gateway/edit/${row.displayName}`}><Edit /></Link>
  }
]

const datas = [
  {
    displayName: 'pawat',
    URL: 'test',
    username: '231',
    service_id: 'add',
    charge_number: '1231',
    operator: '1231',
    create_date: new Date(),
    status: true
  },
  {
    displayName: 'pawat',
    URL: 'test',
    username: '231',
    service_id: 'add',
    charge_number: '1231',
    operator: '1231',
    create_date: new Date(),
    status: false
  }
]
function index() {
  const history = useHistory()

  return (
    <>
      <NavbarTitle
        breadCrumbTitle={"Gateway List"}
        breadCrumbActive={""}
        className={"col-md-2 col-12"}
      >
        <Button color='primary' onClick={() => history.push('/gateway/add')}><Plus /> Add</Button>
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

export default index