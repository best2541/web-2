import React from 'react'
import NavbarTitle from "@src/components/navbarTitle"
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap'

function editUser() {
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
        <form>
          <CardBody>
            <Row>
              <Col md='6'>
                <Label>Name</Label>
                <Input />
              </Col>
              <Col md='6'>
                <Label>Email<span style={{ color: 'red' }}>*</span></Label>
                <Input required />
              </Col>
            </Row>
            <Row>
              <Col md='6'>
                <Label>Password</Label>
                <Input />
              </Col>
              <Col md='6'>
                <Label>Status</Label>
                <Input />
              </Col>
              <Col md='6'>
                <Label>Permission</Label>
                <FormGroup
                  check
                  inLined
                >
                  <Input type="checkbox" />
                  <Label check>
                    Create Sub Account
                  </Label>
                </FormGroup>
                <FormGroup
                  check
                  inLined
                >
                  <Input type="checkbox" />
                  <Label check>
                    Create User
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            <div className='d-flex justify-content-center'>
              <Button className='m-1' color='primary' outline>Cancle</Button><Button className='m-1' color='primary' type='submit'>Create</Button>
            </div>
          </CardBody>
        </form>
      </Card>
    </>
  )
}

export default editUser