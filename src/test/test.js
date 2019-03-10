import React from "react";
import Login from "../components/Login";
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-extended';

configure({adapter: new Adapter()});

var assert = require("assert");

describe('<Login/>', function () {
    afterEach(() => {
        jest.clearAllMocks();
    });


    it('renders without crashing', () => {
        shallow(<Login/>);
    });

    it('Login constructor', () => {
        const render1 = (props) => {
            const withDefaults = {
                id: '1',
                ...props
            };
            return shallow(<Login {...withDefaults} />)
        };
        const wr = render1();
        assert.equal(wr.state('id'), null);
    });

    it('loginHandleClickCheckNotEmpty', function () {
        const mockSuccessResponse = {};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(window, 'alert').mockImplementation(() => {
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4
        let wrapper = mount(<Login/>);
        wrapper.instance()._username.value = 'va';
        wrapper.instance()._password.value = 'va';
        wrapper.find('button').first().simulate('click');
        expect(window.alert).not.toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('alert', function () {
        jest.spyOn(window, 'alert').mockImplementation(() => {
        });
        let wrapper = mount(<Login/>);
        wrapper.find('button').first().simulate('click');
        expect(window.alert).toBeCalled();
    });


    /*
    it('loginHandleClickCheckNotEmptyThrowException', function () {
        const mockErrorResponse = new Error("err");
        const mockFetchPromise = Promise.resolve({
            json: () => mockErrorResponse,
        });

        global.fetch = jest.fn().mockImplementationOnce(() => {
            return new Promise((resolve, reject) => {
                resolve({
                    ok: false,
                    statuss: 500,
                    json: () => mockErrorResponse
                });
            });
        });

        jest.spyOn(window, 'alert').mockImplementation(() => {
        });
        let wrapper = mount(<Login/>);
        wrapper.instance()._username.value = 'va';
        wrapper.instance()._password.value = 'va';
        wrapper.instance().props.history = [];
        wrapper.find('button').first().simulate('click');

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalled();
    })
    */

    it('registerHandleClickCheckNotEmpty', function () {
        const mockSuccessResponse = {};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(window, 'alert').mockImplementation(() => {
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4
        jest.spyOn(global, 'prompt').mockImplementation(() => mockFetchPromise); // 4
        let wrapper = mount(<Login/>);
        wrapper.instance()._username.value = 'va';
        wrapper.instance()._password.value = 'va';
        wrapper.find('button').at(1).simulate('click');
        expect(window.alert).toHaveBeenCalledWith("Пароли не совпали");
        expect(global.fetch).not.toHaveBeenCalled();
        expect(global.prompt).toHaveBeenCalledTimes(1);
    });

    it('registerWithPasswordHandleClickCheckNotEmpty', function () {
        const mockSuccessResponse = {};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(window, 'alert').mockImplementation(() => {
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4
        jest.spyOn(window, 'prompt').mockImplementation(() => {
            return 'va'
        });
        let wrapper = mount(<Login/>);
        wrapper.instance()._username.value = 'va';
        wrapper.instance()._password.value = 'va';
        wrapper.find('button').at(1).simulate('click');
        expect(window.alert).not.toHaveBeenCalledWith("Пароли не совпали");
        expect(window.prompt).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });
});