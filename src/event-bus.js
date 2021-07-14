import Vue from 'vue'

export default new Vue({
    data: {
        // Para utilização de verificar no router se está autenticado
        autenticado: false,

        // Contatos padrão para exemplificar
        contatos: [
            { id: 1, nome: 'Rafael', email: 'rafael@gmail.com' },
            { id: 2, nome: 'Contato 2', email: 'contato2@gmail.com' },
            { id: 3, nome: 'Contato 3', email: 'contato3@hotmail.com' }
        ]
    },
    // Manda o status pro router
    created() {
        this.$on('autenticar', (autenticado) => {
            this.autenticado = autenticado
        })
    },
    methods: {
        buscarContato(id) {
            return Object.assign({}, this.contatos.find(c => c.id === id))
        },
        editarContato(contato) {
            const indice = this.contatos.findIndex(c => c.id === contato.id)
            this.contatos.splice(indice, 1, contato)
        },
        inserirContato(novoContato) {
            const tamanho = this.contatos.length
            
            // Realiza verificação para determinar o id do novo elemento
            if (tamanho != 0) {
                const idUltimoContato = this.contatos[tamanho-1].id
                novoContato.id = idUltimoContato + 1
                this.contatos.push(novoContato)
            } else {
                novoContato.id = 1
                this.contatos.push(novoContato)
            }
        },
        excluirContato(id) {
            this.contatos.forEach((contatoAtual, indice) => {
                if (contatoAtual.id === id) {
                    this.contatos.splice(indice, 1)
                }
            })
        }
    }
})