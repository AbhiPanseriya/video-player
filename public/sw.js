const CACHE_NAME = 'avplayer_cache';
const urlsToCache = [
    '/',
    '/logo-blue.svg',
    'manifest.json'
];
const buildUrls = [
    '/static/js/2.d13ba113.chunk.js',
    '/static/js/main.803259b2.chunk.js',
    '/static/css/main.f89e7a53.chunk.css',
    '/static/js/runtime-main.19af7ed0.js'
]
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                // Open a cache and cache our files
                return cache.addAll([...urlsToCache, ...buildUrls]);
            })
    );
});

self.addEventListener('fetch', function (event) {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});