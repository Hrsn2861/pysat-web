import Signup from '@/components/welcomePage/Signup'

import Vuex from 'vuex'
import { mount, createLocalVue } from 'vue-test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('testing signup.vue', () => {
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
  it('testing func', () => {
    const wrapper = mount(Signup, {
      store,
      localVue
    })
    // format
    expect(wrapper.vm.format(100)).toEqual('满')
    // userValidate
    wrapper.vm.registerForm.userName = ''
    expect(wrapper.vm.userValidate()).toBe(false)
    wrapper.vm.registerForm.userName = 'Xianyu'
    expect(wrapper.vm.userValidate()).toBe(true)
    // password
    wrapper.vm.registerForm.pwd = 'abc'
    expect(wrapper.vm.pwdValidate()).toBe(false)
    wrapper.vm.registerForm.pwd = 'Abcdefgh10'
    expect(wrapper.vm.pwdValidate()).toBe(true)
    wrapper.vm.registerForm.checkPwd = 'Abcdefgh1'
    expect(wrapper.vm.checkPwdValidate()).toBe(false)
    wrapper.vm.registerForm.checkPwd = 'Abcdefgh10'
    expect(wrapper.vm.checkPwdValidate()).toBe(true)
    // phone number
    wrapper.vm.registerForm.phonenumber = '1333333333'
    expect(wrapper.vm.phonenumberValidate()).toBe(false)
    wrapper.vm.registerForm.phonenumber = '13911950052'
    expect(wrapper.vm.phonenumberValidate()).toBe(true)
    // next
    wrapper.vm.step = 1
    wrapper.vm.next()
    expect(wrapper.vm.percentage).toEqual(99)
  })
})
