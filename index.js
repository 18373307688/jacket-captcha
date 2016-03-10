var ValidationImage = function () {};
// http://www.programering.com/a/MzN1YDMwATE.html
ValidationImage.prototype.create = function (options) {
    var options = options || {};
    var CANVAS_WIDTH = options.width || 72,
        CANVAS_HEIGHT = options.height || 36,
        LINE_NUMS = options.lineNumber,
        CHAR_NUMS = options.charNumber || 4;

    var Canvas = require('canvas'),
        Image = Canvas.Image,
        canvas = new Canvas(CANVAS_WIDTH, CANVAS_HEIGHT),
        ctx = canvas.getContext('2d');

    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var fontSizes = [ '14px', '18px', '20px', '24px'];
    var fontFamilies = [ 'Impact', 'Arial', 'Georgia', 'sans-serif', 'Helvetica', 'monospace' ];
    var colors = [ 'rgba(0, 0, 0, 0.5)', 'rgba(22, 85, 255, 0.5)', 'rgba(97, 18, 132, 0.5)', 'rgba(67, 67, 67, 0.5)', 'rgba(228, 0, 16, 0.5)' ];
    var pos = [ { x: 10, y: CANVAS_HEIGHT / 2 }, { x: 0, y: CANVAS_HEIGHT * 8 / 9 } ];
    var getChar = function (chars) {
        var i = Math.ceil(Math.random() * (chars.length - 1));
        return chars[i];
    }
    var getItem = function (arr) {
        var i = Math.ceil(Math.random() * (arr.length - 1));
        return arr[i];
    }
    var getCodeStr = function (chars, len) {
        var r = '';
        for (var i = 0; i < len; i++) r += getChar(chars);
        return r;
    }
    var strokeLine = function () {
        var lineStart = {
            x: Math.random() * CANVAS_WIDTH / 3,
            y: Math.random() * CANVAS_HEIGHT
        };
        var lineEnd = {
            x: Math.random() * CANVAS_WIDTH,
            y: Math.random() * CANVAS_HEIGHT
        };
        // 线
        ctx.beginPath();
        ctx.strokeStyle = getItem(colors);
        ctx.moveTo(lineStart.x, lineStart.y);
        ctx.lineTo(lineEnd.x, lineEnd.y);
        ctx.stroke();
    }

    var fontSize = getItem(fontSizes),
        fontFamily = getItem(fontFamilies),
        char = getCodeStr(chars, CHAR_NUMS),
        color = getItem(colors),
        deg = (Math.random() * 2 - 1) * (Math.PI / 12),
        pos = deg > 0 ? pos[0] : pos[1],
        baseLine = deg > 0 ? 'top' : 'bottom';

    // 字符
    ctx.font = fontSize + ' ' + fontFamily;
    ctx.fillStyle = color;
    ctx.textBaseLine = baseLine;
    ctx.rotate(deg);
    ctx.fillText(char, pos.x, pos.y);

    if (LINE_NUMS && typeof LINE_NUMS == 'number') while (LINE_NUMS--) strokeLine();

    return canvas.toDataURL();
}

module.exports = new ValidationImage;
