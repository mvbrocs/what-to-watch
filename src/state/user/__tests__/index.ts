import { selectUser, userReducer } from 'state/user';
import { User } from 'api/login';
import { mockStore } from 'mocks/store';

describe('UI state', () => {
  describe('reducer', () => {
    it('should return initial state on bad action', () => {
      const action = {
        type: 'bad action',
      };

      expect(userReducer(undefined, action)).toEqual(null);
    });

    it('should update user on login', () => {
      const user = {
        id: 1,
        email: 'ivanov@gmail.com',
        name: 'ivanov',
        avatar_url: 'img',
      } as User;
      const action = {
        type: 'user/login/fulfilled',
        payload: user,
      };

      expect(userReducer(undefined, action)).toEqual(user);
    });
  });

  describe('selectors', () => {
    it('should selectUser', () => {
      expect(selectUser(mockStore)).toEqual(mockStore.user);
    });
  });
});