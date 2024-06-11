import { Fragment, useEffect } from "react"
import NavbarTitle from "@src/components/navbarTitle"
import { useDispatch, useSelector } from "react-redux"
import HomeDashboardFilter from "../components/homeDashboard/HomeDashboardFilter"
import HomeDetail from "../components/homeDetail/HomeDetail"
import HomeDetailActivity from "../components/homeDetail/HomeDetailActivity"
import HomeDetailMCoupon from "../components/homeDetail/HomeDetailMCoupon"
import { updateHomeDashboardData, updateHomeDashboardAccountChoice } from "../store/homeDashboard/actions"
import { getAccountInformation } from "../store/homeDetail/actions"
import { requestLoading } from "@src/redux/actions/main"
import LoadingSpinner from "@src/components/spinner/LoadingSpinner"

const Home = () => {
  const dispatch = useDispatch()

  const { mCoupon, activity, homeDetail, loading } = useSelector((state) => state.homeDetail)

  const getData = async () => {
    await dispatch(updateHomeDashboardData())
    await dispatch(updateHomeDashboardAccountChoice())
    await dispatch(getAccountInformation())
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    dispatch(requestLoading(loading))
  }, [mCoupon, activity, homeDetail, loading])

  return (
    <Fragment>
      <NavbarTitle
        breadCrumbTitle={"Home"}
        breadCrumbActive={""}
        className={"col-md-2 col-12"}
      ></NavbarTitle>
      <br />
      <HomeDashboardFilter
        successColorShade={"#28dac6"}
        labelColor={'#b4b7bd'}
        tooltipShadow={'rgba(0, 0, 0, 0.25)'}
        gridLineColor={'rgba(200, 200, 200, 0.2)'} 
      />
      <LoadingSpinner />
      <HomeDetail />
      <HomeDetailActivity cols={{ md: '3', sm: '6' }} />
      <HomeDetailMCoupon />
    </Fragment>
  )
}

export default Home