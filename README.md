# Watch Movies

Aplicação web para navegação, busca e visualização de filmes, com uma experiência inspirada em plataformas de streaming.

O projeto permite explorar filmes em destaque, buscar títulos em tempo real, favoritar itens e visualizar detalhes em um modal interativo.

---

## Como instalar e executar

### 1. Clone o repositório

```bash
git clone https://github.com/paulopaivasilva/watch-movie-front.git
```

---

### 2. Acesse a pasta do projeto

```bash
cd watch-movie-front
```

---

### 3. Instale as dependências

```bash
npm install
```

ou

```bash
yarn install
```

---

### 4. Execute o projeto

```bash
npm run dev
```

---

### 5. Acesse no navegador

http://localhost:3000

---

## Solução adotada

A aplicação foi construída utilizando **Next.js (App Router)** com foco em organização, reutilização e experiência do usuário.

A estrutura separa claramente:

* Componentes de layout (Sidebar, Navbar)
* Componentes de UI (cards, modal, seções)
* Hooks para consumo de API e controle de estado

### Principais funcionalidades:

* Listagem de filmes (Trending)
* Busca com debounce
* Sistema de favoritos
* Modal com detalhes do filme
* Infinite scroll
* Layout responsivo

---

## Bibliotecas utilizadas

* **Next.js** → estrutura da aplicação
* **React Query (@tanstack/react-query)** → consumo de API e cache
* **Tailwind CSS** → estilização
* **Lucide React** → ícones
* **Framer Motion** → animações de transição
* **Next/Image** → otimização de imagens

---

## Decisões técnicas e adaptações

### Organização do layout

Foi criado um `AppLayout` responsável por centralizar:

* Sidebar fixa
* Navbar fixa
* Scroll apenas no conteúdo principal

Isso evita repetição de código e mantém consistência entre páginas.

---

### Gerenciamento de dados

O uso do **React Query** permite:

* Cache automático
* Retry em caso de erro
* Controle de loading e estados de erro

---

### Tratamento de erros

Foi implementado um padrão simples e reutilizável nas páginas principais:

* Hooks retornam `isError` e `refetch`
* O layout exibe um componente de erro com opção de tentativa novamente

---

### Busca

A busca utiliza debounce de 500ms para evitar múltiplas requisições desnecessárias, melhorando a experiência do usuário durante a digitação.

---

### Sistema de favoritos

* Controle via contexto global
* Atualização em tempo real na interface
* Feedback visual no botão (ícone e cor)

---

### Infinite Scroll

* Implementado com `useInfiniteQuery`
* Paginação baseada em token
* Remoção de itens duplicados para evitar problemas de renderização

---

### Performance

* Uso de `Next/Image` com `fill` e `sizes`
* Controle de carregamento de imagens críticas
* Redução de re-renderizações com cache

---

### Responsividade

* Layout adaptado para mobile e desktop
* Sidebar colapsável
* Modal responsivo
* Ajustes finos de espaçamento e alinhamento

---

## Considerações finais

O projeto foi desenvolvido com foco em:

* Experiência do usuário
* Clareza na organização do código
* Facilidade de manutenção
* Escalabilidade

A base atual permite evoluir facilmente para novas funcionalidades, como autenticação, backend próprio ou dashboards mais completos.

---

## Autor

Paulo Henrique Paiva da Silva
