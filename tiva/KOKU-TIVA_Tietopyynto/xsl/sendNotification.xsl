<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        version="1.0" xmlns:fe="http://www.arcusys.fi/Tiva_Tietopyynto">
        <xsl:output method="xml" indent="yes" />

	<xsl:template match="@* | node()">
		<xsl:copy>
			<xsl:apply-templates select="@* | node()"/>
		</xsl:copy>
	</xsl:template>
	
	<xsl:template name="output-tokens">
    	<xsl:param name="list" />
        <!-- <xsl:variable name="newlist" select="concat(normalize-space($list), ',')" /> -->
        <xsl:variable name="first" select="substring-before($list, ',')" />
        <xsl:variable name="remaining" select="substring-after($list, ',')" />
        <xsl:element name="recipients">
        	<xsl:value-of select="$first" />
        </xsl:element>
        <xsl:if test="$remaining">
        	<xsl:call-template name="output-tokens">
       	 		<xsl:with-param name="list" select="$remaining" />
        	</xsl:call-template>
        </xsl:if>
	</xsl:template>
	
	<xsl:template match="fe:Tiva_Tietopyynto_Form">
		<xsl:copy>
			<xsl:element name="subject">
				<xsl:value-of select="//fe:Perustiedot_Otsikko/text()"/>
			</xsl:element>
			<xsl:call-template name="output-tokens">
				<xsl:with-param name="list">
					<xsl:value-of select="concat(//fe:Perustiedot_Extend03/text(), ',')" />
				</xsl:with-param>
           	</xsl:call-template>
			<xsl:element name="content">
				<xsl:choose>
					<xsl:when test="//fe:Vastaus_Paatos/text() = 'true'">
						<xsl:text>Tietopyyntö "</xsl:text><xsl:value-of select="//fe:Perustiedot_Otsikko/text()"/><xsl:text>" on hyväksytty käyttäjän </xsl:text>
						<xsl:value-of select="//fe:Perustiedot_Extend04/text()"/><xsl:text> toimesta.</xsl:text>
					</xsl:when>
					<xsl:when test="//fe:Vastaus_Paatos/text() = 'false'">
						<xsl:text>Tietopyyntö "</xsl:text><xsl:value-of select="//fe:Perustiedot_Otsikko/text()"/><xsl:text>" on hylätty käyttäjän </xsl:text>
						<xsl:value-of select="//fe:Perustiedot_Extend04/text()"/><xsl:text> toimesta.</xsl:text>
					</xsl:when>
				</xsl:choose>
			</xsl:element>
		</xsl:copy>
	</xsl:template>

</xsl:stylesheet>