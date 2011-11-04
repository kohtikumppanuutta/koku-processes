/* place JavaScript code here */

// Prestart --------------------------------------------------------------------------------------------------------------------------------------

function intalioPreStart() {
    var entry;
    
    if (AjanvarausForm.getJSXByName("Lomake_Hyvaksytty_Aika").getValue()) {
        entry = getEntry();
   
        if (!confirmation("Olet varaamassa tapaamista ajalle: " + entry)) {
            return "Lomaketta ei tallennettu";
        }
    }
    else {
        if(!confirmation("Olet peruuttamassa tapaaamista")) {
            return "Lomaketta ei tallenettu";
        }
    }
    
    changeStatus();
    return null;
}

function confirmation(question){
    if (confirm(question)) {
        return true;
    }
    else {
        return false;
    }
}

function getEntry() {
    var descendants, id, entryText;
    
    id = AjanvarausForm.getJSXByName("Lomake_Hyvaksytty_Aika").getValue();
    entryText = AjanvarausForm.getJSXByName(id).getAncestorOfName("pane").getNextSibling().getChild("label").getText();
    
    return entryText;
}

function changeStatus() {
    var i, entries;

    if (AjanvarausForm.getJSXByName("Lomake_Hylkaa").getChecked()) {
        AjanvarausForm.getJSXByName("Lomake_Status").setValue("Declined");
    }
    else {
        entries = AjanvarausForm.getJSXByName("Ajat").getDescendantsOfType("jsx3.gui.CheckBox");
        for (i=0;i<entries.length;i++) {
            if (entries[i].getChecked()) {
                AjanvarausForm.getJSXByName("Lomake_Status").setValue("Approved");
                return;
            }
         }
    }
}

// General functions -----------------------------------------------------------------------------------------------------------------------------

function formatDataCache(cache, matrix) {
    if (AjanvarausForm.getCache().getDocument(cache).getFirstChild() == null) {
        AjanvarausForm.getJSXByName(matrix).commitAutoRowSession();
        return true;
    }
    else {
        return false;
    }
}

// Adding appointment entry slots ----------------------------------------------------------------------------------------------------------------------------

function setApprovedNumber(selectBoxName) {
   if (AjanvarausForm.getJSXByName(selectBoxName).getChecked()) {
      AjanvarausForm.getJSXByName("Lomake_Hyvaksytty_Aika").setValue(selectBoxName);
   }
   else {
      AjanvarausForm.getJSXByName("Lomake_Hyvaksytty_Aika").setValue("");
   }
}

function radioSelect(selectBoxName) {   
        
    var activeSelection = AjanvarausForm.getJSXByName("activeSelect").getValue();
    AjanvarausForm.getJSXByName("requireApprovedSlotNumber").setRequired(jsx3.gui.Form.OPTIONAL).repaint();
        
    // If user has not make any selections yet.
    if (activeSelection == "noValue") {
        AjanvarausForm.getJSXByName("Lomake_Hyvaksytty_Aika").setValue(selectBoxName);
        AjanvarausForm.getJSXByName("activeSelect").setValue(selectBoxName);
    }
    
    // If user decides to change his mind --> disable previous selection.
    else {
        AjanvarausForm.getJSXByName("Lomake_Hyvaksytty_Aika").setValue(selectBoxName);
        AjanvarausForm.getJSXByName(activeSelection).setChecked(jsx3.gui.CheckBox.UNCHECKED).repaint();
        AjanvarausForm.getJSXByName("activeSelect").setValue(selectBoxName);
    }
    
    // If user unselects his choice --> setting one selection required state
    if (activeSelection != "noValue" && AjanvarausForm.getJSXByName(selectBoxName).getChecked() == 0) {
        AjanvarausForm.getJSXByName("activeSelect").setValue("noValue");
        AjanvarausForm.getJSXByName("requireApprovedSlotNumber").setRequired(jsx3.gui.Form.REQUIRED).repaint();
     }
} //radioSelect()

// Preload ---------------------------------------------------------------------------------------------------------------------------------------

function Preload() {
    var id, targetPerson;

    if (gup("FormID")) {
        id = gup("FormID");
        targetPerson = gup("arg1");
        AjanvarausForm.getJSXByName("Lomake_ID").setValue(id);
        AjanvarausForm.getJSXByName("Lomake_Kohdehenkilo").setValue(targetPerson);  
       
        try {
            var formData = Arcusys.Internal.Communication.GetFormData(id, targetPerson);

            if(formData != null) {
                mapFormDataToFields(formData);
            }
        }
        catch (e) {
            alert(e);
        }
    }
}

function mapFormDataToFields(objXML) {
    var sender, subject, description, appointmentId, username;

    sender = objXML.selectSingleNode("//sender", "xmlns:ns2='http://soa.av.koku.arcusys.fi/'").getValue();
    subject = objXML.selectSingleNode("//subject", "xmlns:ns2='http://soa.av.koku.arcusys.fi/'").getValue();
    description = objXML.selectSingleNode("//description", "xmlns:ns2='http://soa.av.koku.arcusys.fi/'").getValue();
    appointmentId = objXML.selectSingleNode("//appointmentId", "xmlns:ns2='http://soa.av.koku.arcusys.fi/'").getValue();
    
    inputPreload(objXML);
    
    username = Intalio.Internal.Utilities.getUser();     
    username = username.substring((username.indexOf("/")+1));
    AjanvarausForm.getJSXByName("User_Recipient").setValue(username);

    AjanvarausForm.getJSXByName("User_Sender").setValue(sender).repaint();
    AjanvarausForm.getJSXByName("Otsikko").setTitleText(subject, true);
    AjanvarausForm.getJSXByName("kuvaus").setText(description, true);
    AjanvarausForm.getJSXByName("Lomake_ID").setValue(appointmentId).repaint();
}

