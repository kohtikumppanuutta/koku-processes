<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:ka="http://www.arcusys.fi/TAMPERE/Paivahoitohakemus">
	<xsl:output method="html" />
	<xsl:template match="/">
		<html>

			<!-- ****************************HEADER**************************** -->
			<head>
				<title>KOKU-Päivähoitohakemus</title>
				<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
				<style type="text/css">
					body{
						background-color:#ffffff;
						font-size:13px;
						font-family:Arial, Helvetica, sans-serif;
						color:#666666;
					}
					a{
						text-decoration:none;
						color:#25aae1;
					}
					a:hover {
						color:#0089c1;
					}
					.kokoelmavalinta{
					}
					a.tieto {
					cursor:pointer;
					text-transform:uppercase;
					padding: 2px 0;
					display:block;
					}
					a.small {
					font-size: 11px;
					margin-top: -21px;
					padding-bottom: 10px;
					padding-left: 310px;
					text-transform: none;
					}
					a.tieto .sulje{
					display:none;
					}
					a.active .sulje{
					display:inline;
					font-size: 11px;
					text-transform: none;
					float:right;
					}
					.tietokentta {
					padding:5px 0 30px
					0;
					border-bottom:1px solid #999999;
					margin-bottom:10px;
					color:#666666;
					}
					.tallenna {
					float:right;
					}
					.choose{
					color: #666666;
					float: left;
					padding-top: 3px;
					white-space: nowrap;
					width: 177px;
					}
					.pvm {
					display:block;
					margin-top:10px;
					margin-bottom:3px;
					color:#666666;
					}
					.uusi {
					display:block;
					margin-top:5px;
					margin-bottom:3px;
					color:#666666;
					}
					.tagit {
					display: block;
					font-size:
					11px;
					margin-top: 3px;
					text-transform: uppercase;
					}
					.tagit a{
					color:
					#666666;
					}
					.tagit a:hover{
					color: #444444;
					}
					img {
					border:0;
					}
					#navigation
					a{
					text-decoration:none;
					color:#666666;
					}
					#navigation a:hover,
					#navigation .current {
					color:#25aae1;
					}
					#navigation ul.child{

					}
					#navigation ul.open{
					display:inline;
					}

					#page {
					margin:40px auto;
					width:961px;
					background-color:#ffffff;
					display:block;
					height: 700px;
					padding: 20px 0;
					}
					#navigation {
					padding:0 10px;
					float:left;
					width:189px;
					border-right: 1px solid #999999;
					height:500px;
					}
					.center {
					padding:2px 15px;
					float:left;
					width:500px;
					border-right: 1px solid
					#999999;
					height:500px;
					}
					.wide {
					padding:2px 15px;
					float:left;
					width:720px;
					height:500px;
					}
					#right-column {
					padding:50px 15px 0 15px;
					float:left;
					width:189px;
					}
					ul {
					list-style:none;
					padding:0;
					margin:0;
					}
					li
					{
					line-height: 15px;
					margin: 0 0 0 10px;
					padding: 3px 0;
					}
					#right-column .main li {
					margin:0;
					}
					.main {
					width: 650px;	
					}
					.add {
					height: 80px;
					width: 716px;
					color: #262626;
					}

					#navigation .main li, #right-column .main li {
					text-transform:uppercase;
					}
					#navigation .child li, #right-column
					.child li {
					text-transform:none;
					}
					h1{
					margin:12px 0;
					font-weight:normal;
					font-size:24px;
					text-transform: uppercase;
					}
h2 {
    background-color: #25AAE1;
    color: #FFFFFF;
    font-size: 16px;
    font-weight: normal;
    margin: 12px 0;
    padding: 8px 15px;
    text-transform: uppercase;
}
					h3 {
					padding:0;
					margin:10px 0;
					font-weight:normal;
					font-size: 13px;
					}
.innerContent h4 {
    font-size: 13px;
    font-weight: normal;
    margin: 0;
    padding-left: 15px;
}

					.line {
					border-bottom:1px solid
					#999999;
					}
					table{
					color:#666666;
					border-spacing:0;
					}
					table .otsikko td{
					padding-bottom:10px;
					}
