import React, { useState } from 'react';
import { ClientReport, DecisionType } from '../../types';
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  calculateVariation,
  formatDatePtBr,
  generateExecutiveMarkdown,
} from '../../utils/formatters';
import {
  Printer,
  Copy,
  Check,
  Edit3,
  Calendar,
  User,
  Building,
  Target,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  AlertTriangle,
  Award,
  AlertOctagon,
  FlaskConical,
  Lightbulb,
  ShoppingBag,
  Activity,
  Sliders,
  PauseCircle,
  TestTube,
  Rocket,
  Download,
} from 'lucide-react';

interface ReportViewProps {
  report: ClientReport;
  onSwitchToEdit: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ report, onSwitchToEdit }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyMarkdown = () => {
    const md = generateExecutiveMarkdown(report);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `relatorio_${report.header.clientName || 'cliente'}_${report.header.startDate}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getDecisionBadge = (decision: DecisionType) => {
    switch (decision) {
      case 'Escalar':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Otimizar':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Manter':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'Reduzir':
        return 'bg-orange-500/15 text-orange-400 border-orange-500/30';
      case 'Pausar':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300';
    }
  };

  const { header, context, results, campaigns, creatives, tests, commercial, diagnosis, decisions, summary } = report;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Floating Action Bar (Hidden on Print) */}
      <div className="no-print bg-slate-900/95 backdrop-blur border border-slate-800 rounded-xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-3 sticky top-4 z-40">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-slate-100">Visualização Executiva do Relatório</span>
          <span className="text-slate-500 text-xs">| Pronto para apresentação, cópia ou PDF</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onSwitchToEdit}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editar Dados</span>
          </button>

          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado para Área de Transferência!' : 'Copiar Resumo (Markdown)'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Exportar PDF / Imprimir</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadJSON}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium border border-slate-700 transition-colors"
            title="Baixar arquivo JSON com todos os dados"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="sr-only sm:not-sr-only">JSON</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Container */}
      <div className="print-container bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-10">
        {/* CABEÇALHO DO RELATÓRIO */}
        <div className="border-b border-slate-800 pb-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2.5">
                Relatório Mensal de Análise de Performance
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                {header.clientName || 'Cliente Sem Nome'}
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Avaliação estratégica de campanhas de tráfego pago e inteligência de crescimento.
              </p>
            </div>

            {/* Header info badges */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs min-w-[240px]">
              <div className="flex items-center justify-between gap-3 text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  Responsável:
                </span>
                <span className="font-semibold text-slate-100">{header.manager || 'Italo'}</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  Período:
                </span>
                <span className="font-medium text-slate-200">
                  {formatDatePtBr(header.startDate)} a {formatDatePtBr(header.endDate)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  Data da Análise:
                </span>
                <span className="font-medium text-slate-200">{formatDatePtBr(header.analysisDate)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 01. CONTEXTO DO PERÍODO */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wider">
            <span className="w-6 h-6 rounded-md bg-indigo-500/10 flex items-center justify-center text-xs">01</span>
            <h2>Contexto do Período</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-indigo-400" />
                Objetivo Principal
              </span>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {context.objective || 'Objetivo não informado.'}
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                Orçamento Planejado
              </span>
              <div className="text-xl font-extrabold text-emerald-400 font-mono pt-1">
                {formatCurrency(context.plannedBudget)}
              </div>
            </div>
          </div>

          {context.activeCampaigns.length > 0 && (
            <div className="bg-slate-950/40 border border-slate-800/60 rounded-xl p-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Campanhas Ativas no Período ({context.activeCampaigns.length})
              </span>
              <div className="flex flex-wrap gap-2">
                {context.activeCampaigns.map((camp, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800/90 text-slate-300 border border-slate-700/80"
                  >
                    {camp}
                  </span>
                ))}
              </div>
            </div>
          )}

          {context.periodNotes && (
            <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-xl p-4 text-xs text-indigo-200/90 leading-relaxed">
              <span className="font-semibold text-indigo-300 uppercase tracking-wider block mb-1">
                Observações do Período:
              </span>
              {context.periodNotes}
            </div>
          )}
        </section>

        {/* 02. RESULTADOS (Principais Métricas) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider">
            <span className="w-6 h-6 rounded-md bg-cyan-500/10 flex items-center justify-center text-xs">02</span>
            <h2>Resultados (Principais Métricas Comparativas)</h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider font-semibold border-b border-slate-800">
                  <th className="py-3 px-4">Métrica</th>
                  <th className="py-3 px-4 text-right">Período Atual</th>
                  <th className="py-3 px-4 text-right">Período Anterior</th>
                  <th className="py-3 px-4 text-right">Variação (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {results.metrics.map((m) => {
                  const variation = calculateVariation(m.current, m.previous);
                  const isCostMetric = m.inverse;
                  const isPositiveEffect = isCostMetric ? variation.percent < 0 : variation.percent > 0;
                  const isNeutral = variation.isNeutral;

                  const formatVal = (val: number) => {
                    if (m.format === 'currency') return formatCurrency(val);
                    if (m.format === 'percent') return formatPercent(val);
                    return formatNumber(val);
                  };

                  return (
                    <tr key={m.id} className="hover:bg-slate-800/20 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-200">{m.name}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-slate-100">
                        {formatVal(m.current)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-slate-400">
                        {m.previous > 0 ? formatVal(m.previous) : '-'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {m.previous > 0 ? (
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
                              isNeutral
                                ? 'bg-slate-800 text-slate-400'
                                : isPositiveEffect
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {isNeutral ? (
                              <Minus className="w-3 h-3" />
                            ) : variation.percent > 0 ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {variation.formatted}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-500">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {results.generalObservation && (
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
                Observação Geral dos Números:
              </span>
              {results.generalObservation}
            </div>
          )}
        </section>

        {/* 03. ANÁLISE DAS CAMPANHAS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
            <span className="w-6 h-6 rounded-md bg-emerald-500/10 flex items-center justify-center text-xs">03</span>
            <h2>Análise das Campanhas</h2>
          </div>

          {campaigns.length === 0 ? (
            <p className="text-xs text-slate-500 italic">Nenhuma campanha cadastrada.</p>
          ) : (
            <div className="space-y-4">
              {campaigns.map((camp, idx) => (
                <div
                  key={camp.id}
                  className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-5 space-y-4 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <h3 className="text-sm font-bold text-slate-100">{camp.name}</h3>
                      <span className="text-xs text-slate-400">({camp.objective})</span>
                    </div>

                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${getDecisionBadge(
                        camp.decision
                      )}`}
                    >
                      Decisão: {camp.decision}
                    </span>
                  </div>

                  {/* Metrics Bar */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-900/60 rounded-lg p-3 text-center">
                    <div>
                      <span className="block text-[11px] text-slate-400 uppercase">Investimento</span>
                      <span className="text-xs sm:text-sm font-bold font-mono text-slate-200">
                        {formatCurrency(camp.investment)}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[11px] text-slate-400 uppercase">Resultados</span>
                      <span className="text-xs sm:text-sm font-bold font-mono text-emerald-400">
                        {formatNumber(camp.results)}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[11px] text-slate-400 uppercase">Custo / Resultado</span>
                      <span className="text-xs sm:text-sm font-bold font-mono text-cyan-400">
                        {formatCurrency(camp.costPerResult)}
                      </span>
                    </div>
                  </div>

                  {camp.performance && (
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      <strong className="text-slate-200">Desempenho: </strong>
                      {camp.performance}
                    </p>
                  )}

                  {/* What worked & to improve */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                    {camp.whatWorked.length > 0 && (
                      <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-lg p-3 space-y-1.5">
                        <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          O que funcionou:
                        </span>
                        <ul className="space-y-1 pl-4 list-disc text-slate-300">
                          {camp.whatWorked.map((w, i) => (
                            <li key={i}>{w}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {camp.whatToImprove.length > 0 && (
                      <div className="bg-amber-950/20 border border-amber-500/20 rounded-lg p-3 space-y-1.5">
                        <span className="font-semibold text-amber-400 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          O que precisa melhorar:
                        </span>
                        <ul className="space-y-1 pl-4 list-disc text-slate-300">
                          {camp.whatToImprove.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 04. ANÁLISE DE CRIATIVOS E ANÚNCIOS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm uppercase tracking-wider">
            <span className="w-6 h-6 rounded-md bg-purple-500/10 flex items-center justify-center text-xs">04</span>
            <h2>Análise de Criativos e Anúncios</h2>
          </div>

          {/* Highlights */}
          {creatives.highlights.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                Destaques (Melhor Criativo)
              </span>
              <div className="grid grid-cols-1 gap-3">
                {creatives.highlights.map((h) => (
                  <div
                    key={h.id}
                    className="bg-slate-950/70 border border-purple-500/30 rounded-xl p-4 text-xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800 pb-2">
                      <span className="font-bold text-purple-300 text-sm">{h.nameOrId}</span>
                      <span className="text-slate-400 font-medium">Formato: {h.format}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <strong className="text-slate-400 block uppercase text-[10px]">Oferta</strong>
                        <span className="text-slate-200">{h.offer}</span>
                      </div>
                      <div>
                        <strong className="text-slate-400 block uppercase text-[10px]">Ângulo</strong>
                        <span className="text-slate-200">{h.angle}</span>
                      </div>
                      <div>
                        <strong className="text-slate-400 block uppercase text-[10px]">Resultado</strong>
                        <span className="text-emerald-400 font-semibold">{h.result}</span>
                      </div>
                    </div>

                    <div className="bg-slate-900/80 rounded-lg p-2.5 text-slate-300 space-y-1">
                      <p>
                        <strong className="text-amber-400">Hook: </strong>
                        <em>{h.hook}</em>
                      </p>
                      <p>
                        <strong className="text-purple-400">Por que se destacou: </strong>
                        {h.whyStoodOut}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Low Performers */}
          {creatives.lowPerformers.length > 0 && (
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4" />
                Criativos com Baixo Desempenho
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-semibold">
                    <tr className="border-b border-slate-800">
                      <th className="py-2.5 px-3">Nome / ID</th>
                      <th className="py-2.5 px-3">Problema Identificado</th>
                      <th className="py-2.5 px-3 w-40 text-center">Decisão</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {creatives.lowPerformers.map((l) => (
                      <tr key={l.id} className="hover:bg-slate-800/20">
                        <td className="py-2.5 px-3 font-semibold text-slate-200">{l.nameOrId}</td>
                        <td className="py-2.5 px-3 text-slate-300">{l.identifiedProblem}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                            {l.decision}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* 05. TESTES E APRENDIZADOS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
            <span className="w-6 h-6 rounded-md bg-amber-500/10 flex items-center justify-center text-xs">05</span>
            <h2>Testes e Aprendizados</h2>
          </div>

          {tests.tests.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-semibold">
                  <tr className="border-b border-slate-800">
                    <th className="py-2.5 px-3">Teste</th>
                    <th className="py-2.5 px-3">Hipótese</th>
                    <th className="py-2.5 px-3">Resultado</th>
                    <th className="py-2.5 px-3">Aprendizado</th>
                    <th className="py-2.5 px-3">Próxima Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {tests.tests.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-800/20">
                      <td className="py-2.5 px-3 font-semibold text-slate-100">{t.test}</td>
                      <td className="py-2.5 px-3 text-slate-300">{t.hypothesis}</td>
                      <td className="py-2.5 px-3 text-slate-300">{t.result}</td>
                      <td className="py-2.5 px-3 text-amber-300/90 font-medium">{t.learning}</td>
                      <td className="py-2.5 px-3 text-emerald-400 font-semibold">{t.nextAction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tests.mainLearnings.length > 0 && (
            <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-4 space-y-2 text-xs">
              <span className="font-semibold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Lightbulb className="w-4 h-4" />
                Principais Aprendizados do Período
              </span>
              <ul className="space-y-1.5 pl-4 list-disc text-slate-200">
                {tests.mainLearnings.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* 06. RESULTADO COMERCIAL */}
        {commercial.enabled && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-sm uppercase tracking-wider">
              <span className="w-6 h-6 rounded-md bg-teal-500/10 flex items-center justify-center text-xs">06</span>
              <h2>Resultado Comercial</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 text-center">
                <span className="block text-[11px] text-slate-400 uppercase font-semibold">Leads Totais</span>
                <span className="text-lg font-bold font-mono text-slate-100">{formatNumber(commercial.leads)}</span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 text-center">
                <span className="block text-[11px] text-slate-400 uppercase font-semibold">Leads Qualificados</span>
                <span className="text-lg font-bold font-mono text-teal-400">
                  {formatNumber(commercial.qualifiedLeads)}
                </span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 text-center">
                <span className="block text-[11px] text-slate-400 uppercase font-semibold">Vendas Fechadas</span>
                <span className="text-lg font-bold font-mono text-emerald-400">{formatNumber(commercial.sales)}</span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 text-center">
                <span className="block text-[11px] text-slate-400 uppercase font-semibold">Faturamento Total</span>
                <span className="text-lg font-bold font-mono text-emerald-400">
                  {formatCurrency(commercial.revenue)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Custo por Venda (CAC estimado):</span>
                <span className="text-sm font-bold font-mono text-cyan-400">
                  {formatCurrency(commercial.costPerSale)}
                </span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">ROAS Comercial Direto:</span>
                <span className="text-sm font-bold font-mono text-emerald-400">
                  {commercial.roas ? `${commercial.roas.toFixed(2)}x` : 'N/A'}
                </span>
              </div>
            </div>

            {commercial.commercialAnalysis && (
              <div className="bg-teal-950/20 border border-teal-500/20 rounded-xl p-4 text-xs text-slate-200 leading-relaxed">
                <span className="font-semibold text-teal-400 uppercase tracking-wider block mb-1">
                  Análise do Time Comercial:
                </span>
                {commercial.commercialAnalysis}
              </div>
            )}
          </section>
        )}

        {/* 07. DIAGNÓSTICO */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm uppercase tracking-wider">
            <span className="w-6 h-6 rounded-md bg-sky-500/10 flex items-center justify-center text-xs">07</span>
            <h2>Diagnóstico da Conta</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-1.5">
              <span className="font-semibold text-sky-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5" />
                Situação Atual
              </span>
              <p className="text-slate-300 leading-relaxed">{diagnosis.currentSituation || 'Não informado.'}</p>
            </div>

            <div className="bg-slate-950/70 border border-rose-500/20 rounded-xl p-4 space-y-1.5">
              <span className="font-semibold text-rose-400 flex items-center gap-1.5 uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5" />
                Principal Problema
              </span>
              <p className="text-slate-300 leading-relaxed">{diagnosis.mainProblem || 'Não informado.'}</p>
            </div>

            <div className="bg-slate-950/70 border border-amber-500/20 rounded-xl p-4 space-y-1.5">
              <span className="font-semibold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Lightbulb className="w-3.5 h-3.5" />
                Principal Oportunidade
              </span>
              <p className="text-slate-300 leading-relaxed">{diagnosis.mainOpportunity || 'Não informado.'}</p>
            </div>

            <div className="bg-slate-950/70 border border-emerald-500/20 rounded-xl p-4 space-y-1.5">
              <span className="font-semibold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Conclusão do Diagnóstico
              </span>
              <p className="text-slate-300 leading-relaxed">{diagnosis.conclusion || 'Não informado.'}</p>
            </div>
          </div>
        </section>

        {/* 08. DECISÕES E PRÓXIMOS TESTES */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wider">
            <span className="w-6 h-6 rounded-md bg-indigo-500/10 flex items-center justify-center text-xs">08</span>
            <h2>Decisões e Próximos Testes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Manter */}
            <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4 space-y-2">
              <span className="font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Manter
              </span>
              <ul className="space-y-1 pl-4 list-disc text-slate-200">
                {decisions.keep.length > 0 ? (
                  decisions.keep.map((k, i) => <li key={i}>{k}</li>)
                ) : (
                  <li className="text-slate-500 italic">Nenhum item</li>
                )}
              </ul>
            </div>

            {/* Otimizar */}
            <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-4 space-y-2">
              <span className="font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                Otimizar
              </span>
              <ul className="space-y-1 pl-4 list-disc text-slate-200">
                {decisions.optimize.length > 0 ? (
                  decisions.optimize.map((o, i) => <li key={i}>{o}</li>)
                ) : (
                  <li className="text-slate-500 italic">Nenhum item</li>
                )}
              </ul>
            </div>

            {/* Pausar */}
            <div className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-4 space-y-2">
              <span className="font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <PauseCircle className="w-3.5 h-3.5" />
                Pausar
              </span>
              <ul className="space-y-1 pl-4 list-disc text-slate-200">
                {decisions.pause.length > 0 ? (
                  decisions.pause.map((p, i) => <li key={i}>{p}</li>)
                ) : (
                  <li className="text-slate-500 italic">Nenhum item</li>
                )}
              </ul>
            </div>
          </div>

          {/* Testes Planejados */}
          <div className="bg-slate-950/70 border border-purple-500/20 rounded-xl p-4 text-xs space-y-3">
            <span className="font-semibold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <TestTube className="w-3.5 h-3.5" />
              Testes Planejados para o Próximo Ciclo
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {decisions.testNewCreatives.length > 0 && (
                <div>
                  <strong className="text-slate-400 block uppercase text-[10px]">Novo Criativo:</strong>
                  <ul className="list-disc pl-4 text-slate-200 space-y-0.5 mt-0.5">
                    {decisions.testNewCreatives.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {decisions.testNewOffers.length > 0 && (
                <div>
                  <strong className="text-slate-400 block uppercase text-[10px]">Nova Oferta:</strong>
                  <ul className="list-disc pl-4 text-slate-200 space-y-0.5 mt-0.5">
                    {decisions.testNewOffers.map((o, i) => (
                      <li key={i}>{o}</li>
                    ))}
                  </ul>
                </div>
              )}

              {decisions.testNewAngles.length > 0 && (
                <div>
                  <strong className="text-slate-400 block uppercase text-[10px]">Novo Ângulo:</strong>
                  <ul className="list-disc pl-4 text-slate-200 space-y-0.5 mt-0.5">
                    {decisions.testNewAngles.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}

              {decisions.testNewAudiences.length > 0 && (
                <div>
                  <strong className="text-slate-400 block uppercase text-[10px]">Novo Público:</strong>
                  <ul className="list-disc pl-4 text-slate-200 space-y-0.5 mt-0.5">
                    {decisions.testNewAudiences.map((aud, i) => (
                      <li key={i}>{aud}</li>
                    ))}
                  </ul>
                </div>
              )}

              {decisions.testOtherHypotheses.length > 0 && (
                <div className="sm:col-span-2">
                  <strong className="text-slate-400 block uppercase text-[10px]">Outras Hipóteses:</strong>
                  <ul className="list-disc pl-4 text-slate-200 space-y-0.5 mt-0.5">
                    {decisions.testOtherHypotheses.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 09. RESUMO DA ANÁLISE */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-pink-400 font-bold text-sm uppercase tracking-wider">
            <span className="w-6 h-6 rounded-md bg-pink-500/10 flex items-center justify-center text-xs">09</span>
            <h2>Resumo Executivo da Análise</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950/80 border border-cyan-500/30 rounded-xl p-4 space-y-1.5 shadow-sm">
              <span className="font-bold text-cyan-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Target className="w-4 h-4" />
                Resultado (Resumo)
              </span>
              <p className="text-slate-200 leading-relaxed">{summary.resultSummary || 'Nenhum resumo informado.'}</p>
            </div>

            <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-4 space-y-1.5 shadow-sm">
              <span className="font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Award className="w-4 h-4" />
                Principal Aprendizado (Resumo)
              </span>
              <p className="text-slate-200 leading-relaxed">{summary.mainLearning || 'Nenhum resumo informado.'}</p>
            </div>

            <div className="bg-slate-950/80 border border-indigo-500/30 rounded-xl p-4 space-y-1.5 shadow-sm">
              <span className="font-bold text-indigo-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Sliders className="w-4 h-4" />
                Principal Decisão (Resumo)
              </span>
              <p className="text-slate-200 leading-relaxed">{summary.mainDecision || 'Nenhum resumo informado.'}</p>
            </div>

            <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-4 space-y-1.5 shadow-sm">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Rocket className="w-4 h-4" />
                Próximo Foco (Resumo)
              </span>
              <p className="text-slate-200 leading-relaxed">{summary.nextFocus || 'Nenhum resumo informado.'}</p>
            </div>
          </div>
        </section>

        {/* Footer info for print & presentation */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div>
            Relatório gerado por <strong className="text-slate-300">{header.manager || 'Italo'}</strong> em{' '}
            {formatDatePtBr(header.analysisDate)}
          </div>
          <div>Dashboard de Tráfego Pago &bull; Análise Mensal de Performance</div>
        </div>
      </div>
    </div>
  );
};
