<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ka="http://soa.kv.koku.arcusys.fi/">
	<xsl:output method="xml" indent="yes" />
	<xsl:template match="/">
		<xsl:element name="toUser">
			<xsl:value-of select="//ka:receipient/text()" />
		</xsl:element>
	</xsl:template>
</xsl:stylesheet>
