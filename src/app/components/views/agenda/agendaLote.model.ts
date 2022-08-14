import { Time } from "@angular/common";

export interface AgendaLote{
    medico: 
    {
        id: string,
        nome:string
    },
    dataInicial: Date,
    dataFinal: Date,
    horaInicial: Time,
    horaFinal: Time,
    codigoSituacao: number,
    codigoTipo: number,
    codigoTempo: number,
}