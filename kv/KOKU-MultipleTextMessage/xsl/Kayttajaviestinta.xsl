<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:ka="http://soa.kv.koku.arcusys.fi/">
	<xsl:output method="html" />
	
	<xsl:template match="/">
	   <pre>
	      <xsl:apply-templates />
	   </pre>
	</xsl:template>
	
	<xsl:template match="text()[not(string-length(normalize-space()))]"/>
	
	<xsl:template match="text()[string-length(normalize-space()) > 0]">
	  <xsl:value-of select="translate(.,'&#xA;&#xD;', '  ')"/>
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
	
	<xsl:template match="/">

			<!-- ****************************BODY**************************** -->
				<h1 id="Header"></h1>
				<div class="Content1">
					<h1>KÄYTTÄJÄVIESTINTÄ</h1>
				</div>
				<div class="main">
					<h2 class="old">LÄHETTÄJÄ</h2>
					<p>				
					<xsl:value-of select="//ka:Message_FromRealName/text()" />
					</p>
					
					
					<h2 class="old">VASTAANOTTAJA</h2>
							<p>
							<xsl:for-each select="//ka:receipients">
								<xsl:value-of select="ka:receipientDisplay/text()"/>
								<!--<xsl:if test="position()!=count(//ka:receipients)">-->
								<!--</xsl:if>-->
								<br/>
							</xsl:for-each>
							</p>
					<div class="innerContent">
						<h2 class="old"><xsl:value-of select="//ka:Message_Subject/text()"/></h2>
					</div>
					<div class="innerContent">
						<div class="old"><p><xsl:call-template name="PreserveLineBreaks">
            									<xsl:with-param name="text" select="//ka:Message_Content/text()"/>
        									</xsl:call-template></p></div>
					</div>
				</div>

</xsl:template>
</xsl:stylesheet>
