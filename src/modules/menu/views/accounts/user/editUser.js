import React, { useEffect, useState } from 'react'
import NavbarTitle from "@src/components/navbarTitle"
import { notifySuccess, notifyFailed } from "@src/components/toast/notifyTopCenter"
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom'
import axiosInstance from '../../../../../helper/axios'
import { Modal } from 'antd'
import axios from 'axios'

function editUser() {
  let ip = ''
  const { id, subId } = useParams()
  const history = useHistory()
  const [input, setInput] = useState({})
  const [email, setEmail] = useState('')
  const [remark, setRemark] = useState('')
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ /=()/!#$%^&,.+*@:;<>?\\_-]).{6,}$/
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
    axiosInstance.post('/api/accounts/edit_users', {
      account_id: id,
      id: subId,
      ...input
    }).then(result => {
      notifySuccess('Success')
      history.goBack()
    }).catch(() => {
      notifyFailed('Failed')
    })
  }
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState('Content of the modal')
  const showModal = () => {
    setOpen(true)
  }
  axios.get('https://checkip.amazonaws.com/')
    .then(result => {
      ip = result.data
      console.log(result)
    })
  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }

  const forgetPasswordClick = (event) => {
    axiosInstance.post('/api/accounts/forgetPassword', {
      userId: id,
      username: input.username,
      accountId: subId,
      email,
      remark,
      ip,
      device: window.navigator.userAgent
    }).then(() => {
      setOpen(false)
      notifySuccess('Success')
    })
  }

  useEffect(() => {
    axiosInstance.post('/api/accounts/list_Users_byid', {
      user_id: subId
    }).then(result => {
      if (result?.data?.length > 0) {
        setInput(result.data[0])
        setEmail(result.data[0].email)
      }
    })
  }, [])
  return (
    <>
      <NavbarTitle
        breadCrumbTitle={"Pawat"}
        breadCrumbParent="Edit Account"
        breadCrumbActive={"Edit User List"}
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
                <Input id='username' name='username' onChange={inputChange} value={input.username} />
              </Col>
              <Col md='6'>
                <Label>Email<span style={{ color: 'red' }}>*</span></Label>
                <Input required id='email' name='email' onChange={inputChange} value={input.email} />
              </Col>
            </Row>
            <Row>
              <Col md='6'>
                <Label>Password</Label>
                <Input type='password' id='password' name='password' onChange={inputChange} value={input.password} />
              </Col>
              <Col md='6'>
                <Label>Status</Label>
                <Input type='select' id='status' name='status' onChange={inputChange} value={input.status}>
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </Input>
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
              <Button className='m-1' color='primary' outline onClick={history.goBack}>Cancle</Button><Button className='m-1' color='primary' type='submit'>Save</Button><Button className='m-1' onClick={showModal}>Forget Password</Button>
            </div>
          </CardBody>
        </form>
      </Card>
      <Modal
        title="Forget Password"
        open={open}
        onOk={forgetPasswordClick}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Row>
          <Col>
            <Label>
              Email
            </Label>
            <Input onChange={(event) => setEmail(event.target.value)} value={email} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>
              Remark
            </Label>
            <Input onChange={(event) => setRemark(event.target.value)} />
          </Col>
        </Row>
      </Modal>
    </>
  )
}

export default editUser