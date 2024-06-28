import React, { useState } from 'react'
import NavbarTitle from "@src/components/navbarTitle"
import { Badge, Button, Card, CardBody, CardHeader, Col, Input, Label, Row } from 'reactstrap'
import { notifySuccess, notifyFailed } from "@src/components/toast/notifyTopCenter"
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { popupConfirm } from '../../../../components/sweetalert'
import axiosInstance from '../../../../helper/axios'

function AddGateway() {
    const history = useHistory()
    const [input, setInput] = useState({})

    const inputChange = (event) => {
        const { name, value } = event.target
        setInput({
            ...input,
            [name]: value
        })
    }

    const submitClick = (event) => {
        event.preventDefault()
        axiosInstance.post('/api/gateway/new_gateway', {
            ...input
        }).then(result => {
            notifySuccess('Adding gateway successfully.')
            history.push('/gateway')
        }).catch(() => {
            notifyFailed('Failed !!')
        })
    }
    return (
        <>
            <NavbarTitle
                breadCrumbTitle={"Gateway List"}
                breadCrumbActive={"Add Gateway"}
                className={"col-md-2 col-12"}
            >
            </NavbarTitle>
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <h1>Add Gateway</h1>
                        </CardHeader>
                        <hr />
                        <CardBody>
                            <form onSubmit={submitClick}>
                                <Row>
                                    <Col md='6'>
                                        <Label for="displayName">
                                            Displayname
                                        </Label>
                                        <Input id='displayName' name='displayName' onChange={inputChange} />
                                    </Col>
                                    <Col md='6'>
                                        <Label for='url'>
                                            URL
                                        </Label>
                                        <Input id='url' name='url' onChange={inputChange} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='6'>
                                        <Label for='username'>
                                            Username
                                        </Label>
                                        <Input id='username' name='username' onChange={inputChange} />
                                    </Col>
                                    <Col md='6'>
                                        <Label for='password'>
                                            Password
                                        </Label>
                                        <Input id='password' name='password' type='password' onChange={inputChange} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='6'>
                                        <Label for='service_id'>
                                            Service ID
                                        </Label>
                                        <Input id='service_id' name='service_id' onChange={inputChange} />
                                    </Col>
                                    <Col md='6'>
                                        <Label for='number'>
                                            Charge Number
                                        </Label>
                                        <Input id='number' name='number' onChange={inputChange} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='6'>
                                        <Label for='operators'>
                                            Operator
                                        </Label>
                                        <Input id='operators' name='operators' type='select' onChange={inputChange}>
                                            <option>--select--</option>
                                            <option value={1}>TRUE</option>
                                            <option value={2}>AIS</option>
                                            <option value={3}>DTAC</option>
                                        </Input>
                                    </Col>
                                </Row>
                                <br />
                                <div className='d-flex justify-content-center'>
                                    <Link to='/gateway'><Button className='m-1' color='primary' outline>Cancle</Button></Link><Button className='m-1' color='primary' type='submit'>Create</Button>
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

export default AddGateway