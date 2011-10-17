/* place JavaScript code here */
function startUp(){
    var liite;
    liite= Paivahoitohakemus_Form.getJSXByName("Liite_Liite").getValue();
   
    /* temp hack for testing. WDS service configured incorrectly at oulu-intalio-dev.os.ixonos.com */
      //liite=liite.replace("10.5.12.233", "oulu-intalio-dev.os.ixonos.com");

   if(liite==""){
        setDisplayForSection("liite_label",0);
        //Toimeentulotuki_Form.getJSXByName("liite_label").setText("Ei liitett&auml;").repaint();
    } else{
      var newtext;
       newtext="<a href=\""+liite+"\" target=\"_blank\">" +liite.substring(liite.lastIndexOf("/")+1, liite.length) +"</a>";
       Paivahoitohakemus_Form.getJSXByName("liite_label").setText(newtext).repaint();
    }

}
function getDownloadLink(param1){
      var href;
      href = Paivahoitohakemus_Form.getJSXByName(param1).getValue();
      window.open(href,'_blank','resizable,scrollbars');return false;
}
function setDisplayForDecision(){
//alert(Paivahoitohakemus_Form.getJSXByName("HoidonTarve_Osapaiva").getChecked());
//alert(Paivahoitohakemus_Form.getJSXByName("HoidonTarve_Kokopaiva").getChecked());
/*
if (Paivahoitohakemus_Form.getJSXByName("HoidonTarve_Kokopaiva").getChecked()) { 
          // alert("Kokopaiva"); 
    Paivahoitohakemus_Form.getJSXByName("paneKokopaivaAlkaa").setDisplay("block").repaint();
    Paivahoitohakemus_Form.getJSXByName("paneKokopaivaLoppuu").setDisplay("block").repaint();
}
if (Paivahoitohakemus_Form.getJSXByName("HoidonTarve_Osapaiva").getChecked()) {  
       //alert("Osapaiva");
    Paivahoitohakemus_Form.getJSXByName("paneOsapaivaAlkaa").setDisplay("block").repaint();
    Paivahoitohakemus_Form.getJSXByName("paneOsapaivaLoppuu").setDisplay("block").repaint();
}

if (Paivahoitohakemus_Form.getJSXByName("HoidonTarve_VuorohoitoKylla").getChecked()) {  
       //alert("Vuorohoito");
    Paivahoitohakemus_Form.getJSXByName("paneVuorohoitoKylla").setDisplay("block").repaint();
}
*/
setDisplayForSpouse();


}


/*
function prepareDisplay(){

//TESTITULOSTUKSET
alert("prepareDisplay()");
alert("Kokopaiva getChecked(): " + Paivahoitohakemus_Form.getJSXByName("HoidonTarve_Kokopaiva").getChecked());
alert("Kokopaiva getValue(): " + Paivahoitohakemus_Form.getJSXByName("HoidonTarve_Kokopaiva").getValue());
alert("Osapaiva getChecked(): " + Paivahoitohakemus_Form.getJSXByName("HoidonTarve_Osapaiva").getChecked());
alert("Osapaiva getValue(): " + Paivahoitohakemus_Form.getJSXByName("HoidonTarve_Osapaiva").getValue());
*/
/*
Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Tyyppi").setEnabled(jsx3.gui.Form.STATEENABLED).repaint();   
Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Tyyppi").setValue(Paivahoitohakemus_Form.getCache().getDocument("propsJoensuu_xml").selectSingleNode("//locale/record[@jsxid='Paeivaekoti']").getAttribute("jsxtext"));
Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Tyyppi").resetXmlCacheData();
Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Tyyppi").repaint();
Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Tyyppi").setEnabled(jsx3.gui.Form.STATEDISABLED).repaint(); 
*/
/*
setDisplayForSpouse();
if (Paivahoitohakemus_Form.getJSXByName("HoidonTarve_Kokopaiva").getChecked()==1) { 
    alert("Kokopaiva"); 
    Paivahoitohakemus_Form.getJSXByName("paneKokopaivaAlkaa").setDisplay("block").repaint();
    Paivahoitohakemus_Form.getJSXByName("paneKokopaivaLoppuu").setDisplay("block").repaint();
}
else if (Paivahoitohakemus_Form.getJSXByName("HoidonTarve_Osapaiva").getChecked()==1) {  
    alert("Osapaiva");
    Paivahoitohakemus_Form.getJSXByName("paneOsapaivaAlkaa").setDisplay("block").repaint();
    Paivahoitohakemus_Form.getJSXByName("paneOsapaivaLoppuu").setDisplay("block").repaint();
}


}
*/

