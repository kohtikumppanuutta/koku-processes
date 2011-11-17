/* place JavaScript code here */
function intalioPreStart() {
    Paivahoitohakemus_Form.getJSXByName("Lapsi_ValittuDisplay").setValue(Paivahoitohakemus_Form.getJSXByName("Lapsi_Valittu").getText()).repaint();
    Paivahoitohakemus_Form.getJSXByName("Lapsi_Valittu").setValue(Paivahoitohakemus_Form.getJSXByName("Lapsi_Valittu").getValue()).repaint();
    
}

function getEndpoint() {
    
    var endpoint = "http://localhost:8180";
    //var endpoint = "http://trelx51x:8080";
    return endpoint;
    
}



//Getting the domain name and port if available
function getUrl() {
    
    var domain = getDomainName();
    return domain + "/palvelut-portlet/ajaxforms/WsProxyServlet2";

}

 function getDomainName() {

    var url = window.location.href;
    var url_parts = url.split("/");
    var domain_name = url_parts[0] + "//" + url_parts[2];
       
    return domain_name;

}

/*
function preload()  {
    Child.prototype.prefillChildSection=prefillChildSection;
    Child.prototype.prefillOtherChildrenSection=prefillOtherChildrenSection;
    
    lassi = new Child("Lapsi","Lassi","121212-1212","Testikatu 10","80100","Joensuu","Suomi");
    liisa = new Child("Lapsi","Liisa","121212-1212","Testitie 2","33000","Tampere","Ruotsi");
}
*/
function radioSelect(current, group) {
   
    var i;
   
    for(i = 0; i < group.length; i++) {
    
        if (group[i] != current.getName()) {
           
            Paivahoitohakemus_Form.getJSXByName(group[i]).setChecked(jsx3.gui.CheckBox.UNCHECKED).repaint()
        }
    }
}

function Child(firstname,lastname,socSecNum,address,postalcode,city,language) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.socSecNum = socSecNum;
    this.address = address;
    this.postalcode = postalcode;
    this.city = city;
    this.language = language;
}

function prefillChildSection() {
    Paivahoitohakemus_Form.getJSXByName("Lapsi_Sukunimi").setValue(this.lastname);
    Paivahoitohakemus_Form.getJSXByName("Lapsi_Etunimi").setValue(this.firstname);
    Paivahoitohakemus_Form.getJSXByName("Lapsi_Henkilotunnus").setValue(this.socSecNum);
    Paivahoitohakemus_Form.getJSXByName("Lapsi_Lahiosoite").setValue(this.address);
    Paivahoitohakemus_Form.getJSXByName("Lapsi_Postinumero").setValue(this.postalcode);
    Paivahoitohakemus_Form.getJSXByName("Lapsi_Postitoimipaikka").setValue(this.city);
    Paivahoitohakemus_Form.getJSXByName("Lapsi_Aidinkieli").setValue(this.language);
    Paivahoitohakemus_Form.getJSXByName("Lapsi_Aidinkieli").setText(this.language);
}

function prefillOtherChildrenSection()
{
    var node, i;
    var hasEmptyChild = false;
    while (Paivahoitohakemus_Form.getCache().getDocument("MuutLapset-nomap").getFirstChild() != null) {
        Paivahoitohakemus_Form.getCache().getDocument("MuutLapset-nomap").removeChild(Paivahoitohakemus_Form.getCache().getDocument("MuutLapset-nomap").getFirstChild());
    }
    
    // Creates new entry to cache that values can inserted later.
    if (Paivahoitohakemus_Form.getCache().getDocument("MuutLapset-nomap").getFirstChild() == null) {
        Paivahoitohakemus_Form.getJSXByName("MuutLapset").commitAutoRowSession();
        hasEmptyChild = true;
    }
    
    node = Paivahoitohakemus_Form.getCache().getDocument("MuutLapset-nomap").getFirstChild().cloneNode();
            
    node.setAttribute("jsxid",i);
    node.setAttribute("MuutLapset_Etunimi", this.firstname);
    node.setAttribute("MuutLapset_Sukunimi", this.lastname);
    node.setAttribute("MuutLapset_Henkilotunnus", this.socSecNum);
    
    Paivahoitohakemus_Form.getCache().getDocument("MuutLapset-nomap").insertBefore(node);
    if (hasEmptyChild == true) {
        Paivahoitohakemus_Form.getCache().getDocument("MuutLapset-nomap").removeChild(Paivahoitohakemus_Form.getCache().getDocument("MuutLapset-nomap").getFirstChild());
    }
    Paivahoitohakemus_Form.getJSXByName("MuutLapset").repaintData();
}


function prefillChildren() {
    var value = Paivahoitohakemus_Form.getJSXByName("Lapsi_Select").getValue();
    Paivahoitohakemus_Form.getJSXByName("Lapsi").getFirstChild().setHeight("250",true);
    Paivahoitohakemus_Form.getJSXByName("Lapsi_layout (--)").setRows("20%,20%,20%,20%,20%",true);
    Paivahoitohakemus_Form.getJSXByName("Lapsi").repaint();
    
    if (value == "Lassi")    {
        lassi.prefillChildSection();
        liisa.prefillOtherChildrenSection();
    }
    else if (value == "Liisa")    {
        liisa.prefillChildSection();
        lassi.prefillOtherChildrenSection();
    }
    Paivahoitohakemus_Form.getJSXByName("Lapsi_pane1").setDisplay("Block").repaint();
    Paivahoitohakemus_Form.getJSXByName("Lapsi_pane2").setDisplay("Block").repaint(); 
    Paivahoitohakemus_Form.getJSXByName("Lapsi_pane3").setDisplay("Block").repaint(); 
    Paivahoitohakemus_Form.getJSXByName("Lapsi_pane4").setDisplay("Block").repaint(); 
}

