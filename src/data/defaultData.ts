import { ClientReport } from '../types';

export const initialReport: ClientReport = {
  id: 'rep_italo_01',
  title: 'E-commerce Moda & Estilo - Outubro 2026',
  updatedAt: new Date().toISOString(),
  header: {
    clientName: 'Loja Aura Concept',
    startDate: '2026-09-01',
    endDate: '2026-09-30',
    manager: 'Italo',
    analysisDate: new Date().toISOString().split('T')[0],
  },
  context: {
    objective: 'Escala de vendas para a Coleção Primavera/Verão e reativação de clientes inativos através de remarketing segmentado.',
    activeCampaigns: [
      'Conv_Aquisição_ColeçãoPrimavera_CBO',
      'Conv_Remarketing_CatalogoDinamico_ABO',
      'Engajamento_VideoViews_ReelsTop'
    ],
    plannedBudget: 12000,
    periodNotes: 'Lançamento antecipado da coleção com desconto de primeira compra de 10%. Houve instabilidade de entrega na segunda semana devido à Black Friday antecipada dos concorrentes, contornada com novos criativos em formato carrossel UGC.',
  },
  results: {
    metrics: [
      { id: 'm1', name: 'Investimento (R$)', current: 11450.80, previous: 9800.00, format: 'currency' },
      { id: 'm2', name: 'Alcance', current: 284500, previous: 241000, format: 'number' },
      { id: 'm3', name: 'Impressões', current: 612000, previous: 504000, format: 'number' },
      { id: 'm4', name: 'Cliques no Link', current: 14890, previous: 11200, format: 'number' },
      { id: 'm5', name: 'CTR (%)', current: 2.43, previous: 2.22, format: 'percent' },
      { id: 'm6', name: 'CPC Médio (R$)', current: 0.77, previous: 0.88, format: 'currency', inverse: true },
      { id: 'm7', name: 'Resultados (Compras)', current: 486, previous: 362, format: 'number' },
      { id: 'm8', name: 'Custo por Resultado (R$)', current: 23.56, previous: 27.07, format: 'currency', inverse: true },
    ],
    generalObservation: 'Excelente evolução em relação ao mês anterior: aumento de 34,2% no volume total de compras e redução de 12,9% no CPA. O CTR subiu graças aos novos criativos com prova social real de clientes.',
  },
  campaigns: [
    {
      id: 'camp_1',
      name: 'Conv_Aquisição_ColeçãoPrimavera_CBO',
      objective: 'Compras no Site (Top e Middle Funnel)',
      investment: 7850.40,
      results: 312,
      costPerResult: 25.16,
      performance: 'Campanha âncora do mês. Respondeu por 64% do volume de aquisição de novos clientes com ROAS sustentável acima de 4.2x.',
      whatWorked: [
        'Conjunto aberto com Advantage+ Shopping Campaign',
        'Vídeos de provador estilo UGC gerando alto engajamento',
        'Copy direta focando no frete grátis acima de R$ 199'
      ],
      whatToImprove: [
        'Público de interesses em concorrentes teve saturação na semana 3',
        'Carrossel estático teve CTR 40% menor que os vídeos'
      ],
      decision: 'Escalar',
    },
    {
      id: 'camp_2',
      name: 'Conv_Remarketing_CatalogoDinamico_ABO',
      objective: 'Recuperação de Carrinho e Visualização de Produtos',
      investment: 2450.40,
      results: 142,
      costPerResult: 17.25,
      performance: 'Alta eficiência de conversão. Custou 31% menos por compra que a campanha de topo de funil.',
      whatWorked: [
        'Janela de 3 a 7 dias de adição ao carrinho',
        'Criativo dinâmico de catálogo com badge promocional de 10% OFF'
      ],
      whatToImprove: [
        'Frequência média atingiu 4.8 na última semana, risco de fadiga'
      ],
      decision: 'Otimizar',
    },
    {
      id: 'camp_3',
      name: 'Engajamento_VideoViews_ReelsTop',
      objective: 'Aquecimento de Base e Reconhecimento',
      investment: 1150.00,
      results: 32,
      costPerResult: 35.93,
      performance: 'Campanha de apoio para alimentar públicos de retenção de vídeo 75% e 95%.',
      whatWorked: [
        'Vídeo dos bastidores da produção atingiu taxa de retenção de 38%'
      ],
      whatToImprove: [
        'Custo por compra direta elevado (embora não seja o objetivo primário)'
      ],
      decision: 'Manter',
    }
  ],
  creatives: {
    highlights: [
      {
        id: 'cr_best_1',
        nameOrId: 'AD04_UGC_Provador_VestidoFloral_01',
        offer: 'Coleção Primavera com 10% OFF + Frete Grátis acima de R$ 199',
        angle: 'Transformação visual e conforto térmico para o dia a dia',
        hook: '"O vestido que você não vai querer tirar nesse verão..."',
        format: 'Vídeo Vertical 9:16 (Reels/TikTok)',
        result: '184 compras diretas | CPA R$ 19,40 | CTR 3.1%',
        whyStoodOut: 'Linguagem autêntica, luz natural sem parecer propaganda comercial forçada e chamada clara nos primeiros 3 segundos.'
      }
    ],
    lowPerformers: [
      {
        id: 'cr_low_1',
        nameOrId: 'AD09_Banner_Estatico_CatalogoFundoBranco',
        identifiedProblem: 'CTR abaixo de 0.8% e taxa de clique no link 50% menor que a média. Formato tradicional sem conexão emocional.',
        decision: 'Pausar'
      },
      {
        id: 'cr_low_2',
        nameOrId: 'AD02_Carrossel_DetalhesTecido',
        identifiedProblem: 'Boa retenção no feed mas baixa taxa de conversão final na página do produto.',
        decision: 'Criar nova variação'
      }
    ]
  },
  tests: {
    tests: [
      {
        id: 'test_1',
        test: 'Advantage+ Shopping vs. ABO Interesses Segmentados',
        hypothesis: 'A IA da Meta entregará menor CPA em escala com Advantage+ do que os públicos manuais nichados.',
        result: 'Advantage+ gerou CPA de R$ 22,80 contra R$ 31,40 do ABO segmentado.',
        learning: 'Para o catálogo dessa conta, broad com sinalização criativa superou micro-segmentação.',
        nextAction: 'Migrar 70% da verba de aquisição para estrutura Advantage+ no próximo ciclo.'
      },
      {
        id: 'test_2',
        test: 'Página de Destino: Coleção Geral vs. Página de Produto Específico',
        hypothesis: 'Direcionar anúncios de produto específico para a PDP elevará a taxa de conversão do site.',
        result: 'A taxa de conversão na PDP foi de 2.9% vs 1.4% na categoria geral.',
        learning: 'O cliente prefere ir direto para a finalização do produto anunciado.',
        nextAction: 'Padronizar links diretos para todos os anúncios focados em SKU único.'
      }
    ],
    mainLearnings: [
      'Vídeos em formato UGC geram 2.3x mais retenção e metade do CPA em comparação a fotos profissionais de estúdio.',
      'Oferta de frete grátis com ticket mínimo de R$ 199 aumentou o ticket médio de R$ 142 para R$ 215.',
      'Remarketing com janela curta (1-3 dias) converte 78% das vendas recuperadas.'
    ]
  },
  commercial: {
    enabled: true,
    leads: 486,
    qualifiedLeads: 440,
    appointments: 0,
    sales: 486,
    revenue: 104490.00,
    costPerSale: 23.56,
    roas: 9.12,
    commercialAnalysis: 'O faturamento superou a meta estipulada em 16%. O ROAS fechou em 9.12x. A taxa de aprovação de pedidos no gateway foi de 91%, com destaque para o Pix que representou 54% das vendas pagas.'
  },
  diagnosis: {
    currentSituation: 'Conta com tração consolidada, algoritmo bem nutrido com mais de 450 eventos de compra mensais e custo por clique controlado abaixo de R$ 0,80.',
    mainProblem: 'Dependência de 2 criativos campeões que concentram 60% do tráfego, gerando vulnerabilidade a desgaste repentino de público.',
    mainOpportunity: 'Expansão de catálogo com novas variações de UGC e introdução do canal Google Ads (PMax) para capturar intenção de busca qualificada da marca.',
    conclusion: 'Mês de alta performance e eficiência financeira. A estrutura está preparada para suportar aumento gradual de orçamento de até 25% sem perda de margem.'
  },
  decisions: {
    keep: [
      'Campanha de Advantage+ Shopping com os 3 melhores criativos UGC ativos',
      'Estrutura de Remarketing dinâmico DPA para visitantes de 3 dias'
    ],
    optimize: [
      'Aumentar o orçamento diário da campanha principal em 15% gradualmente',
      'Refinar exclusão de compradores dos últimos 30 dias nas campanhas de topo'
    ],
    pause: [
      'Anúncios estáticos em formato banner 1:1 sem vídeo',
      'Conjuntos de anúncio ABO que apresentaram CPA superior a R$ 38,00'
    ],
    testNewCreatives: [
      '3 novos vídeos de unboxing e depoimento real de clientes fiéis',
      'Carrossel com antes/depois ou lookbook para ocasiões especiais'
    ],
    testNewOffers: [
      'Compre 2 peças selecionadas e ganhe acessório exclusivo'
    ],
    testNewAngles: [
      'Ângulo de durabilidade e sustentabilidade das peças (custo por uso)'
    ],
    testNewAudiences: [
      'Lista LAL 1% dos clientes com maior LTV exportada do ERP'
    ],
    testOtherHypotheses: [
      'Testar horário nobre de veiculação entre 19h e 23h para público feminino'
    ]
  },
  summary: {
    resultSummary: 'Mês histórico de resultados com R$ 104,4k faturados para R$ 11,4k investidos, gerando ROAS de 9.12x e 486 pedidos confirmados.',
    mainLearning: 'UGC autêntico com prova social imediata destravou a escala sem aumentar o CPA.',
    mainDecision: 'Escalar orçamento da campanha principal em 15% na primeira quinzena do próximo mês.',
    nextFocus: 'Diversificação de criativos para blindar a conta contra saturação e testes de novas ofertas para o próximo ciclo.'
  }
};
