create table if not exists public.projects (id uuid primary key default gen_random_uuid());
select 'projects table shell created successfully' as result;
