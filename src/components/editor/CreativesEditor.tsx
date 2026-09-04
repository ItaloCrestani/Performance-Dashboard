import React from 'react';
import { CreativeSection, CreativeHighlight, LowCreative, CreativeDecisionType } from '../../types';
import { Sparkles, AlertOctagon, Plus, Trash2, Award } from 'lucide-react';

interface CreativesEditorProps {
  creatives: CreativeSection;
  onUpdateCreatives: (creatives: CreativeSection) => void;
}

const LOW_CREATIVE_DECISIONS: CreativeDecisionType[] = [
  'Pausar',
  'Alterar',
  'Criar nova variação',
  'Continuar testando',
];

export const CreativesEditor: React.FC<CreativesEditorProps> = ({
  creatives,
  onUpdateCreatives,
}) => {
  // Add highlight
  const handleAddHighlight = () => {
    const newHighlight: CreativeHighlight = {
      id: `cr_hi_${Date.now()}`,
      nameOrId: `AD_${creatives.highlights.length + 1}_Video_Hook`,
      offer: 'Desconto de 10% na 1ª compra',
      angle: 'Transformação visual e praticidade',
      hook: '"Você já tentou de tudo para..."',
      format: 'Reels / Vídeo 9:16',
      result: '120 vendas | CPA R$ 21,50',
      whyStoodOut: 'Autenticidade, início impactante e chamada para ação objetiva.',
    };
    onUpdateCreatives({
      ...creatives,
      highlights: [...creatives.highlights, newHighlight],
    });
  };

  const handleRemoveHighlight = (id: string) => {
    onUpdateCreatives({
      ...creatives,
      highlights: creatives.highlights.filter((h) => h.id !== id),
    });
  };

  const handleUpdateHighlight = (id: string, updates: Partial<CreativeHighlight>) => {
    const updated = creatives.highlights.map((h) => (h.id === id ? { ...h, ...updates } : h));
    onUpdateCreatives({ ...creatives, highlights: updated });
  };

  // Add low performer
  const handleAddLowPerformer = () => {
    const newLow: LowCreative = {
      id: `cr_low_${Date.now()}`,
      nameOrId: `AD_Baixo_${creatives.lowPerformers.length + 1}`,
      identifiedProblem: 'CTR muito baixo (< 0.7%) e alta taxa de abandono nos primeiros 2s.',
      decision: 'Pausar',
    };
    onUpdateCreatives({
      ...creatives,
      lowPerformers: [...creatives.lowPerformers, newLow],
    });
  };

  const handleRemoveLowPerformer = (id: string) => {
    onUpdateCreatives({
      ...creatives,
      lowPerformers: creatives.lowPerformers.filter((l) => l.id !== id),
    });
  };

  const handleUpdateLowPerformer = (id: string, updates: Partial<LowCreative>) => {
    const updated = creatives.lowPerformers.map((l) => (l.id === id ? { ...l, ...updates } : l));
    onUpdateCreatives({ ...creatives, lowPerformers: updated });
  };

  return (
    <div className="space-y-8">
      {/* 04. ANÁLISE DE CRIATIVOS E ANÚNCIOS */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-sm space-y-8">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-sm">
            04
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100">04. Análise de Criativos e Anúncios</h3>
            <p className="text-xs text-slate-400">
              Mapeamento dos criativos de maior tração (campeões) e das peças que exigem intervenção ou pausa.
            </p>
          </div>
        </div>

        {/* PARTE A: DESTAQUES (MELHORES CRIATIVOS) */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <Award className="w-4 h-4" />
              <span>Destaques (Melhores Criativos do Mês)</span>
            </div>
            <button
              type="button"
              onClick={handleAddHighlight}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Criativo Destaque</span>
            </button>
          </div>

          <div className="space-y-4">
            {creatives.highlights.map((item, idx) => (
              <div
                key={item.id}
                className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 relative hover:border-purple-500/40 transition-colors"
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                    Destaque #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(item.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors"
                    title="Remover destaque"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                      Nome ou ID do Anúncio
                    </label>
                    <input
                      type="text"
                      value={item.nameOrId}
                      onChange={(e) => handleUpdateHighlight(item.id, { nameOrId: e.target.value })}
                      placeholder="Ex: AD01_Video_UGC"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                      Oferta Anunciada
                    </label>
                    <input
                      type="text"
                      value={item.offer}
                      onChange={(e) => handleUpdateHighlight(item.id, { offer: e.target.value })}
                      placeholder="Ex: 10% OFF + Frete Grátis"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                      Formato
                    </label>
                    <input
                      type="text"
                      value={item.format}
                      onChange={(e) => handleUpdateHighlight(item.id, { format: e.target.value })}
                      placeholder="Ex: Vídeo 9:16 Reels, Carrossel"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                      Ângulo de Venda
                    </label>
                    <input
                      type="text"
                      value={item.angle}
                      onChange={(e) => handleUpdateHighlight(item.id, { angle: e.target.value })}
                      placeholder="Ex: Conforto, Economia de tempo, Autoestima"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                      Hook (Gancho dos Primeiros 3 Segundos)
                    </label>
                    <input
                      type="text"
                      value={item.hook}
                      onChange={(e) => handleUpdateHighlight(item.id, { hook: e.target.value })}
                      placeholder='Ex: "Pare de cometer esse erro ao escolher..."'
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                      Resultado Obtido
                    </label>
                    <input
                      type="text"
                      value={item.result}
                      onChange={(e) => handleUpdateHighlight(item.id, { result: e.target.value })}
                      placeholder="Ex: 184 compras | CPA R$ 19,40 | CTR 3.1%"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                      Por que se destacou?
                    </label>
                    <input
                      type="text"
                      value={item.whyStoodOut}
                      onChange={(e) => handleUpdateHighlight(item.id, { whyStoodOut: e.target.value })}
                      placeholder="Ex: Prova social forte, ritmo acelerado sem enrolação"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PARTE B: CRIATIVOS COM BAIXO DESEMPENHO */}
        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
              <AlertOctagon className="w-4 h-4" />
              <span>Criativos com Baixo Desempenho</span>
            </div>
            <button
              type="button"
              onClick={handleAddLowPerformer}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-rose-300 rounded-lg text-xs font-semibold border border-rose-500/30 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Criativo Problemático</span>
            </button>
          </div>

          <div className="space-y-3">
            {creatives.lowPerformers.map((item) => (
              <div
                key={item.id}
                className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 hover:border-rose-500/40 transition-colors"
              >
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">
                      Nome / ID
                    </label>
                    <input
                      type="text"
                      value={item.nameOrId}
                      onChange={(e) => handleUpdateLowPerformer(item.id, { nameOrId: e.target.value })}
                      placeholder="Ex: AD09_Banner_Estatico"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">
                      Problema Identificado
                    </label>
                    <input
                      type="text"
                      value={item.identifiedProblem}
                      onChange={(e) => handleUpdateLowPerformer(item.id, { identifiedProblem: e.target.value })}
                      placeholder="Ex: CTR abaixo de 0.6%, sem cliques no link..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">
                      Decisão
                    </label>
                    <select
                      value={item.decision}
                      onChange={(e) =>
                        handleUpdateLowPerformer(item.id, { decision: e.target.value as CreativeDecisionType })
                      }
                      className="bg-slate-900 border border-rose-500/30 text-rose-300 text-xs rounded-lg px-3 py-1.5 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500"
                    >
                      {LOW_CREATIVE_DECISIONS.map((d) => (
                        <option key={d} value={d} className="bg-slate-900 text-slate-200">
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveLowPerformer(item.id)}
                    className="text-slate-500 hover:text-rose-400 p-1.5 mt-4 md:mt-3 rounded transition-colors"
                    title="Remover"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
