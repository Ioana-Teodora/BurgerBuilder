import React from 'react';
import {configure,shallow} from 'enzyme';//shallow/mic-gol
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
configure({adapter: new Adapter()});
describe('<NavigationItems/>',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper= shallow(<NavigationItems/>);
    });
    it('should render two <NavigationItem/> elements if not authentificated',()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should render three <NavigationItem/> elements if authentificated',()=>{
        // wrapper= shallow(<NavigationItems isAuth/>);
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should render <NavigationItem/>LOGOUT   if authentificated',()=>{
        wrapper.setProps({isAuth: true});
        expect(wrapper.contains( <NavigationItem link="/logout" >LOGOUT</NavigationItem>)).toEqual(true);
    });
    // expect(wrapper.find(NavigationItem))@ pana aici tine de enzyme@.toHaveLength(2); @ proprietatea tine de JEST@
});