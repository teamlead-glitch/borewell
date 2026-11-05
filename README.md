# Borewell website

Next.js 16 (App Router, TypeScript, Tailwind v4) front end for borewell.in. Data comes from the
Laravel API in `borewell-admin-and-api`; the visual reference is the approved design in `../design`.

```bash
cp .env.example .env.local   # API on Laragon by default
npm install
npm run dev                  # http://localhost:3000
```

Checks before a pull request: `npx tsc --noEmit`, `npx eslint .`, `npm run build`.

- Rules for developers and Claude Code: [CLAUDE.md](CLAUDE.md)
- Deployment, env vars and pre-launch list: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
