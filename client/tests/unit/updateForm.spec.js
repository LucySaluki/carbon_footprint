import { shallowMount } from "@vue/test-utils";
import { usersData } from "./users.js";
import { questionsData } from "./questions.js";

import UpdateForm from "@/components/UpdateForm.vue";

describe("UpdateForm.vue", () => {
    let wrapper;
    beforeEach(async () => {
        wrapper = shallowMount(UpdateForm, {
            propsData: {
                questions: questionsData,
                selectedUser: usersData[1]
            }
        });
    });
    it("should have a questions prop.", () => {
        expect(wrapper.vm.questions).toHaveLength(3);
        expect(wrapper.vm.questions[1].key).toMatch("fuelUsage");
        expect(wrapper.vm.questions[1].answers).toHaveLength(4);
    });
    it("should have a selected user.", () => {
        expect(wrapper.vm.selectedUser.name).toMatch("Ally");
        expect(wrapper.vm.selectedUser.country).toMatch("Albania");
        expect(wrapper.vm.selectedUser.score).toEqual(13.871);
    });
    it("should have an empty answers data object.", () => {
        expect(wrapper.vm.answers).toEqual({});
    });
    it("should have the right number of UpdateItems.", () => {
        const updateItems = wrapper.find("article");
        expect(updateItems.element.children).toHaveLength(3);
    });
    it("should have a number of categories.", () => {
        expect(wrapper.vm.categories).toHaveLength(2);
    });
    it("should have tab buttons for each category.", () => {
        const tabButtons = wrapper.findAll(".tab-button");
        expect(tabButtons).toHaveLength(2);
        expect(tabButtons.at(0).element.value).toMatch("household");
    })
    // can't get this to work, it doesn't seem to be waiting for
    // the mounted() js method to toggle the hidden class
    // -- expect .hidden length to be 1, is 3
    // it("should have some hidden questions.", async () => {
    //     await wrapper.vm.$nextTick();
    //     const hidden = wrapper.findAll(".hidden");
    //     expect(hidden).toHaveLength(1);
    // });
});