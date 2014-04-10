(function() {
  module.exports = {
    config: {
      hipchat: {
        environment: {
          type: 'String',
          "default": '# custom blah'
        },
        prepare: {
          type: 'String',
          "default": '# custom blah'
        },
        test: {
          type: 'String',
          "default": '# custom blah'
        },
        deploy: {
          type: 'String',
          "default": '# custom blah'
        },
        cleanup: {
          type: 'String',
          "default": '# custom blah'
        }
      }
    }
  };

}).call(this);
