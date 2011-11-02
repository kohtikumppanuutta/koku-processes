/* place JavaScript code here */

function isNumeric(targetField){
   var validChars = "0123456789";
   var isNumber=true;
   var char;
   var text2 = targetField.getValue();
 
   for (i = 0; i < text2.length && isNumber == true; i++) 
      { 
      char = text2.charAt(i); 
      if (validChars.indexOf(char) == -1) 
         {
         isNumber = false;
         alert("Syot\xE4 vain positiivisia kokonaislukuja!");
         targetField.setValue("").repaint();
         }
      }

}


function checkTimeNotBefore(time, timeNot, errorMsg, type) {
   // alert(dateValue);
   // alert(timeValue);
  //  alert(timeNotBefore);
   // alert(errorMsg);
    //dateValue = dateValue.toString();
   // alert(dateValue.getDate() + " " + dateValue.getMonth() + " " + dateValue.getyear());
   
   var timeValue = time.getValue();
   var timeNotBefore = timeNot.getValue();
   
    if (timeValue!="" && timeNotBefore!="") {

        var hourValue = timeValue.substring(0, 2);
        var hourNotBefore = timeNotBefore.substring(0, 2);
        
        if (hourValue>hourNotBefore)
          {
          alert(errorMsg);
          if (type=="aloitus") {
              time.setValue("");
          }
          if (type=="lopetus") {
              timeNot.setValue("");
          }
          return false;
          }
    }
    return true;
}


function checkDateNotBefore(dateValue, dateNotBefore, errorMsg) {
   // alert(dateValue);

    //dateValue = dateValue.toString();
   // alert(dateValue.getDate() + " " + dateValue.getMonth() + " " + dateValue.getyear());
    if (dateValue!=null && dateNotBefore!=null) {
        var dayValue = dateValue.getDate();
        var monthValue = dateValue.getMonth()+1;
        var yearValue = dateValue.getFullYear();
       // var dayValue = dateValue.substring(0, 2);
       // var monthValue = dateValue.substring(3, 5);
       // var yearValue = dateValue.substring(6, 10);
      //  alert(dayValue + " " + monthValue + " " + yearValue);
    
        var dayNotBefore = dateNotBefore.getDate();
        var monthNotBefore = dateNotBefore.getMonth()+1;
        var yearNotBefore = dateNotBefore.getFullYear();
        //alert(dayNotBefore + " " + monthNotBefore + " " + yearNotBefore);    
        
        dateObjectValue = new Date(yearValue, monthValue-1, dayValue);
        dateObjectNotBefore = new Date(yearNotBefore, monthNotBefore-1, dayNotBefore);
        
       // alert(dateObjectValue.toString() + " " + dateObjectNotBefore.toString());
        
        
        if (dateObjectValue>dateObjectNotBefore)
          {
          alert(errorMsg);
          return false;
          }
    }
    return true;
}


function setChoicesForCalendar(timelevelComponent) {
    var parentPaneName = timelevelComponent.getParent().getParent().getParent().getParent().getParent().getParent().getParent().getName();
    var value = timelevelComponent.getValue();
    if (value=="Tunti") {
        form1.getJSXByName(parentPaneName).getDescendantOfName("paneHours").setDisplay(jsx3.gui.Block.DISPLAYBLOCK).repaint();
        form1.getJSXByName(parentPaneName).setHeight(form1.getJSXByName(parentPaneName).getHeight() + 50).repaint();
        form1.getJSXByName("paneBlock").setHeight(form1.getJSXByName("paneBlock").getHeight() + 50).repaint();
    }
    else {
        if (form1.getJSXByName(parentPaneName).getDescendantOfName("paneHours").getDisplay()==jsx3.gui.Block.DISPLAYBLOCK) {
            form1.getJSXByName(parentPaneName).getDescendantOfName("paneHours").setDisplay(jsx3.gui.Block.DISPLAYNONE).repaint();
            form1.getJSXByName(parentPaneName).setHeight(form1.getJSXByName(parentPaneName).getHeight() - 50).repaint();
            form1.getJSXByName("paneBlock").setHeight(form1.getJSXByName("paneBlock").getHeight() - 50).repaint();
        }
    }
}


function getNumberOfWeeksInYear(year) {
    var number = getWeek(year,11,31);
    if (number==1) {
        number=52;
    }
    return number;
}

function getWeeksBetween(startWeek,startYear,endWeek,endYear) {
    var weeksBetween=new Array();
    var weeksInCurrentYear = getNumberOfWeeksInYear(startYear);
    var flag = 1;
    var tempWeek = startWeek;
    var tempYear = startYear;
    var index = 0;
    
    while (flag!=0) {
        
         weeksBetween[index] = "Viikko " + tempWeek + ", " + tempYear;
         index = index + 1;
         
         if (tempWeek==endWeek && tempYear==endYear) {
             break;
         }
         
         if (tempWeek==weeksInCurrentYear) {
             tempWeek=1;
             tempYear = tempYear + 1;
             weeksInCurrentYear = getNumberOfWeeksInYear(tempYear);
             // alert(weeksInCurrentYear);
             // alert(tempWeek);
             // alert(tempYear);
         }
         else {
             tempWeek = tempWeek + 1;
         }
         
    }
    
    // alert(weeksBetween);
    return weeksBetween;
}


function getWeek(year,month,day){
    //Find JulianDay 

     month += 1; //use 1-12

    var a = Math.floor((14-(month))/12);
    var y = year+4800-a;
    var m = (month)+(12*a)-3;
    var jd = day + Math.floor(((153*m)+2)/5) + 
                 (365*y) + Math.floor(y/4) - Math.floor(y/100) + 
                 Math.floor(y/400) - 32045;      // (gregorian calendar)

    //var jd = (day+1)+Math.Round(((153*m)+2)/5)+(365+y) + 

    //                 Math.round(y/4)-32083;    // (julian calendar)

    
    //now calc weeknumber according to JD

    var d4 = (jd+31741-(jd%7))%146097%36524%1461;
    var L = Math.floor(d4/1460);
    var d1 = ((d4-L)%365)+L;
    numberOfWeek = Math.floor(d1/7) + 1;
    return numberOfWeek;        
}

