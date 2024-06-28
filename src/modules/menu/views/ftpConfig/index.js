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
    name: 'NAME',
    sortable: true,
    selector: row => <Link to={`/ftpconfig/edit/${row.FTP_ID}`}>{row.ACC_NAME}</Link>
  },
  {
    name: 'PROTACAL',
    sortable: true,
    selector: row => row.FTP_PROTOCAL
  },
  {
    name: 'HOSTNAME',
    sortable: true,
    center: true,
    selector: row => row.FTP_HOSTNAME
  },
  {
    name: 'USERNAME',
    sortable: true,
    right: true,
    selector: row => row.FTP_USERNAME
  },
  {
    name: 'PASSWORD',
    sortable: true,
    right: true,
    selector: row => row.FTP_PASSWORD
  },
  {
    name: 'PATH',
    sortable: true,
    right: true,
    selector: row => row.FTP_PATH
  },
  {
    name: 'UPDATE DATE',
    sortable: true,
    right: true,
    selector: row => row.FTP_UPDATE_DATE
  },
  {
    name: 'STATUS',
    sortable: true,
    right: true,
    selector: row => <Badge color={row.FTP_IS_DELETE ? 'danger' : 'success'}>{row.FTP_IS_DELETE ? 'Inactive' : 'Active'}</Badge>
  },
  {
    name: 'ACTION',
    sortable: true,
    right: true,
    selector: row => <Link to={`/ftpconfig/edit/${row.FTP_ID}`}><Edit /></Link>
  }
]

function FTPConfig() {
  const history = useHistory()
  const [datas, setDatas] = useState([])
  const [search, setSearch] = useState('')
  const [searchDatas, setSearchDatas] = useState([])
  const [searchD, setSearchD] = useState([new Date('1-1-1990'), new Date()])

  const searchClick = async () => {
    const result = await datas.filter(x => (x?.FTP_HOSTNAME)?.includes((search)))
    setSearchDatas(result)
  }

  useEffect(() => {
    axiosInstance.get('/api/FtpConfig/get')
      .then(result => {
        setDatas(result?.data)
        setSearchDatas(result?.data)
      })
  }, [])
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
                <Col xs="9" sm='10'>
                  <FilterSearch search={search} setSearch={setSearch} />
                </Col>
                {/* <Col xs='4' sm='5'>
                  <RangePicker style={{ height: '100%' }} onChange={(event) => (event ? setSearchD(event) : setSearchD([new Date('1-1-1990'), new Date()]))} />
                </Col> */}
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

export default FTPConfig