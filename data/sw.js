const CACHE_NAME = "apex"

self.addEventListener("install", event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME)
        cache.addAll([
            "/",
        ])
    })())
})

self.addEventListener("fetch", event => {
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME)

        const cachedResponse = await cache.match(event.request)
        if (cachedResponse) {
            return cachedResponse
        } else {
            try {
                if (event.request.method.toUpperCase() === "POST") {
                    const body     = await event.request.clone().text()
                    const cacheUrl = new URL(event.request.url)
                    cacheUrl.pathname = cacheUrl.pathname + body
                    const cacheRequest = new Request(cacheUrl.toString(), {
                        headers: event.request.headers,
                        method : "GET"
                    })

                    response = await cache.match(cacheRequest)
                    if (!response) {
                        response = await fetch(event.request)
                        cache.put(cacheRequest, response.clone())
                    }

                    return response
                } else {
                    const response = await fetch(event.request)
                    cache.put(event.request, response.clone())

                    return response
                }
            } catch (e) {

            }
        }
    })())
})
