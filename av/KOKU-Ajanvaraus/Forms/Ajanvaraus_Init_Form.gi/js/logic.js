// Prestart --------------------------------------------------------------------------------------------------------------------------------------

function intalioPreStart() {
    var error, child, parent1, parent2;

    clearDataCache("Recipients-nomap");
    mapSelectedRecipientsToMatrix();
    
    if (AjanvarausForm.getCache().getDocument("Recipients-nomap").getFirstChild()) {
        child = getUserNameByUid(AjanvarausForm.getCache().getDocument("Recipients-nomap").getFirstChild().getAttribute("Recipients_TargetPerson"));
        parent1 = getUserNameByUid(AjanvarausForm.getCache().getDocument("Recipients-nomap").getFirstChild().getAttribute("Recipients_Recipient1"));
        parent2 = getUserNameByUid(AjanvarausForm.getCache().getDocument("Recipients-nomap").getFirstChild().getAttribute("Recipients_Recipient2"));
    } 
    else {
        return "Lomakkeessa t\u00E4ytyy olla v\u00E4hint\u00E4\u00E4n yksi vastaanottaja!";
    }
    
    if (!AjanvarausForm.getJSXByName("Lomake_ID").getValue()) {
        if (!confirmation("L\u00E4hetet\u00E4\u00E4n ajanvarauspyynt\u00F6 lapsen " + child + " huoltajille " + parent1 + " ja " + parent2)) {
            return "Lomaketta ei tallennettu";
        }
    }
    
    return null;
}

/* single appointment should be able to be delivered 
function checkAppointment() {
    var nullError, error, numOfRecipients, numOfSlots;

    error = "Lomakkeessa t\u00E4ytyy olla v\u00E4hint\u00E4\u00E4n yksi ajankohta jokaista vastaanottajaa kohden!";
    if (AjanvarausForm.getCache().getDocument("Recipients-nomap").getFirstChild().getAttribute("Recipients_Recipient2")) {
        numOfRecipients = 2;
    }
    else {
        numOfRecipients = 1;
    }

    numOfSlots = AjanvarausForm.getJSXByName("calendarEntryBlock").getChildren().length;
    if (numOfSlots < numOfRecipients) {
        return error;
    }
    
    return "";
}
*/

function confirmation(question){
    if (confirm(question)) {
        return true;
    }
    else {
        return false;
    }
}

// General functions ----------------------------------------------------------------------------------------------------------------------------

function formatDataCache(cache, matrix) {
    if (AjanvarausForm.getCache().getDocument(cache).getFirstChild() == null) {
        AjanvarausForm.getJSXByName(matrix).commitAutoRowSession();
        return true;
    }
    else {
        return false;
    }
}

function clearDataCache(cacheName, matrixName) {
    while (AjanvarausForm.getCache().getDocument(cacheName).getFirstChild() != null)    {
        AjanvarausForm.getCache().getDocument(cacheName).removeChild(AjanvarausForm.getCache().getDocument(cacheName).getFirstChild());
    }
    if (matrixName) {
        AjanvarausForm.getJSXByName(matrixName).repaintData();
    }
}

function isValidDate(node) {
    var checkDate1, checkDate2, checkDate3, checkDate, today;
    checkDate = newDate();
    checkDate1 = node.getValue().substr(0,2);
    checkDate2 = node.getValue().substr(3,2);
    checkDate3 = node.getValue().substr(6,4);

    checkDate2 = parseInt(checkDate2 - 1, 10);
    if (checkDate2.length == 1) {
        checkDate2 = "0" + checkDate2;
    }
    checkDate.setFullYear(checkDate3, checkDate2, checkDate1);
    today = new Date();
    if (checkDate < today) {
        alert('Virheellinen p\u00E4iv\u00E4m\u00E4\u00E4r\u00E4. P\u00E4iv\u00E4m\u00E4\u00E4r\u00E4n t\u00E4ytyy olla t\u00E4t\u00E4 hetke\u00E4 my\u00F6hemm\u00E4lt\u00E4 ajanjaksolta!');
        node.setValue("").repaint();
    }
}

function getUserNameByUid(uid) {
    data = Arcusys.Internal.Communication.getUserInfo(uid);
    firstname = data.selectSingleNode("//firstname", "xmlns:ns2='http://soa.av.koku.arcusys.fi/'").getValue();
    lastname = data.selectSingleNode("//lastname", "xmlns:ns2='http://soa.av.koku.arcusys.fi/'").getValue();
    return firstname + " " + lastname;
}

function enableAll(pane, flag) {
    var descendants = [];
    
    descendants = AjanvarausForm.getJSXByName("week").getDescendantsOfType("jsx3.gui.CheckBox");
    
    for (i = 0; i < descendants.length; i++) {
        descendants[i].setEnabled(flag, true);
    }
}

