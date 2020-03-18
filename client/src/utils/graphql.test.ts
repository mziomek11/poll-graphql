import { fetchGQL } from './graphql';

describe('Utils graphql', () => {
  describe('fetchGQL', () => {
    test('return data and empty error array', async () => {
      const data = { something: { name: 'Ed', age: 20 } };
      const fetchImplementation = () => {
        return Promise.resolve({ json: () => Promise.resolve({ data }) });
      };

      jest
        .spyOn(global, 'fetch' as any)
        .mockImplementationOnce(fetchImplementation);

      const res = await fetchGQL('some query');
      expect(res).toEqual({ data, errors: {} });
    });

    test('return data as null and properly formatted errors', async () => {
      const errors = [
        { message: 'Another Errore' },
        {
          message: 'Argument Validation Error',
          extensions: {
            exception: {
              validationErrors: [
                {
                  property: 'Err1',
                  constraints: {
                    constraint1: 'Err1Con1',
                    constraint2: 'Err1Con2'
                  }
                },
                {
                  property: 'Err2',
                  constraints: {
                    constraint1: 'Err2Con1'
                  }
                }
              ]
            }
          }
        }
      ];

      const fetchImplementation = () => {
        return Promise.resolve({
          json: () => Promise.resolve({ errors })
        });
      };

      jest
        .spyOn(global, 'fetch' as any)
        .mockImplementationOnce(fetchImplementation);

      const res = await fetchGQL('some query');
      expect(res).toEqual({
        data: null,
        errors: { Err1: 'Err1Con1', Err2: 'Err2Con1' }
      });
    });
  });
});
