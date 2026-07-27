import { crearFeria, cantidadFeria } from '../../../src/api/feria/feriaController';
import { feriaService } from '../../../src/domain/feria/feriaService';
import { feriaMapper } from '../../../src/api/mappers/feriaMapper';
import { Request, Response } from 'express';

// Mock del servicio de dominio
jest.mock('../../../src/domain/feria/feriaService', () => ({
  feriaService: {
    crear: jest.fn(),
    obtenerCantidad: jest.fn(),
  },
}));

// Mock del mapper de API
jest.mock('../../../src/api/feria/feriaMapper', () => ({
  feriaMapper: {
    fromDtoToDomain: jest.fn(),
    fromDomainToDto: jest.fn((feria) => feria),
  },
}));

describe('FeriaController (API Controller)', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockJson = jest.fn().mockReturnValue({});
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });

    mockRequest = {
      body: {},
    };

    mockResponse = {
      status: mockStatus,
    };
  });

  describe('crearFeria', () => {
    it('debería crear una feria exitosamente', async () => {
      const mockFeria = { id: 1, nombre: 'Feria Test', createdAt: new Date() };

      (feriaMapper.fromDtoToDomain as jest.Mock).mockReturnValue(mockFeria);
      (feriaService.crear as jest.Mock).mockResolvedValue(mockFeria);

      mockRequest.body = { nombre: 'Feria Test' };

      await crearFeria(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(mockFeria);
    });

    it('debería retornar error 400 si falla la creación', async () => {
      const mockError = new Error('La feria ya existe');

      (feriaMapper.fromDtoToDomain as jest.Mock).mockReturnValue({ nombre: 'Feria Existente' });
      (feriaService.crear as jest.Mock).mockRejectedValue(mockError);

      mockRequest.body = { nombre: 'Feria Existente' };

      await crearFeria(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: 'La feria ya existe' });
    });
  });

  describe('cantidadFeria', () => {
    it('debería retornar la cantidad de ferias', async () => {
      const mockCantidad = { cantidad: 3 };

      (feriaService.obtenerCantidad as jest.Mock).mockResolvedValue(mockCantidad);

      await cantidadFeria(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockCantidad);
    });

    it('debería retornar error 400 si no hay ferias', async () => {
      const mockError = new Error('No hay ferias registradas');

      (feriaService.obtenerCantidad as jest.Mock).mockRejectedValue(mockError);

      await cantidadFeria(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: 'No hay ferias registradas' });
    });
  });
});
