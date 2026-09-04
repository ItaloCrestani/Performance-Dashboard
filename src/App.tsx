import React, { useState, useEffect } from 'react';
import { ClientReport } from './types';
import { initialReport } from './data/defaultData';
import { HeaderNav } from './components/HeaderNav';
import { EditorContainer } from './components/editor/EditorContainer';
import { ReportView } from './components/report/ReportView';

const STORAGE_KEY = 'traffic_hub_reports_v1';
const ACTIVE_REPORT_ID_KEY = 'traffic_hub_active_id_v1';

export default function App() {
  const [reports, setReports] = useState<ClientReport[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading reports from storage', e);
    }
    return [initialReport];
  });

  const [activeReportId, setActiveReportId] = useState<string>(() => {
    try {
      const savedId = localStorage.getItem(ACTIVE_REPORT_ID_KEY);
      if (savedId) return savedId;
    } catch {
      // ignore
    }
    return initialReport.id;
  });

  const [activeView, setActiveView] = useState<'editor' | 'preview'>('editor');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    } catch (e) {
      console.error('Error saving reports to localStorage', e);
    }
  }, [reports]);

  useEffect(() => {
    try {
      localStorage.setItem(ACTIVE_REPORT_ID_KEY, activeReportId);
    } catch {
      // ignore
    }
  }, [activeReportId]);

  // Current report lookup
  const currentReport = reports.find((r) => r.id === activeReportId) || reports[0] || initialReport;

  const handleUpdateCurrentReport = (updated: ClientReport) => {
    setReports((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  };

  const handleSelectReport = (id: string) => {
    setActiveReportId(id);
  };

  const handleCreateNewReport = (clientName: string, manager: string) => {
    const today = new Date().toISOString().split('T')[0];
    const newId = `rep_${Date.now()}`;
    const newReport: ClientReport = {
      id: newId,
      title: `${clientName} - ${today}`,
      updatedAt: new Date().toISOString(),
      header: {
        clientName,
        startDate: today,
        endDate: today,
        manager: manager || 'Italo',
        analysisDate: today,
      },
      context: {
        objective: '',
        activeCampaigns: [],
        plannedBudget: 0,
        periodNotes: '',
      },
      results: {
        metrics: [
          { id: 'm1', name: 'Investimento (R$)', current: 0, previous: 0, format: 'currency' },
          { id: 'm2', name: 'Alcance', current: 0, previous: 0, format: 'number' },
          { id: 'm3', name: 'Impressões', current: 0, previous: 0, format: 'number' },
          { id: 'm4', name: 'Cliques no Link', current: 0, previous: 0, format: 'number' },
          { id: 'm5', name: 'CTR (%)', current: 0, previous: 0, format: 'percent' },
          { id: 'm6', name: 'CPC Médio (R$)', current: 0, previous: 0, format: 'currency', inverse: true },
          { id: 'm7', name: 'Resultados', current: 0, previous: 0, format: 'number' },
          { id: 'm8', name: 'Custo por Resultado (R$)', current: 0, previous: 0, format: 'currency', inverse: true },
        ],
        generalObservation: '',
      },
      campaigns: [],
      creatives: {
        highlights: [],
        lowPerformers: [],
      },
      tests: {
        tests: [],
        mainLearnings: [],
      },
      commercial: {
        enabled: true,
        leads: 0,
        qualifiedLeads: 0,
        appointments: 0,
        sales: 0,
        revenue: 0,
        costPerSale: 0,
        roas: 0,
        commercialAnalysis: '',
      },
      diagnosis: {
        currentSituation: '',
        mainProblem: '',
        mainOpportunity: '',
        conclusion: '',
      },
      decisions: {
        keep: [],
        optimize: [],
        pause: [],
        testNewCreatives: [],
        testNewOffers: [],
        testNewAngles: [],
        testNewAudiences: [],
        testOtherHypotheses: [],
      },
      summary: {
        resultSummary: '',
        mainLearning: '',
        mainDecision: '',
        nextFocus: '',
      },
    };

    setReports((prev) => [newReport, ...prev]);
    setActiveReportId(newId);
    setActiveView('editor');
  };

  const handleDuplicateReport = () => {
    const newId = `rep_${Date.now()}`;
    const duplicated: ClientReport = {
      ...JSON.parse(JSON.stringify(currentReport)),
      id: newId,
      title: `${currentReport.header.clientName} (Cópia)`,
      updatedAt: new Date().toISOString(),
    };
    setReports((prev) => [duplicated, ...prev]);
    setActiveReportId(newId);
  };

  const handleDeleteReport = (id: string) => {
    const filtered = reports.filter((r) => r.id !== id);
    if (filtered.length > 0) {
      setReports(filtered);
      if (activeReportId === id) {
        setActiveReportId(filtered[0].id);
      }
    } else {
      setReports([initialReport]);
      setActiveReportId(initialReport.id);
    }
  };

  const handleResetToDefault = () => {
    const resetList = [initialReport];
    setReports(resetList);
    setActiveReportId(initialReport.id);
  };

  const handleImportJSON = (imported: ClientReport) => {
    const newId = `rep_${Date.now()}`;
    const sanitized: ClientReport = {
      ...imported,
      id: newId,
      updatedAt: new Date().toISOString(),
    };
    setReports((prev) => [sanitized, ...prev]);
    setActiveReportId(newId);
    setActiveView('editor');
  };

  const reportsSummaryList = reports.map((r) => ({
    id: r.id,
    clientName: r.header.clientName || 'Cliente Sem Nome',
    period: `${r.header.startDate || ''} ~ ${r.header.endDate || ''}`,
  }));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <HeaderNav
        currentReport={currentReport}
        reportsList={reportsSummaryList}
        onSelectReport={handleSelectReport}
        onCreateNewReport={handleCreateNewReport}
        onDuplicateReport={handleDuplicateReport}
        onDeleteReport={handleDeleteReport}
        onResetToDefault={handleResetToDefault}
        onImportJSON={handleImportJSON}
        activeView={activeView}
        onToggleView={setActiveView}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeView === 'editor' ? (
          <EditorContainer
            report={currentReport}
            onUpdateReport={handleUpdateCurrentReport}
            onPreview={() => setActiveView('preview')}
          />
        ) : (
          <ReportView
            report={currentReport}
            onSwitchToEdit={() => setActiveView('editor')}
          />
        )}
      </main>
    </div>
  );
}
