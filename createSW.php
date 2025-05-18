<?php
function getFolders($basefolder = ".") {
    $list = [];
    $folders = glob($basefolder . '/*');
    
    foreach ($folders as $folder) {
        $list[] = $folder; 
        $list = array_merge($list, getFolders($folder)); 
    }
    
    return $list;
}

$files = "";
foreach (getFolders() as $file) {
    if (is_dir($file)) continue;

    // Skip files that should not be included
    if (str_contains($file, "/manifest.json")) continue;
    if (str_contains($file, "/createSW.php")) continue;
    if (str_contains($file, "/icon-192.png")) continue;
    if (str_contains($file, "/icon-512.png")) continue;
    if (str_contains($file, "/sw.js")) continue;

    // Normalize file paths to use forward slashes
    $file = str_replace("\\", "/", $file); // Ensure paths use forward slashes
    $file = str_replace("./", "/", $file); // Remove leading './'

    // Add to files list
    $files .= "'$file',\n";
}

// Create the service worker file content
$script = "self.addEventListener(\"install\", event => {
    event.waitUntil(
        caches.open(\"offline-cache-v3\").then(cache => {
            return cache.addAll([
                \"/\",
                $files
            ]);
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener(\"activate\", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== \"offline-cache-v3\").map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim(); // Forces clients to use new cache immediately
});
";

// Write the service worker to a file
$file = fopen('sw.js', 'w');
fwrite($file, $script);
fclose($file);

// Get the current URL
$baseUrl = "http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

// You can modify the base URL to point to a specific folder or structure if necessary
// For example, you might want to extract the `/test/3/upload/1742566762-Gilead/preview/test-k2/Gilead` part
// from the current URL dynamically
$segments = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
$startUrlPath = implode('/', array_slice($segments, 0, 7)); // Adjust this slice to match the path you need
$startUrlPath = str_replace("/createSW.php", "", $startUrlPath);
$startUrlPath = str_replace("\\", "/", $startUrlPath); // Ensure paths use forward slashes

// Create the manifest dynamically
$manifest = [
    "name" => "My Offline Site",
    "short_name" => "OfflineSite",
    "start_url" => "/" . $startUrlPath, // Dynamic start_url
    "display" => "standalone",
    "background_color" => "#ffffff",
    "theme_color" => "#000000",
    "icons" => [
        [
            "src" => "icon-192.png",
            "sizes" => "192x192",
            "type" => "image/png"
        ],
        [
            "src" => "icon-512.png",
            "sizes" => "512x512",
            "type" => "image/png"
        ]
    ]
];

// Convert the PHP array to JSON format
$manifestJson = json_encode($manifest, JSON_PRETTY_PRINT);

// Replace escaped forward slashes '\/' with regular '/' in the JSON output
$manifestJson = str_replace('\/', '/', $manifestJson);

// Write the manifest JSON to a file (e.g., manifest.json)
$file = fopen('manifest.json', 'w');
fwrite($file, $manifestJson);
fclose($file);

echo "Manifest generated successfully!";
?>
