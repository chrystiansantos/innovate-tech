import { rest } from 'msw'

import { studentsMock } from './students-mocks'

export const listStudentsMock = rest.get(
  'https://randomuser.me/api',
  async (req, res, ctx) => {
    const url = new URL(req.url)
    const page = url.searchParams.get('page')
    const results = url.searchParams.get('results')
    const startPage = Number(page) * Number(results)
    const endPage = (Number(page) + 1) * Number(results)

    const studentsResponse = studentsMock.slice(startPage, endPage)

    return res(
      ctx.status(200),
      ctx.json({
        results: studentsResponse,
      }),
    )
  },
)
