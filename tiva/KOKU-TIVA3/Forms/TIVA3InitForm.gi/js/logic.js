// Prestart --------------------------------------------------------------------------------------------------------------------------------------

function intalioPreStart() {
    clearDataCache("Vastaanottajat-nomap");
    mapSelectedRecipientsToMatrix();
    if (TIVA3Form.getCache().getDocument("Vastaanottajat-nomap").getFirstChild() == null) {
        return "Lomakkeelle ei ole valittu suostujaa!";
    }
    if (TIVA3Form.getJSXByName("Pohja_PohjaId").getValue() == null || TIVA3Form.getJSXByName("Pohja_PohjaId").getValue() == "") {
        return "Kirjaukselle ei ole valittu pohjaa!";
    }
    throughTextfields();
    return null;
}

// Removes HTML-tags.
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
    descendants = TIVA3Form.getJSXByName("root").getDescendantsOfType("jsx3.gui.TextBox");
    
    for( i = 0; i < descendants.length; i++) {
        value = TIVA3Form.getJSXByName(descendants[i].getName()).getValue();
        temp = escapeHTML(value);
        TIVA3Form.getJSXByName(descendants[i].getName()).setValue(temp);
        TIVA3Form.getJSXByName(descendants[i].getName()).repaint();
    }
}


// General functions -----------------------------------------------------------------------------------------------------------------------------

function isValidDate(node, pastOrFuture) {
    var checkDate, checkDate1, checkDate2, checkDate3, today;

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
    if (checkDate < today && pastOrFuture == 1) {
        alert('Virheellinen p\u00E4iv\u00E4m\u00E4\u00E4r\u00E4. P\u00E4iv\u00E4m\u00E4\u00E4r\u00E4n t\u00E4ytyy olla t\u00E4t\u00E4 hetke\u00E4 my\u00F6hemm\u00E4lt\u00E4 ajanjaksolta!');
        node.setValue("");
    } else if (checkDate > today && pastOrFuture == 0) {
        alert('Virheellinen p\u00E4iv\u00E4m\u00E4\u00E4r\u00E4. P\u00E4iv\u00E4m\u00E4\u00E4r\u00E4n t\u00E4ytyy olla t\u00E4t\u00E4 hetke\u00E4 aikaisemmalta ajanjaksolta!');
        node.setValue("");
    }
}

function clearDataCache(cacheName) {
    while (TIVA3Form.getCache().getDocument(cacheName).getFirstChild() != null) {
        TIVA3Form.getCache().getDocument(cacheName).removeChild(TIVA3Form.getCache().getDocument(cacheName).getFirstChild());
    }
}

function formatDataCache(cache, matrix) {
    if (TIVA3Form.getCache().getDocument(cache).getFirstChild() == null) {
        commitCustomAutoRowSession(matrix, cache)
        return true;
    } else {
        return false;
    }
}

function commitCustomAutoRowSession(matrix, cache) {
    var nodes, xmlStr;

    nodes = TIVA3Form.getJSXByName(matrix).getChildren();
    xmlStr = "<data jsxid=\"jsxroot\"><record jsxid=\"\"";

    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i] && nodes[i].getPath() != "jsxid") {
            xmlStr += " " + nodes[i].getPath() + "=\"\"";
        }
    }
    xmlStr += "/></data>";
    TIVA3Form.getCache().getDocument(cache).loadXML(xmlStr);
}


function enabledOnValue(target, value, validValue) {
    if (value == validValue) {
        target.setEnabled(1, true);
    } else {
        target.setValue("");
        target.setEnabled(0, true);
    }
}

function setRequirements(node, value) {
    node.setRequirement(value, true);
}

function uncheckAll(target, check) {
    var i, descendants;

    descendants = target.getDescendantsOfType("jsx3.gui.CheckBox");
    if (!check) {
        for (i = 0; i < descendants.length; i++) {
            descendants[i].setEnabled(1, true);
        }
    } else {
        for (i = 0; i < descendants.length; i++) {
            descendants[i].setChecked(0);
            descendants[i].setEnabled(0, true);
        }
    }
}

function uncheckTheOthers(target, checked) {
    var i, descendants;

    descendants = target.getDescendantsOfType("jsx3.gui.CheckBox");
    for (i = 0; i < descendants.length; i++) {
        if (descendants[i] != checked) {
            descendants[i].setChecked(0);
        }
    }
}

function getData(nodeIterator) {
    var attributes = [], i = 0, nodes, node;

    while(nodeIterator.hasNext()) {
        node = nodeIterator.next();
        attributes[i] = [];
        childNode = node.getFirstChild();
        while(childNode) {
            attributes[i][childNode.getNodeName()] = childNode.getValue();
            childNode = childNode.getNextSibling();
        }
        i++;
    }

    return attributes;
}

