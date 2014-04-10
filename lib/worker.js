var template = require('lodash.template');
var Hipchat = require('node-hipchat');

   // { failMessage: 'Test run failed',
   //   passMessage: 'Test run passed...',
   //   startMessage: 'Test run started...',
   //   from: 'Strider',
   //   failColor: 'red',
   //   passColor: 'green',
   //   startColor: 'green',
   //   roomId: '221211',
   //   authToken: 'dsdasdas' },


function notifyHipchat (config, msg) {
  var hc = new Hipchat(config.authToken);

  var params = {
    room: config.roomId,
    from: config.from,
    color: config[msg.event + 'Color'],
    message: template(config[msg.event + 'Message'], msg.context)
  };

  return hc.postMessage(params, function() {
    return {};
  });
}

module.exports = {
  init: function(config, context, done) {
    done(null, {
      listen: function(io, context) {

        var msg_context = {
          url:    context.job.project.display_url,
          name:   context.job.project.display_name,
          branch: context.branch,
          job:    config.serverUrl + '/' + context.job.project.name + '/job/' + context.job._id,
          type:   context.job.type
        };

        io.on('job.status.deployed', function(id, d) {
          notifyHipchat(config, {
            context: msg_context,
            event: d.exitCode === 0 ? 'pass': 'fail',
          });
        });
      },
      prepare: function(context, done) {
        var msg_context = {
          url:    context.job.project.display_url,
          name:   context.job.project.display_name,
          branch: context.branch,
          job:    config.serverUrl + '/' + context.job.project.name + '/job/' + context.job._id,
          type:   context.job.type
        };

        notifyHipchat(config, {
          event: 'start',
          context: msg_context
        });

        return done();
      }
    });
  }
};
