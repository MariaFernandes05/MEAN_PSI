import {TipoDeQuarto} from 'src/tipo-de-quarto';
import {Hotel} from 'src/hotel';

export interface Reserva {
	_id: string;
	tipoDeQuarto: string;
	custo: number;
	dataCheckIn: string;
	dataCheckOut: string;
	hotel: string;
 	numeroCartao: string;
	dataValidade: string;
 	cvv: string;
        quartoId: string;
        cliente: string;
}
