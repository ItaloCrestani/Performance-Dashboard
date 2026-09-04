import React from 'react';
import { CommercialSection, ResultsData } from '../../types';
import { ShoppingBag, DollarSign, Users, CalendarCheck, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';

interface CommercialEditorProps {
  commercial: CommercialSection;
  results: ResultsData;
  onUpdateCommercial: (commercial: CommercialSection) => void;
}

export const CommercialEditor: React.FC<CommercialEditorProps> = ({
  commercial,
  results,
  onUpdateCommercial,
}) => {
  const handleAutoCalculateCommercial = () => {
    const invMetric = results.metrics.find((m) => m.name.toLowerCase().includes('investimento'));
    const totalInvestment = invMetric ? invMetric.current : 0;

    const copy = { ...commercial };
    if (totalInvestment > 0) {
      if (copy.revenue > 0) {
        copy.roas = Number((copy.revenue / totalInvestment).toFixed(2));
      }
      if (copy.sales > 0) {
        copy.costPerSale = Number((totalInvestment / copy.sales).toFixed(2));
      }
    }
    onUpdateCommercial(copy);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-sm">
            06
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100">06. Resultado Comercial</h3>
            <p className="text-xs text-slate-400">
              Métricas do funil de vendas do cliente (Leads, agendamentos, vendas faturadas e ROAS).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={commercial.enabled}
              onChange={(e) => onUpdateCommercial({ ...commercial, enabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            <span className="ml-3 text-xs font-semibold text-slate-200">
              {commercial.enabled ? 'Seção Ativada' : 'Desativada (Sem dados)'}
            </span>
          </label>
        </div>
      </div>

      {!commercial.enabled ? (
        <div className="p-6 text-center border border-dashed border-slate-800 rounded-xl">
          <AlertCircle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-sm text-slate-400">
            A seção de Resultados Comerciais está desativada para este relatório.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Ative o interruptor acima se o cliente disponibilizou dados de CRM, faturamento ou vendas.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAutoCalculateCommercial}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-lg text-xs font-medium border border-teal-500/30 transition-colors shadow-sm"
              title="Calcula ROAS e Custo por Venda utilizando o Investimento da seção 02"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Calcular ROAS & Custo por Venda com base no Investimento</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-teal-400" />
                Leads / Contatos
              </label>
              <input
                type="number"
                value={commercial.leads || ''}
                onChange={(e) => onUpdateCommercial({ ...commercial, leads: parseFloat(e.target.value) || 0 })}
                placeholder="Ex: 486"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-teal-400" />
                Leads Qualificados
              </label>
              <input
                type="number"
                value={commercial.qualifiedLeads || ''}
                onChange={(e) =>
                  onUpdateCommercial({ ...commercial, qualifiedLeads: parseFloat(e.target.value) || 0 })
                }
                placeholder="Ex: 440"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <CalendarCheck className="w-3.5 h-3.5 text-teal-400" />
                Agendamentos / Reuniões
              </label>
              <input
                type="number"
                value={commercial.appointments || ''}
                onChange={(e) =>
                  onUpdateCommercial({ ...commercial, appointments: parseFloat(e.target.value) || 0 })
                }
                placeholder="Ex: 0 (ou número)"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-teal-400" />
                Vendas Confirmadas
              </label>
              <input
                type="number"
                value={commercial.sales || ''}
                onChange={(e) => onUpdateCommercial({ ...commercial, sales: parseFloat(e.target.value) || 0 })}
                placeholder="Ex: 486"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                Faturamento Total (R$)
              </label>
              <input
                type="number"
                step="0.01"
                value={commercial.revenue || ''}
                onChange={(e) =>
                  onUpdateCommercial({ ...commercial, revenue: parseFloat(e.target.value) || 0 })
                }
                placeholder="Ex: 104490.00"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                Custo por Venda (R$)
              </label>
              <input
                type="number"
                step="0.01"
                value={commercial.costPerSale || ''}
                onChange={(e) =>
                  onUpdateCommercial({ ...commercial, costPerSale: parseFloat(e.target.value) || 0 })
                }
                placeholder="Ex: 23.56"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                ROAS Comercial
              </label>
              <input
                type="number"
                step="0.01"
                value={commercial.roas || ''}
                onChange={(e) => onUpdateCommercial({ ...commercial, roas: parseFloat(e.target.value) || 0 })}
                placeholder="Ex: 9.12"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Análise Comercial Qualitativa
            </label>
            <textarea
              rows={3}
              value={commercial.commercialAnalysis}
              onChange={(e) => onUpdateCommercial({ ...commercial, commercialAnalysis: e.target.value })}
              placeholder="Texto sobre qualidade dos leads recebidos pelo time comercial, velocidade de resposta no WhatsApp, taxa de fechamento e principais gargalos do atendimento..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 focus:ring-2 focus:ring-teal-500 focus:outline-none leading-relaxed"
            />
          </div>
        </div>
      )}
    </div>
  );
};