function getDataString(nodeIterator) {
    var attributes = [], i = 0, nodes, node, childNode, nodeName, depth = 0;

    while(nodeIterator.hasNext()) {
        node = nodeIterator.next();
        attributes[i] = [];
        childNode = node.getFirstChild();
        while(childNode) {
            if(childNode.getFirstChild()) {
                childNode = childNode.getFirstChild();
                depth++;
            }
            nodeName = childNode.getNodeName();
            if(depth > 0) {
                nodeName = childNode.getParent().getNodeName() + "_" + nodeName;
            }

            if(attributes[i][nodeName]) {
                attributes[i][nodeName] += ",";
            } else {
                attributes[i][nodeName] = "";
            }
            attributes[i][nodeName] += childNode.getValue();

            while(!childNode.getNextSibling() && depth > 0) {
                childNode = childNode.getParent();
                depth--;
            }
            childNode = childNode.getNextSibling();
        }
        i++;
    }

    return attributes;
}

// Functionality ---------------------------------------------------------------------------------------------------------------------------------

function swapConsentGivers(selection) {

// molemmat vanhemmat valittu suostujaksi
    if (selection == 3){
        TIVA3Form.getJSXByName("valittu_suostuja").setDisplay("none", true);
        TIVA3Form.getJSXByName("Suostumus1").setDisplay("block", true);
        TIVA3Form.getJSXByName("Suostumus2").setDisplay("block", true);

        // kenttien pakollisuudet
        TIVA3Form.getJSXByName("Suostumus2_Suostumustapa").setRequired(jsx3.gui.Form.REQUIRED);
        TIVA3Form.getJSXByName("Suostumus2_Suostumustapa").repaint();
        TIVA3Form.getJSXByName("Suostumus2_Suostumusjankohta").setRequired(jsx3.gui.Form.REQUIRED);
        TIVA3Form.getJSXByName("Suostumus2_Suostumusjankohta").repaint();
       } 
        
// toinen vanhempi valittu suostujaksi
    if (selection == 2){
        TIVA3Form.getJSXByName("valittu_suostuja").setDisplay("block", true);
        // TIVA3Form.getJSXByName("valittu_suostuja").repaint();
        TIVA3Form.getJSXByName("Suostumus1").setDisplay("block", true);
        TIVA3Form.getJSXByName("Suostumus2").setDisplay("none", true);
        // kenttien pakollisuudet
        TIVA3Form.getJSXByName("Suostumus2_Suostumustapa").setRequired(jsx3.gui.Form.OPTIONAL);
        TIVA3Form.getJSXByName("Suostumus2_Suostumustapa").repaint();
        TIVA3Form.getJSXByName("Suostumus2_Suostumusjankohta").setRequired(jsx3.gui.Form.OPTIONAL);
        TIVA3Form.getJSXByName("Suostumus2_Suostumusjankohta").repaint();
        } 
// lapsi valittu suostujaksi
    if (selection == 1) {
        TIVA3Form.getJSXByName("valittu_suostuja").setDisplay("none", true);
        TIVA3Form.getJSXByName("Suostumus1").setDisplay("block", true);
        TIVA3Form.getJSXByName("Suostumus2").setDisplay("none", true);
        // kenttien pakollisuudet
        TIVA3Form.getJSXByName("Suostumus2_Suostumustapa").setRequired(jsx3.gui.Form.OPTIONAL);
        TIVA3Form.getJSXByName("Suostumus2_Suostumustapa").repaint();
        TIVA3Form.getJSXByName("Suostumus2_Suostumusjankohta").setRequired(jsx3.gui.Form.OPTIONAL);
        TIVA3Form.getJSXByName("Suostumus2_Suostumusjankohta").repaint();
        
    }
    getTitle();
}

