import React, { useState } from 'react';
import { ClientReport } from '../../types';
import { HeaderContextEditor } from './HeaderContextEditor';
import { ResultsEditor } from './ResultsEditor';
import { CampaignsEditor } from './CampaignsEditor';
import { CreativesEditor } from './CreativesEditor';
import { TestsEditor } from './TestsEditor';
import { CommercialEditor } from './CommercialEditor';
import { DiagnosisEditor } from './DiagnosisEditor';
import { DecisionsEditor } from './DecisionsEditor';
import { SummaryEditor } from './SummaryEditor';
import {
  FileText,
  BarChart3,
  Megaphone,
  Palette,
  FlaskConical,
  ShoppingBag,
  Stethoscope,
  Compass,
  Rocket,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle,
} from 'lucide-react';

interface EditorContainerProps {
  report: ClientReport;
  onUpdateReport: (report: ClientReport) => void;
  onPreview: () => void;
}

interface StepItem {
  id: number;
  numberStr: string;
  title: string;
  icon: React.ElementType;
}

const STEPS: StepItem[] = [
  { id: 0, numberStr: '01', title: 'Contexto', icon: FileText },
  { id: 1, numberStr: '02', title: 'Resultados', icon: BarChart3 },
  { id: 2, numberStr: '03', title: 'Campanhas', icon: Megaphone },
  { id: 3, numberStr: '04', title: 'Criativos', icon: Palette },
  { id: 4, numberStr: '05', title: 'Testes', icon: FlaskConical },
  { id: 5, numberStr: '06', title: 'Comercial', icon: ShoppingBag },
  { id: 6, numberStr: '07', title: 'Diagnóstico', icon: Stethoscope },
  { id: 7, numberStr: '08', title: 'Decisões', icon: Compass },
  { id: 8, numberStr: '09', title: 'Resumo', icon: Rocket },
];

export const EditorContainer: React.FC<EditorContainerProps> = ({
  report,
  onUpdateReport,
  onPreview,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < STEPS.length - 1) {
      setActiveStep(activeStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onPreview();
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Top Section Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 sm:p-3 shadow-lg overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  setActiveStep(step.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {step.numberStr}
                </span>
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress & Status Header */}
      <div className="flex items-center justify-between px-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-300">
            Passo {activeStep + 1} de {STEPS.length}: {STEPS[activeStep].title}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>Salvo automaticamente</span>
        </div>
      </div>

      {/* Dynamic Tab Body */}
      <div>
        {activeStep === 0 && (
          <HeaderContextEditor
            header={report.header}
            context={report.context}
            onUpdateHeader={(header) => onUpdateReport({ ...report, header, updatedAt: new Date().toISOString() })}
            onUpdateContext={(context) => onUpdateReport({ ...report, context, updatedAt: new Date().toISOString() })}
          />
        )}

        {activeStep === 1 && (
          <ResultsEditor
            results={report.results}
            onUpdateResults={(results) => onUpdateReport({ ...report, results, updatedAt: new Date().toISOString() })}
          />
        )}

        {activeStep === 2 && (
          <CampaignsEditor
            campaigns={report.campaigns}
            onUpdateCampaigns={(campaigns) =>
              onUpdateReport({ ...report, campaigns, updatedAt: new Date().toISOString() })
            }
          />
        )}

        {activeStep === 3 && (
          <CreativesEditor
            creatives={report.creatives}
            onUpdateCreatives={(creatives) =>
              onUpdateReport({ ...report, creatives, updatedAt: new Date().toISOString() })
            }
          />
        )}

        {activeStep === 4 && (
          <TestsEditor
            tests={report.tests}
            onUpdateTests={(tests) => onUpdateReport({ ...report, tests, updatedAt: new Date().toISOString() })}
          />
        )}

        {activeStep === 5 && (
          <CommercialEditor
            commercial={report.commercial}
            results={report.results}
            onUpdateCommercial={(commercial) =>
              onUpdateReport({ ...report, commercial, updatedAt: new Date().toISOString() })
            }
          />
        )}

        {activeStep === 6 && (
          <DiagnosisEditor
            diagnosis={report.diagnosis}
            onUpdateDiagnosis={(diagnosis) =>
              onUpdateReport({ ...report, diagnosis, updatedAt: new Date().toISOString() })
            }
          />
        )}

        {activeStep === 7 && (
          <DecisionsEditor
            decisions={report.decisions}
            onUpdateDecisions={(decisions) =>
              onUpdateReport({ ...report, decisions, updatedAt: new Date().toISOString() })
            }
          />
        )}

        {activeStep === 8 && (
          <SummaryEditor
            summary={report.summary}
            onUpdateSummary={(summary) => onUpdateReport({ ...report, summary, updatedAt: new Date().toISOString() })}
          />
        )}
      </div>

      {/* Bottom Step Navigation Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={handlePrev}
          disabled={activeStep === 0}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
            activeStep === 0
              ? 'opacity-40 cursor-not-allowed text-slate-500'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Seção Anterior</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPreview}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl text-xs font-semibold border border-cyan-500/20 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ver Relatório Completo</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all"
          >
            <span>{activeStep === STEPS.length - 1 ? 'Concluir e Visualizar' : 'Próxima Seção'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
