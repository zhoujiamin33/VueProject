import { createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

import login from '../components/Login.vue'
import MainVue from '../components/MainVue.vue'
import mains from '../components/main.vue'

// 个人办公
import mail from '../components/Personal/Mail.vue'
import daillog from '../components/Personal/DailLog.vue'
import ideas from '../components/Personal/Ideas.vue'
import memorandum from '../components/Personal/Memorandum.vue'

// 教务管理
import ClassesVue from '../components/educational/ClassesVue.vue'
import ClassRoomVue from '../components/educational/ClassRoomVue.vue'
import PeriodVue from '../components/educational/PeriodVue.vue'
import classtype from '../components/educational/classtype.vue'
import course from '../components/educational/Course.vue'
import Classplan from '../components/educational/ClassScheduling.vue'

// 财务管理
import entryfees from '../components/finance/EntryFeesVue.vue'
import outstanding from '../components/finance/OutstandingVue.vue'
import returnmoney from '../components/finance/returnsmoney.vue'
import booksmoney from '../components/finance/BooksMoney.vue'

// 教材管理
import bookstorage from '../components/logistics/BookStorage.vue'
import bookdelivery from '../components/logistics/BookDelivery.vue'
import bookreturn from '../components/logistics/BookBack.vue'
import book from '../components/logistics/Book.vue'

//基础资料
import schoolterm from '../components/basicData/SchoolTerm.vue'
import yearmangement from '../components/basicData/YearManagement.vue'
import usersetting from '../components/basicData/UserSettings.vue'


//招生管理
import consultaion from '../components/enroll/Consultation.vue'
import workhandover from '../components/enroll/WorkHandover.vue'
import FAQ from '../components/enroll/FAQinterlocution.vue'
import channelmaintenance from '../components/enroll/ChannelMaintenance.vue'

// 学员管理
import student from '../components/Student/student.vue'
import suspende from '../components/Student/Suspende.vue'
import rakeareport from '../components/Student/RakeaReport.vue'
import shift from '../components/Student/Shift.vue'
import dropout from '../components/Student/DropOut.vue'

// 系统管理
import enterprise from '../components/Sysmanage/Enterprise.vue'
import dept from '../components/Sysmanage/Dept.vue'
import position from '../components/Sysmanage/Position.vue'
import userpwd from '../components/Sysmanage/UserMaintenance.vue'
import loginlog from '../components/Sysmanage/LoginJournal.vue'
import module from '../components/Sysmanage/ModuleManagement.vue'
import addRestrictions from '../components/Sysmanage/LoginRestrictions.vue'

// 行政管理
import notice from '../components/Administration/Announcements.vue'
import AnnouncementType from '../components/Administration/AnnouncementType.vue'
import system from '../components/Administration/System.vue'
import unit from '../components/Administration/Unit.vue'
import unittype from '../components/Administration/UnitType.vue'
import suggest from '../components/Administration/Suggest.vue'

const routes=[
	{path:'/',component:mains},
	{path:'/classes',component:ClassesVue},
	{path:'/Classplan',component:Classplan},
	{path:'/booksmoney',component:booksmoney},
	{path:'/unit',component:unit},
	{path:'/mail',component:mail},
	{path:'/daillog',component:daillog},
	{path:'/ideas',component:ideas},
	{path:'/memorandum',component:memorandum},
	{path:'/system',component:system},
	{path:'/bookreturn',component:bookreturn},
	{path:'/notice',component:notice},
	{path:'/addRestrictions',component:addRestrictions},
	{path:'/module',component:module},
	{path:'/loginlog',component:loginlog},
	{path:'/userpwd',component:userpwd},
	{path:'/position',component:position},
	{path:'/dept',component:dept},
	{path:'/enterprise',component:enterprise},
	{path:'/main',component:MainVue},
	{path:'/classroom',component:ClassRoomVue},
	{path:'/period',component:PeriodVue},
	{path:'/entryfees',component:entryfees},
	{path:'/outstanding',component:outstanding},
	{path:'/bookstorage',component:bookstorage},
	{path:'/bookdelivery', component:bookdelivery},
	{path:'/schoolterm', component:schoolterm},
	{path:'/yearmangement',component:yearmangement},
	{path:'/usersetting',component:usersetting},
	{path:'/returnmoney',component:returnmoney},
	{path:'/classtype',component:classtype},
	{path:'/course',component:course},
	{path:'/consultaion',component:consultaion},
	{path:'/workhandover',component:workhandover},
	{path:'/faq',component:FAQ},
	{path:'/student',component:student},
	{path:'/suspende',component:suspende},
	{path:'/rakeareport',component:rakeareport},
	{path:'/shift',component:shift},
	{path:'/dropout',component:dropout},
	{path:'/channelmaintenance',component:channelmaintenance},
	{path:'/suggest',component:suggest},
	{path:'/unittype',component:unittype},
	{path:'/AnnouncementType',component:AnnouncementType},
	{path:'/book',component:book},
	
]

// 路由管理器
const router=createRouter({
	history:createWebHistory(),
	routes
	// routes:routes
})
export default router