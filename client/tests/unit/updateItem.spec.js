import { shallowMount } from '@vue/test-utils';
import UpdateItem from '@/components/UpdateItem';
import { questionData } from './questions';

describe ("UpdateItem.vue", () => {
  let wrapper;
  beforeEach(async () =>{
      wrapper = shallowMount(UpdateItem, {
          propsData: {
              question: questionData[1]
          }
      });
      await wrapper.vm.$nextTick();
  });

  it('should have a question as a prop')

  it('should render a question title')

  it('should render the correct number of inputs')

  it('should render the correct type of input')

  it('should set the inputAnswer to the input on change')
})