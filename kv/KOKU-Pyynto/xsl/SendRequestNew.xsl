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
        		<xsl:element name="requestTemplate">
        		
        		<xsl:element name="creatorUid">
					<xsl:value-of select="//fe:User_Sender/text()" />
				</xsl:element>
        		
        		<xsl:if test="//fe:RequestProcessing_RequestID/text() != '-'">
       				<xsl:element name="requestTemplateId">
       					<xsl:value-of select="//fe:RequestProcessing_RequestID/text()" />
       				</xsl:element>
       			</xsl:if>
       			
       			<xsl:element name="subject">
					<xsl:value-of select="//fe:Header_Text/text()" />
				</xsl:element>
				
				<xsl:element name="visibility">
					<xsl:value-of select="//fe:PohjaNakyvyys_Arvo/text()" />
				</xsl:element>
				
				<xsl:for-each select="//fe:MultipleChoice">
					<xsl:element name="choices">
						<xsl:element name="description">
							<xsl:value-of select="fe:MultipleChoice_Question/text()" />
						</xsl:element>
						<xsl:element name="number">
							<xsl:value-of select="fe:MultipleChoice_Number/text()" />
						</xsl:element>
						<xsl:element name="questionNumber">
							<xsl:value-of select="fe:MultipleChoice_Section/text()" />
						</xsl:element>
					</xsl:element>
				</xsl:for-each>
				
				<xsl:for-each select="//fe:TextInput">
					<xsl:element name="questions">
						<xsl:element name="description">
							<xsl:value-of select="fe:TextInput_Question/text()" />
						</xsl:element>
						<xsl:element name="number">
							<xsl:value-of select="fe:TextInput_Number/text()" />
						</xsl:element>
						<xsl:element name="type">
							<xsl:value-of select="fe:TextInput_Type/text()" />
						</xsl:element>
					</xsl:element>
				</xsl:for-each>
				
				</xsl:element>
       			
       			<xsl:element name="request">
   					<xsl:element name="content">
       					<xsl:value-of select="//fe:HTML_Sisalto/text()" />
       				</xsl:element>
       				<xsl:if test="//fe:User_Roolit/text() != 'null'">
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