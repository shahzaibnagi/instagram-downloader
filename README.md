<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:080b10,100:1f6feb&height=150&section=header&text=instagram-downloader&fontSize=32&fontColor=eaf0f7&animation=fadeIn&desc=Reels%20downloader%20%C2%B7%20EN%20%2B%20UR&descAlignY=76&descSize=14" alt="instagram-downloader" />

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=500&size=16&pause=1200&color=34D399&center=true&vCenter=true&width=560&lines=Config-driven%20API%20base;Validated%20links%2C%20clean%20errors" alt="tagline" />

</div>

# Instagram Downloader

A two-file interface for pulling reels and videos: paste a link, preview it, save the file. English and Urdu labels.

No backend of its own — it calls a resolver API that you point it at.

## Files

| File | Job |
|---|---|
| `index.html` | Markup and the language toggle |
| `style.css` | Layout |
| `script.js` | Validation, the request, and the preview |
| `config.example.js` | Template for your API base URL |

## Setup

```bash
cp config.example.js config.js
```

Then set your resolver endpoint in `config.js`:

```js
window.APP_CONFIG = { instagramApi: "https://api.example.com/api/instagram" };
```

`config.js` is gitignored so deployments can differ. If the file is missing the script falls back to `/api/instagram` on the same origin.

## Expected response

```json
{ "status": true, "video": "https://cdn.example.com/file.mp4" }
```

Anything else is treated as "not found" and shown to the user.

## Limits

- The resolver is yours to supply; this repo only ships the client.
- Works with public reels, posts and IGTV links. Private accounts are not supported.
- Downloading content you do not own may breach Instagram's terms and copyright.

## Licence

MIT
