import React, { useState, useEffect } from 'react'
import NavbarTitle from "@src/components/navbarTitle"
import { Badge, Button, Card, CardBody, Col, Row } from 'reactstrap'
import { Plus } from 'react-feather'
import DataTable from 'react-data-table-component'
import PaginationAndRowPerPage from "@src/components/pagination/PaginationAndRowPerPage"
import FilterSearch from '@src/components/filter-search'
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import axiosInstance from '../../../../helper/axios'

const columns = [
  {
    name: 'NAME',
    sortable: true,
    selector: row => <Link to={`/accounts/edit/${row.key}`}>{row.name}</Link>
  },
  {
    name: 'LEVEL',
    sortable: true,
    selector: row => row.Account_level
  },
  {
    name: 'PARENT',
    sortable: true,
    center: true,
    selector: row => row.parent
  },
  {
    name: 'GATEWAY',
    sortable: true,
    right: true,
    selector: row => row.gateway
  },
  {
    name: 'EMAIL',
    sortable: true,
    right: true,
    selector: row => row.email
  },
  {
    name: 'TYPE',
    sortable: true,
    right: true,
    selector: row => <Badge color={row.pay_type === 2 ? 'danger' : 'secondary'} pill>{row.pay_type === 2 ? 'Postpaid' : 'Prepaid'}</Badge>
  },
  {
    name: 'COST(THB)',
    sortable: true,
    right: true,
    selector: row => row.cost
  },
  {
    name: 'CREATE DATE',
    sortable: true,
    right: true,
    selector: row => row.createdate
  },
  {
    name: 'STATUS',
    sortable: true,
    right: true,
    selector: row => <Button size='sm' color={row.status === true ? 'success' : 'danger'} disabled>{row.status === true ? 'Active' : 'Inactive'}</Button>
  }
]

function index() {
  const history = useHistory()
  const [datas, setDatas] = useState([])
  const [search, setSearch] = useState('')
  const [searchDatas, setSearchDatas] = useState([])
  useEffect(async () => {
    // axiosInstance.post('https://backendapi.ants.co.th/api/ValidateToken', `"${window.localStorage.getItem('accessToken')}"`, {
    //   headers: {
    //     'content-type': 'application/json'
    //   }
    // })
    //   .then(result => {
    //     console.log('test', result)
    //   })
    axiosInstance.post('/api/accounts/list_accounts')
      .then(result => {
        setDatas(result.data)
        setSearchDatas(result.data)
      })
  }, [])

  const searchClick = async () => {
    if (search.trim() !== '') {
      const result = await datas.filter(x => x.name.includes(search))
      setSearchDatas(result)
    } else {
      setSearchDatas(datas)
    }
  }
  return (
    <>
      <NavbarTitle
        breadCrumbTitle={"Account List"}
        breadCrumbActive={""}
        className={"col-md-2 col-12"}
      >

        <Button color='primary' onClick={() => history.push('/accounts/new')}><Plus /> New Account</Button>
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
                rows={5}
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