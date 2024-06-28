import React, { useEffect, useState } from 'react'
import NavbarTitle from "@src/components/navbarTitle"
import { Badge, Button, Card, CardBody, CardHeader, Col, Input, Label, Row } from 'reactstrap'
import { notifySuccess, notifyFailed } from "@src/components/toast/notifyTopCenter"
import DataTable from 'react-data-table-component'
import PaginationAndRowPerPage from "@src/components/pagination/PaginationAndRowPerPage"
import FilterSearch from '@src/components/filter-search'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { popupConfirm } from '../../../../components/sweetalert'
import axiosInstance from '../../../../helper/axios'

function senderEdit() {
  const columns = [
    {
      name: 'SENDER NAME',
      sortable: true,
      selector: row => <Link to={`?key=${row.key}`} onClick={loadByID}>{row.name}</Link >
    },
    {
      name: 'CREATE DATE',
      sortable: true,
      selector: row => new Date(row.createdate).toLocaleString('th')
    },
    {
      name: 'ALLOW LIST',
      sortable: true,
      center: true,
      selector: row => row.ALLOWLIST_OPER
    },
    {
      name: 'White List',
      sortable: true,
      right: true,
      selector: row => row.WHITELIST_OPER
    },
    {
      name: 'STATUS',
      sortable: true,
      right: true,
      selector: row => <Badge color={row.status === false ? 'success' : 'danger'}>{row.status === false ? 'Active' : 'Inactive'}</Badge>
    }
  ]

  const { id } = useParams()
  const query = new URLSearchParams(window.location.search)
  const key = query.get('key')
  const [datas, setDatas] = useState([])
  const [input, setInput] = useState({ status: false })

  const inputChange = (event) => {
    const { name, value } = event.target

    setInput({
      ...input,
      [name]: value
    })
  }

  const inputCheck = (event) => {
    const { name, checked } = event.target

    setInput({
      ...input,
      [name]: checked
    })
  }
  const addClick = () => {
    const create = (type) => {
      if (type === 'confirm') {
        axiosInstance.post('/Sender/add_sender', {
          ...input,
          account_id: id
        }).then(result => {
          load()
          notifySuccess('add sender successfully.')
        })
      } else {
        notifyFailed('cannot record data. Please contact the system viewer.')
      }
    }

    const update = (type) => {
      if (type === 'confirm') {
        axiosInstance.post('/Sender/update_sender', {
          ...input,
          account_id: id,
          sender_id: key
        }).then(() => {
          load()
          notifySuccess('update sender successfully.')
        })
      } else {
        notifyFailed('cannot update data. Please contact the system viewer.')
      }
    }
    if (!key) {
      popupConfirm('Add new sender ?', create)
    } else {
      popupConfirm('Update sender ?', update)
    }
  }

  const allClick = (type, event) => {
    const { checked } = event.target
    if (type === 'allowlist') {
      setInput({
        ...input,
        allowlist_AIS: checked,
        allowlist_DTAC: checked,
        allowlist_TRUE: checked
      })
    } else {
      setInput({
        ...input,
        whitelist_AIS: checked,
        whitelist_DTAC: checked,
        whitelist_TRUE: checked
      })
    }
  }
  const load = () => {
    axiosInstance.post('/Sender/list_senders_by_account', { id })
      .then(result => {
        setDatas(result.data.sender_list)
      })
  }
  const loadByID = () => {
    axiosInstance.post('/sender/get_sender_byid', {
      id: key
    }).then(result => {
      const data = result.data
      setInput({
        allowlist_AIS: data.ALLOWLIST_OPER_AIS,
        allowlist_DTAC: data.ALLOWLIST_OPER_DTAC,
        allowlist_TRUE: data.ALLOWLIST_OPER_TRUE,
        allowlist: data.ALLOWLIST_OPER_AIS || data.ALLOWLIST_OPER_DTAC || data.ALLOWLIST_OPER_TRUE,
        whitelist_AIS: data.WHITELIST_OPER_AIS,
        whitelist_DTAC: data.WHITELIST_OPER_DTAC,
        whitelist_TRUE: data.WHITELIST_OPER_TRUE,
        whitelist: data.WHITELIST_OPER_AIS || data.WHITELIST_OPER_DTAC || data.WHITELIST_OPER_TRUE,
        sender_name: data.name,
        status: data.status
      })
    })
  }
  useEffect(() => {
    load()
    if (key) {
      loadByID()
    }
  }, [])

  useEffect(() => {
    if (input.whitelist_AIS === true || input.whitelist_DTAC === true || input.whitelist_TRUE === true) {
      setInput({
        ...input,
        whitelist: true
      })
    } else {
      setInput({
        ...input,
        whitelist: false
      })
    }
  }, [input.whitelist_AIS, input.whitelist_DTAC, input.whitelist_TRUE])

  useEffect(() => {
    if (input.allowlist_AIS === true || input.allowlist_DTAC === true || input.allowlist_TRUE === true) {
      setInput({
        ...input,
        allowlist: true
      })
    } else {
      setInput({
        ...input,
        allowlist: false
      })
    }
  }, [input.allowlist_AIS, input.allowlist_DTAC, input.allowlist_TRUE])
  return (
    <>
      <NavbarTitle
        breadCrumbTitle={"Sender List"}
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
                  <Label for='sender_name'>Sender Name<span style={{ color: 'red' }}>*</span></Label>
                  <Input id='sender_name' name='sender_name' type='text' onChange={inputChange} value={input.sender_name} requred>
                  </Input>
                </Col>
                <Col>
                  <Label>Status<span style={{ color: 'red' }}>*</span></Label>
                  <Input name='status' type='select' requred onChange={inputChange} value={input.status}>
                    <option value={false}>Active</option>
                    <option value={true}>Inactive</option>
                  </Input>
                </Col>
                <Col>
                  <Input type='checkbox' checked={input.allowlist} onClick={(event) => allClick('allowlist', event)} />
                  <div>Allow List<span style={{ color: 'red' }}>*</span></div>
                  <Input type='checkbox' name='allowlist_AIS' checked={input.allowlist_AIS} onChange={inputCheck} />
                  <div>AIS</div>
                  <Input type='checkbox' name='allowlist_DTAC' checked={input.allowlist_DTAC} onChange={inputCheck} />
                  <div>DTAC</div>
                  <Input type='checkbox' name='allowlist_TRUE' checked={input.allowlist_TRUE} onChange={inputCheck} />
                  <div>TRUE</div>
                  {/* <Input type='select' requred>
                    <option>All</option>
                    <option>Inactive</option>
                  </Input> */}
                </Col>
                <Col>
                  <Input type='checkbox' name='whitelist' checked={input.whitelist} onClick={(event) => allClick('whitelist', event)} />
                  <div>White List<span style={{ color: 'red' }}>*</span></div>
                  <Input type='checkbox' name='whitelist_AIS' checked={input.whitelist_AIS} onChange={inputCheck} />
                  <div>AIS</div>
                  <Input type='checkbox' name='whitelist_DTAC' checked={input.whitelist_DTAC} onChange={inputCheck} />
                  <div>DTAC</div>
                  <Input type='checkbox' name='whitelist_TRUE' checked={input.whitelist_TRUE} onChange={inputCheck} />
                  <div>TRUE</div>
                  {/* <Input type='select' requred>
                    <option>True</option>
                    <option>Dtac</option>
                  </Input> */}
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