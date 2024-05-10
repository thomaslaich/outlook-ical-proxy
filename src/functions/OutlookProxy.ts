import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

export async function OutlookProxy(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  console.log("envs", process.env);

  // Initialize Azure Key Vault client
  const outlookICalEndpoint = process.env.OUTLOOK_ICAL_ENDPOINT;

  const response = await fetch(outlookICalEndpoint);
  const calendarData = await response.text();
  const updatedCalendarData = calendarData
    .replace(/Central Europe Standard Time/g, "Europe/Zurich")
    .replace(/W\. Europe Standard Time/g, "Europe/Zurich");

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
