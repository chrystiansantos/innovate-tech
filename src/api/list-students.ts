import { Gender } from '../app/(home)/types'
import { api } from '../services/api'

export interface StudentResponse {
  gender: 'female' | 'male'
  login: {
    salt: string
  }
  name: {
    title: string
    first: string
    last: string
  }
  dob: {
    date: string
    age: number
  }
  picture: {
    large: string
  }
  email: string
  location: {
    country: string
    street: {
      name: string
    }
    city: string
  }
  phone: string
  cell: string
  nat: string
}

export interface ListStudentResponse {
  results: StudentResponse[]
  lastPage: number
}

interface ListStudentProps {
  pageParam: number
  results?: number
  gender?: Gender
  saveFirstResponse: (students: StudentResponse[]) => Promise<void>
}

export const listStudents = async ({
  pageParam,
  results,
  gender,
  saveFirstResponse,
}: ListStudentProps) => {
  const genderQuery =
    gender?.male !== gender?.female
      ? gender?.male
        ? '&gender=male'
        : '&gender=female'
      : ''

  const { data } = await api.get<ListStudentResponse>(
    `/?page=${pageParam}&results=${results}${genderQuery}`,
  )

  if (pageParam === 1) saveFirstResponse(data.results)

  return {
    results: data.results,
    lastPage: pageParam,
  }
}
