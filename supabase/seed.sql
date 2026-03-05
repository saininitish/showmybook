-- Seed venues
INSERT INTO venues (id, name, address, city, capacity) VALUES
  ('a0000001-0000-0000-0000-000000000001', 'PVR: Nexus Mall (IMAX)', 'Nexus Mall', 'Mumbai', 200),
  ('a0000001-0000-0000-0000-000000000002', 'National Stadium', 'Stadium Road', 'Mumbai', 50000),
  ('a0000001-0000-0000-0000-000000000003', 'Laugh Club', 'Comedy Street', 'Delhi', 350)
ON CONFLICT (id) DO NOTHING;

-- Seed events
INSERT INTO events (id, venue_id, title, description, type, genre, event_date, event_time, image_url, featured) VALUES
  ('b0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000001', 'Dune: Part Two', 'Paul Atreides unites with the Fremen...', 'movie', 'Action', '2026-03-08', '19:00', 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg', true),
  ('b0000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000001', 'Oppenheimer', 'The story of J. Robert Oppenheimer...', 'movie', 'Drama', '2026-03-09', '20:00', 'https://image.tmdb.org/t/p/w500/8Gxv8gS8UPTFyHB0fuQwUDQ0xYA.jpg', false),
  ('b0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000002', 'Coldplay: Music Of The Spheres', 'Global tour in India.', 'concert', 'Pop', '2026-10-15', '19:30', 'https://images.unsplash.com/photo-1540039155732-6761b54f6cce?q=80&w=1000', true),
  ('b0000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000003', 'Standup Comedy Special', 'Non-stop laughter.', 'comedy', 'Standup', '2026-08-10', '20:00', 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=1000', false)
ON CONFLICT (id) DO NOTHING;
