import React, { useEffect, useState } from 'react'
import NavbarTitle from "@src/components/navbarTitle"
import { notifySuccess, notifyFailed } from "@src/components/toast/notifyTopCenter"
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom'
import axiosInstance from '../../../../../helper/axios'

function addUser() {
  const history = useHistory()
  const { id } = useParams()
  const [input, setInput] = useState({})
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ /=()/!#$%^&,.+*@:;<>?\\_-]).{6,}$/
  const inputChange = (event) => {
    const { name, value } = event.target

    setInput({
      ...input,
      [name]: value
    })
  }

  const submitClick = (event) => {
    event.preventDefault()
    axiosInstance.post('/api/accounts/new_users', {
      account_id: id,
      ...input
    }).then(result => {
      notifySuccess('Success')
      history.goBack()
    }).catch(() => {
      notifyFailed('Failed')
    })
  }
  const inputCheck = (event) => {
    const { name, checked } = event.target

    setInput({
      ...input,
      [name]: checked
    })
  }
  return (
    <>
      <NavbarTitle
        breadCrumbTitle={"Pawat"}
        breadCrumbParent="Edit Account"
        breadCrumbActive={"Add User List"}
        className={"col-md-2 col-12"}
      >
      </NavbarTitle>
      <Card>
        <CardHeader>
          <h1>Add Accounts</h1>
        </CardHeader>
        <hr />
        <form onSubmit={submitClick}>
          <CardBody>
            <Row>
              <Col md='6'>
                <Label>Username</Label>
                <Input id='username' name='username' onChange={inputChange} />
              </Col>
              <Col md='6'>
                <Label>Email<span style={{ color: 'red' }}>*</span></Label>
                <Input required id='email' name='email' onChange={inputChange} />
              </Col>
            </Row>
            <Row>
              <Col md='6'>
                <Label>Password</Label>
                <Input type='password' id='password' name='password' onChange={inputChange} />
              </Col>
              <Col md='6'>
                <Label>Permission</Label>
                <FormGroup
                  check
                  inLined
                >
                  <Input type="checkbox" id='createacc' name='createacc' onChange={inputCheck} />
                  <Label check>
                    Create Sub Account
                  </Label>
                </FormGroup>
                <FormGroup
                  check
                  inLined
                >
                  <Input type="checkbox" id='createuser' name='createuser' onChange={inputCheck} />
                  <Label check>
                    Create User
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            {!passwordRegex.test(input.password) &&
              <Row>
                <Col className='text-danger'>
                  <p>- รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร</p>
                  <p>- ตัวอักษรพิมพ์เล็ก (a-z)</p>
                  <p>- ตัวอักษรพิมพ์ใหญ่ (A-Z)</p>
                  <p>- ตัวเลข (0-9)</p>
                  <p>- อักขระพิเศษ (= /\ () ! # $ % ^ & ETC.)</p>
                </Col>
              </Row>
            }
            <div className='d-flex justify-content-center'>
              <Button className='m-1' color='primary' outline onClick={history.goBack}>Cancle</Button><Button className='m-1' color='primary' type='submit'>Create</Button>
            </div>
          </CardBody>
        </form>
      </Card>
    </>
  )
}

export default addUser