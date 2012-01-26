<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:ka="http://www.arcusys.fi/DynamicFields">
	<xsl:output method="html" />
	<xsl:template match="/">

				<h1 id="Header"></h1>
				<div class="Content1">
					<h1>KÄYTTÄJÄVIESTINTÄ</h1>
				</div>
				<div class="main">

					<h2>LÄHETTÄJÄ</h2>
					<p><xsl:value-of select="//ka:User_SenderDisplay/text()"/></p>
					<div class="innerContent">
					<h2 class="old">VASTAANOTTAJA</h2>
							<p><xsl:value-of select="//ka:User_RecipientDisplay/text()"/></p>
					</div>
						<h2 class="old"><xsl:value-of select="//ka:Header_Text/text()"/></h2>
					<xsl:for-each select="//ka:TextInput">
						<div class="innerContent">
							<h4><xsl:value-of select="ka:TextInput_Question/text()"/></h4>
						</div>
						<div class="innerContent">
						<i>
<!--						<xsl:variable name="sectionNumber" select="ka:TextInput_Number/text()"/>-->
							<xsl:choose>
								<xsl:when test="ka:TextInput_Type = 'MULTIPLE_CHOICE'">
									<div class="old f"><xsl:value-of select="ka:TextInput_AnswerText/text()"/></div>
<!--									<xsl:for-each select="//ka:MultipleChoice">-->
<!--										<xsl:if test="ka:MultipleChoice_Section = $sectionNumber" >-->
<!--											<xsl:if test="ka:MultipleChoice_Checked = 'true'">-->
<!--												<div class="old f"><xsl:value-of select="ka:MultipleChoice_Question/text()"/></div>-->
<!--											</xsl:if>-->
<!--										</xsl:if>-->
<!--									</xsl:for-each>-->
								</xsl:when>
								<xsl:when test="ka:TextInput_Type = 'YES_NO'">
										<xsl:if test="ka:TextInput_AnswerText = 'true'" >
												<div class="old f">Kyllä</div>
										</xsl:if>
										<xsl:if test="ka:TextInput_AnswerText = 'false'" >
												<div class="old f">Ei</div>
										</xsl:if>
								</xsl:when>
								<xsl:otherwise>
									<div class="old f"><xsl:value-of select="ka:TextInput_AnswerText/text()"/></div>
								</xsl:otherwise>
							</xsl:choose>
							</i>
						</div>
						<br/>
					</xsl:for-each>
				</div>

</xsl:template>
</xsl:stylesheet>


