"use strict";

const
    racketISpeed = 10,  // racket's initial speed in pixels per second
    racketAcc = 1,  // racket's absolute acceleration in pixels per second squared
    racketInfluenceCoefficient = 10
;

const
    ballColor   = "#FF0000",
    racketColor = "#0095DD"
;

const
    brickColors = ["#C74B43", "#CA6F3A", "#B17B33", "#A1A22B", "#44A24A", "#414AC9"],  // top to bottom
    brickHeight = 16,
    brickRowGap = 5,
    brickXOffset = 20,
    brickYOffset = 100
;

const beepAudio = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");

const scorePerBrick = 10;

let lives = 3;

let ctx;

let height, width;

let rightPressed = false,
    leftPressed  = false
;

let brickNCols,
    brickWidth,
    brickColGap
;

let world = {
    ballR: 10,
    ballX: undefined,
    ballY: undefined,
    ballSpeed: 400,  // pixels per second
    ballAngle: -getRandomIntInclusive(195, 345) * Math.PI / 180 ,  // Counter-Clockwise in Radians

    racketCenter: undefined,
    racketWidth: undefined,  // must be an even integer
    racketHeight: 16,  // must be an even integer
    racketVelocity: 0,  // negative for left, positive for right

    bricks: undefined,  // 2D array of bools; true represents a brick that still exist

    score: 0,

    lastTS: undefined,  // last timestamp (DOMHighResTimeStamp) we processed (milliseconds)
};


window.onload = function () {
    if (window.screen.lockOrientation)
        window.screen.lockOrientation("portrait");

    const canvas = document.getElementById("canvas");
    if (!canvas.getContext) {
        console.log("getContext evaluates to false!");
        return;
    }

    width  = canvas.clientWidth;
    height = canvas.clientHeight;

    // Set the canvas' dimensions, taking the device pixel ratio into consideration:
    ctx           = canvas.getContext("2d");
    canvas.width  = canvas.clientWidth  * window.devicePixelRatio;
    canvas.height = canvas.clientHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Disable image smoothing
    ctx.imageSmoothingEnabled = false;

    //
    document.addEventListener("keydown", function (ev) {
        if(ev.keyCode === 39 && !rightPressed) {
            // In case the user presses the right key (while still holding the left key pressed),
            // discard the (fact that) left key (is still pressed) and act as if only the right
            // key is pressed.
            if (leftPressed)
                leftPressed = false;

            world.racketVelocity = racketISpeed;
            rightPressed = true;
        }
        else if(ev.keyCode === 37 && !leftPressed) {
            // Same as the previous if statement.
            if (rightPressed)
                rightPressed = false;

            world.racketVelocity = -racketISpeed;
            leftPressed = true;
        }
    }, false);
    document.addEventListener("keyup", function (ev) {
        if(ev.keyCode === 39 && rightPressed) {
            world.racketVelocity = 0;
            rightPressed = false;
        }
        else if(ev.keyCode === 37 && leftPressed) {
            world.racketVelocity = 0;
            leftPressed = false;
        }
    }, false);

    // For touch
    canvas.addEventListener("touchstart", function (ev) {
        ev.preventDefault();

        let touch = ev.changedTouches[0];

        if (touch.pageX < canvas.clientWidth / 2) {
            world.racketVelocity = -racketISpeed;
            leftPressed = true;
            rightPressed = false;
        } else {
            world.racketVelocity = racketISpeed;
            rightPressed = true;
            leftPressed = false;
        }
    }, false);
    canvas.addEventListener("touchend", function (ev) {
        ev.preventDefault();

        leftPressed = false;
        rightPressed = false;
        world.racketVelocity = 0;
    }, false);

    initializeWorld();

    // Kick-start the game loop:
    window.requestAnimationFrame(loop);
};


function randomBall() {
    world.ballX = Math.trunc(width / 2);
    world.ballY = 300;
}

function initializeWorld() {
    randomBall();
    world.racketCenter = width / 2;
    world.racketWidth = ensureEvenInt(width * 0.3);

    const brickWidthGapRatio = 10;

    brickNCols  = 19;
    brickColGap = ((width - 2 * brickXOffset) / (brickWidthGapRatio + 1)) / (brickNCols - 1);
    brickWidth  = (((width - 2 * brickXOffset) / (brickWidthGapRatio + 1)) * brickWidthGapRatio) / (brickNCols);


    world.bricks = Array(brickNCols);
    for (let i = 0; i < brickNCols; i++)
        world.bricks[i] = Array(brickColors.length).fill(true);

    world.lastTS = performance.now();
}


function ensureEvenInt(num) {
    const i = Math.trunc(num);

    return i % 2 ? i - 1 : i;
}


function loop(now) {
    /**
     * timestamp: DOMHighResTimeStamp <https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp>
     */

    const timePassed = now - world.lastTS;
    world.lastTS = now;

    moveRacket();
    moveBall(world.ballX, world.ballY, world.ballSpeed, world.ballAngle, timePassed);

    repaint();

    window.requestAnimationFrame(loop);
}


