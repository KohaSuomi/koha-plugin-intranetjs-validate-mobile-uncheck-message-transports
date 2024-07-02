
/* Puhelinnumeron muodon tarkistus ja email/sms-viestitäpät*/

$(document).ready(function () {
    if (window.location.href.indexOf("members/memberentry.pl") > -1) {
  
     // Replace forms "Save" button 
     // (otherwise form is sent regardless validation checks made here) 
     var language = $(".currentlanguage").text();
     var save_text; 
     if(language == "Suomi"){
       save_text = "Tallenna";
     }else if(language == "Svenska"){
       save_text = "Spara";
     }else {
       save_text = "Save";
     }
  
    $('#pat_memberentrygen #saverecord').replaceWith('<button class="btn btn-primary" id="modified_saverecord"><i class="fa fa-save"></i> '+save_text+'</button>');
  
      var isvalid = 1;
  
      $('#phone').blur(function () {
        var error_mes = "";
        var phone = $('#phone').val();
        var phone_reg = REPLACE_BY_CONFIG_PARAM_A;
  
        if (phone && !phone_reg.test(phone)) {
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
        var mobile_reg = REPLACE_BY_CONFIG_PARAM_A;
  
        if (mobile && !mobile_reg.test(mobile)) {
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
        var SMSnumber_reg = REPLACE_BY_CONFIG_PARAM_A;
  
        if (SMSnumber && !SMSnumber_reg.test(SMSnumber)) {
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
            if ($('#email1').attr('checked') || $('#email2').attr('checked') || $('#email3').attr('checked') || $('#email4').attr('checked') || $('#email5').attr('checked') || $('#email6').attr('checked') || $('#email10').attr('checked')) {
              text = "Sähköpostiosoite puuttuu. Sähköposti-viestiasetukset poistetaan.\n";
              $('#email1').removeAttr('checked');
              $('#email1').attr('disabled', 'disabled');
              $('#email2').removeAttr('checked');
              $('#email2').attr('disabled', 'disabled');
              $('#email3').removeAttr('checked');
              $('#email3').attr('disabled', 'disabled');
              $('#email4').removeAttr('checked');
              $('#email4').attr('disabled', 'disabled');
              $('#email5').removeAttr('checked');
              $('#email5').attr('disabled', 'disabled');
              $('#email6').removeAttr('checked');
              $('#email6').attr('disabled', 'disabled');
              $('#email10').removeAttr('checked');
              $('#email10').attr('disabled', 'disabled');
            }
          }
          if (!$('#mobile').val()) {
            if ($('#sms1').attr('checked') || $('#sms4').attr('checked') || $('#sms10').attr('checked')) {
              text += "Matkapuhelinnumero puuttuu. Tekstiviesti-viestiasetukset poistetaan.";
              $('#sms1').removeAttr('checked');
              $('#sms1').attr('disabled', 'disabled');
              $('#sms4').removeAttr('checked');
              $('#sms4').attr('disabled', 'disabled');
              $('#sms10').removeAttr('checked');
              $('#sms10').attr('disabled', 'disabled');
            }
          }
  
          if (text.charAt(0)){
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
       ,classB = Array.from(document.getElementsByClassName("pmp_email"))
       ,result = Array.from(new Set(classA.concat(classB)));
  
  for (var i = 0; i < result.length; i ++) {
        result[i].onclick = function(){
      var checkStatus = $(this).is(':checked');   
  
      if(checkStatus){
          $(this).attr('checked', 'checked');
      }
      else{
          $(this).removeAttr('checked');
      }
     };
    }
  }});
  ///LOPPU///