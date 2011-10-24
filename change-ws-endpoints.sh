#!/bin/bash

export epbase=http://trelx51x:8080/


sed -i'' -e "s,http://127.0.0.1:8180/,$epbase," av/KOKU-Ajanvaraus/Services/UsersAndGroupsServiceImpl.wsdl