function prepareFields() {
        var defaultText = "- Valitse -";
        var defaultText2 = "";
        var defaultXML = null;
/*
        Paivahoitohakemus_Form.getJSXByName("Huoltaja_Huoltajuus").setDefaultText(defaultText).repaint();
        Paivahoitohakemus_Form.getJSXByName("Huoltaja_Perhesuhde").setDefaultText(defaultText).repaint();
        
        Paivahoitohakemus_Form.getJSXByName("Lapsi_Aidinkieli").setDefaultText(defaultText).repaint();
        Paivahoitohakemus_Form.getJSXByName("Lapsi_Kotipaikka").setDefaultText(defaultText).repaint();

        Paivahoitohakemus_Form.getJSXByName("Hakutoive_Kunta").setDefaultText(defaultText).repaint();

        Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Tyyppi").setDefaultText(defaultText2).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_2Tyyppi").setDefaultText(defaultText2).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_3Tyyppi").setDefaultText(defaultText2).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_4Tyyppi").setDefaultText(defaultText2).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_5Tyyppi").setDefaultText(defaultText2).repaint();

        Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Alue").setDefaultText(defaultText2).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_2Alue").setDefaultText(defaultText2).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_3Alue").setDefaultText(defaultText2).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_4Alue").setDefaultText(defaultText2).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_5Alue").setDefaultText(defaultText2).repaint();
        
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Tyyppi").setXMLString(defaultXML);
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_2Tyyppi").setXMLString(defaultXML);
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_3Tyyppi").setXMLString(defaultXML);
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_4Tyyppi").setXMLString(defaultXML);
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_5Tyyppi").setXMLString(defaultXML);
        
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Tyyppi").resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_2Tyyppi").resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_3Tyyppi").resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_4Tyyppi").resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_5Tyyppi").resetXmlCacheData();
        
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Tyyppi").repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_2Tyyppi").repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_3Tyyppi").repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_4Tyyppi").repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_5Tyyppi").repaint();
        
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Alue").setXMLString(defaultXML);
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_2Alue").setXMLString(defaultXML);
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_3Alue").setXMLString(defaultXML);
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_4Alue").setXMLString(defaultXML);
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_5Alue").setXMLString(defaultXML);
        
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Alue").resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_2Alue").resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_3Alue").resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_4Alue").resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_5Alue").resetXmlCacheData();
        
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Alue").repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_2Alue").repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_3Alue").repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_4Alue").repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_5Alue").repaint();
       */ 
}

/***
* Checks if given string is in format hh:mm
*
* @param  timeStr string to be checked
* @return         is string correct
*/
function isValidTime(timeStr) {

    if (timeStr == '') {
        return true;
    }
    var timeStamp = /^(\d{1,2}):(\d{2})?$/;

    var matchArray = timeStr.match(timeStamp);
    if (matchArray == null) {
        alert('Virheellinen aika. Aika annettava muodossa hh:mm!');
        return false;
    }
    var hour = matchArray[1];
    var minute = matchArray[2];

    if (hour == null || hour < 0  || hour > 23) {
        alert('Virheellinen aika. Aika annettava muodossa hh:mm!');
        return false;
    }
    if (minute == null || minute < 0 || minute > 59) {
        alert('Virheellinen aika. Aika annettava muodossa hh:mm!');
        return false;
    }
    return true;
}

/***
* Check correctness of given date
* @param  yyyy    year
* @param  mm      month
* @param  dd      day
* @return         is date correct
*/
function checkDate(yyyy,mm,dd) {
    var monthLength = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
    var day = parseInt(dd,10);
    var month = parseInt(mm,10);
    var year = parseInt(yyyy,10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return true;
    }

    if (month < 1 || month > 12) {
        return true;
    }

    if (((year % 4 == 0) & (year % 100 != 0)) | (year % 400 == 0))
        monthLength[1] = 29;

    if (day < 1 || day > monthLength[month-1]) {
        return true;
    }

    return false;
}

