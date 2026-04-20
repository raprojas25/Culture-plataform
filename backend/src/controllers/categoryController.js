import { Category } from "../models/Category.js";

export class CategoryController {
  // static async getAllCategories(req, res) {
  //   try {
  //     const includeInactive = req.user?.role_id === 1 && req.query.include_inactive === 'true';
  //     const categories = await Category.findAll(includeInactive);
  //
  //     // Obtener conteo de eventos para cada categoría
  //     const categoriesWithCounts = await Promise.all(
  //       categories.map(async (category) => {
  //         const eventsCount = await Category.getEventsCount(category.id);
  //         return { ...category, events_count: eventsCount };
  //       })
  //     );
  //
  //     res.json(categoriesWithCounts);
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }
  static async getAllCategories(req, res) {
    try {
      // const includeInactive = req.user?.role_id === 1 && req.query.include_inactive === 'true';
      const categories = await Category.findAll();

      // Obtener conteo de eventos para cada categoría
      const categoriesWithCounts = await Promise.all(
        categories.map(async (category) => {
          const eventsCount = await Category.getEventsCount(category.id);
          return { ...category, events_count: eventsCount };
        }),
      );

      res.json(categoriesWithCounts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCategoryById(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Categoría no encontrada" });
      }

      const eventsCount = await Category.getEventsCount(category.id);
      res.json({ ...category, events_count: eventsCount });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createCategory(req, res) {
    try {
      const category = await Category.create(req.body);
      res.status(201).json(category);
    } catch (error) {
      if (error.code === "23505") {
        // Unique violation
        return res
          .status(400)
          .json({ error: "El nombre de la categoría ya existe" });
      }
      res.status(400).json({ error: error.message });
    }
  }

  static async updateCategory(req, res) {
    try {
      const category = await Category.update(req.params.id, req.body);
      if (!category) {
        return res.status(404).json({ error: "Categoría no encontrada" });
      }
      res.json(category);
    } catch (error) {
      if (error.code === "23505") {
        return res
          .status(400)
          .json({ error: "El nombre de la categoría ya existe" });
      }
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteCategory(req, res) {
    try {
      // Verificar que no hay eventos asociados
      const eventsCount = await Category.getEventsCount(req.params.id);
      if (eventsCount > 0) {
        return res.status(400).json({
          error:
            "No se puede eliminar la categoría porque tiene eventos asociados",
        });
      }

      const category = await Category.delete(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Categoría no encontrada" });
      }
      res.json({ message: "Categoría eliminada exitosamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // static async toggleStatus(req, res) {
  //   try {
  //     if (typeof is_active !== "boolean") {
  //       return res.status(400).json({ error: "is_active debe ser boolean" });
  //     }
  //     const { is_active } = req.body;
  //     const category = await Category.toggleStatus(req.params.id, is_active);
  //     if (!category) {
  //       return res.status(404).json({ error: "Categoría no encontrada" });
  //     }
  //     res.json(category);
  //   } catch (error) {
  //     if (error.code === "23505") {
  //       return res
  //         .status(400)
  //         .json({ error: "El nombre de la categoría ya existe" });
  //     }
  //     res.status(400).json({ error: error.message });
  //   }
  // }

  static async toggleStatus(req, res) {
    try {
      const category = await Category.toggleStatus(req.params.id);

      if (!category) {
        return res.status(404).json({ error: "Categoría no encontrada" });
      }

      res.json(category);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
