<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:ka="http://soa.kv.koku.arcusys.fi/">
	<xsl:output method="html" />
	
	<xsl:param name="Vastaanottaja" />
	
	<xsl:template match="/">

				<h1 id="Header"></h1>
				<div class="Content1">
					<h1>KÄYTTÄJÄVIESTINTÄ</h1>
				</div>
				<div class="main">
					<h2 class="old">LÄHETTÄJÄ</h2>
					<p><xsl:value-of select="//ka:Message_FromUser/text()"/></p>
					<h2 class="old">VASTAANOTTAJA</h2>
							<p><xsl:value-of select="$Vastaanottaja/ka:receipientDisplay"/></p>
								<!--<xsl:if test="position()!=count(//ka:receipients)">-->
								<!--</xsl:if>-->
					<div class="innerContent">
						<h2 class="old"><xsl:value-of select="//ka:Message_Subject/text()"/></h2>
					</div>
					<div class="innerContent">
						<div class="old"><p><xsl:value-of select="//ka:Message_Content/text()"/></p></div>
					</div>
				</div>

			
</xsl:template>
</xsl:stylesheet>