function getFinDay(day) {
    var finDay;
    
    if (day != 0) {
        finDay = day - 1
    }
    else {
        finDay = 6;
    }
    
    return finDay;
}


// Slot modifying --------------------------------------------------------------------------------------------------------------------------------

function checkIfModifyOpen() {
    if (AjanvarausForm.getJSXByName("mod")) {
        var id = AjanvarausForm.getJSXByName("mod").getParent().getParent().getParent().getName();
        removeModSection(id);
        setValuesForModify(id, -1);
    }
}

function modifyThisSection(id) {
    var slot, modPane, attributes;

    checkIfModifyOpen();

    slot = AjanvarausForm.getJSXByName(id);
    modPane = slot.getDescendantOfName("modPane");
    attributes = getSlotAttributes(id);
    setValuesForModify(id, 1);

    section = modPane.load("components/modifyEntry.xml", true);
    
    section.getDescendantOfName("modDate").setValue(attributes[0]);
    section.getDescendantOfName("modStartTime").setValue(attributes[1]).repaint();
    section.getDescendantOfName("modEndTime").setValue(attributes[2]).repaint();
    section.getDescendantOfName("modLocation").setValue(attributes[3]).repaint();
}

function saveValues(id) {
    var nodes, appDate, appDate1, appDate2, appDate3, appDateCache, appDateEntry, startTime, endTime, locat;

    nodes = AjanvarausForm.getCache().getDocument("slots-nomap").selectSingleNode("//record[@slotNumber='" + id + "']");
    
    appDate = AjanvarausForm.getJSXByName("modDate").getValue();
    appDate1 = appDate.substr(0,2);
    appDate2 = appDate.substr(3,2);
    appDate3 = appDate.substr(6,4);
    appDateCache = appDate3 + "-" + appDate2 + "-" + appDate1;
    appDateEntry = appDate1 + "." + appDate2 + "." + appDate3;

    startTime = AjanvarausForm.getJSXByName("modStartTime").getValue();
    endTime = AjanvarausForm.getJSXByName("modEndTime").getValue();
    locat = AjanvarausForm.getJSXByName("modLocation").getValue();
    
    nodes.setAttribute("appointmentDate", appDateCache);
    nodes.setAttribute("startTime", startTime + ":00");
    nodes.setAttribute("endTime", endTime + ":00");
    nodes.setAttribute("location", locat);
    
    AjanvarausForm.getJSXByName(id).getDescendantOfName("entry").setText(appDateEntry + ", klo: " + startTime + " - " + endTime + ", " + locat, true); 
}

function removeModSection(id) {
    AjanvarausForm.getJSXByName(id).getDescendantOfName("modPane").removeChild(AjanvarausForm.getJSXByName(id).getDescendantOfName("modPane").getFirstChild());
}

function setValuesForModify(id, multiplier)    {
    if (multiplier > 0) {
        AjanvarausForm.getJSXByName(id).getDescendantOfName("layout (--)").setRows("20%,*").repaint();
    }
    else if (multiplier < 0) {
        AjanvarausForm.getJSXByName(id).getDescendantOfName("layout (--)").setRows("*").repaint();
    }
    AjanvarausForm.getJSXByName("calendarEntryBlock").setHeight(AjanvarausForm.getJSXByName("calendarEntryBlock").getHeight() + (150 * multiplier), true);
    AjanvarausForm.getJSXByName(id).setHeight(AjanvarausForm.getJSXByName(id).getHeight() + (150 * multiplier), true);
}

function getSlotAttributes(id) {
    var nodes, attributes, time, appDate, appDate1, appDate2, appDate2;

    nodes = AjanvarausForm.getCache().getDocument("slots-nomap").selectSingleNode("//record[@slotNumber='" + id + "']");
    attributes = [];

    appDate = nodes.getAttribute("appointmentDate");
    appDate1 = appDate.substr(0,4);
    appDate2 = appDate.substr(5,2);
    appDate3 = appDate.substr(8,2);
    appDate = appDate3 + "-" + appDate2 + "-" + appDate1;

    attributes[0] = appDate;
    time = nodes.getAttribute("startTime");
    time = time.substr(0,5);
    attributes[1] = time;
    time = nodes.getAttribute("endTime");
    time = time.substr(0,5);
    attributes[2] = time;
    attributes[3] = nodes.getAttribute("location");

    return attributes;
}

function getSectionID() {
    var Id = AjanvarausForm.getJSXByName("calendarEntryId").getValue();
    AjanvarausForm.getJSXByName("calendarEntryId").setValue(parseInt(AjanvarausForm.getJSXByName("calendarEntryId").getValue(), 10) + 1);
    return Id;
}

