import React from 'react';
import { DiagnosisSection } from '../../types';
import { Stethoscope, AlertTriangle, Lightbulb, CheckCircle2, Activity } from 'lucide-react';

interface DiagnosisEditorProps {
  diagnosis: DiagnosisSection;
  onUpdateDiagnosis: (diagnosis: DiagnosisSection) => void;
}

export const DiagnosisEditor: React.FC<DiagnosisEditorProps> = ({
  diagnosis,
  onUpdateDiagnosis,
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-sm">
          07
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-100">07. Diagnóstico Estratégico</h3>
          <p className="text-xs text-slate-400">
            A visão clínica do gestor de tráfego sobre o momento atual da conta, riscos e oportunidades.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Situação Atual */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-sky-400" />
            Situação Atual
          </label>
          <textarea
            rows={3}
            value={diagnosis.currentSituation}
            onChange={(e) => onUpdateDiagnosis({ ...diagnosis, currentSituation: e.target.value })}
            placeholder="Como a conta está operando hoje? Tração, estabilidade de pixel, maturidade de públicos..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 focus:ring-2 focus:ring-sky-500 focus:outline-none leading-relaxed"
          />
        </div>

        {/* Principal Problema */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5 text-rose-400">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            Principal Problema
          </label>
          <textarea
            rows={3}
            value={diagnosis.mainProblem}
            onChange={(e) => onUpdateDiagnosis({ ...diagnosis, mainProblem: e.target.value })}
            placeholder="Qual o maior gargalo técnico ou operacional? Fadiga de criativo, dependência de um anúncio só, LP lenta..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 focus:ring-2 focus:ring-rose-500 focus:outline-none leading-relaxed"
          />
        </div>

        {/* Principal Oportunidade */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5 text-amber-400">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            Principal Oportunidade
          </label>
          <textarea
            rows={3}
            value={diagnosis.mainOpportunity}
            onChange={(e) => onUpdateDiagnosis({ ...diagnosis, mainOpportunity: e.target.value })}
            placeholder="O que pode alavancar os resultados no próximo ciclo? Novos canais (Google Ads, TikTok), novos formatos, esteira de produtos..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none leading-relaxed"
          />
        </div>

        {/* Conclusão */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Conclusão
          </label>
          <textarea
            rows={3}
            value={diagnosis.conclusion}
            onChange={(e) => onUpdateDiagnosis({ ...diagnosis, conclusion: e.target.value })}
            placeholder="Veredito final do gestor: A conta está saudável? Devemos manter a verba ou acelerar escala?"
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};
