import React, { useEffect, useState } from 'react'
import NavbarTitle from "@src/components/navbarTitle"
import { Badge, Button, Card, CardBody, Col, Row } from 'reactstrap'
import { Edit, Plus, Trash } from 'react-feather'
import DataTable from 'react-data-table-component'
import PaginationAndRowPerPage from "@src/components/pagination/PaginationAndRowPerPage"
import FilterSearch from '@src/components/filter-search'
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { popupConfirm } from '../../../../components/sweetalert'
import { notifySuccess, notifyFailed } from "@src/components/toast/notifyTopCenter"
import axiosInstance from '../../../../helper/axios'

// const deleteClick = () => {
//   const check = (type) => {
//     if (type === 'confirm') {
//       notifySuccess('add credit successfully.')
//     } else {
//       notifyFailed('cannot record data. Please contact the system viewer.')
//     }
//   }
//   popupConfirm('test', check)
// }

function Billing() {
  const columns = [
    {
      name: 'ACCOUNT ID',
      sortable: true,
      selector: row => row.ACC_ID
    },
    {
      name: 'ACCOUNT NAME',
      sortable: true,
      selector: row => row.Account
    },
    {
      name: 'TEMPLATE',
      sortable: true,
      center: true,
      selector: row => row.Template
    },
    {
      name: 'DUE DATE',
      sortable: true,
      right: true,
      selector: row => row.Duedate
    },
    {
      name: 'START DATE',
      sortable: true,
      right: true,
      selector: row => row.Data_Start_Date
    },
    {
      name: 'FINISH DATE',
      sortable: true,
      right: true,
      selector: row => row.Data_Finish_Date
    },
    {
      name: 'ACTION',
      sortable: true,
      right: true,
      selector: row => <><Link to={`/configbilling/edit/${row.ACC_ID}`}><Edit /></Link><Trash color='red' className='cursor' onClick={(event) => deleteClick(row.ACC_ID)} /></>
    }
  ]

  const history = useHistory()
  const [selectableRows, setSelectableRows] = useState([])
  const [datas, setDatas] = useState([])
  const [search, setSearch] = useState('')
  const [searchDatas, setSearchDatas] = useState([])

  const load = () => {
    axiosInstance.get('/api/configBilling/BillingAccountList?accountName=')
      .then(result => {
        setDatas(result?.data)
        setSearchDatas(result?.data)
      })
  }
  const searchClick = async () => {
    const result = await datas.filter(x => (x?.ACC_ID).toString()?.includes((search)) || (x?.Account)?.includes((search)))
    setSearchDatas(result)
  }

  async function deleteClick(event) {
    const selected = selectableRows?.length > 0 ? selectableRows?.map(x => x.ACC_ID) : [event]
    const check = (type) => {
      if (type === 'confirm') {
        axiosInstance.post('/api/configBilling/deleteBillingAccount', { accId: selected })
          .then(result => {
          }).then(() => {
            notifySuccess('Deleted')
            load()
          }).catch(() => {

            notifyFailed('Failed')
          })
      }
    }
    popupConfirm('test', check)
  }
  useEffect(() => {
    load()
  }, [])
  return (
    <>
      <NavbarTitle
        breadCrumbTitle={"Config Billing"}
        breadCrumbActive={""}
        className={"col-md-2 col-12"}
      >

        <Button color='primary' onClick={() => history.push('/configbilling/add')}><Plus /> Add</Button>
      </NavbarTitle>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Row>
                <Col xs="9" sm='10'>
                  <FilterSearch search={search} setSearch={setSearch} />
                </Col>
                <Col xs='3' sm='2'>
                  <Button color='primary' outline onClick={searchClick}>Search</Button>
                </Col>
              </Row>
              <DataTable
                columns={columns}
                data={searchDatas}
                selectableRowsVisibleOnly={true}
                selectableRows={selectableRows}
                onSelectedRowsChange={(rows) => setSelectableRows(rows.selectedRows)}
                keyField="_id"
                pagination
              />
              {/* <PaginationAndRowPerPage
                className="react-dataTable react-dataTable-custom-otp text-primary color-primary"
                currentPage={0}
                perPage={10}
                totalPage={20}
              // handlePagination={val => handlePagination(val)}
              // handleRowPerPage={val => handleRowPerPage(val)}
              /> */}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
    </>
  )
}

export default Billing