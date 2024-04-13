const net = require("net");

class RCON {

    constructor (address, port, password) {
        this.address = address;
        this.port = port;
        this.password = password;
        this.socket = null;
    }

    connect() {
        this.socket = net.connect({
            host: this.address,
            port: this.port
        });

        this.socket.on('error', (err) => {
            console.error('Error connecting to RCON server:', err.message);
            this.disconnect(this.socket);
        });

        this.socket.on('data', (data) => {
            if (data.readInt32LE(4) === 0x02 && data.readInt32LE(8) === 0) {
                console.log('Auth Packet Received. You can now send commands.');
            } else {
                console.log('Error: Authentication error. Make sure your RCON password is correct.');
                this.disconnect(this.socket);
            }
        });

        return this.socket;
    }

    sendAuthPacket(socket) {
        let authPacket = Buffer.alloc(14 + this.password.length);
        authPacket.writeInt32LE(10 + this.password.length, 0);
        authPacket.writeInt32LE(0x03, 4);
        authPacket.write(this.password, 8, 'utf8');
        authPacket.writeUInt8(0, 8 + this.password.length);

        socket.write(authPacket);
    }

    sendCommand(connection, command) {
        const commandPacket = Buffer.alloc(10 + command.length);
        commandPacket.writeInt32LE(10 + command.length, 0);
        commandPacket.writeInt32LE(0x02, 4);
        commandPacket.write(command, 8, 'utf8');
        commandPacket.writeUInt8(0, 8 + command.length);

        socket.write(commandPacket);
    }

    disconnect(connection) {
        if (connection) {
            connection.end();
            console.log("RCON connection successfully closed!");
        }
    }
}

module.exports = RCON;