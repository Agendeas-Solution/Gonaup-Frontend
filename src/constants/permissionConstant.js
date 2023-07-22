import EducationDetail from "../components/EducationDetail/EducationDetail";
import ExperienceDetail from "../components/ExperienceDetail/ExperienceDetail";
import HourlyRateDetail from "../components/HourlyRateDetail/HourlyRateDetail";
import ProfileDetail from "../components/ProfileDetail/ProfileDetail";
import ProfileLinks from "../components/ProfileLinks/ProfileLinks";
import ProjectDetail from "../components/ProjectDetail/ProjectDetail";
import ServiceDetail from "../components/ServiceDetail/ServiceDetail";
import SkillDetail from "../components/SkillDetail/SkillDetail";
export const PERMISSION = {
    PERMISSION_ROUTE: [
        { path: '/profilelinks', component: <ProfileLinks />, id: 1 },
        { path: '/educationDetail', component: <EducationDetail />, id: 2 },
        { path: '/experienceDetail', component: <ExperienceDetail />, id: 3 },
        { path: '/projectdetail', component: <ProjectDetail />, id: 4 },
        {
            path: '/serviceDetail',
            component: <ServiceDetail />, id: 5
        },
        {
            path: '/skillDetail',
            component: <SkillDetail />,
            id: 6
        },
        {
            path: '/hourlyratedetail',
            component: <HourlyRateDetail />,
            id: 7
        },
        {
            path: '/profiledetail',
            component: <ProfileDetail />,
            id: 8
        },
    ]
}