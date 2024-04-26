import { createRouter, createWebHistory } from 'vue-router'

import { getToken } from '../utils/auth'

import HomeView from '../views/HomeView.vue'
import BookingView from '../views/BookingView.vue'
import LoginView from '../views/LoginView.vue'


import RegisterView from '../views/RegisterView.vue'
import UserAccountView from '../views/UserAccountView.vue'
import ManagerView from '../views/ManagerView.vue'
import CustomersComponent from '../components/CustomersComponent.vue'

import BookingConfirmation from '../components/BookingConfirmation.vue'
import LogIn from '../components/LogIn.vue'
import DatePicker from '../components/DatePicker.vue'
import ConfirmData from '../components/ConfirmData.vue'

import ShowCarsView from '../views/ShowCarsView.vue'
import UserSettingComponent from '../components/UserSettingComponent.vue'
import UserBookingsComponent from '../components/UserBookingsComponent.vue'
import CarsManageComponent from '../components/CarsManageComponent.vue'
import BookingManageComponent from '../components/BookingManageComponent.vue'
import CheckManageComponent from '../components/CheckManageComponent.vue'
import CarInBoundComponent from '../components/CarInBoundComponent.vue'

import { useConfirmStore } from '../store'
import MenusManageComponent from '../components/MenusManageComponent.vue'
import RoleManagerComponent from '../components/RoleManagerComponent.vue'
import ManagerManageComponent from '../components/ManagerManageComponent.vue'
import CustomerCityGraphManage from '../components/CustomerCityGraphManage.vue'
import CompanyStat from '../components/CompanyStat.vue'
import CustomerCitySexStat from '../components/CustomerCitySexStat.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/showCars',

      component: ShowCarsView
    },
   
    {
      // Modify when finishing up booking process
      path: '/booking',
      component: BookingView,
      children: [
        {
          path: '',
          components: {
            BookingWizard: LogIn
          },
          beforeEnter: (to, from, next) => {
            if (getToken()) {
              next('/booking/date')
            } else {
              next()
            }
          }
        },
        {
          path: 'date',
          components: {
            BookingWizard: DatePicker
          },
          beforeEnter: (to, from, next) => {
            const store=useConfirmStore()
            if (!store.bookingData.car) {
              next('/#fleet')
            } else {
              next()
            }
          }
        },
        {
          path: 'confirm-data',
          components: {
            BookingWizard: ConfirmData
          },
          beforeEnter: (to, from, next) => {
            const store = useConfirmStore()
            if (!store.bookingData.car) {
              next('/#fleet')
            } else if (!store.bookingData.bookingDates) {
              next('date')
            } else {
              next()
            }
          }
        },
        {
          path: 'confirmation',
          components: {
            BookingWizard: BookingConfirmation
          },
          beforeEnter: (to, from, next) => {
            const store = useConfirmStore()
            if (!store.bookingData.car) {
              next('/#fleet')
            } else if (!store.bookingData.bookingDates) {
              next('date')
            } else if (!store.finalBooking) {
              next('confirm-data')
            } else {
              next()
            }
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/useraccount',
      name: 'UserAccount',
      component: UserAccountView,
      children: [
        {
          path: '/UserSetting',
          component: UserSettingComponent
        },
        {
          path: '/UserBookings',
          component: UserBookingsComponent
        }
      ],

      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/manager',
      name: 'manager',
      component: ManagerView,

      children: [
        {
          path: '/manager/UsersManage',
          component: CustomersComponent
        },
        {
          path: '/manager/CarsManage',
          component: CarsManageComponent
        },
        {
          path: '/manager/BookingManage',
          component: BookingManageComponent
        },
        {
          path: '/manager/CheckManage',
          component: CheckManageComponent
        },
        {
          path: '/manager/CarInBoundManage',
          component: CarInBoundComponent
        },
        {
          path: '/manager/MenusManage',
          component: MenusManageComponent
        },
        {
          path: '/manager/RolesManage',
          component: RoleManagerComponent
        },
        {
          path: '/manager/ManagersManage',
          component: ManagerManageComponent
        },
        {
          path: '/manager/CustomerCityGraphManage',
          component: CustomerCityGraphManage
        },
        {
          path: '/manager/CompanyStat',
          component: CompanyStat
        },
        {
          path: '/manager/CustomerCitySexStat',
          component: CustomerCitySexStat
        }
      ],
      meta: {
        requiresAuth: true
      }
    },

  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if the user is authenticated
    const token = getToken()

    if (token == null || token == undefined || token == '') {
      //  next('/login') // Redirect to the login page if not authenticated

      next()
    } else if (to.fullPath == '/useraccount') {
      next('/UserBookings')
    } else if (to.fullPath == '/manager') {
      next('manager/UsersManage')
    } else {
      next()
    }

    // Continue to the protected route
  } else {
    next() // Allow access to public routes
  }
})

export default router
