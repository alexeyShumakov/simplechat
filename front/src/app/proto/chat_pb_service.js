// package: chat
// file: chat.proto

var chat_pb = require("./chat_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Messenger = (function () {
  function Messenger() {}
  Messenger.serviceName = "chat.Messenger";
  return Messenger;
}());

Messenger.CreateMessage = {
  methodName: "CreateMessage",
  service: Messenger,
  requestStream: false,
  responseStream: false,
  requestType: chat_pb.Message,
  responseType: chat_pb.Message
};

Messenger.GetCounters = {
  methodName: "GetCounters",
  service: Messenger,
  requestStream: true,
  responseStream: true,
  requestType: chat_pb.Message,
  responseType: chat_pb.Counters
};

Messenger.MessengerChat = {
  methodName: "MessengerChat",
  service: Messenger,
  requestStream: true,
  responseStream: true,
  requestType: chat_pb.Message,
  responseType: chat_pb.Message
};

exports.Messenger = Messenger;

function MessengerClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

MessengerClient.prototype.createMessage = function createMessage(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Messenger.CreateMessage, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

MessengerClient.prototype.getCounters = function getCounters(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(Messenger.GetCounters, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

MessengerClient.prototype.messengerChat = function messengerChat(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(Messenger.MessengerChat, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.MessengerClient = MessengerClient;

