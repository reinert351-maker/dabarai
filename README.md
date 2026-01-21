
# 🌟 DABAR AI - O Logos Digital

O **DABAR AI** é o ecossistema definitivo para o estudo das Escrituras.

---

## 📱 Como Gerar o APK (Android)

Como o app está no Netlify, você já tem a versão Web. Para o APK:

### 1. Preparação Local
1. Instale o [Node.js](https://nodejs.org/).
2. Instale o [Android Studio](https://developer.android.com/studio).
3. Clone seu repositório do GitHub para uma pasta no seu computador.

### 2. Comandos para o APK
Abra o terminal na pasta do projeto e execute:

```bash
# 1. Instalar as ferramentas de celular
npm install

# 2. Adicionar o suporte ao Android (apenas na primeira vez)
npm run mobile:add

# 3. Sincronizar seus arquivos (HTML/JS) com o Android
npm run mobile:sync

# 4. Abrir no Android Studio
npm run mobile:open
```

### 3. Gerando o arquivo .apk no Android Studio
No Android Studio (que abrirá automaticamente com o comando acima):
1. Espere o "Gradle Sync" terminar (barra de progresso no rodapé).
2. Vá no menu superior: **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
3. Quando terminar, aparecerá um balão no canto inferior direito. Clique em **locate** para encontrar seu arquivo `app-debug.apk`.

---

## 🛠️ Detalhes Técnicos
- **Base**: React 19 + ES Modules.
- **Mobile**: Capacitor 6.
- **Deploy**: Netlify (Web) + Local (APK).
