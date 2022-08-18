const { ReceitasServices } = require('../services')

describe('Testes do ReceitasController', () => {
  const objetoReceita = {
    descricao: 'TesteReceita10',
    valor: '100.50',
    data: '2023-07-05T00:00:00.000Z',
    categoria: 'Alimentação'
  }

  it('Deve fazer uma chamada simulada no BD', async () => {
    const receita = new ReceitasServices()

    receita.criaRegistro = jest.fn().mockReturnValue({
      id: 10,
      descricao: 'TesteReceita10',
      valor: '100.50',
      data: '2023-07-05T00:00:00.000Z',
      categoria: 'Alimentação',
      created_at: '2023-07-05T00:00:00.000Z',
      updated_at: '2023-07-05T00:00:00.000Z'
    })

    const retorno = receita.criaRegistro()

    expect(retorno).toEqual((
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoReceita,
        created_at: expect.any(String),
        updated_at: expect.any(String)
      })
    ))
  })
})