/***
* Check given ssn. Gives focus back to field if ssn incorrect. Transforms letters to upper case if correct. 
* @param  fieldName2 item that contains the ssn field to be checked
* @param  notify     is user notified of result
* @return            is ssn correct
*/
function checkSsn(fieldName2, notify) {
    //alert(fieldName2.getValue());
    if (fieldName2.getValue() == "") {
        return true;
    }
    var ok = checkStringSsn(new String(fieldName2.getValue()), notify);
    if(ok == false){
       fieldName2.focus();
    }
    if(ok == true){
       fieldName2.setValue(fieldName2.getValue().toUpperCase()).repaint();
       //alert(fieldName2.getValue());
    }
    return ok;
}

/***
* Check given String type ssn
* @param  ssnCheck    ssn
* @return             is ssn correct
*/
function checkStringSsn(ssnCheck, notify) {
    if (notify == ''){
        notify = true;
    }
    ssnCheck = ssnCheck.toUpperCase();
    var aMarks = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','H','J','K','L','M','N','P','R','S','T','U','V','W','X','Y');
    var aGender = new Array('N','M');
    var bError = new Boolean(false);

    if (ssnCheck.length != 11) {
        bError = true;
    } else {
        var sBirthdate = new String(ssnCheck.substring(0,6));
        var sCentury = new String(ssnCheck.substring(6,7));
        var sGender = new String(ssnCheck.substring(9,10));
        var sCheck = new String(ssnCheck.substring(10,11));
        sCheck = sCheck.toUpperCase();
        var sEnd = new String(ssnCheck.substring(7,10));
        var sNumber = new String(sBirthdate + sEnd);
        var iNumber = parseInt(sNumber,10);
        var iGender = parseInt(sGender,10);
        if (isNaN(iNumber) || isNaN(iGender)) {
            bError = true;
        } else {
            var iModulus = iNumber % 31;
            if (sCheck != aMarks[iModulus]) {
                bError = true;
            } else {
                var sDd = new String(ssnCheck.substring(0,2));
                var sMm = new String(ssnCheck.substring(2,4));
                var sYy = new String(ssnCheck.substring(4,6));
                if (sCentury == '+') {
                    sYy = '18' + sYy;
                } else {
                    if (sCentury == '-') {
                        sYy =  '19' + sYy;
                    } else {
                        if (sCentury == 'A') {
                            sYy = '20' + sYy;
                        }
                    }
                }
                // If year is under 20, the checkmark has to be A. Otherwise it's -.
                var year = ssnCheck.substring(4,6);
                if(year > 20 && sCentury != '-'){
                    bError = true;
                }
                else if(year <= 20 && sCentury != 'A'){
                    bError = true;
                }
                else if(sCentury != 'A' && sCentury != '-'){
                    bError = true;
                }
                if (checkDate(sYy,sMm,sDd) == true) {
                    bError = true;
                }
            }
        }
    }
    if (bError == true) {
        if(notify == true){
            alert('Henkilotunnuksen muoto ei ole oikein. Tarkista henkilotunnus!');
        }
        return false;
    }
    return true;
}


