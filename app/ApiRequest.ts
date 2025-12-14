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

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  foto?: string;
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    nome: string;
    email: string;
    foto: string;
  };
  status: number;
}

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

export default()=> {
  return false;
}

export const loginUser = async (credenciais: any): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(credenciais),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error("Erro detalhado da API ao logar:", errorBody);
      throw new Error(`Erro ao receber a resposta de autenticação: ${response.status}`);
    }

    return await response.json();
   
  } catch (error) {
    console.error("Erro de rede ao logar o usuário:", error);
    throw error;
  }
};

export const fetchUsers = async (): Promise<Usuario[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "GET",
      headers: HEADERS
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro ao buscar usuários:", errorText);
      throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
    }

    const data = (await response.json()) as Usuario[];
    return data;

  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};

export const deleteProdutoById = async (idProduct: number, token: String): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${idProduct}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });   

  } catch (error) {   
    console.error("Erro ao deletar o produto:", error);
    throw error; 
  }
};

export const fetchProdutosByCategoryId = async (idCategory: number, token: String): Promise<Produto[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
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

export const fetchCategory = async (idCategory: number, token: String): Promise<Categoria[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${idCategory}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
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

export const fetchCategorias = async (token: String): Promise<Categoria[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
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

export const saveProduto = async (produtoData: Produto, token: String): Promise<Produto> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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


export const saveCategoria = async (categoriaData: Categoria, token: String): Promise<Categoria> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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

export const fetchProdutos = async (token: String): Promise<Produto[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
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
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: "GET",
      });

      if (response.ok) {
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