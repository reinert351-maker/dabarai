
# 🌟 DABAR AI - O Logos Digital

O **DABAR AI** (do hebraico דבר - "Palavra") é o ecossistema definitivo para o estudo das Escrituras Sagradas. Projetado para teólogos, pastores e estudantes sérios, o aplicativo combina a profundidade da tradição cristã com o que há de mais avançado em Inteligência Artificial Generativa.

---

## 📖 Descrição Detalhada das Funções

### 1. Leitor Bíblico de Alta Fidelidade
*   **Texto Interativo**: Navegue entre o Antigo e o Novo Testamento com uma interface otimizada para leitura profunda.
*   **Sincronia com Línguas Originais**: Clique em palavras-chave para abrir instantaneamente o verbete correspondente no Dicionário Strong (Hebraico/Grego).
*   **Arte Generativa por Capítulo**: Cada capítulo utiliza o modelo `gemini-2.5-flash-image` para criar uma representação visual majestosa e contextual do texto lido.
*   **Exegese de Versículo**: Sistema de salvamento rápido para versículos com envio direto para o Scriptorium.

### 2. Mentor Teológico IA (DABAR Assistant)
*   **Motor Gemini 3 Pro**: Utiliza a capacidade de raciocínio avançado (Chain-of-Thought) para resolver dilemas teológicos complexos.
*   **Memória Contextual**: O Mentor lembra do progresso do seu estudo, permitindo debates doutrinários contínuos e coerentes.
*   **Multilinguismo Sagrado**: Capacidade nativa de traduzir e analisar nuances gramaticais do Grego Koiné, Hebraico Bíblico e Aramaico.

### 3. Cátedras de Teologia Comparada
*   **20 Vertentes Doutrinárias**: Módulos dedicados que cobrem desde a *Patrística* e *Escolástica* até a *Teologia Reformada*, *Pentecostal* e *Libertação*.
*   **Gerador de Tratados**: Um motor IA que compila teses acadêmicas completas sobre qualquer tema, filtradas pela ótica da vertente selecionada.
*   **Analisador Hermenêutico**: Compara divergências e convergências entre correntes (ex: Soteriologia Calvinista vs. Arminiana).

### 4. Cartografia e Arqueologia (Maps Grounding)
*   **Exploração Geolocalizada**: Integração com Google Maps para visualizar a geografia bíblica real.
*   **Dossiê Arqueológico**: Utiliza *Google Search Grounding* para trazer as descobertas arqueológicas mais recentes sobre cidades como Jerusalém, Nazaré e Babilônia.
*   **Perspectiva Histórica**: A IA contextualiza a importância espiritual de cada coordenada geográfica pesquisada.

### 5. Cânon do Tempo (Timeline)
*   **Divisão Dispensacionalista**: Uma visualização cronológica da história bíblica organizada por dispensações (Inocência, Lei, Graça, Reino, etc.).
*   **Eventos Sincronizados**: Integração de marcos bíblicos com a história secular universal.
*   **Evidências de Apoio**: Acesso a fontes primárias e citações históricas para cada marco temporal.

### 6. Léxico & Antologia de Ouro
*   **Dicionário Strong Digital**: Ferramenta de busca por números Strong (ex: G3056 para *Logos*) com definições etimológicas exaustivas.
*   **Sabedoria dos Santos**: Uma curadoria de citações de grandes pensadores (Spurgeon, Agostinho, C.S. Lewis) para meditação diária.

### 7. Comunidade e Concílios Digitais
*   **Ambiente de Koinonia**: Canais de chat temáticos para debates em grupo e mensagens diretas para mentoria.
*   **Zelo Doutrinário**: Ferramentas de moderação e "Denúncia de Heresia" para manter a integridade acadêmica do grupo.

### 8. Gamificação e Progressão (Jornada)
*   **Maturidade Teológica (XP)**: Ganhe pontos por cada estudo realizado, oração registrada ou interação na comunidade.
*   **Missões Diárias e Épicas**: Desafios que incentivam o estudo sistemático das Escrituras.
*   **Níveis de Sabedoria**: Desbloqueie novos recursos (como a Academia) conforme sua proficiência aumenta.

### 9. Academia DABAR (Originals School)
*   **Ensino de Línguas**: Módulo de introdução ao Hebraico e Aramaico, desbloqueado no Nível 20.
*   **Interatividade IA**: A IA atua como tutor de línguas, corrigindo transliterações e ensinando a estrutura verbal dos originais.

### 10. Scriptorium (Gestão de Conhecimento)
*   **Arquivo de Notas**: Centraliza todas as suas teses, versículos favoritos e meditações.
*   **Exportação Profissional**: Transforme seus estudos em documentos **PDF** ou **Word (DOCX)** com formatação acadêmica automática.

### 11. Customização (Ajustes no Templo)
*   **Motor de Temas**: Personalize a interface com temas como *Manuscrito Sépia*, *Noite Profunda* ou *Catedral Azul*.
*   **Configurações de IA**: Ajuste a profundidade acadêmica e a velocidade de resposta do motor DABAR.

---

## 🛠️ Detalhes Técnicos para Desenvolvedores

### Arquitetura de IA
O app utiliza o SDK `@google/genai` com modelos configurados para alta precisão teológica:
- **Gemini 3 Pro Preview**: Para exegese, teses e debates.
- **Gemini 2.5 Flash**: Para mapas, buscas rápidas e tarefas leves.
- **Gemini 2.5 Flash Image**: Para a geração de arte sacra generativa.

### Deployment no GitHub
Este projeto utiliza uma arquitetura baseada em **ESModules (ESM)**. Isso significa que ele não requer um servidor Node.js complexo para ser servido no GitHub Pages, Netlify ou Vercel. 
- Basta servir o arquivo `index.html`.
- As dependências são resolvidas via `esm.sh` no `importmap`.

---
*DABAR AI: Onde a tradição milenar encontra o futuro digital.*
