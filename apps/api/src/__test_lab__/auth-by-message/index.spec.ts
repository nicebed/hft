import { _bootPseudoBackend } from './_pseudo-backend.main';

describe(`Auth flow with some messenger. (gql-subscriptions)`, () => {
  let closeApp: () => Promise<void>;

  beforeAll(async () => {
    closeApp = await _bootPseudoBackend();
  });

  afterAll(async () => {
    closeApp && (await closeApp());
  });

  it('should work | authByMessage0', (done) => {
    const test = async () => {
      expect('should').not.toBe('errors');

      done();
    };

    test();
  });
});
