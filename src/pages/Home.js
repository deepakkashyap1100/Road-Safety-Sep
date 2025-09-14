import React from 'react'
import '../assets/css/home.css'
// import ViolationCards from '../components/ViolationListing/ViolationCards'
import ViolationTracker from '../components/ViolationTracker/ViolationTracker'
import ViolationTrackerGraph from '../components/ViolationTrackerGraph/ViolationTrackerGraph'
import FitnessAssessment from '../components/FitnessAssessment/FitnessAssessment '
import DriverHabits from '../components/DriverHabits/DriverHabits'
// import HealthAssessmentSummary from '../components/HealthAssessmentSummary/HealthAssessmentSummary'
// import HealthAssessmentTable from '../components/HealthAssessmentTable/HealthAssessmentTable'
// import AgeGroupSegregation from '../components/AgeGroupSegregation/AgeGroupSegregation'
// import DriverHealthTable from '../components/AgeGroupSegregation/DriverHealthTable'
// import DriverHealthTable2 from '../components/AgeGroupSegregation/DriverHealthTable2'
import DriveRatingQuickAction from '../components/DriveRatingQuickActions/DriveRatingQuickAction'
import Overview from '../components/Overview/Overview'
import FilterSidebar from '../components/Filters/FilterSidebar'
import LiveFleetTracking2 from '../components/LiveFleetTracking2/LiveFleetTracking2'
import DangerousDriving from '../components/DangerousDriving/DangerousDriving'
import HealthAssessment from '../components/HealthAssessment/HealthAssessment'
import DriverHealthStatistics from '../components/DriverHealthStatistics/DriverHealthStatistics'
import TopVioletears from '../components/TopVioletears/TopVioletears'
import ImpactStudy from '../components/ImpactStudy/ImpactStudy'

const Home = () => {
  return (
    <div>
      <FilterSidebar/>
      <Overview />
      <DriveRatingQuickAction/>

      <LiveFleetTracking2 />
      <DangerousDriving/>
      <ViolationTracker/>
      <ViolationTrackerGraph/>
      <FitnessAssessment />
      <DriverHabits />
      <HealthAssessment />
      <DriverHealthStatistics />
      <TopVioletears />
      <ImpactStudy/>

    </div>
  )
}

export default Home