// Adding appointment slot(s) --------------------------------------------------------------------------------------------------------------------

function getDaySelections() {
    var descendants, selections = [], i;

    descendants = AjanvarausForm.getJSXByName("week").getDescendantsOfType("jsx3.gui.CheckBox");
    
    for (i = 0; i < descendants.length; i++) {
        if (descendants[i].getChecked()) {
            selections[i] = true;
        }
        else {
            selections[i] = false;
        }
    }
    
    return selections;
}

function validateSingleSection() {
    if (!AjanvarausForm.getJSXByName("aloitusPvm").getDate()) {
        alert("Aloitusp\u00E4iv\u00E4m\u00E4\u00E4r\u00E4-kentt\u00E4 on tyhj\u00E4!");
        return false;
    } else if (!AjanvarausForm.getJSXByName("aloitusAika").getValue()) {
        alert("Aloitusaikakentt\u00E4 on tyhj\u00E4!");
        return false;
    } else if (!AjanvarausForm.getJSXByName("kesto").getValue()) {
        alert("Kestokentt\u00E4 on tyhj\u00E4!");
        return false;
    } else if (!AjanvarausForm.getJSXByName("paikka").getValue()) {
        alert("Paikkakentt\u00E4 on tyhj\u00E4!");
        return false;
    } else {
        return true;
    }
}

function validateMultipleSection() {
    if (!AjanvarausForm.getJSXByName("aloitusPvm").getDate()) {
        alert("Aloitusp\u00E4iv\u00E4m\u00E4\u00E4r\u00E4-kentt\u00E4 on tyhj\u00E4!");
        return false;
    } else if (!AjanvarausForm.getJSXByName("lopetusPvm").getDate()) {
        alert("Lopetusp\u00E4iv\u00E4m\u00E4\u00E4r\u00E4-kentt\u00E4 on tyhj\u00E4!");
        return false;
    } else if (!AjanvarausForm.getJSXByName("aloitusAika").getValue()) {
        alert("Aloitusaikakentt\u00E4 on tyhj\u00E4!");
        return false;
    } else if (!AjanvarausForm.getJSXByName("kesto").getValue()) {
        alert("Kestokentt\u00E4 on tyhj\u00E4!");
        return false;
    } else if (!AjanvarausForm.getJSXByName("lopetusAika").getValue()) {
        alert("Lopetusaikakentt\u00E4 on tyhj\u00E4!");
        return false;
    } else if (!AjanvarausForm.getJSXByName("paikka").getValue()) {
        alert("Paikkakentt\u00E4 on tyhj\u00E4!");
        return false;
    } else {
        return true;
    }
}

function parseTimes(str) {
    if (str.length == 1) {
        str = "0" + str;
    }
    return str;
}

/*
*  Adds an appointment slot or multiple slots
*/
function addAppointment() {
    if (AjanvarausForm.getJSXByName("singleSlot").getChecked()) {
        inputSingleSection();
    } else if (AjanvarausForm.getJSXByName("multiSlots").getChecked()) {
        inputMultiSections();
    }
}

/*
* removes an appointment slot according  to id
* param: id - the id of the slot to be removed
*/
function removeThisSection(id) {
    AjanvarausForm.getJSXByName("calendarEntryBlock").setHeight(parseInt(AjanvarausForm.getJSXByName("calendarEntryBlock").getHeight(), 10) - 25).repaint();
    AjanvarausForm.getJSXByName("calendarEntryBlock").removeChild(AjanvarausForm.getJSXByName(id));
    AjanvarausForm.getCache().getDocument("slots-nomap").removeChild(AjanvarausForm.getCache().getDocument("slots-nomap").selectSingleNode("//record[@slotNumber='" + id + "']"));
}

/**
 * remove all the appointment slots
 */
function clearAppointments() {
    while (AjanvarausForm.getJSXByName("calendarEntryBlock").getFirstChild() != null) {
        var id = AjanvarausForm.getJSXByName("calendarEntryBlock").getFirstChild().getName();
        removeThisSection(id);
    }
}

function singleSlotFunc() {
    AjanvarausForm.getJSXByName("lopetusPvm").getAncestorOfName("pane").setDisplay("none", true);
    AjanvarausForm.getJSXByName("lopetusAika").getAncestorOfName("pane").setDisplay("none", true);
    AjanvarausForm.getJSXByName("multiSlots").setChecked(0, true);
    AjanvarausForm.getJSXByName("lopetusPvm").setDate(null);
    AjanvarausForm.getJSXByName("lopetusAika").setValue("").repaint();
    enableAll("week", 0);

    if (!AjanvarausForm.getJSXByName("singleSlot").getChecked()) {
        AjanvarausForm.getJSXByName("singleSlot").setChecked(1, true);
    }
}

