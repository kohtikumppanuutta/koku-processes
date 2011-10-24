<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:ka="http://www.arcusys.fi/Tiva_Tietopyynto">
	<xsl:output method="xml" indent="yes" />
 	<xsl:template match="/">
		<xsl:element name="Tietopyynto">
			<xsl:element name="additionalInfo">
				<xsl:value-of select="//ka:Pyynto_Lisatieto/text()"/>
			</xsl:element>
					
			<xsl:for-each select="//ka:Havannointitiedot">
				<xsl:choose>
				
				<xsl:when test="ka:Havannointitiedot_Valitut/text() !=''">
							
					<xsl:element name="category">
						<xsl:value-of select="ka:Havannointitiedot_Valitut/text()"/>
					</xsl:element>
				</xsl:when>
				</xsl:choose>
	 		</xsl:for-each>
	 			
	 		<xsl:element name="description">
				<xsl:value-of select="//ka:Perustiedot_Lisatietoa/text()"/>
			</xsl:element>
			
			<xsl:element name="legislationInfo">
				<xsl:value-of select="//ka:Pyynto_Lainsaadanto/text()"/>
			</xsl:element>
			
			<xsl:element name="receiverUid">
				<xsl:value-of select="//ka:Perustiedot_Vastaanottaja_UID/text()"/>
			</xsl:element>
			
			<xsl:element name="requestPurpose">
				<xsl:value-of select="//ka:Pyynto_Tarkoitus/text()"/>
			</xsl:element>
			
			<xsl:element name="senderUid">
				<xsl:value-of select="//ka:Perustiedot_Lahettaja_UID/text()"/>
			</xsl:element>
	 		
	 		<xsl:element name="targetPersonUid">
				<xsl:value-of select="//ka:Pyynto_Kohde_UID/text()"/>
			</xsl:element>
			
			<xsl:element name="title">
				<xsl:value-of select="//ka:Perustiedot_Otsikko/text()"/>
			</xsl:element>
			
			
		</xsl:element>
		
		
	</xsl:template>
</xsl:stylesheet>