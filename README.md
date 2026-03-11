# N7 - Plataforma de Resumos Fatec (Frontend)

Aplicacao frontend do projeto interdisciplinar N7, desenvolvida com React + Vite + TypeScript.

## Objetivo

Criar uma plataforma para alunos compartilharem resumos por curso/faculdade, com foco em descoberta de conteudo, engajamento e organizacao academica.

## Escopo do MVP (resumo)

O MVP prioriza as funcionalidades essenciais para uso real da plataforma:
- autenticacao com cadastro, login/logout e perfis (aluno, professor, ADM)
- visualizacao e edicao de perfil
- criacao de resumo
- controle de visibilidade (publico/privado)
- feed de resumos
- busca e filtros
- sistema de curtidas e ranking
- selos da turma e do professor
- base inicial de materias e tags (ADM)
- painel ADM basico
- sistema de seguidores
- historico de resumos acessados

## Fora do MVP

Itens planejados para backlog futuro:
- notificacoes basicas
- upload de arquivos (PDF/imagem) em resumos
- escalabilidade multi-faculdade com onboarding automatizado
- app mobile

## Epicos do Produto

- `EP-01` Autenticacao
- `EP-02` Resumos
- `EP-03` Rede social
- `EP-04` Categorizacao
- `EP-05` Perfil do estudante

## Jira Scrum (alinhado)

Itens tecnicos visiveis no Jira:
- `TT-01` Modelagem BD
- `TT-02` Configuracao Backend Spring Boot
- `TT-03` Configuracao Frontend React
- `TT-04` Docker e Deploy
- `TT-05` Documentacao UML
- `TT-06` Mockup (prototipacao baixa fidelidade)
- `TT-07` Prototipo final (alta fidelidade)

Historias de usuario visiveis no Jira:
- `US-01` Cadastro do aluno (5 pts, prioridade: maior)
- `US-02` Login do aluno (3 pts, prioridade: maior)
- `US-03` Perfil do estudante (5 pts, prioridade: maior)
- `US-04` Criar resumo (8 pts, prioridade: maior)
- `US-05` Resumo publico/privado (3 pts, prioridade: maior)
- `US-06` Feed de resumos (5 pts, prioridade: maior)
- `US-07` Buscar e filtrar resumos (5 pts, prioridade: maior)
- `US-08` Curtir resumo (3 pts, prioridade: medio)
- `US-09` Ranking de resumos (5 pts, prioridade: medio)
- `US-10` CRUD de materias e tags (ADM) (3 pts, prioridade: medio)
- `US-11` Editar e excluir resumo (3 pts, prioridade: maior)
- `US-12` Sistema de seguidores (5 pts, prioridade: medio)
- `US-13` Selo do professor (5 pts, prioridade: medio)
- `US-14` Selo da turma (automatico) (3 pts, prioridade: medio)
- `US-15` Painel ADM (5 pts, prioridade: medio)
- `US-17` Historico de resumos acessados (3 pts, prioridade: menor)
- `US-20` Cadastro do professor (ADM) (3 pts, prioridade: medio)

Total de story points visiveis no backlog Jira: `48`.

## Stack

- React 19
- Vite 7
- TypeScript 5 (strict)
- Tailwind CSS 4
- React Router 7
- TanStack Query 5
- ESLint 9

Stack do ecossistema completo (conforme MVP):
- Front-end: React + Tailwind
- Back-end: Java Spring Boot
- Banco de dados: PostgreSQL
- Auth: Spring Security + JWT
- Deploy previsto: Vercel (front) + Railway/Render (back)

## Estrutura atual

```text
src/
  App.tsx
  main.tsx
  index.css
  componentes/
  paginas/
    PaginaInicial.tsx
    PaginaCadastro.tsx
    PaginaLogin.tsx
    PaginaPerfil.tsx
    PaginaFeed.tsx
    PaginaPainel.tsx
  http/
    types/
  utils/
```

## Rotas atuais

Definidas em `src/App.tsx`:
- `/` -> `PaginaInicial`
- `/cadastro` -> `PaginaCadastro`
- `/login` -> `PaginaLogin`
- `/perfil` -> `PaginaPerfil`
- `/feed` -> `PaginaFeed`
- `/painel` -> `PaginaPainel`

## Requisitos

- Node.js 20+ (recomendado LTS)
- npm 10+

## Como rodar localmente

```bash
npm install
npm run dev
```

Aplicacao em desenvolvimento via Vite.

## Scripts

- `npm run dev`: inicia ambiente de desenvolvimento
- `npm run build`: typecheck + build de producao
- `npm run lint`: executa lint
- `npm run preview`: preview do build

## Convencoes de equipe

- manter nomes em portugues para arquivos e componentes de pagina
- evitar mistura de portugues e ingles na mesma camada
- criar componentes reutilizaveis em `src/componentes`
- organizar chamadas de API em `src/http`
- usar TanStack Query para cache e sincronizacao de dados remotos