/**
 * Created by aliceji on 10/31/17.
 */
import React from 'react';
import Repo from '../components/Repo';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(
        <Repo />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders the repo bar ListView component', () => {
    const ListView = require('ListView');
    const Text = require('Text');
    const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(['Owned repos', 'Starred repos']);
    const tree = renderer
        .create(
            <ListView
                dataSource={dataSource}
                renderRow={rowData => <Text>{rowData}</Text>}
            />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders the first repo ListView component', () => {
    const ListView = require('ListView');
    const Text = require('Text');
    const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(['fji4/CS418', 'CS418 teapot']);
    const tree = renderer
        .create(
            <ListView
                dataSource={dataSource}
                renderRow={rowData => <Text>{rowData}</Text>}
            />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
