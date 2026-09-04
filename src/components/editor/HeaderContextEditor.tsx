import React from 'react';
import { ReportHeader, PeriodContext } from '../../types';
import { TagListInput } from '../TagListInput';
import { User, Calendar, Building, DollarSign, Target, FileText } from 'lucide-react';

interface HeaderContextEditorProps {
  header: ReportHeader;
  context: PeriodContext;
  onUpdateHeader: (header: ReportHeader) => void;
  onUpdateContext: (context: PeriodContext) => void;
}

export const HeaderContextEditor: React.FC<HeaderContextEditorProps> = ({
  header,
  context,
  onUpdateHeader,
  onUpdateContext,
}) => {
  return (
    <div className="space-y-8">
      {/* CABEÇALHO DO RELATÓRIO */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-sm">
            <Building className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100">Cabeçalho do Relatório</h3>
            <p className="text-xs text-slate-400">Identificação do cliente, período e responsável pelo relatório.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-blue-400" />
              Cliente
            </label>
            <input
              type="text"
              value={header.clientName}
              onChange={(e) => onUpdateHeader({ ...header, clientName: e.target.value })}
              placeholder="Ex: Loja Aura Concept"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-400" />
              Responsável
            </label>
            <input
              type="text"
              value={header.manager}
              onChange={(e) => onUpdateHeader({ ...header, manager: e.target.value })}
              placeholder="Italo"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              Período de Análise
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={header.startDate}
                onChange={(e) => onUpdateHeader({ ...header, startDate: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-xs text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                title="Data Inicial"
              />
              <input
                type="date"
                value={header.endDate}
                onChange={(e) => onUpdateHeader({ ...header, endDate: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-xs text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                title="Data Final"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              Data da Análise
            </label>
            <input
              type="date"
              value={header.analysisDate}
              onChange={(e) => onUpdateHeader({ ...header, analysisDate: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 01. CONTEXTO DO PERÍODO */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-sm">
            01
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100">01. Contexto do Período</h3>
            <p className="text-xs text-slate-400">Objetivo central, orçamento e histórico das operações do mês.</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-indigo-400" />
                Objetivo Principal
              </label>
              <input
                type="text"
                value={context.objective}
                onChange={(e) => onUpdateContext({ ...context, objective: e.target.value })}
                placeholder="Ex: Escala de compras online mantendo CPA abaixo de R$ 25,00..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                Orçamento Planejado (R$)
              </label>
              <input
                type="number"
                step="0.01"
                value={context.plannedBudget || ''}
                onChange={(e) => onUpdateContext({ ...context, plannedBudget: parseFloat(e.target.value) || 0 })}
                placeholder="Ex: 12000"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <TagListInput
              label="Campanhas Ativas no Período"
              items={context.activeCampaigns}
              onChange={(items) => onUpdateContext({ ...context, activeCampaigns: items })}
              placeholder="Digite o nome da campanha e pressione Enter..."
              badgeColorClass="bg-indigo-950/70 text-indigo-300 border border-indigo-800/60"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              Observações do Período
            </label>
            <textarea
              rows={3}
              value={context.periodNotes}
              onChange={(e) => onUpdateContext({ ...context, periodNotes: e.target.value })}
              placeholder="Alterações de oferta, problemas no estoque, mudanças no atendimento no WhatsApp, datas promocionais..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
