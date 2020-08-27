import React from 'react';
import {configure,shallow} from 'enzyme';//shallow/mic-gol
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});
describe('<BurgerBuilder/>',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper= shallow(<BurgerBuilder OnInitIngredients={()=>{}} />);
    });
    it('should render <BuildControls/> when reciving ingredients',()=>{
        wrapper.setProps({ings: {salad:0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
    // expect(wrapper.find(NavigationItem))@ pana aici tine de enzyme@.toHaveLength(2); @ proprietatea tine de JEST@
});