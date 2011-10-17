/* place JavaScript code here */



function intalioPreStart() {
    
    Vahvistuspyynto_Form.getJSXByName("Tiedot_Sijainti").setValue(Vahvistuspyynto_Form.getJSXByName("Tiedot_Sijainti").getText()).repaint();
}


function uncheckTheOthers(targetName, checkedName)   {
   var descendants = Vahvistuspyynto_Form.getJSXByName(targetName).getDescendantsOfType("jsx3.gui.CheckBox");
   for (x in descendants)   {
      if (descendants[x].getName() != checkedName)
         descendants[x].setChecked(0);
   }
}