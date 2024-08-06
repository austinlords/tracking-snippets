/** PARENT WINDOW */

window.addEventListener("message", function listenForIframeEvents(event) {
  const isTrackingMessage =
    event.origin.includes("CLIENTWEBSITE.COM") &&
    event.data?.type === "tracking";

  if (!isTrackingMessage) return; // do nothing

  const { measurementId, eventName, parameters } = event.data;

  try {
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag() {
        window.dataLayer.push(arguments);
      };

    // send event to Google Analytics
    if (measurementId) {
      gtag("event", eventName, {
        send_to: measurementId,
        ...parameters
      });
    }

    // push event to GTM dataLayer, to support other tracking platforms
    window.dataLayer.push({ event: eventName, measurementId, ...parameters });
  } catch (error) {
    console.warn("Could not track event from CLIENTWEBSITE.COM iframe");
  }
});

/** IFRAME */

// Track events from iframe, or if opened as top window
const isIframe = window !== window.top;

/** Reuse this event everywhere you want to track GA4 events
 *
 * @param eventName {string} The name of the event
 * @param measurementId {string} The GA4 measurement ID
 * @param parameters {Record<string, string | number>} The parameters to send with the event
 */
function trackEvent(eventName, measurementId, parameters) {
  if (isIframe) {
    const trackingEvent = {
      type: "tracking",
      eventName,
      measurementId,
      parameters
    };

    window.parent.postMessage(trackingEvent, "*");
  } else {
    // send event to Google Analytics
    // "gtag" and "dataLayer" should be available on the top window from the "loadGtag" function
    if (measurementId) {
      gtag("event", eventName, {
        send_to: measurementId,
        ...parameters
      });
    }

    // push event to GTM dataLayer, to support other tracking platforms
    window.dataLayer.push({ event: eventName, measurementId, ...parameters });
  }
}

// Initialize GA4 tracking, only necessary on top window
if (isIframe) {
  // No need to initialize GA4 tracking in the iframe,
  // because we are posting to parent window
} else {
  function loadGtag(measurementId) {
    var gtagScript = document.createElement("script");
    gtagScript.async = true;
    gtagScript.src =
      "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
    document.head.appendChild(gtagScript);

    // Initialize the dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag; // Make gtag function globally available

    gtag("js", new Date());
    gtag("config", measurementId);
  }

  // Example usage, make sure you fetch client Measurement ID first from your server
  loadGtag("G-XXXXXXXXXX");
}
