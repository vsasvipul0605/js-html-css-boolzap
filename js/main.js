$(document).ready (function() {
  var btnInvioMsg = $(".btn-invio-msg");

  // funzione che stampa nella chat box il messaggio scritto dall'utente
  function inviaMsg() {
    var input = $(".center-input input");
    var testoMsg = input.val();
    input.val("");

    $(".chat-box").append("<div class='messaggio inviato'><p class='text-msg'>" + testoMsg +  "</p><span class='time-msg'>11:15</span></div>");
  }

  // richiamo la funzione inviaMsg al click sull'icona
  btnInvioMsg.click(inviaMsg);










});
