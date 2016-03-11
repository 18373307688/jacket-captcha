var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;
chai.should();

describe('index.js', function() {
  var validationImage;

  before(function () {
    delete require.cache[require.resolve(process.cwd() + '/index.js')];
    validationImage = require('../index');
  });

  after(function () {
    validationImage = null;
  });

  it('validationImage should be an object', function () {
    assert.equal('object', typeof validationImage);
  });
  it('validationImage\'s width should be 72 by default', function () {
    assert.equal(72, validationImage.width);
  });
  it('validationImage\'s height should be 36 by default', function () {
    assert.equal(36, validationImage.height);
  });
  it('validationImage\'s lineNumber should be 0 by default', function () {
    assert.equal(0, validationImage.lineNumber);
  });
  it('validationImage\'s charNumber should be 4 by default', function () {
    assert.equal(4, validationImage.charNumber);
  });

  // validationImage#config(options)
  describe('validationImage#config(options)', function () {
    var validationImage;

    beforeEach(function () {
      delete require.cache[require.resolve(process.cwd() + '/index.js')];
      validationImage = require('../index');
    });
    afterEach(function () {
      validationImage = null;
    });

    it('validationImage#config should be a function', function () {
      assert.equal('function', typeof validationImage.config);
    });
    it('validationImage\'s properties should be the default value when the argument `options` of validationImage#config is null', function () {
      validationImage.config();
      assert.equal(72, validationImage.width);
      assert.equal(36, validationImage.height);
      assert.equal(0, validationImage.lineNumber);
      assert.equal(4, validationImage.charNumber);
    });
    it('options.width = 80, validationImage.width should be 80', function () {
      validationImage.config({ width: 80 });
      assert.equal(80, validationImage.width);
    });
    it('options.width = \'80\', validationImage.width should be 80', function () {
      validationImage.config({ width: '80' });
      assert.equal(80, validationImage.width);
    });
    it('options.width = \'8ac\', validationImage.width should be the default value: 72', function () {
      validationImage.config({ width: '8ac' });
      assert.equal(72, validationImage.width);
    });
    it('validationImage\'s properties should be successfully updated', function () {
      validationImage.config({
        width: 82,
        height: 32,
        lineNumber: '6',
        charNumber: '5a'
      });
      assert.equal(82, validationImage.width);
      assert.equal(32, validationImage.height);
      assert.equal(6, validationImage.lineNumber);
      assert.equal(4, validationImage.charNumber);
    });
  });

  // validationImage#create()
  describe('validationImage#create()', function () {
    var validationImage;

    beforeEach(function () {
      delete require.cache[require.resolve(process.cwd() + '/index.js')];
      validationImage = require('../index');
    });
    afterEach(function () {
      validationImage = null;
    });

    it('should create a validation code', function () {
      var obj = validationImage.config({ charNumber: 6 }).create();
      expect(obj.code).to.match(/^[a-zA-Z0-9]+$/);
      assert.equal(6, obj.code.length);
    });
    it('should create a base64 url', function () {
      var obj = validationImage.create();
      expect(obj.base64URL).to.match(/^data:image\/\w+;base64,/);
    });
  });

  // validationImage#createBase64URL()
  describe('validationImage#getBase64URL()', function () {
    var validationImage;

    beforeEach(function () {
      delete require.cache[require.resolve(process.cwd() + '/index.js')];
      validationImage = require('../index');
    });
    afterEach(function () {
      validationImage = null;
    });

    it('should return a base64 url', function () {
      var url = validationImage.create().getBase64URL();
      expect(url).to.match(/^data:image\/\w+;base64,/);
    });
  });

  // validationImage#getCodes()
  describe('validationImage#getCodes()', function () {
    var validationImage;

    beforeEach(function () {
      delete require.cache[require.resolve(process.cwd() + '/index.js')];
      validationImage = require('../index');
    });
    afterEach(function () {
      validationImage = null;
    });

    it('should return a validation code(string)', function () {
      var code = validationImage.create().getCode();
      expect(code).to.match(/^[a-zA-Z0-9]+$/);
    });
  })
});























