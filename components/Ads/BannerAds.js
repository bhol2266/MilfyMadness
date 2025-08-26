import Script from "next/script";


function BannerAds() {

    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
    return (
        <div className="">


            {/* Traffic Stars */}
            {/* <Script
                type="text/javascript"
                src="//cdn.tsyndicate.com/sdk/v1/bi.js"
                data-ts-spot="6827902fa6624d0aa77559c3a5d4fadb"
                data-ts-width="300"
                data-ts-height="250"
                data-ts-extid="{extid}"
                async
                defer
            /> */}



            {/* Adcash */}
            <Script id="banner-script" strategy="afterInteractive">
                {`
          aclib.runBanner({
            zoneId: '10331322',
          });
        `}
            </Script>





        </div>
    )
}

export default BannerAds;
