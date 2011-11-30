// Prestart --------------------------------------------------------------------------------------------------------------------------------------

function setTooltipSpanWidth() {
    $("span[label=tooltipImg]").css('width', '30');
}

function intalioPreStart() {
    var error = checkTicks();
    if (TIVAForm.getJSXByName("Suostumus_Hylkaa").getChecked()) {
        if (!confirmation("Haluatko varmasti hyl\u00E4t\u00E4 suostumuksen?")) {
            return "Lomaketta ei tallennettu";
        } else {
            TIVAForm.getJSXByName("Suostumus_Status").setValue("Evatty");
        }
    } else {
        mapFieldsToMatrix();
    }
    if (error != null) {
        return ("Valitse tai hylk\u00E4\u00E4 suostumus");
    } else {
        return null;
    }
}

function checkTicks() {
    var flag, reject = TIVAForm.getJSXByName("Suostumus_Hylkaa").getChecked(), nodes = TIVAForm.getJSXByName("suostumukset_block").getDescendantsOfType("jsx3.gui.CheckBox");
    if (reject) {
        flag = true;
    } else {
        flag = false;
        for (i = 0; i < nodes.length; i++) {
            if (nodes[i].getChecked()) {
                flag = true;
                break;
            }
        }
    }
    if (flag) {
        TIVAForm.getJSXByName("checkTicks").setRequired(0);
    } else {
        TIVAForm.getJSXByName("checkTicks").setRequired(1);
    }
}

function confirmation(question){
    if (confirm(question)) {
        return true;
    } else {
        return false;
    }
}

function cancelConsent(check) {
    if (check) {
        if (TIVAForm.getJSXByName("Suostumus_Status").getValue() == "Vastattu") {
            uncheckAll(TIVAForm.getJSXByName("suostumukset_block"));
        }
    }
}

// General functions -----------------------------------------------------------------------------------------------------------------------------

