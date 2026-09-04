import { MetricItem, ClientReport } from '../types';

export function formatCurrency(value: number): string {
  if (isNaN(value) || value === null || value === undefined) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number): string {
  if (isNaN(value) || value === null || value === undefined) return '0';
  return new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPercent(value: number, includeSign = false): string {
  if (isNaN(value) || value === null || value === undefined) return '0,00%';
  const formatted = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(value));
  
  if (includeSign) {
    if (value > 0) return `+${formatted}%`;
    if (value < 0) return `-${formatted}%`;
    return `0,00%`;
  }
  return `${formatted}%`;
}

export function calculateVariation(current: number, previous: number): {
  percent: number;
  formatted: string;
  isPositive: boolean;
  isNeutral: boolean;
  isFavorable: boolean; // Depends on whether metric is inverse
} {
  if (!previous || previous === 0) {
    return {
      percent: 0,
      formatted: 'N/A',
      isPositive: true,
      isNeutral: true,
      isFavorable: true,
    };
  }

  const diff = current - previous;
  const percent = (diff / previous) * 100;
  const formatted = formatPercent(percent, true);
  const isPositive = percent > 0;
  const isNeutral = Math.abs(percent) < 0.05;

  return {
    percent,
    formatted,
    isPositive,
    isNeutral,
    isFavorable: isPositive,
  };
}

export function formatDatePtBr(dateString: string): string {
  if (!dateString) return '';
  const parts = dateString.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateString;
}

