// BoolzApp
// DESCRIZIONE:
//
// Milestone 1:
// Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse (quindi tutto statico);
// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando invia il testo viene aggiunto al thread sopra, come messaggio verde (quindi solo quello NON aggiungiamo dinamicamente anche quello bianco di risposta)
//
// Milestone 2:
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
// Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)
//
// Milestone 3:
// Click sul contatto mostra la conversazione del contatto cliccato,
// è possibile inserire nuovi messaggi per ogni conversazione
// Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato

$(document).ready (function() {
  // DICHIARAZIONE VARIABILI GLOBALI -------------------------------------------

  var iconaSend = $(".right-input i");
  var btnInvioMsg = $(".btn-invio-msg");
  var input = $(".center-input input");
  var searchInput = $(".search-chat input");
  var listaContatti = $(".contatto");
  var conversazioni = $(".chat-box");
  var btnMsgOption = $(".opzioni-msg");

  // DICHIARAZIONE FUNZIONI ----------------------------------------------------

  // funzione che stampa nella chat box il messaggio scritto dall'utente, e risponde con "ok" dopo 1 secondo
  function inviaMsg() {
    var testoMsg = input.val();
    var chatActive = $(".chat-box.active");

    // controllo che l'utente abbia scritto qualcosa
    if(testoMsg != "") {
      input.val("");

      chatActive.append('<div class="messaggio inviato"><div class="corpo-msg"><p class="text-msg">' + testoMsg + '</p><span class="time-msg">13:36</span></div><div class="opzioni-msg"><i class="fas fa-ellipsis-v"></i></div><div class="menu-msg"><span>Cancella messaggio</span></div></div>');

      // messaggio di risposta automatico dopo un secondo
      setTimeout (function () {
        chatActive.append('<div class="messaggio ricevuto"><div class="corpo-msg"><p class="text-msg">ok</p><span class="time-msg">11:15</span></div><div class="opzioni-msg"><i class="fas fa-ellipsis-v"></i></div><div class="menu-msg"><span>Cancella messaggio</span></div></div>');
      }, 1000);
    }
  }

  // funzione che cambia l'icona di invio quando si clicca sull'area di testo
  function swapIconSend() {
    iconaSend.toggleClass("fab fa-telegram-plane fas fa-microphone");
  }


  // funzione che ricerca tra i contatti in base all'input dell'utente
  function ricerca() {
    var txtRicerca = searchInput.val();
    var listaContatti = $(".contatto");
    listaContatti.each(function() {
      var nomeContatto = $(this).find(".preview-left h2").text();

      if(!nomeContatto.toUpperCase().includes(txtRicerca.toUpperCase())) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  }

  // INIZIO CODICE -------------------------------------------------------------

  // richiamo la funzione inviaMsg al click sull'icona
  btnInvioMsg.click(inviaMsg);

  // invio il msg premendo "INVIO" sulla tastiera
  $(input).keydown(
    function (event) {
      if(event.which == 13) {
        inviaMsg();
      }
    }
  );

  // cambio l'icona del microfono quando sto scrivendo un messaggio
  input.on("focusin focusout",
  function () {
    swapIconSend();
    }
  );

  // eseguo la ricerca ogni volta che l'utente inizia a scrivere qualcosa
  // sull'input search
  $(searchInput).keyup(ricerca);

  // al click su un contatto tolgo la classe active a tutti gli elementi e la
  // assegno solo a quello cliccato
  // mi salvo il valore del data attribute "conv" e lo uso per andare ad
  // assegnare la classe "active" alla chat corrispondente
  listaContatti.click(
    function () {
      var indice = $(this).data("conv");
      listaContatti.each(
        function () {
          $(this).removeClass("active");
        }
      )
      $(this).addClass("active");
      conversazioni.each(
        function () {
          $(this).removeClass("active");
          if($(this).data("conv") == indice) {
            $(this).addClass("active");
          }
        }
      )
    }
  );

  // funzione che al click sull'icona opzioni mi apre il menu a tendina
  conversazioni.on("click", ".opzioni-msg",
    function () {
      $(this).siblings(".menu-msg").toggleClass("visible");
    }
  );

  // funzione che al click su "cancella messaggio" elimina il relativo messaggio
  conversazioni.on("click", ".menu-msg span",
    function () {
      $(this).parents(".messaggio").remove();
    }
  );


});
