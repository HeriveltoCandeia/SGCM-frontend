export interface ProntuarioExame{
    id?: String,
    prontuarioMedico: 
    {
        id: string,
    },
    exame:
    {
        id: string,
        descricao: string
    },
    codigoSituacao: Number,
    orientacoes?: string,
    resultado?: string,
}