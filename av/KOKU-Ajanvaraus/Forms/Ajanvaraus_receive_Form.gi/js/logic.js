/* place JavaScript code here */

// Prestart --------------------------------------------------------------------------------------------------------------------------------------

function intalioPreStart() {
    var entry;
    
    if (AjanvarausForm.getJSXByName("Lomake_Hylkaa").getChecked()) {
        if(!confirmation("Olet peruuttamassa tapaamista")) {
            return "Tapaamista ei peruttu";
        }
    } else if (checkApprovedSlot()) {
        entry = getEntry();
   
        if (!confirmation("Olet varaamassa tapaamista ajalle: " + entry)) {
            return "Tapaamista ei varattu";
        }
    } else {
        return "Sinun t\u00E4ytyy joko valita aika tai peruuttaa tapaaminen";
    } 
    
    changeStatus();
    throughTextfields();
    return null;
}

function escapeHTML(value) {
                if (value !== null && value !== undefined && isNaN(value) && value.replace()) {
                        return value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
                } else {
                        return value;
                }
}

// Goes through textfields in order to check XSS-vulnerabilities.
function throughTextfields() {
    var temp, value, descendants = [];
    descendants = AjanvarausForm.getJSXByName("root").getDescendantsOfType("jsx3.gui.TextBox");
    
    for( i = 0; i < descendants.length; i++) {
        value = AjanvarausForm.getJSXByName(descendants[i].getName()).getValue();
        temp = escapeHTML(value);
        AjanvarausForm.getJSXByName(descendants[i].getName()).setValue(temp);
        AjanvarausForm.getJSXByName(descendants[i].getName()).repaint();
    }
}

function confirmation(question){
    if (confirm(question)) {
        return true;
    }
    else {
        return false;
    }
}

function checkApprovedSlot() {
    var slots, i, approved;
    slots = AjanvarausForm.getJSXByName("Ajat").getDescendantsOfType("jsx3.gui.CheckBox");
    approved = false;
    
    for (i = 0; i < slots.length; i++) {
        if (slots[i].getChecked()) {
            approved = true;
            break;
        }
    }   
    return approved;
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

function uncheckAll(target) {
    var i, descendants;
    descendants = target.getDescendantsOfType("jsx3.gui.CheckBox");
    for (i = 0; i < descendants.length; i++) {
        descendants[i].setChecked(0);
    }
}

function uncheckTheOthers(target, checked) {
    var i, descendants = target.getDescendantsOfType("jsx3.gui.CheckBox");

    for (i = 0; i < descendants.length; i++)   {
        if (descendants[i] != checked) {
            descendants[i].setChecked(0);
        }
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
        
    if (activeSelection != "") {
        if ((selectBoxName == activeSelection) && (AjanvarausForm.getJSXByName("selectBoxName").getChecked() == false)) {
            AjanvarausForm.getJSXByName("requireApprovedSlotNumber").setRequired(0);
            AjanvarausForm.getJSXByName("Lomake_Hyvaksytty_Aika").setValue(selectBoxName);
         }
         else {     
            AjanvarausForm.getJSXByName("activeSelect").setValue(selectBoxName);        
            AjanvarausForm.getJSXByName(activeSelection).setChecked(false);
                
            AjanvarausForm.getJSXByName("requireApprovedSlotNumber").setRequired(0);
            AjanvarausForm.getJSXByName("Lomake_Hyvaksytty_Aika").setValue(selectBoxName);
        }
    }    
    else {
        AjanvarausForm.getJSXByName("activeSelect").setValue(selectBoxName); 
        AjanvarausForm.getJSXByName("requireApprovedSlotNumber").setRequired(0);
        AjanvarausForm.getJSXByName("Lomake_Hyvaksytty_Aika").setValue(selectBoxName);
    }    
    AjanvarausForm.getJSXByName("Lomake_Hylkaa").setChecked(false);
    AjanvarausForm.getJSXByName("calendarEntryBlock").repaint();
    
    
}//radioSelect()

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
        infotext = attributes[i][5];
               
        entryText = pvm + ", klo: " + alkaa + " - " + paattyy + ", paikka: " + paikka;
        
        addNewEntry(entryText, infotext, numero);
        refreshBlock();
    }
}

