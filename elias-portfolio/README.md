# Elias — Portfólio de Desenvolvedor Web

Portfólio single page feito com HTML5, CSS3 e JavaScript puro. Não exige instalação de dependências.

## Executar localmente

1. Extraia a pasta `elias-portfolio`.
2. Abra a pasta no VS Code.
3. Abra `index.html` no navegador. Se tiver a extensão Live Server, clique em **Go Live**.
4. Edite os arquivos e atualize o navegador para conferir as mudanças.

## O que editar antes de publicar

### Contatos
Abra `js/script.js` e preencha `SITE_CONFIG`:

- `whatsappNumber`: número completo com código do país e DDD, somente dígitos (ex.: `5511999999999`).
- `email`: e-mail profissional que receberá as mensagens.
- `githubUrl`: URL completa do perfil GitHub, começando com `https://`.
- `linkedinUrl`: URL completa do perfil LinkedIn, começando com `https://`.
- `formspreeEndpoint`: endpoint do formulário criado no Formspree, se quiser receber envios sem depender do aplicativo de e-mail.

O WhatsApp e os perfis só ficam clicáveis quando os dados são válidos. Sem endpoint Formspree, o formulário valida os campos e prepara uma mensagem; ele não simula um envio. Com e-mail configurado, abre um rascunho no aplicativo de e-mail. Para envio direto, configure o endpoint Formspree.

### Conteúdo e projetos
- Textos e seções: `index.html`.
- Cores, fontes, espaçamento e responsividade: `css/style.css`.
- Menu, animações, contatos e formulário: `js/script.js`.
- Favicon: `assets/icons/favicon.svg`.
- Prévia dos projetos: neste protótipo, os cartões são mockups feitos em CSS. Para usar imagens reais dos seus sites, coloque arquivos em `assets/images/` e substitua o conteúdo visual de `.project-preview` no HTML por tags `<img>` com `alt`, `loading="lazy"` e dimensões definidas.

Procure por `[SUBSTITUIR]` para localizar dados que precisam de revisão. A linha de habilidade React deve ser removida caso não seja uma tecnologia que você já utiliza. Não publique contatos fictícios nem links sem testar.

## Publicar gratuitamente

### GitHub Pages
1. Crie um repositório público no GitHub.
2. Envie os arquivos e pastas desta pasta para a raiz do repositório.
3. Abra **Settings → Pages**.
4. Em **Build and deployment**, escolha publicar a partir da branch principal (`main`) e da pasta `/ (root)`.
5. Salve e aguarde o endereço publicado aparecer na página do GitHub Pages.

### Netlify
1. Entre no Netlify e crie um novo site.
2. Importe o repositório GitHub ou arraste a pasta do projeto para a opção de deploy manual.
3. Não é necessário comando de build: o arquivo de entrada é `index.html`.
4. Depois de publicar, teste o site no celular e em uma janela anônima.

## Checklist antes de publicar

- [ ] Substituir os marcadores `[SUBSTITUIR]`.
- [ ] Confirmar se as tecnologias listadas representam habilidades atuais.
- [ ] Configurar e testar WhatsApp, e-mail e perfis sociais.
- [ ] Configurar e testar Formspree caso queira envio direto.
- [ ] Confirmar que os projetos são identificados como demonstrativos.
- [ ] Testar em larguras de 360 px, 768 px e 1280 px.
- [ ] Testar navegação por teclado, links e menu móvel.
- [ ] Rodar Lighthouse no site publicado. Uma nota específica não pode ser garantida antes de testes reais.

## Suposições e pendências

- Nome público usado: **Elias**.
- Os únicos projetos apresentados são Blackline Barber Club e Lumina Odontologia, ambos fictícios e demonstrativos.
- WhatsApp, e-mail, GitHub e LinkedIn não foram inventados; permanecem desativados até configuração.
- A linha `React` está marcada como `[SUBSTITUIR]` para confirmar/remover conforme sua experiência real.
- O prazo de resposta não foi prometido; confirme uma expectativa realista antes de publicar.
- O formulário só envia diretamente após configurar e testar um endpoint de serviço.
- Nenhum depoimento, cliente, prêmio, estatística ou resultado comercial foi criado.
