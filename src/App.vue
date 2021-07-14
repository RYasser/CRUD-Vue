<template>
  <div id="app">

    <div class="jumbotron">
      <h1 class="display-4">CRUD Contatos</h1>
      <p class="lead">Gerenciamento de contatos</p>
    </div>

    <div class="container">
    
      <!-- Botões referentes as rotas -->
      <router-link 
        to="/home" 
        class="btn btn-info mb-4 mr-2"
        exact>
          Home
      </router-link>

      <router-link 
        :to="{ path: '/contatos' }" 
        class="btn btn-info mb-4 mr-2">
          Contatos
      </router-link>

      <router-link 
        v-if="$route.fullPath === '/contatos'"
        :to="{ path: '/contatos/inserir' }" 
        class="btn btn-success mb-4 mr-2 float-right">
          Novo contato
      </router-link>

      <!-- Cria uma animação de transição do component atual -->
      <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>
      
    </div>
  </div>
</template>

<style scoped>
  .slide-enter, .slide-leave-to {
    transform: translateX(-50px);
    opacity: 0;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }

</style>