-- Esquema inicial (Supabase / Postgres). Todas las tablas con RLS: cada cliente solo ve lo suyo.
create table customers (id uuid primary key references auth.users, name text, company text, phone text, points int default 0, tier text default 'Bronce', created_at timestamptz default now());
create table equipment (id uuid primary key default gen_random_uuid(), customer_id uuid references customers, model text, serial text unique, installed_at date, last_service date, interval_months int default 6);
create table service_requests (id uuid primary key default gen_random_uuid(), customer_id uuid references customers, equipment_id uuid references equipment, type text, preferred_date date, notes text, status text default 'Solicitado', created_at timestamptz default now());
create table products (id uuid primary key default gen_random_uuid(), name text, category text, price numeric, description text, image_url text, active bool default true);
create table orders (id uuid primary key default gen_random_uuid(), customer_id uuid references customers, total numeric, status text default 'Nuevo', created_at timestamptz default now());
create table order_items (order_id uuid references orders, product_id uuid references products, qty int, unit_price numeric);
create table courses (id uuid primary key default gen_random_uuid(), title text, level text, price numeric default 0, hours numeric, description text);
create table lessons (id uuid primary key default gen_random_uuid(), course_id uuid references courses, position int, title text, video_url text);
create table enrollments (customer_id uuid references customers, course_id uuid references courses, progress int default 0, primary key (customer_id, course_id));
create table events (id uuid primary key default gen_random_uuid(), title text, starts_at timestamptz, place text, price numeric default 0, seats int, description text);
create table tickets (id uuid primary key default gen_random_uuid(), event_id uuid references events, customer_id uuid references customers, qty int, code text unique, checked_in bool default false);
create table points_ledger (id bigserial primary key, customer_id uuid references customers, delta int, reason text, created_at timestamptz default now());
create table kb_documents (id uuid primary key default gen_random_uuid(), model text, title text, content text); -- manuales para el asesor IA (RAG)
alter table customers enable row level security; alter table equipment enable row level security; alter table service_requests enable row level security;
alter table orders enable row level security; alter table enrollments enable row level security; alter table tickets enable row level security; alter table points_ledger enable row level security;
create policy own_customer on customers for all using (id = auth.uid());
create policy own_equipment on equipment for all using (customer_id = auth.uid());
create policy own_services on service_requests for all using (customer_id = auth.uid());
create policy own_orders on orders for all using (customer_id = auth.uid());
create policy own_enroll on enrollments for all using (customer_id = auth.uid());
create policy own_tickets on tickets for all using (customer_id = auth.uid());
create policy own_points on points_ledger for select using (customer_id = auth.uid());
