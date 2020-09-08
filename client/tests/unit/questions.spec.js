import { shallowMount } from "@vue/test-utils";
import { questionsData } from "./questions.js";
import { usersData } from "./users.js";
import { eventBus } from "@/main.js";

import QuestionsPage from "@/components/Questions.vue";

describe("Questions.vue", () => {
    let wrapper;
    beforeEach(async () => {
        wrapper = shallowMount(QuestionsPage, {
            propsData: {
                questions: questionsData,
                selectedUser: usersData[0]
            }
        });
    });
    it("should have a questions prop.", () => {
        expect(wrapper.vm.questions).toHaveLength(3);
        expect(wrapper.vm.questions[1].key).toMatch("fuelUsage");
    });
    it("should have a selected user.", () => {
        expect(wrapper.vm.selectedUser.name).toMatch("Vishal");
    });
    it("should have an empty answers data object.", () => {
        expect(wrapper.vm.answers).toEqual({});
    });
    it("should have the right number of QuestionItems.", () => {
        const questionItems = wrapper.find("form");
        expect(questionItems.element.children).toHaveLength(4);
    });
    it("should fill the answers object on save.", async () => {
        const form = wrapper.find("form");
        form.trigger("submit.prevent");
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.answers).toEqual({ sizeOfHouse: [], fuelUsage: [], travelByBus: [] });
    });
    it("should only fill in undefined answers.", async () => {
        wrapper.vm.answers.sizeOfHouse = "Small";
        wrapper.vm.answers.fuelUsage = ["Oil", "Coal"];
        wrapper.find("form").trigger("submit.prevent");
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.answers).toEqual({ sizeOfHouse: "Small", fuelUsage: ["Oil", "Coal"], travelByBus: [] });
    });
});