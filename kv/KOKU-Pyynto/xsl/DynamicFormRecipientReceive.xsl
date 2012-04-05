<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ka="http://www.arcusys.fi/DynamicFields">
	<xsl:output method="html" />
	<xsl:template match="/">

		<h1 id="Header"></h1>
		<div class="Content1">
			<h1>KÄYTTÄJÄVIESTINTÄ</h1>
		</div>
		<div class="main">

			<h2 class="old">LÄHETTÄJÄ</h2>
			<p>
				<xsl:value-of select="//ka:User_SenderFirstname/text()" /><xsl:text> </xsl:text><xsl:value-of select="//ka:User_SenderLastname/text()" />
			</p>
			<div class="innerContent">
				<h2 class="old">VASTAANOTTAJA</h2>
				<xsl:if test="//ka:User_RecipientRealnames/text() != ' '">
					<p>
					<xsl:value-of select="//ka:User_RecipientRealnames/text()" />
					</p>
				</xsl:if>	
			</div>
			<h2 class="old">
				<p>Uusi pyyntö</p>
			</h2>
			<div class="innerContent">
				<p>
					Sinulle on uusi pyyntö.
					<a href="javascript:void(0)" onclick="KokuMessage.citizen.redirectToRequestsRecieved()">
						<xsl:value-of select="//ka:Header_Text/text()" />
					</a>
				</p>
			</div>
		</div>

	</xsl:template>
</xsl:stylesheet>