function getTitle() {
    var suostujat, suostujatUid, valittu;
    TIVA3Form.getJSXByName("Suostumus1").setTitleText("", true);
    TIVA3Form.getJSXByName("Suostumus2").setTitleText("", true);
    // Lapsi valittu suostujaksi
    if (TIVA3Form.getJSXByName("suostumuksenAntajat").getValue() == 1) {
        if (TIVA3Form.getCache().getDocument("HaetutLapset-nomap").getFirstChild() == null){
            return;
            }
        etunimi = TIVA3Form.getCache().getDocument("HaetutLapset-nomap").getFirstChild().getAttribute("etunimi");
        sukunimi = TIVA3Form.getCache().getDocument("HaetutLapset-nomap").getFirstChild().getAttribute("sukunimi");
        TIVA3Form.getJSXByName("Suostumus1").setTitleText((etunimi + " " + sukunimi), true); 
    }
    
    // Toinen vanhempi valittu suostujaksi
    if (TIVA3Form.getJSXByName("suostumuksenAntajat").getValue() == 2) {
        if ((suostujatUid = TIVA3Form.getCache().getDocument("HaetutLapset-nomap").getFirstChild() == null) || (TIVA3Form.getJSXByName("suostuja").getValue() == null) || (TIVA3Form.getJSXByName("suostuja").getValue() == ""))
            return;
        valittu = TIVA3Form.getJSXByName("suostuja").getValue();
        suostujatUid = TIVA3Form.getCache().getDocument("HaetutLapset-nomap").getFirstChild().getAttribute("vanhempiUid").split(','); 
        suostujat = TIVA3Form.getCache().getDocument("HaetutLapset-nomap").getFirstChild().getAttribute("vanhempi").split(',');
             for (i = 0; i < suostujat.length; i++) {
                if (suostujatUid[i] == valittu){
                    TIVA3Form.getJSXByName("Suostumus1").setTitleText(suostujat[i], true);
                    return; 
                }
            }
    }

    // Molemmat vanhemmat valittu suostujiksi
    if (TIVA3Form.getJSXByName("suostumuksenAntajat").getValue() == 3) {
        if (TIVA3Form.getCache().getDocument("HaetutLapset-nomap").getFirstChild() == null){
            return;
            }
        suostujat = TIVA3Form.getCache().getDocument("HaetutLapset-nomap").getFirstChild().getAttribute("vanhempi").split(',');
        TIVA3Form.getJSXByName("Suostumus1").setTitleText(suostujat[0], true);            
        TIVA3Form.getJSXByName("Suostumus2").setTitleText(suostujat[1], true);
    }

    }

/*
function formatConsentFields() {
    if (TIVA3Form.getCache().getDocument("receipientsToShow-nomap").getFirstChild().getAttribute("receipient2")) {
        activateVoimassaoloaikaFields(1);
    } else {
        activateVoimassaoloaikaFields(0);
    }
}
*/ 

/*
function activateVoimassaoloaikaFields(check) {
    TIVA3Form.getJSXByName("Suostumus1_Suostumustapa").setValue("");
    TIVA3Form.getJSXByName("Suostumus1_Suostumusajankohta").setValue("");

    TIVA3Form.getJSXByName("Suostumus2_Suostumustapa").setValue("");
    TIVA3Form.getJSXByName("Suostumus2_Suostumusjankohta").setValue("");

    if (check) {
        TIVA3Form.getJSXByName("Suostumus2").setDisplay("block", true);
        TIVA3Form.getJSXByName("Suostumus2_Suostumustapa").setRequired(1, true).repaint();
        TIVA3Form.getJSXByName("Suostumus2_Suostumusjankohta").setRequired(1, true).repaint();
    } else {
        TIVA3Form.getJSXByName("Suostumus2").setDisplay("none", true);
        TIVA3Form.getJSXByName("Suostumus2_Suostumustapa").setRequired(0, true);
        TIVA3Form.getJSXByName("Suostumus2_Suostumusjankohta").setRequired(0, true);
    }    
}
*/

function setSuostujat() {
    var suostuja1, suostuja2, suostuja1Uid, suostuja2Uid, targetPerson;

    suostujat = TIVA3Form.getCache().getDocument("HaetutLapset-nomap").getFirstChild().getAttribute("vanhempi").split(',');
    suostujatUid = TIVA3Form.getCache().getDocument("HaetutLapset-nomap").getFirstChild().getAttribute("vanhempiUid").split(',');
    targetPerson = TIVA3Form.getCache().getDocument("HaetutLapset-nomap").getFirstChild().getAttribute("uid");
    
    data = "";

    for (i = 0; i < suostujat.length; i++) {
        data += "<record jsxid=\"" + suostujatUid[i] + "\" jsxtext=\"" + suostujat[i] + "\" targetPerson=\"" + targetPerson + "\"\/>";
    }
    TIVA3Form.getJSXByName("suostuja").setXMLString("<data>" + data + "<\/data>").resetCacheData();
}

function clearRecipientsData() {
    TIVA3Form.getJSXByName("Kayttaja_Vastaanottaja2").setValue("");
    TIVA3Form.getJSXByName("Suostumus2_Suostumustapa").setValue("").repaint();
    TIVA3Form.getJSXByName("Suostumus2_Suostumusjankohta").setValue("").repaint();
}

