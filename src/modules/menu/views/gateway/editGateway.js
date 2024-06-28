import React, { useEffect, useState } from 'react'
import NavbarTitle from "@src/components/navbarTitle"
import { Badge, Button, Card, CardBody, CardHeader, Col, Input, Label, Row } from 'reactstrap'
import { notifySuccess, notifyFailed } from "@src/components/toast/notifyTopCenter"
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { popupConfirm } from '../../../../components/sweetalert'
import axiosInstance from '../../../../helper/axios'
import { useParams } from "react-router-dom"
function EditGateway() {
    const history = useHistory()
    const { id } = useParams()
    const [input, setInput] = useState({})

    const inputChange = (event) => {
        const { name, value } = event.target
        setInput({
            ...input,
            [name]: value
        })
    }
    const saveClick = (event) => {
        event.preventDefault()
        axiosInstance.post('/api/gateway/edit_gateway', {
            id,
            ...input
        }).then(() => {
            notifySuccess('Saved')
        }).catch((err) => {
            notifyFailed('Failed !!')
        })
    }
    useEffect(() => {
        axiosInstance.post('/api/gateway/list_gateway_byid', { id }).then(result => {
            if (result?.data?.length > 0) {
                setInput(result.data[0])
            }
        })
    }, [])
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
                            <form onSubmit={saveClick}>
                                <Row>
                                    <Col md='6'>
                                        <Label for="displayName">
                                            Displayname
                                        </Label>
                                        <Input id='displayName' name='displayName' value={input?.displayname} onChange={inputChange} />
                                    </Col>
                                    <Col md='6'>
                                        <Label for='url'>
                                            URL
                                        </Label>
                                        <Input id='url' name='url' value={input.url} onChange={inputChange} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='6'>
                                        <Label for='username'>
                                            Username
                                        </Label>
                                        <Input id='username' name='username' value={input.username} onChange={inputChange} />
                                    </Col>
                                    <Col md='6'>
                                        <Label for='password'>
                                            Password
                                        </Label>
                                        <Input id='password' name='password' type='password' value={input.password} onChange={inputChange} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='6'>
                                        <Label for='service_id'>
                                            Service ID
                                        </Label>
                                        <Input id='service_id' name='service_id' value={input.service_id} onChange={inputChange} />
                                    </Col>
                                    <Col md='6'>
                                        <Label for='number'>
                                            Charge Number
                                        </Label>
                                        <Input id='number' name='number' value={input.service_id} onChange={inputChange} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='6'>
                                        <Label for='operators'>
                                            Operator
                                        </Label>
                                        <Input id='operators' name='operators' type='select' value={input.operators} onChange={inputChange}>
                                            <option value={1}>TRUE</option>
                                            <option value={2}>AIS</option>
                                            <option value={3}>DTAC</option>
                                        </Input>
                                    </Col>
                                    <Col md='6'>
                                        <Label for='status'>
                                            Status
                                        </Label>
                                        <Input id='status' name='status' type='select' value={input.status} onChange={inputChange}>
                                            <option value={true}>Active</option>
                                            <option value={false}>Inactive</option>
                                        </Input>
                                    </Col>
                                </Row>
                                <br />
                                <div className='d-flex justify-content-center'>
                                    <Link to='/gateway'><Button className='m-1' color='primary' outline>Cancle</Button></Link><Button className='m-1' color='primary' type='submit'>Save</Button>
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