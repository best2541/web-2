import React from 'react'
import NavbarTitle from "@src/components/navbarTitle"
import { Badge, Button, Card, CardBody, CardHeader, Col, Input, Label, Row } from 'reactstrap'
import { notifySuccess, notifyFailed } from "@src/components/toast/notifyTopCenter"
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { popupConfirm } from '../../../../components/sweetalert'

function AddFTPConfig() {
    const history = useHistory()

    return (
        <>
            <NavbarTitle
                breadCrumbTitle={"FTP Config"}
                breadCrumbActive={"Add FTP Config"}
                className={"col-md-2 col-12"}
            >
            </NavbarTitle>
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <h1>Add FTP Config</h1>
                        </CardHeader>
                        <hr />
                        <CardBody>
                            <form>
                                <Row>
                                    <Col sm='12' md='4'>
                                        <Label for="account">
                                            Account<span className='text-danger'>*</span>
                                        </Label>
                                        <Input id='account' name='account' type='select'>
                                            <option>1</option>
                                            <option>2</option>
                                        </Input>
                                    </Col>
                                    <Col sm='12' md='4'>
                                        <Label for="protocal">
                                            Protocal<span className='text-danger'>*</span>
                                        </Label>
                                        <Input id='protocal' name='protocal' type='select'>
                                            <option>1</option>
                                            <option>2</option>
                                        </Input>
                                    </Col>
                                    <Col sm='12' md='4'>
                                        <Label for="hostname">
                                            Hostname or IP Address<span className='text-danger'>*</span>
                                        </Label>
                                        <Input id='hostname' name='hostname' />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm='12' md='4'>
                                        <Label for='username'>
                                            Username
                                        </Label>
                                        <Input id='username' name='username' />
                                    </Col>
                                    <Col sm='12' md='4'>
                                        <Label for='password'>
                                            Password
                                        </Label>
                                        <Input id='password' name='password' type='password' />
                                    </Col>
                                    <Col sm='12' md='4'>
                                        <Label for='path'>
                                            Path
                                        </Label>
                                        <Input id='path' name='path' type='path' />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm='12' md='4'>
                                        <Label for='port'>
                                            Port
                                        </Label>
                                        <Input id='port' name='port' type='port' />
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
            </Row>
            <br />
        </>
    )
}

export default AddFTPConfig