function setDisplayFromList(list, display)
{
    for (i=0;i<list.length;i++) {
        Paivahoitohakemus_Form.getJSXByName(list[i]).setDisplay("block");
    }
}

function prefillCaretakers()  {

   /* Paivahoitohakemus_Form.getJSXByName("Huoltaja_Sukunimi").setValue("Kuntalainen").repaint();
    Paivahoitohakemus_Form.getJSXByName("Huoltaja_Etunimi").setValue("Kirsi").repaint();
    Paivahoitohakemus_Form.getJSXByName("Huoltaja_Henkilotunnus").setValue("240481-716P").repaint();
    Paivahoitohakemus_Form.getJSXByName("Huoltaja_Sahkopostiosoite").setValue("kirsi.kuntalainen@testiposti.com").repaint();
    Paivahoitohakemus_Form.getJSXByName("Huoltaja_Puhelin").setValue("012-3456789").repaint();
    Paivahoitohakemus_Form.getJSXByName("Huoltaja_Matkapuhelin").setValue("987-6543210").repaint();
    Paivahoitohakemus_Form.getJSXByName("Huoltaja_Ammatti").setValue("Testaaja").repaint();
    Paivahoitohakemus_Form.getJSXByName("Huoltaja_Tyopaikka").setValue("Testaajat Oy").repaint();
    Paivahoitohakemus_Form.getJSXByName("Huoltaja_TyopaikanOsoite").setValue("Testaajankatu 10").repaint();
    Paivahoitohakemus_Form.getJSXByName("Huoltaja_Huoltajuus").setValue("Kaksi_huoltajaa");
    Paivahoitohakemus_Form.getJSXByName("Huoltaja_Huoltajuus").setText("Perheess\u00E4 kaksi huoltajaa",true);
    Paivahoitohakemus_Form.getJSXByName("Huoltaja_Perhesuhde").setValue("Avioliitossa");
    Paivahoitohakemus_Form.getJSXByName("Huoltaja_Perhesuhde").setText("Avioliitossa",true);
    Paivahoitohakemus_Form.getJSXByName("Huoltaja_TyoaikaSaannollinen").setChecked(1,true);
    
    Paivahoitohakemus_Form.getJSXByName("Puoliso_Sukunimi").setValue("Kuntalainen").repaint();
    Paivahoitohakemus_Form.getJSXByName("Puoliso_Etunimi").setValue("Kalle").repaint();
    Paivahoitohakemus_Form.getJSXByName("Puoliso_Henkilotunnus").setValue("300781-8112").repaint();
    Paivahoitohakemus_Form.getJSXByName("Puoliso_Sahkopostiosoite").setValue("kalle.kuntalainen@testiposti.com").repaint();
    Paivahoitohakemus_Form.getJSXByName("Puoliso_Puhelin").setValue("456-789321").repaint();
    Paivahoitohakemus_Form.getJSXByName("Puoliso_Matkapuhelin").setValue("123-987456").repaint();
    Paivahoitohakemus_Form.getJSXByName("Puoliso_Ammatti").setValue("Testaaja").repaint();
    Paivahoitohakemus_Form.getJSXByName("Puoliso_Tyopaikka").setValue("Testaajat Oy").repaint();
    Paivahoitohakemus_Form.getJSXByName("Puoliso_TyopaikanOsoite").setValue("Testaajankatu 10").repaint();
    Paivahoitohakemus_Form.getJSXByName("Puoliso_TyoaikaVuoro").setChecked(1,true);
    Paivahoitohakemus_Form.getJSXByName("Puoliso_TyoaikaAlkaa").setValue("08:00").repaint();
    Paivahoitohakemus_Form.getJSXByName("Puoliso_TyoaikaLoppuu").setValue("16:00").repaint();
    */
}

function setCheckRequired(field1, field2)  {
   /* Sets check fields required if both checkfields field1 and field 2 are false. Sets check fields optional if field1 or field2 is true */
   if (Paivahoitohakemus_Form.getJSXByName(field1).getValue() == false && Paivahoitohakemus_Form.getJSXByName(field2).getValue() == false)
   {
      Paivahoitohakemus_Form.getJSXByName(field1).setRequired(jsx3.gui.Form.REQUIRED).repaint();
      Paivahoitohakemus_Form.getJSXByName(field2).setRequired(jsx3.gui.Form.REQUIRED).repaint();
   }
   else if (Paivahoitohakemus_Form.getJSXByName(field1).getValue() == true)
   {
      Paivahoitohakemus_Form.getJSXByName(field1).setRequired(jsx3.gui.Form.OPTIONAL).repaint();
      Paivahoitohakemus_Form.getJSXByName(field2).setRequired(jsx3.gui.Form.OPTIONAL).repaint();
   }
   else if (Paivahoitohakemus_Form.getJSXByName(field2).getValue() == true)
   {
      Paivahoitohakemus_Form.getJSXByName(field1).setRequired(jsx3.gui.Form.OPTIONAL).repaint();
      Paivahoitohakemus_Form.getJSXByName(field2).setRequired(jsx3.gui.Form.OPTIONAL).repaint();
   }
}

function ifCheckThenRequired(checkField, requiredField1, requiredField2)   {
   /*If checkField is true requiredField is REQUIRED and OPTIONAL if false */
   if (Paivahoitohakemus_Form.getJSXByName(checkField).getValue() == true)
   {
      Paivahoitohakemus_Form.getJSXByName(requiredField1).setRequired(jsx3.gui.Form.REQUIRED).repaint();
      Paivahoitohakemus_Form.getJSXByName(requiredField2).setRequired(jsx3.gui.Form.REQUIRED).repaint();
   }
   else if (Paivahoitohakemus_Form.getJSXByName(checkField).getValue() == false)
   {
      Paivahoitohakemus_Form.getJSXByName(requiredField1).setRequired(jsx3.gui.Form.OPTIONAL).repaint();
      Paivahoitohakemus_Form.getJSXByName(requiredField2).setRequired(jsx3.gui.Form.OPTIONAL).repaint();
   }
}

