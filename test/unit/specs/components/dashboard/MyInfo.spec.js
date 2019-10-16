import Vue from 'vue'
import ElementUI from 'element-ui'
import MyInfo from '@/components/dashboard/MyInfo'

Vue.use(ElementUI)

import Vuex from 'vuex'
import { mount, createLocalVue } from 'vue-test-utils'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('test components/dashboard/MyInfo.vue', () => {
  it('should initial correctly', () => {
    const vm = new Vue(MyInfo).$mount()
  })
})
