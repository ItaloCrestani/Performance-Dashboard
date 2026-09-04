import React, { useState, useRef } from 'react';
import { ClientReport } from '../types';
import { initialReport } from '../data/defaultData';
import {
  FileText,
  Eye,
  Edit3,
  Plus,
  Copy,
  Trash2,
  Download,
  Upload,
  RotateCcw,
  Printer,
  Check,
  Building,
  Sparkles,
  ChevronDown,
  Layers,
} from 'lucide-react';
import { generateExecutiveMarkdown } from '../utils/formatters';

interface HeaderNavProps {
  currentReport: ClientReport;
  reportsList: { id: string; clientName: string; period: string }[];
  onSelectReport: (id: string) => void;
  onCreateNewReport: (clientName: string, manager: string) => void;
  onDuplicateReport: () => void;
  onDeleteReport: (id: string) => void;
  onResetToDefault: () => void;
  onImportJSON: (report: ClientReport) => void;
  activeView: 'editor' | 'preview';
  onToggleView: (view: 'editor' | 'preview') => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentReport,
  reportsList,
  onSelectReport,
  onCreateNewReport,
  onDuplicateReport,
  onDeleteReport,
  onResetToDefault,
  onImportJSON,
  activeView,
  onToggleView,
}) => {
  const [showNewModal, setShowNewModal] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newManager, setNewManager] = useState('Italo');
  const [copiedMd, setCopiedMd] = useState(false);
  const [showClientsDropdown, setShowClientsDropdown] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newClientName.trim()) {
      onCreateNewReport(newClientName.trim(), newManager.trim() || 'Italo');
      setNewClientName('');
      setShowNewModal(false);
    }
  };

  const handleCopyMarkdown = () => {
    const md = generateExecutiveMarkdown(currentReport);
    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.header && parsed.results) {
            onImportJSON(parsed);
          } else {
            alert('Arquivo JSON inválido. Certifique-se de ser um relatório de tráfego pago exportado pelo app.');
          }
        } catch {
          alert('Erro ao ler arquivo JSON.');
        }
      };
      reader.readAsText(file);
    }
    // reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <header className="no-print bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-slate-100 tracking-tight">
                  TrafficHub
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase tracking-wider">
                  Pro
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Dashboard de Performance &bull; Gestão Mensal por Cliente
              </p>
            </div>
          </div>

          {/* Client Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowClientsDropdown(!showClientsDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-950/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg text-xs font-semibold text-slate-200 transition-colors max-w-[200px] sm:max-w-[260px] truncate"
            >
              <Building className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
              <span className="truncate">
                {currentReport.header.clientName || 'Selecione o Cliente'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 ml-auto" />
            </button>

            {showClientsDropdown && (
              <div className="absolute left-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 text-xs">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 flex items-center justify-between">
                  <span>Clientes Salvos ({reportsList.length})</span>
                  <button
                    onClick={() => {
                      setShowClientsDropdown(false);
                      setShowNewModal(true);
                    }}
                    className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Novo
                  </button>
                </div>

                <div className="max-h-60 overflow-y-auto divide-y divide-slate-800/50">
                  {reportsList.map((r) => (
                    <div
                      key={r.id}
                      className={`flex items-center justify-between px-3 py-2 hover:bg-slate-800/60 cursor-pointer ${
                        r.id === currentReport.id ? 'bg-blue-500/10 text-blue-400 font-bold' : 'text-slate-300'
                      }`}
                      onClick={() => {
                        onSelectReport(r.id);
                        setShowClientsDropdown(false);
                      }}
                    >
                      <div className="truncate pr-2">
                        <div className="truncate font-medium">{r.clientName}</div>
                        <div className="text-[10px] text-slate-500">{r.period}</div>
                      </div>
                      {reportsList.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Excluir o relatório de "${r.clientName}"?`)) {
                              onDeleteReport(r.id);
                            }
                          }}
                          className="text-slate-500 hover:text-rose-400 p-1"
                          title="Excluir relatório"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-2 border-t border-slate-800 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowClientsDropdown(false);
                      onDuplicateReport();
                    }}
                    className="w-full text-center py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] font-medium"
                  >
                    Duplicar Atual
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowClientsDropdown(false);
                      onResetToDefault();
                    }}
                    className="w-full text-center py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] font-medium"
                    title="Recarrega o exemplo completo da Loja Aura Concept"
                  >
                    Resetar Exemplo
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* View Mode Toggle: Editar vs Visualizar */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => onToggleView('editor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'editor'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleView('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'preview'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Relatório</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/90 hover:bg-indigo-600 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
              title="Copia o resumo formatado em Markdown para enviar no WhatsApp ou Notion"
            >
              {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">{copiedMd ? 'Copiado!' : 'Copiar Resumo'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (activeView !== 'preview') onToggleView('preview');
                setTimeout(() => window.print(), 150);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
              title="Imprimir ou gerar PDF limpo"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden md:inline">PDF / Imprimir</span>
            </button>

            {/* Hidden file input for import */}
            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors"
              title="Importar relatório JSON"
            >
              <Upload className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Novo Relatório */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-sm">
                <Plus className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">Criar Novo Relatório de Cliente</h3>
                <p className="text-xs text-slate-400">Preencha o nome do cliente para inicializar o relatório.</p>
              </div>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Nome do Cliente
                </label>
                <input
                  type="text"
                  required
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="Ex: Clínica OdontoPrime, Academia MoveFit..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Responsável pelo Tráfego
                </label>
                <input
                  type="text"
                  value={newManager}
                  onChange={(e) => setNewManager(e.target.value)}
                  placeholder="Italo"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                >
                  Criar Relatório
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
