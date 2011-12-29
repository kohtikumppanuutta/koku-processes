function getEndpoint() {
    
    var endpoint = "http://localhost:8180";
    //var endpoint = "http://trelx51lb:8080";
    return endpoint;
    
}


function getTaskSubscribe() {
    Intalio.Internal.Utilities.SERVER.subscribe(
    Intalio.Internal.Utilities.GET_TASK_SUCCESS, preload);
};


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

function getIntalioUser() {
    var username = Intalio.Internal.Utilities.getUser();
    username = username.substring((username.indexOf("/") + 1));
    return username;
}


/**
 * Operations to load before form is shown to user
 */
function preload() {
                
    getParents();
    selectActiveTreeNodes();
    var rootnode = TivaTietopyyntoForm.getCache().getDocument("Kategoriat-nomap");
    var selected = new Array;

    traverse(rootnode, selected);

    if (selected.length == 0) {

        // Disabloi vastaustyyppi
        TivaTietopyyntoForm.getJSXByName("dummyBox2").setEnabled(jsx3.gui.Form.STATEDISABLED).repaint();
        TivaTietopyyntoForm.getJSXByName("dummyBox3").setEnabled(jsx3.gui.Form.STATEDISABLED).repaint();
        TivaTietopyyntoForm.getJSXByName("dummyBox2").setChecked(0).repaint();
        TivaTietopyyntoForm.getJSXByName("dummyBox3").setChecked(1).repaint();

        showFreeTextArea(true);

    } else {

        TivaTietopyyntoForm.getJSXByName("dummyBox2").setEnabled(jsx3.gui.Form.STATEDISABLED).repaint();
        TivaTietopyyntoForm.getJSXByName("dummyBox3").setEnabled(jsx3.gui.Form.STATEDISABLED).repaint();
        TivaTietopyyntoForm.getJSXByName("dummyBox2").setChecked(1).repaint();
        TivaTietopyyntoForm.getJSXByName("dummyBox3").setChecked(0).repaint();
        showFreeTextArea(false);
    }
}


function preloadCategories() {
    var xmlData, xmlString, intalioUserUid, intalioUser;
    
    intalioUserUid = "";
    
    intalioUser = getIntalioUser();
        
    xmlData = Arcusys.Internal.Communication.GetSenderUid(intalioUser);
       
    intalioUserUid = xmlData.selectSingleNode("//userUid").getValue();
              
    xmlData = Arcusys.Internal.Communication.GetCategories(intalioUserUid);
    
    xmlData = xmlData.selectSingleNode("//ns2:getTietoelementitResponse", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'").getFirstChild();
    xmlData = xmlData.toString();
    if (xmlData == null) {
        alert("Havannointitietoja ei saatavilla");
    }

    xmlString = "<data jsxid=\"jsxroot\">" + xmlData + "</data>";

    TivaTietopyyntoForm.getJSXByName("matrix1").setXMLString(xmlString);
    TivaTietopyyntoForm.getJSXByName("matrix1").repaintData();
    
}

function getParents() {
    var target = TivaTietopyyntoForm.getJSXByName("Pyynto_Kohde_UID").getValue();
         
    xmlData = Arcusys.Internal.Communication.GetChildinfo(target);
    
        
    list = ["firstname", "lastname"];
    userData = parseXML(xmlData, "parents", list);

    + unescape("%E4")
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

function resetToDefaults() {
    var rootnode = TivaTietopyyntoForm.getCache().getDocument("Kategoriat-nomap");
    setTreeToDefault(rootnode);
    selectActiveTreeNodes();

}

function selectActiveTreeNodes() {
    var id;
    var opened;
    var childIterator = TivaTietopyyntoForm.getCache().getDocument("Havannointitiedot-nomap").getChildIterator();
    while(childIterator.hasNext()) {
        childNode = childIterator.next();

        id = childNode.getAttribute("Havannointitiedot_Valitut");
        opened = childNode.getAttribute("Havannointitiedot_Avattu");

        var rootnode = TivaTietopyyntoForm.getCache().getDocument("Kategoriat-nomap");

        if ((id != "") && (opened == "")) {

            var rootnode = TivaTietopyyntoForm.getCache().getDocument("Kategoriat-nomap");
            var active = rootnode.selectSingleNode("//record[@jsxid='" + id + "']");
            active.setAttribute("jsxselected","1");
            TivaTietopyyntoForm.getJSXByName("matrix1").repaintData();
        } else if ((id == "") && (opened != "")) {

            var active = rootnode.selectSingleNode("//record[@jsxid='" + opened + "']");

            active.setAttribute("jsxopen","1");
            TivaTietopyyntoForm.getJSXByName("matrix1").repaintData();
        } else {

            var rootnode = TivaTietopyyntoForm.getCache().getDocument("Kategoriat-nomap");
            var active = rootnode.selectSingleNode("//record[@jsxid='" + id + "']");
            active.setAttribute("jsxselected","1");
            active.setAttribute("jsxopen","1");
            TivaTietopyyntoForm.getJSXByName("matrix1").repaintData();

        }

    }
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
        TivaTietopyyntoForm.getJSXByName("Vastaus_Liite").setRequired(jsx3.gui.Form.REQUIRED).repaint();
    } else {
        TivaTietopyyntoForm.getJSXByName("vastausLayout (--)").setRows("24.5%,24.5%,4%,6%,7%,4%,6%,6%,2%,4%,6%,6%",true);
        TivaTietopyyntoForm.getJSXByName("vastausPanel").setHeight("600", true);
        TivaTietopyyntoForm.getJSXByName("paneFreeText").setDisplay("none").repaint();
        TivaTietopyyntoForm.getJSXByName("Vastaus_Liite").setRequired(jsx3.gui.Form.OPTIONAL).repaint();

    }
}

function setTreeToDefault(parentNode) {

    var node;
    for(node = parentNode.getFirstChild(); node != null; node = node.getNextSibling()) {
        //alert(node.getAttribute("jsxid"));
        var selected = node.getAttribute("jsxselected");
        var opened = node.getAttribute("jsxopen");

        if (selected != null) {
            node.setAttribute("jsxselected","0");
        }
        if(opened != null) {
            node.setAttribute("jsxopen","0");
        }
        setTreeToDefault(node);

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

        //node has "selected" attribute --> node will pushed at the end of array.
        if (select != null) {
            selected.push(node);

        }
        traverse(node,selected);

    }

}

jsx3.lang.Package.definePackage(
"Intalio.Internal.CustomErrors", function(error) {

    error.getError= function(name) {
        var errortext = TivaTietopyyntoForm.getJSXByName(name).getTip();
        errortext = "Puuttuvat tiedot: " + errortext;
        return errortext;
    };
}
);
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

jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetSenderUid = function(looraName) {
        var tout, msg, endpoint, url, req, objXML, limit;

        tout = 1000;
        limit = 100;

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