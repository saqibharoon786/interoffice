<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep homepage promotional banners as hosted asset pointers with separate desktop/mobile imagery; this preserves the supplied storefront reference while keeping binary media out of source.
- Keep the curated homepage product catalog in a local client-safe data module with CDN image pointers; this makes the reference storefront reliable without depending on live third-party requests at render time.
