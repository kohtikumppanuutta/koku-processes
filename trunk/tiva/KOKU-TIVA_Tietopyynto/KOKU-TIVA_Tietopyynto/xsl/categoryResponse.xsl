<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:ka="http://www.arcusys.fi/Tiva_Tietopyynto">
	<xsl:output method="xml" indent="yes" />
 	<xsl:template match="/">
		<xsl:element name="tietoPynnonVastaus">
			<xsl:element name="additionalInfo">
				<xsl:value-of select="//ka:Vastaus_Lisatieto/text()"/>
			</xsl:element>
					
			<xsl:for-each select="//ka:Havannointitiedot">
				<xsl:choose>
				
				<xsl:when test="ka:Havannointitiedot_Valitut/text() !=''">
							
					<xsl:element name="categoryIds">
						<xsl:value-of select="ka:Havannointitiedot_Valitut/text()"/>
					</xsl:element>
				</xsl:when>
				</xsl:choose>
	 		</xsl:for-each>
	 			
	 		<xsl:element name="description">
				<xsl:value-of select="//ka:Perustiedot_Lisatietoa/text()"/>
			</xsl:element>
			
			<xsl:element name="informationDetails">
				<xsl:value-of select="//ka:Vastaus_Liite/text()"/>
			</xsl:element>
			
			<xsl:element name="requestId">
				<xsl:value-of select="//ka:Vastaus_Extend01/text()"/>
			</xsl:element>
			
			<xsl:element name="validTill">
				<xsl:value-of select="//ka:Vastaus_Voimassa/text()"/>
			</xsl:element>
					
		</xsl:element>
		
	</xsl:template>
</xsl:stylesheet>