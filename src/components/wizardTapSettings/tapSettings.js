import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { updateRequestSurvey } from '@modules/survey/store/createSurvey/actions'
import useJwt from '@src/helper/auth/jwt/jwtDefaultConfig'
import Uppy from '@uppy/core'
import '@uppy/status-bar/dist/style.css'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import { Fragment, useEffect, useState } from "react"
import { Check, LogOut, PlusCircle, Sliders } from "react-feather"
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  Col,
  CustomInput,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner
} from 'reactstrap'
import 'uppy/dist/uppy.css'
import ReactColorChrome from '../react-color/ChromePicker'
import FileUploadCustom from '../uploadfile/FileUploadCustom'
import "./index.scss"

const surveyEndPoint = useJwt.newSurveyEndPoint

const TapSettings = () => {
  const dispatch = useDispatch()

  const { logoImg, backgroundImg, timeLimitSurvey, timeLimitOnePage, backgroundColor,
    displayLogoImg, displayBackgroundImg } = useSelector((state) => state.createSurvey.surveyRequest)
  const { page } = useSelector((state) => state.createSurvey)
  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  const [timerEnabled, setTimerEnabled] = useState(false)
  const colors1 = ['#DB4537', '#673AB7', '#4050B5', '#4285F4', '#01A9F4', '#00BCD4']
  const colors2 = ['#FF5722', '#FF9800', '#009688', '#4CAF50', '#607D8B', '#9E9E9E']
  const [colors3, setColors3] = useState(['#FFFFFF'])
  const [openSidebar, setOpenSidebar] = useState(false)
  const [checkLogoFile, setCheckLogoFile] = useState(false)
  const [checkBgFile, setCheckBgFile] = useState(false)
  const [loadingLogo, setLoadingLogo] = useState(false)
  const [loadingBg, setLoadingBg] = useState(false)

  const handleColorClick = (color) => {
    dispatch(updateRequestSurvey({ name: "backgroundColor", value: color }))
  }

  const toggleTimer = () => {
    setTimerEnabled(prevState => !prevState)
    dispatch(updateRequestSurvey({ name: "timeLimitSurvey", value: 0 }))
    dispatch(updateRequestSurvey({ name: "timeLimitOnePage", value: 0 }))
  }

  const onAddColor = (codeColor) => {
    if (!colors3.includes(codeColor)) {
      const updatedColors3 = [...colors3, codeColor]
      setColors3(updatedColors3)
    }
    setColorPickerOpen(prevState => !prevState)

  }

  const onCancle = () => {
    setColorPickerOpen(prevState => !prevState)

  }

  const handleColorPicker = () => {
    setColorPickerOpen(prevState => !prevState)
  }

  const uppyLogo = new Uppy({
    meta: { type: 'avatar' },
    restrictions: {
      maxNumberOfFiles: 1,
      allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif']
    },
    autoProceed: true,
    locale: {
      strings: {
        dropHereOr: 'Drop your image here, or %{browse}',
        browse: 'Browse',
        loading: 'Loading...'
      }
    }
  })

  uppyLogo.use(thumbnailGenerator)
  uppyLogo.on('upload', (data) => {
    setLoadingLogo(true)
    setCheckLogoFile(false)
  })

  uppyLogo.on('thumbnail:generated', async (file, preview) => {
    if (file.size > 1000000) {
      setCheckLogoFile(true)
      uppyLogo.reset()
    } else {
      setCheckLogoFile(false)
      await dispatch(updateRequestSurvey({ name: "logoImg", value: file.data }))
      await dispatch(updateRequestSurvey({ name: "displayLogoImg", value: preview }))
    }
    setLoadingLogo(false)
  })

  const uppyBackground = new Uppy({
    meta: { type: 'avatar' },
    restrictions: {
      maxNumberOfFiles: 1,
      allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif']
    },
    autoProceed: true,
    locale: {
      strings: {
        dropHereOr: 'Drop your image here, or %{browse}',
        browse: 'Browse'
      }
    }
  })
  uppyBackground.use(thumbnailGenerator)
  uppyBackground.on('upload', (data) => {
    setLoadingBg(true)
    setCheckBgFile(false)
  })
  uppyBackground.on('thumbnail:generated', async (file, preview) => {
    if (file.size > 2000000) {
      setCheckBgFile(true)
      uppyLogo.reset()
    } else {
      setCheckBgFile(false)
      await dispatch(updateRequestSurvey({ name: "backgroundImg", value: file.data }))
      await dispatch(updateRequestSurvey({ name: "displayBackgroundImg", value: preview }))
    }
    setLoadingBg(false)
  })

  const onRemoveBackground = async (nameDisplayDetail, nameDisplay, value) => {
    await dispatch(updateRequestSurvey({ name: nameDisplayDetail, value: "" }))
    await dispatch(updateRequestSurvey({ name: nameDisplay, value: "" }))
  }

  const onChangeLimitTime = async (name, value) => {
    await dispatch(updateRequestSurvey({ name, value }))
  }

  const onBlurTimeLimit = (name, value) => {
    if (page.length > 0) {
      if (name === "timeLimitOnePage" && timeLimitSurvey) {
        dispatch(updateRequestSurvey({ name: "timeLimitSurvey", value: timeLimitOnePage * page.length }))
      } else if (name === "timeLimitSurvey" && timeLimitSurvey && !timeLimitOnePage) {
        dispatch(updateRequestSurvey({ name: "timeLimitSurvey", value }))
      } else if (name === "timeLimitSurvey" && timeLimitSurvey && timeLimitOnePage) {
        dispatch(updateRequestSurvey({ name: "timeLimitSurvey", value: timeLimitOnePage * page.length }))
      }
    }
  }

  const onToggle = () => {
    setOpenSidebar(false)
    setCheckLogoFile(false)
    setCheckBgFile(false)
  }

  const onOpenSidebar = () => {
    setOpenSidebar(true)
    if (page.length > 0 && timeLimitOnePage) {
      dispatch(updateRequestSurvey({ name: "timeLimitSurvey", value: timeLimitOnePage * page.length }))
    }
  }

  return (
    <Fragment>
      <Button.Ripple
        outline
        color='primary'
        className="border-0 mr-1"
        onClick={onOpenSidebar}
      >
        <Sliders className='filter-slide' size={20} />
      </Button.Ripple>

      <Modal
        isOpen={openSidebar}
        toggle={onToggle}
        className='sidebar-lg'
        contentClassName='p-0'
        modalClassName='modal-slide-in sidebar-todo-modal'
      >
        <ModalHeader>
          <div className='d-flex mb-1'>
            <LogOut className='text-primary mr-1 logout-slide' size={20} onClick={onToggle} />
            <p>Settings</p>
          </div>
        </ModalHeader>
        <ModalBody className="mt-2">
          <div className='mb-1'>
            <p>
              Logo survey
            </p>
            <div className='bg-box-survey'>
              <div className='setting-item-img'>

                {displayLogoImg || logoImg ? (
                  <div className='image-display'>
                    <Button.Ripple
                      className='btn-icon'
                      color={'secondary'}
                      onClick={() => onRemoveBackground("logoImg", "displayLogoImg")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "20px", color: 'secondary' }}
                        icon={faTrash}
                      />
                    </Button.Ripple>

                    <img
                      className='rounded'
                      src={displayLogoImg ? displayLogoImg : `${surveyEndPoint}/api/File/Getfile/${logoImg}`}
                    />
                  </div>
                ) : (
                  <div className="dragDrop-image">
                    {loadingLogo ? (
                      <div className='spinner-loading'>
                        <div className='text-center'>
                          <Spinner color='secondary' />
                        </div>
                      </div>
                    ) : (
                      <FileUploadCustom
                        uppy={uppyLogo}
                        height="150px"
                      />
                    )}
                  </div>
                )}
                <p>The file size does not exceed 1 MB.</p>
                {checkLogoFile && (
                  <small className='text-danger'>
                    The uploaded file exceeds the maximum allowed file size of 1 MB.
                  </small>
                )}
              </div>
            </div>
          </div>
          <div className='d-flex'>
            <p>Timer</p>
            <CustomInput
              type='switch'
              className='ml-1'
              id='primary'
              name='primary'
              inline
              checked={timeLimitOnePage || timeLimitSurvey || timerEnabled}
              onChange={toggleTimer}
            />
          </div>
          {(timerEnabled || timeLimitOnePage || timeLimitSurvey) ? (
            <>
              <div className='timer-limit'>
                <p>
                  Time limit to finish the survey (in seconds)
                </p>
                <Input
                  type="number"
                  placeholder="Time limit"
                  name="fieldName"
                  id="fieldName"
                  value={timeLimitSurvey !== 0 ? timeLimitSurvey : null}
                  onChange={(e) => onChangeLimitTime("timeLimitSurvey", e.target.value)}
                  onBlur={(e) => onBlurTimeLimit("timeLimitSurvey", e.target.value)}
                />
              </div>
              <div className='timer-limit'>
                <p>
                  Time limit to finish one page (in seconds)
                </p>
                <Input
                  type="number"
                  placeholder="Time limit"
                  name="fieldName"
                  id="fieldName"
                  value={timeLimitOnePage !== 0 ? timeLimitOnePage : null}
                  onBlur={(e) => onBlurTimeLimit("timeLimitOnePage", e.target.value)}
                  onChange={(e) => onChangeLimitTime("timeLimitOnePage", e.target.value)}
                />
              </div>
            </>
          ) : null}

          <div className={'color-row mt-1'}>
            <p>
              Background color
            </p>
          </div>
          {colorPickerOpen ? <div>
            <ReactColorChrome onAdd={onAddColor} onCancle={onCancle} />
          </div> : <div className='mb-1'>
            <Row className='mb-1'>
              {colors1.map((color, index) => (
                <Col key={index} lg='1' xs='1'>
                  <div
                    className={`circle mr-2 ${backgroundColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorClick(color)}
                  >
                    {backgroundColor === color && <Check className='text-primary mb-50' size={18} />}
                  </div>
                </Col>

              ))}
            </Row>
            <Row className='mb-1'>
              {colors2.map((color, index) => (
                <Col key={index} lg='1' xs='1'>
                  <div
                    className={`circle mr-2 ${backgroundColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorClick(color)}
                  >
                    {backgroundColor === color && <Check className='text-primary mb-50' size={18} />}
                  </div>
                </Col>

              ))}
            </Row>
            <Row>
              {colors3.map((color, index) => (
                <Col key={index} lg='1' xs='1'>
                  <div
                    className={`circle mr-2 ${backgroundColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorClick(color)}
                  >
                    {backgroundColor === color && <Check className='text-primary mb-50' size={18} />}
                  </div>
                </Col>
              ))}
              <Col lg='1' xs='1'>
                <div
                  className="add-bockground mr-2 text-primary"
                  onClick={handleColorPicker}
                >
                  <PlusCircle size={20} />
                </div>
              </Col>
            </Row>
          </div>}
          <div className='mt-1'>
            <p>
              Background image
            </p>
            <div className='bg-box-survey'>
              <div className='setting-item-img'>
                {displayBackgroundImg || backgroundImg ? (
                  <div className='image-display'>
                    <Button.Ripple
                      className='btn-icon'
                      color={'secondary'}
                      onClick={() => onRemoveBackground("backgroundImg", "displayBackgroundImg")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "20px", color: 'secondary' }}
                        icon={faTrash}
                      />
                    </Button.Ripple>

                    <img
                      className='rounded'
                      src={displayBackgroundImg ? displayBackgroundImg : `${surveyEndPoint}/api/File/Getfile/${backgroundImg}`}
                    />
                  </div>
                ) : (
                  <div className="dragDrop-image">
                    {loadingBg ? (
                      <div className='spinner-loading'>
                        <div className='text-center'>
                          <Spinner color='secondary' />
                        </div>
                      </div>
                    ) : (
                      <FileUploadCustom
                        uppy={uppyBackground}
                        height="150px"
                      />
                    )}
                  </div>
                )}
                <p>The file size does not exceed 2 MB.</p>
                {checkBgFile && (
                  <small className='text-danger'>
                    The uploaded file exceeds the maximum allowed file size of 2 MB.
                  </small>
                )}
              </div>
            </div>
          </div>
        </ModalBody>

      </Modal>
    </Fragment>

  )
}

export default TapSettings