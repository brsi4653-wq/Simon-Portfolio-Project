create or replace function public.is_portfolio_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as 'select lower(coalesce(auth.jwt() ->> ''email'', '''')) = ''simon_j_brookes@icloud.com''';

alter table public.projects enable row level security;

drop policy if exists "admin reads projects" on public.projects;
create policy "admin reads projects" on public.projects for select to authenticated
using (public.is_portfolio_admin());

drop policy if exists "admin creates projects" on public.projects;
create policy "admin creates projects" on public.projects for insert to authenticated
with check (public.is_portfolio_admin());

drop policy if exists "admin updates projects" on public.projects;
create policy "admin updates projects" on public.projects for update to authenticated
using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

drop policy if exists "admin deletes projects" on public.projects;
create policy "admin deletes projects" on public.projects for delete to authenticated
using (public.is_portfolio_admin());

revoke all on public.projects from anon;
revoke all on public.projects from authenticated;
grant select, insert, update, delete on public.projects to authenticated;
grant execute on function public.is_portfolio_admin() to authenticated;
select 'project security created successfully' as result;
