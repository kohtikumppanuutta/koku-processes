<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        version="2.0" xmlns:fe="http://www.arcusys.fi/DynamicFields"
        xmlns:arc="http://www.arcusys.fi/OUKA/xslt"
        exclude-result-prefixes="fe arc">
        <xsl:output method="xml" indent="yes" />
        <xsl:template match="fe:Dynamic_Fields_Form">
		<xsl:element name="answers">
			<xsl:for-each select="//fe:TextInput">
				<xsl:element name="answer">
		                        <xsl:element name="comment">
		                        </xsl:element>
		                        <xsl:element name="questionNumber">
		                                 <xsl:value-of select="fe:TextInput_Number" />
		                        </xsl:element>
		                        <xsl:element name="textValue">
		                        	<xsl:choose>
		                        		<xsl:when test="fe:TextInput_Type = 'FREE_TEXT'">
		                        			<xsl:value-of select="fe:TextInput_AnswerText" />
		                        		</xsl:when>
		                        		<xsl:when test="fe:TextInput_Type = 'NUMBER'">
		                        			<xsl:value-of select="fe:TextInput_AnswerText" />
		                        		</xsl:when>
		                        		<xsl:when test="fe:TextInput_Type = 'MULTIPLE_CHOICE'">
		                        			<xsl:value-of select="fe:TextInput_AnswerText" />
		                        		</xsl:when>
		                        		<xsl:when test="fe:TextInput_Type = 'CALENDAR'">
		                        			<xsl:value-of select="fe:TextInput_AnswerText" />
		                        		</xsl:when>
		                        		<xsl:otherwise>
		                        		</xsl:otherwise>
		                        	</xsl:choose>
		                        </xsl:element>
		                        <xsl:element name="yesNoValue">
		                        	<xsl:choose>
		                        		<xsl:when test="fe:TextInput_Type = 'YES_NO'">
		                        			<xsl:value-of select="fe:TextInput_AnswerText" />
		                        		</xsl:when>
		                        		<xsl:otherwise>
		                        		</xsl:otherwise>
		                        	</xsl:choose>
		                        </xsl:element>
				</xsl:element>
			</xsl:for-each>
		</xsl:element>
        </xsl:template>
	<xsl:function name="arc:mapText">
		<xsl:param name="input" />
		<xsl:if test="$input!='true' and $input!='false'">
			<xsl:text></xsl:text>
		</xsl:if>
		<xsl:if test="$input='Kiiminki'">
			<xsl:text>255</xsl:text>
		</xsl:if>
	</xsl:function>
</xsl:stylesheet>