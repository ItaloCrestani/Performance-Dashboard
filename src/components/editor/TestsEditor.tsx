import React from 'react';
import { TestsSection, TestItem } from '../../types';
import { TagListInput } from '../TagListInput';
import { FlaskConical, Plus, Trash2, Lightbulb } from 'lucide-react';

interface TestsEditorProps {
  tests: TestsSection;
  onUpdateTests: (tests: TestsSection) => void;
}

export const TestsEditor: React.FC<TestsEditorProps> = ({
  tests,
  onUpdateTests,
}) => {
  const handleAddTest = () => {
    const newTest: TestItem = {
      id: `test_${Date.now()}`,
      test: 'Novo Teste de Público / Criativo',
      hypothesis: 'Se utilizarmos a hipótese X, teremos o resultado Y',
      result: 'Em andamento',
      learning: 'Aguardando validação estatística',
      nextAction: 'Coletar 100 conversões',
    };
    onUpdateTests({
      ...tests,
      tests: [...tests.tests, newTest],
    });
  };

  const handleRemoveTest = (id: string) => {
    onUpdateTests({
      ...tests,
      tests: tests.tests.filter((t) => t.id !== id),
    });
  };

  const handleUpdateTest = (id: string, updates: Partial<TestItem>) => {
    const updated = tests.tests.map((t) => (t.id === id ? { ...t, ...updates } : t));
    onUpdateTests({ ...tests, tests: updated });
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-sm">
            05
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100">05. Testes e Aprendizados</h3>
            <p className="text-xs text-slate-400">
              Registro científico dos experimentos realizados, validações e lições aprendidas no mês.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddTest}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar Linha de Teste</span>
        </button>
      </div>

      {/* Tests Table */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
          <FlaskConical className="w-4 h-4 text-amber-400" />
          <span>Experimentos Executados</span>
        </div>

        <div className="space-y-3">
          {tests.tests.map((t, idx) => (
            <div
              key={t.id}
              className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors relative"
            >
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/80">
                <span className="text-xs font-bold text-amber-400">Experimento #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTest(t.id)}
                  className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                  title="Remover teste"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="lg:col-span-1">
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">
                    Teste
                  </label>
                  <input
                    type="text"
                    value={t.test}
                    onChange={(e) => handleUpdateTest(t.id, { test: e.target.value })}
                    placeholder="Ex: CBO vs ABO"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="lg:col-span-1">
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">
                    Hipótese
                  </label>
                  <input
                    type="text"
                    value={t.hypothesis}
                    onChange={(e) => handleUpdateTest(t.id, { hypothesis: e.target.value })}
                    placeholder="O que esperávamos?"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="lg:col-span-1">
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">
                    Resultado
                  </label>
                  <input
                    type="text"
                    value={t.result}
                    onChange={(e) => handleUpdateTest(t.id, { result: e.target.value })}
                    placeholder="O que os dados mostraram"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="lg:col-span-1">
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">
                    Aprendizado
                  </label>
                  <input
                    type="text"
                    value={t.learning}
                    onChange={(e) => handleUpdateTest(t.id, { learning: e.target.value })}
                    placeholder="Conclusão prática"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="lg:col-span-1">
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">
                    Próxima Ação
                  </label>
                  <input
                    type="text"
                    value={t.nextAction}
                    onChange={(e) => handleUpdateTest(t.id, { nextAction: e.target.value })}
                    placeholder="O que faremos agora"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Principais Aprendizados (Lista de Tópicos) */}
      <div className="pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-slate-300 uppercase tracking-wider">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>Principais Aprendizados do Período (Tópicos)</span>
        </div>
        <TagListInput
          items={tests.mainLearnings}
          onChange={(items) => onUpdateTests({ ...tests, mainLearnings: items })}
          placeholder="Ex: O público broad performou 20% melhor que segmentações demográficas..."
          badgeColorClass="bg-amber-950/70 text-amber-300 border border-amber-800/60"
        />
      </div>
    </div>
  );
};
