export interface Cliente{
    id?: String,
    nome: String,
    cpf: String,
    sexo: String,
    dataNascimento: Date,
    email: String,
    convenioMedico?: String,
    numeroCarteirinha?: String
}