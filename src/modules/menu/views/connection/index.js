import React, { useEffect, useState } from 'react'
import NavbarTitle from "@src/components/navbarTitle"
import { Badge, Button, Card, CardBody, Col, Row } from 'reactstrap'
import { Edit, Plus } from 'react-feather'
import DataTable from 'react-data-table-component'
import PaginationAndRowPerPage from "@src/components/pagination/PaginationAndRowPerPage"
import FilterSearch from '@src/components/filter-search'
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { DatePicker } from 'antd'
import axiosInstance from '../../../../helper/axios'

const { RangePicker } = DatePicker
const columns = [
  {
    name: 'DISPLAYNAME',
    sortable: true,
    selector: row => <Link to={`/connection/edit/${row.id}`}>{row.name}</Link>
  },
  {
    name: 'USERNAME',
    sortable: true,
    selector: row => row.user
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
    selector: row => row.database
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
    selector: row => row.createdate && new Date(row?.createdate).toLocaleString('th')
  },
  {
    name: 'STATUS',
    sortable: true,
    right: true,
    selector: row => <Badge color={row.active ? 'success' : 'danger'}>{row.active ? 'Active' : 'Inactive'}</Badge>
  },
  {
    name: 'ACTION',
    sortable: true,
    right: true,
    selector: row => <Link to={`/connection/edit/${row.id}`}><Edit /></Link>
  }
]

function Connection() {
  const history = useHistory()
  const [datas, setDatas] = useState([])
  const [search, setSearch] = useState('')
  const [searchDatas, setSearchDatas] = useState([])
  const [searchD, setSearchD] = useState([new Date('1-1-1990'), new Date()])

  const searchClick = async () => {
    const result = await datas.filter(x => x?.name?.includes(search) && new Date(x.createdate) >= searchD[0] && new Date(x.createdate) <= searchD[1])
    setSearchDatas(result)
  }

  useEffect(() => {
    axiosInstance.post('/api/connection/list')
      .then(result => {
        setDatas(result?.data)
        setSearchDatas(result?.data)
      })
  }, [])
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

export default Connection