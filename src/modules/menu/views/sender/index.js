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
import { Edit, Plus } from 'react-feather'
import axiosInstance from '../../../../helper/axios'

const columns = [
  {
    name: 'ACCOUNT NAME',
    sortable: true,
    selector: row => row.name
  },
  {
    name: 'SENDER AMOUNT',
    sortable: true,
    selector: row => row.count
  },
  {
    name: 'ACTION',
    sortable: true,
    center: true,
    selector: row => <Link to={`/sender/detail/${row.key}`}><Edit /></Link>
  }
]

function index() {
  const history = useHistory()
  const [datas, setDatas] = useState([])
  const [search, setSearch] = useState('')
  const [searchDatas, setSearchDatas] = useState([])

  const searchClick = async () => {
    if (search.trim() !== '') {
      const result = await datas.filter(x => x.name.includes(search))
      setSearchDatas(result)
    } else {
      setSearchDatas(datas)
    }
  }

  useEffect(() => {
    axiosInstance.post('/Sender/list_senders', {})
      .then(result => {
        setDatas(result?.data)
        setSearchDatas(result?.data)
      })
  }, [])
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
                  <FilterSearch search={search} setSearch={setSearch} />
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