function getEndpoint() {
    
    var endpoint = "http://localhost:8180";
    //var endpoint = "http://trelx51lb:8080";
    return endpoint;
    
}


function intalioPreStart() {
  
   mapSelectedValuesToMatrix();
   
}


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

function mapSelectedValuesToMatrix() {

    var rootnode = TivaTietopyyntoForm.getCache().getDocument("Kategoriat-nomap");
    var selected = new Array;

    traverse(rootnode, selected);

    if (selected.length != 0) {
        var node, i = 0;
        var hasEmptyChild = false;

        if (TivaTietopyyntoForm.getCache().getDocument("Havannointitiedot-nomap").getFirstChild() == null) {
            TivaTietopyyntoForm.getJSXByName("Havannointitiedot").commitAutoRowSession();
            hasEmptyChild = true;
            
        }

        for(i = 0; i < selected.length; i++) {

            node = TivaTietopyyntoForm.getCache().getDocument("Havannointitiedot-nomap").getFirstChild().cloneNode();
                       
                       
            //node.setAttribute("jsxid",i);
            if ((selected[i].getAttribute("jsxselected") != null) && (selected[i].getAttribute("jsxopen") == null)) {
                node.setAttribute("Havannointitiedot_Valitut",selected[i].getAttribute("jsxid"));
                TivaTietopyyntoForm.getCache().getDocument("Havannointitiedot-nomap").insertBefore(node);
            }
            else if ((selected[i].getAttribute("jsxselected") == null) && (selected[i].getAttribute("jsxopen") != null)) {
                node.setAttribute("Havannointitiedot_Avattu",selected[i].getAttribute("jsxid"));
                TivaTietopyyntoForm.getCache().getDocument("Havannointitiedot-nomap").insertBefore(node);
            }
            else {
                node.setAttribute("Havannointitiedot_Valitut",selected[i].getAttribute("jsxid"));
                node.setAttribute("Havannointitiedot_Avattu",selected[i].getAttribute("jsxid"));
                TivaTietopyyntoForm.getCache().getDocument("Havannointitiedot-nomap").insertBefore(node);
            }
                
            //TivaTietopyyntoForm.getCache().getDocument("Havannointitiedot-nomap").insertBefore(node);
            
        }

        if (hasEmptyChild == true) {
            TivaTietopyyntoForm.getCache().getDocument("Havannointitiedot-nomap").removeChild(TivaTietopyyntoForm.getCache().getDocument("Havannointitiedot-nomap").getFirstChild());
        }
    }

}


function getIntalioUser() {
    var username = Intalio.Internal.Utilities.getUser();
    username = username.substring((username.indexOf("/") + 1));
    return username;
}


/**
 * Operations to load before form is shown to user
 */
function preload() {
    var intalioUser = getIntalioUser();
    TivaTietopyyntoForm.getJSXByName("Perustiedot_Lahettaja").setValue(intalioUser);
    preloadCategories();
    
}

/**
 * Function gets checkbox status and changes field visibility in answer section.
 * param: checked - checkbox status (true/false) 
 * 
 */
function showFreeTextArea(checked) {
    
    if(checked == true) {
        TivaTietopyyntoForm.getJSXByName("vastausLayout (--)").setRows("20%,20%,3%,5%,7%,3%,5%,5%,19%,3%,5%,5%",true);
        TivaTietopyyntoForm.getJSXByName("vastausPanel").setHeight("700", true);
        TivaTietopyyntoForm.getJSXByName("paneFreeText").setDisplay("block").repaint();
    }
    else {
        TivaTietopyyntoForm.getJSXByName("vastausLayout (--)").setRows("24.5%,24.5%,4%,6%,7%,4%,6%,6%,2%,4%,6%,6%",true);
        TivaTietopyyntoForm.getJSXByName("vastausPanel").setHeight("600", true);
        TivaTietopyyntoForm.getJSXByName("paneFreeText").setDisplay("none").repaint();
    
    }
}

/**
 * Function goes through the whole observation selections tree.
 * param: parentNode - At the beginning it is the root node.
 * param: selected - empty collection where to store selected values.
 * 
 */
function traverse(parentNode,selected) {
    var node;
    for(node = parentNode.getFirstChild(); node != null; node = node.getNextSibling()) {
        //alert(node.getAttribute("jsxid"));
        var select = node.getAttribute("jsxselected");
        var open = node.getAttribute("jsxopen");
        //node has "selected" attribute --> node will pushed at the end of array.
        if ((select != null) || (open != null)) {
            selected.push(node);
    

        }
        traverse(node,selected);

    }
    
}

