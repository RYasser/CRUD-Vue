import Vue from 'vue'
import VueRouter from 'vue-router'

import Erro404 from './views/Erro404.vue'
import Erro404Contatos from './views/contatos/Erro404Contatos.vue'
import Login from './views/login/Login.vue'

import EventBus from './event-bus'

const Contatos = () => import(/* webpackChunkName: "contatos" */'./views/contatos/Contatos.vue')
const ContatosHome = () => import(/* webpackChunkName: "contatos" */'./views/contatos/ContatosHome.vue')
const ContatoDetalhes = () => import(/* webpackChunkName: "contatos" */'./views/contatos/ContatoDetalhes.vue')
const ContatoEditar = () => import(/* webpackChunkName: "contatos" */'./views/contatos/ContatoEditar.vue')
const Home = () => import('./views/Home.vue')
const ContatoInserir = () => import('./views/contatos/ContatoInserir.vue')

Vue.use(VueRouter)

const extrairParametroId = route => ({
  id: parseInt(route.params.id)
})

// Configuração das rotas
const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    { 
      path: '/contatos',
      component: Contatos,
      alias: ['/meus-contatos', 'lista-de-contatos'],
      children: [
        { 
          path: ':id(\\d+)', 
          component: ContatoDetalhes, 
          name: 'contato',
          props: extrairParametroId,
        },
        {
          path: 'adicionar',
          alias: 'inserir',
          name: 'adicionarContato',
          meta: { requerAutenticacao: true },
          component: ContatoInserir,
        },
        { 
          path: ':id(\\d+)/editar', 
          alias: ':id(\\d+)/alterar',
          meta: { requerAutenticacao: true },
          components: {
            default: ContatoEditar,
            'contato-detalhes': ContatoDetalhes,
          },
          props: {
            default: extrairParametroId,
            'contato-detalhes': extrairParametroId
          }
        },
        { 
          path: '', 
          component: ContatosHome, 
          name: 'contatos',
          /* Pega o valor pra executar a busca que foi passado via 
          parâmetros no component "ContatosLista" */
          props: (route) => {
            const busca = route.query.busca
            return busca ? { busca } : {}
          },
        },
        { path: '*', component: Erro404Contatos },
      ]
    },
    { path: '/home', component: Home },
    { path: '/login', component: Login },
    { 
      path: '/', 
      redirect: to => {
        return { name: 'contatos' }
      }
    },
    { path: '*', component: Erro404 }
  ]
})

// Faz a verificação de autenticação e se a rota precisa estar autenticado para obter acesso
router.beforeEach((to, from, next) => {
  const estaAutenticado = EventBus.autenticado
  // verifica se em alguma rota possui um meta que exige estar autenticado
  if (to.matched.some(rota => rota.meta.requerAutenticacao)) {
    if (!estaAutenticado) {
      next({
        path: '/login',
        query: { redirecionar: to.fullPath }
      })
      return
    }
  }
  next()
})

export default router