import { API_URL } from '../../stores/api_url';

function EditorGameCard(props) {

  const submitData = () => {

    fetch(`${API_URL}games/${props.game.id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
    .catch((error) => console.log(error));
  }

  return (
    <div className="editor-game-card">
      <h4>{props.game.game_title.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}</h4>
      <p>APIKey : <span className="apikey">{props.apikey.api_key}</span></p>
      <button onClick={() => submitData()}>Delete Game</button>
    </div>
    );

}

export default EditorGameCard;
