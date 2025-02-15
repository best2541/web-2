import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import Breadcrumbs from '@src/components/breadcrumbs'
import DefaultColors from './DefaultColors'
import GradientColors from './GradientColors'

import '@src/assets/scss/base/pages/ui-colors.scss'

const Colors = () => {
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Colors' breadCrumbParent='UI' breadCrumbActive='Colors' />
      <Row>
        <Col sm='12'>
          <DefaultColors />
        </Col>
        <Col sm='12'>
          <GradientColors />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Colors
