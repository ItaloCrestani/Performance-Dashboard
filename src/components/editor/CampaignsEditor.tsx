import React from 'react';
import { CampaignAnalysis, DecisionType } from '../../types';
import { TagListInput } from '../TagListInput';
import { Plus, Trash2, Megaphone, CheckCircle2, AlertTriangle, Compass } from 'lucide-react';

interface CampaignsEditorProps {
  campaigns: CampaignAnalysis[];
  onUpdateCampaigns: (campaigns: CampaignAnalysis[]) => void;
}

const DECISIONS: DecisionType[] = ['Manter', 'Otimizar', 'Reduzir', 'Pausar', 'Escalar'];

export const CampaignsEditor: React.FC<CampaignsEditorProps> = ({
  campaigns,
  onUpdateCampaigns,
}) => {
  const handleAddCampaign = () => {
    const newCamp: CampaignAnalysis = {
      id: `camp_${Date.now()}`,
      name: `Nova Campanha ${campaigns.length + 1}`,
      objective: 'Conversões / Compras',
      investment: 0,
      results: 0,
      costPerResult: 0,
      performance: '',
      whatWorked: [],
      whatToImprove: [],
      decision: 'Manter',
    };
    onUpdateCampaigns([...campaigns, newCamp]);
  };

  const handleRemoveCampaign = (id: string) => {
    onUpdateCampaigns(campaigns.filter((c) => c.id !== id));
  };

  const handleUpdate = (id: string, updates: Partial<CampaignAnalysis>) => {
    const updated = campaigns.map((camp) => {
      if (camp.id === id) {
        const merged = { ...camp, ...updates };
        // Auto-compute costPerResult if investment or results updated
        if (updates.investment !== undefined || updates.results !== undefined) {
          if (merged.results > 0) {
            merged.costPerResult = Number((merged.investment / merged.results).toFixed(2));
          }
        }
        return merged;
      }
      return camp;
    });
    onUpdateCampaigns(updated);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-100">03. Análise das Campanhas</h3>
              <p className="text-xs text-slate-400">
                Avaliação detalhada de cada campanha ativa, aprendizados e tomadas de decisão estratégica.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddCampaign}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Campanha</span>
          </button>
        </div>

        {campaigns.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl">
            <Megaphone className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400">Nenhuma campanha cadastrada ainda.</p>
            <button
              type="button"
              onClick={handleAddCampaign}
              className="mt-3 text-xs text-emerald-400 hover:underline font-semibold"
            >
              + Clique aqui para adicionar a primeira campanha
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {campaigns.map((camp, index) => {
              const getDecisionBadge = (decision: DecisionType) => {
                switch (decision) {
                  case 'Escalar':
                    return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40';
                  case 'Otimizar':
                    return 'bg-amber-500/15 text-amber-400 border-amber-500/40';
                  case 'Manter':
                    return 'bg-blue-500/15 text-blue-400 border-blue-500/40';
                  case 'Reduzir':
                    return 'bg-orange-500/15 text-orange-400 border-orange-500/40';
                  case 'Pausar':
                    return 'bg-rose-500/15 text-rose-400 border-rose-500/40';
                }
              };

              return (
                <div
                  key={camp.id}
                  className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 relative group transition-all hover:border-slate-700"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="text-sm font-semibold text-slate-200">
                        {camp.name || `Campanha #${index + 1}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-slate-400 font-medium">Decisão:</label>
                        <select
                          value={camp.decision}
                          onChange={(e) => handleUpdate(camp.id, { decision: e.target.value as DecisionType })}
                          className={`bg-slate-900 border text-xs rounded-lg px-2.5 py-1.5 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 ${getDecisionBadge(
                            camp.decision
                          )}`}
                        >
                          {DECISIONS.map((d) => (
                            <option key={d} value={d} className="bg-slate-900 text-slate-200">
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveCampaign(camp.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                        title="Excluir campanha"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Primary fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-4">
                    <div className="lg:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                        Nome da Campanha
                      </label>
                      <input
                        type="text"
                        value={camp.name}
                        onChange={(e) => handleUpdate(camp.id, { name: e.target.value })}
                        placeholder="Ex: Conv_Aquisição_Coleção_CBO"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                        Objetivo
                      </label>
                      <input
                        type="text"
                        value={camp.objective}
                        onChange={(e) => handleUpdate(camp.id, { objective: e.target.value })}
                        placeholder="Ex: Compras, Leads"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                        Investimento (R$)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={camp.investment || ''}
                        onChange={(e) => handleUpdate(camp.id, { investment: parseFloat(e.target.value) || 0 })}
                        placeholder="0.00"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-100 font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                        Resultados & Custo (R$)
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        <input
                          type="number"
                          value={camp.results || ''}
                          onChange={(e) => handleUpdate(camp.id, { results: parseFloat(e.target.value) || 0 })}
                          placeholder="Qtd"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-100 font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          title="Quantidade de Resultados"
                        />
                        <input
                          type="number"
                          step="0.01"
                          value={camp.costPerResult || ''}
                          onChange={(e) => handleUpdate(camp.id, { costPerResult: parseFloat(e.target.value) || 0 })}
                          placeholder="Custo/Un"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-100 font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          title="Custo por resultado (R$)"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Performance Analysis Text */}
                  <div className="mb-4">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                      Desempenho Geral da Campanha
                    </label>
                    <textarea
                      rows={2}
                      value={camp.performance}
                      onChange={(e) => handleUpdate(camp.id, { performance: e.target.value })}
                      placeholder="Análise qualitativa: Como a campanha se comportou no funil, ROAS, estabilidade de entrega..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
                    />
                  </div>

                  {/* What Worked & What To Improve Lists */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5 text-emerald-400 text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>O que funcionou</span>
                      </div>
                      <TagListInput
                        items={camp.whatWorked}
                        onChange={(items) => handleUpdate(camp.id, { whatWorked: items })}
                        placeholder="Ex: Vídeo de depoimento, público aberto..."
                        badgeColorClass="bg-emerald-950/70 text-emerald-300 border border-emerald-800/60"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5 text-amber-400 text-xs font-semibold">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>O que precisa melhorar</span>
                      </div>
                      <TagListInput
                        items={camp.whatToImprove}
                        onChange={(items) => handleUpdate(camp.id, { whatToImprove: items })}
                        placeholder="Ex: Taxa de rejeição na LP, fadiga de criativo..."
                        badgeColorClass="bg-amber-950/70 text-amber-300 border border-amber-800/60"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