jsx3.lang.Package.definePackage(
  "Intalio.Internal.CustomErrors",
  function(error) {

    error.getError=function(name){
        var errortext = TivaTietopyyntoForm.getJSXByName(name).getTip();
        errortext = "Puuttuvat tiedot: " + errortext;
        return errortext;
    };
  }
);

function searchNames(searchString) {
    var node, hasEmptyChild, entryFound, userData, i, xmlData, personInfo, list;
    entryFound = false;
    hasEmptyChild = false;

    if (searchString == "") {
        alert("Sy" + unescape("%F6") + "t" + unescape("%E4") + "hakusana");
        return;
    }

    searchString = searchString.toLowerCase();
    if (TivaTietopyyntoForm.getCache().getDocument("HaetutVastaanottajat-nomap").getFirstChild() != null) {
        TivaTietopyyntoForm.getCache().getDocument("HaetutVastaanottajat-nomap").removeChildren();
        TivaTietopyyntoForm.getJSXByName("searchMatrix").repaintData();

    }

    if (TivaTietopyyntoForm.getCache().getDocument("HaetutVastaanottajat-nomap").getFirstChild() == null) {
        TivaTietopyyntoForm.getJSXByName("searchMatrix").commitAutoRowSession();
        hasEmptyChild = true;

    }

    xmlData = Arcusys.Internal.Communication.GetUsers(searchString);

    list = ["firstname", "lastname", "phoneNumber", "email", "uid"];
    userData = parseXML(xmlData, "user", list);

    for (i = 0; i < userData.length; i++) {

        personInfo = userData[i].split(',');

        entryFound = true;
        node = TivaTietopyyntoForm.getCache().getDocument("HaetutVastaanottajat-nomap").getFirstChild().cloneNode();

        if((personInfo[0] == "undefined") || (personInfo[1] == "undefined")) {
            alert("Kayttajahaussa tapahtui virhe. Jarjestelmassa ei ole kayttajan nimitietoja.");
            return;
        }
        
        node.setAttribute("jsxid", i);
        node.setAttribute("etunimi", personInfo[0]);
        node.setAttribute("sukunimi", personInfo[1]);
        if(personInfo[2] == "undefined") 
            node.setAttribute("puhelin", "");
        else 
            node.setAttribute("puhelin", personInfo[2]);
        
        if(personInfo[3] == "undefined") 
            node.setAttribute("sahkoposti", "");
        else 
           node.setAttribute("sahkoposti", personInfo[3]);
        
        if((personInfo[4] == "undefined")) {
            alert("Kayttajahaussa tapahtui virhe. Kohdehenkilon id puuttuu");
            return;
        }
       
        node.setAttribute("uid", personInfo[4]);

        TivaTietopyyntoForm.getCache().getDocument("HaetutVastaanottajat-nomap").insertBefore(node);

    }

    if (hasEmptyChild == true) {
        TivaTietopyyntoForm.getCache().getDocument("HaetutVastaanottajat-nomap").removeChild(TivaTietopyyntoForm.getCache().getDocument("HaetutVastaanottajat-nomap").getFirstChild());
    }

    TivaTietopyyntoForm.getJSXByName("searchMatrix").repaintData();
    if (entryFound == false) {
        alert ("Valitettavasti antamallasi hakusanalla ei l" + unescape("%F6") + "ytynyt tuloksia");
     
    }

}

