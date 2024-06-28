import React, { useEffect, useState } from 'react'
import NavbarTitle from "@src/components/navbarTitle"
import { Badge, Button, Card, CardBody, CardHeader, Col, Input, Label, Row } from 'reactstrap'
import { notifySuccess, notifyFailed } from "@src/components/toast/notifyTopCenter"
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { popupConfirm } from '../../../../components/sweetalert'
import axiosInstance from '../../../../helper/axios'

function EditFTPConfig() {
    const { id } = useParams()
    const history = useHistory()
    const [input, setInput] = useState({ protocal: '1' })
    const [list_account, setList_account] = useState([])

    const inputChange = (event) => {
        const { name, value } = event.target

        setInput({
            ...input,
            [name]: value
        })
    }

    const submitClick = (event) => {
        event.preventDefault()
        axiosInstance.post('/api/ftpconfig/save', input)
            .then(result => {
                notifySuccess('Success')
                history.push('/ftpconfig')
            })
    }
    useEffect(() => {
        axiosInstance.post('/api/accounts/list_accounts')
            .then(result => {
                if (result?.data?.length > 0) {
                    setList_account(result.data)
                }
            })
        axiosInstance.get(`/api/FtpConfig/getById/${id}`)
            .then(result => {
                console.log(result.data)
                setInput(result.data)
            })
    }, [])
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
                            <form onSubmit={submitClick}>
                                <Row>
                                    <Col sm='12' md='4'>
                                        <Label for="FTP_ACC">
                                            Account<span className='text-danger'>*</span>
                                        </Label>
                                        <Input id='FTP_ACC' name='FTP_ACC' type='select' onChange={inputChange} value={input.FTP_ACC}>
                                            <option value=''>--select--</option>
                                            {list_account?.map(x => (
                                                <option value={x.key}>{x.name}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col sm='12' md='4'>
                                        <Label for="FTP_PROTOCAL">
                                            Protocal<span className='text-danger'>*</span>
                                        </Label>
                                        <Input id='FTP_PROTOCAL' name='FTP_PROTOCAL' type='select' onChange={inputChange} value={input.FTP_PROTOCAL}>
                                            <option value='1'>FTP</option>
                                            <option value='2'>SFTP</option>
                                            <option value='3'>FTPS</option>
                                        </Input>
                                    </Col>
                                    <Col sm='12' md='4'>
                                        <Label for="FTP_HOSTNAME">
                                            Hostname or IP Address<span className='text-danger'>*</span>
                                        </Label>
                                        <Input id='FTP_HOSTNAME' name='FTP_HOSTNAME' onChange={inputChange} value={input.FTP_HOSTNAME} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm='12' md='4'>
                                        <Label for='FTP_USERNAME'>
                                            Username
                                        </Label>
                                        <Input id='FTP_USERNAME' name='FTP_USERNAME' onChange={inputChange} value={input.FTP_USERNAME} />
                                    </Col>
                                    <Col sm='12' md='4'>
                                        <Label for='FTP_PASSWORD'>
                                            Password
                                        </Label>
                                        <Input id='FTP_PASSWORD' name='FTP_PASSWORD' type='password' onChange={inputChange} value={input.FTP_PASSWORD} />
                                    </Col>
                                    <Col sm='12' md='4'>
                                        <Label for='FTP_PATH'>
                                            Path
                                        </Label>
                                        <Input id='FTP_PATH' name='FTP_PATH' onChange={inputChange} value={input.FTP_PATH} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm='12' md='4'>
                                        <Label for='FTP_PORT'>
                                            Port
                                        </Label>
                                        <Input id='FTP_PORT' name='FTP_PORT' onChange={inputChange} value={input.FTP_PORT} />
                                    </Col>
                                    <Col sm='12' md='4'>
                                        <Label for='FTP_STATUS'>
                                            Status
                                        </Label>
                                        <Input type='select' id='FTP_STATUS' name='FTP_STATUS' onChange={inputChange} value={input.FTP_STATUS}>
                                            <option value={true}>Active</option>
                                            <option value={false}>Inactive</option>
                                        </Input>
                                    </Col>
                                </Row>
                                <br />
                                <div className='d-flex justify-content-center'>
                                    <Button className='m-1' color='primary' outline onClick={history.goBack}>Cancle</Button><Button className='m-1' color='primary' type='submit'>Save</Button>
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

export default EditFTPConfig