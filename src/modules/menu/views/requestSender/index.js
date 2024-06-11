import React, { useState } from 'react'
import NavbarTitle from "@src/components/navbarTitle"
import { Badge, Button, Card, CardBody, CardHeader, Col, Input, Label, Row } from 'reactstrap'
import { Edit, Plus, Trash } from 'react-feather'
import DataTable from 'react-data-table-component'
import PaginationAndRowPerPage from "@src/components/pagination/PaginationAndRowPerPage"
import FilterSearch from '@src/components/filter-search'
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { popupConfirm } from '../../../../components/sweetalert'
import { notifySuccess, notifyFailed } from "@src/components/toast/notifyTopCenter"
import { Tabs } from 'antd'

const deleteClick = () => {
  const check = (type) => {
    if (type === 'confirm') {
      notifySuccess('add credit successfully.')
    } else {
      notifyFailed('cannot record data. Please contact the system viewer.')
    }
  }
  popupConfirm('test', check)
}
const columns = [
  {
    name: 'ACCOUNT ID',
    sortable: true,
    selector: row => row.name
  },
  {
    name: 'ACCOUNT NAME',
    sortable: true,
    selector: row => row.protocal
  },
  {
    name: 'TEMPLATE',
    sortable: true,
    center: true,
    selector: row => row.hostname
  },
  {
    name: 'DUE DATE',
    sortable: true,
    right: true,
    selector: row => row.username
  },
  {
    name: 'START DATE',
    sortable: true,
    right: true,
    selector: row => row.password
  },
  {
    name: 'FINISH DATE',
    sortable: true,
    right: true,
    selector: row => row.path
  },
  {
    name: 'ACTION',
    sortable: true,
    right: true,
    selector: row => <><Button>Reject</Button><Button>Submit</Button></>
  }
]

const datas = [
  {
    name: 'test',
    protocal: 'http',
    hostname: 'www',
    username: 'username',
    password: 'password',
    path: '/',
    update_date: new Date(),
    status: true
  }
]
function RequestSender() {
  const history = useHistory()
  const [selectableRows, setSelectableRows] = useState([])
  return (
    <>
      <NavbarTitle
        breadCrumbTitle={"Request Sender"}
        breadCrumbActive={""}
        className={"col-md-2 col-12"}
      >

        <Button color='primary' onClick={() => history.push('/configbilling/add')}><Plus /> Add</Button>
      </NavbarTitle>
      <Row>
        <Col>
          <Card>
            <CardHeader><h1>Sender in Account1</h1></CardHeader>
            <CardBody>
              <Tabs
                defaultActiveKey="1"
                items={[
                  {
                    label: 'Pending for CSM Review',
                    key: '1',
                    children: (
                      <>
                        <Row>
                          <Col xs="4" sm='5'>
                            <Label>Account Name</Label>
                            <Input />
                          </Col>
                          <Col xs="4" sm='5'>
                            <Label>Sender Name</Label>
                            <Input />
                          </Col>
                          <Col xs='4' sm='2'>
                            <Button color='primary' outline>Search</Button>
                          </Col>
                        </Row>
                        <DataTable
                          columns={columns}
                          data={datas}
                        />
                      </>
                    )
                  },
                  {
                    label: 'Waiting for approval',
                    key: '2',
                    children: 'Tab 2'
                  },
                  {
                    label: 'Rejected',
                    key: '3',
                    children: 'Tab 3'
                  }
                ]}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
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
                selectableRowsVisibleOnly={true}
                selectableRows={selectableRows}
                keyField="_id"
                fixedHeader={true}
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

export default RequestSender