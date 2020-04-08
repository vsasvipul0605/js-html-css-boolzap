// BoolzApp
// DESCRIZIONE:
// Milestone 1:
// Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse (quindi tutto statico);
// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando invia il testo viene aggiunto al thread sopra, come messaggio verde (quindi solo quello NON aggiungiamo dinamicamente anche quello bianco di risposta)

// Milestone 2:
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
// Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

$(document).ready (function() {
  // DICHIARAZIONE VARIABILI GLOBALI -------------------------------------------

  var iconaSend = $(".right-input i");
  var btnInvioMsg = $(".btn-invio-msg");
  var input = $(".center-input input");
  var searchInput = $(".search-chat input");

  // DICHIARAZIONE FUNZIONI ----------------------------------------------------

  // funzione che stampa nella chat box il messaggio scritto dall'utente, e risponde con "ok" dopo 1 secondo
  function inviaMsg() {
    var testoMsg = input.val();

    // controllo che l'utente abbia scritto qualcosa
    if(testoMsg != "") {
      input.val("");

      $(".chat-box").append("<div class='messaggio inviato'><p class='text-msg'>" + testoMsg +  "</p><span class='time-msg'>11:15</span></div>");

      // messaggio di risposta automatico dopo un secondo
      setTimeout (function () {
        $(".chat-box").append("<div class='messaggio ricevuto'><p class='text-msg'>ok</p><span class='time-msg'>11:15</span></div>");
      }, 1000);
    }
  }

  // funzione che cambia l'icona di invio quando si clicca sull'area di testo
  function swapIconSend() {
    iconaSend.toggleClass("fab fa-telegram-plane fas fa-microphone");
  }

  // INIZIO CODICE -------------------------------------------------------------

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


  $(document).keyup(function () {
    var txtRicerca = searchInput.val();
    var listaContatti = $(".conversation");
    listaContatti.each(function() {
      var nomeContatto = $(this).find(".preview h2").text();

      if(!nomeContatto.toUpperCase().includes(txtRicerca.toUpperCase())) {
        $(this).hide();
      } else {
        $(this).show();
      }
    })


  });








});
