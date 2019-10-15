import Vue from 'vue'
import MyInfo from '@/components/dashboard/MyInfo'

describe('test components/dashboard/MyInfo.vue', () => {
  it('should initial correctly', () => {
    const vm = new Vue(MyInfo).$mount()
    expect(vm.$el.textContent).toContain('个人信息')
  })
})
