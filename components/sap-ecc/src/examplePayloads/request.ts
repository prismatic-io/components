export const sendSoapRequestExamplePayload = {
  data: `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RFC_READ_TABLE.Response xmlns="urn:sap-com:document:sap:rfc:functions">
      <DATA>
        <item>
          <WA>001|Material A|Active</WA>
        </item>
        <item>
          <WA>002|Material B|Active</WA>
        </item>
      </DATA>
      <FIELDS>
        <item>
          <FIELDNAME>MATNR</FIELDNAME>
          <OFFSET>000</OFFSET>
          <LENGTH>003</LENGTH>
          <TYPE>C</TYPE>
          <FIELDTEXT>Material Number</FIELDTEXT>
        </item>
      </FIELDS>
    </RFC_READ_TABLE.Response>
  </soap:Body>
</soap:Envelope>`,
};
