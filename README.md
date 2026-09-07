# Расписание eCampus — PWA

Статический React/Vite фронтенд для просмотра личного расписания и
сессии (экзамены/зачёты) из `schedule.json`. Дизайн скопирован с
проекта `stgmu_110` (Apple HIG стиль, светлая/тёмная тема).

Три вкладки: **Главная** (сегодня), **Расписание** (по неделям, с
переключением чётности), **Сессия** (экзамены/зачёты по семестрам,
последний развёрнут).

## Обновление данных

`public/schedule.json` — статический файл, который коммитится в
репозиторий. После каждого запуска `fetch_schedule.py` +
`parse_schedule.py` в основном проекте (`../fetch_schedule.py`,
`../parse_schedule.py`) копируй свежий `schedule.json` сюда и делай
`git push` — GitHub Actions пересоберёт и задеплоит сайт на GitHub
Pages автоматически.

```bash
cp ../schedule.json public/schedule.json
git add public/schedule.json
git commit -m "update schedule"
git push
```

## Разработка

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
npm run preview
```

## Деплой

Пуш в `main` триггерит `.github/workflows/deploy.yml`, который
собирает проект и публикует `dist/` на GitHub Pages. Репозиторий
приватный (в `schedule.json` личные данные — ФИО преподавателей,
оценки), поэтому GitHub Pages из приватного репо требует GitHub
Pro/Team/EDU.
