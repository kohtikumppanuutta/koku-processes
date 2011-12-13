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
		    <xsl:element name="suostumuspohja">
            
            <xsl:element name="otsikko">        
            	<xsl:value-of select="//fe:Pohja_Otsikko/text()" />
            </xsl:element>
            
            <xsl:element name="saateteksti">        
            	<xsl:value-of select="//fe:Pohja_Kuvaus/text()" />
            </xsl:element>

			<xsl:element name="laatija">        
               	<xsl:value-of select="//fe:Kayttaja_Lahettaja/text()" />
            </xsl:element>
            
            <xsl:element name="templateType">
            	<xsl:element name="templateId">
            		<xsl:value-of select="//fe:Pohja_Aihealue/text()" />
            	</xsl:element>
            </xsl:element>
            
            <xsl:for-each select="//fe:Toimenpiteet">
            	<xsl:element name="toimenpiteet">
            		<xsl:element name="number">                
                		<xsl:value-of select="fe:Toimenpiteet_ToimenpideId/text()"/>        
                	</xsl:element>
                	<xsl:element name="name">                
                		<xsl:value-of select="fe:Toimenpiteet_Kuvaus/text()"/>        
                	</xsl:element>
                	<xsl:element name="description">                
                		<xsl:value-of select="fe:Toimenpiteet_Tarkentava_Teksti/text()"/>        
                	</xsl:element>
                </xsl:element>
            </xsl:for-each>
            </xsl:element>
		</xsl:copy>
   	</xsl:template>
</xsl:stylesheet>