function searchChildrens(searchString) {
    var node, hasEmptyChild, entryFound, userData, i, xmlData, personInfo, list;
    entryFound = false;
    hasEmptyChild = false;

    if (searchString == "") {
         alert("Sy" + unescape("%F6") + "t" + unescape("%E4") + "hakusana");
        return;
    }

    searchString = searchString.toLowerCase();
    if (TivaTietopyyntoForm.getCache().getDocument("HaetutLapset-nomap").getFirstChild() != null) {
        TivaTietopyyntoForm.getCache().getDocument("HaetutLapset-nomap").removeChildren();
        TivaTietopyyntoForm.getJSXByName("searchChildMatrix").repaintData();

    }

    if (TivaTietopyyntoForm.getCache().getDocument("HaetutLapset-nomap").getFirstChild() == null) {
        TivaTietopyyntoForm.getJSXByName("searchChildMatrix").commitAutoRowSession();
        hasEmptyChild = true;

    }

    xmlData = Arcusys.Internal.Communication.GetChildrens(searchString);
    
    list = ["firstname", "lastname", "uid"];
    userData = parseXML(xmlData, "child", list);
        
    for (i = 0; i < userData.length; i++) {

        personInfo = userData[i].split(',');

        entryFound = true;
        node = TivaTietopyyntoForm.getCache().getDocument("HaetutLapset-nomap").getFirstChild().cloneNode();

        node.setAttribute("jsxid", i);
        node.setAttribute("etunimi", personInfo[0]);
        node.setAttribute("sukunimi", personInfo[1]);
        node.setAttribute("uid", personInfo[2]);

        TivaTietopyyntoForm.getCache().getDocument("HaetutLapset-nomap").insertBefore(node);

    }

    if (hasEmptyChild == true) {
        TivaTietopyyntoForm.getCache().getDocument("HaetutLapset-nomap").removeChild(TivaTietopyyntoForm.getCache().getDocument("HaetutLapset-nomap").getFirstChild());
    }

    TivaTietopyyntoForm.getJSXByName("searchChildMatrix").repaintData();
    if (entryFound == false) {
        alert ("Valitettavasti antamallasi hakusanalla ei l" + unescape("%F6") + "ytynyt tuloksia");
    }

}

function addToRecipients() {
    var counter, node, i, hasEmptyChild, chosen, childIterator, uid, firstname, lastname, childNode;
       
    i = 0;
    hasEmptyChild = false;
    counter = 0;

    childIterator =  TivaTietopyyntoForm.getCache().getDocument("HaetutVastaanottajat-nomap").getChildIterator();
   

    while (childIterator.hasNext()) {

        childNode = childIterator.next();

        if (counter < 1) {

            uid = childNode.getAttribute("uid");
            firstname = childNode.getAttribute("etunimi");
            lastname = childNode.getAttribute("sukunimi");
            TivaTietopyyntoForm.getJSXByName("Perustiedot_Vastaanottaja_UID").setValue(uid);
            TivaTietopyyntoForm.getJSXByName("Perustiedot_Vastaanottaja").setValue(firstname + " " + lastname);
            TivaTietopyyntoForm.getJSXByName("Perustiedot_Vastaanottaja").repaint();
            counter++;        
           

        }
        else {
            alert("Vastaavia kohdehenkiloita loytyi useampi kuin yksi. Vain yksi kohdehenkilo voidaan lisata");
        }

    }
    if (counter < 1) {
        alert("Vastaanottaja tulee hakea ennen lisaamista");
    }
}

function addToTarget() {
    var counter, node, i, hasEmptyChild, chosen, childIterator, uid, firstname, lastname, childNode, label, parents;
   
    i = 0;
    hasEmptyChild = false;
    counter = 0;
    
    childIterator =  TivaTietopyyntoForm.getCache().getDocument("HaetutLapset-nomap").getChildIterator();
   

    while (childIterator.hasNext()) {

        childNode = childIterator.next();

        chosen = childNode.getAttribute("valittu");

        if ((chosen != null) && (chosen != 0)) {

            uid = childNode.getAttribute("uid");
            firstname = childNode.getAttribute("etunimi");
            lastname = childNode.getAttribute("sukunimi");
            TivaTietopyyntoForm.getJSXByName("Pyynto_Kohde_UID").setValue(uid);
            TivaTietopyyntoForm.getJSXByName("Pyynto_Kohde").setValue(firstname + " " + lastname);
            counter++;                              
            break;      
        }

    }
    if (counter < 1) {
        alert("Yht" + unescape("%E4%E4") + "n kohdehenkil" + unescape("%F6%E4") + "ei ole valittuna");
        return;
    }
    xmlData = Arcusys.Internal.Communication.GetChildinfo(uid);
    list = ["firstname", "lastname"];
    userData = parseXML(xmlData, "parents", list);
        
    label = "<strong>J" + unescape("%E4") + "rjestelm" + unescape("%E4") + unescape("%E4") + "n merkatut huoltajat:</strong> ";
    
    for(i = 0; i < userData.length; i++) {
        parents = userData[i].split(",");
        label = label + parents[0]+ " " + parents[1];
        if (i < (userData.length -1)) {
            label = label + ", ";
        }
    }
    TivaTietopyyntoForm.getJSXByName("ParentsLabel").setText(label).repaint();
}


jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetUsers = function(searchString) {
        var tout, msg, endpoint, url, req, objXML, limit;

        tout = 1000;
        limit = 100;

        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelosdsadpe/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:searchEmployees><!--Optional:--><searchString>" + searchString + "</searchString><limit>" + limit + "</limit></soa:searchEmployees></soapenv:Body></soapenv:Envelope>";

        //url = "http://62.61.65.15:8380/palvelut-portlet/ajaxforms/WsProxyServlet2";
        url = getUrl();

        endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";

        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);

        req = new jsx3.net.Request();

        req.open('POST', url, false);

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send(msg, tout);
        objXML = req.getResponseXML();

        if (objXML == null) {
            alert("Virhe palvelinyhteydess" + unescape("%E4") + " (GetUsers)" );
        } else {
            return objXML;

        }

    };
});



jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetSenderUid = function(looraName) {
        var tout, msg, endpoint, url, req, objXML, limit;

        tout = 1000;
       
        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getUserUidByLooraName><looraUsername>" + looraName + "</looraUsername></soa:getUserUidByLooraName></soapenv:Body></soapenv:Envelope>";

        //url = "http://62.61.65.15:8380/palvelut-portlet/ajaxforms/WsProxyServlet2";
        url = getUrl();

        endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";

        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);

        req = new jsx3.net.Request();

        req.open('POST', url, false);

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send(msg, tout);
        objXML = req.getResponseXML();

        if (objXML == null) {
            alert("Virhe palvelinyhteydess" + unescape("%E4") + " (GetUsers)" );
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

        endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";

        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);

        req = new jsx3.net.Request();

        req.open('POST', url, false);

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send(msg, tout);
        objXML = req.getResponseXML();

        if (objXML == null) {
             alert("Virhe palvelinyhteydess" + unescape("%E4") + " (GetChildrens)" );
        } else {
            return objXML;

        }

    };
});


jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetChildinfo = function(uid) {
        var tout, msg, endpoint, url, req, objXML;

        tout = 1000;
     
        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getChildInfo><childUid>" + uid + "</childUid></soa:getChildInfo></soapenv:Body></soapenv:Envelope>";

        //url = "http://62.61.65.15:8380/palvelut-portlet/ajaxforms/WsProxyServlet2";
         url = getUrl();

        endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";

        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);

        req = new jsx3.net.Request();

        req.open('POST', url, false);

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send(msg, tout);
        objXML = req.getResponseXML();

        if (objXML == null) {
             alert("Virhe palvelinyhteydess" + unescape("%E4") + " (GetChildinfo)" );
        } else {
            return objXML;

        }

    };
});


jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetCategories = function(userUid) {
        var tout, msg, endpoint, url, req, objXML;
       
        tout = 1000;
     
        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.tiva.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getTietoelementit><userUid>" + userUid + "</userUid></soa:getTietoelementit></soapenv:Body></soapenv:Envelope>";

        //url = "http://62.61.65.15:8380/palvelut-portlet/ajaxforms/WsProxyServlet2";
       
        url = getUrl();
       
        endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-tiva-model-0.1-SNAPSHOT/KokuTietopyyntoProcessingServiceImpl";

        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);

        req = new jsx3.net.Request();

        req.open('POST', url, false);

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send(msg, tout);
        objXML = req.getResponseXML();

        if (objXML == null) {
             alert("Virhe palvelinyhteydess" + unescape("%E4") + " (GetCategories)" );
        } else {
           
            return objXML;

        }

    };
});


function preloadCategories() {
    
    var xmlData, xmlString, intalioUserUid, intalioUser;
    
    intalioUserUid = "";
    
    intalioUser = getIntalioUser();
        
    xmlData = Arcusys.Internal.Communication.GetSenderUid(intalioUser);
           
    //intalioUserUid = xmlData.selectSingleNode("//ns2:getUserUidByLooraNameResponse", "xmlns:ns2='http://soa.common.koku.arcusys.fi/'").getFirstChild();
    intalioUserUid = xmlData.selectSingleNode("//userUid").getValue();
              
    xmlData = Arcusys.Internal.Communication.GetCategories(intalioUserUid);
    
    
    xmlData = xmlData.selectSingleNode("//ns2:getTietoelementitResponse", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getFirstChild();
    xmlData = xmlData.toString();
   
    
    xmlString = "<data jsxid=\"jsxroot\">" + xmlData + "</data>";

    TivaTietopyyntoForm.getJSXByName("matrix1").setXMLString(xmlString);
    TivaTietopyyntoForm.getJSXByName("matrix1").repaintData();
    
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
        if (node == null) {Arcusys.Internal.Communication.GetCategories();
            break;
        }
        

        for (j = 0; j < childlist.length; j++) {
          
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
 * Compresesses multidimensional array to single dimensional
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