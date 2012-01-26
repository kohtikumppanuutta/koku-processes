function testAlert() {
   // alert("test");
    createFields();
}


function createFields() {
       //alert(form1.getCache());
       var childNode, childId, question, section;
       var childIterator = form1.getCache().getDocument("TextInput-nomap").getChildIterator();

       while(childIterator.hasNext()){
       
            childNode = childIterator.next();
            //alert(childNode);
            //childId = childNode.getAttribute("jsxid");
            // alert(childId);
            
            question = childNode.getAttribute("TextInput_Question");
           // alert(question);
            
            section = childNode.getAttribute("TextInput_Answer");
            
            answer = childNode.getAttribute("TextInput_AnswerText");
            if (question!="" && section!="") {
           inputSection(section,question,answer);
            }

       }
}



function mapFieldsToMatrix(title,question) {
    var node;
    node = form1.getCache().getDocument("TextInput-nomap").getFirstChild().cloneNode();
    alert(node);
    node.setAttribute("TextInput_Question",question);
    node.setAttribute("TextInput_Answer",title);
    form1.getCache().getDocument("TextInput-nomap").insertBefore(node);
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
    if (form1.getJSXByName("vastausVapaa").getChecked()) {
        input = "vapaaTeksti";
    }
    if (form1.getJSXByName("vastausKyllaEi").getChecked()) {
        input = "kyllaEi";
    }
    if (form1.getJSXByName("vastausVapaatVaihtoehdot").getChecked()) {
        input = "vapaatVaihtoehdot";
    }
    return input;
}

function inputSection(title,question) {

        inputTextSection(title,question,answer);

}

function inputTextSection(title,question,answer) {
    form1.getJSXByName("block").setHeight(form1.getJSXByName("block").getHeight() + 300).repaint();
    var textSection = form1.getJSXByName("block").load("components/textinputsection.xml",true);
    textSection.setDisplay("block").repaint();
    textSection.setTitleText(title).repaint();
    form1.getJSXByName("button").setDisplay("none").repaint();
    //alert(textSection.getChild());
    //alert(textSection.getJSXByName("labelKysymys").getText());
    form1.getJSXByName("labelKysymys").setText(question).repaint();
    form1.getJSXByName("textbox").setValue(answer);
    form1.getJSXByName("textbox").setEnabled(jsx3.gui.Form.STATEDISABLED).repaint();
}

function inputYesNoSection(title,question) {
    
    var textSection = form1.getJSXByName("block").load("components/yesnosection.xml",true);
    
    textSection.setTitleText(title).repaint();
    //alert(textSection.getChild());
    //alert(textSection.getJSXByName("labelKysymys").getText());
    form1.getJSXByName("labelKysymys").setText(question).repaint();
    
}

function inputMultipleChoiceSection(title,question) {
    
    var textSection = form1.getJSXByName("root").load("components/multiplechoicesection.xml",true);
    
    textSection.setTitleText(title).repaint();
    //alert(textSection.getChild());
    //alert(textSection.getJSXByName("labelKysymys").getText());
    form1.getJSXByName("labelKysymys").setText(question).repaint();
    
}

function removeThisSection(section) {
    form1.getJSXByName("block").removeChild(section);
}