function setRowsOnCheck(field, layout, rowsTrue, rowsFalse)    {
    /* Sets rows according to checkbox value */
    if (Paivahoitohakemus_Form.getJSXByName(field).getValue() == true)
       Paivahoitohakemus_Form.getJSXByName(layout).setRows(rowsTrue, true);
    else if (Paivahoitohakemus_Form.getJSXByName(field).getValue() == false)
       Paivahoitohakemus_Form.getJSXByName(layout).setRows(rowsFalse, true);
}

function removeChecksOnUncheck(field, pane)
{
   if (Paivahoitohakemus_Form.getJSXByName(field).getValue() == false)
   {
      var layout = Paivahoitohakemus_Form.getJSXByName(pane).getFirstChild();
      var panes = layout.getChildren();
      var i;
      for (i=0;i<panes.length;i++)
         {
         var childField = panes[i].getFirstChild();
         if (childField)
         {
            if (childField.getName() != "label")
            {
               childField.getFirstChild().setValue(0)
            }
         }
      }
   }
}

function setSpouseRequired() {
            var flag = false;
            if (Paivahoitohakemus_Form.getJSXByName("Puoliso_Etunimi").getValue() != "") flag=true;
            if (Paivahoitohakemus_Form.getJSXByName("Puoliso_Sukunimi").getValue() != "") flag=true;
            if (Paivahoitohakemus_Form.getJSXByName("Puoliso_Henkilotunnus").getValue() != "") flag=true;
            if (Paivahoitohakemus_Form.getJSXByName("Puoliso_Puhelin").getValue() != "") flag=true;
            if (Paivahoitohakemus_Form.getJSXByName("Puoliso_Sahkopostiosoite").getValue() != "") flag=true;
            if (Paivahoitohakemus_Form.getJSXByName("Puoliso_Matkapuhelin").getValue() != "") flag=true;
            if (Paivahoitohakemus_Form.getJSXByName("Puoliso_Tyopaikka").getValue() != "") flag=true;
            if (Paivahoitohakemus_Form.getJSXByName("Puoliso_TyopaikanOsoite").getValue() != "") flag=true;
            //if (Paivahoitohakemus_Form.getJSXByName("Puoliso_TyopaikanPuhelin").getValue() != "") flag=true;
            if (Paivahoitohakemus_Form.getJSXByName("Puoliso_Ammatti").getValue() != "") flag=true;
            if (Paivahoitohakemus_Form.getJSXByName("Puoliso_TyoaikaAlkaa").getValue() != "") flag=true;
            if (Paivahoitohakemus_Form.getJSXByName("Puoliso_TyoaikaLoppuu").getValue() != "") flag=true;
            if (Paivahoitohakemus_Form.getJSXByName("Puoliso_TyoaikaVuoro").getChecked() == true) flag=true;
            if (Paivahoitohakemus_Form.getJSXByName("Puoliso_TyoaikaSaannollinen").getChecked() == true) flag=true;
            
            if (flag == true) {
                Paivahoitohakemus_Form.getJSXByName("Puoliso_Etunimi").setRequired(jsx3.gui.Form.REQUIRED).repaint();
                Paivahoitohakemus_Form.getJSXByName("Puoliso_Sukunimi").setRequired(jsx3.gui.Form.REQUIRED).repaint();
                Paivahoitohakemus_Form.getJSXByName("Puoliso_Henkilotunnus").setRequired(jsx3.gui.Form.REQUIRED).repaint();
               
                
            }
            else {
                Paivahoitohakemus_Form.getJSXByName("Puoliso_Etunimi").setRequired(jsx3.gui.Form.OPTIONAL).repaint();
                Paivahoitohakemus_Form.getJSXByName("Puoliso_Sukunimi").setRequired(jsx3.gui.Form.OPTIONAL).repaint();
                Paivahoitohakemus_Form.getJSXByName("Puoliso_Henkilotunnus").setRequired(jsx3.gui.Form.OPTIONAL).repaint();
               
            }
            
            if ((Paivahoitohakemus_Form.getJSXByName("Puoliso_TyoaikaVuoro").getChecked() == 1) || (Paivahoitohakemus_Form.getJSXByName("Puoliso_TyoaikaSaannollinen").getChecked() == 1) ) {
                Paivahoitohakemus_Form.getJSXByName("Puoliso_Ammatti").setRequired(jsx3.gui.Form.REQUIRED).repaint();         
            }
            else {
                 Paivahoitohakemus_Form.getJSXByName("Puoliso_Ammatti").setRequired(jsx3.gui.Form.OPTIONAL).repaint(); 
            }
      
            
}

function checkChildrenSsn(fieldName) {
   
   
    if (Paivahoitohakemus_Form.getJSXByName("Lapsi_Henkilotunnus").getValue() != "") {
        
        if (fieldName.getValue() == Paivahoitohakemus_Form.getJSXByName("Lapsi_Henkilotunnus").getValue()) {
          
            fieldName.focus();
            fieldName.setValue("");
            alert("Henkil\xF6tunnus on jo kayt\xF6ss\xE4 p\xE4iv\xE4hoitoa hakevalla lapsella");
        }
    }
  



}

function changeTimeFormat(fieldName) {
    var value = Paivahoitohakemus_Form.getJSXByName(fieldName).getValue();
    if (value=="") return "";
    var firstNumber = value.substring(0,(value.indexOf(":")));
    //alert(firstNumber);
    if ( firstNumber.length == 1 ) value = "0" + value;  
    value = value + ":00";   
    return value;
}

