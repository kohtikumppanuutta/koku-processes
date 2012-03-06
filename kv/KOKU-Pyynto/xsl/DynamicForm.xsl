<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ka="http://www.arcusys.fi/DynamicFields">
	<xsl:output method="html" />
	<xsl:template match="/">

		<h1 id="Header"></h1>
		<div class="Content1">
			<h1>KÄYTTÄJÄVIESTINTÄ</h1>
		</div>
		<div class="main">

			<h2 class="old">LÄHETTÄJÄ</h2>
			<p>
				<xsl:value-of select="//ka:User_SenderDisplay/text()" />
			</p>
			<div class="innerContent">
				<h2 class="old">VASTAANOTTAJA</h2>
				<p>
					<xsl:for-each select="//ka:Receipients">
						<xsl:value-of select="ka:Receipients_Receipient/text()" />
						<br />
					</xsl:for-each>
				</p>
			</div>
			<h2 class="old">
				Uusi pyyntö
			</h2>
			<div class="innerContent">
				<p>
					Sinulle on uusi pyyntö <xsl:value-of select="//ka:Header_Text/text()" />.
				</p>
			</div>
		</div>


	</xsl:template>
</xsl:stylesheet>

