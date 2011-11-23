/* place JavaScript code here */


jsx3.lang.Package.definePackage(
  "Intalio.Internal.CustomErrors",
  function(error) {


    error.getError=function(name){
        var errortext = Valtakirja_Form.getJSXByName(name).getTip();
        errortext = "Virheelliset tiedot: " + errortext;
        return errortext;
    };
  }
);


function getEndpoint() {
    
    //var endpoint = "http://localhost:8180";
    var endpoint = "http://trelx51x:8080";
    return endpoint;
    
}


jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetKunpoUsernameByUid= function(uid) {
        
        var tout = 1000;   
        var limit = 100;
        var searchString = "";

        var msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getKunpoNameByUserUid><userUid>" + uid + "</userUid></soa:getKunpoNameByUserUid></soapenv:Body></soapenv:Envelope>";
       
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
           // alert(objXML);
            return objXML;

        }
    };
});


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


//Getting the domain name and port if available
function getUrl() {
    
    var domain = getDomainName();
    return domain + "/palvelut-portlet/ajaxforms/WsProxyServlet2";

}

function getDomainName() {

    var url = window.location.href;
    var url_parts = url.split("/");
    var domain_name = url_parts[0] + "//" + url_parts[2];
       
    return domain_name;

}

function Preload() {
    /*var username = Intalio.Internal.Utilities.getUser();
    username = username.substring((username.indexOf("/")+1));*/
    //alert(username);
    //AjanvarausForm.getJSXByName("User_Sender").setValue(username);
    /*
    AjanvarausForm.getJSXByName("block").setHeight(0,true);
    if (AjanvarausForm.getJSXByName("Lomake_Status").getValue() == "New")    {
        AjanvarausForm.getJSXByName("Lomake_Hylkaa-field").setDisplay("none",true);
        AjanvarausForm.getJSXByName("Lomake_Hylkaa-label").setDisplay("none",true);
    }
    if (gup("FormID")) 
        var id = gup("FormID");
        AjanvarausForm.getJSXByName("Lomake_ID").setValue(id);
       */
        try {
            var id = form1.getJSXByName("User_Sender").getValue();
            // Add form preload functions here.
            var formData = Arcusys.Internal.Communication.GetTemplateNames(id);
            //Arcusys.Internal.Communication.GerLDAPUser();
            
            if(formData != null) {
                mapTemplateNamesToField(formData);
            }
        } catch (e) {
            alert(e);
        }
    
}

