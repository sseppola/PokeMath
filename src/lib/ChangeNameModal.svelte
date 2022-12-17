<script lang="ts">
	import { player } from "./player";
  
  export let visible = false;
  let username = player.playerData.username;

  export let closeModal = () => {
    visible = false;
  }

  let playerData = player.playerData;
  player.subscribe((newPlayerData) => {
    playerData = newPlayerData;
  });

  const onChange = (e: InputEvent) => {
    username = e.target?.value;
  }

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    player.setUsername(username);
  }
</script>

<div id="id01 change-name-modal" class="modal" style="display: {visible ? 'block' : 'none'}">
	<span on:click={closeModal} class="close" title="Close Modal">&times;</span>
	<form class="modal-content" on:submit={handleSubmit}>
		<div class="container">
			<h1>Endre navn</h1>
			<label for="name"><b>Navn</b></label>
			<input type="name" placeholder="Skriv inn nytt navn" name="username" value={username} on:change={onChange} required />
			<div class="clearfix">
				<button type="button" on:click={closeModal} class="cancelbtn button-1">
          Avbryt
        </button>
				<button type="submit" class="signupbtn button-1">Lagre</button>
			</div>
		</div>
	</form>
</div>

<style>
  
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: #474e5d;
  padding-top: 50px;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}


/* The Close Button (x) */
.close {
  position: absolute;
  right: 35px;
  top: 15px;
  font-size: 40px;
  font-weight: bold;
  color: #f1f1f1;
}

.close:hover,
.close:focus {
  color: #f44336;
  cursor: pointer;
}

/* Clear floats */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}


/* Change styles for cancel button and signup button on extra small screens */
@media screen and (max-width: 300px) {
  .cancelbtn, .signupbtn {
     width: 100%;
  }
}


.button-1.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #e0bbbe;
  border-radius: 100px;
  box-shadow: rgba(187, 44, 44, 0.2) 0 -25px 18px -14px inset,rgba(187, 44, 44, .15) 0 1px 2px,rgba(187, 44, 44, .15) 0 2px 4px,rgba(187, 44, 44, .15) 0 4px 8px,rgba(187, 44, 44, .15) 0 8px 16px,rgba(187, 44, 44, .15) 0 16px 32px;
  color: rgb(128, 0, 0);
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
}


/* CSS */
.button-1 {
  background-color: #c2fbd7;
  border-radius: 100px;
  box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px;
  color: green;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  -webkit-transition: all 250ms;
  -moz-transition: all 250ms;
  -ms-transition: all 250ms;
  -o-transition: all 250ms;
}

.button-1:hover:not(.disabled):not(.centerposition) {
  box-shadow: rgba(44,187,99,.35) 0 -25px 18px -14px inset,rgba(44,187,99,.25) 0 1px 2px,rgba(44,187,99,.25) 0 2px 4px,rgba(44,187,99,.25) 0 4px 8px,rgba(44,187,99,.25) 0 8px 16px,rgba(44,187,99,.25) 0 16px 32px;
  transform: scale(1.05) rotate(-1deg);
  -webkit-transform: scale(1.05) rotate(-1deg);
  -moz-transform: scale(1.05) rotate(-1deg);
  -ms-transform: scale(1.05) rotate(-1deg);
  -o-transform: scale(1.05) rotate(-1deg);
}

</style>