function inputPreload(objXML) {
    var attributes, i, j, pvm, pvm1, pvm2, pvm3, numero, alkaa, paattyy, paikka, entryText;

    attributes = getAttributes(objXML);

    for (i=0;i<attributes.length;i++) {       
        pvm = attributes[i][1];
        pvm = pvm.replace("Z", "");
        pvm1 = pvm.substr(8,2);
        pvm2 = pvm.substr(5,2);
        pvm3 = pvm.substr(0,4);
        pvm = pvm1 + "." + pvm2 + "." + pvm3;

        
        numero = attributes[i][0];       
        alkaa = attributes[i][2].substr(0,5);
        paattyy = attributes[i][3].substr(0,5);
        paikka = attributes[i][4];
              
        //LISATAAN MYOHEMMIN TARKISTUS JOS "LISATIETOJA" -KENTTA ON TYHJA NIIN JATETAAN SE KIRJOITTAMATTA
        entryText = pvm + ", klo: " + alkaa + " - " + paattyy + ", paikka: " + paikka;
        addNewEntry(entryText, numero);
    }
}

function addNewEntry(entryText, numero) {
    var ajankohtaPanel, yesBox, label;

    ajankohtaPanel = AjanvarausForm.getJSXByName("Ajat").load("components/calendarEntry.xml",true);

    ajankohtaPanel.setName("ajankohtaPanel" + numero);
    yesBox = ajankohtaPanel.getFirstChild().getFirstChild().getFirstChild().getFirstChild().getFirstChild().getFirstChild();

    yesBox.setName(numero);

    AjanvarausForm.getJSXByName("counter").setValue(numero);
    label = ajankohtaPanel.getFirstChild().getFirstChild().getFirstChild().getLastChild().getFirstChild();

    label.setText(entryText).repaint();
} //addNewEntry()

function getAttributes(objXML) {
    var formData, i=0, j=0, attributes, slots;

    formData = objXML;
    attributes = new Array();
    slots = formData.selectNodeIterator("//slots");

    while(slots.hasNext()) {
        node = slots.next();
        if (!node.getFirstChild()) {
            break;
        }
        attributes[i] = new Array();
        childNode = node.getFirstChild();
        while(childNode != null) {
            attributes[i][j] = childNode.getValue();
            childNode = childNode.getNextSibling();
            j++;
        }
        j=0;
        i++;
    }

    return attributes;
}

// Web Service Calls -----------------------------------------------------------------------------------------------------------------------------

//Package FormPreFill
jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetFormData= function(id, targetPerson) {
        var msg, endpoint, url, tout, appointmentId, req, objXML;
    
        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.av.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getAppointmentForReply><appointmentId>" + id + "</appointmentId><arg1>" + targetPerson + "</arg1></soa:getAppointmentForReply></soapenv:Body></soapenv:Envelope>";
        endpoint = "http://trelx51x:8080/arcusys-koku-0.1-SNAPSHOT-av-model-0.1-SNAPSHOT/KokuAppointmentProcessingServiceImpl";
        //endpoint="http://localhost:8180/arcusys-koku-0.1-SNAPSHOT-av-model-0.1-SNAPSHOT/KokuAppointmentProcessingServiceImpl";
        url = getUrl();
        
        tout = 1000;
        appointmentId = id;

        msg = "message=" + encodeURIComponent(msg)+ "&endpoint=" + encodeURIComponent(endpoint);

        req = new jsx3.net.Request();

        req.open('POST', url, false);      
        
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send(msg, tout);
        objXML = req.getResponseXML();

        if (objXML == null) {
            alert("Virhe palvelinyhteydessa");
        }
        else {
            return objXML;
        }
    };
});

// Extra Functions -------------------------------------------------------------------------------------------------------------------------------

function getDomainName() {
    var url, url_parts, domain_name_parts, domain_name;

    url = window.location.href;
    url_parts = url.split("/");
    domain_name_parts = url_parts[2].split(":");
    domain_name = domain_name_parts[0];

    return domain_name;
}

function getDomainName() {

    var url = window.location.href;
    var url_parts = url.split("/");
    var domain_name = url_parts[2];
       
    return domain_name;

}

function getUrl() {
    
    var domain = getDomainName();
    return "http://" + domain + "/palvelut-portlet/ajaxforms/WsProxyServlet2";

}

function gup(name) {
    var regexS, regex, results;

    name = name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
    regexS = "[\\?&]"+name+"=([^&#]*)";
    regex = new RegExp( regexS );
    results = regex.exec( window.location.href );
    if(results[1].match("%20"))
    {
        results[1] = results[1].replace("%20"," ");
    }
    if( results == null )
        return false;
    else
        return results[1];
}

jsx3.lang.Package.definePackage(
  "Intalio.Internal.CustomErrors",
  function(error) {


    error.getError=function(name){
        var errortext = AjanvarausForm.getJSXByName(name).getTip();
        errortext = "Puuttuvat tiedot: " + errortext;
        return errortext;
    };
  }
);