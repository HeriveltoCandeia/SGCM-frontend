import { TipoExame } from "./tipoExame.model";

export interface Exame{
    id?: String,
    descricao: String,
    tipoExame: TipoExame
}