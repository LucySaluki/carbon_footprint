import { shallowMount } from '@vue/test-utils';
import UpdateItem from '@/components/UpdateItem.vue';
import { questionsData } from './questions.js';
import { usersData } from './users';

describe("UpdateItem.vue", () => {
  let wrapper;
  beforeEach(async () => {
      wrapper = shallowMount(UpdateItem, {
          propsData: {
              question: questionsData[1],
              selectedUser: usersData[1]
          }
      });
      await wrapper.vm.$nextTick()
  });

  it('should have a question as a prop.', () => {
    expect(wrapper.vm.question.key).toMatch("fuelUsage")
  });

  it('should render a question title.', () => {
    const questionTitle = wrapper.find('h2');
    expect(questionTitle.element.textContent).toMatch("Do you use these fuels in your home?")
  });
});