const API_BASE_URL = 'http://192.168.0.8:8000/api'; 

interface Categoria {
  id: number;
  nome: string;
  slogan: string;
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

export const deleteProdutoById = async (idProduct: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${idProduct}`, {
      method: 'DELETE',
    });   

  } catch (error) {   
    console.error("Erro ao deletar o produto:", error);
    throw error; 
  }
};

export const fetchProdutosByCategoryId = async (idCategory: number): Promise<Produto[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    const data: Produto[] = await response.json();
    let returnedData = data.filter(prod => prod.idCategoria == idCategory);
    return returnedData;
    
  } catch (error) {
    console.error("Erro ao buscar os produtos dessa categoria:", error);
    throw error; 
  }
}

export const fetchCategory = async (idCategory: number): Promise<Categoria[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${idCategory}`);
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    const data: Categoria = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar a categoria:", error);
    throw error; 
  }
};

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


export const saveCategoria = async (categoriaData: Categoria): Promise<Categoria> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoriaData),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error("Erro detalhado da API ao salvar:", errorBody);
      throw new Error(`Erro HTTP ao salvar categoria: ${response.status}`);
    }

    const savedCategory: Categoria = await response.json();
    return savedCategory;

  } catch (error) {
    console.error("Erro de rede ao salvar categoria:", error);
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