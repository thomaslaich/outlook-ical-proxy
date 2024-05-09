import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

export async function OutlookProxy(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  // Initialize Azure Key Vault client
  const vaultName = "utilities-func-keyvault";
  const keyVaultUrl = `https://${vaultName}.vault.azure.net`;
  const credential = new DefaultAzureCredential();
  const secretClient = new SecretClient(keyVaultUrl, credential);

  // Fetch the Outlook iCal endpoint URL from Key Vault
  const secretName = "outlook-ical-endpoint";
  const secret = await secretClient.getSecret(secretName);
  const outlookICalEndpoint = secret.value;

  const response = await fetch(outlookICalEndpoint);
  const calendarData = await response.text();
  const updatedCalendarData = calendarData
    .replace(/Central Europe Standard Time/g, "Europe/Zurich")
    .replace(/W. Europe Standard Time/g, "Europe/Zurich");

  return {
    headers: {
      "Content-Type": "text/calendar",
    },
    body: updatedCalendarData,
  };
}

app.http("OutlookProxy", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: OutlookProxy,
});