function addWeeksToChoices(questionName) {
    var weeksBetween=new Array();
    var weekAttribute;
    var index = 0;
    // alert(questionName);
    var startDate = form1.getJSXByName(questionName).getDescendantOfName("aloitusPvm").getDate();
    var endDate = form1.getJSXByName(questionName).getDescendantOfName("lopetusPvm").getDate();
    // alert(startDate + endDate);
    
    var startYear = startDate.getFullYear();
    // alert(startYear);
    var startMonth = startDate.getMonth();
    // alert(startMonth);
    var startDay = startDate.getDate();
    // alert(startDay);
    
    var endYear = endDate.getFullYear();
    var endMonth = endDate.getMonth();
    var endDay = endDate.getDate();
    
    var startWeek = getWeek(startYear, startMonth, startDay);
    var endWeek = getWeek(endYear, endMonth, endDay);
    
    var weeksBetween = getWeeksBetween(startWeek, startYear, endWeek, endYear);
    
        for (key in weeksBetween) {
           // alert("FOR");
           weekAttribute = weeksBetween[index];
           if (weekAttribute!=null) {
               addCalendarChoiceToForm(questionName,weekAttribute);
              // mapMultipleChoiceToMatrix(form1.getJSXByName("multipleChoiceCounter").getValue(),questionName,weekAttribute,questionNumber);
               
               index = index + 1;
           }
        }
}


function addDaysToChoices(questionName) {
    var daysBetween=new Array();
    var dayAttribute, dayYear, dayMonth, dayDay;
    var day;
    var index = 0;
    // alert(questionName);
    var startDate = form1.getJSXByName(questionName).getDescendantOfName("aloitusPvm").getDate();
    var endDate = form1.getJSXByName(questionName).getDescendantOfName("lopetusPvm").getDate();
    // alert(startDate + endDate);
    
    

    for (day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
        dayYear = day.getFullYear();
        dayMonth = day.getMonth()+1;
        dayDay = day.getDate();
        
        dayAttribute = dayDay + "." + dayMonth + "." + dayYear;
        
        addCalendarChoiceToForm(questionName,dayAttribute);

    }

}


function addHoursToChoices(questionName) {

    var daysBetween=new Array();
    var dayAttribute, dayYear, dayMonth, dayDay, hourAttribute;
    var day, hour;
    var index = 0;
    // alert(questionName);
    var startDate = form1.getJSXByName(questionName).getDescendantOfName("aloitusPvm").getDate();
    var endDate = form1.getJSXByName(questionName).getDescendantOfName("lopetusPvm").getDate();
    // alert(startDate + endDate);
    var startTime = form1.getJSXByName(questionName).getDescendantOfName("aloitusAika").getValue();
    var endTime = form1.getJSXByName(questionName).getDescendantOfName("lopetusAika").getValue();
    
    var helperStartTime = new Date();
    var helperEndTime = new Date();
    
    var startTimeHours = startTime.substr(0,2);
    var startTimeMinutes = startTime.substr(3,2);
    
    var endTimeHours = endTime.substr(0,2);
    var endTimeMinutes = endTime.substr(3,2);
    
    helperStartTime.setHours(startTimeHours);
    helperStartTime.setMinutes(startTimeMinutes);
    helperEndTime.setHours(endTimeHours);
    helperEndTime.setMinutes(endTimeMinutes);

    for (day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
        dayYear = day.getFullYear();
        dayMonth = day.getMonth()+1;
        dayDay = day.getDate();
        
        dayAttribute = dayDay + "." + dayMonth + "." + dayYear;
        // alert(dayAttribute);
        for (hour = helperStartTime; hour <= helperEndTime; hour.setHours(hour.getHours() + 1)) {
            hourAttribute = hour.getHours() + ":00";
            hourAttribute = dayAttribute + " " + hourAttribute;
            addCalendarChoiceToForm(questionName,hourAttribute);
        }
        
    helperStartTime.setHours(startTimeHours);
    helperStartTime.setMinutes(startTimeMinutes);
    helperEndTime.setHours(endTimeHours);
    helperEndTime.setMinutes(endTimeMinutes);
    hour = helperStartTime;
            
    }
}


function addCalendarChoiceToForm(tempID,choiceText) {
    
   var block = "choiceBlock" + tempID;
   var choiceTextField = "choiceTextField" + tempID;
   var id = form1.getJSXByName(tempID).getChild("tempID").getValue()  + "_" + form1.getJSXByName(tempID).getChild("choiceCounter").getValue();
  // alert(id);
   var section = form1.getJSXByName(tempID).getDescendantOfName("choiceBlock" + tempID).load("components/choicesection.xml",true);
   
    form1.getJSXByName(tempID).getDescendantOfName("choiceBlock" + tempID).setHeight(form1.getJSXByName(tempID).getDescendantOfName("choiceBlock" + tempID).getHeight() + 30,true).repaint();
    form1.getJSXByName(tempID).setHeight(form1.getJSXByName(tempID).getHeight() + 30);
    form1.getJSXByName("paneBlock").setHeight(form1.getJSXByName("paneBlock").getHeight() + 30).repaint();
    
    form1.getJSXByName("choicePane").setName("choicePane" + id).repaint();
    
    form1.getJSXByName("choicePane" + id).getDescendantOfName("checkLabel").setText(choiceText).repaint();
    mapMultipleChoiceToMatrix(form1.getJSXByName("multipleChoiceCounter").getValue(),tempID,choiceText,form1.getJSXByName(tempID).getChild("choiceCounter").getValue());
    form1.getJSXByName("choicePane" + id).getChild("choiceUniversalID").setValue(form1.getJSXByName("multipleChoiceCounter").getValue());
    form1.getJSXByName("multipleChoiceCounter").setValue(parseInt(form1.getJSXByName("multipleChoiceCounter").getValue()) + 1);
    form1.getJSXByName(tempID).getChild("choiceCounter").setValue(parseInt(form1.getJSXByName(tempID).getChild("choiceCounter").getValue()) + 1);
   /*
   form1.getJSXByName(tempID).getDescendantOfName("choiceBlock").getHeight() + 30,true).repaint();
   form1.getJSXByName(tempID).setHeight(form1.getJSXByName(tempID).getHeight() + 30);
   form1.getJSXByName("paneBlock").setHeight(form1.getJSXByName("paneBlock").getHeight() + 30).repaint();
   
   form1.getJSXByName("choicePane").setName("choicePane" + id).repaint();
   
   
  // var choice = section.getFirstChild().getFirstChild().getFirstChild();
  // var label = section.getFirstChild().getFirstChild().getNextSibling().getFirstChild();
  // var idField = section.getLastChild();
   
  // choice.setName(choice.getName() + id);
  // label.setName(label.getName() + id);
  // section.setName(section.getName() + id);
  // label.setText(choiceText,true);
   
  // idField.setValue(id);
   
   form1.getJSXByName("choicePane" + id).getChild("choiceUniversalID").setValue(form1.getJSXByName("multipleChoiceCounter").getValue());
   
   mapMultipleChoiceToMatrix(form1.getJSXByName("multipleChoiceCounter").getValue(),tempID,choiceText,form1.getJSXByName(tempID).getChild("choiceCounter").getValue());
   form1.getJSXByName("multipleChoiceCounter").setValue(parseInt(form1.getJSXByName("multipleChoiceCounter").getValue()) + 1);
   form1.getJSXByName(tempID).getChild("choiceCounter").setValue(parseInt(form1.getJSXByName(tempID).getChild("choiceCounter").getValue()) + 1);
    */
}


