$(document).ready (function() {
  var iconaSend = $(".right-input i");
  var btnInvioMsg = $(".btn-invio-msg");
  var input = $(".center-input input");

  // funzione che stampa nella chat box il messaggio scritto dall'utente
  function inviaMsg() {
    var testoMsg = input.val();

    // controllo che l'utente abbia scritto qualcosa
    if(testoMsg != "") {
      input.val("");

      $(".chat-box").append("<div class='messaggio inviato'><p class='text-msg'>" + testoMsg +  "</p><span class='time-msg'>11:15</span></div>");
    }
  }

  // funzione che cambia l'icona di invio quando si clicca sull'area di testo
  function swapIconSend() {
    iconaSend.toggleClass("fab fa-telegram-plane fas fa-microphone");
  }

  // richiamo la funzione inviaMsg al click sull'icona
  btnInvioMsg.click(inviaMsg);

  // invio il msg premendo "INVIO" sulla tastiera
  $(document).keydown(function (event) {
    if(event.which == 13) {
      inviaMsg();
    }
  });

  // cambio l'icona del microfono quando sto scrivendo un messaggio
  input.on({
    focusin: function() {
      swapIconSend();
    }, focusout: function() {
      swapIconSend();
    }
  });











});
