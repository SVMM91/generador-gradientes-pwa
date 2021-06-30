const CACHE_NAME = "v1_generador_gradiente";
const urlsToCache = [
    "./",
    "./?umt_source=web_app_manifest",
    "./pages/fallback.html",
    "./pages/css/style.css",
    "./img/favicon-16x16.png",
    "./img/icon-36x36.png",
    "./img/icon-48x48.png",
    "./img/icon-72x72.png",
    "./img/icon-96x96.png",
    "./img/icon-144x144.png",
    "./img/icon-192x192.png",
    "./img/icon512.png",
    "./img/maskable.png",
    "./js/main.js",
    "https://unpkg.com/vue@next",
    "./js/mount.js",
    "./css/style.css",
    "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,700;0,900;1,100&display=swap"
];

self.addEventListener ("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(
            cache => cache.addAll(urlsToCache).then(
                () => self.skipWaiting()
            ).catch(
                err => console.log(err)
            )
        )
    )
})

///INSTALACION CACHE
self.addEventListener("install", e =>{
    e.waitUntil(
        caches.open(CACHE_NAME).then(
            cache => cache.addAll(urlsToCache).then(
                () => self.skipWaiting()
            ).catch(
                err => console.log(err)
            )
        )
    )
})

self.addEventListener("activate", e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys().then(
            cacheNames => {
                return Promise.all(
                    cacheNames.map(
                        cacheName => {
                            if(cacheWhitelist.indexOf(cacheName) == -1){
                                return caches.delete(cacheName)
                            }
                        }
                    )
                )
            }
        ).then(
            () => self.clients.claim()
        )
    )
})

self.addEventListener ("fetch", e =>{
    e.respondWith (
        caches.match (e.request).then (
            res => {
                if (res){
                    return res
                }
                return fetch(e.request)
            }
        ).catch(
            () => caches.match("./pages/fallback.html")
        )
    )
})