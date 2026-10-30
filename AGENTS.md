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

## 3D site
- The Trench Brawl landing is a single-page site; the R3F hero scene runs on the `/` route with `ssr: false` (route-level), so `<Canvas>` never server-renders.
- Brand imagery (logo, fighter banner) is served through lovable-assets `.asset.json` pointers in `src/assets/`; never copy those binaries into the repo.