div .f {
    padding-left:15px;
}
.datatable {
    /*background-color: #FFFFFF;*/
    width: 325px;
    float: left;
}
.datatableMuutLapset {
    /*background-color: #FFFFFF;*/
    width: 215px;
    float: left;
}

					td{
					padding:0;
					vertical-align:top;
					}
					table .new{
					color:#25AAE1;
					}
					div .old .oldbold .oldBoldInline a{
					color:#666666;
					}
					.oldBold .oldBoldInline{
					font-weight: bold;
					}
					.oldBoldInline{
					font-weight: bold;
					display: inline;
					}
					div .old a:hover{
					color:#444444;
					}
					table .check{
					width:50px;
					text-align:center;
					}
					table .send{
					width:230px;
					}
					table .item{
					width:350px;
					}
					table .time{
					width:90px;
					text-align:center;
					}

					.viestintiedot {
					color:#666666;
					}
					input.person{
					margin-bottom:2px;
					width:300px
					}
					.viestintiedot .add {
					height: 280px;
					width: 712px;
					}
					.viesti span{
					color:#666666;
					}

					.takaisin {
					display: inline;
					float:
					right;
					font-size: 11px;
					text-transform: none;
					}
					.viestintiedot .pyynto
					{
					height: 80px;
					width: 99%;
					}
					.wait {
						color:#cccccc;
					}
					table th{
						font-weight:normal;
						text-align:left;
						padding-bottom: 5px;
					}
					.kokoelma {
						font-size:16px;
					}
					.kirjaaja {
						float:right;
						font-size: 13px;
					}
					.kirjaus{
						margin-bottom:20px;
					}
					h3.kks {
					border-top:1px solid #cccccc;
					padding-top:10px;
					}
					.clear{
					color:#cccccc;
					padding-right:8px;
					}
					.chosen{
					color:#262626;
					padding-right:8px;
					}
					p {
  					  padding-left:15px;
					}
</style>
			
			<!-- ****************************BODY**************************** -->
			<body>
				<h1 id="Header"></h1>
				<div class="Content1">
					<h1>PÄIVÄHOITOHAKEMUS</h1>
				</div>
				<div class="main">

					<h2 class="old">HAKEMUKSEN TIEDOT</h2>
					<p>Hakemuksen tyyppi</p>
					<i><xsl:value-of select="//ka:Tyyppi_Tyyppi/text()"/></i>

					<h2 class="old">LAPSEN TIEDOT</h2>
					<p>Lapsi, jolle palvelua haetaan</p>
					<i><xsl:value-of select="//ka:Lapsi_Valittu/text()"/></i>

					<h2 class="old">HUOLTAJAN TIEDOT</h2>
					<div class="datatable">
						<p>Sukunimi</p>
						<i><xsl:value-of select="//ka:Huoltaja_Sukunimi/text()"/></i>
					</div>
					<div class="datatable">
						<p>Etunimet</p>
						<i><xsl:value-of select="//ka:Huoltaja_Etunimi/text()"/></i>
					</div>
<div style="clear:both;"></div>
					<div class="datatable">
					<p>Henkilötunnus</p>
					<i><xsl:value-of select="//ka:Huoltaja_Henkilotunnus/text()"/></i>
					</div>
					<div class="datatable">
					<p>Sähköpostiosoite</p>
					<i><xsl:value-of select="//ka:Huoltaja_Sahkopostiosoite/text()"/></i>
					</div>
<div style="clear:both;"></div>
					<div class="datatable">
					<p>Puhelin</p>
					<i><xsl:value-of select="//ka:Huoltaja_Puhelin/text()"/></i>
					</div>
					<div class="datatable">
					<p>Puhelin (työ)</p>
					<i><xsl:value-of select="//ka:Huoltaja_Matkapuhelin/text()"/></i>
					</div>
<div style="clear:both;"></div>
					<div class="datatable">
					<p>Ammatti</p>
					<i><xsl:value-of select="//ka:Huoltaja_Ammatti/text()"/></i>
					</div>
					<div class="datatable">
					<p>Työpaikka / oppilaitos</p>
					<i><xsl:value-of select="//ka:Huoltaja_Tyopaikka/text()"/></i>
					</div>
<div style="clear:both;"></div>
					<div class="datatable">
					<p>Työpaikan osoite</p>
					<i><xsl:value-of select="//ka:Huoltaja_TyopaikanOsoite/text()"/></i>
					</div>
					<div class="datatable">
					<p>Työaika</p>
					<xsl:if test="//ka:Huoltaja_VuorotyoKylla = 'true'" >
					<i>Vuorotyö</i>
					</xsl:if>
					<xsl:if test="//ka:Huoltaja_VuorotyoEi = 'true'" >
					<i>Säännöllinen työaika</i>
					</xsl:if>
					</div>
