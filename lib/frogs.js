"use strict";

var FrogsFlies = React.createClass({
  displayName: "FrogsFlies",

  getInitialState: function getInitialState() {
    return { running: false };
  },

  componentWillMount: function componentWillMount() {
    document.getElementById("canvas").height = window.innerHeight * 0.9;
    document.getElementById("canvas").width = window.innerWidth * 0.9;
  },

  startGame: function startGame(num, e) {
    e.preventDefault();
    this.game = new Game(num, this.endGame);
    this.bindControls(num);
    this.setState({ running: true });
    this.game.run();
  },

  endGame: function endGame() {
    this.setState({ running: false });
    this.unbindControls();
  },

  bindControls: function bindControls(num) {
    // bind 1player always
    var game = this.game;
    window.key("a, s, d, w", function (e) {
      e.preventDefault();
      game.frogs[0].jump();
    });
    window.key("space", function (e) {
      e.preventDefault();
      game.frogs[0].lick();
    });
    if (num === 2) {
      window.key("left, right, up", function (e) {
        e.preventDefault();
        game.frogs[1].jump();
      });
      window.key("down", function (e) {
        e.preventDefault();
        game.frogs[1].lick();
      });
      //bind 2player
    }
  },

  unbindControls: function unbindControls() {
    // unbind everything
  },

  render: function render() {
    if (this.state.running) {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          null,
          "Frogs and Flies!"
        ),
        React.createElement(
          "p",
          null,
          "player 1 controls: asdw to jump, lctrl or space to eat"
        ),
        React.createElement(
          "p",
          null,
          "player 2 controls: arrow keys to jump, down or rctrl to eat"
        ),
        React.createElement(
          "p",
          null,
          "We'll make the instructions prettier eventually"
        )
      );
    }
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "Frogs and Flies!"
      ),
      "Select players: ",
      React.createElement(
        "button",
        { onClick: this.startGame.bind(null, 1) },
        "1"
      ),
      React.createElement(
        "button",
        { onClick: this.startGame.bind(null, 2) },
        "2"
      ),
      React.createElement(
        "p",
        null,
        "player 1 controls: asdw to jump, lctrl or space to eat"
      ),
      React.createElement(
        "p",
        null,
        "player 2 controls: arrow keys to jump, down or rctrl to eat"
      ),
      React.createElement(
        "p",
        null,
        "We'll make the instructions prettier eventually"
      )
    );
  }
});

ReactDOM.render(React.createElement(FrogsFlies, null), document.getElementById("content"));