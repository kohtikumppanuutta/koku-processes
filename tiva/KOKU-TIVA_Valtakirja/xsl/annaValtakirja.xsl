<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        version="2.0" xmlns:fe="http://www.arcusys.fi/Valtakirja">
        <xsl:output method="xml" indent="yes" />

	<xsl:template match="@* | node()">
		<xsl:copy>
			<xsl:apply-templates select="@* | node()"/>
		</xsl:copy>
	</xsl:template>

    <xsl:template match="fe:Valtakirja_Form">
		<xsl:copy>
			<xsl:element name="valtakirjapohjaId">        
            	<xsl:value-of select="//fe:Valtakirjapohja_Id/text()" />
            </xsl:element>
            
            <xsl:element name="vastausmennessa">
            	<xsl:value-of select="//fe:Tiedot_VastausMennessa/text()" />
            </xsl:element>
            
            <xsl:if test="//fe:Tiedot_Voimassa/text() != ''">
            	<xsl:element name="maaraaika">        
            		<xsl:value-of select="//fe:Tiedot_Voimassa/text()" />
            	</xsl:element>
            </xsl:if>
            
            <xsl:element name="lahettaja">        
            	<xsl:value-of select="//fe:Tiedot_Lahettaja/text()" />
            </xsl:element>
            
            <xsl:element name="vastaanottaja">        
            	<xsl:value-of select="//fe:Tiedot_Vastaanottaja/text()" />
            </xsl:element>
            
            <xsl:element name="kohdehenkilo">        
            	<xsl:value-of select="//fe:Tiedot_Henkilo/text()" />
            </xsl:element>
		</xsl:copy>
   	</xsl:template>

</xsl:stylesheet>