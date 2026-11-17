# TF 09 — React: Referências e Efeitos

**Disciplina:** Frontend — UNIFAAT 2026.2

**Professor:** Luan Lourenço

**Aluna:** Denise Maider Batista de Macedo

**RA:** 6325028

**Branch:** `6325028-tf-09`

## Descrição do trabalho

Aplicação desenvolvida com React, Vite e TypeScript, consumindo a API do curso por meio do Axios.

## Funcionalidades implementadas

- Listagem de usuários com paginação.
- Seleção de usuários e visualização de suas tarefas.
- Marcação de tarefas como concluídas ou pendentes.
- Filtro de tarefas por nome.
- Hook personalizado `useAxios`.
- Utilização de `useRef` e `useEffect`.
- Cancelamento de requisições com `AbortController`.
- Tratamento de erros e opção de tentar novamente.
- Contador de respostas recebidas.
- Atualização dinâmica do título da aba.

## Como executar

Na pasta `app`:

```bash
npm install
npm run dev
```

A aplicação utiliza `http://localhost:5173` e depende da API do curso em `http://localhost:8080`.

## Testes realizados

- Verificação do TypeScript.
- Verificação do ESLint.
- Teste de listagem e paginação.
- Teste de atualização de tarefas.
- Teste do filtro de pesquisa.
- Teste de tratamento e recuperação de erros.
- Teste do contador e do título da aba.
