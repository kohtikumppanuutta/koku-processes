<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:ka="http://soa.kv.koku.arcusys.fi/">
	<xsl:output method="xml" indent="yes" />
	
	<xsl:param name="Vastaanottaja" />
	
	<xsl:template match="/">
		<xsl:element name="sendMessage">
			<xsl:element name="fromUser">
				<xsl:value-of select="//ka:Message_FromUser/text()"/>
			</xsl:element>
			<xsl:element name="subject">
				<xsl:value-of select="//ka:Message_Subject/text()"/>
			</xsl:element>
			<xsl:element name="receipients">
					<xsl:element name="receipient">
						<xsl:value-of select="$Vastaanottaja"/>
					</xsl:element>
	 		</xsl:element>
	 		<xsl:element name="messageContent">
				<xsl:value-of select="//ka:Message_Content/text()"/>
			</xsl:element>
		</xsl:element>
	</xsl:template>
</xsl:stylesheet>
