create or replace view public.public_projects
with (security_barrier = true)
as
select
  id,
  slug,
  case coalesce(reveal_states ->> 'title', 'revealed')
    when 'revealed' then title when 'teaser' then coalesce(nullif(teaser_title, ''), 'Coming Soon') else '' end as title,
  case coalesce(reveal_states ->> 'tagline', 'revealed')
    when 'revealed' then tagline when 'teaser' then coalesce(nullif(teaser_tagline, ''), 'More will be revealed') else '' end as tagline,
  case coalesce(reveal_states ->> 'summary', 'revealed')
    when 'revealed' then summary when 'teaser' then coalesce(nullif(teaser_summary, ''), 'A new project is taking shape.') else '' end as summary,
  case coalesce(reveal_states ->> 'description', 'revealed')
    when 'revealed' then description when 'teaser' then coalesce(nullif(teaser_description, ''), 'Further details will be revealed.') else '' end as description,
  status,
  project_type,
  case coalesce(reveal_states ->> 'poster', 'revealed')
    when 'revealed' then poster_url when 'teaser' then teaser_poster_url else '' end as poster_url,
  case coalesce(reveal_states ->> 'actors', 'revealed')
    when 'revealed' then actors when 'teaser' then coalesce(nullif(teaser_actors, ''), 'Cast to be revealed') else '' end as actors,
  case coalesce(reveal_states ->> 'production_company', 'revealed')
    when 'revealed' then production_company when 'teaser' then coalesce(nullif(teaser_production_company, ''), 'Production company to be revealed') else '' end as production_company,
  case coalesce(reveal_states ->> 'credits', 'revealed')
    when 'revealed' then credits
    when 'teaser' then jsonb_build_array(jsonb_build_object('role', 'Credits', 'name', coalesce(nullif(teaser_credits, ''), 'To be revealed')))
    else '[]'::jsonb end as credits,
  tags,
  theme,
  is_featured
from public.projects
where is_published = true;

revoke all on public.public_projects from public;
grant select on public.public_projects to anon, authenticated;
select 'public project view created successfully' as result;