function checkHetu(variableName3){
    
    var hetu = new String(Paivahoitohakemus_Form.getJSXByName(variableName3).getValue());
    
    // get birthday from ssn
    hetu = hetu.substring(0, 6);
    
    // parse day, month and year from birthday
    var day = hetu.charAt(0) + hetu.charAt(1);
    var month = hetu.charAt(2) + hetu.charAt(3);
    var year = hetu.charAt(4) + hetu.charAt(5);   

    // get today as date
    var tamaPaiva = new Date();
    
    // get birthday as date
    var syntymapaiva = new Date();
    syntymapaiva.setDate(day);
    syntymapaiva.setMonth(month-1);
    syntymapaiva.setYear(year);
    
    // calculate milliseconds between today and birthday
    var da = new Date(tamaPaiva - syntymapaiva);
    
    // get today as date
    var AgoPaiva = new Date();
    alert(AgoPaiva);
    
    // if the difference between today and birthday is more or equal to 18 years
    if (da > 568025136000){
    alert("Lapsen tulee olla nuorempi kuin 18 vuotias");
    Paivahoitohakemus_Form.getJSXByName(variableName3).setValue("");
    }
}
/*
function fieldValue2Display(townName2,fieldValues2,targetName2){
        if (townName2=="Joensuu") {
            if (fieldValues2=="Paeivaekoti") {
                var nameValue2 = "props" + townName2 + "Paivakoti_xml";  
            } 
            if (fieldValues2=="Perhepaeivaehoito") {
                var nameValue2 = "props" + townName2 + "Perhepaivahoito_xml";  
            } 
            if (fieldValues2=="Yksityinen0") {
                var nameValue2 = "props" + townName2 + "Yksityinen0_xml";  
            } 
            if (fieldValues2=="Yksityinen1") {
                var nameValue2 = "props" + townName2 + "Yksityinen1_xml";  
            } 
            if (fieldValues2=="Virikekerhot") {
                var nameValue2 = "props" + townName2 + "Virikekerhot_xml";  
            } 
        }
        
        if (townName2=="Kontiolahti") {
            if (fieldValues2=="Paeivaekoti") {
                var nameValue2 = "props" + townName2 + "Paivakoti_xml";  
            } 
            if (fieldValues2=="Perhepaeivaehoito") {
                var nameValue2 = "props" + townName2 + "Perhepaivahoito_xml";  
            } 
            if (fieldValues2=="Ryhmaeperhepaeivaehoito") {
                var nameValue2 = "props" + townName2 + "Ryhmaperhepaivahoito_xml";  
            } 
            if (fieldValues2=="Yksityinen") {
                var nameValue2 = "props" + townName2 + "Yksityinen_xml";  
            } 
        }
        
        if (townName2=="Lieksa") {
            if (fieldValues2=="Paeivaekoti") {
                var nameValue2 = "props" + townName2 + "Paivakoti_xml";  
            } 
            if (fieldValues2=="Perhepaeivaehoito") {
                var nameValue2 = "props" + townName2 + "Perhepaivahoito_xml";  
            } 
            if (fieldValues2=="Ryhmaeperhepaeivaehoito") {
                var nameValue2 = "props" + townName2 + "Ryhmaperhepaivahoito_xml";  
            } 

        }
        if (townName2=="Ilomantsi") {
            if (fieldValues2=="Paeivaekoti") {
                var nameValue2 = "props" + townName2 + "Paivakoti_xml";  
            } 
            if (fieldValues2=="Ryhmaeperhepaevaehoito") {
                var nameValue2 = "props" + townName2 + "Ryhmaperhepaivahoito_xml";  
            }
            
        }
        if (townName2=="Liperi") {
            if (fieldValues2=="Paeivaekoti") {
                var nameValue2 = "props" + townName2 + "Paivakoti_xml";  
            } 
            if (fieldValues2=="Leikkitoiminta") {
                var nameValue2 = "props" + townName2 + "Leikkitoiminta_xml";  
            } 
            if (fieldValues2=="Kerhotoiminta") {
                var nameValue2 = "props" + townName2 + "Kerhotoiminta_xml";  
            } 
            if (fieldValues2=="Perhepaevaehoito") {
                var nameValue2 = "props" + townName2 + "Perhepaivahoito_xml";  
            } 
        }
        if (townName2=="Nurmes") {
           
            if (fieldValues2=="Paeivaekoti") {
                var nameValue2 = "props" + townName2 + "Paivakoti_xml";  
            } 
            if (fieldValues2=="Perhepaeivaehoito") {
                var nameValue2 = "props" + townName2 + "Perhepaivahoito_xml";  
            } 
            if (fieldValues2=="Ryhmaeperhepaevaehoito") {
                var nameValue2 = "props" + townName2 + "Ryhmaperhepaivahoito_xml";  
            } 
          
        }
        if (townName2=="Kitee") {
            if (fieldValues2=="Paeivaekoti") {
                var nameValue2 = "props" + townName2 + "Paivakoti_xml";  
            } 
            if (fieldValues2=="Perhepaeivaehoito") {
                var nameValue2 = "props" + townName2 + "Perhepaivahoito_xml";  
            } 
            
        }
        if (townName2=="Outokumpu") {
            if (fieldValues2=="Paeivaekoti") {
                var nameValue2 = "props" + townName2 + "Paivakoti_xml";  
            } 
            if (fieldValues2=="Perhepaeivaehoito") {
                var nameValue2 = "props" + townName2 + "Perhepaivahoito_xml";  
            } 
            if (fieldValues2=="Ryhmaeperhepaeivaehoito") {
                var nameValue2 = "props" + townName2 + "Ryhmaperhepaivahoito_xml";  
            } 
            if (fieldValues2=="Kolmiperhehoito") {
                var nameValue2 = "props" + townName2 + "Kolmiperhehoito_xml";  
            } 
            if (fieldValues2=="Virikekerhot") {
                var nameValue2 = "props" + townName2 + "Virikekerhot_xml";  
            } 
        

        }
        var defaultText = "- Valitse -";
        var defaultValue = null;
        Paivahoitohakemus_Form.getJSXByName(targetName2).setXMLString(Paivahoitohakemus_Form.getCache().getDocument(nameValue2).toString());
        Paivahoitohakemus_Form.getJSXByName(targetName2).resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName(targetName2).repaint();
        Paivahoitohakemus_Form.getJSXByName(targetName2).setValue(defaultValue);
        Paivahoitohakemus_Form.getJSXByName(targetName2).setDefaultText(defaultText).repaint();
                             
        //Paivahoitohakemus_Form.getJSXByName(targetName2).setXMLString(Paivahoitohakemus_Form.getCache().getDocument(nameValue2).toString()).resetXmlCacheData().repaint();
}


function fieldValueDisplay(fieldValues2,targetName2){
        //alert(Paivahoitohakemus_Form.getJSXByName(targetName2 + "Tyyppi").getXMLString());
        var nameValue2 = "props" + fieldValues2 + "_xml";
        var defaultValue = null;
        var defaultXML = null;
        var defaultText = "- Valitse -";
        var defaultText2 = "";

        //alert(Paivahoitohakemus_Form.getJSXByName(targetName2 + "Tyyppi").getXMLString());
        //Paivahoitohakemus_Form.getJSXByName(targetName2 + "Tyyppi").resetXmlCacheData().repaint();
        //var document2 = Paivahoitohakemus_Form.getCache().getDocument(nameValue2).toString();
        //Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Tyyppi").setXMLString(Paivahoitohakemus_Form.getCache().getDocument(nameValue2).toString()).resetXmlCacheData().repaint();

        //Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Tyyppi").resetXmlCacheData().repaint();
        //alert(document2);
        //Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Tyyppi").setXMLString(document2).resetXmlCacheData().repaint();
        //document2 = Paivahoitohakemus_Form.getCache().getDocument(nameValue2).toString();
        //Paivahoitohakemus_Form.getJSXByName("Hakutoive_2Tyyppi").setXMLString(document2).resetXmlCacheData().repaint();
        //document2 = Paivahoitohakemus_Form.getCache().getDocument(nameValue2).toString();
        //Paivahoitohakemus_Form.getJSXByName("Hakutoive_3Tyyppi").setXMLString(document2).resetXmlCacheData().repaint();
        
        //Paivahoitohakemus_Form.getJSXByName("Hakutoive_4Tyyppi").setXMLString(document2).resetXmlCacheData().repaint();
        //Paivahoitohakemus_Form.getJSXByName("Hakutoive_5Tyyppi").setXMLString(document2).resetXmlCacheData().repaint();
        
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Alue").setXMLString(defaultXML);
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_2Alue").setXMLString(defaultXML);
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_3Alue").setXMLString(defaultXML);
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_4Alue").setXMLString(defaultXML);
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_5Alue").setXMLString(defaultXML);
        
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Alue").resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_2Alue").resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_3Alue").resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_4Alue").resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_5Alue").resetXmlCacheData();
        
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Alue").repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_2Alue").repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_3Alue").repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_4Alue").repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_5Alue").repaint();
        
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Alue").setValue(defaultValue).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_2Alue").setValue(defaultValue).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_3Alue").setValue(defaultValue).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_4Alue").setValue(defaultValue).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_5Alue").setValue(defaultValue).repaint();
        
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Alue").setDefaultText(defaultText2).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_2Alue").setDefaultText(defaultText2).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_3Alue").setDefaultText(defaultText2).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_4Alue").setDefaultText(defaultText2).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_5Alue").setDefaultText(defaultText2).repaint();
        
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Tyyppi").setValue(defaultValue).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_2Tyyppi").setValue(defaultValue).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_3Tyyppi").setValue(defaultValue).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_4Tyyppi").setValue(defaultValue).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_5Tyyppi").setValue(defaultValue).repaint();
        
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Tyyppi").setDefaultText(defaultText).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_2Tyyppi").setDefaultText(defaultText).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_3Tyyppi").setDefaultText(defaultText).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_4Tyyppi").setDefaultText(defaultText).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_5Tyyppi").setDefaultText(defaultText).repaint();
        
        Paivahoitohakemus_Form.getJSXByName(targetName2 + "Tyyppi").setXMLString(Paivahoitohakemus_Form.getCache().getDocument(nameValue2).toString());
        Paivahoitohakemus_Form.getJSXByName(targetName2 + "Tyyppi").resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName(targetName2 + "Tyyppi").repaint();       
        
}
*/
/*
function setDisplayForSection(targetName2, functionState2){
    if(functionState2==1){
       Paivahoitohakemus_Form.getJSXByName(targetName2).setDisplay("none").repaint();
    } else {
       Paivahoitohakemus_Form.getJSXByName(targetName2).setDisplay("block").repaint();
    }
}
*/
function setMetadataDisplay(functionState3){
    if(functionState3==0){
       Paivahoitohakemus_Form.getJSXByName("Hakijan_Tunnistetiedot").setDisplay("none").repaint();
       Paivahoitohakemus_Form.getJSXByName("Hakemuksen_Tunnistetiedot").setDisplay("none").repaint();
       Paivahoitohakemus_Form.getJSXByName("Kasittelijan_Tunnistetiedot").setDisplay("none").repaint();
    } else {
       Paivahoitohakemus_Form.getJSXByName("Hakijan_Tunnistetiedot").setDisplay("block").repaint();
       Paivahoitohakemus_Form.getJSXByName("Hakemuksen_Tunnistetiedot").setDisplay("block").repaint();
       Paivahoitohakemus_Form.getJSXByName("Kasittelijan_Tunnistetiedot").setDisplay("block").repaint();
    }
}