function setValueForField(value2,fieldName2){
    Paivahoitohakemus_Form.getJSXByName(fieldName2).setValue(value2);
}

function setEmptyCodesForFields() {
    setValueForField("","Hakutoive_1TyyppiKoodi");
    setValueForField("","Hakutoive_2TyyppiKoodi");
    setValueForField("","Hakutoive_3TyyppiKoodi");
    setValueForField("","Hakutoive_4TyyppiKoodi");
    setValueForField("","Hakutoive_5TyyppiKoodi");
    setValueForField("","Hakutoive_1AlueKoodi");
    setValueForField("","Hakutoive_2AlueKoodi");
    setValueForField("","Hakutoive_3AlueKoodi");
    setValueForField("","Hakutoive_4AlueKoodi");
    setValueForField("","Hakutoive_5AlueKoodi");
}

function setEmptyValuesForNullFields() {
    //alert("DefaultText()");
    Paivahoitohakemus_Form.getJSXByName("Lapsi_Aidinkieli").setDefaultText("-").repaint();
    Paivahoitohakemus_Form.getJSXByName("Lapsi_Kotipaikka").setDefaultText("-").repaint();
    Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Alue").setDefaultText("-").repaint();
    Paivahoitohakemus_Form.getJSXByName("Hakutoive_2Alue").setDefaultText("-").repaint();
    Paivahoitohakemus_Form.getJSXByName("Hakutoive_3Alue").setDefaultText("-").repaint();
    Paivahoitohakemus_Form.getJSXByName("Hakutoive_4Alue").setDefaultText("-").repaint();
    Paivahoitohakemus_Form.getJSXByName("Hakutoive_5Alue").setDefaultText("-").repaint();
    Paivahoitohakemus_Form.getJSXByName("Hakutoive_4Tyyppi").setDefaultText("-").repaint();
    Paivahoitohakemus_Form.getJSXByName("Hakutoive_5Tyyppi").setDefaultText("-").repaint(); 
/*
    if (Paivahoitohakemus_Form.getJSXByName("Lapsi_Aidinkieli").getValue()==null) {
    alert("On null");
    Paivahoitohakemus_Form.getJSXByName("Lapsi_Aidinkieli").setValue("-").repaint();
    alert(Paivahoitohakemus_Form.getJSXByName("Lapsi_Aidinkieli").getValue());
    }
    else {
    Paivahoitohakemus_Form.getJSXByName("Lapsi_Aidinkieli").setValue(Paivahoitohakemus_Form.getJSXByName("Lapsi_Aidinkieli").getValue()).repaint();
    alert(Paivahoitohakemus_Form.getJSXByName("Lapsi_Aidinkieli").getValue());
    }
    */
}

function setCodevalue(targetName2,textValue) {
    var textValue = "'" + textValue + "'";
    //alert(targetName2);
    //alert(textValue);
    var codeValue2 = Paivahoitohakemus_Form.getJSXByName(targetName2).getXML().selectSingleNode("//locale/record[@jsxtext=" + textValue + "]").getAttribute("jsxcode");
    //Paivahoitohakemus_Form.getJSXByName("Rolename").setValue(Paivahoitohakemus_Form.getCache().getDocument("propsKunnat_xml").selectSingleNode("/locale/record[@jsxid=" + targetName2 + "]").getAttribute("jsxtip");
    //alert(codeValue2);
    Paivahoitohakemus_Form.getJSXByName(targetName2 + "Koodi").setValue(codeValue2);
    Paivahoitohakemus_Form.getJSXByName(targetName2 + "Koodi").repaint();
}

function setRoleForHandler(targetName2) {
    var targetName2 = "'" + targetName2 + "'";
    //var roleName2 = Paivahoitohakemus_Form.getCache().getDocument("propsKasittelijat_xml").selectSingleNode("//locale/record[@jsxtext=" + targetName2 + "]").getAttribute("jsxtip");
    //Paivahoitohakemus_Form.getJSXByName("Rolename").setValue(Paivahoitohakemus_Form.getCache().getDocument("propsKunnat_xml").selectSingleNode("/locale/record[@jsxid=" + targetName2 + "]").getAttribute("jsxtip");
    
    Paivahoitohakemus_Form.getJSXByName("Rolename").setValue(roleName2).repaint();
    //alert(Paivahoitohakemus_Form.getJSXByName("Rolename").getValue());
}

function setEmailForHandler(targetName2) {
    var targetName2 = "'" + targetName2 + "'";
    var roleName2 = Paivahoitohakemus_Form.getCache().getDocument("propsKasittelijat_xml").selectSingleNode("//locale/record[@jsxtext=" + targetName2 + "]").getAttribute("jsxemail");
    //Paivahoitohakemus_Form.getJSXByName("Rolename").setValue(Paivahoitohakemus_Form.getCache().getDocument("propsKunnat_xml").selectSingleNode("/locale/record[@jsxid=" + targetName2 + "]").getAttribute("jsxtip");
    
    Paivahoitohakemus_Form.getJSXByName("Email").setValue(roleName2).repaint();
    //alert(Paivahoitohakemus_Form.getJSXByName("Rolename").getValue());
}

jsx3.lang.Package.definePackage(
  "Intalio.Internal.CustomErrors",
  function(error) {


    error.getError=function(name){
        var errortext = Paivahoitohakemus_Form.getJSXByName(name).getTip();
        errortext = "Virheelliset tiedot: " + errortext;
        return errortext;
    };
  }
);

