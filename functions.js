h161111.functions = {};

h161111.functions.startGame = function() {
    document.addEventListener(
        "keydown",
        function(e) {
            h161111.data.keyDown = e.keyCode;
        });
    h161111.functions.stepGame();
};

h161111.functions.stepGame = function() {
    h161111.functions.drawGame();

    actor = h161111.data.actors[0];
    if (actor.type === 'me') {
        if (h161111.data.keyDown !== null) {
            h161111.functions.moveMe();
            h161111.data.keyDown = null;
            h161111.data.actors.shift();
            h161111.data.actors.push(actor);
        }
    }
    else {
        h161111.functions.moveNpc();
        h161111.data.actors.shift();
        h161111.data.actors.push(actor);
    }

    window.requestAnimationFrame(function() {
        h161111.functions.stepGame();
    });
};

h161111.functions.drawGame = function() {
    h161111.data.context.clearRect(0, 0, h161111.data.canvas.width, h161111.data.canvas.height);

    for (var i = 0; i < h161111.data.actors.length; i++) {
        actor = h161111.data.actors[i];
        if (actor.type === 'me') {
            actor_position_x = actor.position.x * 30;
            actor_position_y = (actor.position.y + 1) * 30;
            offset_x = h161111.data.canvas.width / 2 - actor_position_x;
            offset_y = h161111.data.canvas.height / 2 - actor_position_y;
        }
    }

    for (var i = 0; i < h161111.data.dungeon.length; i++) {
        tile = h161111.data.dungeon[i];
        canvas_x = tile.position.x * 30 + offset_x;
        canvas_y = (tile.position.y + 1) * 30 + offset_y;
        if (tile.type === 'floor') {
            canvas_character = '.';
        }
        else if (tile.type === 'wall') {
            canvas_character = '#';
        }

        h161111.data.context.fillText(canvas_character, canvas_x, canvas_y);
    }

    for (var i = 0; i < h161111.data.actors.length; i++) {
        actor = h161111.data.actors[i];
        canvas_x = actor.position.x * 30 + offset_x;
        canvas_y = (actor.position.y + 1) * 30 + offset_y;
        if (actor.type === 'me') {
            canvas_character = '@';
        }
        else if (actor.type === 'troll') {
            canvas_character = 'T';
        }
        else if (actor.type === 'ghost') {
            canvas_character = 'G';
        }

        h161111.data.context.fillText(canvas_character, canvas_x, canvas_y);
    }
};

h161111.functions.moveMe = function() {
    actor = h161111.data.actors[0];
    if (h161111.data.keyDown === 38) {
        actor.position.y -= 1;
    }
    else if (h161111.data.keyDown === 40) {
        actor.position.y += 1;
    }
    else if (h161111.data.keyDown === 37) {
        actor.position.x -= 1;
    }
    else if (h161111.data.keyDown === 39) {
        actor.position.x += 1;
    }
}

h161111.functions.moveNpc = function() {
    // noop
}

h161111.functions.createDungeon = function(dungeon, width, height) {
    console.log("woho");

    if (width < 6) {
        console.log('haha', dungeon);
        return dungeon;
    }

    // top wall
    for (var i = 0; i < height; i++) {
        dungeon.push({ type: 'wall', position: { x: i, y: 0 } });
        dungeon.push({ type: 'wall', position: { x: i, y: width } });
    }

    // left and right wall
    for (var i = 1; i < width; i++) {
        dungeon.push({ type: 'wall', position: { x: 0, y: i } });
        dungeon.push({ type: 'wall', position: { x: height - 1, y: i } });
    }

    return h161111.functions.createDungeon(dungeon, Math.floor(width / 2), Math.floor(height / 2))
}
