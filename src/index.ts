import axios,{AxiosError} from 'axios'
import User from './types/User'
import {isUser} from './types/User.validator'


interface SuccessResponse {
  status: 'SUCCESS'
  results: User[]
}

interface FaiedResopnse {
  status: 'FAILED'
  message: string
}


const main = async () => {
  const response = await getUsers()
  console.log(response)
}

const getUsers = () => {
  return axios.get<SuccessResponse>('http://localhost:3000/users').then((res) => {
    const data: SuccessResponse = res.data  /* dataの型がSuccessResponseになってる */

    data.results.map(x => {
      if(!isUser(x)) throw new Error("型のValidationに失敗しました");      /* 渡ってきた値のUser型かどうかを事前に防ぐことも可能 */
    })
    return data
  }).catch((err: AxiosError<FaiedResopnse>) => {
    const data: FaiedResopnse = err.response?.data ?? {status: 'FAILED', message: err.message}        /* dataの型がFaiedResopnseになってる */
    return data
  })
}

main()