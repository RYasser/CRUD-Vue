<template>
    <div>
        <h3 class="font-weight-light">Novo contato</h3>
        <hr>
        <form @submit.prevent="salvar">
            <div class="form-group">
                <label>Nome</label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Nome do novo contato"
                    v-model="contatos.nome">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input
                    type="email"
                    class="form-control"
                    placeholder="Email do novo contato"
                    v-model="contatos.email">
            </div>
            <button 
                type="submit"
                class="btn btn-success float-right">
                    Salvar
            </button>
        </form>
    </div>
</template>

<script>
    import EventBus from './../../event-bus'

    export default {
        data() {
            return {
                contatos: {
                    id: undefined,
                    nome: '',
                    email: ''
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.contato = EventBus.contatos
            })
        },
        methods: {
            salvar(event) {
                EventBus.inserirContato(Object.assign({}, this.contatos))
                this.$router.push('/contatos')
            }
        }
    }
</script>