export function generateExecutiveMarkdown(report: ClientReport): string {
  const { header, context, results, campaigns, creatives, tests, commercial, diagnosis, decisions, summary } = report;

  const startFormatted = formatDatePtBr(header.startDate);
  const endFormatted = formatDatePtBr(header.endDate);
  const analysisFormatted = formatDatePtBr(header.analysisDate);

  let md = `# 📊 RELATÓRIO MENSAL DE PERFORMANCE - TRÁFEGO PAGO\n\n`;
  md += `**Cliente:** ${header.clientName || 'N/A'}\n`;
  md += `**Período:** ${startFormatted} a ${endFormatted}\n`;
  md += `**Responsável:** ${header.manager || 'Italo'}\n`;
  md += `**Data da Análise:** ${analysisFormatted}\n\n`;
  md += `---\n\n`;

  // 01. CONTEXTO
  md += `### 01. CONTEXTO DO PERÍODO\n`;
  md += `* **Objetivo Principal:** ${context.objective || 'N/A'}\n`;
  md += `* **Orçamento Planejado:** ${formatCurrency(context.plannedBudget)}\n`;
  md += `* **Campanhas Ativas:**\n`;
  context.activeCampaigns.forEach((c) => {
    md += `  - ${c}\n`;
  });
  if (context.periodNotes) {
    md += `* **Observações:** ${context.periodNotes}\n`;
  }
  md += `\n---\n\n`;

  // 02. RESULTADOS
  md += `### 02. RESULTADOS (MÉTRICAS COMPARATIVAS)\n\n`;
  md += `| Métrica | Período Atual | Período Anterior | Variação |\n`;
  md += `| :--- | :--- | :--- | :--- |\n`;
  results.metrics.forEach((m) => {
    let currStr = '';
    let prevStr = '';
    if (m.format === 'currency') {
      currStr = formatCurrency(m.current);
      prevStr = formatCurrency(m.previous);
    } else if (m.format === 'percent') {
      currStr = `${m.current}%`;
      prevStr = `${m.previous}%`;
    } else {
      currStr = formatNumber(m.current);
      prevStr = formatNumber(m.previous);
    }
    const variation = calculateVariation(m.current, m.previous);
    const varIcon = variation.isNeutral ? '➖' : (m.inverse ? (variation.isPositive ? '🔻' : '🔺') : (variation.isPositive ? '🔺' : '🔻'));
    md += `| **${m.name}** | ${currStr} | ${prevStr} | ${varIcon} ${variation.formatted} |\n`;
  });
  if (results.generalObservation) {
    md += `\n> **Observação Geral:** ${results.generalObservation}\n`;
  }
  md += `\n---\n\n`;

  // 03. ANÁLISE DAS CAMPANHAS
  md += `### 03. ANÁLISE DAS CAMPANHAS\n\n`;
  campaigns.forEach((camp, idx) => {
    md += `#### ${idx + 1}. ${camp.name} [Decisão: ${camp.decision.toUpperCase()}]\n`;
    md += `* **Objetivo:** ${camp.objective}\n`;
    md += `* **Investimento:** ${formatCurrency(camp.investment)} | **Resultados:** ${formatNumber(camp.results)} | **Custo/Resultado:** ${formatCurrency(camp.costPerResult)}\n`;
    md += `* **Desempenho:** ${camp.performance}\n`;
    if (camp.whatWorked.length > 0) {
      md += `* **O que funcionou:**\n`;
      camp.whatWorked.forEach((w) => { md += `  - ✅ ${w}\n`; });
    }
    if (camp.whatToImprove.length > 0) {
      md += `* **O que precisa melhorar:**\n`;
      camp.whatToImprove.forEach((i) => { md += `  - ⚠️ ${i}\n`; });
    }
    md += `\n`;
  });
  md += `---\n\n`;

  // 04. ANÁLISE DE CRIATIVOS E ANÚNCIOS
  md += `### 04. ANÁLISE DE CRIATIVOS E ANÚNCIOS\n\n`;
  if (creatives.highlights.length > 0) {
    md += `**🌟 Destaques (Melhor Criativo):**\n`;
    creatives.highlights.forEach((h) => {
      md += `* **${h.nameOrId}**\n`;
      md += `  - **Oferta:** ${h.offer}\n`;
      md += `  - **Ângulo & Hook:** ${h.angle} | "${h.hook}"\n`;
      md += `  - **Formato:** ${h.format}\n`;
      md += `  - **Resultado:** ${h.result}\n`;
      md += `  - **Por que se destacou:** ${h.whyStoodOut}\n\n`;
    });
  }
  if (creatives.lowPerformers.length > 0) {
    md += `**⚠️ Criativos com Baixo Desempenho:**\n`;
    creatives.lowPerformers.forEach((l) => {
      md += `* **${l.nameOrId}** - *Decisão: ${l.decision}*\n`;
      md += `  - Problema: ${l.identifiedProblem}\n`;
    });
    md += `\n`;
  }
  md += `---\n\n`;

  // 05. TESTES E APRENDIZADOS
  md += `### 05. TESTES E APRENDIZADOS\n\n`;
  if (tests.tests.length > 0) {
    md += `| Teste | Hipótese | Resultado | Aprendizado | Próxima Ação |\n`;
    md += `| :--- | :--- | :--- | :--- | :--- |\n`;
    tests.tests.forEach((t) => {
      md += `| **${t.test}** | ${t.hypothesis} | ${t.result} | ${t.learning} | ${t.nextAction} |\n`;
    });
    md += `\n`;
  }
  if (tests.mainLearnings.length > 0) {
    md += `**💡 Principais Aprendizados:**\n`;
    tests.mainLearnings.forEach((l) => { md += `* ${l}\n`; });
    md += `\n`;
  }
  md += `---\n\n`;

  // 06. RESULTADO COMERCIAL
  if (commercial.enabled) {
    md += `### 06. RESULTADO COMERCIAL\n\n`;
    md += `* **Leads / Contatos:** ${formatNumber(commercial.leads)}\n`;
    md += `* **Leads Qualificados:** ${formatNumber(commercial.qualifiedLeads)}\n`;
    if (commercial.appointments > 0) {
      md += `* **Agendamentos:** ${formatNumber(commercial.appointments)}\n`;
    }
    md += `* **Vendas:** ${formatNumber(commercial.sales)}\n`;
    md += `* **Faturamento Total:** ${formatCurrency(commercial.revenue)}\n`;
    md += `* **Custo por Venda:** ${formatCurrency(commercial.costPerSale)}\n`;
    md += `* **ROAS Comercial:** ${commercial.roas ? commercial.roas.toFixed(2) + 'x' : 'N/A'}\n`;
    if (commercial.commercialAnalysis) {
      md += `\n> **Análise Comercial:** ${commercial.commercialAnalysis}\n`;
    }
    md += `\n---\n\n`;
  }

  // 07. DIAGNÓSTICO
  md += `### 07. DIAGNÓSTICO\n\n`;
  md += `* **Situação Atual:** ${diagnosis.currentSituation || 'N/A'}\n`;
  md += `* **Principal Problema:** ${diagnosis.mainProblem || 'N/A'}\n`;
  md += `* **Principal Oportunidade:** ${diagnosis.mainOpportunity || 'N/A'}\n`;
  md += `* **Conclusão:** ${diagnosis.conclusion || 'N/A'}\n\n`;
  md += `---\n\n`;

  // 08. DECISÕES E PRÓXIMOS TESTES
  md += `### 08. DECISÕES E PRÓXIMOS TESTES\n\n`;
  if (decisions.keep.length > 0) {
    md += `**🟢 Manter:**\n`;
    decisions.keep.forEach((k) => { md += `- ${k}\n`; });
  }
  if (decisions.optimize.length > 0) {
    md += `**🟡 Otimizar:**\n`;
    decisions.optimize.forEach((o) => { md += `- ${o}\n`; });
  }
  if (decisions.pause.length > 0) {
    md += `**🔴 Pausar:**\n`;
    decisions.pause.forEach((p) => { md += `- ${p}\n`; });
  }
  md += `\n**🧪 Testar:**\n`;
  if (decisions.testNewCreatives.length > 0) {
    md += `* *Novo Criativo:* ${decisions.testNewCreatives.join('; ')}\n`;
  }
  if (decisions.testNewOffers.length > 0) {
    md += `* *Nova Oferta:* ${decisions.testNewOffers.join('; ')}\n`;
  }
  if (decisions.testNewAngles.length > 0) {
    md += `* *Novo Ângulo:* ${decisions.testNewAngles.join('; ')}\n`;
  }
  if (decisions.testNewAudiences.length > 0) {
    md += `* *Novo Público:* ${decisions.testNewAudiences.join('; ')}\n`;
  }
  if (decisions.testOtherHypotheses.length > 0) {
    md += `* *Outras Hipóteses:* ${decisions.testOtherHypotheses.join('; ')}\n`;
  }
  md += `\n---\n\n`;

  // 09. RESUMO DA ANÁLISE
  md += `### 09. RESUMO DA ANÁLISE\n\n`;
  md += `* 🎯 **Resultado:** ${summary.resultSummary || 'N/A'}\n`;
  md += `* 🧠 **Principal Aprendizado:** ${summary.mainLearning || 'N/A'}\n`;
  md += `* 📌 **Principal Decisão:** ${summary.mainDecision || 'N/A'}\n`;
  md += `* 🚀 **Próximo Foco:** ${summary.nextFocus || 'N/A'}\n`;

  return md;
}
