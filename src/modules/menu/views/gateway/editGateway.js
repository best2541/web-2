import React from 'react'
import NavbarTitle from "@src/components/navbarTitle"
import { Badge, Button, Card, CardBody, CardHeader, Col, Input, Label, Row } from 'reactstrap'
import { notifySuccess, notifyFailed } from "@src/components/toast/notifyTopCenter"
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { popupConfirm } from '../../../../components/sweetalert'

function EditGateway() {
    const history = useHistory()

    return (
        <>
            <NavbarTitle
                breadCrumbTitle={"Gateway List"}
                breadCrumbActive={"Manage Gateway"}
                className={"col-md-2 col-12"}
            >
            </NavbarTitle>
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <h1>Manage Gateway</h1>
                        </CardHeader>
                        <hr />
                        <CardBody>
                            <form>
                                <Row>
                                    <Col md='6'>
                                        <Label for="displayName">
                                            Displayname
                                        </Label>
                                        <Input id='displayName' name='displayName' />
                                    </Col>
                                    <Col md='6'>
                                        <Label for='url'>
                                            URL
                                        </Label>
                                        <Input id='url' name='url' />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='6'>
                                        <Label for='username'>
                                            Username
                                        </Label>
                                        <Input id='username' name='username' />
                                    </Col>
                                    <Col md='6'>
                                        <Label for='password'>
                                            Password
                                        </Label>
                                        <Input id='password' name='password' type='password' />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='6'>
                                        <Label for='service_id'>
                                            Service ID
                                        </Label>
                                        <Input id='service_id' name='service_id' />
                                    </Col>
                                    <Col md='6'>
                                        <Label for='charge_number'>
                                            Charge Number
                                        </Label>
                                        <Input id='charge_number' name='charge_number' />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='6'>
                                        <Label for='operator'>
                                            Operator
                                        </Label>
                                        <Input id='operator' name='operator' type='select'>
                                            <option>1</option>
                                            <option>2</option>
                                        </Input>
                                    </Col>
                                    <Col md='6'>
                                        <Label for='operator'>
                                            Status
                                        </Label>
                                        <Input id='operator' name='operator' type='select'>
                                            <option>Active</option>
                                            <option>Inactive</option>
                                        </Input>
                                    </Col>
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
            <br />
        </>
    )
}

export default EditGateway