import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '../utils/auth'
import { useConfirmStore } from '../store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/showCars',

      component: () => import('../views/ShowCarsView.vue'),
    },

    {
      // Modify when finishing up booking process
      path: '/booking',
      component: () => import('../views/BookingView.vue'),
      children: [
        {
          path: '',
          components: {
            BookingWizard: () => import('../components/LogIn.vue'),
          },
          beforeEnter: (to, from, next) => {
            if (getToken()) {
              next('/booking/date')
            } else {
              next()
            }
          },
        },
        {
          path: 'date',
          components: {
            BookingWizard: () => import('../components/DatePicker.vue'),
          },
          beforeEnter: (to, from, next) => {
            const store = useConfirmStore()
            if (!store.bookingData.car) {
              next('/#fleet')
            } else {
              next()
            }
          },
        },
        {
          path: 'confirm-data',
          components: {
            BookingWizard: () => import('../components/ConfirmData.vue'),
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
          },
        },
        {
          path: 'confirmation',
          components: {
            BookingWizard: () =>
              import('../components/BookingConfirmation.vue'),
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
          },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/useraccount',
      name: 'UserAccount',
      component: () => import('../layout/UserAccountLayout.vue'),
      children: [
        {
          path: '/UserSetting',
          component: () => import('../views/Customer/UserSettingComponent.vue'),
        },
        {
          path: '/UserBookings',
          component: () =>
            import('../views/Customer/UserBookingsComponent.vue'),
        },
      ],

      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/manager',
      name: 'manager',
      component: () => import('../layout/ManageAccountLayout.vue'),

      children: [
        {
          path: '/manager/UsersManage',
          component: () => import('../views/Manager/CustomersManage.vue'),
        },
        {
          path: '/manager/CarsManage',
          component: () => import('../views/Manager/CarsManage.vue'),
        },
        {
          path: '/manager/BookingManage',
          component: () => import('../views/Manager/BookingManage.vue'),
        },
        {
          path: '/manager/CheckManage',
          component: () => import('../views/Manager/CheckManage.vue'),
        },
        {
          path: '/manager/CarInBoundManage',
          component: () => import('../views/Manager/CarInBound.vue'),
        },
        {
          path: '/manager/MenusManage',
          component: () => import('../views/Manager/MenusManage.vue'),
        },
        {
          path: '/manager/RolesManage',
          component: () => import('../views/Manager/RoleManager.vue'),
        },
        {
          path: '/manager/ManagersManage',
          component: () => import('../views/Manager/ManagerManage.vue'),
        },
        {
          path: '/manager/CustomerCityGraphManage',
          component: () => import('../views/Manager/CustomerCityStat.vue'),
        },
        {
          path: '/manager/CompanyStat',
          component: () => import('../views/Manager/CompanyStat.vue'),
        },
        {
          path: '/manager/CustomerCitySexStat',
          component: () => import('../views/Manager/CustomerCitySexStat.vue'),
        },
        {
          path: '/manager/index',
          component: () => import('@/views/Manager/SystemIndex.vue'),
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
  ],
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
