import { shallowMount } from '@vue/test-utils';
import Login from '@/components/Login.vue';
import { userData, usersData } from './users';
import { countriesData } from './countries';

describe('Login.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Login, {
        propsData: {
            users: usersData,
            countries: countriesData
        }
    });
  });

it('should have a country prop.', () => {
  expect(wrapper.vm.countries[0].name).toMatch('Albania')
});

it('should have a user prop.', () => {
  expect(wrapper.vm.users[0].name).toMatch('Vishal')
})
})
