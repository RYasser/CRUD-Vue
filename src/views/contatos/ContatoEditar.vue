<template>
    <div v-if="contato">
        <h3 class="font-weight-light">Nome do contato: {{ contato.nome }}</h3>
        <!-- Compos sobre o usuário de edição -->
        <form @submit.prevent="salvar">
            <div class="form-group">
                <label>Nome</label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Insira o nome"
                    v-model="contato.nome">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input
                    type="email"
                    class="form-control"
                    placeholder="Insira o email"
                    v-model="contato.email">
            </div>
            <!-- Botão de retorno para a página anterior -->
            <button 
                type="button"
                class="btn btn-secondary mt-4 mb-4 mr-2"
                @click="$router.back()">
                    Voltar
            </button>
            
            <!-- Botão para enviar o formulário de edição -->
            <button 
                type="submit"
                class="btn btn-success">
                    Salvar
            </button>
        </form>
    </div>
</template>

<script>
import EventBus from './../../event-bus'

export default {
    props: ['id'],
    data() {
        return {
            contato: undefined,
            estaCancelando: true
        }
    },
    // Busca o contato para edição pelo id antes de chegar na página de edição
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.contato = EventBus.buscarContato(+to.params.id)
        })
    },
    // Manda um alert perguntando se o usuário realmente deseja voltar
    beforeRouteLeave(to, from, next) {
        this.estaCancelando
            ? next(window.confirm('Deseja realmente sair?'))
            : next()
    },
    methods: {
        salvar(event) {
            EventBus.editarContato(this.contato)
            this.estaCancelando = false
            this.$router.push('/contatos')
        }
    }
}
</script>