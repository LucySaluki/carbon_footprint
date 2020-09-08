import { shallowMount } from '@vue/test-utils';
import ResultsDial from '@/components/ResultsDial.vue';
import { dialData } from './dialData.js';

describe('ResultsDial', () => {
    let wrapper;
    beforeEach(async () => {
        wrapper = shallowMount(ResultsDial, {
            propsData: {
                data: dialData
            }
        });
        await wrapper.vm.$nextTick()
    });
    it('should have two records', () => {
      expect(wrapper.vm.data).toHaveLength(2)
    });
    it('should create a table array with CO2 and emissions data', () => {
        expect(wrapper.vm.data[0][0]).toMatch('label')
        expect(wrapper.vm.data[0][1]).toMatch('score')
        expect(wrapper.vm.data[1][0]).toMatch('CO2')
        expect(wrapper.vm.data[1][1]).toEqual(7.354)
      });
})