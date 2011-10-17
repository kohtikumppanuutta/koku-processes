<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        version="2.0" xmlns:fe="http://www.arcusys.fi/DynamicFields"
        xmlns:arc="http://www.arcusys.fi/OUKA/xslt"
        exclude-result-prefixes="fe arc">
        <xsl:output method="xml" indent="yes" />
	
		<xsl:param name="ReceipientsVariable" />
        
        <xsl:template match="*">
                <xsl:copy>
                        <xsl:apply-templates select="@* | node()" />
                </xsl:copy>
        </xsl:template>
        <xsl:template match="@fe:Receipients">
        	<xsl:element name="ReceipientsVariable">
        	<xsl:element name="Receipients">
					<xsl:element name="Receipients_Receipient">
						<xsl:value-of select="//fe:Receipients_Receipient/text()"/>
					</xsl:element>
			</xsl:element>
			</xsl:element>
	</xsl:template>
</xsl:stylesheet>
