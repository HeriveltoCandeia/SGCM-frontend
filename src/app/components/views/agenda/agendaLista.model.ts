export interface AgendaLista{
    id?: String,
    medico: 
    {
        id: string,
        nome:string
    },
    dataAgenda: Date,
    cliente: 
    {
        id: string,
        nome:string
    },
    codigoSituacao: Number,
    codigoTipo: Number,
    dataReg?: Date
}