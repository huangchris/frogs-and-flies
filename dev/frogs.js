var FrogsFlies = React.createClass({
  getInitialState: function () {
    return {running: false}
  },

  componentWillMount: function () {
    document.getElementById("canvas").height = window.innerHeight * 0.9;
    document.getElementById("canvas").width = window.innerHeight * 0.9;
  },

  startGame: function (num, e) {
    e.preventDefault();
    this.game = new Game(num,this.endGame);
    this.bindControls(num);
    this.setState({running: true})
    this.game.run();
  },

  endGame: function() {
    this.setState({running:false})
    this.unbindControls();
  },

  bindControls: function(num) {
    // bind 1player always
    var game = this.game;
    window.key("a, s, d, w", function(e){
      e.preventDefault();
      game.frogs[0].jump();
    })
    window.key("space", function(e){
      e.preventDefault();
      game.frogs[0].lick();
    })
    if (num === 2) {
      window.key("left, right, up", function(e){
        e.preventDefault();
        game.frogs[1].jump();
      })
      window.key("down", function(e){
        e.preventDefault();
        game.frogs[1].lick();
      })
      //bind 2player
    }
  },

  unbindControls: function() {
    // unbind everything
    key.unbind("a, s, d, w, space, left, right, up, down")
  },

  render: function () {
    if (this.state.running){
      return <div><h1>Frogs and Flies!</h1>
      <p>player 1 controls: asdw to jump, space to eat</p>
      <p>player 2 controls: arrow keys to jump, down to eat</p>
      <p>We'll make the instructions prettier eventually</p>
      </div>
    }
    return <div><h1>Frogs and Flies!</h1>
      Select players: <button onClick={this.startGame.bind(null,1)}>1 Player</button>
    <button onClick={this.startGame.bind(null,2)}>2 Players</button>
      <p>player 1 controls: asdw to jump, space to eat</p>
      <p>player 2 controls: arrow keys to jump, down to eat</p>
      <p>We'll make the instructions prettier eventually</p>
    </div>
  }
})

ReactDOM.render(<FrogsFlies/>,document.getElementById("content"))
