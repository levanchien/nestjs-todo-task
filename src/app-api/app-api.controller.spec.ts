import { Test, TestingModule } from '@nestjs/testing';
import { AppApiController } from './app-api.controller';

describe('AppApiController', () => {
  let controller: AppApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppApiController],
    }).compile();

    controller = module.get<AppApiController>(AppApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
