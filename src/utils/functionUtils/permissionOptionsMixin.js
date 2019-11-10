export default {
  data () {
    return {
      permissionPublicOptions: [
        {
          value: 0,
          label: '在野封禁'
        },
        {
          value: 1,
          label: '在野用户'
        },
        {
          value: 2,
          label: '在野审核员',
          disabled: localStorage['permission_public'] <= 2
        },
        {
          value: 4,
          label: '在野头目',
          disabled: localStorage['permission_public'] <= 4
        },
        {
          value: 8,
          label: '网站管理员',
          disabled: localStorage['permission_public'] <= 8
        },
        {
          value: 16,
          label: '新世界的神',
          disabled: localStorage['permission_public'] <= 16
        }

      ],
      permissionPrivateOptions: [
        {
          value: -1,
          label: '无学校',
          disabled: true
        },
        {
          value: 0,
          label: '校内封禁'
        },
        {
          value: 1,
          label: '学生'
        },
        {
          value: 2,
          label: '老师',
          disabled: Number(localStorage['permission_private']) <= 2
        },
        {
          value: 4,
          label: '校长',
          disabled: true
        },
        {
          value: 8,
          label: '网站管理员',
          disabled: Number(localStorage['permission_private']) <= 8
        },
        {
          value: 16,
          label: '新世界的神',
          disabled: Number(localStorage['permission_private']) <= 16
        }
      ]
    }
  }
}
