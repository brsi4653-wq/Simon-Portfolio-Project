insert into public.projects (
  slug, title, tagline, summary, description, status, project_type, poster_url,
  actors, production_company, credits, tags, theme, reveal_states, is_published, is_featured
)
values (
  'moving-forward',
  'Moving Forward',
  'One foot moving forward after the other',
  'A short dramatic film about grief, perspective, friendship, and learning to keep moving forward after loss.',
  'Moving Forward is a short dramatic film about grief, perspective, and learning how to keep living after loss.',
  'In Production',
  'Short Dramatic Film',
  'images/projects/moving-forward/poster.jpg',
  'Lion Ciuffreda and Preston Fitzgerald',
  'JPHSLS Production',
  '[{"role":"Directed By","name":"Simon Brookes"},{"role":"Written By","name":"Preston Fitzgerald"}]'::jsonb,
  array['Grief','Perspective','Mental health','Friendship'],
  'black',
  '{"title":"revealed","tagline":"revealed","summary":"revealed","description":"revealed","poster":"revealed","actors":"revealed","production_company":"revealed","credits":"revealed"}'::jsonb,
  true,
  true
)
on conflict (slug) do nothing;
select 'Moving Forward created successfully' as result;
