const CACHE_NAME = 'avplayer_cache';
const urlsToCache = [
    '/',
    '/static/js/bundle.js',
    '/static/js/vendors~main.chunk.js',
    '/static/js/main.chunk.js',
    '/logo-blue.svg',
    'manifest.json'
];
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                // Open a cache and cache our files
                return cache.addAll(urlsToCache);
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