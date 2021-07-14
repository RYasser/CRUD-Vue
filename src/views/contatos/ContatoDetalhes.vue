<template>
    <div v-if="contato">
        <h3 class="font-weight-light">Nome: {{ contato.nome }}</h3>
        <p>Email: {{ contato.email }}</p>
        <button 
            class="btn btn-secondary mr-4" 
            @click="$router.back()">
                Voltar
        </button>
        <router-link 
            :to="`/contatos/${id}/editar`"
            class="btn btn-primary ml-4">
                Editar
        </router-link>
        <button 
            class="btn btn-danger ml-2"
            @click="excluir">
                Excluir
        </button>
    </div>
</template>

<script>
import EventBus from './../../event-bus'

export default {
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            contato: undefined
        }
    },
    methods: {
        excluir(event) {
            EventBus.excluirContato(this.id)
            this.$router.back()
        }
    },
    // Antes de entrar na rota, busca o primeiro contato referente ao id
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.contato = EventBus.buscarContato(+to.params.id)
        })
    },
    // Quando atualizar o parâmetro id da rota, atualiza o contato
    beforeRouteUpdate(to, from, next) {
        this.contato = EventBus.buscarContato(+to.params.id)
        next()
    }
}
</script>