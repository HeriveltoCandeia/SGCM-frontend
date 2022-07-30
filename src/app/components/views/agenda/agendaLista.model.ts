export interface AgendaLista{
    chaveCompostaAgenda: 
    {
        codigoMedicoId: string,
        dataAgenda: Date
    },
    cliente: 
    {
        id: string,
        nome:string
    },
    codigoSituacao: Number,
    codigoTipo: Number
}