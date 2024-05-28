import { setupServer } from 'msw/native'

import { listStudentsMock } from './list-students'

export const server = setupServer(listStudentsMock)
