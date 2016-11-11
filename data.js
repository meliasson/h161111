h161111.data = {};

h161111.data.actors = [{ type: 'me', position: { x: 1, y: 1 } },
                       { type: 'troll', position: { x: 2, y: 2 } },
                       { type: 'ghost', position: { x: 2, y: 3 } }];
h161111.data.canvas = document.getElementById('game');
h161111.data.context = h161111.data.canvas.getContext("2d");
h161111.data.context.font="30px monospace";
h161111.data.dungeon = h161111.functions.createDungeon([], 20, 20);
h161111.data.keyDown = null;
