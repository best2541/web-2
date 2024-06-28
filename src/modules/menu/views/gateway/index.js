import React, { useEffect, useState } from 'react'
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
import axiosInstance from '../../../../helper/axios'

const { RangePicker } = DatePicker

const columns = [
  {
    name: 'DISPLAYNAME',
    sortable: true,
    selector: row => <Link to={`/gateway/edit/${row.key}`}>{row.displayname}</Link>
  },
  {
    name: 'URL',
    sortable: true,
    selector: row => row.url
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
    selector: row => row.number
  },
  {
    name: 'OPERATOR',
    sortable: true,
    right: true,
    selector: row => row.operators
  },
  {
    name: 'CREATE DATE',
    sortable: true,
    right: true,
    selector: row => new Date(row.createdate).toLocaleString('th')
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
    selector: row => <Link to={`/gateway/edit/${row.key}`}><Edit /></Link>
  }
]

function index() {
  const history = useHistory()
  const [datas, setDatas] = useState([])
  const [search, setSearch] = useState('')
  const [searchDatas, setSearchDatas] = useState([])
  const [searchD, setSearchD] = useState([new Date('1-1-1990'), new Date()])

  const searchClick = async () => {
    const result = await datas.filter(x => x?.displayname?.includes(search) && new Date(x.createdate) >= searchD[0] && new Date(x.createdate) <= searchD[1])
    setSearchDatas(result)
  }

  useEffect(() => {
    axiosInstance.post('/api/gateway/list_gateway')
      .then(result => {
        setDatas(result?.data)
        setSearchDatas(result?.data)
      })
  }, [])
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
                  <FilterSearch search={search} setSearch={setSearch} />
                </Col>
                <Col xs='4' sm='5'>
                  <RangePicker style={{ height: '100%' }} onChange={(event) => (event ? setSearchD(event) : setSearchD([new Date('1-1-1990'), new Date()]))} />
                </Col>
                <Col xs='3' sm='2'>
                  <Button color='primary' outline onClick={searchClick}>Search</Button>
                </Col>
              </Row>
              <DataTable
                columns={columns}
                data={searchDatas}
                pagination
              />
              {/* <PaginationAndRowPerPage
                className="react-dataTable react-dataTable-custom-otp text-primary color-primary"
                currentPage={0}
                perPage={10}
                totalPage={20}
              // handlePagination={val => handlePagination(val)}
              // handleRowPerPage={val => handleRowPerPage(val)}
              /> */}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
    </>
  )
}

export default index