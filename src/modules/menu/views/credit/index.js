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

const { RangePicker } = DatePicker

const columns = [
  {
    name: 'ACCOUNT',
    sortable: true,
    selector: row => <Link to={`/credit/edit/${row.account}`}>{row.account}</Link>
  },
  {
    name: 'LEVEL',
    sortable: true,
    selector: row => row.level
  },
  {
    name: 'AMOUNT CREDIT',
    sortable: true,
    center: true,
    selector: row => row.credit
  },
  {
    name: 'TYPE',
    sortable: true,
    right: true,
    selector: row => <Badge color={row.type === 'add' ? 'info' : 'danger'}>{row.type}</Badge>
  },
  {
    name: 'REF NUM',
    sortable: true,
    right: true,
    selector: row => row.ref_num
  },
  {
    name: 'DESCRIPTION',
    sortable: true,
    right: true,
    selector: row => row.description
  },
  {
    name: 'CREATE DATE',
    sortable: true,
    right: true,
    selector: row => new Date(row.create_date).toLocaleString('th')
  }
]

const datas = [
  {
    name: 'pawat',
    level: 'test',
    credit: '231',
    type: 'add',
    ref_num: '1231',
    desciption: '1231',
    create_date: new Date()
  },
  {
    name: 'pawat',
    level: 'test',
    credit: '231',
    type: 'transfer',
    ref_num: '1231',
    desciption: '1231',
    create_date: new Date()
  }
]
function index() {
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
        breadCrumbActive={""}
        className={"col-md-2 col-12"}
      >
      </NavbarTitle>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h1>Manage Credit</h1>
            </CardHeader>
            <hr />
            <CardBody>
              <Row className='d-flex align-item-bottom align-bottom'>
                <Col>
                  <Label>Account<span style={{ color: 'red' }}>*</span></Label>
                  <Input type='select' requred>
                    <option>1</option>
                    <option>2</option>
                  </Input>
                </Col>
                <Col>
                  <Label>Add Credits<span style={{ color: 'red' }}>*</span></Label>
                  <Input type='number' min='0' requred />
                </Col>
                <Col>
                  <Label>Ref num.<span style={{ color: 'red' }}>*</span></Label>
                  <Input type='text' requred />
                </Col>
                <Col>
                  <Label>Description<span style={{ color: 'red' }}>*</span></Label>
                  <Input type='number' min='0' requred />
                </Col>
                <Col className="d-flex">
                  <Button color='primary mt-auto' onClick={addClick}>Add Credit</Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Row>
                <Col xs="5" sm='5'>
                  <FilterSearch />
                </Col>
                <Col xs='4' sm='5'>
                  <RangePicker style={{height:'100%'}}/>
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