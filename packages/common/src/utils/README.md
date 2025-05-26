### axios封装使用示例

1. 请求取消支持
```javascript
import { createCancelToken, getOfAxios } from '@nonNightTool/common'

const { token, cancel } = createCancelToken()

getOfAxios('/data', {
  cancelToken: token
})

// 取消请求
cancel('用户主动取消')
```

2. 基础请求
```javascript
import { getOfAxios, postOfAxios, putOfAxios, deleteOfAxios} from '@nonNightTool/common'

// 获取用户信息
const fetchUser = async (userId: string) => {
  try {
    return await get<UserProfile>(`/users/${userId}`)
  } catch (error) {
    console.error('获取用户失败:', error)
    throw error
  }
}

// 提交表单数据
const submitReport = async (data: ReportForm) => {
  return post<{ reportId: string }>('/reports', data, {
    headers: {
      'X-Report-Type': 'urgent'
    }
  })
}

// 更新用户信息
interface UserUpdateDTO {
    name: string
    avatar?: string
}

const updateUserProfile = async (userId: string, data: UserUpdateDTO) => {
    return putOfAxios<{ updatedAt: string }>(`/users/${userId}`, data, {
        headers: {
            'X-Update-Type': 'full'
        }
    })
}

// 删除资源
const deleteResource = async (resourceId: string) => {
    return deleteOfAxios<{ success: boolean }>(`/resources/${resourceId}`, null, {
        params: {
            force: true // 作为 URL 参数传递
        }
    })
}
```