/***
* Set section display in given target
* @param targetName2    target
* @param functionState2 state, either 0(none) or 1(block)
*/
function setDisplayForSection(targetName2, functionState2){
    if(functionState2==0){
       Paivahoitohakemus_Form.getJSXByName(targetName2).setDisplay("none").repaint();
    } else {
       Paivahoitohakemus_Form.getJSXByName(targetName2).setDisplay("block").repaint();
    }
}

function setDisplayForSpouse(){
    if(Paivahoitohakemus_Form.getJSXByName("Huoltaja_Huoltajuus").getValue() == "Yksinhuoltajuus"){
       Paivahoitohakemus_Form.getJSXByName("Puoliso").setDisplay("none").repaint();
    } 
    else if(Paivahoitohakemus_Form.getJSXByName("Huoltaja_Perhesuhde").getValue() == "Naimaton"){
       Paivahoitohakemus_Form.getJSXByName("Puoliso").setDisplay("none").repaint();
    } 
    else if(Paivahoitohakemus_Form.getJSXByName("Huoltaja_Perhesuhde").getValue() == "Leski"){
       Paivahoitohakemus_Form.getJSXByName("Puoliso").setDisplay("none").repaint();
    } 
    else {
       Paivahoitohakemus_Form.getJSXByName("Puoliso").setDisplay("block").repaint();
    }
    
}


/***
* Set checkbox state in given target
* @param targetName2    target, identified by JSXName
* @param functionState2 state, either 1(checked) or 0(unchecked)
*/
function setCheckBoxState(targetName2, functionState2){
    if(functionState2==1){;
       Paivahoitohakemus_Form.getJSXByName(targetName2).setChecked(jsx3.gui.CheckBox.CHECKED).repaint()
    } else {
       Paivahoitohakemus_Form.getJSXByName(targetName2).setChecked(jsx3.gui.CheckBox.UNCHECKED).repaint()
    }
}