function multiSlotsFunc() {
    AjanvarausForm.getJSXByName("lopetusPvm").getAncestorOfName("pane").setDisplay("block", true);
    AjanvarausForm.getJSXByName("lopetusAika").getAncestorOfName("pane").setDisplay("block", true);
    AjanvarausForm.getJSXByName("singleSlot").setChecked(0, true);
    enableAll("week", 1);

    if (!AjanvarausForm.getJSXByName("multiSlots").getChecked()) {
        AjanvarausForm.getJSXByName("multiSlots").setChecked(1, true);
    }
}

function inputSection(entryDate,entryTime,entryDuration,entryLocation) {
    var id, section, helperDate, endTimeHours, endTimeMinutes, entryYear, entryDay, entryMonth, entryHours, entryMinutes;
    id = getSectionID();
    section = AjanvarausForm.getJSXByName("calendarEntryBlock").load("components/calendarEntry.xml", true);

    AjanvarausForm.getJSXByName("calendarEntryBlock").setHeight(AjanvarausForm.getJSXByName("calendarEntryBlock").getHeight() + 25).repaint();
    section.setName(id);
    helperDate = new Date();
    helperDate.setHours(entryTime.getHours());
    helperDate.setMinutes(entryTime.getMinutes() + parseInt(entryDuration, 10));

    endTimeHours = helperDate.getHours().toString();
    endTimeMinutes = helperDate.getMinutes().toString();

    entryYear = entryDate.getFullYear();
    entryDay = entryDate.getDate().toString();
    entryMonth = (entryDate.getMonth() + 1).toString();
    entryHours = entryTime.getHours().toString();
    entryMinutes = entryTime.getMinutes().toString();

    entryDay = parseTimes(entryDay);
    entryMonth = parseTimes(entryMonth);
    entryHours = parseTimes(entryHours);
    entryMinutes = parseTimes(entryMinutes);
    endTimeHours = parseTimes(endTimeHours);
    endTimeMinutes = parseTimes(endTimeMinutes);

    AjanvarausForm.getJSXByName(id).getDescendantOfName("entry").setText(entryDay + "." + entryMonth + "." + entryYear + ", klo: " + entryHours + ":" + entryMinutes + " - " + endTimeHours + ":" + endTimeMinutes + ", " + entryLocation).repaint();
    mapFieldsToMatrix(id,entryDate,entryHours + ":" + entryMinutes,endTimeHours + ":" + endTimeMinutes,entryLocation);
}

/*
*  Adds a single appointment slot
*/
function inputSingleSection() {
    if (!validateSingleSection()) {
        return;
    }

    var startDate, helperStartTime, startTimeStr, startTimeHours, startTimeMinutes, duration, locat;

    startDate = AjanvarausForm.getJSXByName("aloitusPvm").getDate();
    helperStartTime = new Date();
    startTimeStr = AjanvarausForm.getJSXByName("aloitusAika").getValue();
    startTimeHours = startTimeStr.substr(0,2);
    startTimeMinutes = startTimeStr.substr(3,2);
    helperStartTime.setHours(startTimeHours);
    helperStartTime.setMinutes(startTimeMinutes);
    duration = AjanvarausForm.getJSXByName("kesto").getValue();
    locat = AjanvarausForm.getJSXByName("paikka").getValue();
    inputSection(startDate,helperStartTime,duration,locat);
}

/*
*  Adds multiple appointment slots
*/
function inputMultiSections() {
    var day, hour, startDate, endDate, helperStartTime, helperEndTime, startTimeStr, startTimeHours, startTimeMinutes, endTimeStr, endTimeHours, endTimeMinutes, locat, duration;

    if (!validateMultipleSection()) {
        return;
    }
    startDate = AjanvarausForm.getJSXByName("aloitusPvm").getDate();
    endDate = AjanvarausForm.getJSXByName("lopetusPvm").getDate();
    selectedDays = getDaySelections();

    helperStartTime = new Date();
    helperEndTime = new Date();
    startTimeStr = AjanvarausForm.getJSXByName("aloitusAika").getValue();
    startTimeHours = startTimeStr.substr(0,2);
    startTimeMinutes = startTimeStr.substr(3,2);

    endTimeStr = AjanvarausForm.getJSXByName("lopetusAika").getValue();
    endTimeHours = endTimeStr.substr(0,2);
    endTimeMinutes = endTimeStr.substr(3,2);

    locat = AjanvarausForm.getJSXByName("paikka").getValue();
    duration = parseInt(AjanvarausForm.getJSXByName("kesto").getValue(), 10);
    helperStartTime.setHours(startTimeHours);
    helperStartTime.setMinutes(startTimeMinutes);
    helperEndTime.setHours(endTimeHours);
    helperEndTime.setMinutes(endTimeMinutes);
    endMinutes = fixEndTime(helperStartTime, helperEndTime, duration);
    helperEndTime.setMinutes(helperEndTime.getMinutes() - parseInt(endMinutes, 10));
    helperEndTime = new Date(helperEndTime);

    for (day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
        for (hour = helperStartTime; hour < helperEndTime; hour.setMinutes(hour.getMinutes() + duration)) {
            if (selectedDays[getFinDay(day.getDay())]) {
                inputSection(day,hour,duration,locat);
            }
        }
        helperStartTime = new Date();
        helperStartTime.setHours(startTimeHours);
        helperStartTime.setMinutes(startTimeMinutes);
    }
}

