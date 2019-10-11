import Vue from 'vue'
import Index from '@/components/layout/Index'

describe('Index.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue(Index).$mount()
    expect(vm.$el.textContent).toContain('CTRL')
  })
})
