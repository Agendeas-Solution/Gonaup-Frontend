import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import FreelancerRegister from '../FreelancerRegister/FreelancerRegister'
import ClientRegister from '../ClientRegister/ClientRegister'
import ProjectList from '../ProjectList/ProjectList'
import ProjectDetail from '../ProjectDetail/ProjectDetail'
import AssignedProject from '../AssignedProject/AssignedProject'
import AddProject from '../AddProject/AddProject'
import FreelanceExperience from '../FreelanceExperience/FreelanceExperience'
import FreelanceExperienceList from '../FreelanceExperienceList/FreelanceExperienceList'
import AdminProfile from '../AdminProfile/AdminProfile'
import AddFramework from '../AddFramework/AddFramework'
import FrameWorkList from '../FrameworkList/FrameWorkList'
import SkillList from '../SkillList/SkillList'
import ProfileLinks from '../ProfileLinks/ProfileLinks'
import EducationDetail from '../EducationDetail/EducationDetail'
import ExperienceDetail from '../ExperienceDetail/ExperienceDetail'
import ServiceDetail from '../ServiceDetail/ServiceDetail'
import SkillDetail from '../SkillDetail/SkillDetail'
import HourlyRateDetail from '../HourlyRateDetail/HourlyRateDetail'
import ProfileDetail from '../ProfileDetail/ProfileDetail'
import JoiningPage from '../JoiningPage/JoiningPage'
import CompanyDetail from '../CompanyDetail/CompanyDetail'
import JobDetail from '../JobDetail/JobDetail'
import ClientSkillDetail from '../ClientSkillDetail/ClientSkillDetail'
import ProjectBudget from '../ProjectBudget/ProjectBudget'
import ProjectDurationDetail from '../ProjectDurationDetail/ProjectDurationDetail'
import ClientDetails from '../ClientDetails/ClientDetails'
import ClientHomePage from '../ClientHomePage/ClientHomePage'
import ClientProjectDetails from '../ClientProjectDetails/ClientProjectDetails'
import EditClientProjectDetails from '../EditClientProjectDetails/EditClientProjectDetails'
import ClientProfile from '../ClientProfile/ClientProfile'
import EditClientProfile from '../EditClientProfile/EditClientProfile'
import DeveloperHomePage from '../DeveloperHomePage/DeveloperHomePage'
import DeveloperJobDetail from '../DeveloperJobDetail/DeveloperJobDetail'
import DeveloperProfile from '../DeveloperProfile/DeveloperProfile'
import Notification from '../Notification/Notification'
import DeveloperSetting from '../DeveloperSetting/DeveloperSetting'
import { PERMISSION } from '../../constants/permissionConstant'
import ClientProfileDetail from '../ClientProfileDetail/ClientProfileDetail'
const AppContent = () => {
    const loading = (
        <div className="pt-3 text-center">
            <div className="sk-spinner sk-spinner-pulse"></div>
        </div>
    )
    return (
        <>
            <Suspense fallback={loading}>
                <Routes>
                    <Route path="/join" element={<JoiningPage />}>   </Route>
                    {localStorage.getItem('type') == 0 ?
                        <>
                            {
                                PERMISSION.PERMISSION_ROUTE.map((data) => {
                                    if (data.id > Number(localStorage.getItem('signupCompleted'))) {
                                        return <Route path={data.path} element={data.component}></Route>
                                    }
                                })
                            }
                            <Route path='/projectlist' element={<ProjectList />}></Route>
                            <Route path='/assignedProject' element={<AssignedProject />}></Route>
                            <Route path='/freelanceExperience' element={<FreelanceExperience />}></Route>
                            <Route path='/freelanceExperienceList' element={<FreelanceExperienceList />}></Route>
                            <Route path="/developerhomepage" element={<ClientHomePage />}></Route>
                            <Route path='/developerjobdetail/:id' element={<DeveloperJobDetail />}></Route>
                            <Route path='/freelancerprojectdetails/:id' element={<ClientProjectDetails />}></Route>

                            <Route path="/developerprofile" element={<DeveloperProfile />}></Route>
                            <Route path='/notification' element={<Notification />}></Route>
                            <Route path="/developersetting" element={<DeveloperSetting />}></Route>
                            <Route path='/companydetail' element={<CompanyDetail />}></Route>
                        </>
                        :
                        <>
                            <Route path='/projectdetail' element={<ProjectDetail />}></Route>
                            <Route path="/adminProfile" element={<AdminProfile />}></Route>
                            <Route path="/addframework" element={<AddFramework />}></Route>
                            <Route path="/frameworklist" element={<FrameWorkList />}></Route>
                            <Route path="/skillList" element={<SkillList />}></Route>
                            <Route path='/companydetail' element={<CompanyDetail />}></Route>
                            <Route path='/jobdetail' element={<JobDetail />}></Route>
                            <Route path='/clientskilldetail' element={<ClientSkillDetail />}></Route>
                            <Route path='/projectbudget' element={<ProjectBudget />}></Route>
                            <Route path="/projectdurationdetail" element={<ProjectDurationDetail />}></Route>
                            <Route path='/clientdetails' element={<ClientDetails />}></Route>
                            <Route path="/clienthomepage" element={<ClientHomePage />}></Route>
                            <Route path='/clientprojectdetails/:id' element={<ClientProjectDetails />}></Route>
                            <Route path='/editclientprojectdetails/:id' element={<EditClientProjectDetails />}></Route>
                            <Route path='/clientprofile' element={<ClientProfile />}></Route>
                            <Route path="/editclientprofile/:id" element={<EditClientProfile />}></Route>
                            <Route path="/clientprofiledetail" element={<ClientProfileDetail />}></Route>
                        </>
                    }
                </Routes>
            </Suspense >
        </>
    )
}
export default React.memo(AppContent)
