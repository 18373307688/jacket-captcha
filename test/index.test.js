var assert = require('assert');

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

  describe('validationImage#create(options)', function () {
    var validationImage;

    beforeEach(function () {
      delete require.cache[require.resolve(process.cwd() + '/index.js')];
      validationImage = require('../index');
    });
    afterEach(function () {
      validationImage = null;
    });

    it('validationImage#create should be a function', function () {
      assert.equal('function', typeof validationImage.create);
    });
    it('validationImage\'s properties should be the default value when the argument `options` of validationImage#create is null', function () {
      validationImage.create();
      assert.equal(72, validationImage.width);
      assert.equal(36, validationImage.height);
      assert.equal(0, validationImage.lineNumber);
      assert.equal(4, validationImage.charNumber);
    });
    it('options.width = 80, validationImage.width should be 80', function () {
      validationImage.create({ width: 80 });
      assert.equal(80, validationImage.width);
    });
    it('options.width = \'80\', validationImage.width should be 80', function () {
      validationImage.create({ width: '80' });
      assert.equal(80, validationImage.width);
    });
    it('options.width = \'8ac\', validationImage.width should be the default value: 72', function () {
      validationImage.create({ width: '8ac' });
      assert.equal(72, validationImage.width);
    });
  });
});