import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { VideoPlayer } from './';
import { videoPlayerAssetsMock } from 'mocks/video-player';

describe('VideoPlayer', () => {
  describe('not play', () => {
    const videoPlayer = mount(<VideoPlayer {...videoPlayerAssetsMock} play={false} />);

    it('renders properly', function() {
      expect(videoPlayer).toMatchSnapshot();
    });

    it('should render preview image', () => {
      expect(videoPlayer.find('img')).toHaveLength(1);
    });
  });

  describe('play', () => {
    const playStub = jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => {
        return new Promise(() => {});
      });

    describe('without delay', () => {
      const videoPlayer = mount(<VideoPlayer {...videoPlayerAssetsMock} play={true} />);

      it('renders properly', function() {
        expect(videoPlayer).toMatchSnapshot();
      });

      it('should not render preview image', () => {
        expect(videoPlayer.find('img')).toHaveLength(0);
        expect(playStub).toHaveBeenCalled();
      });
    });

    describe('with delay', () => {
      jest.useFakeTimers();

      const videoPlayer = mount(
        <VideoPlayer {...videoPlayerAssetsMock} play={true} delay={1000} />,
      );

      it('should render preview image when the delay not expired', () => {
        act(() => {
          jest.advanceTimersByTime(500);
        });
        videoPlayer.update();

        expect(videoPlayer.find('img')).toHaveLength(1);
      });

      it('should not render preview image when the delay expired', () => {
        act(() => {
          jest.advanceTimersByTime(500);
        });
        videoPlayer.update();

        expect(videoPlayer.find('img')).toHaveLength(0);
        expect(playStub).toHaveBeenCalled();
      });
    });
  });
});