function addCalendarChoices(questionName) {
    // alert(questionName);
    var type = form1.getJSXByName(questionName).getDescendantOfName("aikataso").getValue();
    // alert(type);
    if (type=="Viikko") {
        addWeeksToChoices(questionName);
    }
    if (type=="Paiva") {
        addDaysToChoices(questionName);
    }
    if (type=="Tunti") {
        addHoursToChoices(questionName);
    }
    
    /*
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
    */
}


// FOR MULTIPLE CHOICE: uncheckTheOthers(this.getParent().getParent().getParent().getParent().getParent().getName(), this.getName());
function uncheckTheOthers(targetName, checkedName)   {
   var i = 0;
   var descendants = form1.getJSXByName(targetName).getDescendantsOfType("jsx3.gui.CheckBox");
   for (i=0;i<descendants.length;i++)   {
      if (descendants[i].getName() != checkedName)
         descendants[i].setChecked(0);
   }
}


function getEndpoint() {
    
    //var endpoint = "http://localhost:8180";
    var endpoint = "http://trelx51x:8080";
    return endpoint;
    
}

//Getting the domain name and port if available
function getUrl() {
    
    var domain = getDomainName();
    return "http://" + domain + "/palvelut-portlet/ajaxforms/WsProxyServlet2";

}

function getDomainName() {

    var url = window.location.href;
    var url_parts = url.split("/");
    var domain_name = url_parts[2];
       
    return domain_name;

}


function getPortNumber() {
    
    var url = window.location.href;
    
    var url_parts = url.split("/");
    
    var domain_name_parts = url_parts[2].split(":");
    
    var port_number = domain_name_parts[1];
    
    return port_number;

}


function intalioPreStart() {
    //alert(form1.getCache().getDocument("MultipleChoice-nomap"));
    var returnValue = checkTemplateNameAlreadyExisting(form1.getJSXByName("User_Sender").getValue(), form1.getJSXByName("Header_Text").getValue());
    
    if (returnValue==null) {
        if (form1.getJSXByName("PohjaNakyvyys_Mina").getChecked()) {
            form1.getJSXByName("PohjaNakyvyys_Arvo").setValue("Creator").repaint();
        }
        else if (form1.getJSXByName("PohjaNakyvyys_Organisaatio").getChecked()) {
            form1.getJSXByName("PohjaNakyvyys_Arvo").setValue("Organization").repaint();
        }
        else {
            form1.getJSXByName("PohjaNakyvyys_Arvo").setValue("All").repaint();
        }
        
    }
    
    return returnValue;

}

function checkTemplateNameAlreadyExisting(creator, templateName) {
        var resultValue = null;
        try {

            var resultData = Arcusys.Internal.Communication.IsTemplateNameExisting(creator, templateName);
            //Arcusys.Internal.Communication.GerLDAPUser();
            //alert(resultData);
            if(resultData != null) {
                resultValue = resultData.selectSingleNode("//return", "xmlns:ns2='http://soa.kv.koku.arcusys.fi/'").getValue();
            }
        } catch (e) {
            return e;
        }
        
        if (resultValue == "ExistsActive") {
            return "J\xE4rjestelm\xE4ss\xE4 on jo aktiivinen pohja t\xE4ll\xE4 nimell\xE4. Ole hyv\xE4 ja tallenna pohja toisella nimell\xE4.";
        }
        else if (resultValue == "ExistsNotActive") {
            var wantsToReplace = confirm("J\xE4rjestelm\xE4ss\xE4 on jo aktiivinen pohja t\xE4ll\xE4 nimell\xE4. Tahdotko tallentaa uuden pohjan olemassaolevan p\xE4\xE4lle?");
            if (wantsToReplace==true) {
                    form1.getJSXByName("User_PaivitaOlemassaoleva").setChecked(jsx3.gui.CheckBox.CHECKED).repaint();
            }
            else {
                    return "Muuta pohjan nimi ja l\xE4het\xE4 lomake uudelleen.";
            }
        }
        
        return null;
}


jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.IsTemplateNameExisting= function(creator, templateName) {
        
        var tout = 1000;
        var limit = 100;
        var searchString = "";

        var msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.kv.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:isRequestTemplateExist><creator>" + creator + "</creator><subject>" + templateName + "</subject></soa:isRequestTemplateExist></soapenv:Body></soapenv:Envelope>";
       
      
        var url = getUrl();
        
        var endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-kv-model-0.1-SNAPSHOT/KokuRequestProcessingServiceImpl";
        
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



function uncheckTheOthers(targetName, checkedName)   {
   var descendants = form1.getJSXByName(targetName).getDescendantsOfType("jsx3.gui.CheckBox");
   for (x in descendants)   {
      if (descendants[x].getName() != checkedName)
         descendants[x].setChecked(0);
   }
}

function addChoice(tempID)
{
   // alert("addChoice, parameter: " + tempID);
  // var id = getID();
  // alert("id: " + id);
   var block = "choiceBlock" + tempID;
   var choiceTextField = "choiceTextField" + tempID;
   var id = form1.getJSXByName(tempID).getChild("tempID").getValue()  + "_" + form1.getJSXByName(tempID).getChild("choiceCounter").getValue();
   
   var section = form1.getJSXByName(block).load("components/choicesection.xml",true);
   
   form1.getJSXByName(block).setHeight(form1.getJSXByName(block).getHeight() + 30,true).repaint();
   form1.getJSXByName(block).getParent().setHeight(form1.getJSXByName(block).getParent().getHeight() + 30);
   form1.getJSXByName("paneBlock").setHeight(form1.getJSXByName("paneBlock").getHeight() + 30).repaint();
   
   var choice = section.getFirstChild().getFirstChild().getFirstChild();
   var label = section.getFirstChild().getFirstChild().getNextSibling().getFirstChild();
   var idField = section.getLastChild();
   
   choice.setName(choice.getName() + id);
   label.setName(label.getName() + id);
   section.setName(section.getName() + id);
   label.setText(form1.getJSXByName(choiceTextField).getValue(),true);
   
   idField.setValue(id);
   
   form1.getJSXByName("choicePane" + id).getChild("choiceUniversalID").setValue(form1.getJSXByName("multipleChoiceCounter").getValue());
   
   mapMultipleChoiceToMatrix(form1.getJSXByName("multipleChoiceCounter").getValue(),tempID,form1.getJSXByName(choiceTextField).getValue(),form1.getJSXByName(tempID).getChild("choiceCounter").getValue());
   form1.getJSXByName("multipleChoiceCounter").setValue(parseInt(form1.getJSXByName("multipleChoiceCounter").getValue()) + 1);
   form1.getJSXByName(tempID).getChild("choiceCounter").setValue(parseInt(form1.getJSXByName(tempID).getChild("choiceCounter").getValue()) + 1);
}


function mapMultipleChoiceToMatrix(id,sectionNumber,question,questionNumber) {
  //  alert("mapMultipleChoiceToMatrix(" + sectionNumber + ", " + question + ", " + questionNumber + ")"); 
    var node;
    var hasEmptyChild = false;
    if (form1.getCache().getDocument("MultipleChoice-nomap").getFirstChild() == null) {
        form1.getJSXByName("MultipleChoice").commitAutoRowSession();
        hasEmptyChild = true;
    }
    
    node = form1.getCache().getDocument("MultipleChoice-nomap").getFirstChild().cloneNode();
   // alert(node);
    node.setAttribute("jsxid",id);
    node.setAttribute("MultipleChoice_Section",sectionNumber);
    node.setAttribute("MultipleChoice_Question",question);
    node.setAttribute("MultipleChoice_Number",questionNumber);
    node.setAttribute("MultipleChoice_Checked",false);
    form1.getCache().getDocument("MultipleChoice-nomap").insertBefore(node);
    if (hasEmptyChild==true) {
        form1.getCache().getDocument("MultipleChoice-nomap").removeChild(form1.getCache().getDocument("MultipleChoice-nomap").getFirstChild());
    }
}




function removeChoice(block,ID)
{
 // alert("block " + block + " ID " + ID);
  // var pane = "choicePane" + id;
  // var block = "choiceBlock" + tempID;
   var choiceID1 = ID.getChild("choiceUniversalID").getValue();
  // alert("choiceID1 " + choiceID1);
   form1.getCache().getDocument("MultipleChoice-nomap").removeChild(form1.getCache().getDocument("MultipleChoice-nomap").selectSingleNode("//record[@jsxid='" + choiceID1 + "']"));
   form1.getJSXByName(block).removeChild(ID);
   form1.getJSXByName(block).setHeight(form1.getJSXByName(block).getHeight() - 30,true).repaint();
   form1.getJSXByName(block).getParent().setHeight(form1.getJSXByName(block).getParent().getHeight() - 30);
   form1.getJSXByName("paneBlock").setHeight(form1.getJSXByName("paneBlock").getHeight() - 30).repaint();
  
}
/*
function getID()
{
   var templateID = form1.getJSXByName("sectionNumber").getValue();
   var Id = form1.getJSXByName("ID").getValue();
   form1.getJSXByName("ID").setValue(parseInt(form1.getJSXByName("ID").getValue()) + 1);
   return templateID + "_" + Id;
}*/

function getTemplateID()
{
   form1.getJSXByName("templateID").setValue(parseInt(form1.getJSXByName("templateID").getValue()) + 1);
   var templateID = form1.getJSXByName("templateID").getValue();
   return templateID;
}



function resetChoiceSection()
{
   form1.getJSXByName("rootpane").setHeight(120,1);
  // form1.getJSXByName("Block").setHeight(30,1);
   form1.getJSXByName("checkID").setValue(0);
   form1.getJSXByName("choiceLabelID").setValue(0);
}

function test()
{

   var choiceID = form1.getJSXByName("checkID").getValue();
   var labelID = form1.getJSXByName("choiceLabelID").getValue();
   
   
   var section = form1.getJSXByName("Block").load("components/choicesection.xml",true);
   form1.getJSXByName("rootpane").setHeight(form1.getJSXByName("rootpane").getHeight() + 30,1);
   form1.getJSXByName("Block").setHeight(form1.getJSXByName("Block").getHeight() + 30,1);
   var choice = section.getFirstChild().getFirstChild().getFirstChild();
   var label = section.getFirstChild().getLastChild().getFirstChild();
   choice.setName(choice.getName() + choiceID);
   label.setName(label.getName() + labelID);
   label.setText(form1.getJSXByName("vaihtoehto_text").getValue(),1);
   
   form1.getJSXByName("checkID").setValue(parseInt(form1.getJSXByName("checkID").getValue()) + 1);
   form1.getJSXByName("choiceLabelID").setValue(parseInt(form1.getJSXByName("choiceLabelID").getValue()) + 1);

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
   // form1.getJSXByName("User_Sender").setValue(username);
    
        try {

            // Add form preload functions here.
            var userUid = Arcusys.Internal.Communication.GetUserUidByUsername(username);
            //Arcusys.Internal.Communication.GerLDAPUser();
            
            if(userUid != null) {
                form1.getJSXByName("User_Sender").setValue(userUid.selectSingleNode("//userUid", "xmlns:ns2='http://soa.common.koku.arcusys.fi/'").getValue()).repaint();
            }
        } catch (e) {
            alert(e);
        }
}



jsx3.lang.Package.definePackage(
  "koku.service",                //the full name of the package to create
  function(service) {          //name the argument of this function

    //call this method to begin the service call (eg.service.callhaeOrganisaatiot();)
    service.callhaeOrganisaatiot = function() {
      var objService = form1.loadResource("MockMapping_xml");
      objService.setOperation("haeOrganisaatiot");

      //subscribe
      objService.subscribe(jsx3.net.Service.ON_SUCCESS, service.onhaeOrganisaatiotSuccess);
      objService.subscribe(jsx3.net.Service.ON_ERROR, service.onhaeOrganisaatiotError);
      objService.subscribe(jsx3.net.Service.ON_INVALID, service.onhaeOrganisaatiotInvalid);

      //PERFORMANCE ENHANCEMENT: uncomment the following line of code to use XSLT to convert the server response to CDF (refer to the API docs for jsx3.net.Service.compile for implementation details)
      //objService.compile();

      //call the service
      objService.doCall();
    };

    service.onhaeOrganisaatiotSuccess = function(objEvent) {
      //var responseXML = objEvent.target.getInboundDocument();
      // objEvent.target.getServer().alert("Success","The service call was successful.");
    };

    service.onhaeOrganisaatiotError = function(objEvent) {
      var myStatus = objEvent.target.getRequest().getStatus();
      objEvent.target.getServer().alert("Error","The service call failed. The HTTP Status code is: " + myStatus);
    };

    service.onhaeOrganisaatiotInvalid = function(objEvent) {
      objEvent.target.getServer().alert("Invalid","The following message node just failed validation:\n\n" + objEvent.message);
    };

  }
);


jsx3.lang.Package.definePackage(
  "kokuhenkilot.service",                //the full name of the package to create
  function(service) {          //name the argument of this function

    //call this method to begin the service call (eg.service.callhaeHenkilotOrganisaatiossa();)
    service.callhaeHenkilotOrganisaatiossa = function() {
      var objService = form1.loadResource("MockMapping_xml");
      objService.setOperation("haeHenkilotOrganisaatiossa");

      //subscribe
      objService.subscribe(jsx3.net.Service.ON_SUCCESS, service.onhaeHenkilotOrganisaatiossaSuccess);
      objService.subscribe(jsx3.net.Service.ON_ERROR, service.onhaeHenkilotOrganisaatiossaError);
      objService.subscribe(jsx3.net.Service.ON_INVALID, service.onhaeHenkilotOrganisaatiossaInvalid);

      //PERFORMANCE ENHANCEMENT: uncomment the following line of code to use XSLT to convert the server response to CDF (refer to the API docs for jsx3.net.Service.compile for implementation details)
      //objService.compile();

      //call the service
      objService.doCall();
    };

    service.onhaeHenkilotOrganisaatiossaSuccess = function(objEvent) {
      //var responseXML = objEvent.target.getInboundDocument();
     objEvent.target.getServer().alert("Success","The service call was successful.");
    };

    service.onhaeHenkilotOrganisaatiossaError = function(objEvent) {
      var myStatus = objEvent.target.getRequest().getStatus();
      objEvent.target.getServer().alert("Error","The service call failed. The HTTP Status code is: " + myStatus);
    };

    service.onhaeHenkilotOrganisaatiossaInvalid = function(objEvent) {
      objEvent.target.getServer().alert("Invalid","The following message node just failed validation:\n\n" + objEvent.message);
    };

  }
);


function prepareFormMatrix() {
    form1.getJSXByName("TextInput").commitAutoRowSession();
    form1.getJSXByName("MultipleChoice").commitAutoRowSession();
}


function showForm() {
    var descendant, descendants;
    if (form1.getJSXByName("Kentat").getDisplay()=="none") {
        form1.getJSXByName("showFormButton").setText("N\xE4yt\xE4 lomake").repaint();
        form1.getJSXByName("Kentat").setDisplay("block").repaint();
        form1.getJSXByName("PohjaNakyvyys").setDisplay("block").repaint();
       // form1.getJSXByName("Header").setDisplay("block").repaint();
       
       var childNode;
       var childIterator = form1.getCache().getDocument("TextInput-nomap").getChildIterator();
       var fieldsetNumber;
       var descendant, descendants, x;

       while(childIterator.hasNext()){
       
            childNode = childIterator.next();

            fieldsetNumber = childNode.getAttribute("TextInput_Number");
           // alert(fieldsetNumber);
            //alert(fieldsetNumber);
            if (fieldsetNumber!="") {
                //alert(form1.getJSXByName(fieldsetNumber).getChild("pane").getChild("layout (--)").getLastChild().getChild("layout ( | )").getChild("pane").getChild("button").getDisplay());
               if (childNode.getAttribute("TextInput_Type") == "MULTIPLE_CHOICE") {
                      // alert("MULTIPLE_CHOICE");
                      form1.getJSXByName("paneBlock").setHeight(form1.getJSXByName("paneBlock").getHeight() + 80).repaint();
                      form1.getJSXByName(fieldsetNumber).setHeight(form1.getJSXByName(fieldsetNumber).getHeight() + 80).repaint();
                      
                       descendant = form1.getJSXByName(fieldsetNumber).getDescendantOfName("paneOption",true,false);
                      // alert(descendant);
                      // descendant.setHeight(descendant.getHeight() + 25).repaint();
                     //  descendant = form1.getJSXByName(fieldsetNumber).getDescendantOfName("rootpane",true,false);
                     //  alert(descendant);
                       descendant.setHeight(descendant.getHeight() + 40).repaint();
                       descendant = form1.getJSXByName(fieldsetNumber).getDescendantOfName("paneAddChoice",true,false);
                      // alert(descendant);
                       descendant.setDisplay(jsx3.gui.Block.DISPLAYBLOCK).repaint();
                       descendant = form1.getJSXByName(fieldsetNumber).getDescendantOfName("deleteButton",true,false);
                      // alert(descendant);
                       descendant.setDisplay(jsx3.gui.Block.DISPLAYBLOCK).repaint();
                       descendants = form1.getJSXByName("choiceBlock" + fieldsetNumber).getDescendantsOfType("jsx3.gui.Button")
                        for (x=0;x<descendants.length;x=x+1) {
                            // alert(descendants[x]);
                             descendants[x].setDisplay(jsx3.gui.Block.DISPLAYBLOCK).repaint();
                       }
               }
               else if (childNode.getAttribute("TextInput_Type") == "CALENDAR") {
                      // alert("MULTIPLE_CHOICE");
                      form1.getJSXByName("paneBlock").setHeight(form1.getJSXByName("paneBlock").getHeight() + 150).repaint();
                      form1.getJSXByName(fieldsetNumber).setHeight(form1.getJSXByName(fieldsetNumber).getHeight() + 150).repaint();
                      
                       descendant = form1.getJSXByName(fieldsetNumber).getDescendantOfName("paneEdit",true,false);
                      // alert(descendant);
                      // descendant.setHeight(descendant.getHeight() + 25).repaint();
                     //  descendant = form1.getJSXByName(fieldsetNumber).getDescendantOfName("rootpane",true,false);
                     //  alert(descendant);
                      // descendant.setHeight(descendant.getHeight() + 40).repaint();
                       descendant.setDisplay(jsx3.gui.Block.DISPLAYBLOCK).repaint();
                       
                       if (form1.getJSXByName(fieldsetNumber).getDescendantOfName("aikataso").getValue()=="Tunti") {
                           form1.getJSXByName("paneBlock").setHeight(form1.getJSXByName("paneBlock").getHeight() + 50).repaint();
                           form1.getJSXByName(fieldsetNumber).setHeight(form1.getJSXByName(fieldsetNumber).getHeight() + 50).repaint();
                           descendant = form1.getJSXByName(fieldsetNumber).getDescendantOfName("paneHours",true,false);
                          // alert(descendant);
                           descendant.setDisplay(jsx3.gui.Block.DISPLAYBLOCK).repaint();
                       }

                       descendant = form1.getJSXByName(fieldsetNumber).getDescendantOfName("paneAddButton",true,false);
                      // alert(descendant);
                       descendant.setDisplay(jsx3.gui.Block.DISPLAYBLOCK).repaint();
                       descendant = form1.getJSXByName(fieldsetNumber).getDescendantOfName("paneDelete",true,false);
                      // alert(descendant);
                       descendant.setDisplay(jsx3.gui.Block.DISPLAYBLOCK).repaint();
                       descendants = form1.getJSXByName("choiceBlock" + fieldsetNumber).getDescendantsOfType("jsx3.gui.Button")
                        for (x=0;x<descendants.length;x=x+1) {
                            // alert(descendants[x]);
                             descendants[x].setDisplay(jsx3.gui.Block.DISPLAYBLOCK).repaint();
                       }
               }
               else {
                   form1.getJSXByName("paneBlock").setHeight(form1.getJSXByName("paneBlock").getHeight() + 23).repaint();
                   form1.getJSXByName(fieldsetNumber).setHeight(form1.getJSXByName(fieldsetNumber).getHeight() + 23).repaint();
                   form1.getJSXByName(fieldsetNumber).getChild("layout (--)").getLastChild().getChild("layout ( | )").getChild("pane").getChild("button").setDisplay(jsx3.gui.Block.DISPLAYBLOCK).repaint();
               }
            }
            descendant = "";
            descendants = "";
       }
       
    }
    else {
        form1.getJSXByName("showFormButton").setText("N\xE4yt\xE4 muokkausn\xE4kym\xE4").repaint();
        form1.getJSXByName("Kentat").setDisplay("none").repaint();
        form1.getJSXByName("PohjaNakyvyys").setDisplay("none").repaint();
       // form1.getJSXByName("Header").setDisplay("none").repaint();
       
       var childNode;
       var childIterator = form1.getCache().getDocument("TextInput-nomap").getChildIterator();
       var fieldsetNumber;

       while(childIterator.hasNext()){
       
            childNode = childIterator.next();

            fieldsetNumber = childNode.getAttribute("TextInput_Number");
           // alert(fieldsetNumber);
            if (fieldsetNumber!="") {
               if (childNode.getAttribute("TextInput_Type") == "MULTIPLE_CHOICE") {
                      // alert("MULTIPLE_CHOICE");
                      form1.getJSXByName("paneBlock").setHeight(form1.getJSXByName("paneBlock").getHeight() - 80).repaint();
                      form1.getJSXByName(fieldsetNumber).setHeight(form1.getJSXByName(fieldsetNumber).getHeight() - 80).repaint();
                      
                       descendant = form1.getJSXByName(fieldsetNumber).getDescendantOfName("paneOption",true,false);
                      // alert(descendant);
                      //descendant.setHeight(descendant.getHeight() - 25).repaint();
                      // descendant = form1.getJSXByName(fieldsetNumber).getDescendantOfName("rootpane",true,false);
                      // alert(descendant);
                       descendant.setHeight(descendant.getHeight() - 40).repaint();
                       descendant = form1.getJSXByName(fieldsetNumber).getDescendantOfName("paneAddChoice",true,false);
                      // alert(descendant);
                       descendant.setDisplay("none").repaint();
                       descendant = form1.getJSXByName(fieldsetNumber).getDescendantOfName("deleteButton",true,false);
                      // alert(descendant);
                       descendant.setDisplay("none").repaint();
                       descendants = form1.getJSXByName("choiceBlock" + fieldsetNumber).getDescendantsOfType("jsx3.gui.Button")
                       for (x=0;x<descendants.length;x=x+1) {
                             descendants[x].setDisplay("none").repaint();
                       }
               }
               else if (childNode.getAttribute("TextInput_Type") == "CALENDAR") {
                      // alert("MULTIPLE_CHOICE");
                      form1.getJSXByName("paneBlock").setHeight(form1.getJSXByName("paneBlock").getHeight() - 150).repaint();
                      form1.getJSXByName(fieldsetNumber).setHeight(form1.getJSXByName(fieldsetNumber).getHeight() - 150).repaint();
                      
                       descendant = form1.getJSXByName(fieldsetNumber).getDescendantOfName("paneEdit",true,false);
                       descendant.setDisplay(jsx3.gui.Block.DISPLAYNONE).repaint();
                      // alert(descendant);
                      // descendant.setHeight(descendant.getHeight() + 25).repaint();
                     //  descendant = form1.getJSXByName(fieldsetNumber).getDescendantOfName("rootpane",true,false);
                     //  alert(descendant);
                      // descendant.setHeight(descendant.getHeight() + 40).repaint();
                       if (form1.getJSXByName(fieldsetNumber).getDescendantOfName("aikataso").getValue()=="Tunti") {
                           form1.getJSXByName("paneBlock").setHeight(form1.getJSXByName("paneBlock").getHeight() - 50).repaint();
                           form1.getJSXByName(fieldsetNumber).setHeight(form1.getJSXByName(fieldsetNumber).getHeight() - 50).repaint();
                           descendant = form1.getJSXByName(fieldsetNumber).getDescendantOfName("paneHours",true,false);
                          // alert(descendant);
                           descendant.setDisplay(jsx3.gui.Block.DISPLAYNONE).repaint();
                       }
                      // alert(descendant);
                       
                       descendant = form1.getJSXByName(fieldsetNumber).getDescendantOfName("paneAddButton",true,false);
                      // alert(descendant);
                       descendant.setDisplay(jsx3.gui.Block.DISPLAYNONE).repaint();
                       descendant = form1.getJSXByName(fieldsetNumber).getDescendantOfName("paneDelete",true,false);
                      // alert(descendant);
                       descendant.setDisplay(jsx3.gui.Block.DISPLAYNONE).repaint();
                       descendants = form1.getJSXByName("choiceBlock" + fieldsetNumber).getDescendantsOfType("jsx3.gui.Button")
                        for (x=0;x<descendants.length;x=x+1) {
                            // alert(descendants[x]);
                             descendants[x].setDisplay(jsx3.gui.Block.DISPLAYNONE).repaint();
                       }
               }
               else {
                   form1.getJSXByName("paneBlock").setHeight(form1.getJSXByName("paneBlock").getHeight() - 23).repaint();
                   form1.getJSXByName(fieldsetNumber).setHeight(form1.getJSXByName(fieldsetNumber).getHeight() - 23).repaint();
                   form1.getJSXByName(fieldsetNumber).getChild("layout (--)").getLastChild().getChild("layout ( | )").getChild("pane").getChild("button").setDisplay("none").repaint();
               }
            }
            descendant = "";
            descendants = "";
       }
    }
}


function setValueToText(value,textLabel) {
    form1.getJSXByName(textLabel).setText(value).repaint();
    
}


function fillUser() {
    form1.getJSXByName("User_Sender").setValue(Intalio.Internal.Utilities.getUser()).repaint();
}

function mapFieldsToMatrix(title,question,sectionNumber,type) {
    var node;
    var hasEmptyChild = false;
    if (form1.getCache().getDocument("TextInput-nomap").getFirstChild() == null) {
        form1.getJSXByName("TextInput").commitAutoRowSession();
        hasEmptyChild = true;
    }
    
    node = form1.getCache().getDocument("TextInput-nomap").getFirstChild().cloneNode();
   // alert(node);
    node.setAttribute("jsxid",sectionNumber);
    node.setAttribute("TextInput_Question",question);
    node.setAttribute("TextInput_Section",title);
    node.setAttribute("TextInput_Number",sectionNumber);
    node.setAttribute("TextInput_Type",type);
    form1.getCache().getDocument("TextInput-nomap").insertBefore(node);
    if (hasEmptyChild==true) {
        form1.getCache().getDocument("TextInput-nomap").removeChild(form1.getCache().getDocument("TextInput-nomap").getFirstChild());
    }
}


function json() {
var myJSONObject = {"TaskOutput": { 
   "TextInput": {
      "TextInput_Question": form1.getJSXByName("labelKysymys").getText(),
      "TextInput_Answer": form1.getJSXByName("textbox").getValue()
   }
 }
};
alert(myJSONObject);
var myObject = eval('(' + myJSONObject + ')');
alert(myObject);
}

function getInputType() {
    var input;
   // alert("getInputType");
    if (form1.getJSXByName("vastausVapaa").getChecked()) {
        input = "FREE_TEXT";
    }
    if (form1.getJSXByName("vastausKyllaEi").getChecked()) {
        input = "YES_NO";
    }
    if (form1.getJSXByName("vastausVapaatVaihtoehdot").getChecked()) {
        input = "MULTIPLE_CHOICE";
    }
    if (form1.getJSXByName("vastausKalenteriVaihtoehdot").getChecked()) {
        input = "CALENDAR";
    }
    /*
    if (form1.getJSXByName("vastausNumero").getChecked()) {
        input = "NUMBER";
    }
*/
    return input;
}

function getAndRaiseSectionNumber() {
    var sectionNumber = form1.getJSXByName("sectionNumber").getValue();
    form1.getJSXByName("sectionNumber").setValue(parseInt(sectionNumber)+1);
    return sectionNumber;
}

function inputSection(title,question) {
    var sectionNumber = getAndRaiseSectionNumber();
    var inputType = getInputType();
   // alert(inputType);
    if (inputType=="FREE_TEXT") {
        mapFieldsToMatrix(title,question,sectionNumber,inputType);
        inputTextSection(title,question,sectionNumber);
    }
    if (inputType=="YES_NO") {
        mapFieldsToMatrix(title,question,sectionNumber,inputType);
        inputYesNoSection(title,question,sectionNumber);
    }
    if (inputType=="MULTIPLE_CHOICE") {
       // alert("MULTIPLE_CHOICE");
        mapFieldsToMatrix(title,question,sectionNumber,inputType);
        inputMultipleChoiceSection(title,question,sectionNumber);
    }
    if (inputType=="CALENDAR") {
       // alert("MULTIPLE_CHOICE");
        mapFieldsToMatrix(title,question,sectionNumber,inputType);
        inputCalendarSection(title,question,sectionNumber);
    }
    if (inputType=="NUMBER") {
       // alert("MULTIPLE_CHOICE");
        mapFieldsToMatrix(title,question,sectionNumber,inputType);
        inputNumberSection(title,question,sectionNumber);
    }
}

function inputTextSection(title,question,nameSection) {
    form1.getJSXByName("paneBlock").setHeight(form1.getJSXByName("paneBlock").getHeight() + 205).repaint();
    var textSection = form1.getJSXByName("block").load("components/textinputsection.xml",true);
    
    // textSection.setTitleText(title).repaint();
    textSection.setName(nameSection).repaint();
    //alert(textSection.getChild());
    //alert(textSection.getJSXByName("labelKysymys").getText());
    form1.getJSXByName("labelKysymys").setText(question).repaint();
    
}

function inputNumberSection(title,question,nameSection) {
    form1.getJSXByName("paneBlock").setHeight(form1.getJSXByName("paneBlock").getHeight() + 95).repaint();
    var textSection = form1.getJSXByName("block").load("components/numberinputsection.xml",true);
    
    // textSection.setTitleText(title).repaint();
    textSection.setName(nameSection).repaint();
    //alert(textSection.getChild());
    //alert(textSection.getJSXByName("labelKysymys").getText());
    form1.getJSXByName("labelKysymys").setText(question).repaint();
    
}

function inputYesNoSection(title,question,nameSection) {
    form1.getJSXByName("paneBlock").setHeight(form1.getJSXByName("paneBlock").getHeight() + 145).repaint();
    var textSection = form1.getJSXByName("block").load("components/yesnosection.xml",true);
    
    // textSection.setTitleText(title).repaint();
    textSection.setName(nameSection).repaint();
    //alert(textSection.getChild());
    //alert(textSection.getJSXByName("labelKysymys").getText());
    form1.getJSXByName("labelKysymys").setText(question).repaint();
    
}


function inputMultipleChoiceSection(title,question,nameSection) {

   // var id = getTemplateID();
    form1.getJSXByName("paneBlock").setHeight(form1.getJSXByName("paneBlock").getHeight() + 133).repaint();
    var textSection = form1.getJSXByName("block").load("components/multiplechoicesection.xml",true);
    textSection.setName(nameSection).repaint();
    //textSection.setTitleText(title).repaint();
    form1.getJSXByName("labelKysymys").setText(question).repaint();
    var block = "choiceBlock" + nameSection;
    var choiceTextfield = "choiceTextField" + nameSection;
    form1.getJSXByName("choiceBlock").setName(block);
    form1.getJSXByName("choiceTextField").setName(choiceTextfield);
    form1.getJSXByName("tempID").setValue(nameSection);
    
}


function inputCalendarSection(title,question,nameSection) {
    form1.getJSXByName("paneBlock").setHeight(form1.getJSXByName("paneBlock").getHeight() + 200).repaint();
    var textSection = form1.getJSXByName("block").load("components/multiplecalendarsection.xml",true);
    
    // textSection.setTitleText(title).repaint();
    textSection.setName(nameSection).repaint();
    
    var block = "choiceBlock" + nameSection;
    textSection.getDescendantOfName("choiceBlock").setName(block);
    
    //alert(textSection.getChild());
    //alert(textSection.getJSXByName("labelKysymys").getText());
    form1.getJSXByName("labelKysymys").setText(question).repaint();
    
}


function removeThisSection(sectionComponent,type) {
   // alert("removeThisSection(" + sectionComponent + ", " + type + ")");
    var sectionName = sectionComponent.getName();
   // alert("sectionName" + sectionName + ".");
    form1.getJSXByName("block").removeChild(sectionComponent);
  //  alert(form1.getCache().getDocument("TextInput-nomap").selectSingleNode("//record[@jsxid='" + sectionName + "']"));
    form1.getCache().getDocument("TextInput-nomap").removeChild(form1.getCache().getDocument("TextInput-nomap").selectSingleNode("//record[@TextInput_Number='" + sectionName + "']"));
    
    if (type=="textinputsection") {
        form1.getJSXByName("paneBlock").setHeight(form1.getJSXByName("paneBlock").getHeight() - 205).repaint();
    }
    if (type=="yesnoinputsection") {
        form1.getJSXByName("paneBlock").setHeight(form1.getJSXByName("paneBlock").getHeight() - 145).repaint();
    }
    if (type=="multiplechoice") {
        form1.getJSXByName("paneBlock").setHeight(form1.getJSXByName("paneBlock").getHeight() - 133).repaint();
        removeChildrenOfThisMultipleChoiceSection(sectionName);
    }
    
}




function removeChildrenOfThisMultipleChoiceSection(sectionName) {
       var removableChildNodeIds=new Array();
       var removeIndex = 0;
       var childNode;
       var childIterator = form1.getCache().getDocument("MultipleChoice-nomap").getChildIterator();
       var fieldsetNumber;

       while(childIterator.hasNext()){
       
            childNode = childIterator.next();

            fieldsetNumber = childNode.getAttribute("MultipleChoice_Section");
           // alert(fieldsetNumber);
            if (fieldsetNumber==sectionName) {

                    removableChildNodeIds[removeIndex]=childNode.getAttribute("jsxid");
                    removeIndex = removeIndex + 1;

            }
       }
        var index1 = 0;
        for (key in removableChildNodeIds) {
           // alert(index1);
           // alert(removableChildNodeIds[index1]);
            node1 = form1.getCache().getDocument("MultipleChoice-nomap").selectSingleNode("//record[@jsxid='" + removableChildNodeIds[index1] + "']");
           if (node1!=null) {
           // alert(node1);
            form1.getCache().getDocument("MultipleChoice-nomap").removeChild(node1);
            index1 = index1 + 1;
            form1.getJSXByName("block").setHeight(form1.getJSXByName("block").getHeight() - 30).repaint();
            }
        }
}


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
);