//refreshes the block and sets new height.
function refreshBlock() {
    var newHeight, child;
    //currentHeigh = AjanvarausForm.getJSXByName("calendarEntryBlock").getHeight();

    if(AjanvarausForm.getJSXByName("calendarEntryBlock").getFirstChild() != null) {
        child = AjanvarausForm.getJSXByName("calendarEntryBlock").getFirstChild();
        newHeight += child.getHeight();
        while(child.getNextSibling() != null) {
            child = child.getNextSibling();
            newHeight += child.getHeight();
        }
    }
    else {
        newHeight = 0;
    }
    AjanvarausForm.getJSXByName("calendarEntryBlock").setHeight(newHeight);
    AjanvarausForm.getJSXByName("calendarEntryBlock").repaint();
}

function addNewEntry(entryText, infotext, numero) {
    
    var ajankohtaPanel, yesBox, label;
    if(AjanvarausForm.getJSXByName("calendarEntryBlock").getFirstChild() != null) {
        var lastChild = AjanvarausForm.getJSXByName("calendarEntryBlock").getLastChild();
        var previousLabel = lastChild.getDescendantOfName("label");
        var splitted = previousLabel.getText().split(",");
    
        if (splitted[0] != "ajankohta" ) {
            var entryTextSplit = entryText.split(",");
            if (splitted[0] != entryTextSplit[0]) {
                lastChild.setHeight(45);
        
            }   
    
        }       
    }
     
    // When first slot is created. --> load()-operation is slow, so that's why used only once.
    if(AjanvarausForm.getJSXByName("calendarEntryBlock").getFirstChild() == null) {
        ajankohtaPanel = AjanvarausForm.getJSXByName("calendarEntryBlock").load("components/calendarEntry.xml", true);
        
    }
    // For rest of the slots. --> a bit faster than load().
    else {
        ajankohtaPanel = AjanvarausForm.getJSXByName("calendarEntryBlock").getFirstChild().doClone();
       
    }
 
    ajankohtaPanel.setName("panel" + numero);
     
       
    parentNode = AjanvarausForm.getJSXByName("panel" + numero);
             
    yesBox = parentNode.getFirstChild().getFirstChild().getFirstChild().getFirstChild().getFirstChild().getFirstChild();
       
    yesBox.setName(numero);
    label = parentNode.getDescendantOfName("label");
    label.setText(entryText).repaint();

    AjanvarausForm.getJSXByName("counter").setValue(numero);

    if(infotext) {
        parentNode.getDescendantOfName("infotext").setValue(infotext);
    } else {
        parentNode.getDescendantOfName("tooltipImg").setDisplay("none", true);
    }
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
    arc.GetFormData = function(id, targetPerson) {
        var msg, endpoint, url, tout, appointmentId, req, objXML;
    
        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.av.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getAppointmentForReply><appointmentId>" + id + "</appointmentId><arg1>" + targetPerson + "</arg1></soa:getAppointmentForReply></soapenv:Body></soapenv:Envelope>";

        endpoint = getEndpoint("KokuAppointmentProcessingService");
        // endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-av-model-0.1-SNAPSHOT/KokuAppointmentProcessingServiceImpl";
        url = getUrl();
        
        tout = 1000;
        appointmentId = id;

        msg = "message=" + encodeURIComponent(msg)+ "&endpoint=" + encodeURIComponent(endpoint);

        req = new jsx3.net.Request();

        req.open('POST', url, false);      
        
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
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

    var url = window.location.href;
    var url_parts = url.split("/");
    var domain_name = url_parts[0] + "//" + url_parts[2];
       
    return domain_name;

}

//Getting the domain name and port if available
function getUrl() {
    var domain;

    domain = getDomainName();

    return domain + "/palvelut-portlet/ajaxforms/WsProxyServlet2";

}

kokuServiceEndpoints = null;

function getEndpoint(serviceName) {
        if (kokuServiceEndpoints == null) {
                kokuServiceEndpoints = this.parent.getKokuServicesEndpoints();
        }
        
        return kokuServiceEndpoints.services[serviceName];
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

function showDialog(dialogId, text, textTitle, title) {
    var dialog, cssDisplay;

    dialog = $("#" + dialogId);

    cssDisplay = dialog.css('display');
    if (cssDisplay === 'none') {
        dialog.dialog({title: title});
        dialog.dialog("option", "width", 400);
        dialog.dialog("option", "height", 300);
        dialog.dialog("option", "position", ['middle', 'middle']);
        dialog.parent().css('display', 'block');
        dialog.dialog();
    } else {
        dialog.dialog({show: null});
    }
    dialog.html("<p style=\"text-align:left;\"><b>" + textTitle + "</b></p><p style=\"margin:0 0 0 0;\">" + text + "</p>");
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