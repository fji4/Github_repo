/**
 * Created by aliceji on 10/31/17.
 */
import React from 'react';
import Follower from '../components/Follower';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(
        <Follower />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders the Image component', done => {
    const Image = require('Image');
    Image.getSize('https://avatars3.githubusercontent.com/u/22123151?s=100&v=4', (width, height) => {
        const tree = renderer.create(<Image style={{height, width}} />).toJSON();
        expect(tree).toMatchSnapshot();
        done();
    });
});