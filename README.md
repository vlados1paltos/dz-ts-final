# dz-ts-final

Итоговый проект блока TypeScript.

Приложение показывает текущую погоду в шести городах и прогноз на 7 дней. Данные берутся из Open-Meteo.

## Что сделано

- React + TypeScript;
- React Bootstrap;
- SCSS;
- 6 карточек с текущей погодой;
- адаптивная сетка 3 / 2 / 1;
- отдельная страница прогноза на 7 дней;
- запрос координат города и запрос погоды по координатам;
- Bootstrap Spinner во время загрузки;
- обработка ошибок API;
- autocomplete для поиска любого города;
- переиспользуемые компоненты, функции и custom hooks.

## Запуск

```bash
npm install
npm start
```

После `npm install` появится `package-lock.json`.

## Сборка

```bash
npm run build
```

## GitHub Pages

Проект подготовлен для репозитория `dz-ts-final`.

```bash
npm run deploy
```

После публикации:

https://vlados1paltos.github.io/dz-ts-final/

## Основная структура

```text
src/
  api/          запросы к Open-Meteo
  components/   переиспользуемые компоненты
  constants/    список шести городов
  hooks/        общие хуки
  pages/        главная и прогноз
  types/        TypeScript-интерфейсы
  utils/        даты, названия локаций, weather code
  styles/       SCSS
```
