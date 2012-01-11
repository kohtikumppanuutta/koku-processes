<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        version="2.0" xmlns:fe="http://www.arcusys.fi/DynamicFields"
        xmlns:arc="http://www.arcusys.fi/OUKA/xslt"
        exclude-result-prefixes="fe arc">
        <xsl:output method="xml" indent="yes" />
        
        <xsl:template match="@* | node()">
			<xsl:copy>
				<xsl:apply-templates select="@* | node()"/>
			</xsl:copy>
		</xsl:template>
        
        <xsl:template match="fe:Dynamic_Fields_Form">
        <xsl:copy>
			<xsl:for-each select="//fe:TextInput">
					<xsl:element name="question">
						<xsl:element name="description">
		               		<xsl:value-of select="fe:TextInput_Question" />
		            	</xsl:element>
		            	<xsl:element name="number">
		             		<xsl:value-of select="fe:TextInput_Number" />
		          	  </xsl:element>
		            	<xsl:element name="type">
		              		<xsl:value-of select="fe:TextInput_Type" />
		            	</xsl:element>
		            </xsl:element>
			</xsl:for-each>
		</xsl:copy>
        </xsl:template>
</xsl:stylesheet>