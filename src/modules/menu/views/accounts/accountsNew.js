import React, { useEffect, useState } from 'react'
import NavbarTitle from "@src/components/navbarTitle"
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { Switch } from 'antd'
import axiosInstance from '../../../../helper/axios'

function accountsNew() {
  const [list_gateway, setList_gateway] = useState([])
  const [list_dropdown, setList_dropdown] = useState([])

  useEffect(() => {
    axiosInstance.post('/api/gateway/list_gateway')
      .then(result => {
        console.log(result.data)
        setList_gateway(result.data)
      })
    axiosInstance.post('/api/connection/list_dropdown', { type: 1 })
      .then(result => {
        console.log(result.data)
      })
    axiosInstance.post('/api/connection/list_dropdown', { type: 2 })
      .then(result => {
        console.log(result.data)
      })
    axiosInstance.post('/api/accounts/industryType')
      .then(result => {
        console.log(result.data)
      })
      axiosInstance.post('/api/accounts/GetDropDown_AccountList')
      .then(result => {
        console.log(result.data)
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
            </CardHeader>
            <hr />
            <CardBody>
              <h3>General Infomation</h3>
              <br />
              <form>
                <Row>
                  <Col md='6'>
                    <FormGroup>
                      <Label for='username'>
                        Username<span className='text-danger'>*</span>
                      </Label>
                      <Input id='username' name='username' type='text' required />
                    </FormGroup>
                  </Col>
                  <Col md='6'>
                    <FormGroup>
                      <Label for='password'>
                        Password<span className='text-danger'>*</span>
                      </Label>
                      <Input id='password' name='password' type='password' required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md='6'>
                    <FormGroup>
                      <Label for='name'>
                        Name<span className='text-danger'>*</span>
                      </Label>
                      <Input id='name' name='name' type='text' required />
                    </FormGroup>
                  </Col>
                  <Col md='6'>
                    <FormGroup>
                      <Label for='email'>
                        Email<span className='text-danger'>*</span>
                      </Label>
                      <Input id='email' name='email' type='email' required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md='4'>
                    <FormGroup>
                      <Label for='companyName'>
                        Company Name
                      </Label>
                      <Input id='companyName' name='companyName' type='text' />
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup>
                      <Label for='cost'>
                        Cost
                      </Label>
                      <Input id='cost' name='cost' type='number' min='0' />
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup>
                      <Label for='game'>
                        Game
                      </Label>
                      <Input id='game' name='game' type='select' >
                        <option>1</option>
                        <option>2</option>
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
                        <option>1</option>
                        <option>2</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup>
                      <Label for='priority'>
                        Priority
                      </Label>
                      <Input id='priority' name='priority' type='select' >
                        <option>1</option>
                        <option>2</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup>
                      <Label for='industryType'>
                        Industry Type
                      </Label>
                      <Input id='industryType' name='industryType' type='select' >
                        <option>1</option>
                        <option>2</option>
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
                      <Label for='paymentType'>
                        Payment Type
                      </Label>
                      <Input id='paymentType' name='paymentType' type='select' >
                        <option>Prepaid</option>
                        <option>Postpaid</option>
                      </Input>
                      <br />
                      <Label>Main User Permission</Label>
                      <FormGroup
                        check
                      >
                        <Input type="checkbox" />
                        <Label check>
                          Create Account
                        </Label>
                      </FormGroup>
                      <FormGroup
                        check
                      >
                        <Input type="checkbox" />
                        <Label check>
                          Create User
                        </Label>
                      </FormGroup>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup>
                      <Label for='cost'>
                        Cost
                      </Label>
                      <Input id='cost' name='cost' type='number' step='0.01' />
                      <br />
                      <Label>ตรวจสอบ Blacklist</Label>
                      <FormGroup
                        check
                      >
                        <Input type="checkbox" />
                        <Label check>
                          Blacklist
                        </Label>
                      </FormGroup>
                      <FormGroup
                        check
                      >
                        <Input type="checkbox" />
                        <Label check>
                          Link Blacklist
                        </Label>
                      </FormGroup>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <Label>Open permission<span className='text-danger'>*</span></Label>
                    <FormGroup>
                      <Switch size='small' />
                      <Label>คิด Credit แบบ per submit</Label>
                    </FormGroup>
                    <FormGroup>
                      <Switch size='small' />
                      <Label>Config Report</Label>
                    </FormGroup>
                    <FormGroup>
                      <Switch size='small' />
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
                      <Input id='gateway' name='gateway' type='select'>
                        <option>1</option>
                        <option>2</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for='connection'>
                        Connection
                      </Label>
                      <Input id='connection' name='connection' type='select'>
                        <option>1</option>
                        <option>2</option>
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
                      <Input type="checkbox" />
                      <Label check>
                        API
                      </Label>
                    </FormGroup>
                    <FormGroup
                      check
                    >
                      <Input type="checkbox" />
                      <Label check>
                        API Direct
                      </Label>
                    </FormGroup>
                    <FormGroup
                      check
                    >
                      <Input type="checkbox" />
                      <Label check>
                        OTP
                      </Label>
                    </FormGroup>
                    <FormGroup
                      check
                    >
                      <Input type="checkbox" />
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
                      <Input type="checkbox" />
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
                  <Button className='m-1' color='primary' outline>Cancle</Button><Button className='m-1' color='primary' type='submit'>Create</Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default accountsNew