function fixEndTime(start, end, duration) {
    var i, tempEnd, tempStart, subtraction;
    tempEnd = new Date(end.getTime());
    subtraction = new Date(end.getTime());

    for (tempStart = new Date(start.getTime()); tempStart < tempEnd; tempStart.setMinutes(tempStart.getMinutes() + duration)) {
        if ((tempEnd.getMinutes() - tempStart.getMinutes()) < duration) {
            subtraction.setMinutes(tempEnd.getMinutes() - tempStart.getMinutes());
        }
    }
    return subtraction.getMinutes().toString();
}

function mapFieldsToMatrix(id, entryDate, entryStartTime, entryEndTime, entryLocation, prefill) {
    var node, hasEmptyChild, paiva, kuukausi, vuosi, pvm;

    hasEmptyChild = formatDataCache("slots-nomap", "slots");

    if (!prefill) {
        paiva = entryDate.getDate().toString();
        kuukausi = (entryDate.getMonth() + 1).toString();
        vuosi = entryDate.getFullYear().toString();
        if (paiva.length == 1) {
            paiva = "0" + paiva;
        }
        if (kuukausi.length == 1) {
            kuukausi = "0" + kuukausi;
        }
        pvm = vuosi + "-" + kuukausi + "-" + paiva;
    } else {
        pvm = entryDate;
    }

    node = AjanvarausForm.getCache().getDocument("slots-nomap").getFirstChild().cloneNode();

    node.setAttribute("jsxid",id);
    node.setAttribute("appointmentDate",pvm);
    node.setAttribute("startTime",entryStartTime + ":00");
    node.setAttribute("endTime",entryEndTime + ":00");
    node.setAttribute("location",entryLocation);
    node.setAttribute("slotNumber",id);
    AjanvarausForm.getCache().getDocument("slots-nomap").insertBefore(node);

    if (hasEmptyChild == true) {
        AjanvarausForm.getCache().getDocument("slots-nomap").removeChild(AjanvarausForm.getCache().getDocument("slots-nomap").getFirstChild());
    }
}

// Preload ---------------------------------------------------------------------------------------------------------------------------------------

/**
 * Maps form data (from db through webservice call) to form fields
 * param: objXML - form data in XML document
 */
/* parses recipients from xml and returns a list of recipients */
function getRecipients(formData) {
    var i = 0, j = 0, node, childNode, recipients = [], recipNodes;

    recipNodes = formData.selectNodeIterator("//receipients");

    while (recipNodes.hasNext()) {
        node = recipNodes.next();
        if (!node.getFirstChild()) {
            break;
        }
        recipients[i] = [];
        childNode = node.getFirstChild();
        while (childNode != null) {
            recipients[i][j] = childNode.getValue();
            childNode = childNode.getNextSibling();
            j++;
        }
        j=0;
        i++;
    }
    return recipients;
}

/* parses appointment slot attributes from xml and returns a list of attributes */
function getAttributes(formData) {
    var i = 0, j = 0, attributes = [], slots, node, childNode;

    slots = formData.selectNodeIterator("//slots");

    while (slots.hasNext()) {
        node = slots.next();
        if (!node.getFirstChild()) {
            break;
        }
        attributes[i] = [];
        childNode = node.getFirstChild();
        while (childNode != null) {
            attributes[i][j] = childNode.getValue();
            childNode = childNode.getNextSibling();
            j++;
        }
        j=0;
        i++;
    }
    return attributes;
}

/* maps recipients to Recipients-matrix */
function mapRecipients(objXML) {
    var recipients, hasEmptyChild, i, node;
    
    recipients = getRecipients(objXML);
    hasEmptyChild = formatDataCache("receipientsToShow-nomap", "dummyMatrix");

    for (i = 0; i < recipients.length; i++) {
        node = AjanvarausForm.getCache().getDocument("receipientsToShow-nomap").getFirstChild().cloneNode();
        node.setAttribute("receipient1", getUserNameByUid(recipients[i][0]));
        node.setAttribute("receipient1Uid", recipients[i][0]);
        node.setAttribute("receipient2", getUserNameByUid(recipients[i][1]));
        node.setAttribute("receipient2Uid", recipients[i][1]);
        node.setAttribute("targetPerson", recipients[i][2]);
        AjanvarausForm.getCache().getDocument("receipientsToShow-nomap").insertBefore(node);
    }
    if (hasEmptyChild==true) {
        AjanvarausForm.getCache().getDocument("receipientsToShow-nomap").removeChild(AjanvarausForm.getCache().getDocument("receipientsToShow-nomap").getFirstChild());
    }
    AjanvarausForm.getJSXByName("dummyMatrix").repaintData();
}

