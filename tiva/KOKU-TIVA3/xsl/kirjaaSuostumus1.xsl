<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        version="2.0" xmlns:fe="http://www.arcusys.fi/KOKU/TIVA3">
        <xsl:output method="xml" indent="yes" />

	<xsl:template match="@* | node()">
		<xsl:copy>
			<xsl:apply-templates select="@* | node()"/>
		</xsl:copy>
	</xsl:template>

    <xsl:template match="fe:TIVA3Form">
		<xsl:copy>
			<xsl:element name="suostumuspohjaId">        
            	<xsl:value-of select="//fe:Suostumus_SuostumusId/text()" />
            </xsl:element>
            
            <xsl:element name="lahettaja">
            	<xsl:value-of select="//fe:Kayttaja_Lahettaja/text()" />
            </xsl:element>
            
            <xsl:element name="suostumustapa">        
            	<xsl:value-of select="//fe:Suostumus1_Suostumustapa/text()" />
            </xsl:element>
            
            <xsl:element name="kohdehenkilo">
            	<xsl:value-of select="//fe:Suostumus_Kohdehenkilo/text()" />
            </xsl:element>
            
            <xsl:for-each select="//fe:Vastaanottajat">
            	<xsl:element name="vastaanottaja">
            		<xsl:value-of select="fe:Vastaanottajat_Vastaanottaja/text()"/>
            	</xsl:element>
            </xsl:for-each>
            
            <xsl:element name="maaraaika">        
            	<xsl:value-of select="//fe:Suostumus_Maaraaika/text()" />
            </xsl:element>
            
            <xsl:element name="suostumusajankohta">        
            	<xsl:value-of select="//fe:Suostumus1_Suostumusajankohta/text()" />
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
            
            <xsl:element name="suostumuksenLisaTiedot">
            	<xsl:element name="additionalInfo">
            		<xsl:value-of select="//fe:Suostumus1_Lisatiedot/text()" />
            	</xsl:element>
            	<xsl:element name="attachmentUrl">
            		<xsl:value-of select="//fe:Suostumus1_Liite/text()" />
            	</xsl:element>
            	<xsl:element name="repository">
            		<xsl:value-of select="//fe:Suostumus1_Sailytyspaikka/text()" />
            	</xsl:element>
            </xsl:element>
            
            <xsl:element name="kommentti">
            	<xsl:value-of select="//fe:Suostumus1_Lisatiedot/text()" />
            </xsl:element>
		</xsl:copy>
   	</xsl:template>

</xsl:stylesheet>