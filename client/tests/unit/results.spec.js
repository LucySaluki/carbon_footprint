import { shallowMount } from '@vue/test-utils';
import Results from '@/components/Results.vue';
import { questionsData } from './questions';
import { usersData } from './users';
import { emissionsData } from './emissions';

describe("Results.vue", () => {
  let wrapper;
  beforeEach(async () => {
      wrapper = shallowMount(Results, {
          propsData: {
              selectedUser: usersData[1],
              globalEmissions: emissionsData,
              questions: questionsData
          }
      });
      await wrapper.vm.$nextTick();
  });

  it('should have a selectedUser prop', () => {
    expect(wrapper.vm.selectedUser.name).toMatch("Ally");
  });

  it('should have an array of globalEmissions data as a prop', () => {
    expect(wrapper.vm.globalEmissions).toHaveLength(3);
  });

  it('should have an array of questions as a prop', () => {
    expect(wrapper.vm.questions).toHaveLength(3);
  });
});