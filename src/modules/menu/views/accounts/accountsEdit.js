import React, { useEffect, useState } from 'react'
import NavbarTitle from "@src/components/navbarTitle"
import FilterSearch from '@src/components/filter-search'
import InputDate from '@src/components/input-date'
import { notifySuccess, notifyFailed } from "@src/components/toast/notifyTopCenter"
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { Switch } from 'antd'
import { Plus, Share } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom'
import axiosInstance from '../../../../helper/axios'

function accountsEdit() {
  const columns = [
    {
      name: 'USERNAME',
      sortable: true,
      selector: row => <Link to={`/accounts/user/edit/${id}/${row.key}`}>{row.username}</Link>
    },
    {
      name: 'LEVEL',
      sortable: true,
      selector: row => row.level
    },
    {
      name: 'EMAIL',
      sortable: true,
      center: true,
      selector: row => row.email
    },
    {
      name: 'ADMIN',
      sortable: true,
      right: true,
      selector: row => (row.admin ? 'Yes' : 'No')
    },
    {
      name: 'CREATE SUB ACC',
      sortable: true,
      right: true,
      selector: row => (row.createsub ? 'Yes' : 'No')
    },
    {
      name: 'CREATE USER',
      sortable: true,
      right: true,
      selector: row => (row.createuser ? 'Yes' : 'No')
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
      selector: row => <Button size='sm' color='success' disabled>Active</Button>
    },
    {
      name: 'ACTION',
      sortable: true,
      right: true,
      selector: row => <Link to={`/accounts/user/edit/${id}/${row.key}`}><Share /></Link>
    }
  ]
  const { id } = useParams()
  const [input, setInput] = useState({ game: false, priority: '1', pay_type: '1' })
  const [list_gateway, setList_gateway] = useState([])
  const [list_connection, setList_connection] = useState([])
  const [list_industryType, setList_industryType] = useState([])
  const [list_users, setList_users] = useState([])
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [date, setDate] = useState([])

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
  const submitClick = (event) => {
    event.preventDefault()
    // let accountType = {}
    input.connectionApi = ''
    if (input.accountType === '1') {
      input.test = true
      input.ecom = false
      input.reseller = false
      // accountType = {
      //   test: true,
      //   ecom: false,
      //   reseller: false
      // }
    } else if (input.accountType === '2') {
      input.test = false
      input.ecom = true
      input.reseller = false
      // accountType = {
      //   test: false,
      //   ecom: true,
      //   reseller: false
      // }
    } else if (input.accountType === '3') {
      input.test = false
      input.ecom = false
      input.reseller = true
      // accountType = {
      //   test: false,
      //   ecom: false,
      //   reseller: true
      // }
    }
    const formData = new FormData()
    const test = ({
      id,
      name: input.name,
      email: input.email,
      status: input.status,
      pay_type: input.pay_type,
      gateway: input.gateway,
      cost: input.cost ? input.cost : input.costmin,
      connection: input.connection,
      connectionApi: '',
      industry: input.industry === "" || input.industry === null ? 0 : input.industry,
      apiType: input.apiType === null ? false : input.apiType,
      ftpType: input.ftpType === null ? false : input.ftpType,
      otpType: input.otpType === null ? false : input.otpType,
      test: input.test === null ? false : input.test,
      ecom: input.ecom === null ? false : input.ecom,
      reseller: input.reseller === null ? false : input.reseller,
      game: input.game,
      priority: input.priority === null ? 0 : input.priority,
      apiDirectType: input.apiDirectType === null ? false : input.apiDirectType,
      ftpHostName: input?.ftpHostName || '',
      ftpPort: input?.ftpPort || '',
      ftpUsername: input?.ftpUsername || '',
      ftpPassword: input?.ftpPassword || '',
      ftpProtocol: input?.ftpProtocol || '',
      limitcredits: input.limitcredits === null ? 0 : input.limitcredits,
      Per_Submit: input.Per_Submit === null ? false : input.Per_Submit,
      Operator_Policy: input.Operator_Policy === null ? false : input.Operator_Policy,
      Send_Abroad: input.Send_Abroad === null ? false : input.Send_Abroad,
      BlackList: input.BlackList === null ? false : input.BlackList,
      rsa: input.rsa === null ? false : input.rsa,
      rsa_key_ecm: input.rsa_key_ecm === null ? "" : input.rsa_key_ecm,
      Link_blacklist: input.Link_blacklist === null ? false : input.Link_blacklist,
      companyName: input.companyName
    })
    formData.append('req', JSON.stringify(test))
    axiosInstance.post('/api/accounts/edit_accounts', formData)
      .then(result => {
        notifySuccess('Success')
      })
  }
  useEffect(() => {
    axiosInstance.post('/api/accounts/list_accounts_byid', {
      account_id: id
    }).then(result => {
      if (result?.data?.length > 0) {
        setInput({
          ...result.data[0],
          gateway: result.data[0].gateway_id
        })
      }
    })
    axiosInstance.post('/api/gateway/list_gateway')
      .then(result => {
        if (result?.data?.length > 0) {
          setList_gateway(result.data)
        }
      })
    axiosInstance.post('/api/connection/list_dropdown', { type: 1 })
      .then(result => {
        if (result?.data?.length > 0) {
          setList_connection(result.data)
        }
      })
    //อันนี้ใช้ทำอะไร
    axiosInstance.post('/api/connection/list_dropdown', { type: 2 })
      .then(result => {
      })
    axiosInstance.post('/api/accounts/industryType')
      .then(result => {
        if (result?.data?.length > 0) {
          setList_industryType(result.data)
        }
      })
    axiosInstance.post('/api/accounts/list_Users', {
      account_id: id,
      user_id: null
    }).then(result => {
      if (result?.data?.length > 0) {
        setList_users(result.data)
        setUsers(result.data)
      }
    })
  }, [])

  const searchClick = () => {
    if (date.length > 0) {
      setUsers(list_users.filter(x => x.username.includes(search) && new Date(x.createdate).toLocaleDateString('th') === new Date(date).toLocaleDateString('th')))
    } else {
      setUsers(list_users.filter(x => x.username.includes(search)))
    }
  }
  return (
    <>
      <NavbarTitle
        breadCrumbTitle={"Account List"}
        breadCrumbActive={"Manage Account"}
        className={"col-md-2 col-12"}
      >
      </NavbarTitle>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h1>Manage Account</h1>
            </CardHeader>
            <hr />
            <CardBody>
              <h3>General Infomation</h3>
              <br />
              <form onSubmit={submitClick}>
                <Row>
                  <Col md='6'>
                    <FormGroup>
                      <Label for='name'>
                        Name<span className='text-danger'>*</span>
                      </Label>
                      <Input id='name' name='name' type='text' onChange={inputChange} value={input.name} required />
                    </FormGroup>
                  </Col>
                  <Col md='6'>
                    <FormGroup>
                      <Label for='email'>
                        Email<span className='text-danger'>*</span>
                      </Label>
                      <Input id='email' name='email' type='email' onChange={inputChange} value={input.email} required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md='4'>
                    <FormGroup>
                      <Label for='companyName'>
                        Company Name
                      </Label>
                      <Input id='companyName' name='companyName' type='text' onChange={inputChange} value={input.companyName} />
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup>
                      <Label for='limitcredits'>
                        Limits Credits
                      </Label>
                      <Input id='limitcredits' name='limitcredits' type='number' min='0' onChange={inputChange} value={input.limitcredits} />
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup>
                      <Label for='game'>
                        Game
                      </Label>
                      <Input id='game' name='game' type='select' value={(input.game === true ? true : '0')}>
                        <option value='0'>NO</option>
                        <option value={true}>YES</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md='4'>
                    <FormGroup>
                      <Label for='accountType'>
                        Account Type (Other)
                      </Label>
                      <Input id='accountType' name='accountType' type='select' >
                        <option value=''>--select--</option>
                        <option value='1'>Test Account</option>
                        <option value='2'>E-Commerce</option>
                        <option value='3'>Reseller</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup>
                      <Label for='priority'>
                        Priority
                      </Label>
                      <Input id='priority' name='priority' type='select' >
                        <option value='1'>Low</option>
                        <option value='2'>Medium</option>
                        <option value='3'>High</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup>
                      <Label for='industryType'>
                        Industry Type
                      </Label>
                      <Input id='industryType' name='industryType' type='select' >
                        <option value=''>--select--</option>
                        {list_industryType?.map(x => (
                          <option value={x.key}>{x.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md='4'>
                    <FormGroup>
                      <Label for='Account_level'>
                        Level
                      </Label>
                      <Input id='Account_level' name='Account_level' type='text' value={input.Account_level} disabled />
                    </FormGroup>
                  </Col>
                </Row>
                <hr />
                <h3>Permission</h3>
                <br />
                <Row>
                  <Col md='4'>
                    <FormGroup>
                      <Label for='pay_type'>
                        Payment Type
                      </Label>
                      <Input id='pay_type' name='pay_type' type='select' onChange={inputChange} value={input.pay_type}>
                        <option value='1'>Prepaid</option>
                        <option value='2'>Postpaid</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup>
                      <Label for='cost'>
                        Cost<span className='text-danger'>*</span>
                      </Label>
                      <Input id='cost' name='cost' type='number' step='0.01' onChange={inputChange} value={input.cost} />
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup>
                      <Label for='status'>
                        Status
                      </Label>
                      <Input id='status' name='status' type='select' onChange={inputChange} value={input.status} >
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                      </Input>
                      <br />
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <Label>ตรวจสอบ Blacklist</Label>
                    <FormGroup
                      check
                    >
                      <Input type="checkbox" id='BlackList' name='BlackList' onChange={inputCheck} checked={input.BlackList} />
                      <Label check>
                        Blacklist
                      </Label>
                    </FormGroup>
                    <FormGroup
                      check
                    >
                      <Input type="checkbox" id='Link_blacklist' name='Link_blacklist' onChange={inputCheck} checked={input.Link_blacklist} />
                      <Label check>
                        Link Blacklist
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <Label>Open permission<span className='text-danger'>*</span></Label>
                    <FormGroup>
                      <Switch size='small' id='Per_Submit' name='Per_Submit' onChange={(event) => inputCheck({ target: { name: 'Per_Submit', checked: event } })} checked={input.Per_Submit} />
                      <Label>คิด Credit แบบ per submit</Label>
                    </FormGroup>
                    <FormGroup>
                      <Switch size='small' id='Operator_Policy' name='Operator_Policy' onChange={(event) => inputCheck({ target: { name: 'Operator_Policy', checked: event } })} checked={input.Operator_Policy} />
                      <Label>Operator Policy</Label>
                    </FormGroup>
                    <FormGroup>
                      <Switch size='small' id='Send_Abroad' name='Send_Abroad' onChange={(event) => inputCheck({ target: { name: 'Send_Abroad', checked: event } })} checked={input.Send_Abroad} />
                      <Label>Can send aboard</Label>
                    </FormGroup>
                  </Col>
                </Row>
                <hr />
                <h3>Connection</h3>
                <Row>
                  <Col md='4'>
                    <FormGroup>
                      <Label for='gateway'>
                        Gateway
                      </Label>
                      <Input id='gateway' name='gateway' type='select' onChange={inputChange} value={input.gateway}>
                        <option value=''>--select--</option>
                        {list_gateway?.map(x => (
                          <option value={x.key}>{x.displayname}</option>
                        ))}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for='connection'>
                        Connection<span className='text-danger'>*</span>
                      </Label>
                      <Input id='connection' name='connection' type='select' onChange={inputChange} value={input.connection}>
                        <option value=''>--select--</option>
                        {list_connection?.map(x => (
                          <option value={x.id}>{x.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <Label>
                      Channel Type
                    </Label>
                    <FormGroup
                      check
                    >
                      <Input type="checkbox" id='apiType' name='apiType' onChange={inputCheck} checked={input.apiType} />
                      <Label check>
                        API
                      </Label>
                    </FormGroup>
                    <FormGroup
                      check
                    >
                      <Input type="checkbox" id='apiDirectType' name='apiDirectType' onChange={inputCheck} checked={input.apiDirectType} />
                      <Label check>
                        API Direct
                      </Label>
                    </FormGroup>
                    <FormGroup
                      check
                    >
                      <Input type="checkbox" id='otpType' name='otpType' onChange={inputCheck} checked={input.otpType} />
                      <Label check>
                        OTP
                      </Label>
                    </FormGroup>
                    <FormGroup
                      check
                    >
                      <Input type="checkbox" id='ftpType' name='ftpType' onChange={inputCheck} checked={input.ftpType} />
                      <Label check>
                        FTP
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <Label>Config Report</Label>
                    <FormGroup
                      check
                    >
                      <Input type="checkbox" id='ACC_RSAKEY' name='ACC_RSAKEY' onChange={inputCheck} checked={input.ACC_RSAKEY} />
                      <Label check>
                        Rsa
                      </Label>
                    </FormGroup>
                    <Label>Rsa File Upload</Label>
                    <Input type='file' />
                  </Col>
                </Row>
                <hr />
                <h3>FTP Config</h3>
                <Row>
                  <Col md='4'>
                    <FormGroup>
                      <Label for='ftpProtocol'>
                        FTP Protocol
                      </Label>
                      <Input id='ftpProtocol' name='ftpProtocol' type='select'>
                        <option>1</option>
                        <option>2</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <Label for='hostName'>
                      Host Name
                    </Label>
                    <Input id='hostname' name='hostname' type='text' />
                  </Col>
                  <Col md='4'>
                    <Label for='port'>
                      Port
                    </Label>
                    <Input id='port' name='port' type='text' />
                  </Col>
                </Row>
                <Row>
                  <Col md='4'>
                    <Label for='ftpUsername'>
                      FTP Username
                    </Label>
                    <Input id='ftpUsername' name='ftpUsername' type='text' />
                  </Col>
                  <Col md='4'>
                    <Label for='ftpPassword'>
                      FTP Password
                    </Label>
                    <Input id='ftpPassword' name='ftpPassword' type='text' />
                  </Col>
                  <br />
                </Row>
                <br />
                <div className='d-flex justify-content-center'>
                  <Button className='m-1' color='primary' outline onClick={() => history.back()}>Cancle</Button><Button className='m-1' color='primary' type='submit'>Edit</Button>
                </div>
              </form>
              <Card>
                <div className='d-flex justify-content-between align-item-middle'>
                  <h1>User List</h1>
                  <Link to={`/accounts/user/add/${id}`}><Button color='primary'><Plus /> Add User</Button></Link>
                </div>
                <hr />
                <Row>
                  <Col xs="5" sm='6'>
                    <FilterSearch setSearch={setSearch} />
                  </Col>
                  <Col xs="4" sm='4'>
                    <InputDate onChange={setDate} />
                  </Col>
                  <Col xs='3' sm='2'>
                    <Button color='primary' outline onClick={searchClick}>Search</Button>
                  </Col>
                </Row>
                <CardBody>
                  <DataTable
                    columns={columns}
                    data={users}
                    pagination
                  />
                </CardBody>
              </Card>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default accountsEdit