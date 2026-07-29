-- Your existing orders table already matches this checkout payload:
-- customer_id, store_id, total_price, payment_status, order_status, created_at.
-- Run only the policy section if anonymous customers should be allowed to
-- create preorder rows from the public checkout page.

alter table public.orders enable row level security;

drop policy if exists "Allow public preorder creation" on public.orders;

create policy "Allow public preorder creation"
on public.orders
for insert
to anon, authenticated
with check (true);