/* prefills appointment slots to the form */
function mapAttributes(objXML) {
    var i, section, attributes, pvm, pvm1, pvm2, pvm3;

    attributes = getAttributes(objXML);
    for (i = 0; i < attributes.length; i++) {
        AjanvarausForm.getJSXByName("calendarEntryBlock").setHeight(AjanvarausForm.getJSXByName("calendarEntryBlock").getHeight() + 25).repaint();
        section = AjanvarausForm.getJSXByName("calendarEntryBlock").load("components/calendarEntry.xml", true);
        section.setName(attributes[i][0]).repaint();
        AjanvarausForm.getJSXByName("calendarEntryId").setValue(attributes[i][0]);

        pvm = attributes[i][1];
        pvm = pvm.replace("Z", "");
        pvm1 = pvm.substr(8,2);
        pvm2 = pvm.substr(5,2);
        pvm3 = pvm.substr(0,4);
        pvm = pvm1 + "." + pvm2 + "." + pvm3;

        if (attributes[i][0] >= AjanvarausForm.getJSXByName("calendarEntryId").getValue()) {
            AjanvarausForm.getJSXByName("calendarEntryId").setValue(parseInt(attributes[i][0], 10) + 1);
        }

        section.getDescendantOfName("entry").setText(pvm + ", klo: " + attributes[i][2].substr(0,5) + " - " + attributes[i][3].substr(0,5) + ", " + attributes[i][4]).repaint();
        mapFieldsToMatrix(attributes[i][0], attributes[i][1], attributes[i][2].substr(0,5), attributes[i][3].substr(0,5), attributes[i][4], true);

    }
}

function mapFormDataToFields(objXML) {
    var sender, subject, description, targetPerson;

    // Get basic information from xml document
    subject = objXML.selectSingleNode("//subject", "xmlns:ns2='http://soa.av.koku.arcusys.fi/'").getValue();
    description = objXML.selectSingleNode("//description", "xmlns:ns2='http://soa.av.koku.arcusys.fi/'").getValue();
    targetPerson = objXML.selectSingleNode("//targetPerson", "xmlns:ns2='http://soa.av.koku.arcusys.fi/'").getValue();

    mapAttributes(objXML);
    
    mapRecipients(objXML);

    // Map values to the form fields
    AjanvarausForm.getJSXByName("Header_Text").setValue(subject).repaint();
    AjanvarausForm.getJSXByName("Header_Description").setValue(description).repaint();
    AjanvarausForm.getJSXByName("Lomake_Status").setValue("Created");
}

/**
 * Functions that has to run before form starts.
 */
function Preload() {
    var username, formData, id;
    username = Intalio.Internal.Utilities.getUser();
    username = username.substring(username.indexOf("/")+1);
    AjanvarausForm.getJSXByName("User_Sender").setValue(username).repaint();
    AjanvarausForm.getJSXByName("block").setHeight(0, true);
    if (gup("FormID")) {
        id = gup("FormID");
        AjanvarausForm.getJSXByName("Lomake_ID").setValue(id);
        setModeModify();

        try {

            // Add form preload functions here.
            formData = Arcusys.Internal.Communication.GetFormData(id);

            if(formData != null) {
                mapFormDataToFields(formData);
            }
        } catch (e) {
            alert(e);
        }
    }
}

/*
*  Sets the form in modify mode. Hiding fields that should not be used
*/
function setModeModify() {
    AjanvarausForm.getJSXByName("Haku_Lapset").setDisplay("none",true);
    AjanvarausForm.getJSXByName("dummyMatrix").getChild("deleteButtonColumn").setDisplay("none",true);
    AjanvarausForm.getJSXByName("showOrHideSearch").setDisplay("none",true);
}

// Functions related to recipients mapping -------------------------------------------------------------------------------------------------------

/**
 * inserts selected users to real matrix that values can be later used in Intalio process.
 *
 */
