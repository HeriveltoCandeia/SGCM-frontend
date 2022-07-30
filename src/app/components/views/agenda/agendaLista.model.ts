export interface AgendaLista{
    id?: String,
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
    codigoTipo: Number,
    dataReg?: string
}