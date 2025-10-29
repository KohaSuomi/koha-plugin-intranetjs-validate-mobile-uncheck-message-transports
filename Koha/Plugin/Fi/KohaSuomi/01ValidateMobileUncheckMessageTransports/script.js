/* Puhelinnumeron muodon tarkistus ja email/sms-viestitäpät*/

$(document).ready(function () {

  if (window.location.href.indexOf("members/memberentry.pl") > -1) {

    $('#SMSnumber').attr('disabled', 'disabled');
    // Replace forms "Save" button
    // (otherwise form is sent regardless validation checks made here)
    var language = $(".currentlanguage").text();
    var save_text;
    if (language == "Suomi") {
      save_text = "Tallenna";
      $('.sms_number_help').text("Arvo kopioituu Matkapuhelin-kentästä tallennettaessa.");
    } else if (language == "Svenska") {
      save_text = "Spara";
      $('.sms_number_help').text("Värdet kopieras från fältet Mobiltelefon när det sparas.");
    } else {
      save_text = "Save";
      $('.sms_number_help').text("The value is copied from the Mobile phone field when saved.");
    }

    $('#pat_memberentrygen #saverecord').replaceWith('<button class="btn btn-primary" id="modified_saverecord"><i class="fa fa-save"></i> ' + save_text + '</button>');

    var isvalid = 1;
    var all_phone_regex = REPLACE_BY_CONFIG_PARAM_A;

    $('#phone').blur(function () {
      var error_mes = "";
      var phone = $('#phone').val();

      if (phone && !all_phone_regex.test(phone)) {
        error_mes = error_mes + "\nPlease enter a valid phone number.\n";
        $('#phone').after('<label id="phone-error" class="error" for="phone">' + error_mes + '</label>');
        isvalid = 0;
      } else {
        isvalid = 1;
      }
    });

    $('#mobile').blur(function () {
      var error_mes = "";
      var mobile = $('#mobile').val();

      if (mobile && !all_phone_regex.test(mobile)) {
        error_mes = error_mes + "\nPlease enter a valid mobile number.\n";
        $('#mobile').after('<label id="mobile-error" class="error" for="mobile">' + error_mes + '</label>');
        isvalid = 0;
      } else {
        isvalid = 1;
      }
    });

    $('#SMSnumber').blur(function () {
      var error_mes = "";
      var SMSnumber = $('#SMSnumber').val();

      if (SMSnumber && !all_phone_regex.test(SMSnumber)) {
        error_mes = error_mes + "\nPlease enter a valid SMS number.\n";
        $('#SMSnumber').after('<label id="SMSnumber-error" class="error" for="SMSnumber">' + error_mes + '</label>');
        isvalid = 0;
      } else {
        isvalid = 1;
      }
    });

    $('#modified_saverecord').click(function (e) {
      var text = "";
      if (isvalid == 1) {
        //Vahvista viestitäppien poisto jos sähköposti/matkapuhelin puuttuu popupissa

        if (!$('#email').val()) {
          // check any email checkbox from #email1 .. #email14
          var anyEmailChecked = false;
          for (var i = 1; i <= 14; i++) {
            var $emailEl = $('#email' + i);
            if ($emailEl.length && $emailEl.prop('checked')) {
              anyEmailChecked = true;
              break;
            }
          }

          if (anyEmailChecked) {
            text = "Sähköpostiosoite puuttuu. Sähköposti-viestiasetukset poistetaan.\n";
            // uncheck and disable all email checkboxes #email1 .. #email14 that exist
            for (var j = 1; j <= 14; j++) {
              var $e = $('#email' + j);
              if ($e.length) {
                $e.prop('checked', false).prop('disabled', true);
              }
            }
          }
        }
        if (!$('#mobile').val()) {
          // check any sms checkbox from #sms1 .. #sms14
          var anySmsChecked = false;
          for (var i = 1; i <= 14; i++) {
            var $sms = $('#sms' + i);
            if ($sms.length && $sms.prop('checked')) {
              anySmsChecked = true;
              break;
            }
          }

          if (anySmsChecked) {
            text += "Matkapuhelinnumero puuttuu. Tekstiviesti-viestiasetukset poistetaan.";
            // uncheck and disable all sms checkboxes #sms1 .. #sms14 that exist
            for (var j = 1; j <= 14; j++) {
              var $smsEl = $('#sms' + j);
              if ($smsEl.length) {
                $smsEl.prop('checked', false).prop('disabled', true);
              }
            }
          }
        }

        if (text.charAt(0)) {
          alert(text);
        }

        $("#entryform").submit();
      }
    }
    );
  }
});
//LOPPU

///ALKU///
/* Tiketti 538 Lisää viestitäppiin checked-arvot jo ne laitettaessa, jolloin viestiasetusten tarkistus onnistuu ensimmäisellä asiakastietojen tallennuskerralla */

$(document).ready(function () {
  if (window.location.href.indexOf("members/memberentry.pl") > -1) {
    var classA = Array.from(document.getElementsByClassName("pmp_sms"))
      , classB = Array.from(document.getElementsByClassName("pmp_email"))
      , result = Array.from(new Set(classA.concat(classB)));

    for (var i = 0; i < result.length; i++) {
      result[i].onclick = function () {
        var checkStatus = $(this).is(':checked');

        if (checkStatus) {
          $(this).attr('checked', 'checked');
        }
        else {
          $(this).removeAttr('checked');
        }
      };
    }
  }
});
///LOPPU///