CREATE TABLE event_details (
  id SERIAL PRIMARY KEY,

  event_id INT NOT NULL
    REFERENCES events(id)
    ON DELETE CASCADE,

  section VARCHAR(50) NOT NULL,
  title VARCHAR(100),
  content TEXT NOT NULL,

  order_index INT DEFAULT 0
);
