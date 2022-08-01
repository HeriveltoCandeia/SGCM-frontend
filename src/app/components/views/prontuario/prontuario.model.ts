export interface Prontuario{
    id?: String,
    dataTimeProntuario: Date,
    medico: 
    {
        id: string,
        nome:string
    },
    cliente: 
    {
        id: string,
        nome:string
    },
    codigoSituacao: Number,
    dataReg?: Date,
    orientacoes: string
}