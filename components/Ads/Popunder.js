
import Script from "next/script";
import { isMembershipActive } from "../../config/utils"; // assume this returns boolean

function PopunderAds() {
    let currentHost = '';
    let showAds = false;

    if (typeof window !== "undefined") {
        currentHost = window.location.host;
        const isLocalhost = currentHost.includes('localhost');
        const membershipActive = isMembershipActive();

        showAds = !isLocalhost && !membershipActive;
    }

    return (
        <div className="flex items-center justify-center">
            {showAds && (

                //Traffic Stars
                // <Script
                //     type="text/javascript"
                //     src="//cdn.tsyndicate.com/sdk/v1/p.js"
                //     data-ts-spot="ec5a5c1836ba4a4190655a3ba8fa1776"
                //     data-ts-extid="{extid}"
                //     data-ts-session-duration="300"
                //     data-ts-count="5"
                //     data-ts-mode="selective"
                //     data-ts-ignore-filter="block_popunder"
                //     async
                //     defer
                // />
   

                //Adcash
                <Script id="popunder-script" strategy="afterInteractive">
                    {`
    aclib.runPop({
      zoneId: '10331262',
      targetElementsCssSelector: '.block_popunder',
      triggerOnTargetElementsClick: false
    });
  `}
                </Script>

            )}
        </div>
    );
}

export default PopunderAds;

