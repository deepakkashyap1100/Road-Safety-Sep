import React from 'react'
import '../assets/css/home.css'
import ViolationTracker from '../components/ViolationTracker/ViolationTracker'
import ViolationTrackerGraph from '../components/ViolationTrackerGraph/ViolationTrackerGraph'
import FitnessAssessment from '../components/FitnessAssessment/FitnessAssessment '
import DriverHabits from '../components/DriverHabits/DriverHabits'
import DriveRatingQuickAction from '../components/DriveRatingQuickActions/DriveRatingQuickAction'
import Overview from '../components/Overview/Overview'
import FilterSidebar from '../components/Filters/FilterSidebar'
import LiveFleetTracking2 from '../components/LiveFleetTracking2/LiveFleetTracking2'
import DangerousDriving from '../components/DangerousDriving/DangerousDriving'
import HealthAssessment from '../components/HealthAssessment/HealthAssessment'
import DriverHealthStatistics from '../components/DriverHealthStatistics/DriverHealthStatistics'
import TopVioletears from '../components/TopVioletears/TopVioletears'
import ImpactStudy from '../components/ImpactStudy/ImpactStudy'
import AccidentDashboard from '../UI/AccidentDashboard'
import VehicleStatusDashboard from '../UI/VehicleStatusDashorard'
import AccidentHistorySlider from '../UI/AccidentHistorySlider'

const Home = () => {
  return (
    <>
      <FilterSidebar/>
      <Overview />
      <DriveRatingQuickAction/>
      <LiveFleetTracking2 />
      {/* <DangerousDriving/>
      <ViolationTracker/>
      <ViolationTrackerGraph/>
      <FitnessAssessment />
      <DriverHabits />
      <HealthAssessment />
      <DriverHealthStatistics />
      <TopVioletears />
      <ImpactStudy /> */}
    
    </>
  )
}

export default Home
