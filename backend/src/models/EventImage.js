import { query } from "../config/database.js";

export class EventImage {
  static async findByEventId(eventId) {
    const result = await query(
      "SELECT * FROM event_images WHERE event_id = $1 ORDER BY order_index, created_at",
      [eventId],
    );
    return result.rows;
  }

  static async create(imageData) {
    const { event_id, image_url, alt_text = "", order_index = 0 } = imageData;
    const result = await query(
      `INSERT INTO event_images (event_id, image_url, alt_text, order_index)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [event_id, image_url, alt_text, order_index],
    );
    return result.rows[0];
  }

  static async createMultiple(images) {
    if (images.length === 0) return [];

    const values = images
      .map(
        (img, index) =>
          `(${index * 4 + 1}, ${index * 4 + 2}, ${index * 4 + 3}, ${index * 4 + 4})`,
      )
      .join(", ");

    const params = images.flatMap((img) => [
      img.event_id,
      img.image_url,
      img.alt_text || "",
      img.order_index || 0,
    ]);

    const result = await query(
      `INSERT INTO event_images (event_id, image_url, alt_text, order_index)
       VALUES ${values} RETURNING *`,
      params,
    );
    return result.rows;
  }

  static async update(id, imageData) {
    const { image_url, alt_text, order_index } = imageData;
    const result = await query(
      `UPDATE event_images 
       SET image_url = $1, alt_text = $2, order_index = $3
       WHERE id = $4 RETURNING *`,
      [image_url, alt_text, order_index, id],
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await query(
      "DELETE FROM event_images WHERE id = $1 RETURNING *",
      [id],
    );
    return result.rows[0];
  }

  static async setMainImage(eventId, imageId) {
    // Primero, desmarcar todas como no principales
    await query("UPDATE event_images SET is_main = false WHERE event_id = $1", [
      eventId,
    ]);

    // Marcar la seleccionada como principal
    const result = await query(
      "UPDATE event_images SET is_main = true WHERE id = $1 AND event_id = $2 RETURNING *",
      [imageId, eventId],
    );
    return result.rows[0];
  }
}
