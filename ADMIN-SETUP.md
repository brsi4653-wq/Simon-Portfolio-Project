# Simon Portfolio Admin Setup

The private editor and public dynamic project system are already included in the `docs` website folder.

## One-Time Supabase Setup

1. Open the Supabase project.
2. Open **SQL Editor**.
3. Click **New query**.
4. Open `supabase-setup.sql` from this folder.
5. Copy the entire file into the Supabase query.
6. Click **Run**.

This creates the secured projects database, image bucket, public filtered-project function, administrator permissions, and the editable Moving Forward project.

## Supabase Authentication URLs

In **Authentication -> URL Configuration**, use:

- Site URL: `https://brsi4653-wq.github.io/Simon-Portfolio-Project/`
- Redirect URL: `https://brsi4653-wq.github.io/Simon-Portfolio-Project/admin.html`

Keep the existing Google callback URL configured in Google OAuth:

`https://ldgkmvvwpojvsxlveft.supabase.co/auth/v1/callback`

## Publish The Website

Upload only the contents of `docs` to the root of the GitHub repository, then configure GitHub Pages to deploy from `main` and `/root`.

After GitHub Pages finishes deploying:

1. Open the website.
2. Scroll to the bottom.
3. Click **Admin Login**.
4. Sign in with `simon_j_brookes@icloud.com`.

Never upload or paste a Supabase secret key, service-role key, Google client secret, database password, or account password into the website files.
