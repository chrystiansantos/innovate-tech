import { createContext, ReactNode, useContext, useState } from 'react'

interface StudentProviderProps {
  children: ReactNode
}

export interface Student {
  id: string
  name: string
  gender: 'male' | 'female'
  born: string
  picture: string
  personalInfo: {
    nationality: string
    email: string
    born: string
  }
  contact: {
    phone: string
    cellPhone: string
  }
  address: string
}

interface StudentContextProps {
  selectStudent: (student: Student | null) => void
  studentSelect: Student | null
}

export const StudentContext = createContext({} as StudentContextProps)

export function StudentProvider({ children }: StudentProviderProps) {
  const [studentSelect, setSelectStudent] = useState<Student | null>(null)

  const selectStudent = (student: Student | null) => {
    setSelectStudent(student)
  }

  return (
    <StudentContext.Provider
      value={{
        selectStudent,
        studentSelect,
      }}
    >
      {children}
    </StudentContext.Provider>
  )
}

export function useStudent() {
  return useContext(StudentContext)
}
