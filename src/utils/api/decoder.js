/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
export var decode = (url, content) => {
    var server = getServer(url, content);
    return server;
};

export var DeServers = [
    // rq=0 get rq=1 post rq=3 webview
    { 'name': "mp4upload", 'shorten': "MD", 'v': 15, 'optional': true },
    { 'name': "vidlox", 'shorten': "VL", 'v': 15, 'optional': true },
    { 'name': "vidoza", 'shorten': "VA", 'v': 15, 'optional': true },
    { 'name': "onlystream", 'shorten': "OS", 'v': 15, 'optional': true },
    { 'name': "vk.com", 'shorten': "RK", 'v': 15, 'optional': true },
    { 'name': "cloudvideo", 'shorten': "CV", 'hls': 1, 'v': 18, 'optional': true },
    { 'name': "fembed", 'shorten': "FD", 'rq': 1, 'v': 18, 'optional': true },
    { 'name': "mixdrop", 'shorten': "MP", 'v': 18, 'optional': true },
    { 'name': "jawcloud", 'shorten': "JC", 'hls': 1, 'headers': { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0' }, 'v': 18, 'optional': true },
    { 'name': "clipwatching", 'shorten': "CL", 'v': 18, 'optional': true },
    { 'name': "mediafire", 'shorten': "MF", 'v': 19, 'optional': true },
    { 'name': "fastplay", 'shorten': "FP", 'hls': 1, 'v': 19, 'optional': true },
    { 'name': "mystream", 'shorten': "MS", 'rq': 2, 'v': 28, 'optional': true },
    //  {'name': "vidfast", 'shorten': "VF", 'hls': 1, 'v': 18},
    //  {'name': "vidsat", 'shorten': "VS", 'hls': 1, 'v': 18},
];

export function getServer(url, content) {
    if (url.includes("facebook.com")) {
        return facebook(url, content);
    }
    if (url.includes("ok.ru")) {
        return okru(url, content);
    }
    if (url.includes("mixdrop")) {
        return mixdrop(url, content);
    }
    if (url.includes("mp4upload")) {
        return mp4upload(url, content);
    }
    if (url.includes("vidlox")) {
        return vidlox(url, content);
    }
    if (url.includes("vidoza")) {
        return vidoza(url, content);
    }
    if (url.includes("onlystream")) {
        return Onlystream(url, content);
    }
    if (url.includes("vk.com")) {
        return vk(url, content);
    }
    if (url.includes("cloudvideo")) {
        return cloudvideo(url, content);
    }
    if (url.includes("fembed")) {
        return fembed(url, content);
    }
    if (url.includes("jawcloud")) {
        return jawcloud(url, content);
    }
    if (url.includes("clipwatching")) {
        return clipwatching(url, content);
    }
    if (url.includes("mediafire")) {
        return Mediafire(url, content);
    }
    if (url.includes("fastplay")) {
        return fasttoplay(url, content);
    }
    if (url.includes("mystream")) {
        return MyStream(url, content);
    }
    /* if(url.includes("vidfast")){
         return vidfast(url,content);
     }
     if(url.includes("vidsat")){
         return vidsat(url,content);
     }*/
}


export function facebook(url, content) {
    var urls = []

    var myRegEx = /(hd|sd)_src:"([^"]*)"/g;
    var matches = getMatches(content, myRegEx, 2);
    var labels = getMatches(content, myRegEx, 1); // either "hd" or "sd"

    urls = matches.map(url => htmlDecode(url))

    var lo = getLocation(url);
    return {

        "url": url,
        "host": lo.hostname,
        "urls": urls,
        "labels": labels

    }
}

export function Solidfiles(url, content) {
    var urls = [];

    var myRegEx = /streamUrl":"(.*.)","nodeName/g;
    var matches = getMatches(content, myRegEx, 1);
    var link = matches[0];
    urls.push(link);

    var lo = getLocation(url);
    return {

        "type": 10,
        "url": url,
        "host": lo.hostname,
        "urls": urls

    }
}

export function MyStream(url, content) {
    var urls = [];

    var myRegEx = /src="(https:\/\/.*.mstreamcdn\.com.*?\.mp4)">/g;
    var matches = getMatches(content, myRegEx, 1);
    for (var i = 0; i < matches.length; i++) {
        if (matches[i] !== undefined) {

            var link = matches[i];

            urls.push(link);
        }
    }

    var lo = getLocation(url);
    return {

        "type": 10,
        "url": url,
        "host": lo.hostname,
        "urls": urls

    }
}

export function Mediafire(url, content) {
    var urls = [];

    var myRegEx = /href="(https?:\/\/download\d{1,6}\.mediafire\.com.*?\.mp4)"/g;
    var matches = getMatches(content, myRegEx, 1);
    for (var i = 0; i < matches.length; i++) {
        if (matches[i] !== undefined) {

            var link = matches[i];

            urls.push(link);
        }
    }

    var lo = getLocation(url);
    return {

        "type": 0,
        "url": url,
        "host": lo.hostname,
        "urls": urls

    }
}

