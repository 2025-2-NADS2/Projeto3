// instituto-alma-api/middleware/authMiddleware.js
// Este é o nosso "segurança" de rotas

import jwt from 'jsonwebtoken';

// Usamos uma chave secreta para verificar o token
// DEVE ser a MESMA chave que usamos no server.js para criar o token
const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta-muito-segura';

const authMiddleware = (req, res, next) => {
  // 1. Pega o token do cabeçalho 'Authorization'
  const authHeader = req.headers.authorization;

  // 2. Verifica se o token existe
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  // 3. Extrai o token (remove o "Bearer ")
  const token = authHeader.split(' ')[1];

  try {
    // 4. Verifica se o token é válido
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // 5. Adiciona os dados do usuário (ex: id, tipo) ao objeto 'req'
    // para que as próximas rotas possam usá-lo
    req.user = decoded; 
    
    // 6. Deixa a requisição continuar
    next(); 
    
  } catch (ex) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};

// ESTA LINHA ESTAVA FALTANDO
export default authMiddleware;