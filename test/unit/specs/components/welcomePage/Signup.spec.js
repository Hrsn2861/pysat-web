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
  const mockFn = jest.fn()
  it('注册账号', () => {
    const wrapper = mount(Signup, {
      store,
      localVue
    })
    wrapper.setMethods({
      getCaptcha: mockFn,
      submitForm: mockFn
    })
    let checkAfterClickButton = (expectedStep) => {
      wrapper.find('el-button').trigger('click')
      expect(wrapper.vm.step).toEqual(expectedStep)
    }
    wrapper.vm.step = 1
    // 用户名不能为空
    wrapper.vm.registerForm.userName = ''
    checkAfterClickButton(1)
    // 用户名长度为3-10
    wrapper.vm.registerForm.userName = 'AB'
    checkAfterClickButton(1)
    wrapper.vm.registerForm.userName = 'ABCDEFGHIJKL'
    checkAfterClickButton(1)
    // 第一步完成
    wrapper.vm.registerForm.userName = 'ABCD'
    checkAfterClickButton(2)
    // 密码不能为空
    wrapper.vm.registerForm.pwd = ''
    checkAfterClickButton(2)
    // 密码需要大小写和数字，且特殊符号只含~!@&%#_，且位数6-20
    wrapper.vm.registerForm.pwd = '13Aa'
    checkAfterClickButton(2)
    wrapper.vm.registerForm.pwd = 'quyeruiewrAFASFAS6237462'
    checkAfterClickButton(2)
    wrapper.vm.registerForm.pwd = 'abcdefg'
    checkAfterClickButton(2)
    wrapper.vm.registerForm.pwd = '$$$$$$$'
    checkAfterClickButton(2)
    wrapper.vm.registerForm.pwd = 'ABcd123'
    checkAfterClickButton(3)
    // 确认密码
    wrapper.vm.registerForm.checkPwd = ''
    checkAfterClickButton(3)
    wrapper.vm.registerForm.checkPwd = 'Abcd123'
    checkAfterClickButton(3)
    wrapper.vm.registerForm.checkPwd = 'ABcd123'
    checkAfterClickButton(4)
    // 手机号输入正确
    wrapper.vm.registerForm.phonenumber = ''
    checkAfterClickButton(4)
    wrapper.vm.registerForm.phonenumber = '12306'
    checkAfterClickButton(4)
    wrapper.vm.registerForm.phonenumber = '13306123062'
    checkAfterClickButton(5)
    // 验证码
    wrapper.find('el-button').trigger('click')
    expect(mockFn).toBeCalled()
    wrapper.vm.step++
    // 提交
    wrapper.find('el-button').trigger('click')
    expect(mockFn).toHaveBeenCalledTimes(2)
  })
})
