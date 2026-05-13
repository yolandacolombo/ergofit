# Ergofit

Aplicativo Expo/React Native do projeto Ergofit.

## Como rodar

```bash
npm install
npm start
```

## Supabase

Crie um arquivo `.env` a partir do `.env.example` e preencha:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://seu-project-ref.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua_anon_public_ou_publishable_key
```

Use a chave pública do projeto no Supabase (`anon public` ou `publishable key`).
Não use chaves `sb_secret_` no app Expo.
