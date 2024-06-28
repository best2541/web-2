import React, { useEffect, useState } from 'react'
import NavbarTitle from "@src/components/navbarTitle"
import { Button, Card, CardBody, CardHeader, Col, Input, Label, Row } from 'reactstrap'
import { Edit, FileText, Plus, Trash } from 'react-feather'
import DataTable from 'react-data-table-component'
import PaginationAndRowPerPage from "@src/components/pagination/PaginationAndRowPerPage"
import FilterSearch from '@src/components/filter-search'
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { popupConfirm, popupInputCustom } from '../../../../components/sweetalert'
import { notifySuccess, notifyFailed } from "@src/components/toast/notifyTopCenter"
import { Space, Tabs, Badge } from 'antd'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Box, Modal } from '@material-ui/core'

function RequestSender() {
  const columns = [
    {
      name: 'Account Name',
      sortable: true,
      selector: row => row.acc_name
    },
    {
      name: 'Sender Name',
      sortable: true,
      center: true,
      selector: row => row.sender_name
    },
    {
      name: 'Create Date',
      sortable: true,
      right: true,
      selector: row => new Date(row.create_date)?.toLocaleString('th')
    },
    {
      name: 'Last Update',
      sortable: true,
      right: true,
      selector: row => new Date(row.update_date)?.toLocaleString('th')
    },
    {
      name: 'Request',
      sortable: true,
      right: true,
      selector: row => row.request
    },
    {
      name: 'Document',
      sortable: true,
      right: true,
      selector: row => <FileText className='cursor' onClick={() => setOpen(row.key)} />
    },
    {
      name: 'Accept',
      center: true,
      width: '200px',
      selector: row => <><Button color='danger' size='sm' outline onClick={() => reject(1, row)}>Reject</Button><Button color='primary' size='sm' onClick={() => approve(1, row)}>Submit</Button></>
    }
  ]
  const columns2 = [
    {
      name: 'Account Name',
      sortable: true,
      selector: row => row.acc_name
    },
    {
      name: 'Sender Name',
      sortable: true,
      center: true,
      selector: row => row.sender_name
    },
    {
      name: 'Create Date',
      sortable: true,
      right: true,
      selector: row => row.create_date
    },
    {
      name: 'Last Update',
      sortable: true,
      right: true,
      selector: row => new Date(row.update_date).toLocaleString('th')
    },
    {
      name: 'Document',
      sortable: true,
      right: true,
      selector: row => <FileText className='cursor' onClick={() => handleOpen(row.key)} />
    },
    {
      name: 'Accept',
      center: true,
      width: '200px',
      selector: row => (row.allowlist === '4' ? <span className='text-success'>APPROVE</span> : row.allowlist === '5' ? <span className='text-danger'>REJECT</span> : <><Button color='danger' size='sm' outline onClick={() => reject(2, row)}>Reject</Button><Button color='primary' size='sm' onClick={() => approve(2, row)}>Submit</Button></>)
    },
    {
      name: 'WhiteList',
      center: true,
      width: '200px',
      selector: row => (row.whitelist === '4' ? <span className='text-success'>APPROVE</span> : row.whitelist === '5' ? <span className='text-danger'>REJECT</span> : <><Button color='danger' size='sm' outline onClick={() => reject(3, row)}>Reject</Button><Button color='primary' size='sm' onClick={() => approve(3, row)}>Submit</Button></>)
    }
  ]
  const columns3 = [
    {
      name: 'Account Name',
      sortable: true,
      selector: row => row.acc_name
    },
    {
      name: 'Sender Name',
      sortable: true,
      center: true,
      selector: row => row.sender_name
    },
    {
      name: 'Create Date',
      sortable: true,
      right: true,
      selector: row => row.create_date
    },
    {
      name: 'Last Update',
      sortable: true,
      right: true,
      selector: row => new Date(row.update_date).toLocaleString('th')
    },
    {
      name: 'Document',
      sortable: true,
      right: true,
      selector: row => <FileText className='cursor' onClick={() => setOpen(row.key)} />
    },
    {
      name: 'Reason',
      center: true,
      selector: row => row.reason_reject
    }
  ]

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
  }

  const history = useHistory()
  const [accountname, setAccountname] = useState('')
  const [sender_name, setSender_name] = useState('')
  const [tab, setTab] = useState('1')
  const [d1, setD1] = useState({})
  const [d2, setD2] = useState({})
  const [d3, setD3] = useState({})
  const [datas1, setDatas1] = useState({})
  const [datas2, setDatas2] = useState({})
  const [datas3, setDatas3] = useState({})
  const [open, setOpen] = useState(false)

  const handleOpen = (key) => {
    axios.post(`${process.env.REACT_APP_SENDER_URL}/sender/getsender_detail`, {
      rsd_key: key
    }).then(result => {
      if (result.data.statusCode === '200') {
        setOpen(result.data)
      }
    })
  }
  const handleClose = () => {
    setOpen(false)
  }

  const load = () => {
    axios.post(`${process.env.REACT_APP_SENDER_URL}/sender/getsender_requestlist`, {
      accountname,
      sender_name,
      rsd_status: "1",
      limit: 999,
      offset: 1
    }).then(result => {
      setDatas1(result.data)
      setD1(result.data)
    })
    axios.post(`${process.env.REACT_APP_SENDER_URL}/sender/getsender_requestlist`, {
      accountname,
      sender_name,
      rsd_status: "2,3",
      limit: 999,
      offset: 1
    }).then(result => {
      setDatas2(result.data)
      setD2(result.data)
    })
    axios.post(`${process.env.REACT_APP_SENDER_URL}/sender/getsender_requestlist`, {
      accountname,
      sender_name,
      rsd_status: "5",
      limit: 999,
      offset: 1
    }).then(result => {
      setDatas3(result.data)
      setD3(result.data)
    })
  }
  function approve(type, event) {
    Swal.fire({
      title: `Do you want to submit ${event.acc_name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Submit"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.post(`${process.env.REACT_APP_SENDER_URL}/sender/update_senderstatus`, {
          ...event,
          username: window.localStorage.getItem('email'),
          account: event.acc_id,
          list_key: event.list_key,
          list_rsd: event.list_rsd,
          reason_reject: event.reason_reject,
          reason_use: event.reason_use,
          sender_id: event.sender_id,
          sender_name: event.sender_name,
          sender_request: event.sender_request,
          status: '4',
          type
        }).then(() => {
          notifySuccess('Success')
          load()
        })
      }
    })
  }
  async function reject(type, event) {
    const { value: reason } = await Swal.fire({
      icon: 'warning',
      input: "text",
      inputLabel: `Do you want to Reject ${event.acc_name}`,
      inputValue: '',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!"
        }
      }
    })
    if (reason) {
      axios.post(`${process.env.REACT_APP_SENDER_URL}/sender/update_senderstatus`, {
        ...event,
        username: window.localStorage.getItem('email'),
        account: event.acc_id,
        list_key: event.list_key,
        list_rsd: event.list_rsd,
        reason_reject: reason,
        reason_use: event.reason_use,
        sender_id: event.sender_id,
        sender_name: event.sender_name,
        sender_request: event.sender_request,
        status: '5',
        type
      }).then(() => {
        notifySuccess('Success')
        load()
      })
    }
  }
  const searchClick = async () => {
    if (accountname.trim().length > 0 && sender_name.trim().length === 0) {
      const result1 = await (datas1?.data || []).filter(x => x.acc_id.includes(accountname))
      const result2 = await (datas2?.data || []).filter(x => x.acc_id.includes(accountname))
      const result3 = await (datas3?.data || []).filter(x => x.acc_id.includes(accountname))
      setD1({ ...datas1, data: result1 })
      setD2({ ...datas2, data: result2 })
      setD3({ ...datas3, data: result3 })
    } else if (sender_name.trim().length > 0 && accountname.trim().length === 0) {
      const result1 = await (datas1?.data || []).filter(x => x.sender_name.includes(sender_name))
      const result2 = await (datas2?.data || []).filter(x => x.sender_name.includes(sender_name))
      const result3 = await (datas3?.data || []).filter(x => x.sender_name.includes(sender_name))
      setD1({ ...datas1, data: result1 })
      setD2({ ...datas2, data: result2 })
      setD3({ ...datas3, data: result3 })
    } else {
      const result1 = await (datas1?.data || []).filter(x => x.acc_id.includes(accountname) || x.sender_name.includes(sender_name))
      const result2 = await (datas2?.data || []).filter(x => x.acc_id.includes(accountname) || x.sender_name.includes(sender_name))
      const result3 = await (datas3?.data || []).filter(x => x.acc_id.includes(accountname) || x.sender_name.includes(sender_name))
      setD1({ ...datas1, data: result1 })
      setD2({ ...datas2, data: result2 })
      setD3({ ...datas3, data: result3 })
    }
  }
  useEffect(() => {
    load()
  }, [])
  return (
    <>
      <NavbarTitle
        breadCrumbTitle={"Request Sender"}
        breadCrumbActive={""}
        className={"col-md-2 col-12"}
      >
      </NavbarTitle>
      <Row>
        <Col>
          <Card>
            <CardHeader><h1>Sender</h1></CardHeader>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={{ ...style, width: '70%' }}>
                <Card>
                  <CardHeader>
                    <h3 className='text-primary'>Sender</h3>
                  </CardHeader>
                  <hr />
                  {open.req_sender?.length > 0 && open.req_sender_list?.length > 0 &&
                    <CardBody>
                      <Row>
                        <Col><h4 className='text-secondary'>Sender Infomation</h4></Col>
                      </Row>
                      <Row>
                        <Col md='6' lg='4'>
                          <h5 className='text-primary'>Firstname</h5>
                          <h5 className='text-secondary'>{open?.req_sender[0]?.rsd_first_name}</h5>
                        </Col>
                        <Col md='6' lg='4'>
                          <h5 className='text-primary'>Lastname</h5>
                          <h5 className='text-secondary'>{open?.req_sender[0]?.rsd_last_name}</h5>
                        </Col>
                        <Col md='6' lg='4'>
                          <h5 className='text-primary'>Email</h5>
                          <h5 className='text-secondary'>{open?.req_sender[0]?.rsd_email}</h5>
                        </Col>
                        <Col md='6' lg='4'>
                          <h5 className='text-primary'>Contact</h5>
                          <h5 className='text-secondary'>{open?.req_sender[0]?.rsd_contact_number}</h5>
                        </Col>
                        <Col md='6' lg='4'>
                          <h5 className='text-primary'>Store Name</h5>
                          <h5 className='text-secondary'>{open?.req_sender[0]?.rsd_contact_name}</h5>
                        </Col>
                        <Col md='6' lg='4'>
                          <h5 className='text-primary'>WebSite(Optional)</h5>
                          <h5 className='text-secondary'>{open?.req_sender[0]?.rsd_website}</h5>
                        </Col>
                        <Col md='6' lg='4'>
                          <h5 className='text-primary'>Identification Document</h5>
                          <Button size='sm' color='primary'><FileText className='cursor' />Download</Button>
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>
                          <h4>Sender Name Infomation</h4>
                        </Col>
                      </Row>
                      <Row>
                        <Col md='6' lg='4'>
                          <h5 className='text-primary'>Sender Name</h5>
                          <h5 className='text-secondary'>{open?.req_sender_list[0]?.sender_name}</h5>
                        </Col>
                        <Col md='6' lg='4'>
                          <h5 className='text-primary'>Reason of User</h5>
                          <h5 className='text-secondary'>{open?.req_sender_list[0]?.reason_use}</h5>
                        </Col>
                        <Col md='6' lg='4'>
                          <h5 className='text-primary'>Message Example</h5>
                          <h5 className='text-secondary'>{open?.req_sender_list[0]?.ex_text}</h5>
                        </Col>
                        <Col md='6' lg='4'>
                          <h5 className='text-primary'>Signature</h5>
                          <img
                            style={{ width: "240px", display: "block" }}
                            // src={`data:image/jpeg;base64,${imgdata}`}
                            src={`${process.env.REACT_APP_SENDER_URL}/${open?.req_sender[0].rsd_sig}`}
                            alt=""
                          />
                          <input type='checkbox' checked={open?.req_sender_list[0].is_whitelist} disabled/> <span className='text-secondary font-weight-bold'>Request Whitelist</span>
                        </Col>
                      </Row>
                      <hr />
                      <Button color='primary'>Download Document</Button>
                    </CardBody>
                  }
                </Card>
              </Box>
            </Modal>
            <CardBody>
              <Tabs
                defaultActiveKey="1"
                onChange={(event) => setTab(event)}
                items={[
                  {
                    label: <Space>Pending for CSM Review<Badge count={datas1.total} color="#faad14" /></Space>,
                    key: '1'
                  },
                  {
                    label: <Space>Waiting for approval<Badge count={datas2.total} showZero color="#faad14" /></Space>,
                    key: '2,3'
                  },
                  {
                    label: <Space>Rejected<Badge count={datas3.total} showZero color="#faad14" /></Space>,
                    key: '5'
                  }
                ]}
              />
              <Row className='d-flex align-item-bottom align-bottom'>
                <Col xs="4" sm='5'>
                  <Label>Account Name</Label>
                  <Input onChange={(event) => setAccountname(event.target.value)} />
                </Col>
                <Col xs="4" sm='5'>
                  <Label>Sender Name</Label>
                  <Input onChange={(event) => setSender_name(event.target.value)} />
                </Col>
                <Col xs='4' sm='2' className="d-flex">
                  <Button color='primary mt-auto' outline onClick={searchClick}>Search</Button>
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
              {tab === '1' &&
                <DataTable
                  columns={columns}
                  data={d1?.data || []}
                  pagination
                />
              }
              {tab === '2,3' &&
                <DataTable
                  columns={columns2}
                  data={d2?.data || []}
                  pagination
                />
              }
              {tab === '5' &&
                <DataTable
                  columns={columns3}
                  data={d3?.data || []}
                  pagination
                />
              }
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

export default RequestSender