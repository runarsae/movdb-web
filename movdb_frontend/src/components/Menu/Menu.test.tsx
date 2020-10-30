import React from "react";
import {MockedProvider} from "@apollo/client/testing";
import renderer from "react-test-renderer";
import Menu from "./Menu";
import {MENU_VALUES, MENU_OPTIONS} from "../../queries";
import {configure, shallow, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

const mocks = [
    {
        request: {
            query: MENU_VALUES
        },
        result: {
            data: {
                menuValues: {
                    genres: [],
                    productionCountries: [],
                    releaseDateInterval: {start: 2000, end: 2017},
                    runtimeInterval: {start: 30, end: 180}
                }
            }
        }
    },
    {
        request: {
            query: MENU_OPTIONS
        },
        result: {
            data: {
                menuOptions: {
                    genres: ["Action", "Fantasy"],
                    productionCountries: ["Disney", "Fox"],
                    releaseDateInterval: {start: 2000, end: 2017},
                    runtimeInterval: {start: 30, end: 180}
                }
            }
        }
    }
];
configure({adapter: new Adapter()});

it("Menu matches snapshot", () => {
    const component = renderer.create(
        <MockedProvider mocks={mocks}>
            <Menu />
        </MockedProvider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it("Menu renders if given query data", () => {
    const wrapper = shallow(
        <MockedProvider mocks={mocks}>
            <Menu />
        </MockedProvider>
    );
    expect(wrapper.find(Menu).exists()).toBe(true);
});

it("Menu renders inputs correctly given query data", () => {
    const wrapper = mount(
        <MockedProvider mocks={mocks}>
            <Menu />
        </MockedProvider>
    );
    expect(wrapper.find({optionValues: ["Action", "Fantasy"]})).toBeTruthy();
    expect(wrapper.find({optionValues: ["Disney", "Fox"]})).toBeTruthy();
    expect(wrapper.find({optionValues: {start: 2000, end: 2017}})).toBeTruthy();
    expect(wrapper.find({optionValues: {start: 30, end: 180}})).toBeTruthy();
});
