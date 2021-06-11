const CACHE_NAME = 'avplayer_cache';
const urlsToCache = [
    '/',
    '/logo-blue.svg',
    'manifest.json'
];
const buildUrls = [
    '/static/js/2.4854944b.chunk.js',
    '/static/js/main.217d6fee.chunk.js',
    '/static/css/main.97481301.chunk.css',
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