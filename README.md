# Recharge Bible website

The zero-build static marketing website for [recharge.bible](https://recharge.bible).
This repository contains website files only. Mobile app source, backend source,
internal product documents, and their Git history are deliberately excluded.

## Preview locally

Open [index.html](index.html) in a browser. No package install or build step is
required. For an HTTP preview, run `python3 -m http.server 8000` from this directory
and open http://localhost:8000.

## Connect Brevo

Brevo collects signups through its generated HTML form in [index.html](index.html).
The form action and Cloudflare Turnstile site key are public client-side values,
not API secrets. Never add private API keys, subscriber exports, or credentials.

1. Enable double opt-in for the Brevo subscription form.
2. If regenerating the form, replace its action URL, Turnstile site key, and Brevo
   scripts while preserving the site's form classes.
3. Test a real signup and confirm the contact reaches the expected list.

## Deploy with GitHub Pages

1. Review the files and make **only this website repository** public in
   **Settings → General → Danger Zone → Change repository visibility**.
   Keep the app/backend repository private; do not fork or mirror its history here.
2. If the old repository still has a Pages site, remove its custom domain and
   unpublish that old site in its **Settings → Pages** before assigning the domain
   here. Deleting its local CNAME alone does not change GitHub's Pages settings.
3. In this repository's **Settings → Pages**, select **Deploy from a branch**,
   then choose **main** and **/ (root)** and save.
4. Set the custom domain to **recharge.bible**. Enable **Enforce HTTPS** once DNS
   validation and certificate provisioning finish.
5. Verify the homepage, privacy page, favicon, and a Brevo signup on the live site.

[CNAME](CNAME) preserves the custom domain on deployment. [.nojekyll](.nojekyll)
keeps the site as plain static files. No custom Actions workflow is required.
GitHub Pages availability for a private repository depends on the GitHub plan;
making this website-only repository public allows Pages on GitHub Free.

### DNS

The apex domain uses GitHub Pages A records:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

If those records are already set, moving between repositories under the same
GitHub account does not require changing them. If `www` is used, its CNAME should
point to **mpavlov-sbc.github.io**, not a repository URL. Configure an optional
domain-verification TXT record in the owner's GitHub Pages settings to protect
the domain during migration. Leave **api.recharge.bible** and its DNS untouched.

## Files

- [index.html](index.html) — landing page and subscription form
- [privacy.html](privacy.html) — early-access email-list privacy notice
- [styles.css](styles.css), [script.js](script.js) — styling and interactions
- [favicon.svg](favicon.svg) — website icon
- [CNAME](CNAME), [robots.txt](robots.txt), [sitemap.xml](sitemap.xml) — hosting and discovery

## Repository boundary

This repository starts with a new initial commit, not the private app's history.
Never merge the app repository into it or add it as a subtree. Website work should
be done here; app and backend work belongs in the separate private repository.