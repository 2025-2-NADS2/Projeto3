// instituto-alma-react/src/utils/authFetch.js
// Esta é uma função 'fetch' personalizada que anexa o token JWT

const authFetch = async (url, options = {}) => {
  // 1. Pega o token do localStorage
  const token = localStorage.getItem('token');

  // 2. Prepara os cabeçalhos (headers)
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...options.headers, // Permite que options personalizadas substituam o padrão
  };

  // 3. Se o token existir, anexa ele ao cabeçalho 'Authorization'
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  // 4. Monta as novas opções da requisição
  const newOptions = {
    ...options,
    headers: defaultHeaders,
  };

  // 5. Chama o 'fetch' original com as novas opções
  return fetch(url, newOptions);
};

export default authFetch;