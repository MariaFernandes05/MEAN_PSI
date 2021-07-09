import {TipoDeQuarto} from 'src/tipo-de-quarto';
export interface Hotel {
    _id: string;
    nome: string;
    morada: string;
    mail: string;
    coordenadas: string;
    telefone: string;
    ntotal: number;
    quarto: TipoDeQuarto[];
    descricao: string;
    servicos: string[];
    imagens: string[];
}