function mapSelectedRecipientsToMatrix() {

    var node, childNode, hasEmptyChild, counter, i, j, recipient1, recipient2, targetPerson, childIterator;

    counter = 1;

    childIterator = AjanvarausForm.getCache().getDocument("receipientsToShow-nomap").getChildIterator();
    hasEmptyChild = formatDataCache("Recipients-nomap", "Recipients");

    while (childIterator.hasNext()) {
        childNode = childIterator.next();

        recipient1 = childNode.getAttribute("receipient1Uid");
        recipient2 = childNode.getAttribute("receipient2Uid");
        targetPerson = childNode.getAttribute("targetPerson");
        node = AjanvarausForm.getCache().getDocument("Recipients-nomap").getFirstChild().cloneNode();

        node.setAttribute("jsxid", counter);
        node.setAttribute("Recipients_Recipient1", recipient1);
        node.setAttribute("Recipients_Recipient2", recipient2);
        node.setAttribute("Recipients_TargetPerson", targetPerson);
        AjanvarausForm.getCache().getDocument("Recipients-nomap").insertBefore(node);
        counter++;

    }

    if (hasEmptyChild==true) {
        AjanvarausForm.getCache().getDocument("Recipients-nomap").removeChild(AjanvarausForm.getCache().getDocument("Recipients-nomap").getFirstChild());
    }
}


function searchNames(searchString) {
    var node, hasEmptyChild, entryFound, userData, i, xmlData, personInfo, list, parent1, parent2, paren1Data, parent2Data, parent1Info, parent2Info;
    entryFound = false;

    if (searchString == "") {
        alert("Syota hakusana");
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
    
        parents = xmlData.selectNodes("//parents", "xmlns:ns2='http://soa.tiva.koku.arcusys.fi/'");

        parent1 = parents.get(0);
        parent2 = parents.get(1);

        parent1List = ["firstname", "lastname", "uid"];
        parent2List = ["firstname", "lastname", "uid"];

        parent1Data = parseXML(parent1, "parents", parent1List);
        parent2Data = parseXML(parent2, "parents", parent2List);
    

        personInfo = userData[0].split(',');
        parent1Info = parent1Data[0].split(',');
        parent2Info = parent2Data[1].split(',');

    
        node = AjanvarausForm.getCache().getDocument("HaetutLapset-nomap").getFirstChild().cloneNode();

        node.setAttribute("jsxid", 0);
        node.setAttribute("etunimi", personInfo[0]);
        node.setAttribute("sukunimi", personInfo[1]);
        node.setAttribute("uid", personInfo[2]);
        node.setAttribute("vanhempi1", parent1Info[0] + " " + parent1Info[1]);
        node.setAttribute("vanhempi2", parent2Info[0] + " " + parent1Info[1]);
        node.setAttribute("vanhempi1Uid", parent1Info[2]);
        node.setAttribute("vanhempi2Uid", parent2Info[2]);

        AjanvarausForm.getCache().getDocument("HaetutLapset-nomap").insertBefore(node);

        if (hasEmptyChild == true) {
            AjanvarausForm.getCache().getDocument("HaetutLapset-nomap").removeChild(AjanvarausForm.getCache().getDocument("HaetutLapset-nomap").getFirstChild());
        }
    }
    
    else {
        alert ("Valitettavasti antamallasi hakusanalla ei loytynyt tuloksia");
    }
    
    AjanvarausForm.getJSXByName("searchChildMatrix").repaintData();

}

