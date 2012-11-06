/*globals describe, it, beforeEach*/
var assert = require('assert');

GLOBAL._ = require('underscore');

describe('underscore.inflector', function () {
  beforeEach(function () {
    require('./../underscore.inflection.js');
  });

  describe('pluralize', function () {
    it('should pluralize the given noun', function () {
      assert.equal(_.pluralize('post'), 'posts');
    });

    it('should return the same word if it cannot be pluralized', function () {
      assert.equal(_.pluralize('posts'), 'posts');
    });

    describe('with a number', function () {
      it('should pluralize the word if not 1', function () {
        assert.equal(_.pluralize('post', 0), 'posts');
      });

      it('should pluralize the word if non-1 float', function () {
        assert.equal(_.pluralize('post', 1.5), 'posts');
      });

      it('should not pluralize the word if 1', function () {
        assert.equal(_.pluralize('post', 1), 'post');
      });

      it('should singularize the word if 1', function () {
        assert.equal(_.pluralize('posts', 1), 'post');
      });

      describe('and true', function () {
        it('should include the word with the plural', function () {
          assert.equal(_.pluralize('post', 0, true), '0 posts');
        });

        it('should include the word with the singular', function () {
          assert.equal(_.pluralize('post', 1, true), '1 post');
        });
      });
    });
  });

  describe('singularize', function () {
    it('should singularize the given noun', function () {
      assert.equal(_.singularize('posts'), 'post');
    });

    it('should return the same word if it cannot be singularized', function () {
      assert.equal(_.singularize('post'), 'post');
    });

    it('should singularize a word that contains an irregular', function () {
      assert.equal(_.singularize('comments'), 'comment');
    });
  });
});
