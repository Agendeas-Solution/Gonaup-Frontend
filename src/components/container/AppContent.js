import React, { Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProjectList from '../ProjectList/ProjectList'
import ProjectDetail from '../ProjectDetail/ProjectDetail'
import AssignedProject from '../AssignedProject/AssignedProject'
import FreelanceExperience from '../FreelanceExperience/FreelanceExperience'
import FreelanceExperienceList from '../FreelanceExperienceList/FreelanceExperienceList'
import AddFramework from '../AddFramework/AddFramework'
import FrameWorkList from '../FrameworkList/FrameWorkList'
import SkillList from '../SkillList/SkillList'
import ProjectDurationDetail from '../ProjectDurationDetail/ProjectDurationDetail'
import ClientDetails from '../ClientDetails/ClientDetails'
import ClientHomePage from '../ClientHomePage/ClientHomePage'
import ClientProjectDetails from '../ClientProjectDetails/ClientProjectDetails'
import EditClientProjectDetails from '../EditClientProjectDetails/EditClientProjectDetails'
import ClientProfile from '../ClientProfile/ClientProfile'
import DeveloperProfile from '../DeveloperProfile/DeveloperProfile'
import Notification from '../Notification/Notification'
import DeveloperSetting from '../DeveloperSetting/DeveloperSetting'
import { PERMISSION } from '../../constants/permissionConstant'
import ClientProfileDetail from '../ClientProfileDetail/ClientProfileDetail'
import RecruiteDeveloperDetail from '../RecruiteDeveloperDetail/RecruiteDeveloperDetail'
import JobDetail from '../JobDetail/JobDetail'
import Cookie from 'js-cookie'
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

                    {/* Developer Routes */}
                    {Cookie.get('userType') == 0 &&
                        <>
                            {
                                PERMISSION.DEVELOPER_PERMISSION_ROUTE.map((data) => {
                                    if (data.id > Number(localStorage.getItem('stepStatus'))) {
                                        return <Route path={data.path} element={data.component}></Route>
                                    }
                                })
                            }
                            <Route path='/projectlist' element={<ProjectList />}></Route>
                            <Route path='/assignedProject' element={<AssignedProject />}></Route>
                            <Route path='/freelanceExperience' element={<FreelanceExperience />}></Route>
                            <Route path='/freelanceExperienceList' element={<FreelanceExperienceList />}></Route>
                            <Route path="/homepage" element={<ClientHomePage />}></Route>
                            <Route path='/freelancerprojectdetails/:id' element={<ClientProjectDetails />}></Route>
                            <Route path="/developerprofile" element={<DeveloperProfile />}></Route>
                            <Route path='/notification' element={<Notification />}></Route>
                            <Route path="/developersetting" element={<DeveloperSetting />}></Route>
                        </>}

                    {/* Client Routes */}
                    {localStorage.getItem('type') == 1 &&
                        <>
                            {
                                PERMISSION.CLIENT_PERMISSION_ROUTE.map((data) => {
                                    if (data.id > Number(localStorage.getItem('stepStatus'))) {
                                        return <Route path={data.path} element={data.component}></Route>
                                    }
                                })
                            }
                            <Route path='/projectdetail' element={<ProjectDetail />}></Route>
                            <Route path="/addframework" element={<AddFramework />}></Route>
                            <Route path="/frameworklist" element={<FrameWorkList />}></Route>
                            <Route path="/skillList" element={<SkillList />}></Route>
                            <Route path='/clientdetails' element={<ClientDetails />}></Route>
                            <Route path="/homepage" element={<ClientHomePage />}></Route>
                            <Route path='/clientprojectdetails/:id' element={<ClientProjectDetails />}></Route>
                            <Route path='/editclientprojectdetails/:id' element={<EditClientProjectDetails />}></Route>
                            <Route path='/clientprofile' element={<ClientProfile />}></Route>
                            <Route path="/clientprofiledetail" element={<ClientProfileDetail />}></Route>
                        </>
                    }
                    {/* Recruiter Routes */}
                    {localStorage.getItem('type') == 2 &&
                        <>
                            <Route path="/recruiteDeveloperDetail" element={<RecruiteDeveloperDetail />}></Route>
                            <Route path="/projectdurationdetail" element={<ProjectDurationDetail />}></Route>
                            <Route path="/homepage" element={<ClientHomePage />}></Route>
                            <Route path="/jobdetail" element={<JobDetail />}></Route>
                            <Route path="/recruiterprojectdetails/:id" element={<ClientProjectDetails />}></Route>
                            <Route path='/clientprofile' element={<ClientProfile />}></Route>
                        </>
                    }
                </Routes>
            </Suspense >
        </>
    )
}
export default React.memo(AppContent)
