# node-vk-rcon
Этот бот позволит вам отправлять команды на сервер из сообщений ВКонтакте, посредством отправки запросов RCON.
Он поддерживает несколько уровней разрешений пользователей, поэтому вы сможете ограничить, какие команды могут выполнять пользователи.

# Возможности
- [X] Отправка команд на сервер
- [X] Аутентификация пользователей с разными уровнями разрешений
- [X] Проверка запрещенных команд для пользователей с низкими разрешениями
- [X] Обработка ошибок и повторное подключение при закрытии соединения

# Настройка
__1. Заполните файл "config.json" со следующей структурой:__
```json
{
  "bot_settings": {
    "super_admins": [3434, 2323],
    "admins": [13245, 3534],
    "block_commands": ["команда1", "команда2"]
  },
  "rcon_settings": {
    "address": "localhost",
    "port": "19132",
    "password": "RCON пароль"
  }
}
```

__2. Установите зависимости с помощью__
```bash
npm install
```

__3. Запустите бота с помощью__
```bash
node bot.js
```

# Использование
Отправляйте команды в чат, используя следующий формат:
```
/команда [аргументы]
```

Пример:
```
/say Привет, мир!
```

# Разрешения пользователей
- Супер-админы: __Могут выполнять любую команду, без ограничений.__
- Админы: __Могут выполнять все команды, кроме запрещённых из списка "block_commands".__

# Известные проблемы
- [ ] Бот не может отправлять команды, если соединение с сервером закрыто.

# Обратная связь
Если у вас есть какие-либо вопросы, предложения или сообщения об ошибках, пожалуйста, создайте тикет на <a href="https://github.com/LiteCoreTeam/node-vk-rcon/issues">GitHub Issues</a>.
