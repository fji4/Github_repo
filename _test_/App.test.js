import React from 'react';
import App from '../App';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});


test('renders correctly', () => {
    const tree = renderer.create(
        <App />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});


it('renders the Image component', done => {
    const Image = require('Image');
    Image.getSize('https://avatars2.githubusercontent.com/u/25832055?v=4', (width, height) => {
        const tree = renderer.create(<Image style={{height, width}} />).toJSON();
        expect(tree).toMatchSnapshot();
        done();
    });
});

it('renders the profile ListView component', () => {
    const ListView = require('ListView');
    const Text = require('Text');
    const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2, r3) => r1 !== r2 || r1 !== r3 || r2 !== r3,
    }).cloneWithRows(['Fanyin Ji', 'UIUC Computer Science junior', 'Summary']);
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

it('renders the username ListView component', () => {
    const ListView = require('ListView');
    const Text = require('Text');
    const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(['Username', 'fji4']);
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

it('renders the website ListView component', () => {
    const ListView = require('ListView');
    const Text = require('Text');
    const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(['Website', 'None']);
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

it('renders the location ListView component', () => {
    const ListView = require('ListView');
    const Text = require('Text');
    const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(['Location', 'Urbana, IL']);
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

it('renders the repo ListView component', () => {
    const ListView = require('ListView');
    const Text = require('Text');
    const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(['Repositories', '4']);
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

it('renders the follower ListView component', () => {
    const ListView = require('ListView');
    const Text = require('Text');
    const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(['Followers', '1']);
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

it('renders the followings ListView component', () => {
    const ListView = require('ListView');
    const Text = require('Text');
    const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(['Followings', '1']);
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

it('renders the date ListView component', () => {
    const ListView = require('ListView');
    const Text = require('Text');
    const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(['Create Date', '2017-02-16']);
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