async function main() {
  const urlList = Deno.readTextFileSync("./static/sitemap.txt").split("\n");
  const body = JSON.stringify({
    host: "zach.sexy",
    key: "7e680bf5cc394290a9ab18af7a93586b",
    keyLocation: "https://zach.sexy/7e680bf5cc394290a9ab18af7a93586b.txt",
    urlList,
  });
  const headers = new Headers({ "Content-Type": "application/json" });
  try {
    const res = await fetch("https://api.indexnow.org", {
      method: "POST",
      body,
      headers,
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`${res.status}: ${text}`);
    }
  } catch (err) {
    console.error(err);
  }
}

await main();
