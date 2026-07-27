import { feriaMapper } from '../../../src/infra/mappers/feriaMapper';
import { Feria } from '../../../src/domain/feria/feria';
import { FeriaEntity } from '../../../src/infra/entities/feriaEntity';

describe('FeriaMapper (Infra Mapper)', () => {
  describe('fromEntityToDomain', () => {
    it('debería convertir una FeriaEntity a Feria (domain)', () => {
      const entity = new FeriaEntity();
      entity.id = 1;
      entity.nombre = 'Feria de Tecnología';
      entity.fecha = '2025-03-15';
      entity.direccion = 'Plaza Mayor';
      entity.cupo = 100;
      entity.createdAt = new Date('2025-01-01');

      const domain = feriaMapper.fromEntityToDomain(entity);

      expect(domain.id).toBe(1);
      expect(domain.nombre).toBe('Feria de Tecnología');
      expect(domain.direccion).toBe('Plaza Mayor');
      expect(domain.cupo).toBe(100);
      expect(domain.createdAt).toBe(entity.createdAt);
    });

    it('debería manejar campos opcionales nulos', () => {
      const entity = new FeriaEntity();
      entity.id = 2;
      entity.nombre = 'Feria Simple';
      entity.fecha = null as any;
      entity.direccion = null as any;
      entity.cupo = null as any;
      entity.createdAt = new Date();

      const domain = feriaMapper.fromEntityToDomain(entity);

      expect(domain.id).toBe(2);
      expect(domain.nombre).toBe('Feria Simple');
      // El mapper actual devuelve null en lugar de undefined para campos nulos
      expect(domain.fecha).toBeNull();
      expect(domain.direccion).toBeNull();
      expect(domain.cupo).toBeNull();
    });
  });

  describe('fromDomainToEntity', () => {
    it('debería convertir una Feria (domain) a FeriaEntity', () => {
      const domain = new Feria('Feria de Libros');
      domain.id = 3;
      domain.fecha = new Date('2025-04-20');
      domain.direccion = 'Biblioteca Central';
      domain.cupo = 50;

      const entity = feriaMapper.fromDomainToEntity(domain);

      expect(entity.id).toBe(3);
      expect(entity.nombre).toBe('Feria de Libros');
      expect(entity.direccion).toBe('Biblioteca Central');
      expect(entity.cupo).toBe(50);
    });

    it('debería manejar Feria sin campos opcionales', () => {
      const domain = new Feria('Feria Mínima');

      const entity = feriaMapper.fromDomainToEntity(domain);

      expect(entity.nombre).toBe('Feria Mínima');
      expect(entity.fecha).toBeUndefined();
      expect(entity.direccion).toBeUndefined();
      expect(entity.cupo).toBeUndefined();
    });
  });
});
