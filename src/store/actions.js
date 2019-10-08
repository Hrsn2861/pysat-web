import * as types from './mutation-types'

const actions = {
  // actions中的函数接受一个与store实例有相同属性和方法的context对像
  // 因此可以调用context中包含的state,getters以及mutations中定义的方法
  // userLogin(context){
  //   context.commit(types.LOGIN);
  // }
  // 在.vue文件中通过store.dispatch('userLogin') 即可触发状态改变了
  // 这里的data是因为提交mutations时需要获取从/api/login传回的user对象
  userLogin (context, data) {
    context.commit(types.LOGIN, data)
  }, // 啊这里两种写法都对
  delUserSession ({
    commit
  }, data) {
    commit(types.DELSESSION, data)
  },
  userLoginOut ({
    commit
  }) {
    commit(types.LOGINOUT)
  }
}

export default actions
