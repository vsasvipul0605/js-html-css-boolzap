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
  var headerChat = $(".main-info");



  // INIZIO CODICE -------------------------------------------------------------

  // richiamo la funzione inviaMsg al click sull'icona
  btnInvioMsg.click(inviaMsg);

  // invio il msg premendo "INVIO" sulla tastiera
  $(input).keydown(inviaMsgEnter);

  // cambio l'icona del microfono quando sto scrivendo un messaggio
  input.on("focusin focusout", swapIconSend);

  // eseguo la ricerca ogni volta che l'utente inizia a scrivere qualcosa
  // sull'input search
  $(searchInput).keyup(ricerca);

  // mostro la chat corrispondente al click su un contatto
  listaContatti.click(mostraChat);

  // funzione che al click sull'icona opzioni mi apre il menu a tendina
  conversazioni.on("click", ".opzioni-msg", showMenu);

  // cancella messaggio
  conversazioni.on("click", ".menu-msg span", cancellaMsg);


  // DICHIARAZIONE FUNZIONI ----------------------------------------------------

  // funzione che stampa nella chat box il messaggio scritto dall'utente, e risponde con "ok" dopo 1 secondo
  function inviaMsg() {
    var testoMsg = input.val();
    var msgRisposta = "ok";
    var chatActive = $(".chat-box.active");
    var contattoActive = $(".contatto.active");
    var currentDate = new Date();
    var minuti = currentDate.getMinutes();
    var ora = currentDate.getHours() + ":" + getFullMinutes(minuti);

    // funzione per aggiungere uno zero ai minuti se sono < di 10
    function getFullMinutes (minuti) {
      if(minuti < 10) {
        minuti = "0" + minuti;
      }
      return minuti;
    }

    // controllo che l'utente abbia scritto qualcosa
    if(testoMsg != "") {
      input.val("");

      chatActive.append('<div class="messaggio inviato"><div class="corpo-msg"><p class="text-msg">' + testoMsg + '</p><span class="time-msg">' + ora + '</span></div><div class="opzioni-msg"><i class="fas fa-ellipsis-v"></i></div><div class="menu-msg"><span>Cancella</span></div></div>');
      // mostro nel campo preview il msg inviato
      contattoActive.find(".preview-left p").text(testoMsg);
      $(".active-chat-info").find("h5").text("Sta scrivendo...");

      // messaggio di risposta automatico dopo un secondo
      setTimeout (function () {
        chatActive.append('<div class="messaggio ricevuto"><div class="corpo-msg"><p class="text-msg">' + msgRisposta + '</p><span class="time-msg">' + ora + '</span></div><div class="opzioni-msg"><i class="fas fa-ellipsis-v"></i></div><div class="menu-msg"><span>Cancella</span></div></div>');
        // scrivo nel campo preview l'ultimo msg inviato e aggiorno l'ora dell'ultimo accesso
        contattoActive.find(".preview-left p").text(msgRisposta);
        contattoActive.find(".preview-right span").text(ora);
        $(".active-chat-info").find("h5").text("Ultimo accesso oggi alle " + ora);
      }, 1000);
    }

  }

  // funzione che invia il msg premendo "INVIO" sulla tastiera
  function inviaMsgEnter(event) {
    if(event.which == 13) {
      inviaMsg();
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

  // al click su un contatto tolgo la classe active a tutti gli elementi e la
  // assegno solo a quello cliccato
  // mi salvo il valore del data attribute "conv" e lo uso per andare ad
  // assegnare la classe "active" alla chat corrispondente
  function mostraChat() {
    var indice = $(this).data("conv");
    var imgCliccata, nomeCliccato, ultimoAccesso;
    listaContatti.removeClass("active");
    $(this).addClass("active");
    // salvo un riferimento alle info dell'utente cliccato
    imgCliccata = $(this).find(".user-img").html();
    nomeCliccato = $(this).find(".preview-left h2").text();
    ultimoAccesso = $(this).find(".preview-right span").text();
    conversazioni.removeClass("active");
    $(".chat-box[data-conv='" + indice + "']").addClass("active");
    // inserisco le info dell'utente cliccato nell'header della chat
    headerChat.find(".user-img").html(imgCliccata);
    headerChat.find(".active-chat-info h2").text(nomeCliccato);
    headerChat.find(".active-chat-info h5").text("Ultimo accesso oggi alle " + ultimoAccesso);
  }

  // funzione che mostra il sottomenu delle opzioni messaggio
  function showMenu() {
    $(".menu-msg").removeClass("visible");
    $(this).siblings(".menu-msg").toggleClass("visible");
  }

  // funzione che al click su "cancella messaggio" elimina il relativo messaggio e aggiorna l'anteprima della chat
  function cancellaMsg() {
    $(this).parents(".messaggio").remove();
    var lastMsg = $(".chat-box.active .text-msg").last();
    var lastTime = $(".chat-box.active .time-msg").last();
    $(".contatto.active").find(".preview-left p").text(lastMsg.text());
    $(".contatto.active").find(".preview-right span").text(lastTime.text());
  }

});
