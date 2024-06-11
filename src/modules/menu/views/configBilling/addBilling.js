import React from 'react'
import NavbarTitle from "@src/components/navbarTitle"
import { Badge, Button, Card, CardBody, CardHeader, Col, Input, Label, Row } from 'reactstrap'
import { notifySuccess, notifyFailed } from "@src/components/toast/notifyTopCenter"
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { popupConfirm } from '../../../../components/sweetalert'

function AddBilling() {
    const history = useHistory()

    return (
        <>
            <NavbarTitle
                breadCrumbTitle={"Config BIlling"}
                breadCrumbActive={"Add Billing"}
                className={"col-md-2 col-12"}
            >
            </NavbarTitle>
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <h1>Add Billing</h1>
                        </CardHeader>
                        <hr />
                        <CardBody>
                            <form>
                                <Row>
                                    <Col sm='12' md='6'>
                                        <Label for="account">
                                            Account<span className='text-danger'>*</span>
                                        </Label>
                                        <Input id='account' name='account' type='select'>
                                            <option>1</option>
                                            <option>2</option>
                                        </Input>
                                    </Col>
                                    <Col sm='12' md='6'>
                                        <Label for="template">
                                            Template<span className='text-danger'>*</span>
                                        </Label>
                                        <Input id='template' name='template' type='select'>
                                            <option>1</option>
                                            <option>2</option>
                                        </Input>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm='12' md='6'>
                                        <Label for='system'>
                                            System
                                        </Label>
                                        <Input id='system' name='system' />
                                    </Col>
                                    <Col sm='12' md='6'>
                                        <Label for='dueDate'>
                                            Due date วันที่ต้องจ่าย
                                        </Label>
                                        <Input id='dueDate' name='dueDate' />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm='12' md='6'>
                                        <Label for='startDate'>
                                            Start date (วันที่เริ่มส่งข้อความ)
                                        </Label>
                                        <Input id='startDate' name='startDate' />
                                    </Col>
                                    <Col sm='12' md='6'>
                                        <Label for='finishDate'>
                                            Finish date (วันที่สิ้นสุดส่งข้อความ)
                                        </Label>
                                        <Input id='finishDate' name='finishDate' />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm='12' md='6'>
                                        <Label for='description'>Description</Label>
                                        <Input id='description' type='textare' height='2rem' />
                                    </Col>
                                    <Col sm='12' md='6'>
                                        <Label for='remark'>Remark</Label>
                                        <Input id='remark' type='textare' height='2rem' />
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

export default AddBilling