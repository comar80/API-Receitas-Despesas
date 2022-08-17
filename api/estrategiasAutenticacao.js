const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const bcrypt = require('bcrypt');
const tokens = require('./tokens')

const {InvalidArgumentError} = require('./erros')
const {UsuarioServices} = require('./services')
const usuarioServices = new UsuarioServices

function verificaUsuario(usuario) {
  if (!usuario) {
    throw new InvalidArgumentError('Não existe usuário com esse e-mail!');
  }
}

async function verificaSenha(senha, senhaHash) {
  const senhaValida = await bcrypt.compare(senha, senhaHash);
  if (!senhaValida) {
    throw new InvalidArgumentError('E-mail ou senha inválidos!');
  }
}

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'senha',
      session: false,
    },
    async (email, senha, done) => {
      try {
        const usuario = await usuarioServices.pegaUmRegistro({email});
        verificaUsuario(usuario);
        await verificaSenha(senha, usuario.senha);

        done(null, usuario);
      } catch (erro) {
        done(erro);
      }
    }
  )
);

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try { 
        const id = await tokens.access.verifica(token);
        const usuario = await usuarioServices.pegaUmRegistro({id});

        done(null, usuario, { token: token });
      } catch (erro) {
        done(erro);
      }
    }
  )
);