import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'getPermissionPublic',
      'getPermissionPrivate',
      'getSchoolId'
    ]),
    hasSelectedSchool () {
      return this.getSchoolId !== 0
    },
    isRightAdmin () {
      return function (level) {
        if (this.getPermissionPublic >= 8) {
          return true
        }
        if (this.currentSchoolId === 0) {
          return this.getPermissionPublic >= level
        } else {
          return this.getPermissionPrivate >= level
        }
      }
    },
    // 这里暂时好像没有用
    isPrivateAdmin () {
      return (
        localStorage['permission_private'] >= 2
      )
    },
    isPublicAdmin () {
      return (
        localStorage['permission_public'] >= 2
      )
    },
    isGreatAdmin () {
      return localStorage['permission_public'] >= 8
    },
    isHeadmasterOrGreater () {
      // return localStorage['permission_private'] >= 4 || localStorage['permission_public'] >= 4
      if (this.currentSchoolId === 0) {
        return localStorage['permission_public'] >= 4
      } else {
        return localStorage['permission_private'] >= 4
      }
    }
  }
}
