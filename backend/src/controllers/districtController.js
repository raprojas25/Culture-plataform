import { District } from '../models/District.js';

export class DistrictController {
  static async getAllDistricts(req, res) {
    try {
      const filters = {
        province: req.query.province,
        region: req.query.region,
        search: req.query.search,
      };
      
      const districts = await District.findAll(filters);
      res.json(districts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getDistrictById(req, res) {
    try {
      const district = await District.findById(req.params.id);
      if (!district) {
        return res.status(404).json({ error: 'Distrito no encontrado' });
      }
      res.json(district);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createDistrict(req, res) {
    try {
      // Verificar si ya existe un distrito con el mismo nombre
      const existingDistrict = await District.findByName(req.body.name);
      if (existingDistrict) {
        return res.status(400).json({ error: 'Ya existe un distrito con este nombre' });
      }

      const district = await District.create(req.body);
      res.status(201).json(district);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateDistrict(req, res) {
    try {
      // Verificar si el distrito existe
      const existingDistrict = await District.findById(req.params.id);
      if (!existingDistrict) {
        return res.status(404).json({ error: 'Distrito no encontrado' });
      }

      // Verificar si el nuevo nombre ya existe (si se está cambiando)
      if (req.body.name && req.body.name !== existingDistrict.name) {
        const districtWithSameName = await District.findByName(req.body.name);
        if (districtWithSameName && districtWithSameName.id !== parseInt(req.params.id)) {
          return res.status(400).json({ error: 'Ya existe un distrito con este nombre' });
        }
      }

      const district = await District.update(req.params.id, req.body);
      res.json(district);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteDistrict(req, res) {
    try {
      // Verificar que no hay eventos asociados
      const eventsCount = await District.getEventsCount(req.params.id);
      if (eventsCount > 0) {
        return res.status(400).json({ 
          error: 'No se puede eliminar el distrito porque tiene eventos asociados' 
        });
      }

      const district = await District.delete(req.params.id);
      if (!district) {
        return res.status(404).json({ error: 'Distrito no encontrado' });
      }
      res.json({ message: 'Distrito eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getProvinces(req, res) {
    try {
      const provinces = await District.getProvinces();
      res.json(provinces);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getRegions(req, res) {
    try {
      const regions = await District.getRegions();
      res.json(regions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getDistrictsByProvince(req, res) {
    try {
      const districts = await District.getByProvince(req.params.province);
      res.json(districts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getDistrictsByRegion(req, res) {
    try {
      const districts = await District.getByRegion(req.params.region);
      res.json(districts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getStatistics(req, res) {
    try {
      const districts = await District.findAll();
      
      const statistics = {
        total: districts.length,
        byProvince: {},
        byRegion: {},
        topDistricts: districts
          .sort((a, b) => (b.events_count || 0) - (a.events_count || 0))
          .slice(0, 10)
          .map(d => ({ name: d.name, events_count: d.events_count || 0 }))
      };

      // Agrupar por provincia
      districts.forEach(district => {
        if (district.province) {
          if (!statistics.byProvince[district.province]) {
            statistics.byProvince[district.province] = 0;
          }
          statistics.byProvince[district.province]++;
        }
      });

      // Agrupar por región
      districts.forEach(district => {
        if (district.region) {
          if (!statistics.byRegion[district.region]) {
            statistics.byRegion[district.region] = 0;
          }
          statistics.byRegion[district.region]++;
        }
      });

      res.json(statistics);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

