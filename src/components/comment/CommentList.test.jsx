import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { waitForDomChange } from 'react-testing-library';
import axios from '../../utils/axiosInstance';
import { renderWithRedux } from '../../__mocks__/helpers';
import CommentList from './CommentList';

const axiosMock = new MockAdapter(axios, { delayResponse: 500 });

describe('<CommentList />', () => {
  afterEach(axiosMock.reset);
  afterAll(axiosMock.restore);

  test('renders nothing when fetching comment or comment is empty', () => {
    const { container } = renderWithRedux(<CommentList />);
    expect(container.innerHTML).toEqual('');
  });

  test('fetches and display comments', async () => {
    const payload = {
      comments: [{
        body: 'First comment',
        author: { username: 'janedoe', image: 'avatar.png' },
        createdAt: '2019-01-23T23:21:33.874Z',
      }],
    };
    axiosMock.onGet().replyOnce(200, payload);
    const { getByText, container, getByAltText } = renderWithRedux(<CommentList />);
    await waitForDomChange({ container });

    expect(getByText(/first comment/i)).toBeInTheDocument();
    expect(getByText(/janedoe/i)).toBeInTheDocument();
    expect(getByAltText(/janedoe avatar/i)).toBeInTheDocument();
  });
});
