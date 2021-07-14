<template>
    <div>
        <h3 class="font-weight-light">Contatos</h3>

        <div class="form-group">
            <input
                type="search"
                class="form-control"
                placeholder="Buscar contatos"
                @keyup.enter="buscar"
                :value="busca">
        </div>

        <hr>

        <ul class="list-group" v-if="contatosFiltrados.length > 0">
            <ContatosListaIten
                class="list-group-item"
                v-for="contato in contatosFiltrados"
                :key="contato.id"
                :contato="contato"/>
        </ul>

        <p v-else>Nenhum contato cadastrado.</p>

        <button class="btn btn-secondary mt-4 mb-4" @click="voltar">Voltar</button>
    </div>
</template>

<script>
import ContatosListaIten from './ContatosListaIten.vue'
import EventBus from './../../event-bus'

export default {
    components: {
        ContatosListaIten
    },
    // Prop transmitida pelo router que obteve acesso aos parâmetros da url de rota
    props: ['busca'],
    data() {
        return {
            contatos: []
        }
    },
    computed: {
        contatosFiltrados() {
            const busca = this.busca

            // Verifica o input de busca se está vazio e verifica os contatos para filtrar
            return !busca 
                ? this.contatos
                : this.contatos.filter(c => c.nome.toLowerCase().includes(busca.toLowerCase()))
        }
    },
    // Quando cria o component pela primeira vez, acessa o EventBus para buscar os contatos para sincronizar
    created() {
        this.contatos = EventBus.contatos
    },
    methods: {
        buscar(event) {
            // Manda para o router um parâmetro como query com a chave "busca" o valor da busca
            this.$router.push({
                path: '/contatos',
                query: { busca: event.target.value }
            })
        },
        // Retorna para a rota anterior
        voltar(event) {
            this.$router.back('/')
        }
    }
    
}
</script>