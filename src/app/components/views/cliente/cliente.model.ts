export interface Cliente{
    id?: string,
    nome: string,
    cpf: string,
    sexo: string,
    dataNascimento: string,
    email: string,
    convenioMedico?: string,
    numeroCarteirinha?: string
}