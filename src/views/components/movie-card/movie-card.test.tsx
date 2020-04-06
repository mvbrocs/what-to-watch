import React from 'react';
import { shallow } from 'enzyme';

import { MovieCard } from './movie-card';
import { movieCardMock } from 'mocks/movie-card';

describe('MovieCard', () => {
  const movieCard = shallow(<MovieCard {...movieCardMock} />);

  it('renders properly', () => {
    expect(movieCard).toMatchSnapshot();
  });

  it('should render VideoPlayer with play=true prop, on mouseEnter', () => {
    movieCard.simulate('mouseEnter');

    expect(movieCard.find('VideoPlayer').prop('play')).toBeTruthy();
  });

  it('should render VideoPlayer with play=false prop, on mouseLeave', () => {
    movieCard.simulate('mouseLeave');

    expect(movieCard.find('VideoPlayer').prop('play')).toBeFalsy();
  });
});
