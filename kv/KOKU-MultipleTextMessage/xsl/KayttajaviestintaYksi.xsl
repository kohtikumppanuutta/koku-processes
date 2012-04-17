<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:ka="http://soa.kv.koku.arcusys.fi/">
	<xsl:output method="html" />
	
	<xsl:param name="Vastaanottaja" />
	<xsl:preserve-space elements="Message_Content"/>
	
	<xsl:template match="/">

				<h1 id="Header"></h1>
				<div class="Content1">
					<h1>KÄYTTÄJÄVIESTINTÄ</h1>
				</div>
				<div class="main">
					<h2 class="old">LÄHETTÄJÄ</h2>
					<p><xsl:value-of select="//ka:Message_FromRealName/text()" /></p>
					<h2 class="old">VASTAANOTTAJA</h2>
							<!-- <p><xsl:value-of select="$Vastaanottaja/ka:receipientDisplay"/></p>-->
							<p><xsl:value-of select="//ka:Message_ToFirstName" /><xsl:text> </xsl:text><xsl:value-of select="//ka:Message_ToLastName/text()" /></p>
								<!--<xsl:if test="position()!=count(//ka:receipients)">-->
								<!--</xsl:if>-->
					<div class="innerContent">
						<h2 class="old"><xsl:value-of select="//ka:Message_Subject/text()"/></h2>
					</div>
					<div class="innerContent">
						<!-- <div class="old"><p><xsl:value-of select="//ka:Message_Content/text()"/></p></div>-->
						<div class="old"><p><xsl:call-template name="PreserveLineBreaks"><xsl:with-param name="text" select="//ka:Message_Content/text()" /></xsl:call-template></p></div>
					</div>
				</div>

			
</xsl:template>

<xsl:template name="PreserveLineBreaks">
        <xsl:param name="text"/>
        <xsl:choose>
            <xsl:when test="contains($text,'&#xA;')">
                <xsl:value-of select="substring-before($text,'&#xA;')"/>
                <br/>
                <xsl:call-template name="PreserveLineBreaks">
                    <xsl:with-param name="text">
                        <xsl:value-of select="substring-after($text,'&#xA;')"/>
                    </xsl:with-param>
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="$text"/>
            </xsl:otherwise>
        </xsl:choose>

    </xsl:template>

</xsl:stylesheet>
