import AsyncStorage from '@react-native-async-storage/async-storage'
import { useInfiniteQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { router } from 'expo-router'
import { useContext, useEffect, useMemo, useState } from 'react'

import { listStudents, StudentResponse } from '@/src/api/list-students'
import { useDebounce } from '@/src/hooks/useDebounce'
import { Student, StudentContext } from '@/src/providers/student-provider'

import { Gender } from './types'

async function saveFirstResponse(students: StudentResponse[]) {
  try {
    await AsyncStorage.setItem('students', JSON.stringify(students))
  } catch (e) {}
}

export function useHomeController() {
  const [open, setOpen] = useState(false)
  const [studentName, setStudentName] = useState('')
  const [genderAux, setGenderAux] = useState<Gender>({
    female: true,
    male: true,
  })
  const [gender, setGender] = useState<Gender>({
    female: true,
    male: true,
  })
  const [studentsStore, setStudentsStore] = useState<StudentResponse[]>([])
  const debouncedValue = useDebounce(studentName, 500)
  const { selectStudent } = useContext(StudentContext)
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['students', genderAux],
      queryFn: ({ pageParam = 1 }) =>
        listStudents({
          pageParam,
          results: 20,
          gender,
          saveFirstResponse,
        }),
      initialPageParam: 1,
      placeholderData: {
        pageParams: [0],
        pages: [
          {
            results: studentsStore,
            lastPage: 1,
          },
        ],
      },
      getNextPageParam: ({ lastPage }) => {
        return lastPage + 1
      },
    })

  const students = useMemo(() => {
    return data?.pages?.reduce((acc: Student[], page) => {
      let students =
        page?.results?.map(
          (student): Student => ({
            id: student.login.salt,
            name: `${student.name.first} ${student.name.last}`,
            gender: student.gender,
            born: format(student.dob.date, 'dd/LL/yyyy', {
              locale: ptBR,
            }),
            picture: student.picture.large,
            personalInfo: {
              nationality: student.nat,
              born: format(student.dob.date, "dd 'de' MMMM 'de' yyyy", {
                locale: ptBR,
              }),
              email: student.email,
            },
            address: `${student.location.street.name}, ${student.location.city}`,
            contact: {
              cellPhone: student.cell,
              phone: student.phone,
            },
          }),
        ) ?? []
      if (debouncedValue) {
        students = students.filter((student) =>
          student.name.toLowerCase().includes(debouncedValue.toLowerCase()),
        )
      }
      return [...acc, ...students]
    }, [])
  }, [data, debouncedValue])

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  const handleNavigation = (student: Student) => {
    selectStudent(student)
    router.push('/student-detail')
  }

  const handleOpenModal = () => {
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const handleUpdateStudentName = (text: string) => {
    setStudentName(text)
  }

  const handleUpdateGenderFilter = (genderSelect: 'female' | 'male') => {
    const updateGender = { ...gender }
    updateGender[genderSelect] = !updateGender[genderSelect]
    setGender(updateGender)
  }

  const handleFilterGender = () => {
    setOpen(false)
    setGenderAux(gender)
  }

  useEffect(() => {
    async function getStudents() {
      const value = await AsyncStorage.getItem('students')
      if (value) {
        setStudentsStore(JSON.parse(value))
      }
    }
    getStudents()
  }, [])

  return {
    open,
    students,
    handleNavigation,
    handleOpenModal,
    handleCloseModal,
    handleUpdateStudentName,
    gender,
    handleUpdateGenderFilter,
    handleFilterGender,
    isLoading,
    loadMore,
  }
}
