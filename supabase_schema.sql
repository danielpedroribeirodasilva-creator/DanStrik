-- Rode este SQL no Editor SQL do seu projeto Supabase para criar as tabelas

-- Tabela de Perfis de Usuário
create table public.profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  xp integer default 0,
  level integer default 1,
  coins integer default 0,
  kills integer default 0,
  deaths integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de Loadouts
create table public.loadouts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id),
  primary_weapon text default 'AK-47 Block',
  secondary_weapon text default 'Glock-18',
  skin text default 'Default',
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Habilitar Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.loadouts enable row level security;

-- Políticas de acesso (Simplificadas para o exemplo)
create policy "Public profiles are viewable by everyone." on public.profiles for select using ( true );
create policy "Users can insert their own profile." on public.profiles for insert with check ( auth.uid() = id );
create policy "Users can update own profile." on public.profiles for update using ( auth.uid() = id );
