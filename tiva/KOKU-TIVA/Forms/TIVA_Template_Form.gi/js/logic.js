// Prestart --------------------------------------------------------------------------------------------------------------------------------------

function intalioPreStart() {
    var error;

    if (TIVA_Form.getJSXByName("Pohja_Laheta").getChecked()) {
        clearDataCache("Vastaanottajat-nomap");
        mapSelectedRecipientsToMatrix();
    }

    error = checkSuostumukset();
    if (error != "") {
        return error;
    }

    error = checkTemplateName();
    if (error != "") {
        return error;
    }

    error = checkRecipients();
    if (error != "") {
        return error;
    }

    return null;
}

/* Checks if a template has been created with a same name than template being created */
function checkTemplateName() {
    var objXML, nodeIterator, node, flag = false;

    objXML = Arcusys.Internal.Communication.getTemplatesData(TIVA_Form.getJSXByName("Pohja_Otsikko").getValue());
    nodeIterator = objXML.selectNodeIterator("//otsikko", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'");

    while (nodeIterator.hasNext()) {
        node = nodeIterator.next();
        if (node.getValue() == TIVA_Form.getJSXByName("Pohja_Otsikko").getValue()) {
            flag = true;
            break;
        }
    }

    if (flag) {
        return "Saman niminen suostumuspohja on jo olemassa. Olkaa hyv\u00E4 ja valitkaa uusi nimi.";
    } else {
        return "";
    }
}

function checkSuostumukset() {
    var error;
    if (TIVA_Form.getJSXByName("toimenpiteetBlock").getFirstChild() == null) {
        error = "Pohjalle ei ole asetettu toimenpiteit\u00E4!";
    } else {
        error = "";
    }
    return error;
}

function checkRecipients() {
    var error, activated, recipients;

    activated = TIVA_Form.getJSXByName("Pohja_Laheta").getChecked();
    recipients = TIVA_Form.getCache().getDocument("Vastaanottajat-nomap").getFirstChild();

    if (activated && recipients == null) {
        error = "Olet aktivoinut pohjan, joten sill\u00E4 t\u00E4ytyy olla v\u00E4hint\u00E4\u00E4n yksi vastaanottaja!";
    } else {
        error = "";
    }
    return error;
}

// General functions -----------------------------------------------------------------------------------------------------------------------------

function clearDataCache(cacheName, matrixName) {
    while (TIVA_Form.getCache().getDocument(cacheName).getFirstChild() != null) {
        TIVA_Form.getCache().getDocument(cacheName).removeChild(TIVA_Form.getCache().getDocument(cacheName).getFirstChild());
    }
    if (matrixName) {
        TIVA_Form.getJSXByName(matrixName).repaintData();
    }
}

function formatDataCache(cache, matrix) {
    if (TIVA_Form.getCache().getDocument(cache).getFirstChild() == null) {
        TIVA_Form.getJSXByName(matrix).commitAutoRowSession();
        return true;
    } else {
        return false;
    }
}

// Form functionality ----------------------------------------------------------------------------------------------------------------------------

function swapConsentGivers(selection) {
    if (selection == 1) {
        TIVA_Form.getJSXByName("Suostumus_Extend1").setValue("Child");
    } else if (selection == 2) {
        TIVA_Form.getJSXByName("Suostumus_Extend1").setValue("AnyParent");
    } else if (selection == 3) {
        TIVA_Form.getJSXByName("Suostumus_Extend1").setValue("BothParents");
    }
}

function activateTemplate(check) {
    if (check == 1) {
        TIVA_Form.getJSXByName("Haku_Lapset").setDisplay("block", true).repaint();
        TIVA_Form.getJSXByName("Message").setDisplay("block", true).repaint();
        TIVA_Form.getJSXByName("voimassaoloaika").setDisplay("block", true).repaint();
    } else {
        TIVA_Form.getJSXByName("Haku_Lapset").setDisplay("none", true).repaint();
        TIVA_Form.getJSXByName("Message").setDisplay("none", true).repaint();
        TIVA_Form.getJSXByName("voimassaoloaika").setDisplay("none", true).repaint();
    }
}

function setToimenpiteetRequired() {
    if (TIVA_Form.getCache().getDocument("Toimenpiteet-nomap").getFirstChild() == null) {
        TIVA_Form.getJSXByName("toimenpide").setRequired(jsx3.gui.Form.REQUIRED).repaint();
    } else {
        TIVA_Form.getJSXByName("toimenpide").setRequired(jsx3.gui.Form.OPTIONAL).repaint();
    }  
}

// Adding consent slots --------------------------------------------------------------------------------------------------------------------------

function mapFieldsToMatrix(id, description, infotext) {
    var node, hasEmptyChild;

    hasEmptyChild = formatDataCache("Toimenpiteet-nomap", "Toimenpiteet");

    node = TIVA_Form.getCache().getDocument("Toimenpiteet-nomap").getFirstChild().cloneNode();

    node.setAttribute("jsxid", id);
    node.setAttribute("Toimenpiteet_ToimenpideId", id);
    node.setAttribute("Toimenpiteet_Kuvaus", description);
    if (infotext != null) {
        node.setAttribute("Toimenpiteet_Tarkentava_Teksti", infotext);
    }
    TIVA_Form.getCache().getDocument("Toimenpiteet-nomap").insertBefore(node);
    if (hasEmptyChild) {
        TIVA_Form.getCache().getDocument("Toimenpiteet-nomap").removeChild(TIVA_Form.getCache().getDocument("Toimenpiteet-nomap").getFirstChild());
    }
}

function addChoice(id, description, infotext, prefill) {
    var section, label, choiceId, info;

    if (!TIVA_Form.getJSXByName("toimenpide").getValue() && !prefill) {
        return;
    }
    section = TIVA_Form.getJSXByName("toimenpiteetBlock").load("components/choice.xml", true);

    TIVA_Form.getJSXByName("toimenpiteetBlock").setHeight(TIVA_Form.getJSXByName("toimenpiteetBlock").getHeight() + 30, true).repaint();

    label = section.getDescendantOfName("choiceLabel");
    choiceId = section.getChild("choiceId");
    info = section.getDescendantOfName("choice_tarkentavaTeksti");
    if (prefill) {
        section.getDescendantOfName("remChoice").setDisplay("none", true);
    }

    if (infotext != "") {
        info.setValue(infotext);
        TIVA_Form.getJSXByName("tarkentavaTeksti").setValue("");
    } else {
        section.getDescendantOfName("tooltipImg").setDisplay("none", true);
    }

    label.setName(label.getName() + id);
    section.setName(section.getName() + id);
    label.setText(description, true);
    choiceId.setValue(id);

    mapFieldsToMatrix(id, description, infotext);
    TIVA_Form.getJSXByName("toimenpide").setValue("");
}

function removeChoice(node, id) {
    TIVA_Form.getJSXByName("toimenpiteetBlock").removeChild(node);
    TIVA_Form.getCache().getDocument("Toimenpiteet-nomap").removeChild(TIVA_Form.getCache().getDocument("Toimenpiteet-nomap").selectSingleNode("//record[@Toimenpiteet_ToimenpideId='" + id + "']"));
    TIVA_Form.getJSXByName("toimenpiteetBlock").setHeight(TIVA_Form.getJSXByName("toimenpiteetBlock").getHeight() - 30, true).repaint();
}

function getId() {
    var id = TIVA_Form.getJSXByName("id").getValue();
    TIVA_Form.getJSXByName("id").setValue(parseInt(id, 10) + 1);
    return id;
}

// Preload ---------------------------------------------------------------------------------------------------------------------------------------

function preload() {
    var username = Intalio.Internal.Utilities.getUser();
    username = username.substring((username.indexOf("/") + 1));

    TIVA_Form.getJSXByName("Kayttaja_Lahettaja").setValue(username);
}

// Recipients Mapping ----------------------------------------------------------------------------------------------------------------------------

/**
 * inserts selected users to real matrix that values can be later used in Intalio process.
 *
 */
function mapSelectedRecipientsToMatrix() {
    var node, childNode, hasEmptyChild, counter, recipients, targetPerson, childIterator;

    clearDataCache("Vastaanottajat-nomap");

    counter = 1;

    childIterator = TIVA_Form.getCache().getDocument("receipientsToShow-nomap").getChildIterator();

    hasEmptyChild = formatDataCache("Vastaanottajat-nomap", "Vastaanottajat");

    while (childIterator.hasNext()) {
        childNode = childIterator.next();

        recipients = childNode.getAttribute("recipientsUid").split(',');
        targetPerson = childNode.getAttribute("uid");
        for (i = 0; i < recipients.length; i++) {
            node = TIVA_Form.getCache().getDocument("Vastaanottajat-nomap").getFirstChild().cloneNode();

            node.setAttribute("jsxid", counter);
            node.setAttribute("Vastaanottajat_Vastaanottaja", recipients[i]);
            node.setAttribute("Vastaanottajat_Kohdehenkilo", targetPerson);
            TIVA_Form.getCache().getDocument("Vastaanottajat-nomap").insertBefore(node);
            counter++;
        }
    }

    if (hasEmptyChild) {
        TIVA_Form.getCache().getDocument("Vastaanottajat-nomap").removeChild(TIVA_Form.getCache().getDocument("Vastaanottajat-nomap").getFirstChild());
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

    xmlData = Arcusys.Internal.Communication.GetChildren(searchString);
    list = ["firstname", "lastname", "uid"];
    userData = parseXML(xmlData, "child", list);
    if (userData != "") {
        entryFound = true;
    }

    if (entryFound) {
        clearDataCache("HaetutLapset-nomap", "searchChildMatrix");
        hasEmptyChild = formatDataCache("HaetutLapset-nomap", "searchChildMatrix");

        parentsNodes = xmlData.selectNodes("//parents", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'");
        
        parentList = ["firstname", "lastname", "uid"];
        parentData = [];
        parentInfo = [];
        parents = [];

        i = 0;
        while (parentsNodes.get(i)) {
            parents[i] = parentsNodes.get(i);
            parentList = ["firstname", "lastname", "uid"];
            parentData = parseXML(parents[i], "parents", parentList);
            parentInfo[i] = parentData[i].split(',');
            i++;
        }
        
        vanhempi = "";
        vanhempiUid = "";
        
        for (i = 0; i < parentInfo.length; i++) {
            if (i != 0) {
                vanhempi += ", ";
                vanhempiUid += ",";
            }
            vanhempi += parentInfo[i][0] + " " + parentInfo[i][1];
            vanhempiUid += parentInfo[i][2];
        }

        personInfo = userData[0].split(',');

        node = TIVA_Form.getCache().getDocument("HaetutLapset-nomap").getFirstChild().cloneNode();

        node.setAttribute("jsxid", 0);
        node.setAttribute("etunimi", personInfo[0]);
        node.setAttribute("sukunimi", personInfo[1]);
        node.setAttribute("uid", personInfo[2]);
        node.setAttribute("vanhempi", vanhempi);
        node.setAttribute("vanhempiUid", vanhempiUid);

        TIVA_Form.getCache().getDocument("HaetutLapset-nomap").insertBefore(node);

        if (hasEmptyChild == true) {
            TIVA_Form.getCache().getDocument("HaetutLapset-nomap").removeChild(TIVA_Form.getCache().getDocument("HaetutLapset-nomap").getFirstChild());
        }
    } else {
        alert("Valitettavasti antamallasi hakusanalla ei l\u00F6ytynyt tuloksia");
    }

    TIVA_Form.getJSXByName("searchChildMatrix").repaintData();
}

function addToRecipients(selection) {
    if (!selection) {
        alert("Suostujat-kentt\u00E4 on tyhj\u00E4. Vastaanottajia ei haettu.");
        return;
    }

    var counter, node, hasEmptyChild, chosen, childIterator, uid, targetPerson, firstname, lastname, vanhempi1, vanhempi2, vanhempi1Uid, vanhempi2Uid, childNode;

    clearDataCache("receipientsToShow-nomap");

    counter = TIVA_Form.getJSXByName("recipientCounter").getValue();

    childIterator = TIVA_Form.getCache().getDocument("HaetutLapset-nomap").getChildIterator();

    hasEmptyChild = formatDataCache("receipientsToShow-nomap", "dummyMatrix");

    while (childIterator.hasNext()) {

        childNode = childIterator.next();

        chosen = childNode.getAttribute("valittu");

        if ((chosen != null) && (chosen != 0)) {

            node = TIVA_Form.getCache().getDocument("receipientsToShow-nomap").getFirstChild().cloneNode();

            uid = childNode.getAttribute("uid");
            firstname = childNode.getAttribute("etunimi");
            lastname = childNode.getAttribute("sukunimi");
            vanhemmat = childNode.getAttribute("vanhempi");
            vanhemmatUid = childNode.getAttribute("vanhempiUid");
            targetPerson = firstname + " " + lastname;

            node.setAttribute("jsxid", counter);
            if (selection == 1) {
                node.setAttribute("recipients", firstname + " " + lastname);
                node.setAttribute("recipientsUid", uid);
            } else {
                node.setAttribute("recipients", vanhemmat);
                node.setAttribute("recipientsUid", vanhemmatUid);
            }
            node.setAttribute("targetPerson", targetPerson);
            node.setAttribute("uid", uid);
            node.setAttribute("group", 0);
            TIVA_Form.getCache().getDocument("receipientsToShow-nomap").insertBefore(node);
            counter++;
        }
    }
    if (hasEmptyChild == true) {
        TIVA_Form.getCache().getDocument("receipientsToShow-nomap").removeChild(TIVA_Form.getCache().getDocument("receipientsToShow-nomap").getFirstChild());
    }
    TIVA_Form.getJSXByName("dummyMatrix").repaintData();
    TIVA_Form.getJSXByName("recipientCounter").setValue(counter);
}

/**
 * Parses given xml data.
 * param: xmlData - XML data to parse.
 * param: rootName - Root field name
 * param: childlist - Names of root nodes childrens.
 *
 * return Array of users
 *
 */
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

/**
 * Compresesses multidimensional array to sigle dimensional
 * Users information comma seperated. One user/node.
 */
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

jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function (arc) {
    arc.GetChildren = function (searchString) {
        var tout, msg, endpoint, url, req, objXML, limit;

        tout = 1000;
        limit = 100;

        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:searchChildren><searchString>" + searchString + "</searchString><limit>" + limit + "</limit></soa:searchChildren></soapenv:Body></soapenv:Envelope>";
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

//Package FormPreFill
jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function (arc) {
    arc.getTemplatesData = function (str) {
        var tout, msg, endpoint, url, req, objXML;

        tout = 1000;

        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.tiva.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:selaaSuostumuspohjat><searchString>" + str + "</searchString><limit>10</limit></soa:selaaSuostumuspohjat></soapenv:Body></soapenv:Envelope>";
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

// Extra functions -------------------------------------------------------------------------------------------------------------------------------

function getDomainName() {

    var url = window.location.href;
    var url_parts = url.split("/");
    var domain_name = url_parts[0] + "//" + url_parts[2];
       
    return domain_name;

}

function getUrl() {
    var domain;

    domain = getDomainName();
    
    return domain + "/palvelut-portlet/ajaxforms/WsProxyServlet2";

}

function getEndpoint() {
    var endpoint;

    //endpoint = "http://trelx51x:8080";
    endpoint = "http://localhost:8180";
    
    return endpoint;
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
    function (error) {

        error.getError = function (name) {
            var errortext = TIVA_Form.getJSXByName(name).getTip();
            errortext = "Puuttuvat tiedot: " + errortext;
            return errortext;
        };
    }
);