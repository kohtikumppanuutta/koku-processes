<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:ka="http://soa.kv.koku.arcusys.fi/">
	<xsl:output method="html" />
	
	<xsl:param name="Vastaanottaja" />
	
	<xsl:template match="/">
		<html>

			<!-- ****************************HEADER**************************** -->
			<head>
				<title>KOKU-Käyttäjäviestintä</title>
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
					<h1>KÄYTTÄJÄVIESTINTÄ</h1>
				</div>
				<div class="main">
					<h2 class="old">LÄHETTÄJÄ</h2>
					<p><xsl:value-of select="//ka:Message_FromUser/text()"/></p>
					<h2 class="old">VASTAANOTTAJA</h2>
							<p><xsl:value-of select="$Vastaanottaja"/></p>
								<!--<xsl:if test="position()!=count(//ka:receipients)">-->
								<!--</xsl:if>-->
					<div class="innerContent">
						<h2 class="old"><xsl:value-of select="//ka:Message_Subject/text()"/></h2>
					</div>
					<div class="innerContent">
						<div class="old"><p><xsl:value-of select="//ka:Message_Content/text()"/></p></div>
					</div>
				</div>
			</body>
		</head>
	</html>
			
</xsl:template>
</xsl:stylesheet>
