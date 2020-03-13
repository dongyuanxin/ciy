import { Test, TestingModule } from '@nestjs/testing';
import { PigsController } from './pigs.controller';

describe('Pigs Controller', () => {
  let controller: PigsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PigsController],
    }).compile();

    controller = module.get<PigsController>(PigsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
