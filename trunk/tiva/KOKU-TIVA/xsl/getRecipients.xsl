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
			<xsl:element name="suostumuspohjaId">        
            	<xsl:value-of select="//fe:Pohja_PohjaId/text()" />
            </xsl:element>

			<xsl:element name="lahettaja">        
               	<xsl:value-of select="//fe:Kayttaja_Lahettaja/text()" />
            </xsl:element>
            
            <xsl:if test="//fe:Suostumus_Maara_Aika/text() != ''">
            	<xsl:element name="maaraaika">
            		<xsl:value-of select="//fe:Suostumus_Maara_Aika/text()" />
            	</xsl:element>
            </xsl:if>
            
            <xsl:element name="maaraaikaMandatory">
            	<xsl:value-of select="//fe:Suostumus_Maaraaika_Vakio/text()" />
            </xsl:element>
            
            <xsl:element name="antajatyyppi">
            	<xsl:value-of select="//fe:Suostumus_Extend1/text()" />
            </xsl:element>
            
            <xsl:if test="//fe:Suostumus_Aikaraja/text() != ''">
            	<xsl:element name="replyTillDate">
            		<xsl:value-of select="//fe:Suostumus_Aikaraja" />
           		</xsl:element>
            </xsl:if>
                        
            <xsl:for-each select="//fe:Vastaanottajat">
            	<xsl:element name="vastaanottaja">
                   	<xsl:value-of select="fe:Vastaanottajat_Vastaanottaja1/text()"/>
                </xsl:element>
                <xsl:element name="vastaanottaja">
                   	<xsl:value-of select="fe:Vastaanottajat_Vastaanottaja2/text()"/>
                </xsl:element>
                <xsl:element name="kohdehenkilo">
                   	<xsl:value-of select="fe:Vastaanottajat_Kohdehenkilo/text()"/>
                </xsl:element>
            </xsl:for-each>
            
		</xsl:copy>
   	</xsl:template>
</xsl:stylesheet>