function prepareFields() {
        var defaultText = "- Valitse -";
        var defaultText2 = "";
        var defaultXML = null;
        

        Paivahoitohakemus_Form.getJSXByName("Huoltaja_Huoltajuus").setDefaultText(defaultText).repaint();
        Paivahoitohakemus_Form.getJSXByName("Huoltaja_Perhesuhde").setDefaultText(defaultText).repaint();
        
        Paivahoitohakemus_Form.getJSXByName("Lapsi_Aidinkieli").setDefaultText(defaultText).repaint();
        Paivahoitohakemus_Form.getJSXByName("Lapsi_Kotipaikka").setDefaultText(defaultText).repaint();

        Paivahoitohakemus_Form.getJSXByName("Hakutoive_1Kunta").setDefaultText(defaultText).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_2Kunta").setDefaultText(defaultText).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_3Kunta").setDefaultText(defaultText).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_4Kunta").setDefaultText(defaultText).repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_5Kunta").setDefaultText(defaultText).repaint();

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
        
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_Kunta1").setXMLString(Paivahoitohakemus_Form.getCache().getDocument("propsTiimi_xml").toString());
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_Kunta1").resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_Kunta1").repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_Kunta2").setXMLString(Paivahoitohakemus_Form.getCache().getDocument("propsTiimi_xml").toString());
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_Kunta2").resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_Kunta2").repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_Kunta3").setXMLString(Paivahoitohakemus_Form.getCache().getDocument("propsTiimi_xml").toString());
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_Kunta3").resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_Kunta3").repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_Kunta4").setXMLString(Paivahoitohakemus_Form.getCache().getDocument("propsTiimi_xml").toString());
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_Kunta4").resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_Kunta4").repaint();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_Kunta5").setXMLString(Paivahoitohakemus_Form.getCache().getDocument("propsTiimi_xml").toString());
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_Kunta5").resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName("Hakutoive_Kunta5").repaint();
        
        Paivahoitohakemus_Form.getJSXByName("Huoltaja_Perhesuhde").setXMLString(Paivahoitohakemus_Form.getCache().getDocument("propsPerhesuhde_xml").toString());
        Paivahoitohakemus_Form.getJSXByName("Huoltaja_Perhesuhde").resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName("Huoltaja_Perhesuhde").repaint();
        
              
        Paivahoitohakemus_Form.getJSXByName("Lapsi_Aidinkieli").setXMLString(Paivahoitohakemus_Form.getCache().getDocument("propsAidinkieli_xml").toString());
        Paivahoitohakemus_Form.getJSXByName("Lapsi_Aidinkieli").resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName("Lapsi_Aidinkieli").repaint();
        
        Paivahoitohakemus_Form.getJSXByName("Lapsi_Kotipaikka").setXMLString(Paivahoitohakemus_Form.getCache().getDocument("propsKotipaikka_xml").toString());
        Paivahoitohakemus_Form.getJSXByName("Lapsi_Kotipaikka").resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName("Lapsi_Kotipaikka").repaint();
        
        Paivahoitohakemus_Form.getJSXByName("Huoltaja_Huoltajuus").setXMLString(Paivahoitohakemus_Form.getCache().getDocument("propsHuoltajuus_xml").toString());
        Paivahoitohakemus_Form.getJSXByName("Huoltaja_Huoltajuus").resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName("Huoltaja_Huoltajuus").repaint();
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
    //TESTAUSHETUn hyvaksyva ehto, poista julkaisusta:
    if (ssnCheck=="121212-1212") {
        return true;
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
            alert('Henkil\xF6tunnuksen muoto ei ole oikein. Tarkista henkilotunnus!');
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


function fieldValue2Display(townName2,fieldValues2,targetName2){
        
       
        if (townName2=="Myllypuro-Reuhari") {
            if (fieldValues2=="AvoinVarhaiskasvatus") {
                var nameValue2 = "props" + townName2 + "AvoinVarhaiskasvatus_xml";  
            }
            if (fieldValues2=="Perhepaeivaehoito") {
                var nameValue2 = "props" + townName2 + "Perhepaivahoito_xml";  
            }
            if (fieldValues2=="Paeivaekoti") {
                var nameValue2 = "props" + townName2 + "Paivakoti_xml";  
            }  
           
        }
       
        
        if (townName2=="Rahola-Pyynikki") {
            if (fieldValues2=="AvoinVarhaiskasvatus") {
                var nameValue2 = "props" + townName2 + "AvoinVarhaiskasvatus_xml";  
            }
            if (fieldValues2=="Perhepaeivaehoito") {
                var nameValue2 = "props" + townName2 + "Perhepaivahoito_xml";  
            }
            if (fieldValues2=="Paeivaekoti") {
                var nameValue2 = "props" + townName2 + "Paivakoti_xml";  
            } 
           
        }
        
        if (townName2=="Tammela-Kauppi") {
           if (fieldValues2=="AvoinVarhaiskasvatus") {
                var nameValue2 = "props" + townName2 + "AvoinVarhaiskasvatus_xml";  
            }
           if (fieldValues2=="Perhepaeivaehoito") {
                var nameValue2 = "props" + townName2 + "Perhepaivahoito_xml";  
            }
           if (fieldValues2=="Paeivaekoti") {
                var nameValue2 = "props" + townName2 + "Paivakoti_xml";  
            }

        }
               
        if (townName2=="Rantakallio") {
          if (fieldValues2=="AvoinVarhaiskasvatus") {
                var nameValue2 = "props" + townName2 + "AvoinVarhaiskasvatus_xml";  
            }
          if (fieldValues2=="Perhepaeivaehoito") {
                var nameValue2 = "props" + townName2 + "Perhepaivahoito_xml";  
            }
          if (fieldValues2=="Paeivaekoti") {
                var nameValue2 = "props" + townName2 + "Paivakoti_xml";  
            }
            
        }
        
        if (townName2=="Koivisto-Hallila") {
           if (fieldValues2=="AvoinVarhaiskasvatus") {
                var nameValue2 = "props" + townName2 + "AvoinVarhaiskasvatus_xml";  
            } 
           if (fieldValues2=="Paeivaekoti") {
                var nameValue2 = "props" + townName2 + "Paivakoti_xml";  
            }
         
        }
        
        if (townName2=="Kanjoninrotko-Etela-Hervanta") {
           
           if (fieldValues2=="AvoinVarhaiskasvatus") {
                var nameValue2 = "props" + townName2 + "AvoinVarhaiskasvatus_xml";  
            }
            if (fieldValues2=="Perhepaeivaehoito") {
                var nameValue2 = "props" + townName2 + "Perhepaivahoito_xml";  
            }
           if (fieldValues2=="Paeivaekoti") {
                var nameValue2 = "props" + townName2 + "Paivakoti_xml";  
            }
           
        }
       
        if (townName2=="Rustholli") {
            if (fieldValues2=="AvoinVarhaiskasvatus") {
                var nameValue2 = "props" + townName2 + "AvoinVarhaiskasvatus_xml";  
            }
            if (fieldValues2=="Perhepaeivaehoito") {
                var nameValue2 = "props" + townName2 + "Perhepaivahoito_xml";  
            }
            if (fieldValues2=="Paeivaekoti") {
                var nameValue2 = "props" + townName2 + "Paivakoti_xml";  
            } 
            
        }
        
        if (townName2=="Messu") {
            if (fieldValues2=="AvoinVarhaiskasvatus") {
                var nameValue2 = "props" + townName2 + "AvoinVarhaiskasvatus_xml";  
            }
            if (fieldValues2=="Perhepaeivaehoito") {
                var nameValue2 = "props" + townName2 + "Perhepaivahoito_xml";  
            }
            if (fieldValues2=="Paeivaekoti") {
                var nameValue2 = "props" + townName2 + "Paivakoti_xml";  
            } 
        }   
         
        if (townName2=="Haihara") {
            if (fieldValues2=="Perhepaeivaehoito") {
                var nameValue2 = "props" + townName2 + "Perhepaivahoito_xml";  
            }
            if (fieldValues2=="Paeivaekoti") {
                var nameValue2 = "props" + townName2 + "Paivakoti_xml";  
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

function fieldValueDisplay(fieldValues2,targetName2,alue,tyyppi){
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
        
        Paivahoitohakemus_Form.getJSXByName(alue).setXMLString(defaultXML);        
        Paivahoitohakemus_Form.getJSXByName(alue).resetXmlCacheData();        
        Paivahoitohakemus_Form.getJSXByName(alue).repaint();        
        Paivahoitohakemus_Form.getJSXByName(alue).setValue(defaultValue).repaint();        
        Paivahoitohakemus_Form.getJSXByName(alue).setDefaultText(defaultText2).repaint();        
        Paivahoitohakemus_Form.getJSXByName(tyyppi).setValue(defaultValue).repaint();        
        Paivahoitohakemus_Form.getJSXByName(tyyppi).setDefaultText(defaultText).repaint();
        
        Paivahoitohakemus_Form.getJSXByName(targetName2 + "Tyyppi").setXMLString(Paivahoitohakemus_Form.getCache().getDocument(nameValue2).toString());
        Paivahoitohakemus_Form.getJSXByName(targetName2 + "Tyyppi").resetXmlCacheData();
        Paivahoitohakemus_Form.getJSXByName(targetName2 + "Tyyppi").repaint();       
        
}

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
    if(Paivahoitohakemus_Form.getJSXByName("Huoltaja_Huoltajuus").getText() == "Yksinhuoltajuus"){
       Paivahoitohakemus_Form.getJSXByName("Puoliso").setDisplay("none").repaint();
    } 
    else if(Paivahoitohakemus_Form.getJSXByName("Huoltaja_Perhesuhde").getText() == "Naimaton"){
       Paivahoitohakemus_Form.getJSXByName("Puoliso").setDisplay("none").repaint();
    } 
    else if(Paivahoitohakemus_Form.getJSXByName("Huoltaja_Perhesuhde").getText() == "Leski"){
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


function getTaskSubscribe() {
Intalio.Internal.Utilities.SERVER.subscribe(
Intalio.Internal.Utilities.GET_TASK_SUCCESS, prepareForm);
};


function prepareForm() {
   // alert("prepareForm");
   // var username = Intalio.Internal.Utilities.getUser();
    
    // form1.getJSXByName("User_Sender").setValue(Intalio.Internal.Utilities.getUser()).repaint();
    
    var username = Intalio.Internal.Utilities.getUser();
    username = username.substring((username.indexOf("/")+1));
    //alert(username);

    
        try {

            // Add form preload functions here.
            var userUid = Arcusys.Internal.Communication.GetUserUidByUsername(username);
            //Arcusys.Internal.Communication.GerLDAPUser();
            
            if(userUid != null) {
                Paivahoitohakemus_Form.getJSXByName("Paatos_Extend02").setValue(userUid.selectSingleNode("//userUid", "xmlns:ns2='http://soa.common.koku.arcusys.fi/'").getValue()).repaint();
            }
        } catch (e) {
            alert(e);
        }
    
        
        try {

            // Add form preload functions here.
            var childrenData = Arcusys.Internal.Communication.GetChildrenOfUser(Paivahoitohakemus_Form.getJSXByName("Paatos_Extend02").getValue());
            //Arcusys.Internal.Communication.GerLDAPUser();
            
            if(childrenData != null) {
                mapChildrenNamesToField(childrenData);
            }
        } catch (e) {
            alert(e);
        }
    
}



jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetUserUidByUsername= function(username) {
        
        var tout = 1000;   
        var limit = 100;
        var searchString = "";

        var msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getUserUidByKunpoName><kunpoUsername>" + username + "</kunpoUsername></soa:getUserUidByKunpoName></soapenv:Body></soapenv:Envelope>";
       
        var url = getUrl();
        
        var endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";
        
        /*var msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.kv.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getAppointment><appointmentId>" + appointmentId + "</appointmentId></soa:getAppointment></soapenv:Body></soapenv:Envelope>";
        var endpoint = "http://gatein.intra.arcusys.fi:8080/arcusys-koku-0.1-SNAPSHOT-av-model-0.1-SNAPSHOT/KokuAppointmentProcessingServiceImpl";
        var url = "http://intalio.intra.arcusys.fi:8080/gi/WsProxyServlet2";*/


        msg = "message=" + encodeURIComponent(msg)+ "&endpoint=" + encodeURIComponent(endpoint);

        var req = new jsx3.net.Request();

        req.open('POST', url, false);      
    
        //req.setRequestHeader("Content-Type","text/xml");

        //req.setRequestHeader("SOAPAction","");
        
       req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
       req.send(msg, tout);
       var objXML = req.getResponseXML();
       // alert(req.getStatus());
        
       // var objXML = req.getResponseXML();
       // alert("DEBUG - SERVER RESPONSE:" + objXML);
        if (objXML == null) {
            alert("Virhe palvelinyhteydess\xE4");
        } else {
            return objXML;

        }
    };
});


jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetChildrenOfUser= function(userId) {
        
        var tout = 1000;   
        var limit = 100;
        var searchString = "";

        var msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getUsersChildren><userUid>" + userId + "</userUid></soa:getUsersChildren></soapenv:Body></soapenv:Envelope>";
       
        var url = getUrl();
        
        var endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";
        
        /*var msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.kv.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getAppointment><appointmentId>" + appointmentId + "</appointmentId></soa:getAppointment></soapenv:Body></soapenv:Envelope>";
        var endpoint = "http://gatein.intra.arcusys.fi:8080/arcusys-koku-0.1-SNAPSHOT-av-model-0.1-SNAPSHOT/KokuAppointmentProcessingServiceImpl";
        var url = "http://intalio.intra.arcusys.fi:8080/gi/WsProxyServlet2";*/


        msg = "message=" + encodeURIComponent(msg)+ "&endpoint=" + encodeURIComponent(endpoint);

        var req = new jsx3.net.Request();

        req.open('POST', url, false);      
    
        //req.setRequestHeader("Content-Type","text/xml");

        //req.setRequestHeader("SOAPAction","");
        
       req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
       req.send(msg, tout);
       var objXML = req.getResponseXML();
       // alert(req.getStatus());
        
       // var objXML = req.getResponseXML();
       // alert("DEBUG - SERVER RESPONSE:" + objXML);
        if (objXML == null) {
            alert("Virhe palvelinyhteydess\xE4");
        } else {
            return objXML;

        }
    };
});



function parseXML(xmlData, rootName, childlist) {
    var i, j, attributes, node, childNode, childChildNode, childs;
    i = 0;

    attributes = [];

    childs = xmlData.selectNodeIterator("/\/" + rootName);

    while (childs.hasNext()) {

        attributes[i] = [];
        node = childs.next();
        if (node == null) {
            break;
        }
        for (j = 0; j < (childlist.length+2); j++) {
            childNode = node.getFirstChild();
            while (childNode != null) {
                if (childNode.getNodeName() == childlist[j]) {
                    attributes[i][j] = childNode.getValue();
                    break;
                }
                childNode = childNode.getNextSibling();
            }
        }
        i++;
    }

    return valuesToArray(attributes);
}


/**
 * Compresesses multidimensional array to sigle dimensional
 * Users information comma seperated. One user/node.
 */
function valuesToArray(attributes) {
    var tempArray, i, j, line;
    tempArray = [];

    for (i = 0; i < attributes.length; i++) {
        line = "";
        for (j = 0; j < attributes[i].length; j++) {
            line = line + attributes[i][j];
            if (j < (attributes[i].length - 1 )) {
                line = line + ",";

            }

        }
        tempArray[i] = line;

    }
    return tempArray;
}



function mapChildrenNamesToField(data) {
  //  alert(data);
    var descendants = data.selectNodeIterator("//child", "xmlns:ns2='http://soa.common.koku.arcusys.fi/'");
   // alert(descendants);
    var personId, personDescription, childAttributes; 
    var childAttributeList = new Array(); 
    var xmlForSelectBox = "<data>";
    var childList = ["displayName", "uid"];
    while(descendants.hasNext()) {
    
        childNode = descendants.next();
       // alert(childNode);
       
       childAttributes = parseXML(childNode, "child", childList);
      // alert(childAttributes);
       childAttributeList = childAttributes[0].split(",");
       personName = childAttributeList[0];
       personId = childAttributeList[1];
       
       
       // alert(childNode);
       // requestTemplateId = childNode.getAttributeNode("return");
      // personName = childNode.getFirstChild().getValue();
      // requestTemplateId = childNode.selectSingleNode("//requestTemplateId").getValue();
       // alert(personName);
      //  personId = childNode.getFirstChild().getNextSibling().getNextSibling().getNextSibling().getValue();
       // alert(personId);
       // subject = childNode.selectSingleNode("//subject").getValue();
        //alert(templateDescription);
        xmlForSelectBox = xmlForSelectBox + "<record jsxid=\"" + personId + "\" jsxtext=\"" + personName + "\"/>";
        
       // alert(requestTemplateId + subject);
        personId = "";
        personName = "";
        childNode = null;
    }
    xmlForSelectBox = xmlForSelectBox + "</data>";
   // alert(xmlForSelectBox);
    /*
    for (x in descendants)   {
      alert(descendants[x]);
    }
    */
    
   // data.selectNodes("//tns:getRequestTemplateSummaryResponse", "xmlns:tns='http://soa.kv.koku.arcusys.fi/'");
   // alert("mapTemplateNamesToField" + data);
    /*
       var childIterator = data.selectSingleNode("//getRequestTemplateSummaryResponse", "xmlns:ns2='http://soa.kv.koku.arcusys.fi/'">).getChildIterator();

       while(childIterator.hasNext()){
       
            childNode = childIterator.next();
            alert(childNode);
       }
    */
   // var values = "";
    Paivahoitohakemus_Form.getJSXByName("Lapsi_Valittu").setXMLString(xmlForSelectBox);
    Paivahoitohakemus_Form.getJSXByName("Lapsi_Valittu").resetXmlCacheData();
    Paivahoitohakemus_Form.getJSXByName("Lapsi_Valittu").repaint();
}



/*
function Preload(){

     try {
            Arcusys.Internal.Communication.CallSupportServices();            
        } catch (e) {
            alert(e);
        }  
}
*/
/*


jsx3.lang.Package.definePackage(
  "Arcusys.Internal.Communication",
  function(arc) {

arc.CallSupportServices=function() { 
     
          var tout = 1000; // Define timeout duration
          
          //Define endpoint of webservice to be called by proxy servlet
          
          var endpoint = "/ode/processes/PTTK-LDAP/LDAP-Process/Process/Interface";
          
          //Get user name for input parameter for LDAPServiceWrapper
          
          var username = Intalio.Internal.Utilities.getUser();
          
          //Remove extra intalio realm from username
          //alert(username);
          username = username.substring((username.indexOf("/")+1));
          //alert(username);
          //Define and encode payload
          
          var payload = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:user=\"http://arcusys.fi/LDAP-Process/Process\" xmlns:LDAP=\"http://www.arcusys.fi/PTTK/LDAP\"><soapenv:Header/><soapenv:Body><user:ReceiveRequest><LDAP:user>" + username + "</LDAP:user></user:ReceiveRequest></soapenv:Body></soapenv:Envelope>";
         
          //Define message for servlet
          
          var message = "message=" + encodeURIComponent(payload)+ "&endpoint=" + encodeURIComponent(endpoint);

          var request = new jsx3.net.Request();
          
          // POST to servlet
          
          request.open("POST", "https://epalvelutesti.pohjoiskarjala.net/palvelut-portlet2/ajaxforms/WsProxyServlet2", false);
          request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
          
          request.send(message, tout);
          var response = request.getResponseXML();

          if (response==null) {
             //Could not connect to Servlet
              var error2 = "Palvelinyhteydessa tapahtui virhe";
              //error2 = error2.substr(102, [61]);
              alert(error2); 
          }
          else {
             //Connection was successfull. Map all values from web service response
             
             var firstname = response.selectSingleNode("//tns:Firstname", "xmlns:tns='http://www.arcusys.fi/PTTK/LDAP'").getValue();
             var lastname = response.selectSingleNode("//tns:Lastname", "xmlns:tns='http://www.arcusys.fi/PTTK/LDAP'").getValue();
             var ssn = response.selectSingleNode("//tns:Ssn", "xmlns:tns='http://www.arcusys.fi/PTTK/LDAP'").getValue();
             var mail =response.selectSingleNode("//tns:Email", "xmlns:tns='http://www.arcusys.fi/PTTK/LDAP'").getValue();
             var address = response.selectSingleNode("//tns:Address1", "xmlns:tns='http://www.arcusys.fi/PTTK/LDAP'").getValue();
             var phone = response.selectSingleNode("//tns:Phone1", "xmlns:tns='http://www.arcusys.fi/PTTK/LDAP'").getValue();
             var postoffice = response.selectSingleNode("//tns:PostOffice1", "xmlns:tns='http://www.arcusys.fi/PTTK/LDAP'").getValue();
             var postalcode = response.selectSingleNode("//tns:PostalCode1", "xmlns:tns='http://www.arcusys.fi/PTTK/LDAP'").getValue();
             
                        
             if (firstname!=null){
             
             //Check is response was okay and map to Form JSX variables.
             
                 Paivahoitohakemus_Form.getJSXByName("Huoltaja_Etunimi").setValue(firstname);
                 Paivahoitohakemus_Form.getJSXByName("Huoltaja_Sukunimi").setValue(lastname);
                 Paivahoitohakemus_Form.getJSXByName("Huoltaja_Henkilotunnus").setValue(ssn);
                 Paivahoitohakemus_Form.getJSXByName("Huoltaja_Sahkopostiosoite").setValue(mail);
                 Paivahoitohakemus_Form.getJSXByName("Lapsi_Lahiosoite").setValue(address);
                 Paivahoitohakemus_Form.getJSXByName("Huoltaja_Puhelin").setValue(phone);
                 Paivahoitohakemus_Form.getJSXByName("Lapsi_Postinumero").setValue(postalcode);
                 Paivahoitohakemus_Form.getJSXByName("Lapsi_Postitoimipaikka").setValue(postoffice);
              }
          }            
 };
 }
);



jsx3.lang.Package.definePackage(
  "Intalio.Internal.Utilities",
  function(util) {


     util.showLoading = function() {
        Intalio.Internal.Utilities.hideSuccess();
        Intalio.Internal.Utilities.dimForm();
        var div = document.getElementById("IntalioInternal_loading");
        Intalio.Internal.Utilities.centerDiv(div);
        div.style.visibility = "hidden";
    };
  }
);*/