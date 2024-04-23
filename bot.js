const config = require('./config.json');
const { super_admins, admins, block_commands } = config.bot_settings;
const { address, port, password } = config.rcon_settings;

const Rcon = require('rcon');
const rcon = new Rcon(address, port, password, {
    tcp: true,
    challenge: true
});
rcon.connect();

const { VK } = require('vk-io');
const vk = new VK({
    token: config.access_token,
    pollingGroupId: config.group_id,
    apiVersion: config.api_version
});

const { updates } = vk;

const sendCommand = async (command) => {
    let response;

    try {
        rcon.send(command);
        response = await new Promise((resolve, reject) => {
            rcon.once('response', (res) => {
                if(res == '') {
                    resolve('Сервер не вернул ответа. Но команда успешно отправлена!');
                }
                resolve(res);
            });

            setTimeout(() => {
                reject('Сервер не ответил вовремя.');
            }, 10000);
        });
    } catch (error) {
        console.error('При отправке команды произошла ошибка:', error);

        return 'При выполнении произошла ошибка.\nВозможно, сервер или RCON отключены!';
    }

    if (response === undefined) {
        response = 'Сервер не вернул ответа.';
    }

    return response;
};

updates.on(['message_new'], async (context, next) => {
    const { text, senderId, id } = context;
    const startSymbol = text.substring(0, 1);

    if(startSymbol == "/") {
        const [ command, ...args ] = text.substring(1).split(' ');

        console.log('Команда: ', command);

        if (super_admins.includes(senderId)) {
            const resp = await sendCommand(`${command} ${args.slice(' ')}`);

            context.send('Результат выполнения команды:\n\n' + resp, {
                reply_to: id
            });
        } else if (admins.includes(senderId)) {
            if (block_commands.includes(command.toLowerCase())) {
                context.send('Вы не можете использовать данную команду!', {
                    reply_to: id
                });
            } else {
                const resp = await sendCommand(`${command} ${args.slice(' ')}`);

                context.send('Результат выполнения команды:\n\n' + resp, {
                    reply_to: id
                });
            }
        } else {
            context.send('У вас нет прав на использование RCON!.', {
                reply_to: id
            });
        }
    }else{
        context.send('Для обращения к серверу, используйте "/" в начале сообщения.', {
            reply_to: id
        });
    }

    return next();
});

rcon.on('auth', ()=> {
    console.log(`RCON > Успешно авторизировался!`);
}).on('error', (err)=> {
    console.error('RCON > Произошла ошибка: ', err);
}).on('end', ()=> {
    console.log('RCON > Закрываю соединение.');
});

updates.start()
.then(()=> console.log('RCON-бот запущен!'))
.catch(err=> console.error('При запуске произошла ошибка:', err));