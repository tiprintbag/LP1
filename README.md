# Landing Page Printbag

Landing page responsiva para a Printbag, empresa de embalagens personalizadas.

## 📋 Estrutura

A landing page contém as seguintes seções:

1. **Hero Section** - Seção principal com logo, título, descrição e produtos visuais
2. **Partners Section** - Seção mostrando marcas parceiras e sacolas personalizadas
3. **Reasons Section** - 4 motivos para escolher a Printbag
4. **Form Section** - Formulário de contato

## 🚀 Como Usar

1. Abra o arquivo `index.html` em seu navegador
2. Para desenvolvimento local, você pode usar um servidor simples:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (se tiver http-server instalado)
   npx http-server
   ```

## 📧 Integração de Email

O formulário está configurado para:
- Enviar dados para o webhook: `https://ia-n8n.4xfwtv.easypanel.host/webhook/9bb8cab3-e473-4c6b-9faa-bfd68115c8b9`
- Envio de email pode ser integrado com serviços como:
  - EmailJS
  - FormSpree
  - SendGrid
  - Outros serviços de email

Para integrar um serviço de email real, edite a função `sendEmail()` no arquivo `script.js`.

## 🎨 Personalização

### Cores
As cores principais podem ser ajustadas no arquivo `styles.css`:
- Azul: `#1e3a8a`, `#2563eb`
- Verde: `#10b981`
- Marrom: `#8b6f47`, `#5a3e2b`

### Fontes
A landing page usa a fonte Inter do Google Fonts. Você pode alterar no `index.html`.

## 📱 Responsividade

A landing page é totalmente responsiva e se adapta a diferentes tamanhos de tela:
- Desktop (1200px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🔧 Funcionalidades

- Formulário de contato com validação
- Envio de dados para webhook
- Scroll suave para o formulário
- Máscara de telefone automática
- Design responsivo e moderno

## 📝 Notas

- O vídeo `printhorizontal.mp4` mencionado nas URLs pode ser incorporado em uma seção adicional se necessário
- As imagens dos produtos são representadas por elementos CSS, mas podem ser substituídas por imagens reais
- Os logos das marcas podem ser substituídos por imagens reais dos logos

