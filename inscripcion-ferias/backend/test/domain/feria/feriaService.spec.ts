import { FeriaService } from '../../../src/domain/feria/feriaService';
import { Feria } from '../../../src/domain/feria/feria';

// Mock del repositorio
jest.mock('../../../src/infra/repositories/feriaRepository', () => ({
  crearFeriaRepo: jest.fn(),
  obtenerCantidadRepo: jest.fn(),
  obtenerFeriaPorNombre: jest.fn(),
  obtenerFeriaPorId: jest.fn(),
  obtenerFerias: jest.fn(),
}));

import * as feriaRepo from '../../../src/infra/repositories/feriaRepository';

describe('FeriaService (Domain Service)', () => {
  let feriaService: FeriaService;

  beforeEach(() => {
    jest.clearAllMocks();
    feriaService = new FeriaService();
  });

  describe('crear', () => {
    it('debería crear una feria si no existe', async () => {
      const feria = new Feria('Feria de Música');
      const mockFeria = new Feria('Feria de Música');
      mockFeria.id = 1;
      mockFeria.createdAt = new Date();

      (feriaRepo.obtenerFeriaPorNombre as jest.Mock).mockResolvedValue(null);
      (feriaRepo.crearFeriaRepo as jest.Mock).mockResolvedValue(mockFeria);

      const resultado = await feriaService.crear(feria);

      expect(resultado.nombre).toBe('Feria de Música');
      expect(resultado.id).toBe(1);
      expect(feriaRepo.crearFeriaRepo).toHaveBeenCalledWith(feria);
      expect(feriaRepo.obtenerFeriaPorNombre).toHaveBeenCalledWith(feria);
    });

    it('debería lanzar error si la feria ya existe', async () => {
      const feria = new Feria('Feria Existente');
      const feriaExistente = new Feria('Feria Existente');

      (feriaRepo.obtenerFeriaPorNombre as jest.Mock).mockResolvedValue(feriaExistente);

      await expect(feriaService.crear(feria)).rejects.toThrow('La feria ya existe');
      expect(feriaRepo.crearFeriaRepo).not.toHaveBeenCalled();
    });

    it('debería lanzar error si el nombre está vacío', () => {
      expect(() => new Feria('')).toThrow('El nombre de la feria no puede estar vacío');
    });
  });

  describe('obtenerFerias', () => {
    it('debería retornar todas las ferias', async () => {
      const mockFerias = [
        new Feria('Feria 1'),
        new Feria('Feria 2'),
      ];

      (feriaRepo.obtenerFerias as jest.Mock).mockResolvedValue(mockFerias);

      const resultado = await feriaService.obtenerFerias();

      expect(resultado).toEqual(mockFerias);
      expect(feriaRepo.obtenerFerias).toHaveBeenCalled();
    });

    it('debería lanzar error si no hay ferias', async () => {
      (feriaRepo.obtenerFerias as jest.Mock).mockResolvedValue([]);

      await expect(feriaService.obtenerFerias()).rejects.toThrow('No hay ferias registradas');
    });
  });

  describe('obtenerFeriaPorId', () => {
    it('debería retornar una feria por ID', async () => {
      const mockFeria = new Feria('Feria de Ciencias');
      mockFeria.id = 1;

      (feriaRepo.obtenerFeriaPorId as jest.Mock).mockResolvedValue(mockFeria);

      const resultado = await feriaService.obtenerFeriaPorId(1);

      expect(resultado).toEqual(mockFeria);
      expect(feriaRepo.obtenerFeriaPorId).toHaveBeenCalledWith(1);
    });

    it('debería lanzar error si la feria no existe', async () => {
      (feriaRepo.obtenerFeriaPorId as jest.Mock).mockResolvedValue(null);

      await expect(feriaService.obtenerFeriaPorId(999)).rejects.toThrow('Feria no encontrada');
    });
  });

  describe('obtenerCantidad', () => {
    it('debería retornar la cantidad de ferias si hay al menos una', async () => {
      (feriaRepo.obtenerCantidadRepo as jest.Mock).mockResolvedValue({ cantidad: 5 });

      const resultado = await feriaService.obtenerCantidad();

      expect(resultado.cantidad).toBe(5);
      expect(feriaRepo.obtenerCantidadRepo).toHaveBeenCalled();
    });

    it('debería lanzar error si no hay ferias', async () => {
      (feriaRepo.obtenerCantidadRepo as jest.Mock).mockResolvedValue({ cantidad: 0 });

      await expect(feriaService.obtenerCantidad()).rejects.toThrow(
        'No hay ferias registradas'
      );
    });
  });
});