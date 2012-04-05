kokuServiceEndpoints = null;

function getEndpoint(serviceName) {
        if (kokuServiceEndpoints == null) {
                kokuServiceEndpoints = this.parent.getKokuServicesEndpoints();
        }
        
        return kokuServiceEndpoints.services[serviceName];
}

//Getting the domain name and port if available
function getUrl() {
    var domain = getDomainName();
    if(domain.search("file") != -1) {
        domain = "http://62.61.65.15:8380"
    }
    return domain + "/palvelut-portlet/ajaxforms/WsProxyServlet2";
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
    descendants = KayttajaviestintaForm.getJSXByName("root").getDescendantsOfType("jsx3.gui.TextBox");
    
    for( i = 0; i < descendants.length; i++) {
        value = KayttajaviestintaForm.getJSXByName(descendants[i].getName()).getValue();
        temp = escapeHTML(value);
        KayttajaviestintaForm.getJSXByName(descendants[i].getName()).setValue(temp);
        KayttajaviestintaForm.getJSXByName(descendants[i].getName()).repaint();
    }
}

function getDomainName() {

    var url = window.location.href;
    var url_parts = url.split("/");
    var domain_name = url_parts[0] + "//" + url_parts[2];

    return domain_name;

}

function formatDataCache(cache, matrix) {
    if(KayttajaviestintaForm.getCache().getDocument(cache).getFirstChild() == null) {
        KayttajaviestintaForm.getJSXByName(matrix).commitAutoRowSession();
        return true;
    } else {
        return false;
    }
}

function clearDataCache(cacheName, matrixName) {
    while(KayttajaviestintaForm.getCache().getDocument(cacheName).getFirstChild() != null) {
        KayttajaviestintaForm.getCache().getDocument(cacheName).removeChild(KayttajaviestintaForm.getCache().getDocument(cacheName).getFirstChild());
    }
    if(matrixName) {
        KayttajaviestintaForm.getJSXByName(matrixName).repaintData();
    }
}

function prepareForm() {
    var username = Intalio.Internal.Utilities.getUser();
    username = username.substring((username.indexOf("/") + 1));
    
    try {
        var userUid = Arcusys.Internal.Communication.GetUserUidByUsername(username);
        if(userUid != null) {
            var uid = userUid.selectSingleNode("//userUid", "xmlns:ns2='http://soa.common.koku.arcusys.fi/'").getValue();
        }              
    } catch (e) {
        alert(e);
    }
    getRoles(uid);
    getRealUserName(uid);    
    KayttajaviestintaForm.getJSXByName("Message_FromUser").setValue(username);
    KayttajaviestintaForm.getJSXByName("Message_FromUser").setEnabled(jsx3.gui.Form.STATEDISABLED).repaint();
}

function getRealUserName(uid) {
    SenderInfo = Arcusys.Internal.Communication.GetUserInfo(uid);
    if (SenderInfo.selectSingleNode("//firstname", "xmlns:ns2='http://soa.av.koku.arcusys.fi/'") && SenderInfo.selectSingleNode("//lastname", "xmlns:ns2='http://soa.av.koku.arcusys.fi/'")) {
        firstname = SenderInfo.selectSingleNode("//firstname", "xmlns:ns2='http://soa.av.koku.arcusys.fi/'").getValue();
        lastname = SenderInfo.selectSingleNode("//lastname", "xmlns:ns2='http://soa.av.koku.arcusys.fi/'").getValue();
        wholename = firstname + " " + lastname;
        KayttajaviestintaForm.getJSXByName("Message_FromFirstName").setValue(firstname);
        KayttajaviestintaForm.getJSXByName("Message_FromLastName").setValue(lastname);
    }
}




function getTaskSubscribe() {
    Intalio.Internal.Utilities.SERVER.subscribe(Intalio.Internal.Utilities.GET_TASK_SUCCESS, prepareForm);
};

jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetKunpoUsernameByUid = function(uid) {

        var tout = 1000;
        var limit = 100;
        var searchString = "";

        var msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getKunpoNameByUserUid><userUid>" + uid + "</userUid></soa:getKunpoNameByUserUid></soapenv:Body></soapenv:Envelope>";

        var url = getUrl();

        endpoint = getEndpoint("UsersAndGroupsService");
        // var endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";
        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);

        var req = new jsx3.net.Request();

        req.open('POST', url, false);

        //req.setRequestHeader("Content-Type","text/xml");

        //req.setRequestHeader("SOAPAction","");

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        req.send(msg, tout);
        var objXML = req.getResponseXML();
        // alert(req.getStatus());

        // var objXML = req.getResponseXML();
        // alert("DEBUG - SERVER RESPONSE:" + objXML);
        if(objXML == null) {
            alert("Virhe palvelinyhteydess\xE4");
        } else {
            // alert(objXML);
            return objXML;

        }
    };
});