//Package FormPreFill
jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetTemplateNames= function(userUid) {
        
        var tout = 1000;   
        var limit = 20;

        var msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.kv.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getRequestTemplateSummary><user>" + userUid + "</user><subjectPrefix></subjectPrefix><limit>" + limit + "</limit></soa:getRequestTemplateSummary></soapenv:Body></soapenv:Envelope>";
      
       

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

//Package FormPreFill
jsx3.lang.Package.definePackage("Arcusys.Internal.Communication", function(arc) {
    arc.GetTemplate= function(id) {
        
        var tout = 1000;   
       // var limit = 100;

        var msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.kv.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getRequestTemplateById><requestTemplateId>" + id + "</requestTemplateId></soa:getRequestTemplateById></soapenv:Body></soapenv:Envelope>";
      
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

        var msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:getUserUidByLooraName><looraUsername>" + username + "</looraUsername></soa:getUserUidByLooraName></soapenv:Body></soapenv:Envelope>";
       
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

function getTemplate(templateId) {

        try {
            // Add form preload functions here.
            var formData = Arcusys.Internal.Communication.GetTemplate(templateId);
           // alert(formData);
            //Arcusys.Internal.Communication.GerLDAPUser();
            
            if(formData != null) {
                createFormFromTemplateData(formData);
                form1.getJSXByName("RequestProcessing_RequestID").setValue(templateId).repaint();
               // mapTemplateNamesToField(formData);
                
                form1.getJSXByName("Pohja").setDisplay("none").repaint();
            }
        } catch (e) {
            alert(e);
        }


}


function inputMultipleChoiceQuestion (tempID,question,questionNumber) {
    //alert("addChoice, parameter: " + tempID);
  // var id = getID();
  // alert("id: " + id);
   var block = "choiceBlock" + tempID;
   var choiceTextField = "choiceTextField" + tempID;
   var id = tempID + "_" + questionNumber;
   
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
   label.setText(question,true);
   
   idField.setValue(id);
   
   form1.getJSXByName("choicePane" + id).getChild("choiceUniversalID").setValue(form1.getJSXByName("multipleChoiceCounter").getValue());
   
   mapMultipleChoiceToMatrix(form1.getJSXByName("multipleChoiceCounter").getValue(),tempID,question,questionNumber);
 //  mapMultipleChoiceToMatrix(form1.getJSXByName("multipleChoiceCounter").getValue(),tempID,question,form1.getJSXByName(tempID).getChild("choiceCounter").getValue());
   form1.getJSXByName("multipleChoiceCounter").setValue(parseInt(form1.getJSXByName("multipleChoiceCounter").getValue()) + 1);
   form1.getJSXByName(tempID).getChild("choiceCounter").setValue(parseInt(form1.getJSXByName(tempID).getChild("choiceCounter").getValue()) + 1);
}


function inputSectionFromTemplate(question,sectionNumber,inputType) {
   // alert(inputType);
    var title = "";
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
}


function createFormFromTemplateData(data) {
    form1.getJSXByName("header").setDisplay("block").repaint();
    form1.getJSXByName("paneBlock").setDisplay("block").repaint();
    form1.getJSXByName("User").setDisplay("block").repaint();

    var headerText = data.selectSingleNode("//subject", "xmlns:ns2='http://soa.kv.koku.arcusys.fi/'").getValue();
    form1.getJSXByName("Header_Text").setValue(headerText).repaint();
    form1.getJSXByName("formHeaderLabel").setText(headerText).repaint();

    var questions = data.selectNodeIterator("//questions", "xmlns:ns2='http://soa.kv.koku.arcusys.fi/'");
    var questionDescription, questionNumber, questionType;
    var childNode, childNode1;
    var childIte;
    var i = 0;
    
    while(questions.hasNext()) {
    
        childNode = questions.next();
       // alert(childNode);
        childIte = childNode.getChildIterator();
        
        while(childIte.hasNext()) {
    
            childNode1 = childIte.next();
           // alert(childNode1);
            if (i==0) {
                questionDescription = childNode1.getValue();
            }
            if (i==1) {
                questionNumber = childNode1.getValue();
            }
            if (i==2) {
                questionType = childNode1.getValue();
            }
           // alert(childNode1.getValue());
            i = i + 1;
        
        }
       // alert(questionDescription + " " + questionNumber + " " + questionType);
        inputSectionFromTemplate(questionDescription,questionNumber,questionType);
        i = 0;
        
    }


    var descendants = data.selectNodeIterator("//choices", "xmlns:ns2='http://soa.kv.koku.arcusys.fi/'");
    
    
    var choiceDescription, choiceNumber, choiceQuestionNumber;
    
    while(descendants.hasNext()) {
    
        childNode = descendants.next();
        
       // alert(childNode);
        
        childIte = childNode.getChildIterator();
        
        while(childIte.hasNext()) {
    
            childNode1 = childIte.next();
           // alert(childNode1);
            if (i==0) {
                choiceDescription = childNode1.getValue();
            }
            if (i==1) {
                choiceNumber = childNode1.getValue();
            }
            if (i==2) {
                choiceQuestionNumber = childNode1.getValue();
            }
           // alert(childNode1.getValue());
          

            i = i + 1;
        
        }
        // alert(choiceQuestionNumber + " " + choiceDescription + " " + choiceNumber);
        inputMultipleChoiceQuestion(choiceQuestionNumber,choiceDescription,choiceNumber);
        i = 0;
        
    }
    
    
    showForm(form1.getJSXByName("showFormFlag").getValue());
    
}


function mapTemplateNamesToField(data) {
    
    var descendants = data.selectNodeIterator("//return", "xmlns:ns2='http://soa.kv.koku.arcusys.fi/'");
   // alert(descendants);
    var subject, requestTemplateId; 
    var xmlForSelectBox = "<data>";
    
    while(descendants.hasNext()) {
    
        childNode = descendants.next();
       // alert(childNode);
       // requestTemplateId = childNode.getAttributeNode("return");
       requestTemplateId = childNode.getFirstChild().getValue();
      // requestTemplateId = childNode.selectSingleNode("//requestTemplateId").getValue();
       // alert(requestTemplateId);
       // subject = childNode.selectSingleNode("//subject").getValue();
        subject = childNode.getLastChild().getValue();
        xmlForSelectBox = xmlForSelectBox + "<record jsxid=\"" + requestTemplateId + "\" jsxtext=\"" + subject + "\"/>";
        
       // alert(requestTemplateId + subject);
        requestTemplateId = "";
        subject = "";
        childNode = null;
    }
    xmlForSelectBox = xmlForSelectBox + "</data>";
   // alert(xmlForSelectBox);
    /*
    for (x in descendants)   {
      alert(descendants[x]);
    }
    */
    
   // data.selectNodes("//tns:getRequestTemplateSummaryResponse", "xmlns:tns='http://soa.kv.koku.arcusys.fi/'");
   // alert("mapTemplateNamesToField" + data);
    /*
       var childIterator = data.selectSingleNode("//getRequestTemplateSummaryResponse", "xmlns:ns2='http://soa.kv.koku.arcusys.fi/'">).getChildIterator();

       while(childIterator.hasNext()){
       
            childNode = childIterator.next();
            alert(childNode);
       }
    */
   // var values = "";
    form1.getJSXByName("PohjanValinta").setXMLString(xmlForSelectBox);
    form1.getJSXByName("PohjanValinta").resetXmlCacheData();
    form1.getJSXByName("PohjanValinta").repaint();
}


function mapFormDataToFields(objXML) {

    var value = objXML.selectNodes("//tns:return", "xmlns:tns='http://soa.kv.koku.arcusys.fi/'");
   // alert(value);

    //var approvedSlotNumber = "";
   // var sender = objXML.selectSingleNode("//sender", "xmlns:ns2='http://soa.kv.koku.arcusys.fi/'").getValue();
    //var replier = objXML.selectSingleNode("//replier", "xmlns:ns2='http://soa.kv.koku.arcusys.fi/'").getValue();
   // var subject = objXML.selectSingleNode("//subject", "xmlns:ns2='http://soa.kv.koku.arcusys.fi/'").getValue();
   // var description = objXML.selectSingleNode("//description", "xmlns:ns2='http://soa.kv.koku.arcusys.fi/'").getValue();
    /*
    var statusNodes = objXML.selectNodes("//status", "xmlns:ns2='http://soa.kv.koku.arcusys.fi/'");
    var formStatus = statusNodes.get(1);
    formStatus = formStatus.getValue();*/
    /*
    if (objXML.selectSingleNode("//approvedSlotNumber", "xmlns:ns2='http://soa.kv.koku.arcusys.fi/'"))
       approvedSlotNumber = objXML.selectSingleNode("//approvedSlotNumber", "xmlns:ns2='http://soa.kv.koku.arcusys.fi/'").getValue();*/
   // var appointmentId = objXML.selectSingleNode("//appointmentId", "xmlns:ns2='http://soa.kv.koku.arcusys.fi/'").getValue();
    
   // inputPreload(objXML);
    
   // var username = Intalio.Internal.Utilities.getUser();     
   // username = username.substring((username.indexOf("/")+1));
   // AjanvarausForm.getJSXByName("User_Recipient").setValue(username);

    // Map values to the form fields
    
    //alert("Replier: " + replier);
   // AjanvarausForm.getJSXByName("User_Sender").setValue(sender).repaint();
    //AjanvarausForm.getJSXByName("User_Recipient").setValue(replier).repaint();
   // AjanvarausForm.getJSXByName("Header_Text").setValue(subject).repaint();
   // AjanvarausForm.getJSXByName("Lomake_ID").setValue(appointmentId).repaint();
    /*
    AjanvarausForm.getJSXByName("Lomake_Status").setValue(formStatus).repaint();
    if (formStatus == "Approved")    {
        lockForm();
    }*/
    /*if (approvedSlotNumber)
       AjanvarausForm.getJSXByName("Lomake_Hyvaksytty_Aika").setValue(approvedSlotNumber).repaint();*/
}



function useTemplate() { 
    form1.getJSXByName("showFormFlag").setValue("Y").repaint();

    form1.getJSXByName("Lomaketyyppi").setDisplay("none").repaint();
    form1.getJSXByName("headerEdit").setDisplay("none").repaint();
    form1.getJSXByName("Pohja").setDisplay("block").repaint();
    form1.getJSXByName("Kentat").setDisplay("none").repaint();
}

function dontUseTemplate() {
    form1.getJSXByName("showFormFlag").setValue("Y").repaint();

    form1.getJSXByName("Lomaketyyppi").setDisplay("none").repaint();
    form1.getJSXByName("headerEdit").setDisplay("block").repaint();
    form1.getJSXByName("Pohja").setDisplay("none").repaint();
    form1.getJSXByName("Kentat").setDisplay("block").repaint();
    
    form1.getJSXByName("header").setDisplay("block").repaint();
    form1.getJSXByName("User").setDisplay("block").repaint();
    form1.getJSXByName("paneBlock").setDisplay("block").repaint();
}




function uncheckTheOthers(target, checked) {
    //alert(target + " " + checked);
    var i, descendants = form1.getJSXByName(target).getDescendantsOfType("jsx3.gui.CheckBox");
    //alert(descendants);
    for (i = 0; i < descendants.length; i++)   {
        //alert(descendants[i]);
        if (descendants[i].getName() != checked) {
            //alert(descendants[i]);
            descendants[i].setChecked(0);
        }
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
    form1.getJSXByName("User_SenderDisplay").setValue(username);
    form1.getJSXByName("User_SenderDisplay").setEnabled(jsx3.gui.Form.STATEDISABLED).repaint();
    
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


function showForm(flag) {
  //  alert("showForm param: " + flag);
    var descendant, descendants;
    if (flag=="N") {
   // alert("N");
   // if (form1.getJSXByName("Kentat").getDisplay()=="none") 
        form1.getJSXByName("showFormButton").setText("N\xE4yt\xE4 lomake").repaint();
        form1.getJSXByName("Kentat").setDisplay("block").repaint();
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
                       //alert(descendant.getHeight());
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
       form1.getJSXByName("showFormFlag").setValue("Y").repaint();
    }
    else {
        form1.getJSXByName("showFormButton").setText("N\xE4yt\xE4 muokkausn\xE4kym\xE4").repaint();
        form1.getJSXByName("Kentat").setDisplay("none").repaint();
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
       form1.getJSXByName("showFormFlag").setValue("N").repaint();
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
       // alert("CALENDAR");
        mapFieldsToMatrix(title,question,sectionNumber,inputType);
        inputCalendarSection(title,question,sectionNumber);
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
    form1.getJSXByName("paneBlock").setHeight(form1.getJSXByName("paneBlock").getHeight() + 143).repaint();
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



// RECEIPIENTCOMPONENT-SCRIPT


function mapSelectedRecipientsToMatrix() {

    var node, hasEmptyChild, jsxid, childIterator, group, uid, receipientName, groupUid, childNode, xmlData, list, userData, i, attributeDisplayName, userDataDisplayName, displayName, kunpoUsername;

    hasEmptyChild = false;
    jsxid = 0;

    childIterator = form1.getCache().getDocument("receipientsToShow-nomap").getChildIterator();

    if (form1.getCache().getDocument("Receipients-nomapNew").getFirstChild() == null) {
        form1.getJSXByName("Receipients").commitAutoRowSession();
        hasEmptyChild = true;
    }
    while (childIterator.hasNext()) {

        childNode = childIterator.next();

        group = childNode.getAttribute("group");

        if (group != 0) {

            groupUid = childNode.getAttribute("uid");

            xmlData = Arcusys.Internal.Communication.GetGroupUsers(groupUid);

            list = ["uid"];
            userData = parseXML(xmlData, "user", list);
            
            //attributeDisplayName = ["displayName"];
            //userDataDisplayName = parseXML(xmlData, "user", attributeDisplayName);
            

            
            
            
            
           // alert(userData);
            for (i = 0; i < userData.length; i++) {
                uid = userData[i];
                //displayName = userDataDisplayName[i];
                
                try {
        
                    // Add form preload functions here.
                    kunpoUsername = Arcusys.Internal.Communication.GetKunpoUsernameByUid(uid);
                    //Arcusys.Internal.Communication.GerLDAPUser();
                    
                    if(kunpoUsername != null) {
                        displayName = kunpoUsername.selectSingleNode("//kunpoUsername", "xmlns:ns2='http://soa.common.koku.arcusys.fi/'").getValue();
                    }
                } catch (e) {
                    alert(e);
                }

                node = form1.getCache().getDocument("Receipients-nomapNew").getFirstChild().cloneNode();
                node.setAttribute("jsxid", jsxid);
                node.setAttribute("Receipients_ReceipientUid", uid);
                node.setAttribute("Receipients_Receipient", displayName);
               // alert(node);
                form1.getCache().getDocument("Receipients-nomapNew").insertBefore(node);
                jsxid++;

            }
        } else {
            uid = childNode.getAttribute("uid");
            receipientName = childNode.getAttribute("receipient");
            node = form1.getCache().getDocument("Receipients-nomapNew").getFirstChild().cloneNode();

            node.setAttribute("jsxid", jsxid);
            node.setAttribute("Receipients_ReceipientUid", uid);
            node.setAttribute("Receipients_Receipient", receipientName);
            form1.getCache().getDocument("Receipients-nomapNew").insertBefore(node);
            jsxid++;
           // alert(node);
        }

    }

    if (hasEmptyChild == true) {
        form1.getCache().getDocument("Receipients-nomapNew").removeChild(form1.getCache().getDocument("Receipients-nomapNew").getFirstChild());
    }
}


function intalioPreStart() {

    mapSelectedRecipientsToMatrix();
   // alert(form1.getJSXByName("User_AnswerUntil").getValue());
}

function switchSearchMode(mode) {

    if (mode == "groups") {
        form1.getJSXByName("Haku_Kayttajat").setDisplay("none").repaint();
        form1.getJSXByName("Haku_Ryhmat").setDisplay("block").repaint();

        form1.getJSXByName("HaeKayttajia_Checkbox1").setChecked(0).repaint();
        form1.getJSXByName("HaeRyhmia_Checkbox1").setChecked(1).repaint();
        form1.getJSXByName("HaeKayttajia_Checkbox2").setChecked(0).repaint();
        form1.getJSXByName("HaeRyhmia_Checkbox2").setChecked(1).repaint();

    }

    if (mode == "users") {
        form1.getJSXByName("Haku_Kayttajat").setDisplay("block").repaint();
        form1.getJSXByName("Haku_Ryhmat").setDisplay("none").repaint();

        form1.getJSXByName("HaeKayttajia_Checkbox1").setChecked(1).repaint();
        form1.getJSXByName("HaeRyhmia_Checkbox1").setChecked(0).repaint();
        form1.getJSXByName("HaeKayttajia_Checkbox2").setChecked(1).repaint();
        form1.getJSXByName("HaeRyhmia_Checkbox2").setChecked(0).repaint();
    }

}


function searchGroup(searchString) {

    var entryFound, node, i, hasEmptyChild, splits, list, xmlData, groupData;

    if (searchString == "") {
        alert("Syota hakusana");
        return;
    }

    searchString = searchString.toLowerCase();
    entryFound = false;

    if (form1.getCache().getDocument("HaetutRyhmat-nomap").getFirstChild() != null) {
        form1.getCache().getDocument("HaetutRyhmat-nomap").removeChildren();
        form1.getJSXByName("searchGroupMatrix").repaintData();

    }

    hasEmptyChild = false;

    xmlData = Arcusys.Internal.Communication.GetGroups(searchString);

    list = ["groupName", "groupUid"];
    groupData = parseXML(xmlData, "group", list);

    if (form1.getCache().getDocument("HaetutRyhmat-nomap").getFirstChild() == null) {
        form1.getJSXByName("searchGroupMatrix").commitAutoRowSession();
        hasEmptyChild = true;

    }

    for (i = 0; i < groupData.length; i++) {

        splits = groupData[i].split(",");

        entryFound = true;

        node = form1.getCache().getDocument("HaetutRyhmat-nomap").getFirstChild().cloneNode();

        node.setAttribute("jsxid", i);
        node.setAttribute("nimi", splits[0]);
        node.setAttribute("uid", splits[1]);

        form1.getCache().getDocument("HaetutRyhmat-nomap").insertBefore(node);

    }

    if (hasEmptyChild == true) {
        form1.getCache().getDocument("HaetutRyhmat-nomap").removeChild(form1.getCache().getDocument("HaetutRyhmat-nomap").getFirstChild());
    }
    form1.getJSXByName("searchGroupMatrix").repaintData();

    if (entryFound == false) {
        alert ("Valitettavasti antamallasi hakusanalla ei l\xF6ytynyt tuloksia");
    }
}

function listGroupUsers() {

    var node, i, hasEmptyChild, childIterator, childNode, selected, groupUid, personInfo, xmlData, list, userData;

    if (form1.getCache().getDocument("GroupUserList-nomap").getFirstChild() != null) {
        form1.getCache().getDocument("GroupUserList-nomap").removeChildren();
        form1.getJSXByName("listGroupUsersMatrix").repaintData();
    }

    hasEmptyChild = false;

    if (form1.getCache().getDocument("GroupUserList-nomap").getFirstChild() == null) {
        form1.getJSXByName("listGroupUsersMatrix").commitAutoRowSession();
        hasEmptyChild = true;

    }

    childIterator = form1.getCache().getDocument("HaetutRyhmat-nomap").getChildIterator();

    while (childIterator.hasNext()) {
        //node = form1.getCache().getDocument("Receipients-nomapNew").getFirstChild().cloneNode();

        childNode = childIterator.next();
        selected = childNode.getAttribute("valittu");

        if ((selected != 0) && (selected != null)) {
            groupUid = childNode.getAttribute("uid");

            xmlData = Arcusys.Internal.Communication.GetGroupUsers(groupUid);

            list = ["firstname", "lastname", "phoneNumber", "email"];
            userData = parseXML(xmlData, "user", list);

            for (i = 0; i < userData.length; i++) {
                personInfo = userData[i].split(',');

                node = form1.getCache().getDocument("GroupUserList-nomap").getFirstChild().cloneNode();

                node.setAttribute("jsxid", i);
                node.setAttribute("etunimi", personInfo[0]);
                node.setAttribute("sukunimi", personInfo[1]);
                node.setAttribute("puhelin", personInfo[2]);
                node.setAttribute("sahkoposti", personInfo[3]);
                node.setAttribute("valittu", 0);
                form1.getCache().getDocument("GroupUserList-nomap").insertBefore(node);

            }
        }

    }

    if (hasEmptyChild == true) {
        form1.getCache().getDocument("GroupUserList-nomap").removeChild(form1.getCache().getDocument("GroupUserList-nomap").getFirstChild());
    }
    form1.getJSXByName("listGroupUsersMatrix").repaintData();

}

function searchNames(searchString) {
    var node, hasEmptyChild, entryFound, userData, i, xmlData, personInfo, list;
    entryFound = false;
    hasEmptyChild = false;

    if (searchString == "") {
        alert("Syota hakusana");
        return;
    }

    searchString = searchString.toLowerCase();
    if (form1.getCache().getDocument("HaetutVastaanottajat-nomap").getFirstChild() != null) {
        form1.getCache().getDocument("HaetutVastaanottajat-nomap").removeChildren();
        form1.getJSXByName("searchMatrix").repaintData();

    }

    if (form1.getCache().getDocument("HaetutVastaanottajat-nomap").getFirstChild() == null) {
        form1.getJSXByName("searchMatrix").commitAutoRowSession();
        hasEmptyChild = true;

    }


    xmlData = Arcusys.Internal.Communication.GetChildrens(searchString);

    list = ["firstname", "lastname", "uid"];
    userData = parseXML(xmlData, "child", list);
      
    // No users found...
    if ((userData == " ") || (userData == null) || (userData == "")) {
        alert ("Valitettavasti antamallasi hakusanalla ei l\xF6ytynyt tuloksia");
        if (hasEmptyChild == true) {
            form1.getCache().getDocument("HaetutVastaanottajat-nomap").removeChild(form1.getCache().getDocument("HaetutVastaanottajat-nomap").getFirstChild());
        }

        return;
    }

    // Multiple nodes found with same ssn 
    if (userData.lenght > 1) {
        alert("Hakemallasi henkilotunnukselle loytyi usea esiintyma");
        if (hasEmptyChild == true) {
            form1.getCache().getDocument("HaetutVastaanottajat-nomap").removeChild(form1.getCache().getDocument("HaetutVastaanottajat-nomap").getFirstChild());
        }
        return;    
    }
    
    parentsData = parseXML(xmlData, "parents", list);
    
    // No quardians found for the child...
    if (((userData != " " || userData != null)) && ((parentsData == " ") || (parentsData == null))) {
        alert("Hakemallesi lapselle ei loytynyt jarjestelmaan merkattuja vanhempia");
        if (hasEmptyChild == true) {
            form1.getCache().getDocument("HaetutVastaanottajat-nomap").removeChild(form1.getCache().getDocument("HaetutVastaanottajat-nomap").getFirstChild());
        }
        return;
    }
       

    personInfo = userData[0].split(',');
   
    entryFound = true;
    node = form1.getCache().getDocument("HaetutVastaanottajat-nomap").getFirstChild().cloneNode();
    
    node.setAttribute("jsxid", 1);
    node.setAttribute("etunimi", personInfo[0]);
    node.setAttribute("sukunimi", personInfo[1]);
    node.setAttribute("childUid", personInfo[2]);

    //Listataan lapsen vanhemmat
    parentList = "";
    parentUidList = "";
    
    for (i = 0; i < parentsData.length; i++) {
        parentsInfo = parentsData[i].split(',');
        parentList += (parentsInfo[0] + " " + parentsInfo[1]);
        parentUidList += parentsInfo[2];
       

        if ((parentsData.length > 1) && (i < (parentsData.length -1))) {
            parentUidList += ",";
            parentList += ", ";
        }

    }
   
    node.setAttribute("huoltajat",parentList);
    node.setAttribute("parentsUid",parentUidList);

    form1.getCache().getDocument("HaetutVastaanottajat-nomap").insertBefore(node);

    if (hasEmptyChild == true) {
        form1.getCache().getDocument("HaetutVastaanottajat-nomap").removeChild(form1.getCache().getDocument("HaetutVastaanottajat-nomap").getFirstChild());
    }

    form1.getJSXByName("searchMatrix").repaintData();
   
}

function addToRecipients() {
    var counter, node, i, hasEmptyChild, chosen, childIterator, uid, firstname, lastname, childNode;

    counter = form1.getJSXByName("recipientCounter").getValue();
    i = 0;
    hasEmptyChild = false;

    childIterator = form1.getCache().getDocument("HaetutVastaanottajat-nomap").getChildIterator();
    if (form1.getCache().getDocument("receipientsToShow-nomap").getFirstChild() == null) {
        form1.getJSXByName("dummyMatrix").commitAutoRowSession();
        hasEmptyChild = true;
    }

    while (childIterator.hasNext()) {

        childNode = childIterator.next();
  
              
            uidlist = childNode.getAttribute("parentsUid");
            parents = childNode.getAttribute("huoltajat");
                        
            uidlist = uidlist.split(',');
            parents = parents.split(',');
            
            for(i = 0; i < uidlist.length; i++) {
                          
                node = form1.getCache().getDocument("receipientsToShow-nomap").getFirstChild().cloneNode();
                node.setAttribute("jsxid", counter);
                node.setAttribute("receipient", parents[i]);
                node.setAttribute("uid", uidlist[i]);
                node.setAttribute("group", 0);
                form1.getCache().getDocument("receipientsToShow-nomap").insertBefore(node);
                counter++;
      
        }

    }
    if (hasEmptyChild == true) {
        form1.getCache().getDocument("receipientsToShow-nomap").removeChild(form1.getCache().getDocument("receipientsToShow-nomap").getFirstChild());
    }
    form1.getJSXByName("dummyMatrix").repaintData();
    form1.getJSXByName("recipientCounter").setValue(counter);

}

function addGroupsToRecipients() {
    var counter, node, hasEmptyChild, valittu, childIterator, groupUid, childNode, groupname;
    counter = form1.getJSXByName("recipientCounter").getValue();
    hasEmptyChild = false;

    childIterator = form1.getCache().getDocument("HaetutRyhmat-nomap").getChildIterator();
    if (form1.getCache().getDocument("receipientsToShow-nomap").getFirstChild() == null) {
        form1.getJSXByName("dummyMatrix").commitAutoRowSession();
        hasEmptyChild = true;
    }

    while (childIterator.hasNext()) {
        childNode = childIterator.next();

        valittu = childNode.getAttribute("valittu");
        groupUid = childNode.getAttribute("uid");

        if ((valittu != null) && (valittu != 0)) {

            node = form1.getCache().getDocument("receipientsToShow-nomap").getFirstChild().cloneNode();

            groupname = childNode.getAttribute("nimi");
            node.setAttribute("jsxid", counter);
            node.setAttribute("receipient", groupname);
            node.setAttribute("uid", groupUid);
            node.setAttribute("group", 1);
            form1.getCache().getDocument("receipientsToShow-nomap").insertBefore(node);
            counter++;

        }

    }
    if (hasEmptyChild == true) {
        form1.getCache().getDocument("receipientsToShow-nomap").removeChild(form1.getCache().getDocument("receipientsToShow-nomap").getFirstChild());
    }

    form1.getJSXByName("dummyMatrix").repaintData();
    form1.getJSXByName("recipientCounter").setValue(counter);

}
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
    arc.GetUsers = function(searchString) {
        var tout, msg, endpoint, url, req, objXML, limit;

        tout = 1000;
        limit = 100;

        msg = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soa=\"http://soa.common.koku.arcusys.fi/\"><soapenv:Header/><soapenv:Body><soa:searchUsers><searchString>" + searchString + "</searchString><limit>" + limit + "</limit></soa:searchUsers></soapenv:Body></soapenv:Envelope>";

        var url = getUrl();

        endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";

        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);

        req = new jsx3.net.Request();

        req.open('POST', url, false);

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send(msg, tout);
        objXML = req.getResponseXML();

        if (objXML == null) {
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

        var url = getUrl();

        endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";

        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);

        req = new jsx3.net.Request();

        req.open('POST', url, false);

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send(msg, tout);
        objXML = req.getResponseXML();

        if (objXML == null) {
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

        var url = getUrl();

        endpoint = getEndpoint() + "/arcusys-koku-0.1-SNAPSHOT-arcusys-common-0.1-SNAPSHOT/UsersAndGroupsServiceImpl";

        msg = "message=" + encodeURIComponent(msg) + "&endpoint=" + encodeURIComponent(endpoint);

        req = new jsx3.net.Request();

        req.open('POST', url, false);

        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send(msg, tout);
        objXML = req.getResponseXML();

        if (objXML == null) {
            alert("Virhe palvelinyhteydess\xE4");
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

    var i, j, attributes, node, childNode, childs, retval;
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
    retval = valuesToArray(attributes);
    if (checkArrayByGivenAttributes(retval, childlist))
        return retval;
    else
        alert("Haetulla kayttajalla on jarjestelmassa puuttuvia tietoja"); 
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
function checkArrayByGivenAttributes(arrayToCheck, attributeList){
    var nodeCount, i, split;
    
    nodeCount = attributeList.length;
    
    for(i = 0; i < arrayToCheck.length; i++) {
        split = arrayToCheck[i].split(',');
        if (nodeCount != split.length) {
            
            return false;
        }
    
    }
    return true;    
}