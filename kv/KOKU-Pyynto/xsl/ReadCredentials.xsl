<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="2.0" xmlns:fe="http://www.arcusys.fi/KOKU/Intalio_process_configs"
	xmlns:arc="http://www.arcusys.fi/KOKU/xslt" exclude-result-prefixes="fe arc">
	<xsl:output method="xml" indent="yes" />
	<xsl:template match="fe:KOKU_Intalio_process_configs">
		<xsl:element name="user">
			<xsl:value-of select="//fe:username/text()" />
		</xsl:element>
		<xsl:element name="password">
			<xsl:value-of select="//fe:password/text()" />
		</xsl:element>
	</xsl:template>
</xsl:stylesheet>