function setTargetPerson() {
    TIVA3Form.getJSXByName("Suostumus_Kohdehenkilo").setValue(TIVA3Form.getJSXByName("Viesti_Kohdehenkilo").getText());
}

function getUserName(id) {
    var objXML, firstName, lastName, name;

    objXML = Arcusys.Internal.Communication.getUserInfo(id);
    firstName = objXML.selectSingleNode("//firstname", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
    lastName = objXML.selectSingleNode("//lastname", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();

    name = firstName + " " + lastName;
    return name;
}

// Templates -------------------------------------------------------------------------------------------------------------------------------------

function getTemplates() {
    var formData = Arcusys.Internal.Communication.getTemplatesData("");
    insertTemplates(formData);
}

function insertTemplates(objXML) {
    var id, topic;

    id = objXML.selectNodes("//suostumuspohjaId", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'");
    topic = objXML.selectNodes("//otsikko", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'");

    mapFieldsToMatrix(id, topic);
}

function getTemplate(id) {
    var formData;

    while (TIVA3Form.getJSXByName("block").getFirstChild() != null) {
        TIVA3Form.getJSXByName("block").removeChild(TIVA3Form.getJSXByName("block").getFirstChild());
        TIVA3Form.getJSXByName("block").setHeight(TIVA3Form.getJSXByName("block").getHeight() - 30, true).repaint();
    }

    clearDataCache("Toimenpiteet-nomap");

    TIVA3Form.getJSXByName("Pohja_PohjaId").setValue(id);

    formData = Arcusys.Internal.Communication.GetFormData(id);

    if (formData != null) {
        mapFormDataToFields(formData);
    }
}

function mapFieldsToMatrix(id, topic) {
    var node, i = 0, hasEmptyChild;

    clearDataCache("Pohjat-nomap");

    hasEmptyChild = formatDataCache("Pohjat-nomap", "Pohjat");

    while (id.get(i)) {

        node = TIVA3Form.getCache().getDocument("Pohjat-nomap").getFirstChild().cloneNode();

        node.setAttribute("jsxid", id.get(i).getValue());
        node.setAttribute("jsxtext", topic.get(i).getValue());
        TIVA3Form.getCache().getDocument("Pohjat-nomap").insertBefore(node);
        i++;
    }

    if (hasEmptyChild == true) {
        TIVA3Form.getCache().getDocument("Pohjat-nomap").removeChild(TIVA3Form.getCache().getDocument("Pohjat-nomap").getFirstChild());
    }
}

// Add Actions -----------------------------------------------------------------------------------------------------------------------------------

function mapChoicesToMatrix(id, description, infotext) {
    var node, answerNode, hasEmptyChild, answerHasEmptyChild;

    clearDataCache("Vastaukset-nomap");
    clearDataCache("Toimenpiteet-nomap");

    hasEmptyChild = formatDataCache("Toimenpiteet-nomap", "Toimenpiteet");
    answerHasEmptyChild = formatDataCache("Vastaukset-nomap", "Vastaukset");

    node = TIVA3Form.getCache().getDocument("Toimenpiteet-nomap").getFirstChild().cloneNode();
    answerNode = TIVA3Form.getCache().getDocument("Vastaukset-nomap").getFirstChild().cloneNode();

    node.setAttribute("jsxid", id);
    answerNode.setAttribute("jsxid", id);
    node.setAttribute("Toimenpiteet_ToimenpideId", id);
    answerNode.setAttribute("Vastaukset_VastausId", id);
    answerNode.setAttribute("Vastaukset_Vastaus", true);
    node.setAttribute("Toimenpiteet_Kuvaus", description);
    if (infotext) {
        node.setAttribute("Toimenpiteet_Tarkentava_Teksti", infotext);
    }
    TIVA3Form.getCache().getDocument("Toimenpiteet-nomap").insertBefore(node);
    TIVA3Form.getCache().getDocument("Vastaukset-nomap").insertBefore(answerNode);
    if (hasEmptyChild) {
        TIVA3Form.getCache().getDocument("Toimenpiteet-nomap").removeChild(TIVA3Form.getCache().getDocument("Toimenpiteet-nomap").getFirstChild());
    }
    if (answerHasEmptyChild) {
        TIVA3Form.getCache().getDocument("Vastaukset-nomap").removeChild(TIVA3Form.getCache().getDocument("Vastaukset-nomap").getFirstChild());
    }
}

function removeChoice(node, id) {
    TIVA3Form.getJSXByName("block").removeChild(node);
    TIVA3Form.getCache().getDocument("Toimenpiteet-nomap").removeChild(TIVA3Form.getCache().getDocument("Toimenpiteet-nomap").selectSingleNode("//record[@Toimenpiteet_ToimenpideId='" + id + "']"));
    TIVA3Form.getJSXByName("block").setHeight(TIVA3Form.getJSXByName("block").getHeight() - 30, true).repaint();
}

function addChoice(id, description, infotext, prefill) {
    var section, label, choiceId, info;

    section = TIVA3Form.getJSXByName("block").load("components/choice.xml", true);

    TIVA3Form.getJSXByName("block").setHeight(TIVA3Form.getJSXByName("block").getHeight() + 30, true).repaint();

    label = section.getFirstChild().getFirstChild().getChild("choiceLabel");
    choiceId = section.getChild("choiceId");
    info = section.getDescendantOfName("choice_tarkentavaTeksti");
    if (prefill) {
        section.getDescendantOfName("remChoice").setDisplay("none", true);
    }

    if (infotext) {
        info.setValue(infotext);
    } else {
        section.getDescendantOfName("tooltipImg").setDisplay("none", true);
    }
    label.setName(label.getName() + id);
    section.setName(section.getName() + id);
    label.setText(description, true);
    choiceId.setValue(id);

    mapChoicesToMatrix(id, description, infotext);
}

// Preload ---------------------------------------------------------------------------------------------------------------------------------------

function preload() {
    var username;

    getTemplates("");
    username = Intalio.Internal.Utilities.getUser();
    username = username.substring(username.indexOf("/") + 1);
    uidData = Arcusys.Internal.Communication.GetUserUidByLooraname(username);
    uid = uidData.selectSingleNode("//userUid", "xmlns:ns2='http://soa.common.koku.arcusys.fi/'").getValue();
    userRealName = getUserRealName(uid);
    TIVA3Form.getJSXByName("Kayttaja_Lahettaja").setValue(userRealName).repaint();
}

function getUserRealName(uid) {
    var userData, firstname, lastname;
    userData = Arcusys.Internal.Communication.getUserInfo(uid);
    if (userData.selectSingleNode("//firstname", "xmlns:ns2='http://soa.av.koku.arcusys.fi/'") && userData.selectSingleNode("//lastname", "xmlns:ns2='http://soa.av.koku.arcusys.fi/'")) {
        firstname = userData.selectSingleNode("//firstname", "xmlns:ns2='http://soa.av.koku.arcusys.fi/'").getValue();
        lastname = userData.selectSingleNode("//lastname", "xmlns:ns2='http://soa.av.koku.arcusys.fi/'").getValue();
        return firstname + " " + lastname;
    } else {
        return null;
    }
}

function mapFormDataToFields(objXML) {
    // Get basic information from xml document
    var i, pohjaId, otsikko, saateteksti, laatijaUid, laatijaData, attributes;

    pohjaId = objXML.selectSingleNode("//suostumuspohjaId", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
    otsikko = objXML.selectSingleNode("//otsikko", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
    saateteksti = objXML.selectSingleNode("//saateteksti", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
    laatijaUid = objXML.selectSingleNode("//laatija", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
    laatijaData = Arcusys.Internal.Communication.getUserInfo(laatijaUid);
    attributes = getAttributes(objXML);

    for (i = 0; i < attributes.length; i++) {
        addChoice(attributes[i][0], attributes[i][1], attributes[i][2], true);
    }

    // Map values to the form fields
    TIVA3Form.getJSXByName("Suostumus_SuostumusId").setValue(pohjaId);
    TIVA3Form.getJSXByName("Suostumus").setTitleText(otsikko, true);
    TIVA3Form.getJSXByName("Suostumus_Kuvaus").setText(saateteksti, true);
    if (laatijaUid) {
        TIVA3Form.getJSXByName("Pohja_Laatija").setValue(laatijaUid).repaint();
        TIVA3Form.getJSXByName("laatija_label").setText("<b>Laatija: </b>" + laatijaData.selectSingleNode("//firstname", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue() + " " + laatijaData.selectSingleNode("//lastname", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue(), true);
    }
}

function getAttributes(objXML) {
    var i = 0, j = 0, attributes, toimenpiteet, node, childNode;

    attributes = [];
    toimenpiteet = objXML.selectNodeIterator("//toimenpiteet");
    while (toimenpiteet.hasNext()) {
        attributes[i] = [];
        node = toimenpiteet.next();
        childNode = node.getFirstChild();
        while (childNode != null) {
            attributes[i][j] = childNode.getValue();
            childNode = childNode.getNextSibling();
            j++;
        }
        j = 0;
        i++;
    }
    return attributes;
}

// Recipients functions --------------------------------------------------------------------------------------------------------------------------

function validateAddToRecipients(selection) {
    if (!selection) {
        alert("Suostujat-kentt\u00E4 on tyhj\u00E4. Vastaanottajia ei haettu.");
        return false;
    } else if (selection == 2 && !TIVA3Form.getJSXByName("suostuja").getValue()) {
        alert("Olet valinnut suostumustyypiksi toinen huoltajista, mutta suostuja-kentt\u00E4 on tyhj\u00E4");
        return false;
    } else {
        return true;
    }
}

function setSuostuja2FieldsRequirements(flag) {
    TIVA3Form.getJSXByName("Suostumus2_Suostumustapa").setEnabled(flag, true);
    TIVA3Form.getJSXByName("Suostumus2_Suostumusjankohta").setEnabled(flag, true);
}


/**
 * inserts selected users to real matrix that values can be later used in Intalio process.
 *
 */
function mapSelectedRecipientsToMatrix() {
    var node, childNode, hasEmptyChild, counter, recipients, targetPerson, childIterator;

    clearDataCache("Vastaanottajat-nomap");

    counter = 1;

    childIterator = TIVA3Form.getCache().getDocument("receipientsToShow-nomap").getChildIterator();

    hasEmptyChild = formatDataCache("Vastaanottajat-nomap", "Vastaanottajat");

    while (childIterator.hasNext()) {
        childNode = childIterator.next();

        recipients = childNode.getAttribute("recipientsUid").split(',');
        targetPerson = childNode.getAttribute("targetPerson");
        TIVA3Form.getJSXByName("Suostumus_Kohdehenkilo").setValue(targetPerson);
        for (i = 0; i < recipients.length; i++) {
            node = TIVA3Form.getCache().getDocument("Vastaanottajat-nomap").getFirstChild().cloneNode();

            node.setAttribute("jsxid", counter);
            node.setAttribute("Vastaanottajat_Vastaanottaja", recipients[i]);
            TIVA3Form.getCache().getDocument("Vastaanottajat-nomap").insertBefore(node);
            counter++;
        }
    }

    if (hasEmptyChild) {
        TIVA3Form.getCache().getDocument("Vastaanottajat-nomap").removeChild(TIVA3Form.getCache().getDocument("Vastaanottajat-nomap").getFirstChild());
    }
}

function searchNames(searchString) {
    var node, hasAnotherParent = false, hasEmptyChild, entryFound, userData, xmlData, personInfo, list, parents, parentData, parentInfo, parentList, vanhempi, vanhempiUid;
    entryFound = false;

    if (searchString == "") {
        alert("Sy\u00F6t\u00E4 hakusana");
        return;
    }

    searchString = searchString.toLowerCase();

    childData = Arcusys.Internal.Communication.GetChildren(searchString);
    status = childData.selectSingleNode("//status", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();

    if(status == "error") {
        error = childData.selectSingleNode("//message", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
        if(error.search("Creation of the user by UID '' - should be used for test purposes only") != -1) {
            alert("Valitettavasti antamallasi hakusanalla ei l\u00F6ytynyt tuloksia");
        } else {
            alert("Vastaanottajan hakemisessa tapahtui virhe! Virheviesti: " + error);
        }
    } else {

        if(childData.selectSingleNode("//child", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'") && childData.selectSingleNode("//parents", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'")) {
            entryFound = true;
        }

        if(entryFound) {

            clearDataCache("HaetutLapset-nomap", "searchChildMatrix");
            hasEmptyChild = formatDataCache("HaetutLapset-nomap", "searchChildMatrix");
            nodeIterator = childData.selectNodes("//child", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'");
            childArray = getDataString(nodeIterator);

            for( i = 0; i < childArray.length; i++) {
                if(childArray[i]["parents_uid"]) {
                    node = TIVA3Form.getCache().getDocument("HaetutLapset-nomap").getFirstChild().cloneNode();
                    node.setAttribute("jsxid", 0);
                    node.setAttribute("etunimi", childArray[i]["firstname"]);
                    node.setAttribute("sukunimi", childArray[i]["lastname"]);
                    node.setAttribute("uid", childArray[i]["uid"]);
                    node.setAttribute("vanhempi", childArray[i]["parents_displayName"]);
                    node.setAttribute("vanhempiUid", childArray[i]["parents_uid"]);
                    TIVA3Form.getCache().getDocument("HaetutLapset-nomap").insertBefore(node);
                }
            }

            TIVA3Form.getCache().getDocument("HaetutLapset-nomap").insertBefore(node);

            if(hasEmptyChild == true) {
                TIVA3Form.getCache().getDocument("HaetutLapset-nomap").removeChild(TIVA3Form.getCache().getDocument("HaetutLapset-nomap").getFirstChild());
            }

            TIVA3Form.getJSXByName("searchChildMatrix").repaintData();
            setSuostujat();

        } else {
            alert("Valitettavasti antamallasi hakusanalla ei l\u00F6ytynyt tuloksia");
        }
    }
}

function addToRecipients() {
    var hasEmptyChild, selection;

    selection = TIVA3Form.getJSXByName("suostumuksenAntajat").getValue();
    swapConsentGivers(selection); // paivitetaan suostujakentat
    if (validateAddToRecipients(selection) == false) {
        return;
    }

    clearDataCache("receipientsToShow-nomap");
    hasEmptyChild = formatDataCache("receipientsToShow-nomap", "dummyMatrix");

    if (selection == 2) {
        addToRecipientsSingle(TIVA3Form.getJSXByName("suostuja").getValue());
    } else {
        addToRecipientsMulti(selection);
    }

    if (hasEmptyChild == true) {
        TIVA3Form.getCache().getDocument("receipientsToShow-nomap").removeChild(TIVA3Form.getCache().getDocument("receipientsToShow-nomap").getFirstChild());
    }

    TIVA3Form.getJSXByName("dummyMatrix").repaintData();
    // formatConsentFields();

}

function addToRecipientsSingle(id) {
    var sourceNode, targetNode;

    sourceNode = TIVA3Form.getCache().getDocument("suostuja-nomap").selectSingleNode("//record[@jsxid='" + id + "']");
    targetNode = TIVA3Form.getCache().getDocument("receipientsToShow-nomap").getFirstChild().cloneNode();

    targetNode.setAttribute("jsxid", "0");
    targetNode.setAttribute("recipients", sourceNode.getAttribute("jsxtext"));
    targetNode.setAttribute("recipientsUid", sourceNode.getAttribute("jsxid"));
    targetNode.setAttribute("targetPerson", sourceNode.getAttribute("targetPerson"));

    TIVA3Form.getCache().getDocument("receipientsToShow-nomap").insertBefore(targetNode);

    // TIVA3Form.getJSXByName("Suostumus1").setTitleText(sourceNode.getAttribute("jsxtext"), true);

    // setSuostuja2FieldsRequirements(0);

}

function addToRecipientsMulti(selection) {
    var counter, node, childIterator, uid, firstname, lastname, childNode, vanhempi1, vanhempi2, vanhempi1Uid, vanhempi2Uid, targetPerson;

    counter = TIVA3Form.getJSXByName("recipientCounter").getValue();
    childIterator = TIVA3Form.getCache().getDocument("HaetutLapset-nomap").getChildIterator();

    while (childIterator.hasNext()) {

        childNode = childIterator.next();

        node = TIVA3Form.getCache().getDocument("receipientsToShow-nomap").getFirstChild().cloneNode();

        uid = childNode.getAttribute("uid");
        firstname = childNode.getAttribute("etunimi");
        lastname = childNode.getAttribute("sukunimi");
        vanhempi = childNode.getAttribute("vanhempi");
        vanhempiUid = childNode.getAttribute("vanhempiUid");
        targetPerson = childNode.getAttribute("uid");

        node.setAttribute("jsxid", counter);
        if (selection == 1) {
            // TIVA3Form.getJSXByName("Suostumus1").setTitleText(firstname + " " + lastname, true);
            node.setAttribute("recipients", firstname + " " + lastname);
            node.setAttribute("recipientsUid", uid);
            // setSuostuja2FieldsRequirements(0);
        } else {
            node.setAttribute("recipients", vanhempi);
            node.setAttribute("recipientsUid", vanhempiUid);
            vanhemmat = vanhempi.split(',\u0020');
            // TIVA3Form.getJSXByName("Suostumus1").setTitleText(vanhemmat[0], true);
            // TIVA3Form.getJSXByName("Suostumus2").setTitleText(vanhemmat[1], true);
            // setSuostuja2FieldsRequirements(1);
        }
        node.setAttribute("targetPerson", targetPerson);
        node.setAttribute("uid", uid);
        node.setAttribute("group", 0);
        TIVA3Form.getCache().getDocument("receipientsToShow-nomap").insertBefore(node);
        counter++;

    }
    TIVA3Form.getJSXByName("recipientCounter").setValue(counter);
}

function enablePaperStorage(value, target){
        if (value == "PaperBased"){
            TIVA3Form.getJSXByName(target).setEnabled(1, true);
        } else {
            TIVA3Form.getJSXByName(target).setEnabled(0, true);
            TIVA3Form.getJSXByName(target).setValue("");
        }
}

function parseXML(xmlData, rootName, childlist) {
    var i, j, attributes, node, childNode, childs;
    i = 0;

    attributes = [];

    childs = xmlData.selectNodeIterator("/\/" + rootName);

    while (childs.hasNext()) {
        attributes[i] = [];
        node = childs.next();
        if (node == null) {
            break;
        }
        for (j = 0; j < (childlist.length); j++) {
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

function valuesToArray(attributes) {
    var tempArray = [], i, j, line;

    for (i = 0; i < attributes.length; i++) {
        line = "";
        for (j = 0; j < attributes[i].length; j++) {
            line = line + attributes[i][j];
            if (j < (attributes[i].length - 1)) {
                line = line + ",";
            }
        }
        tempArray[i] = line;
    }
    return tempArray;
}

// Web Service Calls -----------------------------------------------------------------------------------------------------------------------------

//Package FormPreFill
jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function (arc) {
    arc.GetFormData = function (id) {
        var tout, pohjaId, msg, endpoint, url, req, objXML;

        tout = 1000;
        pohjaId = id;

        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.tiva.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getConsentTemplateById><pohjaId>" + pohjaId + "</pohjaId></soa:getConsentTemplateById></soapenv:Body></soapenv:Envelope>";
        endpoint = getEndpoint("KokuSuostumusProcessingService");
        // endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-tiva-model-0.1-SNAPSHOT/KokuSuostumusProcessingServiceImpl";
        url = getUrl();

        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);

        req = new jsx3.net.Request();
        req.open('POST', url, false);

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
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
    arc.getTemplatesData = function (str) {
        var tout, msg, endpoint, url, req, objXML;

        tout = 1000;

        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.tiva.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:selaaSuostumuspohjat><searchString>" + str + "</searchString><limit>100</limit></soa:selaaSuostumuspohjat></soapenv:Body></soapenv:Envelope>";
        endpoint = getEndpoint("KokuSuostumusProcessingService");
        // endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-tiva-model-0.1-SNAPSHOT/KokuSuostumusProcessingServiceImpl";
        url = getUrl();

        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);

        req = new jsx3.net.Request();
        req.open('POST', url, false);

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
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
    arc.GetChildren = function (searchString) {
        var tout, msg, endpoint, url, req, objXML, limit;

        tout = 1000;
        limit = 100;

        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:searchChildren><searchString>" + searchString + "</searchString><limit>" + limit + "</limit></soa:searchChildren></soapenv:Body></soapenv:Envelope>";
        url = getUrl();
        endpoint = getEndpoint("UsersAndGroupsService");
        // endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";

        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);

        req = new jsx3.net.Request();
        req.open('POST', url, false);

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
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
        endpoint = getEndpoint("UsersAndGroupsService");
        // endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";

        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);

        req = new jsx3.net.Request();
        req.open('POST', url, false);

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        req.send(msg, tout);
        objXML = req.getResponseXML();

        if (objXML == null) {
            alert("Virhe palvelinyhteydessa");
        } else {
            return objXML;

        }

    };
});

jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetUserUidByLooraname = function(username) {

        var tout = 1000;
        var limit = 100;
        var searchString = "";

        var msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getUserUidByLooraName><looraUsername>" + username + "</looraUsername></soa:getUserUidByLooraName></soapenv:Body></soapenv:Envelope>";

        var url = getUrl();

        endpoint = getEndpoint("UsersAndGroupsService");
        // var endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";
        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);

        var req = new jsx3.net.Request();

        req.open('POST', url, false);

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        req.send(msg, tout);
        var objXML = req.getResponseXML();

        if(objXML == null) {
            alert("Virhe palvelinyhteydess\xE4");
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

//Getting the domain name and port if available
function getUrl() {
    var domain = getDomainName();
    if(domain.search("file") != -1) {
        domain = "http://62.61.65.15:8380"
    }
    return domain + "/palvelut-portlet/ajaxforms/WsProxyServlet2";

}

kokuServiceEndpoints = null;

function getEndpoint(serviceName) {
        if (kokuServiceEndpoints == null) {
                kokuServiceEndpoints = this.parent.getKokuServicesEndpoints();
        }
        
        return kokuServiceEndpoints.services[serviceName];
}

/**
 * Gets a parameter from form url.
 */
function gup(name) {
    var regexS, regex, results;

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

jsx3.lang.Package.definePackage("Intalio.Internal.CustomErrors", function(error) {
    error.getError = function(name) {
        var errortext = TIVA3Form.getJSXByName(name).getTip();
        errortext = "Puuttuvat tiedot: " + errortext;
        return errortext;
    };
});
