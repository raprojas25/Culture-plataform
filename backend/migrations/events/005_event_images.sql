CREATE TABLE event_images (
  id SERIAL PRIMARY KEY,

  event_id INT NOT NULL
    REFERENCES events(id)
    ON DELETE CASCADE,

  image_url TEXT NOT NULL,
  is_main BOOLEAN DEFAULT false
);
