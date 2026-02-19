CREATE TABLE event_contacts (
  event_id INT PRIMARY KEY
    REFERENCES events(id)
    ON DELETE CASCADE,

  name VARCHAR(150),
  phone VARCHAR(30),
  email VARCHAR(150)
);
