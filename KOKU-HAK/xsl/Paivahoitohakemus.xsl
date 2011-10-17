<?xml version="1.0" encoding="UTF-8"?>
	<!--
		edited with XMLSpy v2010 (http://www.altova.com) by Henri Korhola
		(Arcusys Oy)
	-->
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fn="http://www.w3.org/2005/02/xpath-functions"
	xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:ka="http://www.arcusys.fi/TAMPERE/Paivahoitohakemus">
	<xsl:output method="html" />
	<xsl:template match="/">
		<html>
			
			<!-- ****************************HEADER**************************** -->
			<head>
				<title>Päivähoitohakemus</title>
	
				<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	
				<link rel="stylesheet" type="text/css" href="style.css" />
			</head>
			
			<!-- ****************************BODY**************************** -->
			<body>

				<div id="page-wrap">
		
					<div class="header">
						<div class="logo">
							<img src="Tampere.vaakuna.png" width="15%" />
						</div>
					<div class="topic">
							Päivähoitohakemus
					</div>
			
				</div>
		
				<div class="section">
					HAKEMUKSEN TIEDOT
					<div class="component">
						<div class="label">
							Etunimi
						</div>
						<div class="value">
							<xsl:value-of select="//ka:Lapsi_Etunimi/text()"/>
						</div>
						<div class="label">
							Sukunimi
						</div>
						<div class="value">
							<xsl:value-of select="//ka:Lapsi_Sukunimi/text()"/>
						</div>
					</div>
				</div>	
		</div>

</body>

</html>
				
				
					
									
		

	</xsl:template>
</xsl:stylesheet>
