import { Fragment, useState } from "react"
import { Button, Spinner, Input, Alert } from "reactstrap"
import { makeStyles, Modal } from "@material-ui/core"
import styled from "styled-components"
import useJwt from '@src/helper/auth/jwt/jwtDefaultConfig'
import { useSelector, useDispatch } from "react-redux"
import Grow from "@mui/material/Grow"
import { useLocation } from 'react-router-dom/cjs/react-router-dom'
import { redeemReward, clearRedeemReward } from "../../modules/game/store/gameConfiguration/actions"
import { popupConfirm } from "@src/components/sweetalert"
import './css/index.scss'
const gameEndPoint = useJwt.gameEndPoint

const ModalReward = (props) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { rewardImgDisplay } = useSelector((state) => state.createGame.imgDisplay)
  const { rewardRedeem, flexUsed } = useSelector((state) => state.createGame.requestSaveGameData)
  const { errorMessage, redeemSuccess } = useSelector((state) => state.gameConfiguration)
  const searchParams = new URLSearchParams(location.search)
  const userCode = searchParams.get('gamecode')
  const user = searchParams.get('user')
  

  const useStyles = makeStyles(() => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0, 0, 0, 0.5);"
    },
    paper: {
      backgroundColor: "white",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      // height: "37%",
      width: "75%",
      outline: "none",
      position: "absolute",
      borderRadius: "10px",
      // display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    paper2: {
      //backgroundImage: `url(${PrizeFrame})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      fontSize: "10vw",
      textAlign: "center",
      color: "white",
      height: "100%",
      width: "100%",
      outline: "none",
      position: "absolute"
    },
    wheelContainer: {
      width: "60%",
      height: "60vw",
      position: "relative",
      left: "20%"
    },
    prize: {
      margin: 0,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textShadow: "1px 1px 10px #ffffffcc, 1px 1px 10px #ccc"
    }
  }))

  const classes = useStyles()
  const { open, setOpen } = props
  const [centeredModal, setCenteredModal] = useState(false)
  const [typereward, setTypereward] = useState("")
  const [overImage, setOverImage] = useState(false)
  const [redeemCode, setRedeemCode] = useState(null)
  const handleClose = () => {
    setOpen(false)
  }

  const handleChangeValue = async (e) => {
    setRedeemCode(e.currentTarget.value)
    await dispatch(clearRedeemReward())
  }

  const handleRedeem = async () => {
    // popupConfirm('Do you want to redeem this reward ?', async (type) => {
    //   if (type === "confirm") {
        await dispatch(redeemReward(userCode, redeemCode, user))
    //   }
    // })
  }

  return (
    <div>
      <Modal
        keepMounted
        open={open}
        // onClose={handleClose}
        className={classes.modal}
      >
        <Grow in={open}>
          <div className={classes.paper}>
            <div className="text-center">
              <div className='text-center mt-2 mb-2'>
                <div style={{position: 'relative', top: '0', left: '0', display: 'flex', justifyContent: 'center'}}>
                  <img
                    className="img-fluid img-reward"
                    style={{position: 'relative', top: '0', left: '0', width: "280px"}}
                    src={rewardImgDisplay ? `${gameEndPoint}/File/Getfile/${rewardImgDisplay}` : null}
                  />
                  {/* {(!flexUsed && !rewardRedeem) || flexUsed ? <img
                    className='img-fluid redeemed-banner'
                    style={{position: 'absolute', maxWidth: "200px"}}
                    src={require('@src/assets/images/banner/RedeemUsed.png').default}
                  /> : null} */}
                </div>
              </div>
              {/* <div
                className="text-center mt-2"
              >
                <h3>{rewardName}</h3>
              </div> */}
              <div
                className="text-center"
              >
                {/* <h4>ยินดีด้วย!! คุณได้รางวัลพิเศษ</h4> */}
              </div>
              {(rewardRedeem && !flexUsed && !redeemSuccess) ? <div className="pr-1 pl-1">
                <Input
                    type='text'
                    id='RedeemCode'
                    name='RedeemCode'
                    placeholder='Redeem code'
                    className={errorMessage ? 'input-error' : ''}
                    onChange={e => handleChangeValue(e)}
                    autoFocus
                />
              </div> : null}
              {errorMessage ? <div className='text-danger text-left pl-1'>
                <span>
                  Invalid Redeem code
                </span>
              </div> : null}
              <div
                className="text-center"
              >
                {(rewardRedeem && !flexUsed && !redeemSuccess) ? <Button.Ripple className="submit mt-1 mb-1" disabled={!redeemCode} color='primary' type='submit' onClick={handleRedeem}>
                    <span className='text-title submit-text'>REDEEM{redeemSuccess}</span>
                </Button.Ripple> : null}
              </div>
            </div>
          </div>
        </Grow>
      </Modal>
    </div>
  )
}
export default ModalReward
