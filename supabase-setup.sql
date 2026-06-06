-- Simon Portfolio: one-time Supabase setup
-- Run this entire file in Supabase Dashboard -> SQL Editor -> New query.

create extension if not exists pgcrypto;

create or replace function public.is_portfolio_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) = 'simon_j_brookes@icloud.com';
$$;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null default 'Untitled Project',
  teaser_title text not null default 'Coming Soon',
  tagline text not null default '',
  teaser_tagline text not null default '',
  summary text not null default '',
  teaser_summary text not null default '',
  description text not null default '',
  teaser_description text not null default '',
  status text not null default 'In Development',
  project_type text not null default 'Film',
  poster_url text not null default '',
  teaser_poster_url text not null default '',
  actors text not null default '',
  teaser_actors text not null default '',
  production_company text not null default '',
  teaser_production_company text not null default '',
  credits jsonb not null default '[]'::jsonb,
  teaser_credits text not null default '',
  tags text[] not null default '{}',
  theme text not null default 'orange'
    check (theme in ('red', 'orange', 'black', 'blue', 'green', 'yellow')),
  reveal_states jsonb not null default
    '{"title":"revealed","tagline":"revealed","summary":"revealed","description":"revealed","poster":"revealed","actors":"revealed","production_company":"revealed","credits":"revealed"}'::jsonb,
  is_published boolean not null default false,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists one_featured_project
  on public.projects (is_featured)
  where is_featured = true;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_touch_updated_at on public.projects;
create trigger projects_touch_updated_at
before update on public.projects
for each row execute function public.touch_updated_at();

alter table public.projects enable row level security;

drop policy if exists "admin reads projects" on public.projects;
create policy "admin reads projects"
on public.projects for select
to authenticated
using (public.is_portfolio_admin());

drop policy if exists "admin creates projects" on public.projects;
create policy "admin creates projects"
on public.projects for insert
to authenticated
with check (public.is_portfolio_admin());

drop policy if exists "admin updates projects" on public.projects;
create policy "admin updates projects"
on public.projects for update
to authenticated
using (public.is_portfolio_admin())
with check (public.is_portfolio_admin());

drop policy if exists "admin deletes projects" on public.projects;
create policy "admin deletes projects"
on public.projects for delete
to authenticated
using (public.is_portfolio_admin());

create or replace function public.public_value(
  state text,
  real_value text,
  teaser_value text,
  generic_teaser text
)
returns text
language sql
immutable
as $$
  select case state
    when 'revealed' then coalesce(real_value, '')
    when 'teaser' then coalesce(nullif(teaser_value, ''), generic_teaser)
    else ''
  end;
$$;

create or replace function public.get_public_projects()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(jsonb_agg(
    jsonb_build_object(
      'id', id,
      'slug', slug,
      'title', public.public_value(reveal_states ->> 'title', title, teaser_title, 'Coming Soon'),
      'tagline', public.public_value(reveal_states ->> 'tagline', tagline, teaser_tagline, 'More will be revealed'),
      'summary', public.public_value(reveal_states ->> 'summary', summary, teaser_summary, 'A new project is taking shape.'),
      'description', public.public_value(reveal_states ->> 'description', description, teaser_description, 'Further details will be revealed.'),
      'status', status,
      'project_type', project_type,
      'poster_url', public.public_value(reveal_states ->> 'poster', poster_url, teaser_poster_url, ''),
      'actors', public.public_value(reveal_states ->> 'actors', actors, teaser_actors, 'Cast to be revealed'),
      'production_company', public.public_value(reveal_states ->> 'production_company', production_company, teaser_production_company, 'Production company to be revealed'),
      'credits', case
        when reveal_states ->> 'credits' = 'revealed' then credits
        when reveal_states ->> 'credits' = 'teaser' then jsonb_build_array(jsonb_build_object('role', 'Credits', 'name', coalesce(nullif(teaser_credits, ''), 'To be revealed')))
        else '[]'::jsonb
      end,
      'tags', tags,
      'theme', theme,
      'is_featured', is_featured
    )
    order by is_featured desc, updated_at desc
  ), '[]'::jsonb)
  from public.projects
  where is_published = true;
$$;

revoke all on public.projects from anon;
revoke all on public.projects from authenticated;
grant select, insert, update, delete on public.projects to authenticated;
grant execute on function public.get_public_projects() to anon, authenticated;
grant execute on function public.is_portfolio_admin() to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-media',
  'project-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "admin uploads project media" on storage.objects;
create policy "admin uploads project media"
on storage.objects for insert
to authenticated
with check (bucket_id = 'project-media' and public.is_portfolio_admin());

drop policy if exists "admin updates project media" on storage.objects;
create policy "admin updates project media"
on storage.objects for update
to authenticated
using (bucket_id = 'project-media' and public.is_portfolio_admin())
with check (bucket_id = 'project-media' and public.is_portfolio_admin());

drop policy if exists "admin deletes project media" on storage.objects;
create policy "admin deletes project media"
on storage.objects for delete
to authenticated
using (bucket_id = 'project-media' and public.is_portfolio_admin());

insert into public.projects (
  slug, title, teaser_title, tagline, summary, description, status, project_type,
  poster_url, actors, production_company, credits, tags, theme, reveal_states,
  is_published, is_featured
)
values (
  'moving-forward',
  'Moving Forward',
  'A Project Is Moving Forward',
  'One foot moving forward after the other',
  'A short dramatic film about grief, perspective, friendship, and learning to keep moving forward after loss.',
  'Moving Forward is a short dramatic film about grief, perspective, and learning how to keep living after loss. The story follows a protagonist whose friend helps him understand that people often carry unseen struggles, and that healing sometimes means choosing to move forward one step at a time.',
  'In Production',
  'Short Dramatic Film',
  'images/projects/moving-forward/poster.jpg',
  'Lion Ciuffreda and Preston Fitzgerald',
  'JPHSLS Production',
  '[
    {"role":"Presented By","name":"CEC"},
    {"role":"Production","name":"JPHSLS Production"},
    {"role":"Film By","name":"Simon Brookes"},
    {"role":"Starring","name":"Lion Ciuffreda and Preston Fitzgerald"},
    {"role":"Music By","name":"Enzo Alves"},
    {"role":"Editor","name":"Enzo Alves"},
    {"role":"Production Designer","name":"Preston Fitzgerald"},
    {"role":"Director of Photography","name":"Jonah Benvie"},
    {"role":"Executive Producer","name":"Preston Fitzgerald"},
    {"role":"Written By","name":"Preston Fitzgerald"},
    {"role":"Directed By","name":"Simon Brookes"}
  ]'::jsonb,
  array['Grief','Perspective','Mental health','Hidden struggles','Friendship','Moving forward after loss'],
  'black',
  '{"title":"revealed","tagline":"revealed","summary":"revealed","description":"revealed","poster":"revealed","actors":"revealed","production_company":"revealed","credits":"revealed"}'::jsonb,
  true,
  true
)
on conflict (slug) do nothing;
