interface Tag {
  id: number;
  tid: string;
  title: string;
}

interface ProdutoImagem {
  id: number;
  imagen: string;
  created_at: string;
  produto: number;
}

interface Produto {
  id: number;
  tags: Tag[];
  produto_imagens: ProdutoImagem[];
  pid: string;
  cbr: string;
  title: string;
  image: string | null;
  descricao: string;
  preco: string;
  preco_antigo: string;
  especificacao: string;
  created_at: string;
  updated_at: string;
  user: number | null;
  categoria: number | null;
}