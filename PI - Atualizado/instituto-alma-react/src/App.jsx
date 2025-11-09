// src/App.jsx

//Ferramentas do React Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';

//Admin Telas 

import AdminAtividadesPage from './pages/AdminAtividadesPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminEventosPage from './pages/AdminEventosPage';
import AdminTransparenciaPage from './pages/AdminTransparenciaPage';
import AdminHistoricoPage from './pages/AdminHistoricoPage';
import AdminOuvidoriaPage from './pages/AdminOuvidoriaPage';

//Doador Telas 
import DoadorPainelPage from './pages/DoadorPainelPage';
import DoadorHistoricoPage from './pages/DoadorHistoricoPage';
import DoadorGerenciarPage from './pages/DoadorGerenciarPage';

//Login e Cad Telas
import CadastroPage from './pages/CadastroPage';
import LoginPage from './pages/LoginPage';

//Tela de Todos
import DoePage from './pages/DoePage';
import AtividadesPage from './pages/AtividadesPage';
import EventosPage from './pages/EventosPage';
import HomePage from './pages/HomePage';  
import OuvidoriaPage from './pages/OuvidoriaPage';
import SobrePage from './pages/SobrePage';
import TransparenciaPage from './pages/TransparenciaPage';

// 4. Criamos o "mapa do site"
const router = createBrowserRouter([
  {
    // === ROTAS PÚBLICAS ===
    // Todas as rotas dentro deste objeto usarão o <PublicLayout>
    // (ou seja, terão o Header e Footer principal)
    path: '/',
    element: <PublicLayout />,
    children: [
      // 'index: true' significa que esta é a página padrão para '/'
      { index: true, element: <HomePage /> },
      
      // Quando criarmos as outras páginas, vamos adicioná-las aqui.
       { path: 'sobre', element: <SobrePage /> },
       { path: 'atividades', element: <AtividadesPage /> },
       { path: 'eventos', element: <EventosPage /> },
       { path: 'transparencia', element: <TransparenciaPage /> },
       { path: 'ouvidoria', element: <OuvidoriaPage /> },
       { path: 'doe', element: <DoePage /> },
    ]
  },
  {
    // === ROTAS DE AUTENTICAÇÃO ===
    // Estas rotas usarão o <AuthLayout> (layout de tela dividida)
    path: '/',
    element: <AuthLayout />,
    children: [
       { path: 'login', element: <LoginPage /> },
       { path: 'cadastro', element: <CadastroPage /> }
    ]
  },
  {
    // === ROTAS DO ADMIN ===
    // Estas rotas usarão o <AdminLayout> (com a sidebar)
    path: '/admin',
    element: <AdminLayout />,
    children: [
       { path: 'dashboard', element: <AdminDashboardPage /> },
       { path: 'atividades', element: <AdminAtividadesPage /> },
       { path: 'eventos', element: <AdminEventosPage /> },
       { path: 'transparencia', element: <AdminTransparenciaPage /> },
       { path: 'historico', element: <AdminHistoricoPage /> },
       { path: 'ouvidoria', element: <AdminOuvidoriaPage /> }
    ]
  },
  {
    // === ROTAS DO DOADOR ===
    // Estas rotas TAMBÉM usarão o <AdminLayout>
    path: '/doador',
    element: <AdminLayout />,
    children: [
       { path: 'painel', element: <DoadorPainelPage /> },
       { path: 'historico', element: <DoadorHistoricoPage /> },
       { path: 'gerenciar', element: <DoadorGerenciarPage /> }
    ]
  }
]);

// 5. O App agora apenas "fornece" o mapa de rotas
function App() {
  return <RouterProvider router={router} />;
}

export default App;