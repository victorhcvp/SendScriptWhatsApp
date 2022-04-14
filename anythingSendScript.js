// word = a palavra que vai ser enviada em loop infinito
// timesPerMessage = quantas vezes a palavra vai ser repetida por mensagem
// use document.scriptStop = true para encerrar o loop infinito manualmente, ou atualize a página
async function sendAnything(word, timesPerMessage) {
	const main = document.querySelector("#main");
	const textarea = main.querySelector(`div[contenteditable="true"]`);

	if(!textarea) throw new Error("Não há uma conversa aberta");

	document.scriptStop = false;

	let message = word;

	if(timesPerMessage > 1) {
		for(var i = 0; i < timesPerMessage; i++) {
			message += word;
		}
	}

	while(!document.scriptStop) {
		textarea.textContent = message;
		textarea.dispatchEvent(new InputEvent("input", { bubbles: true }));

		(main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`)).click();

		await new Promise(resolve => setTimeout(resolve, 250));
	}

	return true;
}

await sendAnything('HA', 100);