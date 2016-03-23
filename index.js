var fs = require('fs');
var path = require('path');

var getChar = function (chars) {
    var i = Math.ceil(Math.random() * (chars.length - 1));
    return chars[i];
}
var getCodeStr = function (chars, len) {
    var r = '';
    for (var i = 0; i < len; i++) r += getChar(chars);
    return r;
}
var getItem = function (arr) {
    var i = Math.ceil(Math.random() * (arr.length - 1));
    return arr[i];
}
var force2number = function (value, defaultValue) {
    if (typeof value == 'number') return value;
    if (typeof value == 'string') {
        if (/^\d+$/.test(value)) return Number(value);
        return defaultValue;
    }
    return defaultValue;
};
var update = function (o1, o2) {
    o1 = o1 || {}, o2 = o2 || {};
    for (var k in o2) {
        if (o1.hasOwnProperty(k)) {
            if (typeof o2[k] == 'string') {
                if (/^\d+$/.test(o2[k])) {
                    o2[k] = Number(o2[k]);
                } else {
                    continue;
                }
            }
            o1[k] = o2[k];
        }
    }
    return o1;
};
// Thanks to pollys'mkdir-p: https://github.com/pillys/mkdir-p.git
var mkdir = function (dist, handler) {
    dist = path.resolve(dist);
    fs.exists(dist, function (isExists) {
        if (!isExists) {
            mkdir(path.dirname(dist), function () {
                fs.mkdir(dist, function (err) {
                    handler && handler(err);
                })
            })
        } else {
            handler && handler(null);
        }
    })
}
var mkdirSync = function (dist) {
    dist = path.resolve(dist);
    if (!fs.existsSync(dist)) {
        mkdirSync(path.dirname(dist));
        fs.mkdirSync(dist);
    }
}

var Captcha = function () {
    this.width = 72;
    this.height = 36;
    this.lineNumber = 0;
    this.charNumber = 4;
};
Captcha.prototype.config = function (options) {
    update(this, options);
    return this;
};
Captcha.prototype.create = function () {
    var Canvas = require('canvas'),
        Image = Canvas.Image,
        canvas = new Canvas(this.width, this.height),
        ctx = canvas.getContext('2d');

    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var fontSizes = [ '14px', '18px', '20px', '24px'];
    var fontFamilies = [ 'Impact', 'Arial', 'Georgia', 'sans-serif', 'Helvetica', 'monospace' ];
    var colors = [ 'rgba(0, 0, 0, 0.5)', 'rgba(22, 85, 255, 0.5)', 'rgba(97, 18, 132, 0.5)', 'rgba(67, 67, 67, 0.5)', 'rgba(228, 0, 16, 0.5)' ];
    var pos = [ { x: 10, y: this.height / 2 }, { x: 0, y: this.height * 8 / 9 } ];
    var lines = this.lineNumber;

    var strokeLine = function (width, height, colors) {
        var lineStart = {
            x: Math.random() * width / 3,
            y: Math.random() * height
        };
        var lineEnd = {
            x: Math.random() * width,
            y: Math.random() * height
        };
        ctx.beginPath();
        ctx.strokeStyle = getItem(colors);
        ctx.moveTo(lineStart.x, lineStart.y);
        ctx.lineTo(lineEnd.x, lineEnd.y);
        ctx.stroke();
    };

    var fontSize = getItem(fontSizes),
        fontFamily = getItem(fontFamilies),
        code = getCodeStr(chars, this.charNumber),
        color = getItem(colors),
        deg = (Math.random() * 2 - 1) * (Math.PI / 12),
        pos = deg > 0 ? pos[0] : pos[1],
        baseLine = deg > 0 ? 'top' : 'bottom';

    this.code = code;

    // draw chars
    ctx.font = fontSize + ' ' + fontFamily;
    ctx.fillStyle = color;
    ctx.textBaseLine = baseLine;
    ctx.rotate(deg);
    ctx.fillText(code, pos.x, pos.y);

    // draw lines
    while (lines--) strokeLine(this.width, this.height, colors);

    this.base64URL = canvas.toDataURL();
    return this;
};
Captcha.prototype.save = function (options) {
    if (!this.base64URL) return console.error('Cann\'t save the image before create, please called Captcha#create() first.');

    options = options || {};
    dirname = options.dirname || './captcha';
    filename = options.filename || 'jacket-captcha';
    var ext = this.base64URL.match(/^data:image\/(\w+);base64,/)[1];

    var base64Data = this.base64URL.replace(/^data:image\/\w+;base64,/, '');
    var dataBuffer = new Buffer(base64Data, 'base64');

    mkdir(dirname, function (err) {
        if (err) return console.error('Error in making directory: ' + dirname);
        var file = path.join(dirname, filename + '.' + ext);
        fs.writeFile(file, dataBuffer, function (err) {
            if (err) return console.error('Error in making file: ' + file);
            // console.log(file + ' successfully saved!');
        })
    })
};
Captcha.prototype.getCode = function () {
    if (!this.code) {
        console.warn('Captcha warning: cann\'t getCodes before Captcha#create() has been called.');
        this.code = '';
    }
    return this.code;
};
Captcha.prototype.getBase64URL = function () {
    if (!this.base64URL) {
        console.warn('Captcha warning: cann\'t getBase64URL before Captcha#create() has been called.');
        this.base64URL = '';
    }
    return this.base64URL;
};

module.exports = new Captcha;
