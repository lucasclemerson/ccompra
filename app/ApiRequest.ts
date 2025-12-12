const API_BASE_URL = 'http://192.168.0.8:8000/api'; 

interface Categoria {
  id: number;
  nome: string;
}

interface Produto {
  id?: number; 
  nome: string;
  quantidade_unidades: number;
  preco: number;
  idCategoria: number;
}

export default()=> {
  return false;
}

export const fetchCategorias = async (): Promise<Categoria[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    const data: Categoria[] = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw error; 
  }
};

export const saveProduto = async (produtoData: Produto): Promise<Produto> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produtoData),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error("Erro detalhado da API ao salvar:", errorBody);
      throw new Error(`Erro HTTP ao salvar produto: ${response.status}`);
    }

    const savedProduct: Produto = await response.json();
    return savedProduct;

  } catch (error) {
    console.error("Erro de rede ao salvar produto:", error);
    throw error;
  }
};

export const fetchProdutos = async (): Promise<Produto[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    const data: Produto[] = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};

export const checkApiConnection = async (): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);

        if (response.ok) {
            // console.log('Conexão com API OK');
            return true;
        } else {
            console.error(`Falha na conexão. Status HTTP: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.error("Erro de rede ao conectar à API:", error);
        return false;
    }
};