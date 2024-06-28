import React, { useEffect, useState } from 'react'
import NavbarTitle from "@src/components/navbarTitle"
import { Badge, Button, Card, CardBody, CardHeader, Col, Input, Label, Row } from 'reactstrap'
import { notifySuccess, notifyFailed } from "@src/components/toast/notifyTopCenter"
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { popupConfirm } from '../../../../components/sweetalert'
import { useParams } from "react-router-dom"
import axiosInstance from '../../../../helper/axios'

function EditBilling() {
    const history = useHistory()
    const { id } = useParams()
    const [input, setInput] = useState({})
    const [dropdown, setDropdown] = useState([])
    const dateList = []

    const inputChange = (event) => {
        const { name, value } = event.target

        setInput({
            ...input,
            [name]: value
        })
    }

    for (let i = 1; i <= 31; i++) {
        dateList.push(<option>{i}</option>)
    }

    const submitClick = async (event) => {
        event.preventDefault()
        const ind = await dropdown.findIndex(x => (x.id)?.toString() === (input.accId)?.toString())
        console.log('test', input.accountName)
        axiosInstance.post('/api/configBilling/updateBillingAccount', {
            ...input,
            accId: dropdown[ind]?.id || input.accId,
            accountName: dropdown[ind]?.ACC_NAME || input.accountName,
            startDate: input.Data_Start_Date,
            finishDate: input.Data_Finish_Date
        })
            .then(result => {
                notifySuccess('Success')
                history.push('/configbilling')
            }).catch(err => {
                notifyFailed('failed')
            })
    }
    useEffect(() => {
        axiosInstance.post(`/api/configBilling/editBillingAccount?accId=${id}`)
            .then(result => {
                if (result?.data?.length > 0) {
                    setInput({ ...result.data[0], accId: result.data[0].ACC_ID, accountName: result.data[0].Account })
                }
            })
        axiosInstance.get('/api/configBilling/GetDropdownAccountLevel1List')
            .then(result => {
                if (result?.data?.length > 0) {
                    setDropdown(result.data)
                }
            })
    }, [])
    return (
        <>
            <NavbarTitle
                breadCrumbTitle={"Config BIlling"}
                breadCrumbActive={"Manage Billing"}
                className={"col-md-2 col-12"}
            >
            </NavbarTitle>
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <h1>Manage Billing</h1>
                        </CardHeader>
                        <hr />
                        <CardBody>
                            <form onSubmit={submitClick}>
                                <Row>
                                    <Col sm='12' md='6'>
                                        <Label for="account">
                                            Account
                                        </Label>
                                        <Input id='accId' name='accId' type='select' onChange={inputChange} value={input.accId} disabled>
                                            {
                                                dropdown?.map(x => (
                                                    <option value={x.id}>{x.ACC_NAME}</option>
                                                ))
                                            }
                                        </Input>
                                    </Col>
                                    <Col sm='12' md='6'>
                                        <Label for="template">
                                            Template<span className='text-danger'>*</span>
                                        </Label>
                                        <Input id='template' name='template' type='select' required>
                                            <option>Template A</option>
                                            <option>Template B</option>
                                            <option>Template C</option>
                                        </Input>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm='12' md='6'>
                                        <Label for='system'>
                                            System
                                        </Label>
                                        <Input id='system' name='system' onChange={inputChange} value={input.system} type='select'>
                                            <option value='-'>Blank</option>
                                            <option value='ANTS'>ANTS</option>
                                        </Input>
                                    </Col>
                                    <Col sm='12' md='6'>
                                        <Label for='Duedate'>
                                            Due date วันที่ต้องจ่าย
                                        </Label>
                                        <Input id='Duedate' name='Duedate' type='select' onChange={inputChange} value={input.Duedate}>
                                            {dateList?.map(x => x)}
                                        </Input>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm='12' md='6'>
                                        <Label for='Data_Start_Date'>
                                            Start date (วันที่เริ่มส่งข้อความ)
                                        </Label>
                                        <Input id='Data_Start_Date' name='Data_Start_Date' type='select' onChange={inputChange} value={input.Data_Start_Date}>
                                            {dateList?.map(x => x)}
                                        </Input>
                                    </Col>
                                    <Col sm='12' md='6'>
                                        <Label for='Data_Finish_Date'>
                                            Finish date (วันที่สิ้นสุดส่งข้อความ)
                                        </Label>
                                        <Input id='Data_Finish_Date' name='Data_Finish_Date' type='select' onChange={inputChange} value={input.Data_Finish_Date}>
                                            {dateList?.map(x => x)}
                                        </Input>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm='12' md='6'>
                                        <Label for='Description'>Description</Label>
                                        <Input id='Description' name='Description' type='textare' height='2rem' onChange={inputChange} value={input.Description} />
                                    </Col>
                                    <Col sm='12' md='6'>
                                        <Label for='Remark'>Remark</Label>
                                        <Input id='Remark' name='Remark' type='textare' height='2rem' onChange={inputChange} value={input.Remark} />
                                    </Col>
                                </Row>
                                <br />
                                <div className='d-flex justify-content-center'>
                                    <Link to='/configbilling'><Button className='m-1' color='primary' outline>Cancle</Button></Link><Button className='m-1' color='primary' type='submit'>Save</Button>
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

export default EditBilling