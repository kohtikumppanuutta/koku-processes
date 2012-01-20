<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        version="2.0" xmlns:fe="http://www.arcusys.fi/DynamicFields"
        xmlns:arc="http://www.arcusys.fi/OUKA/xslt"
        exclude-result-prefixes="fe arc">
        <xsl:output method="xml" indent="yes" />
        <xsl:template match="fe:Receipients">
				<xsl:element name="User_Recipient">
		            <xsl:value-of select="//fe:Receipients_Realm" />
				</xsl:element>
        </xsl:template>
</xsl:stylesheet>