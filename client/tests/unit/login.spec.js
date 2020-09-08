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
        wrapper.setData({ selected: "new_user" });
        await wrapper.vm.$nextTick();
        const selects = wrapper.findAll('select');
        const countrySelect = selects.at(1);
        const options = countrySelect.findAll('option')
        expect(options).toHaveLength(4);
    });

    it('should set country on option change in country dropdown.', async () => {
        wrapper.setData({ selected: "new_user" });
        await wrapper.vm.$nextTick();
        const selects = wrapper.findAll('select');
        const countrySelect = selects.at(1);
        const options = countrySelect.findAll('option');
        options.at(1).setSelected();
        expect(wrapper.vm.country).toMatch('Albania');
    });

    it('should set name on change/text input', async () => {
        wrapper.setData({ selected: "new_user" });
        await wrapper.vm.$nextTick();
        wrapper.setData({ name: "Jonny" })
        await wrapper.vm.$nextTick();
        const textBox = wrapper.find('#name');
        expect(textBox.element.value).toMatch("Jonny");
    });

    it('should render user name and country if selected is equal to a user.', async () => {
        wrapper.setData({ selected: wrapper.vm.users[1] });
        await wrapper.vm.$nextTick();
        const userDetails = wrapper.findAll('p');
        const userName = userDetails.at(0).element;
        const userCountry = userDetails.at(1).element;
        expect(userName.textContent).toMatch('Name: Ally');
        expect(userCountry.textContent).toMatch('Country: Albania')
    });

    it('should render Load My Details and Delete User buttons if selected is equal to a user.', async () => {
        wrapper.setData({ selected: wrapper.vm.users[1] });
        await wrapper.vm.$nextTick();
        const buttons = wrapper.findAll('input');
        const detailButton = buttons.at(0);
        const deleteButton = buttons.at(1);
        expect(detailButton.element.value).toMatch('Load my details');
        expect(deleteButton.element.value).toMatch('Delete User');
    });

    it('should render Create New User button if selected is equal to new_user.', async () => {
        wrapper.setData({ selected: "new_user" });
        await wrapper.vm.$nextTick();
        const inputs = wrapper.findAll('input');
        const newUserButton = inputs.at(1);
        expect(newUserButton.element.value).toMatch('Create New User')
    })
})