<div style="clear:both;"></div>
					<div class="datatable">
					<p>Työaika alkaa</p>
					<i><xsl:value-of select="//ka:Huoltaja_TyoaikaAlkaa/text()"/></i>
					</div>
					<div class="datatable">
					<p>Työaika loppuu</p>
					<i><xsl:value-of select="//ka:Huoltaja_TyoaikaLoppuu/text()"/></i>
					</div>
					<div style="clear:both;"></div>
					<h2 class="old">RUOKAKUNNAN TOISEN VANHEMMAN / AIKUISEN TIEDOT</h2>
					
					<div class="datatable">
					<p>Sukunimi</p>
					<i><xsl:value-of select="//ka:Puoliso_Sukunimi/text()"/></i>
					</div>
					<div class="datatable">
					<p>Etunimet</p>
					<i><xsl:value-of select="//ka:Puoliso_Etunimi/text()"/></i>
					</div>
<div style="clear:both;"></div>
					<div class="datatable">
					<p>Henkilötunnus</p>
					<i><xsl:value-of select="//ka:Puoliso_Henkilotunnus/text()"/></i>
					</div>
					<div class="datatable">
					<p>Sähköpostiosoite</p>
					<i><xsl:value-of select="//ka:Puoliso_Sahkopostiosoite/text()"/></i>
					</div>
<div style="clear:both;"></div>
					<div class="datatable">
					<p>Puhelin</p>
					<i><xsl:value-of select="//ka:Puoliso_Puhelin/text()"/></i>
					</div>
					<div class="datatable">
					<p>Puhelin (työ)</p>
					<i><xsl:value-of select="//ka:Puoliso_Matkapuhelin/text()"/></i>
					</div>
<div style="clear:both;"></div>
					<div class="datatable">
					<p>Ammatti</p>
					<i><xsl:value-of select="//ka:Puoliso_Ammatti/text()"/></i>
					</div>
					<div class="datatable">
					<p>Työpaikka / oppilaitos</p>
					<i><xsl:value-of select="//ka:Puoliso_Tyopaikka/text()"/></i>
					</div>
<div style="clear:both;"></div>
					<div class="datatable">
					<p>Työpaikan osoite</p>
					<i><xsl:value-of select="//ka:Puoliso_TyopaikanOsoite/text()"/></i>
					</div>
					<div class="datatable">
					<p>Työaika</p>
					<xsl:if test="//ka:Puoliso_VuorotyoKylla = 'true'" >
					<i>Vuorotyö</i>
					</xsl:if>
					<xsl:if test="//ka:Puoliso_VuorotyoEi = 'true'" >
					<i>Säännöllinen työaika</i>
					</xsl:if>
					</div>
<div style="clear:both;"></div>
					<div class="datatable">
					<p>Työaika alkaa</p>
					<i><xsl:value-of select="//ka:Puoliso_TyoaikaAlkaa/text()"/></i>
					</div>
					<div class="datatable">
					<p>Työaika päättyy</p>
					<i><xsl:value-of select="//ka:Puoliso_TyoaikaLoppuu/text()"/></i>
					</div>
<div style="clear:both;"></div>

					<h2 class="old">PERHEEN MUUT KOTONA ASUVAT ALLE 18-VUOTIAAT LAPSET</h2>

					<div class="datatableMuutLapset">
					<p>Etunimi</p>
					</div>
					<div class="datatableMuutLapset">
					<p>Sukunimi</p>
					</div>
					<div class="datatableMuutLapset">
					<p>Henkilötunnus</p>
					</div>
<div style="clear:both;"></div>
					<xsl:for-each select="//ka:MuutLapset">
					<div class="datatableMuutLapset">
					<i><xsl:value-of select="ka:MuutLapset_Etunimi/text()"/></i>
					</div>
					<div class="datatableMuutLapset">
					<i><xsl:value-of select="ka:MuutLapset_Sukunimi/text()"/></i>
					</div>
					<div class="datatableMuutLapset">
					<i><xsl:value-of select="ka:MuutLapset_Henkilotunnus/text()"/></i>
					</div>
<div style="clear:both;"></div>
					</xsl:for-each>

					<h2 class="old">HOIDON TARVE</h2>

					<div class="datatable">
					<p>Haettava hoito</p>
					<xsl:if test="//ka:HoidonTarve_Kokopaiva = 'true'" >
					<i>Kokopäivähoito</i>
					</xsl:if>
					<xsl:if test="//ka:HoidonTarve_Iltahoito = 'true'" >
					<i>Iltahoito (6:00 - 22:00)</i>
					</xsl:if>
					<xsl:if test="//ka:HoidonTarve_Vuorohoito = 'true'" >
					<i>Vuorohoito</i>
					</xsl:if>
					<xsl:if test="//ka:HoidonTarve_Osapaiva = 'true'" >
					<i>Osapäivähoito</i>
					</xsl:if>
					<xsl:if test="//ka:HoidonTarve_Leikkitoiminta = 'true'" >
					<i>Leikkitoiminta / Kerho</i>
					</xsl:if>
					</div>
					<div class="datatable">
					<p>Hoitopäivät kuukaudessa</p>
					<i><xsl:value-of select="//ka:HoidonTarve_Hoitopaivat/text()"/></i>
					</div>