function addToRecipients() {
    var counter, node, i = 0, hasEmptyChild, chosen, childIterator, uid, firstname, lastname, childNode, vahnempi1, vanhempi1Uid, vanhempi2, vanhempi2Uid;

    counter = AjanvarausForm.getJSXByName("recipientCounter").getValue();
    //clearDataCache("receipientsToShow-nomap", "dummyMatrix");

    childIterator = AjanvarausForm.getCache().getDocument("HaetutLapset-nomap").getChildIterator();
    hasEmptyChild = formatDataCache("receipientsToShow-nomap", "dummyMatrix");

    while (childIterator.hasNext()) {

        childNode = childIterator.next();

        chosen = childNode.getAttribute("valittu");

        if ((chosen != null) && (chosen != 0)) {

            node = AjanvarausForm.getCache().getDocument("receipientsToShow-nomap").getFirstChild().cloneNode();

            uid = childNode.getAttribute("uid");
            firstname = childNode.getAttribute("etunimi");
            lastname = childNode.getAttribute("sukunimi");
            vanhempi1 = childNode.getAttribute("vanhempi1");
            vanhempi1Uid = childNode.getAttribute("vanhempi1Uid");
            vanhempi2 = childNode.getAttribute("vanhempi2");
            vanhempi2Uid = childNode.getAttribute("vanhempi2Uid");
            targetPerson = firstname + " " + lastname;

            node.setAttribute("jsxid", counter);
            node.setAttribute("receipient1", vanhempi1);
            node.setAttribute("receipient1Uid", vanhempi1Uid);
            node.setAttribute("receipient2", vanhempi2);
            node.setAttribute("receipient2Uid", vanhempi2Uid);
            node.setAttribute("targetPerson", uid);
            node.setAttribute("uid", uid);
            AjanvarausForm.getCache().getDocument("receipientsToShow-nomap").insertBefore(node);
            counter++;

        }

    }
    if (hasEmptyChild == true) {
        AjanvarausForm.getCache().getDocument("receipientsToShow-nomap").removeChild(AjanvarausForm.getCache().getDocument("receipientsToShow-nomap").getFirstChild());
    }
    AjanvarausForm.getJSXByName("dummyMatrix").repaintData();
    AjanvarausForm.getJSXByName("recipientCounter").setValue(counter);

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
    var tempArray = [], i, j, line;

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

// Web Service calls -----------------------------------------------------------------------------------------------------------------------------

// Package FormPreFill
jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetFormData = function(id) {
        var tout, appointmentId, msg, endpoint, url, req, objXML;

        tout = 1000;
        appointmentId = id;

        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.av.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getAppointment><appointmentId>" + appointmentId + "</appointmentId></soa:getAppointment></soapenv:Body></soapenv:Envelope>";
        endpoint = "http://trelx51x:8080/arcusys-koku-0.1-SNAPSHOT-av-model-0.1-SNAPSHOT/KokuAppointmentProcessingServiceImpl";
        //endpoint="http://localhost:8180/arcusys-koku-0.1-SNAPSHOT-av-model-0.1-SNAPSHOT/KokuAppointmentProcessingServiceImpl";
        url = getUrl();

        msg = "message=" + encodeURIComponent(msg)+ "&endpoint=" + encodeURIComponent(endpoint);

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

jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetChildren = function(searchString) {
        var tout, msg, endpoint, url, req, objXML, limit;

        tout = 1000;
        limit = 100;

        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:searchChildren><searchString>" + searchString + "</searchString><limit>" + limit + "</limit></soa:searchChildren></soapenv:Body></soapenv:Envelope>";

        url = getUrl();
        endpoint = "http://trelx51x:8080/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";
        //endpoint = "http://localhost:8180/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";
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

jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.getUserInfo = function(id) {
        var tout, msg, endpoint, url, req, objXML, limit;

        tout = 1000;
        limit = 100;

        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getUserInfo><userUid>" + id + "</userUid></soa:getUserInfo></soapenv:Body></soapenv:Envelope>";
        url = getUrl();
        endpoint = "http://trelx51x:8080/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";
        //endpoint = "http://localhost:8180/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";

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

// Extra Functions -------------------------------------------------------------------------------------------------------------------------------

function getDomainName() {
    var url, url_parts, domain_name_parts, domain_name;

    url = window.location.href;
    url_parts = url.split("/");
    domain_name_parts = url_parts[2].split(":");
    domain_name = domain_name_parts[0];

    return domain_name;
}

function getPortNumber() {
    var url = window.location.href;
    var url_parts = url.split("/");
    var domain_name_parts = url_parts[2].split(":");
    var port_number = domain_name_parts[1];
    return port_number;
}


function getUrl() {
    var url = "http://" + getDomainName() + ":" + getPortNumber();
    url = url + "/palvelut-portlet/ajaxforms/WsProxyServlet2";
    url = "http://intalio.intra.arcusys.fi:8080/gi/WsProxyServlet2";
    return url;
}

function showDialog (dialogId, text, textTitle, title) {
    var dialog, cssDisplay, $;

    dialog = $("#" + dialogId);

    cssDisplay = dialog.css('display');
    if(cssDisplay === 'none') {
        dialog.dialog({
            title: title
        });
        dialog.dialog( "option", "width", 400 );
        dialog.dialog( "option", "height", 300 );
        dialog.dialog( "option", "position", ['middle','middle'] );
        dialog.dialog();
    } else {
        //dialog.dialog( {show:blind} );
        dialog.dialog({
            show: null
        });

    }
    dialog.html("<p style=\"text-align:left;\"><b>" + textTitle + "</b></p><p style=\"margin:0 0 0 0;\">" + text + "</p>");
}

function gup(name) {
    var regexS, regex, results;
    name = name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
    regexS = "[\\?&]"+name+"=([^&#]*)";
    regex = new RegExp( regexS );
    results = regex.exec(window.location.href);
    if( results == null ) {
        return false;
    }
    else {
        return results[1];

    }
}

jsx3.lang.Package.definePackage("Intalio.Internal.CustomErrors", function(error)
{
    error.getError = function(name) {
        var errortext = AjanvarausForm.getJSXByName(name).getTip();
        errortext = "Puuttuvat tiedot: " + errortext;
        return errortext;
    };
});