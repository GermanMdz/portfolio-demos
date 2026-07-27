import { crearFeriaRepo, obtenerCantidadRepo, obtenerFeriaPorNombre, obtenerFeriaPorId, obtenerFerias } from '../../../src/infra/repositories/feriaRepository';
import { Feria } from '../../../src/domain/feria/feria';
import { AppDataSource } from '../../../src/data-source';

// Mock de AppDataSource
jest.mock('../../../src/data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

// Mock del mapper de infraestructura
jest.mock('../../../src/infra/mappers/feriaMapper', () => ({
  feriaMapper: {
    fromEntityToDomain: jest.fn((entity) => {
      const feria = new Feria(entity.nombre);
      feria.id = entity.id;
      feria.fecha = entity.fecha;
      feria.direccion = entity.direccion;
      feria.cupo = entity.cupo;
      feria.createdAt = entity.createdAt;
      return feria;
    }),
    fromDomainToEntity: jest.fn((domain) => ({
      id: domain.id,
      nombre: domain.nombre,
      fecha: domain.fecha,
      direccion: domain.direccion,
      cupo: domain.cupo,
      createdAt: domain.createdAt,
    })),
  },
}));

describe('FeriaRepository (Infra Repository)', () => {
  let mockRepository: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOneBy: jest.fn(),
      find: jest.fn(),
      count: jest.fn(),
    };
    (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);
  });

  describe('crearFeriaRepo', () => {
    it('debería crear una feria en la base de datos', async () => {
      const domainFeria = new Feria('Feria Nueva');
      const savedEntity = {
        id: 1,
        nombre: 'Feria Nueva',
        fecha: null,
        direccion: null,
        cupo: null,
        createdAt: new Date(),
      };

      mockRepository.create.mockReturnValue(savedEntity);
      mockRepository.save.mockResolvedValue(savedEntity);

      const resultado = await crearFeriaRepo(domainFeria);

      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalled();
      expect(resultado.id).toBe(1);
      expect(resultado.nombre).toBe('Feria Nueva');
    });
  });

  describe('obtenerFeriaPorNombre', () => {
    it('debería encontrar una feria por nombre', async () => {
      const domainFeria = new Feria('Feria Buscada');
      const foundEntity = {
        id: 2,
        nombre: 'Feria Buscada',
        fecha: null,
        direccion: null,
        cupo: null,
        createdAt: new Date(),
      };

      mockRepository.findOneBy.mockResolvedValue(foundEntity);

      const resultado = await obtenerFeriaPorNombre(domainFeria);

      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ nombre: 'Feria Buscada' });
      expect(resultado).not.toBeNull();
      expect(resultado?.nombre).toBe('Feria Buscada');
    });

    it('debería retornar null si no encuentra la feria', async () => {
      const domainFeria = new Feria('Feria Inexistente');

      mockRepository.findOneBy.mockResolvedValue(null);

      const resultado = await obtenerFeriaPorNombre(domainFeria);

      expect(resultado).toBeNull();
    });
  });

  describe('obtenerFeriaPorId', () => {
    it('debería encontrar una feria por ID', async () => {
      const foundEntity = {
        id: 1,
        nombre: 'Feria Test',
        fecha: null,
        direccion: 'Calle Test',
        cupo: null,
        createdAt: new Date(),
      };

      mockRepository.findOneBy.mockResolvedValue(foundEntity);

      const resultado = await obtenerFeriaPorId(1);

      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(resultado).not.toBeNull();
      expect(resultado?.id).toBe(1);
    });

    it('debería retornar null si no encuentra la feria por ID', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      const resultado = await obtenerFeriaPorId(999);

      expect(resultado).toBeNull();
    });
  });

  describe('obtenerFerias', () => {
    it('debería retornar todas las ferias', async () => {
      const foundEntities = [
        { id: 1, nombre: 'Feria 1', fecha: null, direccion: 'Calle 1', cupo: null, createdAt: new Date() },
        { id: 2, nombre: 'Feria 2', fecha: null, direccion: 'Calle 2', cupo: null, createdAt: new Date() },
      ];

      mockRepository.find.mockResolvedValue(foundEntities);

      const resultado = await obtenerFerias();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(resultado).toHaveLength(2);
      expect(resultado?.[0]?.nombre).toBe('Feria 1');
      expect(resultado?.[1]?.nombre).toBe('Feria 2');
    });

    it('debería retornar array vacío si no hay ferias', async () => {
      mockRepository.find.mockResolvedValue([]);

      const resultado = await obtenerFerias();

      expect(resultado).toEqual([]);
    });
  });

  describe('obtenerCantidadRepo', () => {
    it('debería retornar la cantidad de ferias', async () => {
      mockRepository.count.mockResolvedValue(5);

      const resultado = await obtenerCantidadRepo();

      expect(resultado.cantidad).toBe(5);
      expect(mockRepository.count).toHaveBeenCalled();
    });

    it('debería retornar 0 si no hay ferias', async () => {
      mockRepository.count.mockResolvedValue(0);

      const resultado = await obtenerCantidadRepo();

      expect(resultado.cantidad).toBe(0);
    });
  });
});