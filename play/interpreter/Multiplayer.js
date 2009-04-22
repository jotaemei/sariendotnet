/// Multiplayer - The tiny multiplayer javascript engine
/// Copyright (c) 2009 by Q42 Internet B.V.
/// Written by Martin Kool
var Multiplayer = {

  // preset user id and interval timer
  id: -1,
  timer: 0, // timeout
  connected: false, // set to true once the server gives back an id
  disconnected: false, // set to true once disconnected
  props: {}, // containing the name/value pairs to send next ping
  events: [], // containing [name,value] events to send next ping
  sentPersistentPropertyValues: {}, // stores sent persistent values, to prevent sending too much
  errorCount: 0,


  init: function(url, interval, eventListener, propDefs) {
    /// <summary>Initializes the Multiplayer engine and sets the required url, interval and handlers.</summary>
    /// <param name="url" type="string">Url to ping to, for example "/ping.aspx".</param>
    /// <param name="interval" type="integer">Interval in milliseconds between each ping.</param>
    /// <param name="eventListener" type="function">Javascript handler to handle any property changes. 
    /// The handler receives 3 arguments: id, name, value</param>
    /// <param name="propDefs" type="object">name/boolean pairs indicating persistency or not. Example: 
    /// { "name": true, "x": true, "say": false } </param>
    window.onunload = this.disconnect;
    this.url = url;
    this.interval = interval;
    this.eventListener = eventListener;
    // add room and persistent to propDefs
    propDefs["room"] = true; // persist
    propDefs["disconnect"] = false;
    this.propDefs = propDefs;
  },


  connect: function(props, room) {
    /// <summary>Connects to the Multiplayer server with a given set of properties, and a room (optional)</summary>
    /// <param name="props" type="object">Object containing the initial property name/value pairs of this user.</param>
    /// <param name="room" type="string" optional="true">Name of the room to connect to (optional).</param>

    if (room) props["room"] = room;
    this.send(props, true);
  },


  disconnect: function() {
    /// <summary>Disconnects from the current room.</summary>

    Multiplayer.send({ "disconnect": true }, true);
    Multiplayer.disconnected = true;
  },


  send: function(props, now) {
    /// <summary>Stores name/value properties for sending.</summary>
    /// <param name="props" type="object">The property name/value pairs to send to the server.</param>
    /// <param name="now" type="boolean" optional="true">When set to true, the send is followed 
    /// immediately by a ping (optional).</param>

    for (var name in props) {
      var persistent = Multiplayer.propDefs[name];
      if (typeof persistent == "undefined") continue;

      // only send non-persistent events, or persistent properties that have changed
      if (!persistent)
        Multiplayer.events.push([name, props[name]]);
      else if (Multiplayer.sentPersistentPropertyValues[name] != props[name])
        Multiplayer.props[name] = props[name];
    }
    if (now)
      Multiplayer.ping();
  },


  ping: function() {
    /// <summary>Pings the server and sends name/value pairs added by the send method.</summary>

    if (Multiplayer.disconnected) return;

    // clear scheduled timer
    clearTimeout(Multiplayer.timer);

    // if we have received an id from the server, use that id for following pings
    if (Multiplayer.connected) Multiplayer.events.push(["id", Multiplayer.id]);

    var ps = "";

    // add persistent props that have changed    
    for (var name in Multiplayer.props) {
      ps += ((ps == "") ? "" : "&") + name + "=" + escape(Multiplayer.props[name]);
      Multiplayer.sentPersistentPropertyValues[name] = Multiplayer.props[name];
    }
    // add non-persistent events
    for (var i = 0; i < Multiplayer.events.length; i++)
      ps += ((ps == "") ? "" : "&") + Multiplayer.events[i][0] + "=" + escape(Multiplayer.events[i][1]);

    // generate the xhr and set the readystatechange handler
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XmlHttp");
    xhr.open("POST", Multiplayer.url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-length", ps.length);
    xhr.setRequestHeader("sarien", "net");
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && window && window.Multiplayer) Multiplayer.handleResponse(xhr.responseText);
    }
    xhr.send(ps);
    Multiplayer.props = {};
    Multiplayer.events = [];

    // schedule next ping
    Multiplayer.timer = setTimeout("Multiplayer.ping()", Multiplayer.interval);
  },

  handleResponse: function(js) {
    /// <summary>Handles a ping response containing our id, changed events and disconnected users.</summary>
    /// <param name="js" type="string">String containing the javascript part to evaluate.</param>

    // prepare info variable and try/catch the evaluation of the server response
    var info = 0;
    try {
      eval("info = {" + js + "};");
    }
    catch (e) {
      // count the errors
      Multiplayer.errorCount++;
    }
    if (!info) return;

    // store my id for future pings
    if (!Multiplayer.connected && info.id >= 0) {
      Multiplayer.id = info.id;
      Multiplayer.connected = true;
    }
    // handle events
    for (var i = 0; i < info.events.length; i++) {
      var evt = info.events[i];
      Multiplayer.eventListener(evt[0], evt[1], evt[2]);
    }
  }
};