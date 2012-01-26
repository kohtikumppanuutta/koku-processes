<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        version="2.0" xmlns:fe="http://www.arcusys.fi/DynamicFields"
        xmlns:arc="http://www.arcusys.fi/OUKA/xslt"
        exclude-result-prefixes="fe arc">
        <xsl:output method="xml" indent="yes" />
        
        <xsl:template match="@* | node()">
			<xsl:copy>
				<xsl:apply-templates select="@* | node()"/>
			</xsl:copy>
		</xsl:template>
        
        <xsl:template match="fe:Dynamic_Fields_Form">     		
				<xsl:for-each select="//fe:Receipients">
					<xsl:element name="receipients">
           				<xsl:value-of select="fe:Receipients_ReceipientUid" />
           			</xsl:element>
				</xsl:for-each>
        </xsl:template>
</xsl:stylesheet>