function formatDataCache(cache, matrix) {
    if (TIVAForm.getCache().getDocument(cache).getFirstChild() == null) {
        TIVAForm.getJSXByName(matrix).commitAutoRowSession();
        return true;
    } else {
        return false;
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

function uncheckAll(target) {
    var i, descendants;
    descendants = target.getDescendantsOfType("jsx3.gui.CheckBox");
    for (i = 0; i < descendants.length; i++) {
        descendants[i].setChecked(0);
    }
}

function disableAll(target) {
    var i, descendants;
    
    descendants = target.getDescendantsOfType("jsx3.gui.CheckBox");
    for (i = 0; i < descendants.length; i++) {
        descendants[i].setEnabled(0, true);
    }
}

function setCurrentDate(targetName)    {
    var currentDate = new Date();
    TIVAForm.getJSXByName("Suostumus_Pvm").setValue(currentDate);
}

function isValidDate(node) {
    var checkDate, checkDate1, checkDate2, checkDate3, currentValue;

    currentValue = TIVAForm.getJSXByName("tempDate").getValue();
    checkDate1 = node.getValue().substr(0, 2);
    checkDate2 = node.getValue().substr(3, 2);
    checkDate3 = node.getValue().substr(6, 4);
    checkDate = new Date();
    checkDate2 = parseInt(checkDate2 - 1, 10);
    if (checkDate2.length == 1) {
        checkDate2 = "0" + checkDate2;
    }
    checkDate.setFullYear(checkDate3, checkDate2, checkDate1);
    today = new Date();
    if (checkDate < today) {
        alert('Virheellinen p\u00E4iv\u00E4m\u00E4\u00E4r\u00E4. P\u00E4iv\u00E4m\u00E4\u00E4r\u00E4n t\u00E4ytyy olla t\u00E4t\u00E4 hetke\u00E4 my\u00F6hemm\u00E4lt\u00E4 ajanjaksolta!');
        node.setValue(currentValue);
    } else {
        TIVAForm.getJSXByName("tempDate").setValue(node.getValue());
    }
}

// Consent actions -------------------------------------------------------------------------------------------------------------------------------

function mapFieldsToMatrix() {
    var i, id, vastaus, checks = 0, hasEmptyChild, vastaukset, node;
    vastaukset = TIVAForm.getJSXByName("suostumukset_block").getChildren();

    hasEmptyChild = formatDataCache("Vastaukset-nomap", "Vastaukset");

    for (i = 0; i < vastaukset.length; i++) {
        vastaus = vastaukset[i].getDescendantOfName("vastaus").getValue();
        id = vastaukset[i].getDescendantOfName("choiceId").getValue();

        if (vastaus == 1) {
            checks++;
        }

        node = TIVAForm.getCache().getDocument("Vastaukset-nomap").getFirstChild().cloneNode();

        node.setAttribute("jsxid", id);
        node.setAttribute("Vastaukset_VastausId", id);
        node.setAttribute("Vastaukset_Vastaus", vastaukset[i].getDescendantOfName("vastaus").getChecked());
        TIVAForm.getCache().getDocument("Vastaukset-nomap").insertBefore(node);
    }
    if (hasEmptyChild) {
        TIVAForm.getCache().getDocument("Vastaukset-nomap").removeChild(TIVAForm.getCache().getDocument("Vastaukset-nomap").getFirstChild());
    }
    if (checks < vastaukset.length) {
        TIVAForm.getJSXByName("Suostumus_Status").setValue("Osa suostumuksista puuttuu");
    } else {
        TIVAForm.getJSXByName("Suostumus_Status").setValue("Voimassa");
    }
}

function addChoice(id, description, infotext) {
    var section, label, choiceId, info;

    section = TIVAForm.getJSXByName("suostumukset_block").load("components/choice.xml",true);

    TIVAForm.getJSXByName("suostumukset_block").setHeight(TIVAForm.getJSXByName("suostumukset_block").getHeight() + 30, true);

    label = section.getDescendantOfName("choiceLabel");
    choiceId = section.getChild("choiceId");
    info = section.getDescendantOfName("choice_tarkentavaTeksti");

    if (infotext) {
        info.setValue(infotext);
    } else {
        section.getDescendantOfName("tooltipImg").setDisplay("none", true);
    }
    setTooltipSpanWidth();

    label.setText(description, true);
    label.setName(label.getName() + id);
    section.setName(section.getName() + id);
    choiceId.setValue(id);
}

// Preload ---------------------------------------------------------------------------------------------------------------------------------------

function preload() {
    var username, uidData, uid;

    username = Intalio.Internal.Utilities.getUser();
    username = username.substring((username.indexOf("/") + 1));
    uidData = Arcusys.Internal.Communication.getUserId(username);
    uid = uidData.selectSingleNode("//userUid", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
    TIVAForm.getJSXByName("Kayttaja_Vastaanottaja").setValue(username).repaint();

    if (gup("FormID")) {
        id = gup("FormID");
        TIVAForm.getJSXByName("Suostumus_SuostumusId").setValue(id);

        try {
            formData = Arcusys.Internal.Communication.GetFormData(id, uid);

            if(formData != null) {
                mapFormDataToFields(formData);
            }
        }
        catch (e) {
            alert(e);
        }
    }
    
    if (TIVAForm.getJSXByName("Suostumus_Status").getValue() == "Vastattu") {
        TIVAForm.getJSXByName("checkTicks").setRequired(0);
        TIVAForm.getJSXByName("rejectLabel").setText("Mit\u00E4t\u00F6i suostumus", true);
        TIVAForm.getJSXByName("tempDate").setValue(TIVAForm.getJSXByName("Suostumus_Maara_Aika").getValue());
    }
}

function mapFormDataToFields(objXML) {
    var i, pohjaId, otsikko, saateteksti, laatija, actionReplies, vastattu, attributes, vastaanottaja, maaraaika, maaraaika1, maaraaika2, maaraaika3, aikaraja, aikaraja1, aikaraja2, aikaraja3, kommentti, targetPersonUid;
    // Get basic information from xml document

    pohjaId = objXML.selectSingleNode("//suostumuspohjaId", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
    otsikko = objXML.selectSingleNode("//otsikko", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
    saateteksti = objXML.selectSingleNode("//saateteksti", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
    actionReplies = objXML.selectNodeIterator("//actionReplies", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'");
    targetPersonUid = objXML.selectSingleNode("//targetPersonUid", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
    targetPersonData = Arcusys.Internal.Communication.getUserInfo(targetPersonUid);
    targetPerson = targetPersonData.selectSingleNode("//firstname", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue() + " " + targetPersonData.selectSingleNode("//lastname", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();

    if (objXML.selectSingleNode("//alreadyReplied", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'")) {
        vastattu = objXML.selectSingleNode("//alreadyReplied", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
    }
    attributes = getAttributes(objXML);
    if (objXML.selectSingleNode("//endDateMandatory", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'")) {
        vakioMaaraaika = objXML.selectSingleNode("//endDateMandatory", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
    }

    if (objXML.selectSingleNode("//maaraaika", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'")) {
        maaraaika = objXML.selectSingleNode("//maaraaika", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
        maaraaika = maaraaika.replace("Z", "");
        maaraaika1 = maaraaika.substr(8, 2);
        maaraaika2 = maaraaika.substr(5, 2);
        maaraaika3 = maaraaika.substr(0, 4);
        maaraaika = maaraaika1 + "-" + maaraaika2 + "-" + maaraaika3;
        TIVAForm.getJSXByName("Suostumus_Maara_Aika").setValue(maaraaika).repaint();
    }

    if (objXML.selectSingleNode("//replyTillDate", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'")) {
        aikaraja = objXML.selectSingleNode("//replyTillDate", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
        aikaraja = aikaraja.replace("Z", "");
        aikaraja1 = aikaraja.substr(8, 2);
        aikaraja2 = aikaraja.substr(5, 2);
        aikaraja3 = aikaraja.substr(0, 4);
        aikaraja = aikaraja1 + "-" + aikaraja2 + "-" + aikaraja3;
        TIVAForm.getJSXByName("Suostumus_Aikaraja").setValue(aikaraja).repaint();
    }

    if (objXML.selectSingleNode("//kommentti", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'")) {
        kommentti = objXML.selectSingleNode("//kommentti", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
        TIVAForm.getJSXByName("Suostumus_Kommentti").setValue(kommentti).repaint();
    }

    for (i = 0; i < attributes.length; i++) {
        addChoice(attributes[i][0], attributes[i][1], attributes[i][2]);
        if (attributes[i][0] > TIVAForm.getJSXByName("id").getValue()) {
            TIVAForm.getJSXByName("id").setValue(parseInt(TIVAForm.getJSXByName("id").getValue()) + 1);
        }
    }
    
    setPermittedSlots(actionReplies);
    
    // Map values to the form fields
    if (vakioMaaraaika == "true") {
        TIVAForm.getJSXByName("Suostumus_Maara_Aika").setEnabled(0, true);
    }
    if (vastattu == "true") {
        TIVAForm.getJSXByName("Suostumus_Status").setValue("Vastattu");
        disableAll(TIVAForm.getJSXByName("suostumukset_block"));
    }
    TIVAForm.getJSXByName("Pohja_PohjaId").setValue(pohjaId);
    TIVAForm.getJSXByName("Suostumus").setTitleText(otsikko, true);
    TIVAForm.getJSXByName("Suostumus_Kuvaus").setText(saateteksti, true);
    TIVAForm.getJSXByName("targetPersonLabel").setText("<b>Lapsen nimi: </b>" + targetPerson, true);

}

function setPermittedSlots(actionReplies) {
    var nodes, permitted, slotNumber, slot, check, block;

    block = TIVAForm.getJSXByName("suostumukset_block");
    slot = block.getFirstChild();

    while (actionReplies.hasNext()) {
        nodes = actionReplies.next();
        permitted = nodes.getFirstChild().getNextSibling().getValue();
        if (slot) {
            check = slot.getDescendantOfName("vastaus");
            if (permitted == "true") {
                check.setChecked(1,true);
            }
            if (slot.getNextSibling()) {
                slot = slot.getNextSibling();
            }
        }
        
    }
}

function getAttributes(objXML) {
    var i = 0, j = 0, attributes = [], toimenpiteet, node;

    toimenpiteet = objXML.selectNodeIterator("//toimenpiteet");

    while(toimenpiteet.hasNext()) {
        node = toimenpiteet.next();
        if (!node.getFirstChild()) {
            break;
        }
        attributes[i] = [];
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

// Web Service calls -----------------------------------------------------------------------------------------------------------------------------

//Package FormPreFill
jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function (arc) {
    arc.GetFormData = function (id, username) {
        var tout, suostumusId, msg, endpoint, url, req, objXML;

        tout = 1000;   
        suostumusId = id;

        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.tiva.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getSuostumusForReply><suostumusId>" + suostumusId + "</suostumusId><suostuja>" + username + "</suostuja></soa:getSuostumusForReply></soapenv:Body></soapenv:Envelope>";
        endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-tiva-model-0.1-SNAPSHOT/KokuSuostumusProcessingServiceImpl";
        url = getUrl();

        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);

        req = new jsx3.net.Request();
        req.open('POST', url, false);

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send(msg, tout);
        objXML = req.getResponseXML();

        if (objXML == null) {
            alert("Virhe palvelinyhteydessa");
        } else {
            return objXML;
        }
    };
});

//Package FormPreFill
jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function (arc) {
    arc.getUserId = function (username) {
        var tout, suostumusId, msg, endpoint, url, req, objXML;

        tout = 1000;   

        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getUserUidByKunpoName><kunpoUsername>" + username + "</kunpoUsername></soa:getUserUidByKunpoName></soapenv:Body></soapenv:Envelope>";
        endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";
        url = getUrl();

        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);

        req = new jsx3.net.Request();
        req.open('POST', url, false);

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send(msg, tout);
        objXML = req.getResponseXML();

        if (objXML == null) {
            alert("Virhe palvelinyhteydessa");
        } else {
            return objXML;
        }
    };
});

jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function (arc) {
    arc.getUserInfo = function (id) {
        var tout, msg, endpoint, url, req, objXML, limit;

        tout = 1000;
        limit = 100;

        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getUserInfo><userUid>" + id + "</userUid></soa:getUserInfo></soapenv:Body></soapenv:Envelope>";
        url = getUrl();
        endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";

        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);

        req = new jsx3.net.Request();
        req.open('POST', url, false);

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send(msg, tout);
        objXML = req.getResponseXML();

        if (objXML == null) {
            alert("Virhe palvelinyhteydessa");
        } else {
            return objXML;
        }

    };
});

// Extra functions -------------------------------------------------------------------------------------------------------------------------------

function getDomainName() {

    var url = window.location.href;
    var url_parts = url.split("/");
    var domain_name = url_parts[0] + "//" + url_parts[2];
       
    return domain_name;

}


function getUrl() {
    
    var domain = getDomainName();
    return domain + "/palvelut-portlet/ajaxforms/WsProxyServlet2";

}

function getEndpoint() {
    var endpoint;

    endpoint = "http://trelx51lb:8080";
    //endpoint = "http://localhost:8180";
    
    return endpoint;
}

function gup(name) {
    var regexS, regex, restuls;

    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    regexS = "[\\?&]" + name + "=([^&#]*)";
    regex = new RegExp(regexS);
    results = regex.exec(window.location.href);
    if (results == null) {
        return false;
    } else {
        return results[1];
    }
}

function showDialog (dialogId, text, textTitle, title) {
    var dialog, cddDisplay;

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
        dialog.dialog({show: null})
    }
    dialog.html("<p style=\"text-align:left;\"><b>" + textTitle + "</b></p><p style=\"margin:0 0 0 0;\">" + text + "</p>");
}