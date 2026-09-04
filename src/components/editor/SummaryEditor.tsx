import React from 'react';
import { SummarySection } from '../../types';
import { Target, Award, Compass, Rocket } from 'lucide-react';

interface SummaryEditorProps {
  summary: SummarySection;
  onUpdateSummary: (summary: SummarySection) => void;
}

export const SummaryEditor: React.FC<SummaryEditorProps> = ({
  summary,
  onUpdateSummary,
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center font-bold text-sm">
          09
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-100">09. Resumo da Análise</h3>
          <p className="text-xs text-slate-400">
            Resumo executivo em 4 pontos-chave para alinhamento rápido com o cliente ou diretoria.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Resultado */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2 text-cyan-400">
            <Target className="w-4 h-4" />
            Resultado (Resumo)
          </label>
          <textarea
            rows={3}
            value={summary.resultSummary}
            onChange={(e) => onUpdateSummary({ ...summary, resultSummary: e.target.value })}
            placeholder="Ex: Recorde de faturamento com R$ 104k e ROAS 9.1x..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:outline-none leading-relaxed"
          />
        </div>

        {/* Principal Aprendizado */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2 text-amber-400">
            <Award className="w-4 h-4" />
            Principal Aprendizado (Resumo)
          </label>
          <textarea
            rows={3}
            value={summary.mainLearning}
            onChange={(e) => onUpdateSummary({ ...summary, mainLearning: e.target.value })}
            placeholder="Ex: Vídeos UGC superaram carrosséis em mais de 2x na conversão..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none leading-relaxed"
          />
        </div>

        {/* Principal Decisão */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2 text-indigo-400">
            <Compass className="w-4 h-4" />
            Principal Decisão (Resumo)
          </label>
          <textarea
            rows={3}
            value={summary.mainDecision}
            onChange={(e) => onUpdateSummary({ ...summary, mainDecision: e.target.value })}
            placeholder="Ex: Aumentar o investimento em 15% na campanha Advantage+..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none leading-relaxed"
          />
        </div>

        {/* Próximo Foco */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2 text-emerald-400">
            <Rocket className="w-4 h-4" />
            Próximo Foco (Resumo)
          </label>
          <textarea
            rows={3}
            value={summary.nextFocus}
            onChange={(e) => onUpdateSummary({ ...summary, nextFocus: e.target.value })}
            placeholder="Ex: Produção de 5 novos criativos de unboxing e expansão para Google Ads..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};
