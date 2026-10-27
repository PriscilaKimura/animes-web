# Frontend da API de Animes

React + TypeScript + Vite. Lista, cria, edita e apaga animes na API em `http://localhost:8080`.

## O que mudou

A lista buscava `GET /anime` a cada 1 segundo. Agora o `AnimeProvider` busca uma vez ao abrir e escuta Socket.IO:

- `anime.created`
- `anime.updated`
- `anime.deleted`

A URL da API está em `src/config/api.ts`.

Na tela de adicionar, a busca consulta o catálogo da AniList (gratuito) via `GET /catalog/anime?q=`. Ao escolher um resultado, título, sinopse, data, tipo, ranking e capa já vêm preenchidos. O formulário em branco continua se a busca não achar.

Na edição dá para enviar uma capa (`POST /anime/:id/cover`). O card usa `imageUrl` quando existe. Sem capa, mostra “Sem capa”.

A data de lançamento é um dia de calendário (`YYYY-MM-DD`). O card formata esse dia direto, para não deslocar a data por causa do fuso.

## Como rodar

Suba a API antes (veja o README de `animes-back`).

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 3000
```

http://127.0.0.1:3000
