import { shallowMount } from '@vue/test-utils';
import Login from '@/components/Login.vue';
import { usersData } from './users';
import { countriesData } from './countries';

describe('Login.vue', () => {
    let wrapper;
    beforeEach(async () => {
        wrapper = shallowMount(Login, {
            propsData: {
                users: usersData,
                countries: countriesData
            }
        });
        await wrapper.vm.$nextTick()
    });

    it('should have a country prop.', () => {
        expect(wrapper.vm.countries[0].name).toMatch('Albania')
    });

    it('should have a user prop.', () => {
        expect(wrapper.vm.users[0].name).toMatch('Vishal')
    });

    it('should populate a select.', () => {
        const select = wrapper.find('select');
        const options = select.findAll('option');
        expect(options).toHaveLength(6)
    });

    it('should be able to select an option from the dropdown.', () => {
        const select = wrapper.find('select');
        const options = select.findAll('option');
        options.at(4).setSelected();
        expect(wrapper.vm.selected.name).toMatch('Vishal');
    });

    it('should populate a select with countries if new_user is selected and selected is truthy', async () => {
        wrapper.setData({selected: "new_user"});
        await wrapper.vm.$nextTick();
        const selects = wrapper.findAll('select');
        const countrySelect = selects.at(1);
        const options = countrySelect.findAll('option')
        expect(options).toHaveLength(4);
    })
})
