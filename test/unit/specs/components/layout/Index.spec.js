import Vuex from 'vuex'
import { mount, createLocalVue } from 'vue-test-utils'

import Index from '@/components/layout/Index'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Testing Login.vue', () => {
  let actions
  let state
  let store
  beforeEach(() => {
    state = {
      login: false
    }
    actions = {
      login: jest.fn()
    }
    store = new Vuex.Store({
      state,
      actions
    })
  })
  it('渲染成功', () => {
    const wrapper = mount(Index, {
      store,
      localVue
    })
    expect(wrapper.find('el-main').html()).toContain('my-main-view')
  })
})
