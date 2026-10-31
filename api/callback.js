export default async function handler(req, res) {
  const { code } = req.query;
  const client_id = process.env.OAUTH_GITHUB_CLIENT_ID;
  const client_secret = process.env.OAUTH_GITHUB_CLIENT_SECRET;

  try {
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id,
          client_secret,
          code,
        }),
      },
    );

    const data = await response.json();

    if (data.error) {
      return res
        .status(400)
        .send(`Hata: ${data.error_description || data.error}`);
    }

    const postMessageContent = JSON.stringify({
      token: data.access_token,
      provider: "github",
    });

    // Decap CMS oturum tamamlama penceresi
    res.setHeader("Content-Type", "text/html");
    res.send(`
      <!doctype html>
      <html>
        <body>
          <script>
            (function() {
              function receiveMessage(e) {
                window.opener.postMessage(
                  'authorization:github:success:${postMessageContent}',
                  e.origin
                );
              }
              window.addEventListener("message", receiveMessage, false);
              window.opener.postMessage("authorizing:github", "*");
            })();
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send("Sunucu hatası: " + error.message);
  }
}
