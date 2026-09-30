# Ритм

Трекер привычек и задач. Отмечаешь, что сделала за день, и когда всё отмечено, день загорается в календаре.

- Работает на телефоне и компьютере, ставится на экран «Домой» как приложение.
- Открывается и работает без интернета: отметки сохраняются на устройстве и уходят на другие устройства, когда связь появится.
- Синхронизация через Firebase (бесплатный тариф Spark). Хостинг на GitHub Pages.

## Как устроено

| Файл | Что делает |
|---|---|
| `index.html` | разметка и стили |
| `app.js` | логика приложения |
| `firebase-config.js` | настройки Firebase; пока там `null`, приложение работает без аккаунта |
| `sw.js` | сервис-воркер: кэширует файлы, чтобы приложение открывалось офлайн |
| `vendor/firebase.js` | собранный Firebase SDK (`npm run vendor`) |
| `fonts/`, `icons/` | шрифты Geologica и Onest, иконки приложения |
| `firestore.rules` | правила доступа к базе: каждый видит только свои данные |

Данные в Firestore: `users/<uid>/items/<id>` — привычки и задачи, `users/<uid>/log/<ГГГГ-ММ>` — отметки за месяц.

## Настройка Firebase (один раз, минут 5)

1. Открой [console.firebase.google.com](https://console.firebase.google.com) и нажми **Create a project**. Название любое, например `ritm`. Google Analytics можно выключить.
2. **Build → Firestore Database → Create database.** Режим **Production**, регион любой европейский (например `eur3`).
3. На вкладке **Rules** замени текст содержимым файла `firestore.rules` и нажми **Publish**.
4. **Build → Authentication → Get started → Sign-in method → Email/Password → Enable → Save.**
5. **Authentication → Settings → Authorized domains → Add domain:** `annkka3.github.io`.
6. **Project settings (шестерёнка) → Your apps → значок `</>`**, зарегистрируй веб-приложение (Hosting не нужен). Скопируй объект `firebaseConfig` и вставь его в `firebase-config.js` вместо `null`.
7. В `sw.js` увеличь `VERSION`, закоммить и запушь. Через минуту GitHub Pages обновится.

Значения в `firebase-config.js` не секретные: доступ к данным закрыт правилами Firestore. GitHub может прислать письмо, что нашёл в репозитории ключ Google API. Для Firebase это нормально. Для спокойствия можно ограничить ключ в Google Cloud Console (APIs & Services → Credentials) HTTP-рефереррами `annkka3.github.io/*` и `localhost`.

## Перенос данных из артефакта Claude

В `backup/` лежит копия привычек и отметок из версии-артефакта (папка не попадает в git). В приложении: **Настройки → Загрузить из файла**.

## Разработка

```bash
npm install
```

```bash
npm run serve
```

Открой http://localhost:8766. После любых изменений файлов увеличивай `VERSION` в `sw.js`, иначе телефоны продолжат показывать старую версию из кэша.

Пересобрать Firebase SDK после обновления пакета:

```bash
npm run vendor
```