<div style="clear:both;"></div>
					<div class="datatable">
					<p>Hoidon tarve alkaen</p>
					<i><xsl:value-of select="//ka:HoidonTarve_Alkaen/text()"/></i>
					</div>
					<div class="datatable">
					<p>Auto käytettävissä</p>
					<xsl:if test="//ka:HoidonTarve_AutoKylla = 'true'" >
					<i>Kyllä
					<xsl:if test="//ka:HoidonTarve_Kuljetusmahdollisuus = 'true'" >
					, kuljetusmahdollisuus
					</xsl:if>
					</i>
					</xsl:if>
					<xsl:if test="//ka:HoidonTarve_AutoEi = 'true'" >
					<i>Ei</i>
					</xsl:if>
					</div>
<div style="clear:both;"></div>
					<h2 class="old">HAKUTOIVE</h2>

					<div class="datatableMuutLapset">
					<p>Alue</p>
					<i><xsl:value-of select="//ka:Hakutoive_1Kunta/text()"/></i>
					</div>
					<div class="datatableMuutLapset">
					<p>1. Hakutoive</p>
					<i><xsl:value-of select="//ka:Hakutoive_1Tyyppi/text()"/></i>
					</div>
					<div class="datatableMuutLapset">
					<p>Hoitopaikka / alue</p>
					<i><xsl:value-of select="//ka:Hakutoive_1Alue/text()"/></i>
					</div>
<div style="clear:both;"></div>
					<div class="datatableMuutLapset">
					<p>Alue</p>
					<i><xsl:value-of select="//ka:Hakutoive_2Kunta/text()"/></i>
					</div>
					<div class="datatableMuutLapset">
					<p>2. Hakutoive</p>
					<i><xsl:value-of select="//ka:Hakutoive_2Tyyppi/text()"/></i>
					</div>
					<div class="datatableMuutLapset">
					<p>Hoitopaikka / alue</p>
					<i><xsl:value-of select="//ka:Hakutoive_2Alue/text()"/></i>
					</div>
<div style="clear:both;"></div>
					<div class="datatableMuutLapset">
					<p>Alue</p>
					<i><xsl:value-of select="//ka:Hakutoive_3Kunta/text()"/></i>
					</div>
					<div class="datatableMuutLapset">
					<p>3. Hakutoive</p>
					<i><xsl:value-of select="//ka:Hakutoive_3Tyyppi/text()"/></i>
					</div>
					<div class="datatableMuutLapset">
					<p>Hoitopaikka / alue</p>
					<i><xsl:value-of select="//ka:Hakutoive_3Alue/text()"/></i>
					</div>
<div style="clear:both;"></div>
					<div class="datatableMuutLapset">
					<p>Alue</p>
					<i><xsl:value-of select="//ka:Hakutoive_4Kunta/text()"/></i>
					</div>
					<div class="datatableMuutLapset">
					<p>4. Hakutoive</p>
					<i><xsl:value-of select="//ka:Hakutoive_4Tyyppi/text()"/></i>
					</div>
					<div class="datatableMuutLapset">
					<p>Hoitopaikka / alue</p>
					<i><xsl:value-of select="//ka:Hakutoive_4Alue/text()"/></i>
					</div>
<div style="clear:both;"></div>
					<div class="datatableMuutLapset">
					<p>Alue</p>
					<i><xsl:value-of select="//ka:Hakutoive_5Kunta/text()"/></i>
					</div>
					<div class="datatableMuutLapset">
					<p>5. Hakutoive</p>
					<i><xsl:value-of select="//ka:Hakutoive_5Tyyppi/text()"/></i>
					</div>
					<div class="datatableMuutLapset">
					<p>Hoitopaikka / alue</p>
					<i><xsl:value-of select="//ka:Hakutoive_5Alue/text()"/></i>
					</div>
<div style="clear:both;"></div>
					<h2 class="old">LISÄTIEDOT</h2>

					<p>Lapsen terveydentila ja erityistarpeet</p>
					<i><xsl:value-of select="//ka:Lisatiedot_Terveydentila/text()"/></i>

				</div>
			</body>
		</head>
	</html>
			
</xsl:template>
</xsl:stylesheet>

