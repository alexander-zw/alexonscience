/* eslint-disable no-console */
/**
 * Run this script from the root directory to prerender the entire website to
 * the public/ directory. It is automatically run in the deployment script.
 *
 * The data and functions used by this script are the same as those in
 * src/components/subcomponents/AllViews.ts, but I couldn't figure out how to
 * import that here to be compatible with CommonJS, so I just duplicated them.
 *
 * Note that this script does not remove existing files in public/. This means
 * that if you remove a URL, you need to manually delete it in the public/
 * directory (though if you don't, the site will still work).
 */
const fs = require("fs");

function getTitle(view) {
    return `${view.name} | ALEX on Science`;
}

function getURL(view) {
    return `https://alexonscience.com${view.path}`;
}

const allViews = require("./all_views_meta.json");

console.log(`Found ${allViews.length} views, prerendering...`);

allViews.forEach((view) => {
    // Home is not included in the JSON file, but just in case, we're double
    // checking here that we don't overwrite public/index.html.
    if (view.path == "/") {
        return;
    }

    const title = getTitle(view);
    const url = getURL(view);
    const ogImage = view.image ? view.image : "/preview.jpg";
    const file_content = `<!DOCTYPE html>
<html lang="en">
    <head>
        <title>${title}</title>
        <meta name="description" content="${view.description}" />
        <meta name="keywords" content="${view.keywords}" />
        <meta name="author" content="Alexander Wu" />
        <link rel="canonical" href="${url}" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content="${title}" />
        <meta property="og:image" content="${ogImage}" />
        <meta property="og:url" content="${url}" />
        <meta property="og:description" content="${view.description}" />

        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />

        <script type="text/javascript">
            var botPattern =
                "(googlebot\\/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|\
Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|\
nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|\
seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|\
UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|\
yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|\
purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|\
turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|\
discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|\
Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|\
aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|\
careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|\
openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|\
content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|\
siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|\
CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|\
CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|\
SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|\
Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|\
BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|\
lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
            var re = new RegExp(botPattern, "i");
            var userAgent = navigator.userAgent;
            if (!re.test(userAgent)) {
                var segmentCount = 0;
                var l = window.location;
                l.replace(
                    l.protocol + "//" + l.hostname + (l.port ? ":" + l.port : "") +
                    l.pathname.split("/").slice(0, 1 + segmentCount).join("/") +
                    "/?p=/" +
                    l.pathname.slice(1).split("/").slice(segmentCount).join("/").replace(/&/g, \
"~and~") +
                    (l.search ? "&q=" + l.search.slice(1).replace(/&/g, "~and~") : "") + l.hash
                );
            }
        </script>
    </head>
    <body></body>
</html>
`;

    const filepath = `public${view.path}`;
    if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath);
    }
    const filename = `${filepath}/index.html`;
    fs.writeFile(filename, file_content, function (err) {
        if (err) throw err;
        console.log(`Written to file ${filename}`);
    });
});
