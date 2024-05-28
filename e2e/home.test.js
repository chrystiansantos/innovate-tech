describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('should render the initial screen correctly', async () => {
    // Verifica se o título "Innovate Tech" está presente
    await expect(element(by.text('Innovate Tech'))).toBeVisible()

    // Verifica se o campo de pesquisa está presente
    await expect(element(by.text('Pesquisar aluno'))).toBeVisible()

    // Verifica se o título "Alunos" está presente
    await expect(element(by.text('Alunos'))).toBeVisible()
  })
})
