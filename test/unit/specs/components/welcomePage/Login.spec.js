import Vuex from 'vuex'
import { mount, createLocalVue } from 'vue-test-utils'

import Login from '@/components/welcomePage/Login'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Testing Login.vue', () => {
  let actions
  let state
  let store
  let mockFn
  let wrapper
  beforeAll(() => {
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
    wrapper = mount(Login, {
      store,
      localVue
    })
    mockFn = jest.fn()
    wrapper.setMethods({
      login: mockFn,
      resetForm: mockFn,
      sendCAPTCHA: mockFn,
      updatePwd: mockFn
    })
  })
  it('初始：忘记密码表单不可见', () => {
    // 登录、重置、忘记密码的响应
    expect(wrapper.vm.forgetVisible).toBe(false)
  })
  it('登录响应', () => {
    const loginBtn = wrapper.findAll('el-button').at(0)
    expect(loginBtn.html()).toContain('登录')
    loginBtn.trigger('click')
    expect(mockFn).toBeCalled()
  })
  it('重置响应', () => {
    const resetFormBtn = wrapper.findAll('el-button').at(1)
    expect(resetFormBtn.html()).toContain('重置')
    resetFormBtn.trigger('click')
    expect(mockFn).toBeCalled()
  })
  it('忘记密码响应', () => {
    const forgetPwdBtn = wrapper.findAll('el-button').at(2)
    expect(forgetPwdBtn.html()).toContain('忘记密码')
    forgetPwdBtn.trigger('click')
    expect(wrapper.vm.forgetVisible).toBe(true)
  })
  it('发送验证码响应', () => {
    const sendCAPTCHABtn = wrapper.findAll('el-button').at(0)
    expect(sendCAPTCHABtn.html()).toContain('发送验证码')
    sendCAPTCHABtn.trigger('click')
    expect(mockFn).toBeCalled()
  })
  it('更新密码响应', () => {
    const updatePwdBtn = wrapper.findAll('el-button').at(1)
    expect(updatePwdBtn.html()).toContain('更 新')
    updatePwdBtn.trigger('click')
    expect(mockFn).toBeCalled()
  })
  it('取消响应', () => {
    const cancelBtn = wrapper.findAll('el-button').at(2)
    expect(cancelBtn.html()).toContain('取 消')
    cancelBtn.trigger('click')
    expect(wrapper.vm.forgetVisible).toBe(false)
  })
})