function drawBricks() {
    for (let [ci, col] of world.bricks.entries()) {
        for (let [ri, row] of col.entries()) {
            if (!row)
                continue;

            ctx.fillStyle = brickColors[ri];

            const [x, y] = brickCR2XY(ci, ri);

            ctx.fillRect(
                x - brickWidth / 2,
                y - brickHeight / 2,
                brickWidth,
                brickHeight
            );
        }
    }
}


function brickCR2XY(ci, ri) {
    return [
        brickXOffset + ci * (brickWidth + brickColGap) + brickWidth / 2,
        brickYOffset + ri * (brickHeight + brickRowGap) + brickHeight / 2,
    ];
}


function brickXY2CR(x, y) {
    return [
        // TODO: round or trunc?
        // currently round seems to give better results w.r.t. accuracy
        Math.round((x - brickWidth / 2 - brickXOffset) / (brickWidth + brickColGap)),
        Math.round((y - brickHeight / 2 - brickYOffset) / (brickHeight + brickRowGap))
    ];
}


function printText() {
    const fontHeight = 24;
    const madeBy = "breakout";
    let tm;

    ctx.fillStyle = "#FFFFFF";
    ctx.font      = fontHeight + "px monospace";

    ctx.fillText(world.score, 0, fontHeight);

    tm = ctx.measureText(madeBy);
    ctx.fillText(madeBy, (width - tm.width) / 2, fontHeight, tm.width);

    tm = ctx.measureText(lives);
    ctx.fillText(lives, width - tm.width, fontHeight, tm.width);
}


function beep() {
    beepAudio.play();
}


function moveRacket() {
    if (!world.racketVelocity)
        return;

    world.racketCenter += world.racketVelocity;

    if (world.racketCenter - world.racketWidth / 2 < 0) {
        world.racketCenter = world.racketWidth / 2;
        world.racketVelocity = 0;
    }
    else if (world.racketCenter + world.racketWidth / 2 > width) {
        world.racketCenter = width - world.racketWidth / 2;
        world.racketVelocity = 0;
    }
    else
        world.racketVelocity += Math.sign(world.racketVelocity) * racketAcc;
}

function moveBall(x, y, speed, angle, timePassed) {
    world.ballX += (timePassed / 1000) * speed * Math.cos(angle);
    world.ballY += (timePassed / 1000) * speed * Math.sin(angle);

    if (0 >= world.ballX - world.ballR || world.ballX + world.ballR >= width) {
        world.ballAngle = -(world.ballAngle - Math.PI);
    }

    if (0 >= world.ballY - world.ballR) {
        world.ballAngle *= -1;
    }
    else if (ballVCollidesBrick()) {
        beep();
        world.score += scorePerBrick;
        world.ballAngle *= -1;

        const [ci, ri] = brickXY2CR(world.ballX, world.ballY);
        world.bricks[ci][ri] = false;
    }
    else if (world.ballY + world.ballR >= height - world.racketHeight) {
        world.ballAngle *= -1;

        if (isRacketUnderneathTheBall()) {
            // The racket's velocity should exert influence on ball's x dimension.
            world.ballAngle = Math.atan2(
                world.ballSpeed * Math.sin(world.ballAngle),
                world.ballSpeed * Math.cos(world.ballAngle) + racketInfluenceCoefficient * world.racketVelocity
            );
        }
        else {
            // Player lost control of the ball!
            lives--;
            if (lives <= 0) {
                repaint();
                alert("Game Over! You scored " + world.score);
                location.reload(true);
            } else {
                randomBall();
            }
        }
    }
}

function ballVCollidesBrick() {
    const [ci, ri] = brickXY2CR(world.ballX, world.ballY);

    return (
        // The ball is in close proximity of the brick that is closest to it
        (0 <= ci && ci < brickNCols && 0 <= ri && ri < brickColors.length)
        // AND that brick exists
        && world.bricks[ci][ri]
    );
}


function isRacketUnderneathTheBall() {
    return (
        world.racketCenter - world.racketWidth / 2 <= world.ballX
        && world.ballX <= world.racketCenter + world.racketWidth / 2
    );
}


function drawBall(color) {
    ctx.beginPath();
    ctx.arc(world.ballX, world.ballY, world.ballR, 0, 2*Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}


function drawRacket(color) {
    ctx.fillStyle = color;
    ctx.fillRect(
        world.racketCenter - world.racketWidth / 2, height - world.racketHeight, world.racketWidth, world.racketHeight);
}


function clearScreen() { ctx.clearRect(0, 0, width, height); }


function repaint() {
    clearScreen();
    printText();
    drawRacket(racketColor);
    drawBall(ballColor);
    drawBricks();
}



function getRandomIntInclusive(min, max) {
    // The maximum is inclusive and the minimum is inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
