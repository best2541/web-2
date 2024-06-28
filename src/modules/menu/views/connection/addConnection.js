import React, { useEffect, useState } from 'react'
import NavbarTitle from "@src/components/navbarTitle"
import { Badge, Button, Card, CardBody, CardHeader, Col, Input, Label, Row } from 'reactstrap'
import { notifySuccess, notifyFailed } from "@src/components/toast/notifyTopCenter"
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { popupConfirm } from '../../../../components/sweetalert'
import { useParams } from "react-router-dom"
import axiosInstance from '../../../../helper/axios'

function AddConnection() {
    const history = useHistory()
    const { id } = useParams()
    const [input, setInput] = useState({})
    const [gateway, setGateway] = useState([])
    const [dropdown, setDropdown] = useState([])

    const inputChange = (event) => {
        const { name, value } = event.target

        setInput({
            ...input,
            [name]: value
        })
    }

    const submitClick = (event) => {
        event.preventDefault()
        axiosInstance.post('/api/connection/new', {
            ...input,
            gateway: input.gateway,
            connectionApi: input.con_api
        })
            .then(result => {
                notifySuccess('Saved')
                history.push('/connection')
            })
    }
    useEffect(() => {
        axiosInstance.post('/api/gateway/list_gateway', {
            id
        }).then(result => {
            if (result?.data?.length > 0) {
                setGateway(result.data)
            }
        })
        axiosInstance.post('/api/connection/list_dropdown', {
            type: 2
        }).then(result => {
            if (result?.data?.length > 0) {
                setDropdown(result.data)
            }
        })
    }, [])
    return (
        <>
            <NavbarTitle
                breadCrumbTitle={"Connection List"}
                breadCrumbActive={"Add Connection"}
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
                            <form onSubmit={submitClick}>
                                <Row>
                                    <Col sm='12' md='4'>
                                        <Label for="name">
                                            Connection Name
                                        </Label>
                                        <Input id='name' name='name' value={input.name} onChange={inputChange} />
                                    </Col>
                                    <Col sm='12' md='4'>
                                        <Label for="user">
                                            Username
                                        </Label>
                                        <Input id='user' name='user' value={input.user} onChange={inputChange} />
                                    </Col>
                                    <Col sm='12' md='4'>
                                        <Label for="password">
                                            Password
                                        </Label>
                                        <Input id='password' name='password' type='password' value={input.password} onChange={inputChange} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm='12' md='4'>
                                        <Label for='ip'>
                                            IP/Domain
                                        </Label>
                                        <Input id='ip' name='ip' value={input.ip} onChange={inputChange} />
                                    </Col>
                                    <Col sm='12' md='4'>
                                        <Label for='database'>
                                            Database
                                        </Label>
                                        <Input id='database' name='database' value={input.database} onChange={inputChange} />
                                    </Col>
                                    <Col sm='12' md='4'>
                                        <Label for='gateway'>
                                            OTP Gateway
                                        </Label>
                                        <Input id='gateway' name='gateway' type='select' value={input.gateway} onChange={inputChange}>
                                            <option value=''>--select--</option>
                                            {gateway?.map(x => (
                                                <option value={x.key}>{x.displayname}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm='12' md='4'>
                                        <Label for='typesms'>
                                            Connection Type
                                        </Label>
                                        <Input id='typesms' name='typesms' type='select' value={input.typesms} onChange={inputChange}>
                                            <option>--select--</option>
                                            <option value='1'>SMS</option>
                                            <option value='2'>API</option>
                                            <option value='3'>E-Commerce</option>
                                        </Input>
                                    </Col>
                                    <Col sm='12' md='4'>
                                        <Label for='port'>
                                            Port
                                        </Label>
                                        <Input id='port' name='port' value={input.port} onChange={inputChange} />
                                    </Col>
                                    <Col sm='12' md='4'>
                                        <Label for='con_api'>
                                            Connection API
                                        </Label>
                                        <Input id='con_api' name='con_api' type='select' disabled={input.typesms !== '1'} onChange={inputChange}>
                                            <option value=''>--select--</option>
                                            {dropdown?.map(x => (
                                                <option value={x.id}>{x.name}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </Row>
                                <br />
                                <div className='d-flex justify-content-center'>
                                    <Link to='/connection'><Button className='m-1' color='primary' outline>Cancle</Button></Link><Button className='m-1' color='primary' type='submit'>Save</Button>
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