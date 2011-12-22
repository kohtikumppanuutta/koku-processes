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
       			<xsl:element name="requestTemplateId">
       				<xsl:value-of select="//fe:RequestProcessing_RequestID/text()" />
       			</xsl:element>
       			<xsl:element name="request">
   					<xsl:element name="content">
       					<xsl:value-of select="//fe:HTML_Sisalto/text()" />
       				</xsl:element>
       				<xsl:if test="//fe:User_Roolit/text() != ''">
       					<xsl:element name="fromRole">
       						<xsl:value-of select="//fe:User_Roolit/text()" />
       					</xsl:element>
       				</xsl:if>
					<xsl:element name="fromUserUid">
						<xsl:value-of select="//fe:User_Sender/text()" />
					</xsl:element>
					<xsl:element name="notifyBeforeDays">
						<xsl:value-of select="//fe:User_Reminder/text()" />
					</xsl:element>
					<xsl:for-each select="//fe:Receipients">
						<xsl:element name="receipients">
							<xsl:value-of select="fe:Receipients_ReceipientUid/text()" />
						</xsl:element>
					</xsl:for-each>
					<xsl:element name="replyTill">
						<xsl:value-of select="//fe:User_AnswerUntil/text()" />
					</xsl:element>
					<xsl:element name="subject">
						<xsl:value-of select="//fe:Header_Text/text()" />
					</xsl:element>
       			</xsl:element>
        	</xsl:copy>
        </xsl:template>
</xsl:stylesheet>