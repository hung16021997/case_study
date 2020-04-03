function play_game()
{
    let level = 160;
    let w = 45;
    let h = 30;
    let scores = 1;
    let snake_color = "#006699";
    let ctx;
    let arr = [];
    let x_dir = [-1, 0, 1, 0];
    let y_dir = [0, -1, 0, 1];
    let queue = [];
    let food = 1;
    let map = [];
    let MR = Math.random;
    let X = 5 + (MR() * (w - 10))|0;
    let Y = 5 + (MR() * (h - 10))|0;
    let direction = MR() * 3 | 0;
    let interval = 0;
    let score = 0;
    let sum = 0;
    let i;
    let dir;
    let easy = 0;

    let c = document.getElementById('playArea');
    ctx = c.getContext('2d');

    for (i = 0; i < w; i++)
    {
        map[i] = [];
    }

    function rand_food()
    {
        let x, y;
        do
        {
            x = MR() * w|0;
            y = MR() * h|0;
        }
        while (map[x][y]);
        map[x][y] = 1;
        ctx.fillStyle = snake_color;
        ctx.strokeRect(x * 10+1, y * 10+1, 8, 8);
    }
    rand_food();
    function set_game_speed()
    {
        if (easy)
        {
            X = (X+w)%w;
            Y = (Y+h)%h;
        }
        --scores;
        if (arr.length)
        {
            dir = arr.pop();
            if ((dir % 2) !== (direction % 2))
            {
                direction = dir;
            }
        }
        if ((easy || (0 <= X && 0 <= Y && X < w && Y < h)) && 2 !== map[X][Y])
        {
            if (1 === map[X][Y])
            {
                score+= 1;
                scores = 1;
                rand_food();
                food++;
            }

            ctx.fillRect(X * 10, Y * 10, 9, 9);
            map[X][Y] = 2;
            queue.unshift([X, Y]);
            X+= x_dir[direction];
            Y+= y_dir[direction];
            if (food < queue.length)
            {
                dir = queue.pop()
                map[dir[0]][dir[1]] = 0;
                ctx.clearRect(dir[0] * 10, dir[1] * 10, 10, 10);
            }
        }
        else if (!arr.length)
        {
             msg_score = document.getElementById("msg");
            msg_score.innerHTML = "Kết thúc trò chơi.<br /> Điểm của  : <b>"+score+"</b><br /><br /><input type='button' value='chơi lại' onclick='window.location.reload();' />";
            document.getElementById("playArea").style.display = 'none';
            window.clearInterval(interval);
        }
    }
    interval = window.setInterval(set_game_speed, level);

    function run() {
        window.addEventListener("keydown", keyPress);
    }
    function keyPress(event) {
        switch (event.keyCode) {
            case 37:
                snack.moveLeft();
                break;
            case 38:
                snack.moveUp();
                break;
            case 39:
                snack.moveRight();
                break;
            case 40:
                snack.moveDown();
                break;
        }
    }

    document.onkeydown = function(e) {
        let code = e.keyCode - 37;
        if (0 <= code && code < 4 && code !== arr[0])
        {
            arr.unshift(code);
        }
        else if (-5 == code)
        {
            if (interval)
            {
                window.clearInterval(interval);
                interval = 0;
            }
            else
            {
                interval = window.setInterval(set_game_speed, 60);
            }
        }
        else
        {
            dir = sum + code;
            if (dir == 30||dir==60||dir==90||dir==171) {
                sum+= code
            } else if (dir === 200) easy = 1;
        }
    }
}
