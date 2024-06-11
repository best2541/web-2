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

const columns = [
  {
    name: 'SENDER NAME',
    sortable: true,
    selector: row => row.senderName
  },
  {
    name: 'CREATE DATE',
    sortable: true,
    selector: row => new Date(row.create_date).toLocaleString('th')
  },
  {
    name: 'ALLOW LIST',
    sortable: true,
    center: true,
    selector: row => (row.allowList ? 'Yes' : 'No')
  },
  {
    name: 'White List',
    sortable: true,
    right: true,
    selector: row => (row.whiteList ? 'Yes' : 'No')
  },
  {
    name: 'STATUS',
    sortable: true,
    right: true,
    selector: row => <Badge color={row.status === true ? 'success' : 'danger'}>{row.status === true ? 'Active' : 'Inactive'}</Badge>
  }
]

const datas = [
  {
    senderName: 'pawat',
    create_date: new Date(),
    allowList: true,
    whiteList: true,
    status: true
  },
  {
    senderName: 'pawat',
    create_date: new Date(),
    allowList: true,
    whiteList: true,
    status: true
  }
]
function senderEdit() {
  const history = useHistory()

  const addClick = () => {
    const check = (type) => {
      if (type === 'confirm') {
        notifySuccess('add credit successfully.')
      } else {
        notifyFailed('cannot record data. Please contact the system viewer.')
      }
    }
    popupConfirm('test', check)
  }
  return (
    <>
      <NavbarTitle
        breadCrumbTitle={"Credit List"}
        breadCrumbActive={"Add Sender"}
        className={"col-md-2 col-12"}
      >
      </NavbarTitle>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h1>Add Sender</h1>
            </CardHeader>
            <hr />
            <CardBody>
              <Row className='d-flex align-item-bottom align-bottom'>
                <Col>
                  <Label for='senderName'>Sender Name<span style={{ color: 'red' }}>*</span></Label>
                  <Input id='senderName' name='senderName' type='text' requred>
                  </Input>
                </Col>
                <Col>
                  <Label>Status<span style={{ color: 'red' }}>*</span></Label>
                  <Input type='text' requred>
                    <option>Active</option>
                    <option>Inactive</option>
                  </Input>
                </Col>
                <Col>
                  <Label>Allow List<span style={{ color: 'red' }}>*</span></Label>
                  <Input type='text' requred>
                    <option>All</option>
                    <option>Inactive</option>
                  </Input>
                </Col>
                <Col>
                  <Label>White List<span style={{ color: 'red' }}>*</span></Label>
                  <Input type='text' requred>
                    <option>True</option>
                    <option>Dtac</option>
                  </Input>
                </Col>
                <Col className="d-flex">
                  <Button color='primary mt-auto' onClick={addClick}>Save</Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h1>Sender List</h1>
            </CardHeader>
            <hr />
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

export default senderEdit