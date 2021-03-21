<<<<<<< HEAD:test/store/action.spec.ts
import { postLogin } from '../../src/services'
import { login } from '../../src/store/actions'
import { SET_ERRORS, UPDATE_USER } from '../../src/store/constants'

jest.mock('../../src/services')
=======
import { postLogin } from '../../services';
import { login } from '../actions';
import { SET_ERRORS, UPDATE_USER } from '../constants';

jest.mock('../../services');
>>>>>>> 2b7be12 (style: Switching to Preact code style):src/store/__test__/action.spec.ts

const postLoginMock = postLogin as jest.Mock;

describe('# Actions', () => {
  it('should be trigger LOGIN reducer after login success', async () => {
    postLoginMock.mockResolvedValue({});

    const action = await login({ email: 'test@example.com', password: '12345678' });

    expect(action).toMatchObject({ type: UPDATE_USER });
  });

  it('should be trigger SET_ERRORS action after login failed with error message', async () => {
    const errors = {
      password: ['is valid'],
    };
    postLoginMock.mockRejectedValue({ errors });

    const action = await login({ email: 'test@example.com', password: '' });

    expect(action).toMatchObject({ type: SET_ERRORS, errors });
  });
});
