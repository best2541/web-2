import React from 'react'
import NavbarTitle from "@src/components/navbarTitle"
import { Badge, Button, Card, CardBody, CardHeader, Col, Input, Label, Row } from 'reactstrap'
import { notifySuccess, notifyFailed } from "@src/components/toast/notifyTopCenter"
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { popupConfirm } from '../../../../components/sweetalert'

function AddConnection() {
    const history = useHistory()

    return (
        <>
            <NavbarTitle
                breadCrumbTitle={"Connection List"}
                breadCrumbActive={"Manage Connection"}
                className={"col-md-2 col-12"}
            >
            </NavbarTitle>
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <h1>Add Connection</h1>
                        </CardHeader>
                        <hr />
                        <CardBody>
                            <form>
                                <Row>
                                    <Col sm='12' md='4'>
                                        <Label for="connection">
                                            Connection Name
                                        </Label>
                                        <Input id='connection' name='connection' />
                                    </Col>
                                    <Col sm='12' md='4'>
                                        <Label for="username">
                                            Username
                                        </Label>
                                        <Input id='username' name='username' />
                                    </Col>
                                    <Col sm='12' md='4'>
                                        <Label for="password">
                                            Password
                                        </Label>
                                        <Input id='password' name='password' type='password' />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm='12' md='4'>
                                        <Label for='ip'>
                                            IP/Domain
                                        </Label>
                                        <Input id='ip' name='ip' />
                                    </Col>
                                    <Col sm='12' md='4'>
                                        <Label for='db'>
                                            Database
                                        </Label>
                                        <Input id='db' name='db' />
                                    </Col>
                                    <Col sm='12' md='4'>
                                        <Label for='otp_gateway'>
                                            OTP Gateway
                                        </Label>
                                        <Input id='otp_gateway' name='otp_gateway' type='select'>
                                            <option>1</option>
                                            <option>2</option>
                                        </Input>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm='12' md='4'>
                                        <Label for='type'>
                                            Connection Type
                                        </Label>
                                        <Input id='type' name='type' type='select'>
                                            <option>1</option>
                                            <option>2</option>
                                        </Input>
                                    </Col>
                                    <Col sm='12' md='4'>
                                        <Label for='port'>
                                            Port
                                        </Label>
                                        <Input id='port' name='port' />
                                    </Col>
                                    <Col sm='12' md='4'>
                                        <Label for='api'>
                                            Connection API
                                        </Label>
                                        <Input id='api' name='api' type='select'>
                                            <option>1</option>
                                            <option>2</option>
                                        </Input>
                                    </Col>
                                </Row>
                                <br />
                                <div className='d-flex justify-content-center'>
                                    <Button className='m-1' color='primary' outline>Cancle</Button><Button className='m-1' color='primary' type='submit'>Save</Button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </Col>
            </Row >
            <br />
        </>
    )
}

export default AddConnection