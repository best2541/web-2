import React, { useEffect, useState } from 'react'
import NavbarTitle from "@src/components/navbarTitle"
import { notifySuccess, notifyFailed } from "@src/components/toast/notifyTopCenter"
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { Switch } from 'antd'
import { Plus, Share } from 'react-feather'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom'
import axiosInstance from '../../../../helper/axios'

const columns = [
  {
    name: 'USERNAME',
    sortable: true,
    selector: row => <Link to={`/accounts/edit/${row.name}`}>{row.name}</Link>
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
    selector: row => row.parent
  },
  {
    name: 'ADMIN',
    sortable: true,
    right: true,
    selector: row => row.gateway
  },
  {
    name: 'CREATE SUB ACC',
    sortable: true,
    right: true,
    selector: row => row.email
  },
  {
    name: 'CREATE USER',
    sortable: true,
    right: true,
    selector: row => row.type
  },
  {
    name: 'CREATE DATE',
    sortable: true,
    right: true,
    selector: row => row.create_date
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
    selector: row => <Link to='/accounts/user/edit/pawat'><Share /></Link>
  }
]

function accountsEdit() {
  const history = useHistory()
  const [input, setInput] = useState({ game: false, priority: '1', pay_type: '1' })
  const [file, setFile] = useState([])
  const [list_gateway, setList_gateway] = useState([])
  const [list_connection, setList_connection] = useState([])
  const [list_industryType, setList_industryType] = useState([])
  const [list_account, setList_account] = useState([])

  const inputChange = (event) => {
    const { name, value } = event.target

    setInput({
      ...input,
      [name]: value
    })
  }

  const inputCheck = (name, event) => {
    setInput({
      ...input,
      [name]: event
    })
  }
  const submitClick = async (event) => {
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
    formData.append('req', JSON.stringify(input))
    if (input.ACC_RSAKEY) {
      formData.append('files[]', file)
    }
    axiosInstance.post('/api/accounts/new_accounts', formData)
      .then(result => {
        notifySuccess('Success')
        history.push('/accounts')
      }).catch(err => {
        notifyFailed('Failed')
      })
  }
  useEffect(() => {
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
    axiosInstance.post('/api/accounts/GetDropDown_AccountList')
      .then(result => {
        if (result?.data?.length > 0) {
          setList_account(result.data)
        }
      })

  }, [])
  return (
    <>
      <NavbarTitle
        breadCrumbTitle={"Account List"}
        breadCrumbActive={"Add New Account"}
        className={"col-md-2 col-12"}
      >
      </NavbarTitle>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h1>New Account</h1>
              <Input id='parent_account' name='parent_account' type='select' onChange={inputChange} placeHolder='Account'>
                <option value=''>--select account--</option>
                {list_account?.map(x => (
                  <option value={x.key}>{x.name}</option>
                ))}
              </Input>
            </CardHeader>
            <hr />
            <CardBody>
              <h3>General Infomation</h3>
              <br />
              <form onSubmit={submitClick}>
                <Row>
                  <Col md='6'>
                    <FormGroup>
                      <Label for='username'>
                        Username<span className='text-danger'>*</span>
                      </Label>
                      <Input id='username' name='username' type='text' onChange={inputChange} value={input.username} required />
                    </FormGroup>
                  </Col>
                  <Col md='6'>
                    <FormGroup>
                      <Label for='password'>
                        Password<span className='text-danger'>*</span>
                      </Label>
                      <Input id='password' name='password' type='password' onChange={inputChange} value={input.password} required />
                    </FormGroup>
                  </Col>
                </Row>
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
                      <Input id='game' name='game' type='select' value={input.game} onChange={inputChange}>
                        <option value='false'>NO</option>
                        <option value='true'>YES</option>
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
                      <br />
                      <Label>Main User Permission</Label>
                      <FormGroup
                        check
                      >
                        <Input type="checkbox" id='can_create_account' name='can_create_account' onChange={(event) => inputCheck('can_create_account', event.target.checked)} checked={input.can_create_account} />
                        <Label check>
                          Create Account
                        </Label>
                      </FormGroup>
                      <FormGroup
                        check
                      >
                        <Input type="checkbox" id='can_create_user' name='can_create_user' onChange={(event) => inputCheck('can_create_user', event.target.checked)} checked={input.can_create_user} />
                        <Label check>
                          Create User
                        </Label>
                      </FormGroup>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup>
                      <Label for='cost'>
                        Cost<span className='text-danger'>*</span>
                      </Label>
                      <Input id='cost' name='cost' type='number' step='0.01' onChange={inputChange} value={input.cost} />
                      <br />
                      <Label>ตรวจสอบ Blacklist</Label>
                      <FormGroup
                        check
                      >
                        <Input type="checkbox" id='BlackList' name='BlackList' onChange={(event) => inputCheck('BlackList', event.target.checked)} checked={input.BlackList} />
                        <Label check>
                          Blacklist
                        </Label>
                      </FormGroup>
                      <FormGroup
                        check
                      >
                        <Input type="checkbox" id='Link_blacklist' name='Link_blacklist' onChange={(event) => inputCheck('Link_blacklist', event.target.checked)} checked={input.Link_blacklist} />
                        <Label check>
                          Link Blacklist
                        </Label>
                      </FormGroup>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <Label>Open permission<span className='text-danger'>*</span></Label>
                    <FormGroup>
                      <Switch size='small' id='Per_Submit' name='Per_Submit' onChange={(value) => inputCheck('Per_Submit', value)} checked={input.Per_Submit} />
                      <Label>คิด Credit แบบ per submit</Label>
                    </FormGroup>
                    <FormGroup>
                      <Switch size='small' id='Operator_Policy' name='Operator_Policy' onChange={(value) => inputCheck('Operator_Policy', value)} checked={input.Operator_Policy} />
                      <Label>Operator Policy</Label>
                    </FormGroup>
                    <FormGroup>
                      <Switch size='small' id='Send_Abroad' name='Send_Abroad' onChange={(value) => inputCheck('Send_Abroad', value)} checked={input.Send_Abroad} />
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
                      <Input type="checkbox" id='apiType' name='apiType' onChange={(event) => inputCheck('apiType', event.target.checked)} checked={input.apiType} />
                      <Label check>
                        API
                      </Label>
                    </FormGroup>
                    <FormGroup
                      check
                    >
                      <Input type="checkbox" id='apiDirectType' name='apiDirectType' onChange={(event) => inputCheck('apiDirectType', event.target.checked)} checked={input.apiDirectType} />
                      <Label check>
                        API Direct
                      </Label>
                    </FormGroup>
                    <FormGroup
                      check
                    >
                      <Input type="checkbox" id='otpType' name='otpType' onChange={(event) => inputCheck('otpType', event.target.checked)} checked={input.otpType} />
                      <Label check>
                        OTP
                      </Label>
                    </FormGroup>
                    <FormGroup
                      check
                    >
                      <Input type="checkbox" id='ftpType' name='ftpType' onChange={(event) => inputCheck('ftpType', event.target.checked)} checked={input.ftpType} />
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
                      <Input type="checkbox" id='ACC_RSAKEY' name='ACC_RSAKEY' onChange={(event) => inputCheck('ACC_RSAKEY', event.target.checked)} checked={input.ACC_RSAKEY} />
                      <Label check>
                        Rsa
                      </Label>
                    </FormGroup>
                    <Label>Rsa File Upload</Label>
                    <Input type='file' onChange={(event) => setFile(event.target.files[0])} />
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
                  <Button className='m-1' color='primary' type='button' outline onClick={() => history.push('/accounts')}>Cancle</Button><Button className='m-1' color='primary' type='submit'>Create</Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default accountsEdit