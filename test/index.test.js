var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;
chai.should();

describe('index.js', function() {
  var jCaptchaObj;

  before(function () {
    delete require.cache[require.resolve(process.cwd() + '/index.js')];
    jCaptchaObj = require('../index');
  });

  after(function () {
    jCaptchaObj = null;
  });

  it('jCaptchaObj should be an object', function () {
    assert.equal('object', typeof jCaptchaObj);
  });
  it('jCaptchaObj\'s width should be 72 by default', function () {
    assert.equal(72, jCaptchaObj.width);
  });
  it('jCaptchaObj\'s height should be 36 by default', function () {
    assert.equal(36, jCaptchaObj.height);
  });
  it('jCaptchaObj\'s lineNumber should be 0 by default', function () {
    assert.equal(0, jCaptchaObj.lineNumber);
  });
  it('jCaptchaObj\'s charNumber should be 4 by default', function () {
    assert.equal(4, jCaptchaObj.charNumber);
  });

  // jCaptchaObj#config(options)
  describe('jCaptchaObj#config(options)', function () {
    var jCaptchaObj;

    beforeEach(function () {
      delete require.cache[require.resolve(process.cwd() + '/index.js')];
      jCaptchaObj = require('../index');
    });
    afterEach(function () {
      jCaptchaObj = null;
    });

    it('jCaptchaObj#config should be a function', function () {
      assert.equal('function', typeof jCaptchaObj.config);
    });
    it('jCaptchaObj\'s properties should be the default value when the argument `options` of jCaptchaObj#config is null', function () {
      jCaptchaObj.config();
      assert.equal(72, jCaptchaObj.width);
      assert.equal(36, jCaptchaObj.height);
      assert.equal(0, jCaptchaObj.lineNumber);
      assert.equal(4, jCaptchaObj.charNumber);
    });
    it('options.width = 80, jCaptchaObj.width should be 80', function () {
      jCaptchaObj.config({ width: 80 });
      assert.equal(80, jCaptchaObj.width);
    });
    it('options.width = \'80\', jCaptchaObj.width should be 80', function () {
      jCaptchaObj.config({ width: '80' });
      assert.equal(80, jCaptchaObj.width);
    });
    it('options.width = \'8ac\', jCaptchaObj.width should be the default value: 72', function () {
      jCaptchaObj.config({ width: '8ac' });
      assert.equal(72, jCaptchaObj.width);
    });
    it('jCaptchaObj\'s properties should be successfully updated', function () {
      jCaptchaObj.config({
        width: 82,
        height: 32,
        lineNumber: '6',
        charNumber: '5a'
      });
      assert.equal(82, jCaptchaObj.width);
      assert.equal(32, jCaptchaObj.height);
      assert.equal(6, jCaptchaObj.lineNumber);
      assert.equal(4, jCaptchaObj.charNumber);
    });
  });

  // jCaptchaObj#create()
  describe('jCaptchaObj#create()', function () {
    var jCaptchaObj;

    beforeEach(function () {
      delete require.cache[require.resolve(process.cwd() + '/index.js')];
      jCaptchaObj = require('../index');
    });
    afterEach(function () {
      jCaptchaObj = null;
    });

    it('should create a validation code', function () {
      var obj = jCaptchaObj.config({ charNumber: 6 }).create();
      expect(obj.code).to.match(/^[a-zA-Z0-9]+$/);
      assert.equal(6, obj.code.length);
    });
    it('should create a base64 url', function () {
      var obj = jCaptchaObj.create();
      expect(obj.base64URL).to.match(/^data:image\/\w+;base64,/);
    });
  });

  // jCaptchaObj#save()
  describe('jCaptchaObj#save(options)', function () {
    var jCaptchaObj;

    beforeEach(function () {
      delete require.cache[require.resolve(process.cwd() + '/index.js')];
      jCaptchaObj = require('../index');
      fs = require('fs');
    });
    afterEach(function () {
      jCaptchaObj = null;
      fs = null;
    });

    it('should save the captcha image \'captcha/jacket-captcha.png\' if didnot pass the argument `options`', function (done) {
      jCaptchaObj.create().save();
      setTimeout(function () {
        expect(fs.existsSync('./captcha/jacket-captcha.png')).to.be.true;
        done();
      }, 1000);
    });
    it('should save the captcha image \'a/b/c/asdf.png\' if didnot pass the argument `options` = { dirname=\'a/b/c\', filename=\'asdf\' }', function (done) {
      jCaptchaObj.create().save({ dirname: 'a/b/c', filename: 'asdf' });
      setTimeout(function () {
        // it will take a few moment to write file, so wait for 1s to test
        expect(fs.existsSync('./a/b/c/asdf.png')).to.be.true;
        done();
      }, 1000);
    });
  });

  // jCaptchaObj#createBase64URL()
  describe('jCaptchaObj#getBase64URL()', function () {
    var jCaptchaObj;

    beforeEach(function () {
      delete require.cache[require.resolve(process.cwd() + '/index.js')];
      jCaptchaObj = require('../index');
    });
    afterEach(function () {
      jCaptchaObj = null;
    });

    it('should return a base64 url', function () {
      var url = jCaptchaObj.create().getBase64URL();
      expect(url).to.match(/^data:image\/\w+;base64,/);
    });
  });

  // jCaptchaObj#getCodes()
  describe('jCaptchaObj#getCodes()', function () {
    var jCaptchaObj;

    beforeEach(function () {
      delete require.cache[require.resolve(process.cwd() + '/index.js')];
      jCaptchaObj = require('../index');
    });
    afterEach(function () {
      jCaptchaObj = null;
    });

    it('should return a validation code(string)', function () {
      var code = jCaptchaObj.create().getCode();
      expect(code).to.match(/^[a-zA-Z0-9]+$/);
    });
  })
});























