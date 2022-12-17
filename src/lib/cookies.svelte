<script lang="ts">
  import {setAcceptCookies, checkACookieExists} from './cookies';
  import {isServerRender} from './isServerRender';

  let displayStyle = 'none';

  $ : {
    if (!isServerRender() && !checkACookieExists('cookies')) {
      displayStyle = 'block';
      setAcceptCookies(); // re-accept cookies to extend expiry
    }
  }

  function acceptCookies(){
    displayStyle = 'none';
    setAcceptCookies();
  }
</script>

<div class="cookie-container" id="cookie-container" style="display: {displayStyle};">
	<h2 class="cookie-header">Cookie Policy</h2>
	<div class="">
		<p class="cookie-text">
			Denne siden bruker Cookies. Disse bruker vi for å kunne lagre pokèmonene og spillerdataen din
			på din enhet. Ved å bruke denne siden godkjenner du vår <a href="/about#cookies"
				>Cookie Policy
			</a>(Engelsk). Siden vil ikke fungere optimalt om du ikke godkjenner bruken av cookies.
		</p>
		<button class="button-1" on:click={acceptCookies}> Okay! </button>
		<a class="button-2" href="/about#cookies"> Mer informasjon. </a>
	</div>
</div>

<style>
.cookie-container{
  position: fixed;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px 4px rgb(0 0 0 / 30%);
  --bg-opacity: 1;
  background-color: #fff;
  background-color: rgba(255,255,255,var(--bg-opacity));
  padding: 1rem;
  border-top-width: 4px;
  bottom: 55px;
  right: 5px;
  z-index: 10000;
  border-radius: 10px;
  max-width: 40%;
  min-width: 300px;
  display: block;
}

.cookie-header{
  font-weight: 800;
  font-size: 32px;
}
.cookie-text{
  font-weight: 500;
}
</style>