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
import axiosInstance from '../../../../helper/axios'

const { RangePicker } = DatePicker

const getType = (value) => {
  if (value === 6) {
    return 'Transfer'
  } else if (value === 4) {
    return 'Move'
  } else if (value === 1) {
    return 'Add'
  } else {
    return 'value'
  }
}
const getBg = (value) => {
  if (value === 6) {
    return 'danger'
  } else {
    return 'secondary'
  }
}
const columns = [
  {
    name: 'ACCOUNT',
    sortable: true,
    selector: row => <Link to={`/accounts/edit/${row.account_id}`}>{row.name}</Link>
  },
  {
    name: 'LEVEL',
    sortable: true,
    center: true,
    selector: row => row.Account_level
  },
  {
    name: 'AMOUNT CREDIT',
    sortable: true,
    right: true,
    selector: row => row.amount
  },
  {
    name: 'TYPE',
    sortable: true,
    right: true,
    selector: row => <Badge color={getBg(row.type)}>{getType(row.type)}</Badge>
  },
  {
    name: 'REF NUM',
    sortable: true,
    right: true,
    selector: row => row.received
  },
  {
    name: 'DESCRIPTION',
    sortable: true,
    right: true,
    selector: row => row.remark
  },
  {
    name: 'CREATE DATE',
    sortable: true,
    right: true,
    selector: row => new Date(row.createdate).toLocaleString('th')
  }
]

function index() {
  const history = useHistory()
  const [datas, setDatas] = useState([])
  const [accounts, setAccounts] = useState([])
  const [input, setInput] = useState({})
  const [search, setSearch] = useState('')
  const [searchDatas, setSearchDatas] = useState([])

  const inputChange = (event) => {
    const { name, value } = event.target
    setInput({
      ...input,
      [name]: value
    })
  }
  const load = () => {
    axiosInstance.post('/api/accounts/list_accounts')
      .then(result => {
        if (result?.data) {
          setAccounts(result?.data)
        }
      })
    axiosInstance.post('/api/credits/history_credits', { account_id: '' })
      .then(result => {
        if (result?.data) {
          setDatas(result.data)
          setSearchDatas(result.data)
        }
      })
  }
  const addClick = (event) => {
    event.preventDefault()
    const check = (type) => {
      if (type === 'confirm') {
        axiosInstance.post('/api/credits/add_credits', {
          token: window.localStorage.getItem('accessToken'),
          ...input
        }).then(() => {
          notifySuccess('Adding credit successfully.')
          axiosInstance.post('/api/accounts/list_accounts')
            .then(result => {
              if (result?.data) {
                setAccounts(result?.data)
              }
            })
          axiosInstance.post('/api/credits/history_credits', { account_id: '' })
            .then(result => {
              if (result?.data) {
                setDatas(result.data)
              }
            })
        }).catch(err => {
          notifyFailed('cannot record data. Please contact the system viewer.')
        })
      }
    }
    popupConfirm('test', check)
  }

  const searchClick = async () => {
    if (search.trim() !== '') {
      const result = await datas.filter(x => x.name.includes(search))
      setSearchDatas(result)
    } else {
      setSearchDatas(datas)
    }
  }

  useEffect(() => {
    load()
  }, [])
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
              <form onSubmit={addClick}>
                <Row className='d-flex align-item-bottom align-bottom'>
                  <Col>
                    <Label>Account<span style={{ color: 'red' }}>*</span></Label>
                    <Input name='account_id' type='select' onChange={inputChange} required>
                      <option value={null}>--select--</option>
                      {accounts.length > 0 && accounts?.map(acc => (
                        <option value={acc.key}>{acc.name}</option>
                      ))}
                    </Input>
                  </Col>
                  <Col>
                    <Label>Add Credits<span style={{ color: 'red' }}>*</span></Label>
                    <Input name='amount' type='number' min='0' onChange={inputChange} required />
                  </Col>
                  <Col>
                    <Label>Ref num.<span style={{ color: 'red' }}>*</span></Label>
                    <Input name='received' type='text' onChange={inputChange} required />
                  </Col>
                  <Col>
                    <Label>Description<span style={{ color: 'red' }}>*</span></Label>
                    <Input name='remark' type='text' min='0' onChange={inputChange} required />
                  </Col>
                  <Col className="d-flex">
                    <Button color='primary mt-auto' type='submit'>Add Credit</Button>
                  </Col>
                </Row>
              </form>
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