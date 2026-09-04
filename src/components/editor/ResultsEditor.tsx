import React from 'react';
import { ResultsData } from '../../types';
import { calculateVariation, formatCurrency, formatNumber } from '../../utils/formatters';
import { TrendingUp, TrendingDown, Minus, Calculator, Sparkles } from 'lucide-react';

interface ResultsEditorProps {
  results: ResultsData;
  onUpdateResults: (results: ResultsData) => void;
}

export const ResultsEditor: React.FC<ResultsEditorProps> = ({
  results,
  onUpdateResults,
}) => {
  const handleMetricChange = (id: string, field: 'current' | 'previous', val: string) => {
    const num = parseFloat(val) || 0;
    const updated = results.metrics.map((m) => {
      if (m.id === id) {
        return { ...m, [field]: num };
      }
      return m;
    });
    onUpdateResults({ ...results, metrics: updated });
  };

  // Helper to auto-compute derived metrics like CTR, CPC, and Cost Per Result if values are present
  const handleAutoCalculateRates = () => {
    const findMetric = (namePart: string) => results.metrics.find((m) => m.name.toLowerCase().includes(namePart));
    const inv = findMetric('investimento');
    const imp = findMetric('impressões') || findMetric('impressoes');
    const clk = findMetric('cliques');
    const res = findMetric('resultados');

    const updated = results.metrics.map((m) => {
      const copy = { ...m };
      // CTR = (Cliques / Impressões) * 100
      if (m.name.includes('CTR') && imp && clk) {
        if (imp.current > 0) copy.current = Number(((clk.current / imp.current) * 100).toFixed(2));
        if (imp.previous > 0) copy.previous = Number(((clk.previous / imp.previous) * 100).toFixed(2));
      }
      // CPC = Investimento / Cliques
      if (m.name.includes('CPC') && inv && clk) {
        if (clk.current > 0) copy.current = Number((inv.current / clk.current).toFixed(2));
        if (clk.previous > 0) copy.previous = Number((inv.previous / clk.previous).toFixed(2));
      }
      // Custo por Resultado = Investimento / Resultados
      if (m.name.includes('Custo por Resultado') && inv && res) {
        if (res.current > 0) copy.current = Number((inv.current / res.current).toFixed(2));
        if (res.previous > 0) copy.previous = Number((inv.previous / res.previous).toFixed(2));
      }
      return copy;
    });

    onUpdateResults({ ...results, metrics: updated });
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-sm">
            02
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100">02. Resultados (Principais Métricas)</h3>
            <p className="text-xs text-slate-400">
              Preencha os valores do Período Atual e Período Anterior. A variação % é calculada automaticamente.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAutoCalculateRates}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-xs font-medium border border-cyan-500/30 transition-colors shadow-sm"
          title="Calcula automaticamente CTR, CPC e Custo por Resultado com base em Cliques, Impressões e Investimento"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Auto-calcular Taxas (CTR / CPC / CPA)</span>
        </button>
      </div>

      {/* Table of metrics */}
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/80 text-slate-400 text-xs uppercase tracking-wider font-semibold border-b border-slate-800">
              <th className="py-3 px-4">Métrica</th>
              <th className="py-3 px-4 w-48">Período Atual</th>
              <th className="py-3 px-4 w-48">Período Anterior</th>
              <th className="py-3 px-4 w-40 text-center">Variação (%)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-sm">
            {results.metrics.map((metric) => {
              const variation = calculateVariation(metric.current, metric.previous);
              const isCostMetric = metric.inverse;
              // For cost metric (CPC, Cost per result): negative variation is good (favorable)!
              const isPositiveEffect = isCostMetric ? variation.percent < 0 : variation.percent > 0;
              const isNeutral = variation.isNeutral;

              return (
                <tr key={metric.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-200">{metric.name}</div>
                    <div className="text-[11px] text-slate-500">
                      {isCostMetric ? 'Métrica de custo (menor é melhor)' : 'Métrica de volume/taxa'}
                    </div>
                  </td>
                  <td className="py-2.5 px-4">
                    <div className="relative">
                      <input
                        type="number"
                        step={metric.format === 'number' ? '1' : '0.01'}
                        value={metric.current || ''}
                        onChange={(e) => handleMetricChange(metric.id, 'current', e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-100 font-mono focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                      />
                    </div>
                  </td>
                  <td className="py-2.5 px-4">
                    <div className="relative">
                      <input
                        type="number"
                        step={metric.format === 'number' ? '1' : '0.01'}
                        value={metric.previous || ''}
                        onChange={(e) => handleMetricChange(metric.id, 'previous', e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-100 font-mono focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {metric.previous > 0 ? (
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          isNeutral
                            ? 'bg-slate-800 text-slate-400'
                            : isPositiveEffect
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {isNeutral ? (
                          <Minus className="w-3.5 h-3.5" />
                        ) : variation.percent > 0 ? (
                          <TrendingUp className="w-3.5 h-3.5" />
                        ) : (
                          <TrendingDown className="w-3.5 h-3.5" />
                        )}
                        {variation.formatted}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">Sem histórico</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Observação Geral */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          Observação Geral dos Resultados
        </label>
        <textarea
          rows={3}
          value={results.generalObservation}
          onChange={(e) => onUpdateResults({ ...results, generalObservation: e.target.value })}
          placeholder="O que os números indicam de forma geral? Destaque altas de CTR, reduções de CPA ou volume conquistado..."
          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:outline-none leading-relaxed"
        />
      </div>
    </div>
  );
};
