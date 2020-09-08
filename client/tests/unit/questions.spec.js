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
    });
    it("should have a selected user.", () => {
        expect(wrapper.vm.selectedUser.name).toMatch("Vishal");
    });
})