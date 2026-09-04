import React from 'react';
import { DecisionsSection } from '../../types';
import { TagListInput } from '../TagListInput';
import { CheckCircle2, Sliders, PauseCircle, TestTube, Sparkles } from 'lucide-react';

interface DecisionsEditorProps {
  decisions: DecisionsSection;
  onUpdateDecisions: (decisions: DecisionsSection) => void;
}

export const DecisionsEditor: React.FC<DecisionsEditorProps> = ({
  decisions,
  onUpdateDecisions,
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-sm space-y-8">
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-sm">
          08
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-100">08. Decisões e Próximos Testes</h3>
          <p className="text-xs text-slate-400">
            Plano de ação claro e direto para o cliente: o que continua rodando, o que será ajustado e o que será testado.
          </p>
        </div>
      </div>

      {/* PARTE A: AÇÕES DIRETAS (MANTER, OTIMIZAR, PAUSAR) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Manter */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>Manter (Lista)</span>
          </div>
          <TagListInput
            items={decisions.keep}
            onChange={(items) => onUpdateDecisions({ ...decisions, keep: items })}
            placeholder="Ex: Campanha de remarketing DPA..."
            badgeColorClass="bg-emerald-950/70 text-emerald-300 border border-emerald-800/60"
          />
        </div>

        {/* Otimizar */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Sliders className="w-4 h-4" />
            <span>Otimizar (Lista)</span>
          </div>
          <TagListInput
            items={decisions.optimize}
            onChange={(items) => onUpdateDecisions({ ...decisions, optimize: items })}
            placeholder="Ex: Ajustar orçamento diário em 15%..."
            badgeColorClass="bg-amber-950/70 text-amber-300 border border-amber-800/60"
          />
        </div>

        {/* Pausar */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3 text-rose-400 text-xs font-semibold uppercase tracking-wider">
            <PauseCircle className="w-4 h-4" />
            <span>Pausar (Lista)</span>
          </div>
          <TagListInput
            items={decisions.pause}
            onChange={(items) => onUpdateDecisions({ ...decisions, pause: items })}
            placeholder="Ex: Anúncio AD09 que não converteu..."
            badgeColorClass="bg-rose-950/70 text-rose-300 border border-rose-800/60"
          />
        </div>
      </div>

      {/* PARTE B: TESTAR (SUBDIVIDIDO CONFORME ESPECIFICAÇÃO) */}
      <div className="pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-slate-200 uppercase tracking-wider">
          <TestTube className="w-4 h-4 text-purple-400" />
          <span>Testar no Próximo Ciclo (Hipóteses de Validação)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <TagListInput
              label="Novo Criativo"
              items={decisions.testNewCreatives}
              onChange={(items) => onUpdateDecisions({ ...decisions, testNewCreatives: items })}
              placeholder="Ex: 3 novos vídeos UGC de depoimento..."
              badgeColorClass="bg-purple-950/70 text-purple-300 border border-purple-800/60"
            />
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <TagListInput
              label="Nova Oferta"
              items={decisions.testNewOffers}
              onChange={(items) => onUpdateDecisions({ ...decisions, testNewOffers: items })}
              placeholder="Ex: Leve 3 e Pague 2 em itens selecionados..."
              badgeColorClass="bg-purple-950/70 text-purple-300 border border-purple-800/60"
            />
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <TagListInput
              label="Novo Ângulo"
              items={decisions.testNewAngles}
              onChange={(items) => onUpdateDecisions({ ...decisions, testNewAngles: items })}
              placeholder="Ex: Custo por uso / durabilidade das peças..."
              badgeColorClass="bg-purple-950/70 text-purple-300 border border-purple-800/60"
            />
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <TagListInput
              label="Novo Público"
              items={decisions.testNewAudiences}
              onChange={(items) => onUpdateDecisions({ ...decisions, testNewAudiences: items })}
              placeholder="Ex: Lookalike 1% compradores de alto ticket..."
              badgeColorClass="bg-purple-950/70 text-purple-300 border border-purple-800/60"
            />
          </div>

          <div className="md:col-span-2 bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <TagListInput
              label="Outra Hipótese"
              items={decisions.testOtherHypotheses}
              onChange={(items) => onUpdateDecisions({ ...decisions, testOtherHypotheses: items })}
              placeholder="Ex: Testar horários específicos de veiculação noturna..."
              badgeColorClass="bg-indigo-950/70 text-indigo-300 border border-indigo-800/60"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
