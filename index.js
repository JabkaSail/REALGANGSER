var mc = require('minecraft-protocol');
var forgeHandshake = require('minecraft-protocol-forge').forgeHandshake;
var server = mc.createServer({
  'online-mode': false,   // optional
  encryption: true,      // optional
  host: '0.0.0.0',       // optional
  port: 25565,           // optional
});

forgeHandshake(server, {forgeMods: [
  { modid: 'mcp', version: '9.18' },
  { modid: 'FML', version: '8.0.99.99' },
  { modid: 'Forge', version: '11.15.0.1715' },
  { modid: 'IronChest', version: '6.0.121.768' },
{ modid: 'Balkon’s Weapon Return', version: '0.7.5' }
]});
                        
server.on('login', function(client) {
  client.write('login', {
    entityId: client.id,
    levelType: 'default',
    gameMode: 1,
    dimension: 0,
    difficulty: 2,
    maxPlayers: server.maxPlayers,
    reducedDebugInfo: false
  });
  client.write('position', {
    x: 0,
    y: 1.62,
    z: 0,
    yaw: 0,
    pitch: 0,
    flags: 0x00
  });
  var msg = {
    translate: 'chat.type.announcement',
    "with": [
      'Server',
      'Hello, world!'
    ]
  };
  client.write("chat", { message: JSON.stringify(msg), position: 0 });
});