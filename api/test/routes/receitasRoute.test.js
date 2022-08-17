const app = require('../../index');
const request = require('supertest')

let server;
beforeEach(() => {
    const port = 8000;
    server = app.listen(port)
})

afterEach(() => {
    server.close();
})

describe('GET em /receitas', () => {
    it('Deve retornar lista de receitas', async () => {
        const resposta = await request(app)
            .get('/receitas')
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
            .expect(200)

        expect(resposta.body[0].descricao).toEqual('TesteReceita1')

    })
})

let idResposta;
describe('POST em /receitas', () => {
    it('Deve criar nova receita', async () => {
        const resposta = await request(app)
            .post('/receitas')
            .send({
                descricao: "TesteReceitaTest3",
                valor: "100.50",
                data: "2022-08-12",
            })
            .expect(201)

        idResposta = resposta.body.id
    })

    it('Não deve criar com body vazio', async () => {
        await request(app)
            .post('/receitas')
            .send({})
            .expect(400)
    })
})

describe('GET em /receitas/:id', () => {
    it('Deve retornar uma receita', async () => {
        await request(app)
            .get(`/receitas/${idResposta}`)
            .expect(200)
    })
})

describe('PUT em /receitas/:id', () => {
    test.each([
        ['descricao', {descricao: "TesteReceitaTest3Atualizado"}],
        ['valor', {valor: "300"}],
        ['data', {data: "2022-05-05"}],
        ['categoria', {categoria: "Alimentação"}],
    ])
    ('Deve atualizar o campo %s', async (chave, param) => {
        
        const requisicao = { request }
        const spy = jest.spyOn(requisicao, 'request')
        await requisicao.request(app)
            .put(`/receitas/${idResposta}`)
            .send(param)
            .expect(204)

        expect(spy).toHaveBeenCalled()
    })
})

describe('DELETE em /receitas/:id', () => {
    it('Deve deletar uma receita', async () => {
        await request(app)
            .delete(`/receitas/${idResposta}`)
            .expect(200)

    })
})