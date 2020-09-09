import { shallowMount } from "@vue/test-utils";
import {emissionsData} from "./emissions.js";
import {usersData} from "./users.js";

import EveryoneLikeMe from "@/components/EveryoneLikeMe.vue";

describe("EveryoneLikeMe.vue", () => {
    let wrapper;
    beforeEach( async () => {
        wrapper = shallowMount(EveryoneLikeMe, {
            propsData: {
                selectedUser: usersData[1],
                globalEmissions: emissionsData
            }
        });
    });
    it("should have a user prop with answers.", () => {
        expect(wrapper.vm.selectedUser.name).toMatch("Ally")
        expect(wrapper.vm.selectedUser.answers.carsInHousehold).toEqual(2);
        expect(wrapper.vm.selectedUser.answers.travelByPlane).toEqual(20);
        expect(wrapper.vm.selectedUser.answers.sizeOfHouse).toMatch("Large");
    });
    it("should have emissions data.", () => {
        expect(wrapper.vm.globalEmissions).toHaveLength(3);
        expect(wrapper.vm.globalEmissions[1].country).toMatch("Algeria");
        expect(wrapper.vm.globalEmissions[1].population).toEqual(40400000);
        expect(wrapper.vm.globalEmissions[1].emissions).toEqual(142315117.813);
        expect(wrapper.vm.globalEmissions[1].avg).toEqual(3.523);
    });
    it("should have a total global population.", () => {
        expect(wrapper.vm.totalWorldPop).toEqual(69154026)
    });
    it("should have a total global emissions.", () => {
        expect(Math.round(wrapper.vm.totalWorldEmissions)).toEqual(Math.round(166250331.441))
    });
    it("should have a user score.", () => {
        expect(wrapper.vm.userScore).toEqual(13.871);
    });
    it("should have a hypothetical world score.", () => {
        expect(wrapper.vm.hypotheticalWorld).toEqual(959235494.646);
    });
    it("should calculate the percentage change.", () => {
        expect(wrapper.vm.percentDifference).toEqual(577)
    });
});