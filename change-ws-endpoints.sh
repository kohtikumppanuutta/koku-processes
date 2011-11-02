#!/bin/bash

export epbase=http://trelx51x:8080


#sed -i'' -e "s,http://localhost:8180,$epbase," hak/KOKU-HAK/Services/KokuHakProcessingServiceImpl.wsdl
sed -i'' -e "s,http://localhost:8180,$epbase," hak/KOKU-HAK/Forms/Paivahoitohakemus_init_Form.gi/js/logic.js
sed -i'' -e "s,http://localhost:8180,$epbase," hak/KOKU-HAK/Forms/Vahvistuspyynto_init_Form.gi/js/logic.js
sed -i'' -e "s,http://localhost:8180,$epbase," hak/KOKU-HAK/Forms/Vahvistuspyynto_Decision_Form.gi/js/logic.js

#sed -i'' -e "s,http://localhost:8180,$epbase," kv/KOKU-MultipleTextMessage/Services/KokuMessageProcessingServiceImpl.wsdl
sed -i'' -e "s,http://localhost:8180,$epbase," kv/KOKU-MultipleTextMessage/Forms/Kayttajaviestinta_init_Form.gi/js/logic.js

#sed -i'' -e "s,http://localhost:8180,$epbase," kv/KOKU-Pyynto/KokuRequestProcessingServiceImpl.wsdl
#sed -i'' -e "s,http://localhost:8180,$epbase," kv/KOKU-Pyynto/UsersAndGroupsServiceImpl.wsdl
sed -i'' -e "s,http://localhost:8180,$epbase," kv/KOKU-Pyynto/form1_1.gi/js/logic.js
sed -i'' -e "s,http://localhost:8180,$epbase," kv/KOKU-Pyynto/Pohjanluontiform.gi/js/logic.js

#sed -i'' -e "s,http://localhost:8180,$epbase," tiva/KOKU-TIVA_Valtakirja/Services/KokuValtakirjaProcessingServiceImpl.wsdl
#sed -i'' -e "s,http://localhost:8180,$epbase," tiva/KOKU-TIVA_Valtakirja/Services/UsersAndGroupsServiceImpl.wsdl
sed -i'' -e "s,http://localhost:8180,$epbase," tiva/KOKU-TIVA_Valtakirja/Forms/Valtakirja_Form.gi/js/logic.js
sed -i'' -e "s,http://localhost:8180,$epbase," tiva/KOKU-TIVA_Valtakirja/Forms/Valtakirja_Edit_Form.gi/js/logic.js
sed -i'' -e "s,http://localhost:8180,$epbase," tiva/KOKU-TIVA_Valtakirja/Forms/Valtakirja_Decision_Form.gi/js/logic.js

#sed -i'' -e "s,http://localhost:8180,$epbase," tiva/KOKU-TIVA_Tietopyynto/Services/KokuTietopyyntoProcessingServiceImpl.wsdl
#sed -i'' -e "s,http://localhost:8180,$epbase," tiva/KOKU-TIVA_Tietopyynto/Services/UsersAndGroupsServiceImpl.wsdl
sed -i'' -e "s,http://localhost:8180,$epbase," tiva/KOKU-TIVA_Tietopyynto/Forms/Tiva_Tietopyynto_init_Form/js/logic.js
sed -i'' -e "s,http://localhost:8180,$epbase," tiva/KOKU-TIVA_Tietopyynto/Forms/Tiva_Tietopyynto_Response_Form/js/logic.js

#sed -i'' -e "s,http://localhost:8180,$epbase," av/KOKU-Ajanvaraus/Services/UsersAndGroupsServiceImpl.wsdl
#sed -i'' -e "s,http://localhost:8180,$epbase," av/KOKU-Ajanvaraus/Services/KokuAppointmentProcessingServiceImpl.wsdl
sed -i'' -e "s,http://localhost:8180,$epbase," av/KOKU-Ajanvaraus/Forms/Ajanvaraus_Init_Form.gi/js/logic.js
sed -i'' -e "s,http://localhost:8180,$epbase," av/KOKU-Ajanvaraus/Forms/Ajanvaraus_receive_Form.gi/js/logic.js

#sed -i'' -e "s,http://localhost:8180,$epbase," tiva/KOKU-TIVA/Services/KokuSuostumusProcessingServiceImpl.wsdl
#sed -i'' -e "s,http://localhost:8180,$epbase," tiva/KOKU-TIVA/Services/UsersAndGroupsServiceImpl.wsdl
sed -i'' -e "s,http://localhost:8180,$epbase," tiva/KOKU-TIVA/Forms/TIVA_Template_Form.gi/js/logic.js
sed -i'' -e "s,http://localhost:8180,$epbase," tiva/KOKU-TIVA/Forms/TIVA_Sending_Form.gi/js/logic.js
sed -i'' -e "s,http://localhost:8180,$epbase," tiva/KOKU-TIVA/Forms/TIVA_Recipient_Form.gi/js/logic.js

#sed -i'' -e "s,http://localhost:8180,$epbase," tiva/KOKU-TIVA3/Services/KokuSuostumusProcessingServiceImpl.wsdl
sed -i'' -e "s,http://localhost:8180,$epbase," tiva/KOKU-TIVA3/Forms/TIVA3InitForm.gi/js/logic.js


sed -i'' -e "s,http://localhost:8180,$epbase," props.endpoint
