import { shallowMount } from '@vue/test-utils';
import Map from '@/components/Map.vue';
import { emissionsData } from './emissions.js';

describe('Map', () => {
    let wrapper;
    beforeEach(async () => {
        wrapper = shallowMount(Map, {
            propsData: {
                globalEmissions: emissionsData
            }
        });
        await wrapper.vm.$nextTick()
    });
    it('should have three countries emissions data', () => {
      expect(wrapper.vm.globalEmissions).toHaveLength(3)
    });
    it('should have a country name', () => {
      expect(wrapper.vm.globalEmissions[0].country).toMatch('Albania')
    });
    it('should create a table array with countries and emissions data', () => {
      expect(wrapper.vm.chartData[1][0]).toMatch('AL')
      expect(wrapper.vm.chartData[2][0]).toMatch('DZ')
      expect(wrapper.vm.chartData[3][0]).toMatch('AO')
      expect(wrapper.vm.chartData[1][1]).toEqual(1.578)
      expect(wrapper.vm.chartData[2][1]).toEqual(3.523)
      expect(wrapper.vm.chartData[3][1]).toEqual(0.749)
    });
})