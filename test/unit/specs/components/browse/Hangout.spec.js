import Vue from 'vue'
import Hangout from '@/components/browse/Hangout'

describe('test Hangout.vue', () => {
  it('push correct user info', () => {
    const vm = new Vue(Hangout).$mount()
    vm.handleClick()
    vm.addUser()
    expect(vm.tableData[0].name).toEqual('陈旭')
  })
})