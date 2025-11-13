import React, { useState } from 'react';
import { Plus, Search, FileText, Users, BookOpen, User, Bell, Clock, Edit2, Trash2, X } from 'lucide-react';

const JornalismoApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [pautas, setPautas] = useState([
    { id: 1, titulo: 'Reportagem sobre educação', deadline: '2025-10-25', status: 'em-andamento', descricao: 'Investigar situação das escolas públicas' },
    { id: 2, titulo: 'Matéria política local', deadline: '2025-10-22', status: 'pendente', descricao: 'Cobertura da sessão da câmara' }
  ]);
  const [fontes, setFontes] = useState([
    { id: 1, nome: 'Dr. João Silva', cargo: 'Secretário de Educação', contato: 'joao@gov.br', categoria: 'Educação', oficial: true },
    { id: 2, nome: 'Maria Santos', cargo: 'Presidente ONG', contato: '(11) 99999-9999', categoria: 'Social', oficial: false }
  ]);
  const [templates] = useState([
    { id: 1, nome: 'Matéria Padrão', conteudo: 'TÍTULO:\n\nLINE:\n\nLEAD (quem, o quê, quando, onde, como, por quê):\n\nDESENVOLVIMENTO:\n\nCONCLUSÃO:' },
    { id: 2, nome: 'Roteiro VT', conteudo: 'CABEÇA:\n\nOFF 1:\n\nSONORA 1:\n\nOFF 2:\n\nIMAGENS:\n\nENCERRAMENTO:' },
    { id: 3, nome: 'Nota Oficial', conteudo: 'TÍTULO:\n\nTEXTO (factual e objetivo):\n\nFONTE:\n\nDATA:' }
  ]);
  const [guias] = useState([
    { id: 1, titulo: 'Como Verificar Fontes', conteudo: '1. Cheque credenciais\n2. Busque fontes oficiais\n3. Cruzar informações\n4. Verificar histórico' },
    { id: 2, titulo: 'Técnicas de Entrevista', conteudo: '1. Prepare perguntas\n2. Escuta ativa\n3. Perguntas abertas\n4. Follow-up' },
    { id: 3, titulo: 'Checklist de Apuração', conteudo: '☐ Verificar 3+ fontes\n☐ Dados oficiais\n☐ Contexto histórico\n☐ Ouvir todos os lados' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [formData, setFormData] = useState({});

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setFormData(item || {});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({});
  };

  const updateField = (field, value) => {
    setFormData({...formData, [field]: value});
  };

  const savePauta = () => {
    const novaPauta = {
      id: editingItem ? editingItem.id : Date.now(),
      titulo: formData.titulo || '',
      deadline: formData.deadline || '',
      status: formData.status || 'pendente',
      descricao: formData.descricao || ''
    };
    if (editingItem) {
      setPautas(pautas.map(p => p.id === editingItem.id ? novaPauta : p));
    } else {
      setPautas([...pautas, novaPauta]);
    }
    closeModal();
  };

  const saveFonte = () => {
    const novaFonte = {
      id: editingItem ? editingItem.id : Date.now(),
      nome: formData.nome || '',
      cargo: formData.cargo || '',
      contato: formData.contato || '',
      categoria: formData.categoria || '',
      oficial: editingItem ? editingItem.oficial : false
    };
    if (editingItem) {
      setFontes(fontes.map(f => f.id === editingItem.id ? novaFonte : f));
    } else {
      setFontes([...fontes, novaFonte]);
    }
    closeModal();
  };

  const deletePauta = (id) => {
    setPautas(pautas.filter(p => p.id !== id));
  };

  const deleteFonte = (id) => {
    setFontes(fontes.filter(f => f.id !== id));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'em-andamento': return 'bg-blue-100 text-blue-800';
      case 'concluido': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diff = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const filteredPautas = pautas.filter(p => {
    const matchSearch = p.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterStatus === 'todos' || p.status === filterStatus;
    return matchSearch && matchFilter;
  });

  const filteredFontes = fontes.filter(f => 
    f.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const HomeView = () => (
    <div className="p-4 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Minhas Pautas</h1>
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar pautas..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-2 border rounded-lg bg-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="pendente">Pendente</option>
            <option value="em-andamento">Em Andamento</option>
            <option value="concluido">Concluído</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredPautas.map(pauta => {
          const daysLeft = getDaysUntilDeadline(pauta.deadline);
          return (
            <div key={pauta.id} className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg flex-1">{pauta.titulo}</h3>
                <div className="flex gap-2 ml-2">
                  <button onClick={() => openModal('pauta', pauta)} className="text-blue-500 hover:text-blue-700">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => deletePauta(pauta.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-3">{pauta.descricao}</p>
              <div className="flex justify-between items-center flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(pauta.status)}`}>
                  {pauta.status.replace('-', ' ')}
                </span>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className={daysLeft <= 2 ? 'text-red-500' : 'text-gray-500'} />
                  <span className={daysLeft <= 2 ? 'text-red-500 font-semibold' : 'text-gray-600'}>
                    {daysLeft > 0 ? `${daysLeft} dias` : daysLeft === 0 ? 'Hoje!' : 'Atrasado'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => openModal('pauta')}
        className="fixed bottom-20 right-6 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition"
      >
        <Plus size={24} />
      </button>
    </div>
  );

  const FontesView = () => (
    <div className="p-4 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Banco de Fontes</h1>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar fontes..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredFontes.map(fonte => (
          <div key={fonte.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold">{fonte.nome}</h3>
                  {fonte.oficial && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                      Oficial
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mt-1">{fonte.cargo}</p>
              </div>
              <div className="flex gap-2 ml-2">
                <button onClick={() => openModal('fonte', fonte)} className="text-blue-500 hover:text-blue-700">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => deleteFonte(fonte.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-700 mt-2">
              <p className="mb-1">📞 {fonte.contato}</p>
              <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                {fonte.categoria}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => openModal('fonte')}
        className="fixed bottom-20 right-6 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition"
      >
        <Plus size={24} />
      </button>
    </div>
  );

  const [verifyText, setVerifyText] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);
  const [verifying, setVerifying] = useState(false);

  const verificarFonte = async () => {
    if (!verifyText.trim()) return;
    
    setVerifying(true);
    // Simula chamada API - substitua pela sua API de IA
    setTimeout(() => {
      setVerifyResult({
        confiavel: Math.random() > 0.3,
        score: Math.floor(Math.random() * 40) + 60,
        detalhes: [
          'Fonte verificada em bases oficiais',
          'Informação cruzada com 3 veículos',
          'Dados compatíveis com registros públicos'
        ]
      });
      setVerifying(false);
    }, 2000);
  };

  const GuiasView = () => (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Guias e Templates</h1>
      
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Search size={20} className="text-green-500" />
          Verificador de Fontes
        </h2>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600 mb-3">Cole o texto ou URL para verificar a confiabilidade da fonte</p>
          <textarea
            value={verifyText}
            onChange={(e) => setVerifyText(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg mb-3 focus:ring-2 focus:ring-green-500 outline-none"
            rows="4"
            placeholder="Ex: https://site.com/noticia ou texto completo..."
          />
          <button
            onClick={verificarFonte}
            disabled={verifying || !verifyText.trim()}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {verifying ? '🔍 Verificando...' : '✓ Verificar Fonte'}
          </button>
          
          {verifyResult && (
            <div className={`mt-4 p-4 rounded-lg border-2 ${verifyResult.confiavel ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-lg">
                  {verifyResult.confiavel ? '✓ Fonte Confiável' : '⚠️ Fonte Duvidosa'}
                </span>
                <span className="text-2xl font-bold">{verifyResult.score}%</span>
              </div>
              <ul className="text-sm space-y-1 mt-3">
                {verifyResult.detalhes.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <FileText size={20} className="text-blue-500" />
          Templates
        </h2>
        <div className="space-y-3">
          {templates.map(template => (
            <div key={template.id} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-3">{template.nome}</h3>
              <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans bg-gray-50 p-3 rounded border">
                {template.conteudo}
              </pre>
              <button className="mt-3 text-blue-500 text-sm font-medium hover:text-blue-700">
                📋 Copiar Template
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <BookOpen size={20} className="text-blue-500" />
          Guias Práticos
        </h2>
        <div className="space-y-3">
          {guias.map(guia => (
            <div key={guia.id} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-3">{guia.titulo}</h3>
              <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans leading-relaxed">
                {guia.conteudo}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PerfilView = () => (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Perfil</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            JD
          </div>
          <div>
            <h2 className="text-xl font-semibold">Jornalista Demo</h2>
            <p className="text-gray-600">jornalista@email.com</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between py-3 border-b">
            <span className="text-gray-700">Pautas Criadas</span>
            <span className="font-semibold text-blue-600">{pautas.length}</span>
          </div>
          <div className="flex justify-between py-3 border-b">
            <span className="text-gray-700">Fontes Cadastradas</span>
            <span className="font-semibold text-blue-600">{fontes.length}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-gray-700">Pautas Concluídas</span>
            <span className="font-semibold text-green-600">{pautas.filter(p => p.status === 'concluido').length}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow divide-y">
        <button className="w-full text-left py-4 px-4 hover:bg-gray-50 transition flex items-center gap-3">
          <Bell size={20} className="text-gray-600" />
          <span>Notificações</span>
        </button>
        <button className="w-full text-left py-4 px-4 hover:bg-gray-50 transition flex items-center gap-3">
          <FileText size={20} className="text-gray-600" />
          <span>Sincronizar Google Agenda</span>
        </button>
        <button className="w-full text-left py-4 px-4 hover:bg-gray-50 transition flex items-center gap-3 text-red-500">
          <X size={20} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );

  const Modal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
            <h2 className="text-xl font-semibold">
              {modalType === 'pauta' ? (editingItem ? 'Editar Pauta' : 'Nova Pauta') : 
               modalType === 'fonte' ? (editingItem ? 'Editar Fonte' : 'Nova Fonte') : ''}
            </h2>
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="p-4">
            {modalType === 'pauta' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Título *</label>
                  <input
                    type="text"
                    value={formData.titulo || ''}
                    onChange={(e) => updateField('titulo', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Ex: Reportagem sobre saúde pública"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Descrição</label>
                  <textarea
                    value={formData.descricao || ''}
                    onChange={(e) => updateField('descricao', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    rows="3"
                    placeholder="Descreva os detalhes da pauta..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Deadline *</label>
                  <input
                    type="date"
                    value={formData.deadline || ''}
                    onChange={(e) => updateField('deadline', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={formData.status || 'pendente'}
                    onChange={(e) => updateField('status', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option value="pendente">Pendente</option>
                    <option value="em-andamento">Em Andamento</option>
                    <option value="concluido">Concluído</option>
                  </select>
                </div>
                <button
                  onClick={savePauta}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-medium"
                >
                  Salvar Pauta
                </button>
              </div>
            )}

            {modalType === 'fonte' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome *</label>
                  <input
                    type="text"
                    value={formData.nome || ''}
                    onChange={(e) => updateField('nome', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Ex: Dr. João Silva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cargo</label>
                  <input
                    type="text"
                    value={formData.cargo || ''}
                    onChange={(e) => updateField('cargo', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Ex: Secretário Municipal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Contato *</label>
                  <input
                    type="text"
                    value={formData.contato || ''}
                    onChange={(e) => updateField('contato', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Email ou telefone"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Categoria</label>
                  <input
                    type="text"
                    value={formData.categoria || ''}
                    onChange={(e) => updateField('categoria', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Ex: Política, Educação, Saúde"
                  />
                </div>
                <button
                  onClick={saveFonte}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-medium"
                >
                  Salvar Fonte
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <h1 className="text-xl font-bold flex items-center gap-2">
            📰 JornaApp
          </h1>
          <button className="hover:bg-blue-500 p-2 rounded-full transition">
            <Bell size={22} />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pb-16">
        {currentView === 'home' && <HomeView />}
        {currentView === 'fontes' && <FontesView />}
        {currentView === 'guias' && <GuiasView />}
        {currentView === 'perfil' && <PerfilView />}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="flex justify-around p-2 max-w-6xl mx-auto">
          <button
            onClick={() => {setCurrentView('home'); setSearchTerm('');}}
            className={`flex flex-col items-center p-2 rounded-lg transition ${currentView === 'home' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <FileText size={24} />
            <span className="text-xs mt-1 font-medium">Pautas</span>
          </button>
          <button
            onClick={() => {setCurrentView('fontes'); setSearchTerm('');}}
            className={`flex flex-col items-center p-2 rounded-lg transition ${currentView === 'fontes' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Users size={24} />
            <span className="text-xs mt-1 font-medium">Fontes</span>
          </button>
          <button
            onClick={() => setCurrentView('guias')}
            className={`flex flex-col items-center p-2 rounded-lg transition ${currentView === 'guias' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <BookOpen size={24} />
            <span className="text-xs mt-1 font-medium">Guias</span>
          </button>
          <button
            onClick={() => setCurrentView('perfil')}
            className={`flex flex-col items-center p-2 rounded-lg transition ${currentView === 'perfil' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <User size={24} />
            <span className="text-xs mt-1 font-medium">Perfil</span>
          </button>
        </div>
      </div>

      <Modal />
    </div>
  );
};

export default JornalismoApp;
