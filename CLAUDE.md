# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Electron + React desktop Pomodoro timer (番茄钟). Frameless 400x600 window with system tray integration, Chinese UI.

## Commands
- `npm run dev` — Start dev server + Electron (hot-reloads renderer, restarts on main process changes)
- `npm run build` — Type-check (`tsc`) + build renderer (`vite build`) + package (`electron-builder`)
- `npm run preview` — Serve built renderer only (no Electron)

## Architecture

### Electron Process Model
- **Main process**: `electron/main.ts` — window, tray, IPC handlers. Frameless BrowserWindow, minimize-to-tray behavior.
- **Preload**: `electron/preload.ts` — exposes `window.electronAPI` via `contextBridge` (contextIsolation on, nodeIntegration off).
- **Renderer**: `src/` — React 19 app with Tailwind CSS v4. No direct Node.js access; all main-process communication goes through `window.electronAPI`.

### IPC Channels (6 total)
- Invoke/handle (async): `settings:get`, `settings:set`, `stats:get`, `stats:addPomodoro`
- Send/on (fire-and-forget): `title:update`, `notification:show`

### Data Persistence
`electron/store.ts` — reads/writes JSON files in `app.getPath('userData')/pomodoro-data/`. Two files: `settings.json` and `stats.json`. Types are shared with renderer via `src/types/index.ts`.

### Renderer Architecture
- **App.tsx** is the single root component. All state lives here (page, settings, theme). No React Router — page switching is `useState<Page>` with conditional rendering.
- **Custom hooks**: `useTimer` (state machine with setInterval), `useTheme` (dark/light toggle on `<html>`), `useStatistics` (IPC + useMemo for todayStats/weekStats).
- **Components**: Timer (SVG circular progress), Controls, SessionInfo, Settings, Statistics, ThemeToggle, Navigation (bottom tab bar).
- **constants.ts**: `SESSION_COLORS` (amber/green/blue) and `SESSION_LABELS` (Chinese labels) — use these instead of hardcoding colors or strings.

### Build Tooling
Vite 8 with four plugins: `@vitejs/plugin-react`, `@tailwindcss/vite`, `vite-plugin-electron` (builds main+preload to `dist-electron/`), `vite-plugin-electron-renderer`. Two tsconfig files: `tsconfig.json` for `src/`, `tsconfig.node.json` for `electron/` and `vite.config.ts`.

### Packaging
`electron-builder.json5` — Windows `dir` target (portable folder, not installer). Icon: `public/icon.png`.

## Key Conventions
- Session types: `'work' | 'shortBreak' | 'longBreak'` — always use `SESSION_COLORS` and `SESSION_LABELS` from `constants.ts`
- Page type: `'timer' | 'stats' | 'settings'` — defined in `constants.ts`
- Tailwind dark mode via `dark:` prefix, toggled by adding/removing `dark` class on `<html>`
- All IPC methods are typed in `src/types/index.ts` under `Window.electronAPI`
- UI language: Chinese (简体中文)
