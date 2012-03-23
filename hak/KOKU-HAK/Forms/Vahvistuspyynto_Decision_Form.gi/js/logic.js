/* place JavaScript code here */



function intalioPreStart() {
    
    Vahvistuspyynto_Form.getJSXByName("Tiedot_Sijainti").setValue(Vahvistuspyynto_Form.getJSXByName("Tiedot_Sijainti").getText()).repaint();
    throughTextfields();
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
    descendants = Vahvistuspyynto_Form.getJSXByName("root").getDescendantsOfType("jsx3.gui.TextBox");
    
    for( i = 0; i < descendants.length; i++) {
        value = Vahvistuspyynto_Form.getJSXByName(descendants[i].getName()).getValue();
        temp = escapeHTML(value);
        Vahvistuspyynto_Form.getJSXByName(descendants[i].getName()).setValue(temp);
        Vahvistuspyynto_Form.getJSXByName(descendants[i].getName()).repaint();
    }
}


function uncheckTheOthers(targetName, checkedName)   {
   var descendants = Vahvistuspyynto_Form.getJSXByName(targetName).getDescendantsOfType("jsx3.gui.CheckBox");
   for (x in descendants)   {
      if (descendants[x].getName() != checkedName)
         descendants[x].setChecked(0);
   }
}