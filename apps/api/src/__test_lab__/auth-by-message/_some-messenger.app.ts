import { Body, Controller, Inject, Module, Post } from '@nestjs/common';
import { _PROVIDER_TOKEN_FOR_TEST_CONFIG, _TestConfig } from './_test-config.provider';
import { _UserKeys } from './_user-keys-body.type';

@Controller('some-messenger')
class _controller {
  static reqs = new Map<number, _UserKeys>();

  constructor(@Inject(_PROVIDER_TOKEN_FOR_TEST_CONFIG) public config: typeof _TestConfig) {}

  @Post('send-user-keys')
  async ping(@Body() body: _UserKeys) {
    _controller.reqs.set(body.phone, body);
  }
}

@Module({
  controllers: [_controller],
})
export class _SomeMessenger {}