export function fasttoplay(url, content) {
    var urls = [];
    var myRegEx = /file:"(https.*?),.urlset\/master.m3u8"/g;
    var matches = getMatches(content, myRegEx, 1)[0].replace('\\', '');
    var matches2 = matches.split(",")

    for (var i = 1; i < matches2.length; i++) {
        var links = matches2[0] + matches2[i] + '/index-v1-a1.m3u8';
        if (links[i] !== undefined && !links.includes("window.jawplayer")) {
            urls.push(links);
        }
    }

    var lo = getLocation(url);

    return {
        "type": 10,
        "url": url,
        "host": lo.hostname,
        "urls": urls

    }
}

export function mixdrop(url, content) {
    var urls = [];
    var myRegEx = /\s+?(eval\(function\(p,a,c,k,e,d\).+)\s+?/g;
    var matches = getMatches(content, myRegEx, 1);
    if (detect(matches[0])) {
        var unpacked = unpack(matches[0]);
        var link = "https:" + getMatches(unpacked, /wurl=\"([^\"]+)/g, 1)[0].replace('\\', '');
        urls.push(link);
    }
    var lo = getLocation(url);

    return {
        "type": 5,
        "url": url,
        "host": lo.hostname,
        "urls": urls
    }
}

export function mp4upload(url, content) {
    var urls = [];
    var myRegEx = /script'>(eval.*?).split/g;
    var matches = getMatches(content, myRegEx, 1);
    var m = matches[0] + ".split('|')))";
    if (detect(m)) {
        var unpacked = unpack(m);
        var link = getMatches(unpacked, /src\("([^"]+)/g, 1)[0].replace('\\', '');
        urls.push(link);
    }
    var lo = getLocation(url);

    return {
        "type": 5,
        "url": url,
        "host": lo.hostname,
        "urls": urls
    }
}
export function vidlox(url, content) {
    var urls = [];
    var myRegEx = /sources\s*:\s*\[(.+?)\]/g;
    var matches = getMatches(content, myRegEx, 1);
    var res = matches[0].split("\",\"");
    for (var i = 0; i < res.length; i++) {
        var link = res[i].replace("\"", "");
        if (link.includes(".mp4")) {
            urls.push(link);
        }
    }
    var lo = getLocation(url);
    return {
        "type": 5,
        "url": url,
        "host": lo.hostname,
        "urls": urls
    }
}

export function vidoza(url, content) {
    var urls = [];
    var myRegEx = /sourcesCode\s*:\s*\[(.+?)\]/g;
    var matches1 = getMatches(content, myRegEx, 1);
    var matches2 = getMatches(matches1[0], /(["'].*v.mp4)/g, 1);
    var link = matches2[0].replace("\"", "");
    if (link.includes(".mp4")) {
        urls.push(link);
    }

    var lo = getLocation(url);
    return {
        "type": 5,
        "url": url,
        "host": lo.hostname,
        "urls": urls
    }
}
export function Onlystream(url, content) {
    var urls = [];
    var myRegEx = /(?:updateSrc(?:.*?\"))(.*v.mp4)/g;
    var matches = getMatches(content, myRegEx, 1);
    var link = matches[0];
    if (link.includes(".mp4")) {
        urls.push(link);
    }

    var lo = getLocation(url);
    return {
        "type": 5,
        "url": url,
        "host": lo.hostname,
        "urls": urls
    }
}


export function okru(url, content) {
    var urls = [];
    var myRegEx = /data-options=\"(.*?)\"/g;
    var matches = getMatches(content, myRegEx, 1);
    var json = htmlDecode(matches[0]);
    json = JSON.parse(json).flashvars.metadata;
    json = JSON.parse(json).videos;
    urls = json.map((urlObject) => urlObject.url)

    var lo = getLocation(url);
    return {
        "type": 5,
        "url": url,
        "host": lo.hostname,
        "urls": urls
    }
}

export function vk(url, content) {
    var urls = [];
    var myRegEx = /<source\s*src=\\"(.*?)\\"/g;
    var matches = getMatches(content, myRegEx, 1);
    for (var i = 0; i < matches.length; i++) {
        var link = matches[i].replace(/[\\]/g, '');
        if (link.includes(".mp4")) {
            urls.push(link);
        }
    }
    var lo = getLocation(url);
    return {
        "type": 1,
        "url": url,
        "host": lo.hostname,
        "urls": urls
    }
}
export function cloudvideo(url, content) {

    var urls = [];
    var myRegEx = /source\ssrc="(https:.*?),(.*?),(.*?),[^"]*|source src="([^"]*)/g;
    var matches = myRegEx.exec(content);
    var lo = ""
    if (matches[4]) {
        if (matches[4].includes("v.mp4")) {
            var link = matches[4];
            urls.push(link);
            lo = getLocation(url);
            return {

                "type": 5,
                "url": url,
                "host": lo.hostname,
                "urls": urls
            }
        } else if (matches[4].includes("m3u8")) {
            link = matches[4].replace(/,/g, '');
            urls.push(link);
            lo = getLocation(url);
            return {

                "type": 5,
                "url": url,
                "host": lo.hostname,
                "urls": urls
            }
        }

    } else {
        for (var i = 2; i < matches.length; i++) {
            link = matches[1] + matches[i] + '/index-v1-a1.m3u8';
            if (!link.includes("undefined")) {
                urls.push(link);
            }
        }
        lo = getLocation(url);
        return {

            "type": 4,
            "url": url,
            "host": lo.hostname,
            "urls": urls.reverse()
        }
    }
}
export function fembed(url, content) {
    var urls = [];
    var myArr = JSON.parse(content);
    for (var i = 0; i < myArr['data'].length; i++) {
        var link = myArr['data'][i]['file'];
        if (link) {
            urls.push(link);
        }
    }
    var lo = getLocation(url);
    return {

        "type": 7,
        "url": url,
        "host": lo.hostname,
        "urls": urls.reverse()
    }

}
export function jawcloud(url, content) {
    var urls = [];
    var myRegEx = /source\ssrc="(https:.*?),(.*?),(.*?),[^"]*|source src="([^"]*)/g;
    var matches = myRegEx.exec(content);
    if (matches[4] && matches[4].includes("m3u8")) {
        var link = matches[4].replace(/,/g, '');
        if (!link.includes("window.jawplayer")) {
            urls.push(link);
        }
    } else {
        for (var i = 2; i < matches.length; i++) {
            link = matches[1] + matches[i] + '/index-v1-a1.m3u8';
            if (!link.includes("undefined") && !link.includes("window.jawplayer")) {
                urls.push(link);
            }
        }

    }
    var lo = getLocation(url);
    return {

        "type": 11,
        "url": url,
        "host": lo.hostname,
        "urls": urls.reverse()
    }
}
export function clipwatching(url, content) {
    var urls = [];
    var myRegEx = /"(http.*?\/v\.mp4)"/g;
    var matches = getMatches(content, myRegEx, 1);
    for (var i = 0; i < matches.length; i++) {
        var link = matches[i];
        urls.push(link);
    }
    var lo = getLocation(url);
    return {
        "type": 4,
        "url": url,
        "host": lo.hostname,
        "urls": urls
    }
}
export function vidfast(url, content) {
    var urls = [];

    var myRegEx = /sources:\s\[{file:"(https:.*?),(.*?),(.*?),\.urlset\/master\.m3u8"/g;
    var matches = myRegEx.exec(content);
    for (var i = 2; i < matches.length; i++) {
        var link = matches[1] + matches[i] + '/index-v1-a1.m3u8';
        if (!link.includes("undefined") && !link.includes("window.jawplayer")) {
            urls.push(link);
        }
    }

    var lo = getLocation(url);
    return {

        "type": 7,
        "url": url,
        "host": lo.hostname,
        "urls": urls.reverse()

    }
}
export function vidsat(url, content) {
    var urls = [];

    var myRegEx = /sources:\s\[{file:"(https:.*?),(.*?),(.*?),\.urlset\/master\.m3u8"/g;
    var matches = myRegEx.exec(content);
    for (var i = 2; i < matches.length; i++) {
        var link = matches[1] + matches[i] + '/index-v1-a1.m3u8';
        if (!link.includes("undefined") && !link.includes("window.jawplayer")) {
            urls.push(link);
        }
    }

    var lo = getLocation(url);
    return {

        "type": 7,
        "url": url,
        "host": lo.hostname,
        "urls": urls.reverse()

    }
}

export function getMatches(string, regex, index) {
    index || (index = 1);
    var matches = [];
    var match;
    // eslint-disable-next-line no-cond-assign
    while (match = regex.exec(string)) {
        matches.push(match[index]);
    }
    return matches;
}

export function getLocation(href) {
    var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
    return match && {
        href: href,
        protocol: match[1],
        host: match[2],
        hostname: match[3],
        port: match[4],
        pathname: match[5],
        search: match[6],
        hash: match[7]
    }
}

export function detect(str) {
    return (get_chunks(str).length > 0);
}

export function get_chunks(str) {
    var chunks = str?.match(/eval\(\(?function\(.*?(,0,\{\}\)\)|split\('\|'\)\)\))($|\n)/g);
    return chunks ? chunks : [];
}

export function unpack(str) {
    var chunks = get_chunks(str),
        chunk;
    for (var i = 0; i < chunks.length; i++) {
        chunk = chunks[i].replace(/\n$/, '');
        str = str.split(chunk).join(unpack_chunk(chunk));
    }
    return str;
}

export function unpack_chunk(str) {
    var unpacked_source = '';
    // eslint-disable-next-line no-eval
    var _eval = eval;
    var __eval = _eval;
    if (detect(str)) {
        try {
            _eval = function (s) { // jshint ignore:line
                unpacked_source += s;
                return unpacked_source;
            }; // jshint ignore:line
            __eval(str);
            if (typeof unpacked_source === 'string' && unpacked_source) {
                str = unpacked_source;
            }
        } catch (e) {
            // well, it failed. we'll just return the original, instead of crashing on user.
        }
    }
    _eval = __eval; // jshint ignore:line
    return str;
}


export const htmlDecode = (input) => {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}