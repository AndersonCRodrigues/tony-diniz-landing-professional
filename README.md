# Tony Diniz | Personal Trainer

**Landing page institucional de Tony Diniz**, personal trainer em Maricá (RJ), desenvolvida para apresentar sua trajetória, metodologia de acompanhamento, especialidades e depoimentos de alunos. O foco da experiência é uma navegação clara, responsiva e um caminho direto para contato e agendamento.

## Visão geral

- Página única com navegação por âncoras e menu adaptável a dispositivos móveis.
- Seções de apresentação, trajetória, método, especialidades, depoimentos e contato.
- Chamadas para ação que abrem conversas no WhatsApp com mensagens contextualizadas.
- Fotografias reais dos alunos com enquadramento e proporção padronizados.
- Cuidados com acessibilidade: HTML semântico, navegação por teclado, foco visível e preferência por movimento reduzido.
- Metadados para mecanismos de busca e compartilhamento social.

## Tecnologias

| Camada | Tecnologia |
| --- | --- |
| Interface | React |
| Ferramenta de desenvolvimento e build | Vite |
| Estilização e responsividade | Tailwind CSS |
| Ícones | Lucide React e SVG local |
| Tipografia | Manrope e Barlow Condensed |
| Processamento das fotos | Python e Pillow (opcional) |

A estilização fica principalmente nas classes utilitárias do Tailwind. `src/index.css` centraliza a configuração do tema e as regras globais.

## Requisitos

- Node.js compatível com a versão do Vite declarada em `package.json` (recomendado Node.js 22.12 ou superior).
- npm.
- Python e Pillow **somente** para reproduzir os recortes das fotos originais.

## Instalação e execução

```bash
git clone https://github.com/AndersonCRodrigues/tony-diniz-landing-professional.git
cd tony-diniz-landing-professional
npm ci
npm run dev
```

O servidor de desenvolvimento informa a URL local no terminal, normalmente `http://localhost:5173`.

## Comandos disponíveis

| Comando | Função |
| --- | --- |
| `npm run dev` | Inicia o ambiente de desenvolvimento. |
| `npm run check` | Executa verificações estruturais e de integridade dos assets. |
| `npm run build` | Gera os arquivos estáticos de produção em `dist/`. |
| `npm run preview` | Serve localmente o resultado do build. |

Para validar antes de publicar:

```bash
npm ci
npm run check
npm run build
npm run preview
```

O projeto também possui um workflow em `.github/workflows/ci.yml` que executa as verificações e a compilação nos pushes e pull requests.

## Estrutura do projeto

```text
.
├── .github/workflows/ci.yml       # Integração contínua
├── assets/fotos-originais/        # JPEGs originais, fora da pasta pública
├── docs/
│   ├── PADRONIZACAO_FOTOS.md     # Critérios e recortes dos retratos
│   └── previa-retratos.jpg       # Painel de conferência
├── public/
│   ├── alunos/                   # Retratos WebP usados na interface
│   └── ...                       # Logotipo, favicon e fotos do profissional
├── scripts/
│   ├── check.mjs                # Validação do conteúdo do projeto
│   └── recortar_fotos.py        # Reprodução dos recortes com Pillow
├── src/
│   ├── components/             # Depoimentos e ícone SVG do Instagram
│   ├── data/depoimentos.js     # Dados editáveis dos depoimentos
│   ├── App.jsx                 # Seções, textos e links principais
│   ├── index.css               # Tema Tailwind e estilos globais
│   └── main.jsx                # Entrada da aplicação
├── index.html                  # HTML, SEO e metadados
├── package.json
└── vite.config.js
```

## Personalização

| Conteúdo | Arquivo |
| --- | --- |
| Textos, serviços, WhatsApp e Instagram | `src/App.jsx` |
| Depoimentos e fotos vinculadas | `src/data/depoimentos.js` |
| Cores, fontes e estilos globais | `src/index.css` |
| Imagens públicas | `public/` |
| Título, descrição, redes sociais e dados estruturados | `index.html` |
| Configuração do build | `vite.config.js` |

### Retratos de alunos

Os retratos utilizados na seção de depoimentos estão em `public/alunos/`, no formato WebP, com **proporção 4:5 (480 × 600 px)**. As fotografias-fonte ficam em `assets/fotos-originais/`, preservadas para futuras edições.

Para gerar novamente os recortes:

```bash
python -m pip install Pillow
python scripts/recortar_fotos.py
```

O procedimento e as áreas de recorte estão documentados em [`docs/PADRONIZACAO_FOTOS.md`](docs/PADRONIZACAO_FOTOS.md).

## Publicação

A página é uma aplicação estática. Em provedores como Vercel, Netlify ou Cloudflare Pages, utilize:

- **Comando de build:** `npm run build`
- **Diretório de saída:** `dist`

Antes da publicação, confirme as informações de contato e registro profissional, revise os textos e configure os metadados sociais para o domínio definitivo. A divulgação dos retratos e depoimentos dos alunos deve contar com autorização dos respectivos titulares.

## Créditos e direitos de uso

Projeto desenvolvido para a presença digital de **Tony Diniz**. Fotografias, identidade visual e depoimentos pertencem a seus respectivos titulares. A disponibilização deste código no GitHub não implica concessão automática de licença de reutilização do conteúdo ou das imagens.

## SEO e indexação

O site descreve duas modalidades de atendimento: personal trainer presencial em Maricá (RJ) e envio de treinos pelo WhatsApp para pessoas de outras localidades. O conteúdo deve refletir os serviços efetivamente prestados.

- A URL principal (canônica) é `https://www.tonydinizpersonal.com.br/`, conforme o redirecionamento configurado na hospedagem.
- `index.html` contém título, descrição, Open Graph, Twitter Card e dados estruturados dos serviços.
- `public/robots.txt` e `public/sitemap.xml` são publicados na raiz pelo Vite/Vercel.
- Para acompanhar a indexação, adicione a propriedade no [Google Search Console](https://search.google.com/search-console/about) e envie `https://www.tonydinizpersonal.com.br/sitemap.xml`.
- A inclusão no Google e o posicionamento nos resultados não são garantidos por metatags ou sitemap.
