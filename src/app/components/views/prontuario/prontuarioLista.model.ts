export interface ProntuarioLista{
    id?: String,
    chaveCompostaProntuario: 
    {
        codigoMedicoId: string,
        dataProntuario: Date
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