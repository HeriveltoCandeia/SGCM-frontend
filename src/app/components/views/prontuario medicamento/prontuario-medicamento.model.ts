export interface ProntuarioMedicamento{
    id?: String,
    prontuarioMedico: 
    {
        id: string,
    },
    medicamento:
    {
        id: string,
        nomeFabrica: string
    },
    orientacoes?: string
}