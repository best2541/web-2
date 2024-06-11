// ** React Imports
import { useEffect, useState, Fragment, forwardRef } from 'react'

// ** Third Party Components
import Stepper from 'bs-stepper'
import classnames from 'classnames'
import { PropTypes } from 'prop-types'
import { ChevronRight, CornerUpLeft, CornerUpRight, LogOut, Monitor, Sliders, Smartphone } from 'react-feather'

// ** Styles
import 'bs-stepper/dist/css/bs-stepper.min.css'
import '@src/assets/scss/base/plugins/forms/form-wizard.scss'

import { wizard_type, wizard_default } from "./types"
import { Button, Card, CardHeader, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import StarRequired from '../star-required'
import TapSettings from './tapSettings'

const WizardTapSettings = forwardRef((props, ref) => {
  // ** Props
  const { type, className, steps, separator, options, instance, hideHeader, onAddQuestion,
    activeIndex, setActiveIndex, selectedIcon, setSelectedIcon, onDisabledPreview, page } = props

  // ** Vars
  let stepper = null
  // ** Step change listener on mount
  useEffect(() => {
    stepper = new Stepper(ref.current, options)

    ref.current.addEventListener('shown.bs-stepper', function (event) {
      setActiveIndex(event.detail.indexStep)
    })
    if (instance) {
      instance(stepper)
    }
  }, [])

  const [openDropdown, setOpenDropdown] = useState(false)
  const toggleOpenDropdown = () => setOpenDropdown(prevState => !prevState)

  const toggleOpen = () => {
    toggleOpenDropdown()
  }
  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName)
  }

  // ** Renders Wizard Header
  const renderHeader = () => {
    return steps.map((step, index) => {
      return (
        // <Fragment key={step.id}></Fragment>
        <Fragment key={step.id}>
          {index !== 0 && index !== steps.length ? <div className='line'>{separator}</div> : null}
          <div
            className={classnames('step', {
              crossed: activeIndex > index,
              active: index === activeIndex
            })}
            data-target={`#${step.id}`}
          // style={{ display: 'none'}}
          >
            <button type='button' className='step-trigger' disabled={step.title === "Preview" && (page.length === 0 || onDisabledPreview)}>
              <span className='bs-stepper-box'>{step.icon ? step.icon : index + 1}</span>
              <span className='bs-stepper-label'>
                <span className='bs-stepper-title'>{step.title}</span>
                {step.subtitle ? <span className='bs-stepper-subtitle'>{step.subtitle}</span> : null}
              </span>
            </button>
          </div>
        </Fragment>
      )
    })


  }

  // ** Renders Wizard Content
  const renderContent = () => {
    return steps.map((step, index) => {
      return (
        <div
          className={classnames('content', {
            'active dstepper-block': activeIndex === index
          })}
          id={step.id}
          key={step.id}
        >
          {step.content}
        </div>
      )
    })
  }

  return (
    <div
      ref={ref}
      className={classnames('bs-stepper', {
        [className]: className,
        vertical: type === 'vertical',
        'vertical wizard-modern': type === 'modern-vertical',
        'wizard-modern': type === 'modern-horizontal',
        'wizard-modern-br': type === 'modern-horizontal-br'
      })}
    >
      <div className='bs-stepper-header'>{renderHeader()}
        {activeIndex === 0 ? <div className='inline-flex-container' style={{ marginLeft: 'auto', display: 'inline-flex' }}>
          {/* <CornerUpLeft className='mr-2' />
          <CornerUpRight className='mr-2' /> */}
          <TapSettings />
          <Button color='primary' onClick={onAddQuestion}>
            Add new page
          </Button>
        </div> : <div className='inline-flex-container' style={{ marginLeft: 'auto', display: 'inline-flex' }}>
          <div
            className={`inline-flex-container ${selectedIcon === 'monitor' ? 'text-primary' : ''}`}
            style={{ marginLeft: 'auto', display: 'inline-flex', cursor: 'pointer' }}
            onClick={() => handleIconClick('monitor')}
          >
            <Monitor className='mr-1' />
          </div>
          <div
            className={`inline-flex-container ${selectedIcon === 'smartphone' ? 'text-primary' : ''}`}
            style={{ marginLeft: 'auto', display: 'inline-flex', cursor: 'pointer' }}
            onClick={() => handleIconClick('smartphone')
            }>
            <Smartphone />
          </div>
        </div>
        }
      </div>
      <div className='bs-stepper-content'>{renderContent()}</div>
    </div>
  )
})

export default WizardTapSettings

// ** Default Props
WizardTapSettings.defaultProps = wizard_default
// Wizard.defaultProps = {
//   type: 'horizontal',
//   separator: <ChevronRight size={17} />,
//   options: {}
// }

// ** PropTypes
WizardTapSettings.propTypes = wizard_type
// Wizard.propTypes = {
//   type: PropTypes.string,
//   instance: PropTypes.func,
//   options: PropTypes.object,
//   className: PropTypes.string,
//   separator: PropTypes.element,
//   steps: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       title: PropTypes.string.isRequired,
//       subtitle: PropTypes.string,
//       icon: PropTypes.any,
//       content: PropTypes.any.isRequired
//     })
//   ).isRequired
// }
