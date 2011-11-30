<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        version="2.0" xmlns:fe="http://www.arcusys.fi/KOKU/TIVA">
        <xsl:output method="xml" indent="yes" />

	<xsl:template match="@* | node()">
		<xsl:copy>
			<xsl:apply-templates select="@* | node()"/>
		</xsl:copy>
	</xsl:template>

    <xsl:template match="fe:TIVA_Form">
		<xsl:copy>
			<xsl:element name="suostumusId">        
            	<xsl:value-of select="//fe:Suostumus_SuostumusId/text()" />
            </xsl:element>
            
            <xsl:element name="suostuja">        
            	<xsl:value-of select="//fe:Kayttaja_Vastaanottaja/text()" />
            </xsl:element> 
            
            <xsl:for-each select="//fe:Vastaukset">
            	<xsl:element name="vastaukset">
            		<xsl:element name="actionRequestNumber">                
                		<xsl:value-of select="fe:Vastaukset_VastausId/text()"/>        
                	</xsl:element>
                	<xsl:element name="permitted">                
                		<xsl:value-of select="fe:Vastaukset_Vastaus/text()"/>        
                	</xsl:element>
                </xsl:element>
            </xsl:for-each>
            
            <xsl:if test="//fe:Suostumus_Maara_Aika/text() != ''">
           		<xsl:element name="maaraaika">        
            		<xsl:value-of select="//fe:Suostumus_Maara_Aika/text()" />
            	</xsl:element>
            </xsl:if>
            
            <xsl:element name="kommentti">        
            	<xsl:value-of select="//fe:Suostumus_Kommentti/text()" />
            </xsl:element>
		</xsl:copy>
   	</xsl:template>

</xsl:stylesheet>