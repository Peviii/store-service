class ListaCaracteristicaProdDTO {
  nome: string;
  desc: string;
}

class ListaImagemProdDTO {
  url: string;
  desc: string;
}

export class ListaProdDTO {
  id: string;
  usuarioId: string;
  nome: string;
  valor: number;
  qtd: number;
  desc: string;
  categoria: string;
  caracteristicas: ListaCaracteristicaProdDTO[];
  imagem: ListaImagemProdDTO[];
}