function getRoles(uid) {
    var i = 0, j = 0, roleName, roleId;

    //var uid = "415ae6c9-406b-41df-b71e-887b5f0e4f3a";
    rolesData = Arcusys.Internal.Communication.GetUserRoles(uid);

    var roles = rolesData.selectNodeIterator("//role", "xmlns:ns2='http://soa.common.koku.arcusys.fi/'");
    var rolesArray = [];

    var checkRoles = rolesData.selectSingleNode("//role", "xmlns:ns2='http://soa.common.koku.arcusys.fi/'");

    if(checkRoles) {
        while(roles.hasNext()) {
            node = roles.next();
            if(node.getFirstChild()) {
                childNode = node.getFirstChild();
                rolesArray[i] = [];
                while(childNode) {
                    if(childNode.getValue()) {
                        rolesArray[i][j] = childNode.getValue();
                    }
                    childNode = childNode.getNextSibling();
                    j++;
                }
                i++;
                j = 0;
            }
        }

        var s = "<data>";

        for( i = 0; i < rolesArray.length; i++) {
            s += "<record jsxid=\"" + rolesArray[i][1] + "\" jsxtext=\"" + rolesArray[i][0] + "\"\/>";
        }
        s += "<record jsxid=\"\" jsxtext=\"Ei valintaa\"/>"; 
        
        s += "</data>";

        KayttajaviestintaForm.getJSXByName("Message_FromRole").setXMLString(s).resetCacheData();

        //KayttajaviestintaForm.getJSXByName("Roolit").setDisplay("block", true);
    }

}


jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetKunpoUsernameByUid = function(uid) {

        var tout = 1000;
        var limit = 100;
        var searchString = "";

        var msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getKunpoNameByUserUid><userUid>" + uid + "</userUid></soa:getKunpoNameByUserUid></soapenv:Body></soapenv:Envelope>";

        var url = getUrl();

        endpoint = getEndpoint("UsersAndGroupsService");
        // var endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";
        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);

        var req = new jsx3.net.Request();

        req.open('POST', url, false);

        //req.setRequestHeader("Content-Type","text/xml");

        //req.setRequestHeader("SOAPAction","");

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        req.send(msg, tout);
        var objXML = req.getResponseXML();
        // alert(req.getStatus());

        // var objXML = req.getResponseXML();
        // alert("DEBUG - SERVER RESPONSE:" + objXML);
        if(objXML == null) {
            alert("Virhe palvelinyhteydess\xE4");
        } else {
            // alert(objXML);
            return objXML;

        }
    };
});

jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetUserUidByUsername = function(username) {

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


function mapSelectedRecipientsToMatrix() {

    var node, hasEmptyChild, jsxid, childIterator, group, uid, groupUid, childNode, groupData, userData, i, kunpoUsername, displayName;
    var nodes, parentData, childData, status, error;
    hasEmptyChild = false;
    jsxid = 0;
    error = false;
    childIterator = KayttajaviestintaForm.getCache().getDocument("receipientsToShow-nomap").getChildIterator();

    if(KayttajaviestintaForm.getCache().getDocument("receipients-nomap").getFirstChild() == null) {
        KayttajaviestintaForm.getJSXByName("matrix1").commitAutoRowSession();
        hasEmptyChild = true;
    }

    while(childIterator.hasNext()) {
        childNode = childIterator.next();
        group = childNode.getAttribute("group");

        if(group != 0) {
            groupUid = childNode.getAttribute("uid");
            groupName = childNode.getAttribute("receipient");
            groupData = Arcusys.Internal.Communication.GetGroupUsers(groupUid);
            status = groupData.selectSingleNode("//status", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
            if(status == "error") {
                error = groupData.selectSingleNode("//message", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
                alert("Viestin l\u00E4hett\u00E4minen ryhm\u00E4lle " + groupName + " ep\u00E4onnistui! Virheviesti: " + error);
            } else {
                userData = getData(groupData.selectNodeIterator("//user", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'"));
                nodes = convertArrayToNodesString(userData, "uid", "childUid");
                childData = Arcusys.Internal.Communication.GetChildinfo(nodes);
                status = childData.selectSingleNode("//status", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
                if(status == "error") {
                    error = childData.selectSingleNode("//message", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
                    alert("Viestin l\u00E4hett\u00E4minen ryhm\u00E4lle " + groupName + " ep\u00E4onnistui! Virheviesti: " + error);
                } else {
                    parentData = getData(childData.selectNodeIterator("//parents", "xmlns:ns2='http://soa.tiva.koku.arcucsys.fi/'"));

                    for( i = 0; i < parentData.length; i++) {
                        if(parentData[i]["uid"]) {
                            node = KayttajaviestintaForm.getCache().getDocument("receipients-nomap").getFirstChild().cloneNode();
                            node.setAttribute("receipient", parentData[i]["uid"]);
                            node.setAttribute("receipientDisplay", parentData[i]["displayName"]);
                            KayttajaviestintaForm.getCache().getDocument("receipients-nomap").insertBefore(node);
                        }
                    }

                }
            }
        } else {
            uid = childNode.getAttribute("uid");
            node = KayttajaviestintaForm.getCache().getDocument("receipients-nomap").getFirstChild().cloneNode();
            kunpoUsername = Arcusys.Internal.Communication.GetKunpoUsernameByUid(uid);
            status = kunpoUsername.selectSingleNode("//status", "xmlns:ns2='http://soa.common.koku.arcusys.fi/'").getValue();

            if(status == "error") {
                error = kunpoUsername.selectSingleNode("//message", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
                alert("Viestin l\u00E4hett\u00E4minen ryhm\u00E4lle " + groupName + " ep\u00E4onnistui! Virheviesti: " + error);
            } else {
                if(kunpoUsername != null) {
                    displayName = kunpoUsername.selectSingleNode("//kunpoUsername", "xmlns:ns2='http://soa.common.koku.arcusys.fi/'").getValue();
                }
                node.setAttribute("jsxid", jsxid);
                node.setAttribute("receipient", uid);
                node.setAttribute("receipientDisplay", displayName);
                KayttajaviestintaForm.getCache().getDocument("receipients-nomap").insertBefore(node);
                jsxid++;
            }

        }

    }

    if(hasEmptyChild == true) {
        KayttajaviestintaForm.getCache().getDocument("receipients-nomap").removeChild(KayttajaviestintaForm.getCache().getDocument("receipients-nomap").getFirstChild());
    }

    deleteDupes();
}


function convertArrayToNodesString(array, index, wrapper) {
    var nodes = "";

    for( i = 0; i < array.length; i++) {
        nodes += "<" + wrapper + ">" + array[i][index] + "</" + wrapper + ">";
    }

    return nodes;
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

function deleteDupes() {
    var childIterator, childNode, sibling, temp, targetUid, currentUid;
    childIterator = KayttajaviestintaForm.getCache().getDocument("receipients-nomap").getChildIterator();

    while(childIterator.hasNext()) {
        childNode = childIterator.next();
        targetUid = childNode.getAttribute("receipient");

        if(childNode.getNextSibling() != null) {
            sibling = childNode.getNextSibling();
        }

        while(sibling != null) {
            currentUid = sibling.getAttribute("receipient");

            if(currentUid == targetUid) {
                temp = sibling;
                sibling = sibling.getNextSibling();
                KayttajaviestintaForm.getCache().getDocument("receipients-nomap").removeChild(temp);

            } else {
                sibling = sibling.getNextSibling();
            }

        }
    }
}

function intalioPreStart() {
    if(KayttajaviestintaForm.getCache().getDocument("receipientsToShow-nomap").getFirstChild() == null) {
        return "Viestiin ei ole lis\xE4tty yht\xE4\xE4n vastaanottajaa. Lis\xE4\xE4 viestille vastaanottajat.";
    }

    mapSelectedRecipientsToMatrix();
    throughTextfields();
}

function switchSearchMode(mode) {
   
    if(mode == "groups") {
        KayttajaviestintaForm.getJSXByName("Haku_Kayttajat").setDisplay("none").repaint();
        KayttajaviestintaForm.getJSXByName("Haku_Ryhmat").setDisplay("block").repaint();

        KayttajaviestintaForm.getJSXByName("HaeKayttajia_Checkbox1").setChecked(0).repaint();
        KayttajaviestintaForm.getJSXByName("HaeRyhmia_Checkbox1").setChecked(1).repaint();
        KayttajaviestintaForm.getJSXByName("HaeKayttajia_Checkbox2").setChecked(0).repaint();
        KayttajaviestintaForm.getJSXByName("HaeRyhmia_Checkbox2").setChecked(1).repaint();

    }

    if(mode == "users") {
        KayttajaviestintaForm.getJSXByName("Haku_Kayttajat").setDisplay("block").repaint();
        KayttajaviestintaForm.getJSXByName("Haku_Ryhmat").setDisplay("none").repaint();

        KayttajaviestintaForm.getJSXByName("HaeKayttajia_Checkbox1").setChecked(1).repaint();
        KayttajaviestintaForm.getJSXByName("HaeRyhmia_Checkbox1").setChecked(0).repaint();
        KayttajaviestintaForm.getJSXByName("HaeKayttajia_Checkbox2").setChecked(1).repaint();
        KayttajaviestintaForm.getJSXByName("HaeRyhmia_Checkbox2").setChecked(0).repaint();
    }

}

function searchGroup(searchString) {

    var entryFound, node, i, hasEmptyChild, splits, list, xmlData, groupData;
    clearDataCache("GroupUserList-nomap", "listGroupUsersMatrix");
    if(searchString == "") {
        alert("Syota hakusana");
        return;
    }
    searchString = searchString.toLowerCase();
    entryFound = false;

    if(KayttajaviestintaForm.getCache().getDocument("HaetutRyhmat-nomap").getFirstChild() != null) {
        KayttajaviestintaForm.getCache().getDocument("HaetutRyhmat-nomap").removeChildren();
        KayttajaviestintaForm.getJSXByName("searchGroupMatrix").repaintData();
    }
    hasEmptyChild = false;
    xmlData = Arcusys.Internal.Communication.GetGroups(searchString);
    status = xmlData.selectSingleNode("//status", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
    if(status == "error") {
        error = xmlData.selectSingleNode("//message", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
        alert("Ryhm\u00E4n hakemisessa tapahtui virhe! Virheviesti: " + error);
    } else {
        groupData = getData(xmlData.selectNodeIterator("//group", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'"));

        if(KayttajaviestintaForm.getCache().getDocument("HaetutRyhmat-nomap").getFirstChild() == null) {
            KayttajaviestintaForm.getJSXByName("searchGroupMatrix").commitAutoRowSession();
            hasEmptyChild = true;
        }

        for( i = 0; i < groupData.length; i++) {
                
            entryFound = true;
                       
            node = KayttajaviestintaForm.getCache().getDocument("HaetutRyhmat-nomap").getFirstChild().cloneNode();

            node.setAttribute("jsxid", i);
            node.setAttribute("nimi", groupData[i]["groupName"]);
            node.setAttribute("uid", groupData[i]["groupUid"]);
            KayttajaviestintaForm.getCache().getDocument("HaetutRyhmat-nomap").insertBefore(node);

        }

        if(hasEmptyChild == true) {
            KayttajaviestintaForm.getCache().getDocument("HaetutRyhmat-nomap").removeChild(KayttajaviestintaForm.getCache().getDocument("HaetutRyhmat-nomap").getFirstChild());
        }
        KayttajaviestintaForm.getJSXByName("searchGroupMatrix").repaintData();

        if(entryFound == false) {
            alert("Valitettavasti antamallasi hakusanalla ei l\xF6ytynyt tuloksia");
        }
    }

}



function listGroupUsers() {

    var node, i, hasEmptyChild, childIterator, childNode, selected, groupUid, personInfo, xmlData, list, userData, fetched;

/*
    if(KayttajaviestintaForm.getCache().getDocument("GroupUserList-nomap").getFirstChild() != null) {
        KayttajaviestintaForm.getCache().getDocument("GroupUserList-nomap").removeChildren();
        KayttajaviestintaForm.getJSXByName("listGroupUsersMatrix").repaintData();
    }
*/ 

    hasEmptyChild = false;
    if(KayttajaviestintaForm.getCache().getDocument("GroupUserList-nomap").getFirstChild() == null) {
        KayttajaviestintaForm.getJSXByName("listGroupUsersMatrix").commitAutoRowSession();
        hasEmptyChild = true;

    }
    childIterator = KayttajaviestintaForm.getCache().getDocument("HaetutRyhmat-nomap").getChildIterator();

    while(childIterator.hasNext()) {
        childNode = childIterator.next();
        selected = childNode.getAttribute("valittu");
        fetched = childNode.getAttribute("haettu");
        groupUid = childNode.getAttribute("uid");
        
        if (selected == 0 && fetched == 1){
            childNode.setAttribute("haettu", 0);
            removefromCache(groupUid);
        }
      
        
            if((selected != 0) && (selected != null) && (fetched != 1)) {
            childNode.setAttribute("haettu", 1);
            groupName = childNode.getAttribute("nimi");
            xmlData = Arcusys.Internal.Communication.GetGroupUsers(groupUid);
            status = xmlData.selectSingleNode("//status", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
            if(status == "error") {
                error = xmlData.selectSingleNode("//message", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
                alert("Ryhm\u00E4n " + groupName + " k\u00E4ytt\u00E4jien hakemisessa tapahtui virhe. Virheviesti: " + error);
                childNode.setAttribute("valittu", 0);
                childNode.setAttribute("haettu", 0);
                KayttajaviestintaForm.getJSXByName("searchGroupMatrix").repaintData();            
            } else {
                userData = getData(xmlData.selectNodeIterator("//user", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'"));
                
                for( i = 0; i < userData.length; i++) {
                    node = KayttajaviestintaForm.getCache().getDocument("GroupUserList-nomap").getFirstChild().cloneNode();
                    node.setAttribute("jsxid", i);
                    node.setAttribute("etunimi", userData[i]["firstname"]);
                    node.setAttribute("sukunimi", userData[i]["lastname"]);
                    node.setAttribute("puhelin", userData[i]["phoneNumber"]);
                    node.setAttribute("sahkoposti", userData[i]["email"]);
                    node.setAttribute("ryhmanimi", childNode.getAttribute("uid"));
                    node.setAttribute("valittu", 0);
                    KayttajaviestintaForm.getCache().getDocument("GroupUserList-nomap").insertBefore(node);

                }
            }
        }
    }
    if(hasEmptyChild == true) {
        KayttajaviestintaForm.getCache().getDocument("GroupUserList-nomap").removeChild(KayttajaviestintaForm.getCache().getDocument("GroupUserList-nomap").getFirstChild());
    }
    KayttajaviestintaForm.getJSXByName("listGroupUsersMatrix").repaintData();
}


function removefromCache(removable) {
    var tempNode, i, ryhma, node, ryhma, vertaus, taulukko = [];
    i = 0;
 
        while(KayttajaviestintaForm.getCache().getDocument("GroupUserList-nomap").getFirstChild() != null) {
            tempNode = KayttajaviestintaForm.getCache().getDocument("GroupUserList-nomap").getFirstChild().cloneNode();
            ryhma = tempNode.getAttribute("ryhmanimi");
            
                if (ryhma != removable){
                    taulukko[i] = tempNode;
                    i++;
                }
            KayttajaviestintaForm.getCache().getDocument("GroupUserList-nomap").removeChild(KayttajaviestintaForm.getCache().getDocument("GroupUserList-nomap").getFirstChild());     
            } // while
            i = 0;
            // clearDataCache("GroupUserList-nomap", "listGroupUsersMatrix");
            while(taulukko[i] != null){
                node = taulukko[i];
                KayttajaviestintaForm.getCache().getDocument("GroupUserList-nomap").insertBefore(node);
                i++;
           }
           KayttajaviestintaForm.getJSXByName("listGroupUsersMatrix").repaintData();
}


function searchNames(searchString) {
    var node, hasEmptyChild, entryFound, userData, parentsData, i, j, xmlData, personInfo, list, parentList, parentUidList;
    entryFound = false;
    hasEmptyChild = false;

    // No search String
    if(searchString == "") {
        alert("Syota hakusana");
        return;
    }

    // To lowercase
    searchString = searchString.toLowerCase();
    childData = Arcusys.Internal.Communication.GetChildrens(searchString);
    status = childData.selectSingleNode("//status", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();

    if(status == "error") {
        error = childData.selectSingleNode("//message", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getValue();
        if (error.search("Creation of the user by UID '' - should be used for test purposes only") != -1) {
            alert("Valitettavasti antamallasi hakusanalla ei l\u00F6ytynyt tuloksia");
        } else {
            alert("Vastaanottajan hakemisessa tapahtui virhe! Virheviesti: " + error);
        }
    } else {

        if(childData.selectSingleNode("//child", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'") && childData.selectSingleNode("//parents", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'")) {
            entryFound = true;
        }

        if(entryFound) {

            clearDataCache("HaetutVastaanottajat-nomap", "searchMatrix");
            hasEmptyChild = formatDataCache("HaetutVastaanottajat-nomap", "searchMatrix");
            nodeIterator = childData.selectNodes("//child", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'");
            childArray = getDataString(nodeIterator);

            for( i = 0; i < childArray.length; i++) {
                if(childArray[i]["parents_uid"]) {
                    node = KayttajaviestintaForm.getCache().getDocument("HaetutVastaanottajat-nomap").getFirstChild().cloneNode();
                    node.setAttribute("jsxid", 0);
                    node.setAttribute("etunimi", childArray[i]["firstname"]);
                    node.setAttribute("sukunimi", childArray[i]["lastname"]);
                    node.setAttribute("childUid", childArray[i]["uid"]);
                    node.setAttribute("huoltajat", childArray[i]["parents_displayName"]);
                    node.setAttribute("parentsUid", childArray[i]["parents_uid"]);
                    KayttajaviestintaForm.getCache().getDocument("HaetutVastaanottajat-nomap").insertBefore(node);
                }
            }

            KayttajaviestintaForm.getCache().getDocument("HaetutVastaanottajat-nomap").insertBefore(node);

            if(hasEmptyChild == true) {
                KayttajaviestintaForm.getCache().getDocument("HaetutVastaanottajat-nomap").removeChild(KayttajaviestintaForm.getCache().getDocument("HaetutVastaanottajat-nomap").getFirstChild());
            }

            KayttajaviestintaForm.getJSXByName("searchMatrix").repaintData();

        } else {
            alert("Valitettavasti antamallasi hakusanalla ei l\u00F6ytynyt tuloksia");
        }
    }

}

function addToRecipients() {
    var counter, node, i, hasEmptyChild, chosen, childIterator, uidlist, parents, childNode;
    counter = KayttajaviestintaForm.getJSXByName("recipientCounter").getValue();
    hasEmptyChild = false;
    childIterator = KayttajaviestintaForm.getCache().getDocument("HaetutVastaanottajat-nomap").getChildIterator();
    if(KayttajaviestintaForm.getCache().getDocument("receipientsToShow-nomap").getFirstChild() == null) {
        KayttajaviestintaForm.getJSXByName("dummyMatrix").commitAutoRowSession();
        hasEmptyChild = true;
    }

    while(childIterator.hasNext()) {
        childNode = childIterator.next();
        uidlist = childNode.getAttribute("parentsUid");
        parents = childNode.getAttribute("huoltajat");
        uidlist = uidlist.split(',');
        parents = parents.split(',');

        for( i = 0; i < uidlist.length; i++) {
            node = KayttajaviestintaForm.getCache().getDocument("receipientsToShow-nomap").getFirstChild().cloneNode();
            node.setAttribute("jsxid", counter);
            node.setAttribute("receipient", parents[i]);
            node.setAttribute("uid", uidlist[i]);
            node.setAttribute("group", 0);
            KayttajaviestintaForm.getCache().getDocument("receipientsToShow-nomap").insertBefore(node);
            counter++;

        }

    }
    if(hasEmptyChild == true) {
        KayttajaviestintaForm.getCache().getDocument("receipientsToShow-nomap").removeChild(KayttajaviestintaForm.getCache().getDocument("receipientsToShow-nomap").getFirstChild());
    }
    KayttajaviestintaForm.getJSXByName("dummyMatrix").repaintData();
    KayttajaviestintaForm.getJSXByName("recipientCounter").setValue(counter);

}

function addGroupsToRecipients() {
    var counter, node, hasEmptyChild, valittu, childIterator, groupUid, childNode, groupname;
    counter = KayttajaviestintaForm.getJSXByName("recipientCounter").getValue();
    hasEmptyChild = false;
    childIterator = KayttajaviestintaForm.getCache().getDocument("HaetutRyhmat-nomap").getChildIterator();
    if(KayttajaviestintaForm.getCache().getDocument("receipientsToShow-nomap").getFirstChild() == null) {
        KayttajaviestintaForm.getJSXByName("dummyMatrix").commitAutoRowSession();
        hasEmptyChild = true;
    }
    // TODO: ks. tarkastukset, voiko valittu-arvon katsoa ennen kuin paivittaa?
    
    
    
    while(childIterator.hasNext()) {
        childNode = childIterator.next();
        valittu = childNode.getAttribute("valittu");
        groupUid = childNode.getAttribute("uid");

        if((valittu != null) && (valittu != 0)) {
            node = KayttajaviestintaForm.getCache().getDocument("receipientsToShow-nomap").getFirstChild().cloneNode();
            groupname = childNode.getAttribute("nimi");
            node.setAttribute("jsxid", counter);
            node.setAttribute("receipient", groupname);
            node.setAttribute("uid", groupUid);
            node.setAttribute("group", 1);
            KayttajaviestintaForm.getCache().getDocument("receipientsToShow-nomap").insertBefore(node);
            counter++;

        }

    }
    if(hasEmptyChild == true) {
        KayttajaviestintaForm.getCache().getDocument("receipientsToShow-nomap").removeChild(KayttajaviestintaForm.getCache().getDocument("receipientsToShow-nomap").getFirstChild());
    }

    KayttajaviestintaForm.getJSXByName("dummyMatrix").repaintData();
    KayttajaviestintaForm.getJSXByName("recipientCounter").setValue(counter);

}


/*
function listGroupUsers() {

    var node, i, hasEmptyChild, childIterator, childNode, selected, groupUid, personInfo, xmlData, list, userData;

    if(KayttajaviestintaForm.getCache().getDocument("GroupUserList-nomap").getFirstChild() != null) {
        KayttajaviestintaForm.getCache().getDocument("GroupUserList-nomap").removeChildren();
        KayttajaviestintaForm.getJSXByName("listGroupUsersMatrix").repaintData();
    }
    hasEmptyChild = false;

    if(KayttajaviestintaForm.getCache().getDocument("GroupUserList-nomap").getFirstChild() == null) {
        KayttajaviestintaForm.getJSXByName("listGroupUsersMatrix").commitAutoRowSession();
        hasEmptyChild = true;

    }
    childIterator = KayttajaviestintaForm.getCache().getDocument("HaetutRyhmat-nomap").getChildIterator();

    while(childIterator.hasNext()) {
        childNode = childIterator.next();
        selected = childNode.getAttribute("valittu");

        if((selected != 0) && (selected != null)) {
            groupUid = childNode.getAttribute("uid");
            xmlData = Arcusys.Internal.Communication.GetGroupUsers(groupUid);
            userData = getData(xmlData.selectNodeIterator("//user", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'"));

            for( i = 0; i < userData.length; i++) {
                node = KayttajaviestintaForm.getCache().getDocument("GroupUserList-nomap").getFirstChild().cloneNode();

                node.setAttribute("jsxid", i);
                node.setAttribute("etunimi", userData[i]["firstname"]);
                node.setAttribute("sukunimi", userData[i]["lastname"]);
                node.setAttribute("puhelin", userData[i]["phoneNumber"]);
                node.setAttribute("sahkoposti", userData[i]["email"]);
                node.setAttribute("valittu", 0);
                KayttajaviestintaForm.getCache().getDocument("GroupUserList-nomap").insertBefore(node);

            }
        }

    }

    if(hasEmptyChild == true) {
        KayttajaviestintaForm.getCache().getDocument("GroupUserList-nomap").removeChild(KayttajaviestintaForm.getCache().getDocument("GroupUserList-nomap").getFirstChild());
    }
    KayttajaviestintaForm.getJSXByName("listGroupUsersMatrix").repaintData();

}
*/




jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetUserRoles = function(uid) {

        var tout, msg, endpoint, url, req, objXML;
        tout = 1000;
        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getUserRoles><userUid>" + uid + "</userUid></soa:getUserRoles></soapenv:Body></soapenv:Envelope>";

        var url = getUrl();
        
        endpoint = getEndpoint("UsersAndGroupsService");
        // endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";
        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);
        req = new jsx3.net.Request();

        req.open('POST', url, false);

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        req.send(msg, tout);
        objXML = req.getResponseXML();

        if(objXML == null) {
            alert("Virhe palvelinyhteydess\xE4");
        } else {
            return objXML;

        }

    };
});




jsx3.lang.Package.definePackage("Intalio.Internal.CustomErrors", function(error) {

    error.getError = function(name) {
        var errortext = KayttajaviestintaForm.getJSXByName(name).getTip();
        errortext = "Puuttuvat tiedot: " + errortext;
        return errortext;
    };
});

jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetUsers = function(searchString) {
        var tout, msg, endpoint, url, req, objXML, limit;
        tout = 1000;
        limit = 100;
        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:searchUsers><searchString>" + searchString + "</searchString><limit>" + limit + "</limit></soa:searchUsers></soapenv:Body></soapenv:Envelope>";
        url = getUrl();

        // ARCUSYS INTRA PROXY
        //url = "http://intalio.intra.arcusys.fi:8080/gi/WsProxyServlet2";

        // IXONOS DEMO PROXY
        //url = "http://62.61.65.16:8380/palvelut-portlet/ajaxforms//WsProxyServlet2";
        
        endpoint = getEndpoint("UsersAndGroupsService");
        // endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";
        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);
        req = new jsx3.net.Request();

        req.open('POST', url, false);

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        req.send(msg, tout);
        objXML = req.getResponseXML();

        if(objXML == null) {
            alert("Virhe palvelinyhteydess\xE4");
        } else {
            return objXML;

        }

    };
});
jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetGroups = function(searchString) {
        var tout, msg, endpoint, url, req, objXML, limit;
        tout = 1000;
        limit = 100;
        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:searchGroups><searchString>" + searchString + "</searchString><limit>" + limit + "</limit></soa:searchGroups></soapenv:Body></soapenv:Envelope>";
        url = getUrl();

        // ARCUSYS INTRA PROXY
        //url = "http://intalio.intra.arcusys.fi:8080/gi/WsProxyServlet2";

        // IXONOS DEMO PROXY
        //url = "http://62.61.65.16:8380/palvelut-portlet/ajaxforms//WsProxyServlet2";

        endpoint = getEndpoint("UsersAndGroupsService");
        // endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";
        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);
        req = new jsx3.net.Request();

        req.open('POST', url, false);

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        req.send(msg, tout);
        objXML = req.getResponseXML();

        if(objXML == null) {
            alert("Virhe palvelinyhteydess\xE4");
        } else {
            return objXML;

        }

    };
});
jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetGroupUsers = function(groupUid) {

        var tout, msg, endpoint, url, req, objXML;
        tout = 1000;
        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getUsersByGroupUid><groupUid>" + groupUid + "</groupUid></soa:getUsersByGroupUid></soapenv:Body></soapenv:Envelope>";
        url = getUrl();

        // ARCUSYS INTRA PROXY
        //url = "http://intalio.intra.arcusys.fi:8080/gi/WsProxyServlet2";

        // IXONOS DEMO PROXY
        //url = "http://62.61.65.16:8380/palvelut-portlet/ajaxforms//WsProxyServlet2";

        endpoint = getEndpoint("UsersAndGroupsService");
        // endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";
        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);
        req = new jsx3.net.Request();

        req.open('POST', url, false);

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        req.send(msg, tout);
        objXML = req.getResponseXML();

        if(objXML == null) {
            alert("Virhe palvelinyhteydess\xE4");
        } else {
            return objXML;

        }

    };
});
jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetChildrens = function(searchString) {
        var tout, msg, endpoint, url, req, objXML, limit;
        tout = 1000;
        limit = 100;
        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:searchChildren><searchString>" + searchString + "</searchString><limit>" + limit + "</limit></soa:searchChildren></soapenv:Body></soapenv:Envelope>";

        //url = "http://62.61.65.15:8380/palvelut-portlet/ajaxforms/WsProxyServlet2";
        url = getUrl();
        
        endpoint = getEndpoint("UsersAndGroupsService");
        // endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";
        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);
        req = new jsx3.net.Request();

        req.open('POST', url, false);

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        req.send(msg, tout);
        objXML = req.getResponseXML();

        if(objXML == null) {
            alert("Virhe palvelinyhteydess" + unescape("%E4") + " (GetChildrens)");
        } else {
            return objXML;

        }

    };
});

jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetUserInfo = function(uid) {
        
        var tout = 1000;   
        var limit = 100;
        var searchString = "";

        var msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getUserInfo><userUid>" + uid + "</userUid></soa:getUserInfo></soapenv:Body></soapenv:Envelope>";
       
        var url = getUrl();
        
        endpoint = getEndpoint("UsersAndGroupsService");
        // var endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";

        msg = "message=" + encodeURIComponent(msg)+ "&endpoint=" + encodeURIComponent(endpoint);

        var req = new jsx3.net.Request();

        req.open('POST', url, false);      
        
       req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
       req.send(msg, tout);
       var objXML = req.getResponseXML();

        if (objXML == null) {
            alert("Virhe palvelinyhteydess\xE4");
        } else {
            return objXML;

        }
    };
});


jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetChildinfo = function(nodes) {
        var tout, msg, endpoint, url, req, objXML;
        tout = 1000;
        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getChildInfo>" + nodes + "</soa:getChildInfo></soapenv:Body></soapenv:Envelope>";

        //url = "http://62.61.65.15:8380/palvelut-portlet/ajaxforms/WsProxyServlet2";
        url = getUrl();
        
        endpoint = getEndpoint("UsersAndGroupsService");
        // endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";
        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);
        req = new jsx3.net.Request();

        req.open('POST', url, false);

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        req.send(msg, tout);
        objXML = req.getResponseXML();

        if(objXML == null) {
            alert("Virhe palvelinyhteydess" + unescape("%E4") + " (GetChildinfo)");
        } else {
            return objXML;

        }

    };
});
