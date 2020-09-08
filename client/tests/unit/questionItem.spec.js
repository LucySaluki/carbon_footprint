import { shallowMount } from "@vue/test-utils";
import QuestionItem from "@/components/QuestionItem.vue";
import { questionsData } from "./questions.js";

describe("QuestionItem.vue", () => {
    let wrapper;
    beforeEach(async () => {
        wrapper = shallowMount(QuestionItem, {
            propsData: {
                question: questionsData[0]
            }
        });
        await wrapper.vm.$nextTick();
    });

    it("should have a question as a prop.", () => {
        expect(wrapper.vm.question.key).toMatch("sizeOfHouse");
        expect(wrapper.vm.question.type).toMatch("radio");
        expect(wrapper.vm.question.answers).toHaveLength(3);
    });
    it("should render the question title in an h2 tag.", () => {
        const header = wrapper.find("h2");
        expect(header.element.textContent).toMatch("What size is your house?");
    });
    it("should have the correct number of inputs.", () => {
        const inputs = wrapper.findAll("input");
        expect(inputs).toHaveLength(3);
    });
});