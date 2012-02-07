<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:ka="http://www.arcusys.fi/DynamicFields">
	<xsl:output method="html" />
	<xsl:template match="/">

				<h1 id="Header"></h1>
				<div class="Content1">
					<h1>KÄYTTÄJÄVIESTINTÄ</h1>
				</div>
				<div class="main">

					<h2 class="old">LÄHETTÄJÄ</h2>
					<p><xsl:value-of select="//ka:User_SenderDisplay/text()"/></p>
					<div class="innerContent">
					<h2 class="old">VASTAANOTTAJA</h2>
							<p><xsl:value-of select="//ka:User_RecipientDisplay/text()"/></p>
					</div>
						<h2 class="old"><p>Uusi pyyntö</p></h2>
						<div class="innerContent">
					<!-- 
					<xsl:for-each select="//ka:TextInput">
						
							<p><xsl:value-of select="ka:TextInput_Question/text()"/></p>
					</xsl:for-each> -->
					<p>Sinulle on uusi pyyntö. <a href="javascript:void(0)" onclick="KokuMessage.citizen.redirectToRequestsRecieved()"><xsl:value-of select="//ka:Header_Text/text()"/></a> </p>
					</div>
				</div>
			
</xsl:template>
</xsl:stylesheet>

