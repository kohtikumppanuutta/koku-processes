<?xml version="1.0" encoding="UTF-8"?>
<!-- edited with XMLSpy v2010 (http://www.altova.com) by Henri Korhola (Arcusys Oy) -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fn="http://www.w3.org/2005/02/xpath-functions" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:ka="http://www.arcusys.fi/TAMPERE/Paivahoitohakemus">
	<xsl:template match="/">
		<fo:root font-family="Helvetica" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:rx="http://www.renderx.com/XSL/Extensions" xmlns:w="http://schemas.microsoft.com/office/word/2003/wordml" xmlns:wx="http://schemas.microsoft.com/office/word/2003/auxHint">
			<fo:layout-master-set>
				<fo:simple-page-master master-name="A4" page-height="297mm" page-width="210mm" margin-top="12mm" margin-left="17mm" margin-right="19mm" margin-bottom="17mm" font-family="Helvetica" font-size="8pt" color="#666666">
					<fo:region-body margin-top="30mm" margin-bottom="10mm" height="266.5mm"/>
					<fo:region-before extent="45mm"/>
					<fo:region-after extent="14mm"/>
				</fo:simple-page-master>
			</fo:layout-master-set>
			<fo:page-sequence master-reference="A4">
				<!-- /////////////////////// HEADER ////////////////////////// -->
				<fo:static-content flow-name="xsl-region-before">
					<fo:table table-layout="fixed" width="100%"  color="#444444" letter-spacing="1">
						<fo:table-body>
							<fo:table-row>
								<fo:table-cell border-style="none" border-width="0.5px" padding-top="1mm" padding-bottom="5mm">
									<fo:block>
										<fo:external-graphic src="http://upload.wikimedia.org/wikipedia/commons/9/9f/Tampere.vaakuna.svg" content-height="scale-to-fit" height="1.00in"  content-width="2.00in" scaling="uniform"/>
									</fo:block>
									<fo:block font-size="10pt">
							
							</fo:block>
								</fo:table-cell>
								<fo:table-cell border-style="none" border-width="0.5px" padding-top="10mm" padding-bottom="5mm" padding-left="10mm">
									<fo:block font-size="12pt" font-weight="normal">
								TAMPEREEN KAUPUNKI
							</fo:block>
									<fo:block font-size="12pt" font-weight="normal">
								PÄIVÄHOITOHAKEMUS
							</fo:block>
								</fo:table-cell>
							</fo:table-row>
						</fo:table-body>
					</fo:table>
				</fo:static-content>
				<!-- ////////////////////// FOOTER ////////////////////////// -->
				<fo:static-content flow-name="xsl-region-after">
					<fo:table width="100%" font-size="6pt">
						<fo:table-column column-width="20%"/>
						<fo:table-column column-width="20%"/>
						<fo:table-column column-width="20%"/>
						<fo:table-column column-width="20%"/>
						<fo:table-column column-width="20%"/>
						<fo:table-body border-before-style="solid">
							<fo:table-row>
								<fo:table-cell padding-left="2mm">
									<fo:block font-weight="bold">
										Postiosoite:
									</fo:block>
									<fo:block>
										<fo:block>Testiosoite</fo:block>
										33100 Tampere
									</fo:block>
								</fo:table-cell>
								<fo:table-cell padding-left="2mm">
									<fo:block font-weight="bold">
										Käyntiosoite:
										</fo:block>
									<fo:block>
										<fo:block>Testiosoite</fo:block>
										33100 Tampere
									</fo:block>

								</fo:table-cell>
								<fo:table-cell padding-left="2mm">
									<fo:block font-weight="bold">
										Puhelin:
								</fo:block>
									<fo:block>
										050-123 4567
								</fo:block>
								</fo:table-cell>
								<fo:table-cell padding-left="2mm">
									<fo:block font-weight="bold">
										Telefax:
								</fo:block>
									<fo:block>
										(00) 123 4567
								</fo:block>
								</fo:table-cell>
								<fo:table-cell padding-left="2mm">
									<fo:block font-weight="bold">
										Internet
							</fo:block>
									<fo:block>
										www.tampere.fi
							</fo:block>
								</fo:table-cell>
							</fo:table-row>
						</fo:table-body>
					</fo:table>
				</fo:static-content>
				<!-- /////////////////////// BODY //////////////////////////// -->
				<fo:flow flow-name="xsl-region-body">
					<fo:table xmlns:st1="urn:schemas-microsoft-com:office:smarttags" xmlns:svg="http://www.w3.org/2000/svg" start-indent="0.70875pt" text-align="left" color="#000000">
						<fo:table-column column-number="1" column-width="105.762455pt"/>
						<fo:table-column column-number="2" column-width="78.31595pt"/>
						<fo:table-column column-number="3" column-width="107.81135pt"/>
						<fo:table-column column-number="4" column-width="105.6737pt"/>
						<fo:table-column column-number="5" column-width="105.411855pt"/>
						<fo:table-body start-indent="0pt" end-indent="0pt">
							<fo:table-row>
								<fo:table-cell number-columns-spanned="2" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="none" border-right-color="black" border-right-width="0pt">
									<fo:block-container>
										<fo:block font-family="Helvetica" font-weight="normal" language="fi-FI" widows="1" orphans="1" font-size="10pt" color="#444444" letter-spacing="1">
											<fo:inline>
												<fo:leader leader-length="0pt"/>HAKEMUKSEN TUNNISTE</fo:inline>
										</fo:block>
										<fo:block widows="2" orphans="2" font-family="Helvetica" language="fi-FI" font-size="10pt">
											<fo:inline font-weight="normal">
												<xsl:value-of select="//ka:Kirjaus_Nro/text()"/>
											</fo:inline>
										</fo:block>
									</fo:block-container>
								</fo:table-cell>
								<fo:table-cell number-columns-spanned="3" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="none" border-right-color="black" border-right-width="0pt">
									<fo:block-container>
										<fo:block font-family="Helvetica" font-weight="normal" language="fi-FI" widows="1" orphans="1" font-size="10pt" color="#444444" letter-spacing="1">
											<fo:inline>
												<fo:leader leader-length="0pt"/>KÄSITTELIJÄN MERKINNÄT</fo:inline>
										</fo:block>
										<fo:block widows="2" orphans="2" font-family="Helvetica" language="fi-FI" font-size="10pt">
											<fo:inline font-weight="normal">
												<xsl:value-of select="//ka:Paatos_Paatos/text()"/>
											</fo:inline>
										</fo:block>
									</fo:block-container>
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row>
								<fo:table-cell number-columns-spanned="5" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
									<fo:block-container>
										<fo:block widows="2" orphans="2" font-family="Helvetica" language="fi-FI" font-size="10pt">
											<fo:inline font-weight="normal">
												<fo:leader/>
											</fo:inline>
										</fo:block>
										<fo:block font-family="Helvetica" language="fi-FI" font-weight="normal" widows="1" orphans="1" font-size="10pt" color="#444444" letter-spacing="1">
											<fo:inline>
												<fo:leader leader-length="0pt"/>LAPSEN TIEDOT</fo:inline>
										</fo:block>
									</fo:block-container>
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row>
										<fo:table-cell number-columns-spanned="2" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Nimi</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="concat(//ka:Lapsi_Etunimi/text(),' ',//ka:Lapsi_Sukunimi/text())"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="1" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Henkilötunnus</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Lapsi_Henkilotunnus/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="1" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Äidinkieli</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Lapsi_Aidinkieli/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="1" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Kotipaikka</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Lapsi_Kotipaikka/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
									</fo:table-row>
							        <fo:table-row>
										<fo:table-cell number-columns-spanned="2" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Lähiosoite</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Lapsi_Lahiosoite/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="1" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Postinumero</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Lapsi_Postinumero/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="1" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Postitoimipaikka</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Lapsi_Postitoimipaikka/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
									</fo:table-row>
							<fo:table-row>
								<fo:table-cell number-columns-spanned="5" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
									<fo:block-container>
										<fo:block widows="2" orphans="2" font-family="Helvetica" language="fi-FI" font-size="10pt">
											<fo:inline font-weight="normal">
												<fo:leader/>
											</fo:inline>
										</fo:block>
										<fo:block font-family="Helvetica" language="fi-FI" font-weight="normal" widows="1" orphans="1" font-size="10pt" color="#444444" letter-spacing="1">
											<fo:inline>
												<fo:leader leader-length="0pt"/>HUOLTAJAN TIEDOT</fo:inline>
										</fo:block>
									</fo:block-container>
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row>
										<fo:table-cell number-columns-spanned="2" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Nimi</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="concat(//ka:Huoltaja_Etunimi/text(),' ',//ka:Huoltaja_Sukunimi/text())"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="1" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Henkilötunnus</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Huoltaja_Henkilotunnus/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="1" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Puhelin</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Huoltaja_Puhelin/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="1" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Matkapuhelin</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Huoltaja_Matkapuhelin/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
									</fo:table-row>
							<fo:table-row>

										<fo:table-cell number-columns-spanned="2" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Sähköposti</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Huoltaja_Sahkopostiosoite/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>

										<fo:table-cell number-columns-spanned="2" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Työpaikka</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Huoltaja_Tyopaikka/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="1" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Työpaikan puhelin</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Huoltaja_TyopaikanPuhelin/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
									</fo:table-row>
							<fo:table-row>

										<fo:table-cell number-columns-spanned="3" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Työpaikan osoite</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Huoltaja_TyopaikanOsoite/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="2" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Ammatti</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Huoltaja_Ammatti/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
									</fo:table-row>
							        <fo:table-row>

										<fo:table-cell number-columns-spanned="2" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Työaika</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="concat(//ka:Huoltaja_TyoaikaAlkaa/text(),' - ',//ka:Huoltaja_TyoaikaLoppuu/text())"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="1" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Vuorotyö</fo:inline>
												</fo:block>
										<fo:block font-family="Helvetica" font-weight="normal" font-size="10pt" language="fi-FI" widows="1" orphans="1">
											<xsl:choose>
												<xsl:when test="//ka:Huoltaja_VuorotyoKylla = 'true'">
													<fo:inline id="Vuorotyo00"/>
													<fo:inline font-size="10pt" font-weight="normal">
														<fo:leader leader-length="0pt"/>Kyllä</fo:inline>
												</xsl:when>
												<xsl:when test="//ka:Huoltaja_VuorotyoEi = 'true'">
													<fo:inline id="Vuorotyo01"/>
													<fo:inline font-size="10pt" font-weight="normal">
														<fo:leader leader-length="0pt"/>Ei</fo:inline>
												</xsl:when>
											</xsl:choose>
										</fo:block>
											</fo:block-container>
										</fo:table-cell>

										<fo:table-cell number-columns-spanned="1" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Huoltajuus</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Huoltaja_Huoltajuus/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="1" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Perhesuhde</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Huoltaja_Perhesuhde/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
									</fo:table-row>
							<fo:table-row>
								<fo:table-cell number-columns-spanned="5" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
									<fo:block-container>
										<fo:block widows="2" orphans="2" font-family="Helvetica" language="fi-FI" font-size="10pt">
											<fo:inline font-weight="normal">
												<fo:leader/>
											</fo:inline>
										</fo:block>
										<fo:block font-family="Helvetica" language="fi-FI" font-weight="normal" widows="1" orphans="1" font-size="10pt" color="#444444" letter-spacing="1">
											<fo:inline>
												<fo:leader leader-length="0pt"/>PUOLISON TIEDOT</fo:inline>
										</fo:block>
									</fo:block-container>
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row>
										<fo:table-cell number-columns-spanned="2" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Nimi</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="concat(//ka:Puoliso_Etunimi/text(),' ',//ka:Puoliso_Sukunimi/text())"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="1" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Henkilötunnus</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Puoliso_Henkilotunnus/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="1" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Puhelin</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Puoliso_Puhelin/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="1" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Matkapuhelin</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Puoliso_Matkapuhelin/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
									</fo:table-row>
							<fo:table-row>

										<fo:table-cell number-columns-spanned="2" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Sähköposti</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Puoliso_Sahkopostiosoite/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>

										<fo:table-cell number-columns-spanned="2" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Työpaikka</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Puoliso_Tyopaikka/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="1" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Työpaikan puhelin</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Puoliso_TyopaikanPuhelin/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
									</fo:table-row>
							<fo:table-row>

										<fo:table-cell number-columns-spanned="3" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Työpaikan osoite</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Puoliso_TyopaikanOsoite/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="2" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Ammatti</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Puoliso_Ammatti/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
									</fo:table-row>
							        <fo:table-row>

										<fo:table-cell number-columns-spanned="2" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Työaika</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="concat(//ka:Puoliso_TyoaikaAlkaa/text(),' - ',//ka:Puoliso_TyoaikaLoppuu/text())"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="1" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Vuorotyö</fo:inline>
												</fo:block>
										<fo:block font-family="Helvetica" font-weight="normal" font-size="10pt" language="fi-FI" widows="1" orphans="1">
											<xsl:choose>
												<xsl:when test="//ka:Puoliso_VuorotyoKylla = 'true'">
													<fo:inline id="Vuorotyo10"/>
													<fo:inline font-size="10pt" font-weight="normal">
														<fo:leader leader-length="0pt"/>Kyllä</fo:inline>
												</xsl:when>
												<xsl:when test="//ka:Puoliso_VuorotyoEi = 'true'">
													<fo:inline id="Vuorotyo11"/>
													<fo:inline font-size="10pt" font-weight="normal">
														<fo:leader leader-length="0pt"/>Ei</fo:inline>
												</xsl:when>
											</xsl:choose>
										</fo:block>
											</fo:block-container>
										</fo:table-cell>
									</fo:table-row>
							<fo:table-row>
								<fo:table-cell number-columns-spanned="5" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
									<fo:block-container>
										<fo:block widows="2" orphans="2" font-family="Helvetica" language="fi-FI" font-size="10pt">
											<fo:inline font-weight="normal">
												<fo:leader/>
											</fo:inline>
										</fo:block>
										<fo:block font-family="Helvetica" language="fi-FI" font-weight="normal" widows="1" orphans="1" font-size="10pt" color="#444444" letter-spacing="1">
											<fo:inline>
												<fo:leader leader-length="0pt"/>PERHEEN MUUT KOTONA ASUVAT ALLE 18-VUOTIAAT LAPSET</fo:inline>
										</fo:block>
									</fo:block-container>
								</fo:table-cell>
							</fo:table-row>
							<fo:table-row>
										<fo:table-cell number-columns-spanned="2" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Nimi</fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="2" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Henkilötunnus</fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
									</fo:table-row>
									<xsl:for-each select="//ka:MuutLapset">
							        <fo:table-row>
										<fo:table-cell number-columns-spanned="2" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="concat(ka:MuutLapset_Etunimi/text(),' ',ka:MuutLapset_Sukunimi/text())"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="2" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="ka:MuutLapset_Henkilotunnus"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
									</fo:table-row>
									</xsl:for-each>
							<fo:table-row>
								<fo:table-cell number-columns-spanned="5" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
									<fo:block-container>
										<fo:block widows="2" orphans="2" font-family="Helvetica" language="fi-FI" font-size="10pt">
											<fo:inline font-weight="normal">
												<fo:leader/>
											</fo:inline>
										</fo:block>
										<fo:block font-family="Helvetica" language="fi-FI" font-weight="normal" widows="1" orphans="1" font-size="10pt" color="#444444" letter-spacing="1">
											<fo:inline>
												<fo:leader leader-length="0pt"/>HOIDON TARVE</fo:inline>
										</fo:block>
									</fo:block-container>
								</fo:table-cell>
							</fo:table-row>
							        <fo:table-row>
							<xsl:choose>
								<xsl:when test="//ka:HoidonTarve_Kokopaiva = 'true'">
										<fo:table-cell number-columns-spanned="2" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Kokopäivähoito</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="concat(//ka:HoidonTarve_KokopaivaAlkaa/text(),' - ',//ka:HoidonTarve_KokopaivaLoppuu/text())"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										</xsl:when>
										<xsl:when test="//ka:HoidonTarve_Osapaiva = 'true'">
										<fo:table-cell number-columns-spanned="2" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Osapäivähoito</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="concat(//ka:HoidonTarve_OsapaivaAlkaa/text(),' - ',//ka:HoidonTarve_OsapaivaLoppuu/text())"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										</xsl:when>
							</xsl:choose>
										<fo:table-cell number-columns-spanned="2" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Vuorohoito</fo:inline>
												</fo:block>
										<fo:block font-family="Helvetica" font-weight="normal" font-size="10pt" language="fi-FI" widows="1" orphans="1">
											<xsl:choose>
												<xsl:when test="//ka:HoidonTarve_VuorohoitoKylla = 'true'">
													<fo:inline id="Vuorohoito0"/>
													<fo:inline font-size="10pt" font-weight="normal">
														<fo:leader leader-length="0pt"/>Kyllä</fo:inline>
												<xsl:if test="//ka:HoidonTarve_VuorohoitoLa = 'true'">
													<fo:inline font-size="10pt" font-weight="normal">
													<fo:inline id="Vuorohoito00"/>
														<fo:leader leader-length="0pt"/>, La</fo:inline>
												</xsl:if>
												<xsl:if test="//ka:HoidonTarve_VuorohoitoSu = 'true'">
													<fo:inline font-size="10pt" font-weight="normal">
													<fo:inline id="Vuorohoito01"/>
														<fo:leader leader-length="0pt"/>, Su</fo:inline>
												</xsl:if>
												<xsl:if test="//ka:HoidonTarve_VuorohoitoIlta = 'true'">
													<fo:inline font-size="10pt" font-weight="normal">
													<fo:inline id="Vuorohoito02"/>
														<fo:leader leader-length="0pt"/>, Ilta</fo:inline>
												</xsl:if>
												<xsl:if test="//ka:HoidonTarve_VuorohoitoIlta = 'true'">
													<fo:inline font-size="10pt" font-weight="normal">
													<fo:inline id="Vuorohoito03"/>
														<fo:leader leader-length="0pt"/>, Yö</fo:inline>
												</xsl:if>

												</xsl:when>
												<xsl:when test="//ka:HoidonTarve_VuorohoitoEi = 'true'">
													<fo:inline id="Vuorohoito1"/>
													<fo:inline font-size="10pt" font-weight="normal">
														<fo:leader leader-length="0pt"/>Ei</fo:inline>
												</xsl:when>
											</xsl:choose>
										</fo:block>
											</fo:block-container>
										</fo:table-cell>
									</fo:table-row>
							<fo:table-row>
										<fo:table-cell number-columns-spanned="2" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Hoitopäivät kuukaudessa</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:HoidonTarve_Hoitopaivat/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="1" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Hoidon tarve alkaen</fo:inline>
												</fo:block>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt" language="fi-FI" text-align="left" text-indent="0pt">
													<fo:inline font-size="10pt" font-weight="normal">
													
												<xsl:value-of select="//ka:HoidonTarve_Alkaen/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="1" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Auto käytettävissä</fo:inline>
												</fo:block>
										<fo:block font-family="Helvetica" font-weight="normal" font-size="10pt" language="fi-FI" widows="1" orphans="1">
											<xsl:choose>
												<xsl:when test="//ka:HoidonTarve_AutoKylla = 'true'">
													<fo:inline id="Auto0"/>
													<fo:inline font-size="10pt" font-weight="normal">
														<fo:leader leader-length="0pt"/>Kyllä
														</fo:inline>
												</xsl:when>
												<xsl:when test="//ka:HoidonTarve_AutoEi = 'true'">
													<fo:inline id="Auto1"/>
													<fo:inline font-size="10pt" font-weight="normal">
														<fo:leader leader-length="0pt"/>Ei</fo:inline>
												</xsl:when>
											</xsl:choose>
										</fo:block>
											</fo:block-container>
										</fo:table-cell>
									</fo:table-row>
							<fo:table-row>
								<fo:table-cell number-columns-spanned="5" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
									<fo:block-container>
										<fo:block widows="2" orphans="2" font-family="Helvetica" language="fi-FI" font-size="10pt">
											<fo:inline font-weight="normal">
												<fo:leader/>
											</fo:inline>
										</fo:block>
										<fo:block font-family="Helvetica" language="fi-FI" font-weight="normal" widows="1" orphans="1" font-size="10pt" color="#444444" letter-spacing="1">
											<fo:inline>
												<fo:leader leader-length="0pt"/>HAKUTOIVE</fo:inline>
										</fo:block>
									</fo:block-container>
								</fo:table-cell>
							</fo:table-row>
									<fo:table-row>
										<fo:table-cell number-columns-spanned="5" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
										<fo:block font-family="Helvetica" font-weight="normal" font-size="10pt" language="fi-FI" widows="1" orphans="1">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="concat(//ka:Hakutoive_Kunta/text(),':')"/></fo:inline>
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="concat('  1. ',//ka:Hakutoive_1Tyyppi/text(),', ',//ka:Hakutoive_1Alue/text())"/></fo:inline>

													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="concat('  2. ',//ka:Hakutoive_2Tyyppi/text(),', ',//ka:Hakutoive_2Alue/text())"/></fo:inline>

													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="concat('  3. ',//ka:Hakutoive_3Tyyppi/text(),', ',//ka:Hakutoive_3Alue/text())"/></fo:inline>
												<xsl:if test="//ka:Hakutoive_4Tyyppi != '-'">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="concat('  4. ',//ka:Hakutoive_4Tyyppi/text(),', ',//ka:Hakutoive_4Alue/text())"/></fo:inline>
												</xsl:if>
												<xsl:if test="//ka:Hakutoive_5Tyyppi != '-'">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="concat('  5. ',//ka:Hakutoive_5Tyyppi/text(),', ',//ka:Hakutoive_5Alue/text())"/></fo:inline>
												</xsl:if>
										</fo:block>
											</fo:block-container>
										</fo:table-cell>
									</fo:table-row>
							<fo:table-row>
								<fo:table-cell number-columns-spanned="5" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
									<fo:block-container>
										<fo:block widows="2" orphans="2" font-family="Helvetica" language="fi-FI" font-size="10pt">
											<fo:inline font-weight="normal">
												<fo:leader/>
											</fo:inline>
										</fo:block>
										<fo:block font-family="Helvetica" language="fi-FI" font-weight="normal" widows="1" orphans="1" font-size="10pt" color="#444444" letter-spacing="1">
											<fo:inline>
												<fo:leader leader-length="0pt"/>LISÄTIEDOT</fo:inline>
										</fo:block>
									</fo:block-container>
								</fo:table-cell>
							</fo:table-row>
									<fo:table-row>
										<fo:table-cell number-columns-spanned="3" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Lapsen terveydentila</fo:inline>
												</fo:block>
										<fo:block font-family="Helvetica" font-weight="normal" font-size="10pt" language="fi-FI" widows="1" orphans="1">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Lisatiedot_Terveydentila/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="2" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Kotieläimet</fo:inline>
												</fo:block>
										<fo:block font-family="Helvetica" font-weight="normal" font-size="10pt" language="fi-FI" widows="1" orphans="1">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Lisatiedot_Kotielaimet/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
									</fo:table-row>
									<fo:table-row>
										<fo:table-cell number-columns-spanned="3" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Lisätietoja</fo:inline>
												</fo:block>
										<fo:block font-family="Helvetica" font-weight="normal" font-size="10pt" language="fi-FI" widows="1" orphans="1">
													<fo:inline font-size="10pt" font-weight="normal">
												<xsl:value-of select="//ka:Lisatiedot_Lisatietoja/text()"/></fo:inline>
												</fo:block>
											</fo:block-container>
										</fo:table-cell>
										<fo:table-cell number-columns-spanned="2" border-top-style="solid" border-top-color="#000000" border-top-width="0pt" border-bottom-style="solid" border-bottom-color="#000000" border-bottom-width="0pt" border-left-style="solid" border-left-color="#000000" border-left-width="0pt" border-right-style="solid" border-right-color="#000000" border-right-width="0pt">
											<fo:block-container>
												<fo:block widows="1" orphans="1" font-family="Helvetica" font-size="10pt"  font-weight="normal" language="fi-FI" text-align="left" text-indent="0pt" color="#666666">
													<fo:inline>
														<fo:leader leader-length="0pt"/>Hyväksyy korkeimman päivähoitomaksun</fo:inline>
												</fo:block>
										<fo:block font-family="Helvetica" font-weight="normal" font-size="10pt" language="fi-FI" widows="1" orphans="1">
											<xsl:choose>
												<xsl:when test="//ka:Lisatiedot_MaksuKylla = 'true'">
													<fo:inline id="Paivahoitomaksu0"/>
													<fo:inline font-size="10pt" font-weight="normal">
														<fo:leader leader-length="0pt"/>Kyllä
														</fo:inline>
												</xsl:when>
												<xsl:when test="//ka:Lisatiedot_MaksuEi = 'true'">
													<fo:inline id="Paivahoitomaksu1"/>
													<fo:inline font-size="10pt" font-weight="normal">
														<fo:leader leader-length="0pt"/>Ei</fo:inline>
												</xsl:when>
											</xsl:choose>
										</fo:block>
											</fo:block-container>
										</fo:table-cell>
									</fo:table-row>
						</fo:table-body>
					</fo:table>
					<fo:block id="idroot_2_0"/>
				</fo:flow>
			</fo:page-sequence>
		</fo:root>
	</xsl:template>
</xsl:stylesheet>
