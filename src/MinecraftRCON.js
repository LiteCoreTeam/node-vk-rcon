const net = require("net");

class RCON {

    /**
     * Конструктор класса Rcon.
     * @constructor
     * @param {object} [params] - Параметры для конфигурации подключения к серверу RCON.
     * @param {string} [params.serverHost='127.0.0.1'] - Хост сервера RCON.
     * @param {number} [params.serverPort=19132] - Порт сервера RCON.
     * @param {string} [params.rconPassword] - Пароль для аутентификации RCON.
     * @param {number} [params.timeout=5000] - Таймаут подключения в миллисекундах.
     */
    constructor (params)
    {
        this.host = params.serverHost || '127.0.0.1';
        this.port = params.serverPort || 19132;

        if(!params.rconPassword)
        this.password = params.rconPassword;

        if(!params.timeout) params.timeout = 5000;
        this.timeout = params.timeout;

        this.socket = null;
    }

    /**
     * Отправка команды через RCON
     * @sendCommand
     * @param {string} command 
     */
    sendCommand(command)
    {

    }

    /**
     * Создание RCON соединения
     * @createConnection
     */
    createConnection()
    {
        return new Promise();
    }

    /**
     * Закрытие RCON соединения
     * @closeConnection
     */
    closeConnection ()
    {

    }
}

module.exports = RCON;